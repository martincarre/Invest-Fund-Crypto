const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var orderSchema = mongoose.Schema({
  bids: Array,
  asks: Array,
  timestamp: Number,
  datetime: Date,
  pair: String,
  mkt: String
});

// NOTE: Adding each model
var Krakenorder = mongoose.model("Krakenorder", orderSchema);
var Dsxorder = mongoose.model("Dsxorder", orderSchema);
var Bitlishorder = mongoose.model("Bitlishorder", orderSchema);
var Cexorder = mongoose.model("Cexorder", orderSchema);
var Gatecoinorder = mongoose.model("Gatecoinorder", orderSchema);
var Hitbtc2order = mongoose.model("Hitbtc2order", orderSchema);
var Livecoinorder = mongoose.model("Livecoinorder", orderSchema);
var Quoineorder = mongoose.model("Quoineorder", orderSchema);
var Southxchangeorder = mongoose.model("Southxchangeorder", orderSchema);
var Therockorder = mongoose.model("Therockorder", orderSchema);
var Wexorder = mongoose.model("Wexorder", orderSchema);
var Bittrexorder = mongoose.model("Bittrexorder", orderSchema);

module.exports = {
  Krakenorder,
  Dsxorder,
  Bitlishorder,
  Cexorder,
  Gatecoinorder,
  Hitbtc2order,
  Livecoinorder,
  Quoineorder,
  Southxchangeorder,
  Therockorder,
  Wexorder,
  Bittrexorder
};
