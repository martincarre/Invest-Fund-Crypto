var _ = require("lodash");
var ccxt = require("ccxt");
var { keys } = require("./keys");
var { fees } = require("./fees");
const { exchanges } = require("./config");

// NOTE: Getting back order info
function getOrder(p) {
  return Promise.all(
    ccxt.exchanges.map(async e => {
      // NOTE: Checking if the markets are included in the supported list:
      if (exchanges.includes(e)) {
        let exchange = new ccxt[e]({
          timeout: 1500,
          apiKey: keys[e].api,
          secret: keys[e].secret,
          enableRateLimit: true
        });
        if (exchange.hasFetchOrderBook) {
          let now = Math.floor(new Date());
          // NOTE: Getting OrderBook info
          let order = await exchange
            .fetchOrderBook(p)
            .then(o => {
              return o;
            })
            .catch(err => {});
          // NOTE: Checking if order exists and is correctly returned (object)
          if (order && _.isObject(order)) {
            // NOTE: Checking the available balances for the corresponding market
            let balance = await exchange
              .fetchBalance()
              .then(b => {
                return b;
              })
              .catch(err => {});
            order.mkt = e;
            order.pair = p;
            order.ping = order.timestamp - now;
            order.mktvar = {};
            // NOTE: Checking if the balance info was correctly returned and adding the info to the orderbook
            if (_.isObject(balance)) {
              order.mktvar.balance = {
                free: balance.free,
                used: balance.used,
                total: balance.total
              };
            } else {
              order.mktvar.balance = {
                free: {
                  EUR: 0,
                  BTC: 0,
                  LTC: 0,
                  ETH: 0,
                  XRP: 0,
                  BCH: 0,
                  USD: 0
                },
                used: 0,
                total: 0
              };
            }

            // NOTE: OK! Everything went well returning the order object in full.
            return order;
          } else {
            // NOTE: Goes with the check-up if order doesn't exists or isn't an Object.
            // Basically means there was either a timeout or the server is unreachable.
            return 3;
          }
        } else {
          // NOTE: The exchange doesn't support fetchOrderBook() function
          return 2;
        }
      } else {
        // NOTE: Market is not supported by the app. No need to get anyfurther
        return 1;
      }
    })
  );
}

// NOTE: Rearranging the order Objects to fit to our needs
// Ori means raw information from the orderBook request
// Processed means the ori reworked to fit our needs
// Some other info is added afterwards to the object in the invest function.

function transformOrder(base, comp) {
  let orderComp = {
    mkBase: base.mkt,
    mkComp: comp.mkt,
    pairBase: base.pair,
    pairComp: comp.pair,
    oriPriceInfo: {
      pBidBase: base.bids[0][0],
      pBidComp: comp.bids[0][0],
      vBidBase: base.bids[0][1],
      vBidComp: comp.bids[0][1],
      pAskBase: base.asks[0][0],
      pAskComp: comp.asks[0][0],
      vAskBase: base.asks[0][1],
      vAskComp: comp.asks[0][1]
    },
    processedPriceInfo: {
      basePriceSpread: comp.bids[0][0] - base.asks[0][0],
      compPriceSpread: base.bids[0][0] - comp.asks[0][0],
      baseVolSpread: base.asks[0][1] - comp.bids[0][1],
      compVolSpread: comp.asks[0][1] - base.bids[0][1]
    },
    investInfo: {},
    oriBalanceInfo: {
      baseBalance: base.mktvar.balance,
      compBalance: comp.mktvar.balance
    },
    oriFeesInfo: {
      baseFees: base.mktvar.fees,
      compFees: comp.mktvar.fees,
      baseFeesHard: fees[base.mkt],
      compFeesHard: fees[comp.mkt]
    },
    oriTimeInfo: {
      pingBase: base.ping,
      pingComp: comp.ping,
      snBase: base.timestamp,
      snComp: comp.timestamp
    },
    processedTimeInfo: {
      pingSpread: base.ping - comp.ping,
      snSpread: base.timestamp - comp.timestamp
    }
  };
  return orderComp;
}

module.exports = {
  getOrder,
  transformOrder
};
