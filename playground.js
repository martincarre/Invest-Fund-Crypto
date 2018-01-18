const _ = require("lodash");

var arr = [
  { mk: "test", invest: { profit: 10 }, availability: true },
  { mk: "test", invest: { profit: 15 }, availability: false },
  { mk: "test1", invest: { profit: 8 }, availability: true },
  { mk: "test2", invest: { profit: 6 }, availability: true },
  { mk: "test", invest: { profit: 1 }, availability: true }
];
selectedArr = [];
finalArr = [];
arr.forEach(o => {
  if (o.mk === "test") {
    selectedArr.push(o);
  } else {
    finalArr.push(o);
  }
});

finalArr.push(_.maxBy(selectedArr, "invest.profit"));

console.log(finalArr);
