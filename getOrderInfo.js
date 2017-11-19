var _ = require("lodash");
var ccxt = require("ccxt");
var MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR", "BCH/EUR"];
let delay = 1200;

// NOTE: Server initiation:
var url = "mongodb://localhost:27017/orderInfo";
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertTickers(db, function() {});
});

var insertTickers = function(db, callback) {
  setInterval(function() {
    ccxt.exchanges.forEach(r => {
      let exchange = new ccxt[r]();
      if (exchange.hasFetchOrderBook)
        pairs.forEach(p => {
          exchange
            .fetchOrderBook(p)
            .then(async order => {
              if (_.isObject(order)) {
                order.mkt = r;
                let mkmodel = r.charAt(0).toUpperCase() + r.slice(1) + "order";
                var collection = db.collection(mkmodel);
                collection.insert(order, function(err, result) {
                  callback(result);
                });
                await new Promise(resolve => setTimeout(resolve, delay));
              } else {
                console.log(`${r} not added`);
              }
            })
            .catch(e => {});
          console.log(`${r} added - ${p}`);
        });
    });
  }, 2000);
};
