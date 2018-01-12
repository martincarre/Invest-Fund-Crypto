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
  "kuna",
  "livecoin",
  "bitfinex"
];

// authExchangesForInvest will check for investment opportunities.
let authExchangesForInvest = ["exmo", "bitbay", "dsx"];

module.exports = {
  pairs,
  exchanges,
  authExchangesForInvest
};
