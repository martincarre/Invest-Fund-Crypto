// NOTE: Setting up the currencies and market variables.
// These variables can be extended to more trading pairs and / or markets;

// If the markets are extended, you need to add:
// -----> the correct API keys in the keys file
// -----> the fees in the fees file

// Crypto being evaluated / traded on
let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR"];

// Exchanges lets you get the infos from the APIs and save them.
let exchanges = [
  "kraken",
  "exmo",
  "bitbay",
  "dsx",
  "livecoin",
  "bitfinex",
  "kuna"
];

// authExchangesForInvest will check for investment opportunities.
let authExchangesForInvest = ["exmo", "bitbay", "dsx", "kraken"];

// Investment Consideration variables:
var maxTimeOut = 2000;
var minPriceSpread = 1;

module.exports = {
  pairs,
  exchanges,
  authExchangesForInvest,
  maxTimeOut,
  minPriceSpread
};
