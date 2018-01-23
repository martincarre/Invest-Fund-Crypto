var _ = require("lodash");
var ccxt = require("ccxt");
const { getOrder } = require("./getOrderinfo");
const { transformOrder } = require("./getOrderinfo");
const { orderServer } = require("./orderServer");
const { investBot } = require("./investBot");
const { pairs } = require("./config");
const { authExchangesForInvest } = require("./config");
const { doubleCheck } = require("./investBot");
const { orderPass } = require("./investBot");

Promise.all(pairs.map(getOrder))
  .then(pairArr => {
    pairArr.forEach(async orderArr => {
      let digestArr = [];
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
              ) {
                var finalOrder = await investBot(orderComp);
                if (finalOrder.investInfo.invest === true) {
                  // NOTE: ADD HERE CHEK IF AVAILABLE CASH <================ /!\ /!\
                  digestArr.push(finalOrder);
                  orderServer(base, comp, finalOrder);
                } else {
                  orderServer(base, comp, finalOrder);
                }
              }
            }
          }
        }
      }
      let doubleFreeArr = await doubleCheck(digestArr);
      orderPass(doubleFreeArr);
    });
    console.log("All orderbook and comparison info saved to DB");
  })
  .catch(err => {
    console.log(err);
  });
