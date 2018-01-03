var MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

// NOTE: Server initiation:
function orderServer(base, comp, order) {
  var url = "mongodb://localhost:27017/orderInfo";
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertOrder(db, base, comp, function() {});
    insertOrderComp(db, base.mkt, comp.mkt, base.pair, order, function() {});
    db.close();
  });
}

// NOTE: DB Insert for the Comparisons
function insertOrderComp(db, baseMkt, compMkt, pair, order, callback) {
  let colModel = "comp" + pair.slice(0, 3);
  let collection = db.collection(colModel);
  collection.insert(order, function(err, result) {
    console.log(
      `SUCCESS: added comparison between ${baseMkt} & ${compMkt} for ${pair}`
    );
    callback(result);
  });
}

// NOTE: DB Insert for the Orders.
function insertOrder(db, base, comp, callback) {
  let collection = db.collection(base.pair);
  collection.insert(base, function(err, result) {
    console.log(`SUCCESS: ${base.mkt} Order Book Added to the DB`);
  });
  collection = db.collection(comp.pair);
  collection.insert(comp, function(err, result) {
    console.log(`SUCCESS: ${comp.mkt} Order Book Added to the DB`);
  });
}

module.exports = {
  orderServer
};
