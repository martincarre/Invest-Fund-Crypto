var _ = require("lodash");
var ccxt = require("ccxt");
const { getOrder } = require("./getOrderinfo");
const { transformOrder } = require("./getOrderinfo");
const { orderServer } = require("./orderServer");
const { investBot } = require("./investBot");
const { pairs } = require("./config");
const { authExchangesForInvest } = require("./config");

Promise.all(pairs.map(getOrder))
  .then(pairArr => {
    pairArr.forEach(orderArr => {
      for (var i = 0; i < orderArr.length; i++) {
        let base = orderArr[i];
        if (base !== 1 && base !== 2 && base !== 3) {
          for (var j = i + 1; j < orderArr.length; j++) {
            let comp = orderArr[j];
            if (comp !== 1 && comp !== 2 && comp !== 3) {
              let orderComp = transformOrder(base, comp);
              if (
                authExchangesForInvest.includes(orderComp.mkBase) &&
                authExchangesForInvest.includes(orderComp.mkComp)
              )
                investBot(orderComp);
              orderServer(base, comp, orderComp);
            }
          }
        }
      }
    });
    console.log("All orderbook and comparison info saved to DB");
  })
  .catch(err => {
    console.log(err);
  });
