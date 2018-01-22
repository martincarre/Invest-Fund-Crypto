const { verifBaseInfo } = require("./checkForInvest");
const { balanceCheck } = require("./checkForInvest");
const _ = require("lodash");

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

module.exports = {
  investBot,
  doubleCheck
};
