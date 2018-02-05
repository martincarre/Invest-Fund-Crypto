var MongoClient = require("mongodb").MongoClient,
  assert = require("assert");

// NOTE: Server initiation:
function orderServer(base, comp, order) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db("orderInfo");
    insertOrder(db, base, comp, function() {});
    insertOrderComp(db, base.mkt, comp.mkt, base.pair, order, function() {});
    client.close();
  });
}

// NOTE: DB Insert for the Comparisons
function insertOrderComp(db, baseMkt, compMkt, pair, order, callback) {
  let colModel = "comp" + pair.slice(0, 3);
  let collection = db.collection(colModel);
  collection.insert(order, function(err, result) {
    callback(result);
  });
}

// NOTE: DB Insert for the Orders.
function insertOrder(db, base, comp, callback) {
  let collection = db.collection(base.pair);
  collection.insert(base, function(err, result) {
    callback(result);
  });
  collection = db.collection(comp.pair);
  collection.insert(comp, function(err, result) {
    callback(result);
  });
}

module.exports = {
  orderServer
};
