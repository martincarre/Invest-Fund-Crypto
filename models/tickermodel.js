const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// NOTE: General model for the ticker info:
var tickerSchema = mongoose.Schema({
  mk: String,
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
var Krakentick = mongoose.model('Krakentick', tickerSchema);
var Bitfitick = mongoose.model('Bitfitick', tickerSchema);
var Bistamptick = mongoose.model('Bistamptick', tickerSchema);
var Bitmextick = mongoose.model('Bitmextick', tickerSchema);
var Dsxtick = mongoose.model('Dsxtick', tickerSchema);
var Allcointick = mongoose.model('Allcointick', tickerSchema);
var Anxprotick = mongoose.model('Anxprotick', tickerSchema);
var Bitbaytick = mongoose.model('Bitbaytick', tickerSchema);

module.exports = {
  Krakentick,
  Bitfitick,
  Bistamptick,
  Bitmextick,
  Anxprotick,
  Allcointick,
  Dsxtick,
  Bitbaytick
};
