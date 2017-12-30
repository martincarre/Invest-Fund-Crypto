var _ = require("lodash");
var ccxt = require("ccxt");

let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR", "BCH/EUR"];
let exchanges = ["kraken", "bitfinex", "exmo", "bitstamp", "bitbay"];

function getOrder(p) {
  return Promise.all(
    ccxt.exchanges.map(async e => {
      if (exchanges.includes(e)) {
        let exchange = new ccxt[e]({ timeout: 1500 });
        if (exchange.hasFetchOrderBook) {
          let now = Math.floor(new Date());
          let order = await exchange
            .fetchOrderBook(p)
            .then(o => {
              return o;
            })
            .catch(err => {});
          if (order) {
            order.mkt = e;
            order.pair = p;
            order.ping = order.timestamp - now;
            return order;
          } else {
            return 3;
          }
        } else {
          return 2;
        }
      } else {
        return 1;
      }
    })
  );
}

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
      basePriceSpread: base.asks[0][0] - comp.bids[0][0],
      compPriceSpread: comp.asks[0][0] - comp.bids[0][0],
      baseVolSpread: base.asks[0][1] - comp.bids[0][1],
      compVilSpread: comp.asks[0][1] - base.bids[0][1]
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
