// NOTE: Server Init.:
const mongo = require("mongodb");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var server = mongoose.connect(`mongodb://localhost/orderInfo`, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {});

// NOTE: CCXT Import:
var ccxt = require("ccxt");

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

setInterval(async () => {
  for (var i = 0; i < mkArr.length; i++) {
    let mkt = mkArr[i];
    let exchange = new ccxt[mkt]();

    // NOTE: Preparing model name for DB integration:
    let mkmodel = mkt.charAt(0).toUpperCase() + mkt.slice(1);
    let nmodel = mkmodel + "order";
    let model = require("./models/ordermodel")[nmodel];

    let delay = 2000;
    let markets = await exchange.fetchMarkets();
    markets.map(async res => {
      if (
        res.symbol === "BTC/EUR" ||
        res.symbol === "ETH/EUR" ||
        res.symbol === "BCH/EUR" ||
        res.symbol === "LTC/EUR"
      ) {
        const orders = await exchange.fetchOrderBook(res.symbol);
        orders.pair = res.symbol;
        orders.mkt = mkt;
        let book = new model(orders);
        book.save((err, book) => {
          if (err) console.log(err);
        });
        await new Promise(resolve => setTimeout(resolve, delay)); // rate limit
      }
    });
    console.log(`${mkt}: Orders added`);
  }
}, 2000);
