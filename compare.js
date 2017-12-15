var _ = require("lodash");
var fs = require("fs");
var ccxt = require("ccxt");
const { getOrder } = require("./getOrderinfo.js");
const { transformOrder } = require("./getOrderinfo.js");

let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR", "BCH/EUR"];

Promise.all(pairs.map(getOrder))
  .then(res => {
    res.forEach(g => {
      for (var i = 0; i < g.length; i++) {
        if (g[i] !== 1) {
          for (var j = i + 1; j < g.length; j++) {
            if (g[j] !== 1) {
              let base = g[i];
              let comp = g[j];
              let orderComp = transformOrder(base, comp);
              if (orderComp.processedPriceInfo.basePriceSpread > 0) {
                console.log(orderComp);
              }
            }
          }
        }
      }
    });
  })
  .catch(e => {
    console.log(e);
  });
