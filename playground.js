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

const res = _.reduce(
  arr,
  (result, item) => {
    const same = _.find(result, r =>
      _.some([r.mkBase === item.mkBase, r.mkComp === item.mkComp])
    ); // find same already added item

    if (same !== undefined) {
      if (same.invest.profit >= item.invest.profit) {
        return result; // do nothing if profit is less than already added
      }

      return _.chain(result) // remove item with smaller profit and push item with higher profit
        .reject({ mkBase: same.mkBase, mkComp: same.mkComp })
        .concat(item)
        .value();
    }

    return _.concat(result, item); // just push item
  },
  []
);

// console.log(res);
