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

function btcQ() {
  // return new Promise((resolve, reject) => { // ? Worth promisin? ??? //
  mkArr.map(o => {
    let mkmodel = o.charAt(0).toUpperCase() + o.slice(1);
    let nmarket = mkmodel + "order";

    let model = require("./models/ordermodel")[nmarket];
    model.findOne({ pair: "BTC/EUR" }, {}, {}, (err, order) => {
      if (order !== null) {
        console.log(order.bids[0] + " === " + order.mkt);
      } else {
        console.log(model.collection.name);
      }
    });
  });
}

btcQ();
