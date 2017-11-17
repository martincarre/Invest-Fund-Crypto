const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const server = mongoose.connect("mongodb://localhost/orderInfo", {
  useMongoClient: true
});

const mkArr = [
  "bittrex",
  "kraken",
  "dsx",
  "bitlish",
  "cex",
  "gatecoin",
  "hitbtc2",
  "quoine",
  "southxchange",
  "therock",
  "wex"
];

const minimumGain = 5;
const maxTimeout = 5;
const compArr = [];
const totalGain = [];

// ********** USE SETINTERVAL
function btcQ(model, pairs) {
  return new Promise((resolve, reject) => {
    model.findOne(
      { pair: "BTC/EUR" }, // ******** Search to replace by a table to query all different pairs
      {},
      { sort: { timestamp: -1 } },
      function(err, tick) {
        resolve(tick);
      }
    );
  });
}

(async function() {
  for (var i = 0; i < mkArr.length; i++) {
    let mkt = mkArr[i];
    let mkmodel = mkt.charAt(0).toUpperCase() + mkt.slice(1);
    let nmarket = mkmodel + "order";
    let model = require("./models/ordermodel")[nmarket];
    let order = await btcQ(model);
    if (order) compArr.push(order);
  }
  compArr.map((order, index) => {
    // NOTE: Preping all the variables to compare and prepare the orders
    let mk1 = order.mkt;
    let orderSell = order.bids[0];
    let orderBuy = order.asks[0];
    let sn1 = order.timestamp;
    for (var i = 0; i < compArr.length; i++) {
      if (i !== index) {
        let mk2 = compArr[i].mkt;
        let orderSell2 = compArr[i].bids[0];
        let orderBuy2 = compArr[i].asks[0];
        let sn2 = compArr[i].timestamp;
        let compBS = orderSell2[0] - orderBuy[0];
        let compBS2 = orderSell[0] - orderBuy2[0];

        // NOTE: Checking if there's a potential profit
        if (compBS > 0) {
          // NOTE: Preping the orders with Q and prices:
          let toBuyQ = orderBuy[1];
          let toBuy$ = orderBuy[0];
          let toSellQ = orderSell2[1];
          let toSell$ = orderSell2[0];

          // NOTE: Verifying the quantities to prepare order
          if (toBuyQ > toSellQ) {
            // NOTE: Verifying the profit to prepare order
            let profit = toSellQ * toSell$ - toSellQ * toBuy$;
            if (profit > minimumGain) {
              totalGain.push(profit);
            }
          } else if (toBuyQ < toSellQ) {
            let profit = toBuyQ * toSell$ - toBuyQ * toBuy$;
            if (profit > minimumGain) {
              totalGain.push(profit);
            }
          }

          // ******* REVIEW IF THAT PART IS NECESSARY
        } else if (compBS2 > 0) {
          let toBuyQ = orderBuy2[1];
          let toBuy$ = orderBuy2[0];
          let toSellQ = orderSell[1];
          let toSell$ = orderSell[0];
          //   console.log(
          //     `${mk2}: €${compBS2} buy @ €${orderBuy2[0]} and sell @ €${
          //       orderSell[0]
          //     } @ ${mk1} **** Time difference: ${sn2 / 1000 -
          //       sn1 / 1000} *** Reference ${sn2 / 1000}`
          //   );
        }
      }
    }
  });
})();
