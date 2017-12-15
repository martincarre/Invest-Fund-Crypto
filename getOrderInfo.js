var _ = require("lodash");
var ccxt = require("ccxt");

function getOrder(p) {
  return Promise.all(
    ccxt.exchanges.map(api => {
      let exchange = new ccxt[api]();
      exchange.timeout = 3000;
      if (exchange.hasFetchOrderBook) {
        return exchange
          .fetchOrderBook(p)
          .then(order => {
            if (_.isObject(order) && order.bids[0][1] && order.asks[0][1]) {
              let now = Math.floor(new Date());
              order.mkt = exchange.name;
              order.pair = p;
              order.ping = now - order.timestamp;
              return order;
            } else {
              return 1;
            }
          })
          .catch(e => {
            return 1;
          });
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
