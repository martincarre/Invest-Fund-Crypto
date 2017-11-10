// NOTE: Server Init.:
const mongo = require("mongodb");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var server = mongoose.connect(`mongodb://localhost/tickerInfo`, {
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
  "bitfinex2",
  "dsx",
  "acx",
  "bithumb",
  "bitlish",
  "bleutrade",
  "btcturk",
  "bxinth",
  "ccex",
  "cex",
  "coingi",
  "coinmarketcap",
  "cryptopia",
  "exmo",
  "gatecoin",
  "gateio",
  "hitbtc2",
  "liqui",
  "luno",
  "livecoin",
  "poloniex",
  "qryptos",
  "quoine",
  "southxchange",
  "therock",
  "tidex",
  "wex"
];

setInterval(async function() {
  for (var i = 0; i < mkArr.length; i++) {
    // NOTE: Initializing the market for ccxt import:
    let mkt = mkArr[i];
    let exchange = new ccxt[mkt]();

    // NOTE: Preparing model name for DB integration:
    let mkmodel = mkt.charAt(0).toUpperCase() + mkt.slice(1);
    let nmodel = mkmodel + "tick";
    let model = require("./models/tickermodel")[nmodel];

    // NOTE: Getting the info via ccxt and saving into the DB:
    let allTicks = await exchange.fetchTickers();
    Object.keys(allTicks).forEach(k => {
      let info = allTicks[k];
      info.mkt = mkt;
      let tick = new model(info);
      tick.save((err, tick) => {
        if (err) console.log(err);
      });
    });
    console.log(`${mkt}: Tickers added to the DB.`);
  }
}, 1500);
