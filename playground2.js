const _ = require("lodash");

var arr = [
  {
    mkBase: "test",
    mkComp: "test1",
    invest: { profit: 10 },
    availability: true,
    option: 1
  },
  {
    mkBase: "test",
    mkComp: "test1",
    invest: { profit: 15 },
    availability: false,
    option: 2
  },
  {
    mkBase: "test1",
    mkComp: "test",
    invest: { profit: 8 },
    availability: true,
    option: 3
  },
  {
    mkBase: "test2",
    mkComp: "test",
    invest: { profit: 6 },
    availability: true,
    option: 4
  },
  {
    mkBase: "test",
    mkComp: "test2",
    invest: { profit: 6 },
    availability: true,
    option: 5
  },
  {
    mkBase: "test",
    mkComp: "test3",
    invest: { profit: 7 },
    availability: true,
    option: 6
  },
  {
    mkBase: "test",
    mkComp: "test3",
    invest: { profit: 10 },
    availability: true,
    option: 7
  },
  {
    mkBase: "test3",
    mkComp: "test4",
    invest: { profit: 10 },
    availability: true,
    option: 8
  }
];
const count = arr.reduce((tally, fruit) => {
  tally = (tally || 0) + 1;
  return tally;
}, {});

console.log(count);
