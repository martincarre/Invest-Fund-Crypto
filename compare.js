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
const { minProfit } = require("./config");
let i = 0;

setInterval(async function() {
  console.log("Loop: ", i++);
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
                if (orderComp) {
                  if (
                    authExchangesForInvest.includes(orderComp.mkBase) &&
                    authExchangesForInvest.includes(orderComp.mkComp)
                  ) {
                    var finalOrder = await investBot(orderComp);
                    if (finalOrder.investInfo.invest === true) {
                      if (
                        finalOrder.investInfo.orderToPass.real.PoV > minProfit
                      ) {
                        digestArr.push(finalOrder);
                        orderServer(base, comp, null);
                      } else {
                        console.log(
                          `${finalOrder.mkBase} / ${finalOrder.mkComp} - ${
                            finalOrder.pairBase
                          }: No cash available or no profit`,
                          JSON.stringify(
                            finalOrder.investInfo.orderToPass.real,
                            null,
                            3
                          )
                        );
                        orderServer(base, comp, finalOrder);
                      }
                    } else {
                      console.log(
                        `${finalOrder.mkBase} / ${finalOrder.mkComp} - ${
                          finalOrder.pairBase
                        }: No arbitrage opportunity was found`
                      );
                      orderServer(base, comp, finalOrder);
                    }
                  }
                } else {
                  console.log("ERROR: No orderComp");
                }
              }
            }
          }
        }
        let doubleFreeArr = await doubleCheck(digestArr);
        doubleFreeArr.forEach(o => {
          console.log(
            o.pairBase +
              ": " +
              o.investInfo.mkBuy +
              "/" +
              o.investInfo.mkSell +
              ": " +
              JSON.stringify(o.investInfo.orderToPass.real, null, 3)
          );
        });
        orderPass(doubleFreeArr);
      });
      console.log("All orderbook and comparison info saved to DB");
    })
    .catch(err => {
      console.log(err);
    });
}, 15000);
