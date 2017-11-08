const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// NOTE: General model for the ticker info:
var tickerSchema = mongoose.Schema({
  mkt: String,
  symbol: String,
  timestamp: Number,
  datetime: Date,
  high: Number,
  low: Number,
  bid: Number,
  ask: Number,
  vwap: Number,
  open: Number,
  close: Number,
  first: Number,
  last: Number,
  change: Number,
  percentage: Number,
  average: Number,
  baseVolume: Number,
  quoteVolume: Number,
  info: Object
});

// NOTE: Adding each model
var Krakentick = mongoose.model("Krakentick", tickerSchema);
var Bitfinex2tick = mongoose.model("Bitfinex2tick", tickerSchema);
var Dsxtick = mongoose.model("Dsxtick", tickerSchema);
var Allcointick = mongoose.model("Allcointick", tickerSchema);
var Anxprotick = mongoose.model("Anxprotick", tickerSchema);
var Bitbaytick = mongoose.model("Bitbaytick", tickerSchema);
var Bitlishtick = mongoose.model("Bitlishtick", tickerSchema);
var Bittrextick = mongoose.model("Bittrextick", tickerSchema);
var Acxtick = mongoose.model("Acxtick", tickerSchema);
var Bithumbtick = mongoose.model("Bithumbtick", tickerSchema);
var Bleutradetick = mongoose.model("Bleutradetick", tickerSchema);
var Btcturktick = mongoose.model("Btcturktick", tickerSchema);
var Bxinthtick = mongoose.model("Bxinthtick", tickerSchema);
var Ccextick = mongoose.model("Ccextick", tickerSchema);
var Cextick = mongoose.model("Cextick", tickerSchema);
var Coingitick = mongoose.model("Coingitick", tickerSchema);
var Coinmarketcaptick = mongoose.model("Coinmarketcaptick", tickerSchema);
var Cryptopiatick = mongoose.model("Cryptopiatick", tickerSchema);
var Exmotick = mongoose.model("Exmotick", tickerSchema);
var Gatecointick = mongoose.model("Gatecointick", tickerSchema);
var Gateiotick = mongoose.model("Gateiotick", tickerSchema);
var Hitbtc2tick = mongoose.model("Hitbtc2tick", tickerSchema);
var Liquitick = mongoose.model("Liquitick", tickerSchema);
var Lunotick = mongoose.model("Lunotick", tickerSchema);
var Livecointick = mongoose.model("Livecointick", tickerSchema);
var Poloniextick = mongoose.model("Poloniextick", tickerSchema);
var Qryptostick = mongoose.model("Qryptostick", tickerSchema);
var Quoinetick = mongoose.model("Quoinetick", tickerSchema);
var Southxchangetick = mongoose.model("Southxchangetick", tickerSchema);
var Therocktick = mongoose.model("Therocktick", tickerSchema);
var Tidextick = mongoose.model("Tidextick", tickerSchema);
var Wextick = mongoose.model("Wextick", tickerSchema);

module.exports = {
  Krakentick,
  Bitfinex2tick,
  Anxprotick,
  Allcointick,
  Dsxtick,
  Bitbaytick,
  Bitlishtick,
  Bittrextick,
  Acxtick,
  Bithumbtick,
  Bleutradetick,
  Btcturktick,
  Bxinthtick,
  Ccextick,
  Cextick,
  Coingitick,
  Coinmarketcaptick,
  Cryptopiatick,
  Gateiotick,
  Exmotick,
  Gatecointick,
  Hitbtc2tick,
  Liquitick,
  Lunotick,
  Livecointick,
  Poloniextick,
  Qryptostick,
  Quoinetick,
  Southxchangetick,
  Therocktick,
  Tidextick,
  Wextick
};
