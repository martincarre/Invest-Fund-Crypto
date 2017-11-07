// NOTE: DB Name:
const dbName = 'tickerInfo';

// NOTE: Server Init.:
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var server = mongoose.connect(`mongodb://localhost/${dbName}`, {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED!');
});

// NOTE: Importing the mongoose models:
const { Krakentick } = require('./models/tickermodel');
const { Bitfitick } = require('./models/tickermodel');
const { Bitsotick } = require('./models/tickermodel');
const { Bistamptick } = require('./models/tickermodel');
const { Bitmextick } = require('./models/tickermodel');
const { Dsxtick } = require('./models/tickermodel');
const { Allcointick } = require('./models/tickermodel');
const { Anxprotick } = require('./models/tickermodel');
const { Binancetick } = require('./models/tickermodel');
const { Bitbaytick } = require('./models/tickermodel');

// NOTE: Getting the markets initiated from ccxt:
var ccxt = require('ccxt');
let kraken = new ccxt.kraken();
let bitfinex = new ccxt.bitfinex2();
let bitstamp = new ccxt.bitstamp();
let bitmex = new ccxt.bitmex();
let dsx = new ccxt.dsx();
let allcoin = new ccxt.allcoin();
let anxpro = new ccxt.anxpro();
let bitbay = new ccxt.bitbay();

async function getTicker() {
  // NOTE: Creating variables to be saved:
  var ktick = new Krakentick(await kraken.fetchTicker('BTC/USD'));
  var bfitick = new Bitfitick(await bitfinex.fetchTicker('BTC/USD'));
  var bstick = new Bistamptick(await bitstamp.fetchTicker('BTC/USD'));
  var bitmextick = new Bitmextick(await bitmex.fetchTicker('BTC/USD'));
  var dsxtick = new Dsxtick(await dsx.fetchTicker('BTC/USD'));
  var allctick = new Allcointick(await allcoin.fetchTicker('BTC/USD'));
  var anxtick = new Anxprotick(await anxpro.fetchTicker('BTC/USD'));
  var bitbtick = new Bitbaytick(await bitbay.fetchTicker('BTC/USD'));

  // NOTE: Saving variables:
  ktick.save((err, tick) => {
    if (err) console.log(err);
    console.log('KTICK Saved!');
  });
  bfitick.save((err, tick) => {
    if (err) console.log(err);
    console.log('BFITICK Saved!');
  });
  bstick.save((err, tick) => {
    if (err) console.log(err);
    console.log('BSTICK Saved!');
  });
  bitmextick.save((err, tick) => {
    if (err) console.log(err);
    console.log('BITMEXTICK Saved!');
  });
  dsxtick.save((err, tick) => {
    if (err) console.log(err);
    console.log('DSXTICK Saved!');
  });
  allctick.save((err, tick) => {
    if (err) console.log(err);
    console.log('ALLCTICK Saved!');
  });
  anxtick.save((err, tick) => {
    if (err) console.log(err);
    console.log('ANXTICK Saved!');
  });
  bitbtick.save((err, tick) => {
    if (err) console.log(err);
    console.log('BITBITCK Saved!');
  });
}
