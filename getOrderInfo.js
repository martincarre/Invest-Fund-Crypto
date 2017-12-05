var _ = require("lodash");
var ccxt = require("ccxt");
var MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR", "BCH/EUR"];
let delay = 1200;

// NOTE: Server initiation:

setInterval(function() {
  ccxt.exchanges.forEach(r => {
    let exchange = new ccxt[r]();
    if (exchange.hasFetchOrderBook) {
      pairs.forEach(p => {
        exchange
          .fetchOrderBook(p)
          .then(async order => {
            if (_.isObject(order) && order.bids[0][1]) {
              let now = Math.floor(new Date());
              order.mkt = r;
              order.pair = p;
              let mkmodel = r.charAt(0).toUpperCase() + r.slice(1) + "order";
              var url = `mongodb://localhost:27017/${"order" + p.slice(0, 3)}`;
              MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                var collection = db.collection(mkmodel);
                collection.insert(order, function(err, result) {});
                db.close();
              });
              let compOrder = {
                mkt: order.mkt,
                pair: order.pair,
                aprice: order.asks[0][0],
                avol: order.asks[0][1],
                bprice: order.bids[0][0],
                bvol: order.bids[0][1],
                sn: order.timestamp,
                ping: now - order.timestamp,
                fees: exchange.fees
              };
              var irl = `mongodb://localhost:27017/${"comp" + p.slice(0, 3)}`;
              MongoClient.connect(irl, function(err, db) {
                assert.equal(null, err);
                var collection = db.collection(mkmodel);
                collection.insert(compOrder, function(err, result) {});
                db.close();
              });
              console.log(compOrder);
              await new Promise(resolve => setTimeout(resolve, delay));
            } else {
            }
          })
          .catch(e => {});
      });
    }
  });
}, 2000);
