const _ = require("lodash");
const ccxt = require("ccxt");
const e = "bitbay";
const { keys } = require("./keys");

let exchange = new ccxt[e](keys[e]);
exchange
  .fetchBalance()
  .then(b => {
    console.log(b);
  })
  .catch(e => {
    console.log(e);
  });
