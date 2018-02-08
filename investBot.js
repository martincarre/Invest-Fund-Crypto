const { verifBaseInfo } = require("./checkForInvest");
const { balanceCheck } = require("./checkForInvest");
const _ = require("lodash");
const ccxt = require("ccxt");
const { keys } = require("./keys");
const { orderServer } = require("./orderServer");

// NOTE: OVERRIDING THE NONCE:
let nonce = 1;

// NOTE: CHECK TO AGGREGATE INFO BASED ON BASIC INFO RULES + BALANCE
async function investBot(orderComp) {
  let invest = await verifBaseInfo(orderComp);
  if (invest === true) balanceCheck(orderComp);
  return orderComp;
}

// NOTE: TRYING TO GET RID OF THE DOUBLES ===> ie. There might be an investment opportunity on DSX and EXMO
// and another one on KRAKEN and EXMO. However we can't take both since Exmo might have limited availability
// therefore checking for the best possible scenario ==> max. net.totalProfit

function doubleCheck(digestArr) {
  const res = _.reduce(
    digestArr,
    (result, item) => {
      const same = _.find(result, r =>
        _.some([r.mkBase === item.mkBase, r.mkComp === item.mkComp])
      ); // find same already added item

      if (same !== undefined) {
        if (
          same.investInfo.net.totalProfit >= item.investInfo.net.totalProfit
        ) {
          return result; // do nothing if profit is less than already added
        }

        return _.chain(result) // remove item with smaller profit and push item with higher profit
          .reject({ mkBase: same.mkBase, mkComp: same.mkComp })
          .concat(item)
          .value();
      }

      return _.concat(result, item); // just push item
    },
    []
  );
  return res;
}

// PASSING ORDERS OT THE MARKET:

function orderPass(orderArr) {
  if (!_.isEmpty(orderArr)) {
    orderArr.forEach(o => {
      var mkBuy = new ccxt[o.investInfo.mkBuy](keys[o.investInfo.mkBuy]);
      var mkSell = new ccxt[o.investInfo.mkSell](keys[o.investInfo.mkSell]);
      var buyOrder = mkBuy
        .createLimitBuyOrder(
          o.pairBase,
          o.investInfo.orderToPass.cryptVolume,
          o.investInfo.pBuy
        )
        .then(r => {
          return r;
        })
        .catch(e => {
          console.log(e);
        });
      var sellOrder = mkSell
        .createLimitSellOrder(
          o.pairBase,
          o.investInfo.orderToPass.cryptVolume,
          o.investInfo.pSell
        )
        .then(r => {
          return r;
        })
        .catch(e => {
          console.log(e);
        });
      if (_.isObject(sellOrder) && _.isObject(buyOrder)) {
        o.investInfo.orderToPass.real.fundFee =
          0.25 * o.investInfo.orderToPass.real.exProfit;
        o.investInfo.orderToPass.real.transaction = true;
        orderServer(null, null, o);
        console.log(buyOrder);
        console.log(sellOrder);
      }
    });
  }
}

module.exports = {
  investBot,
  doubleCheck,
  orderPass
};
