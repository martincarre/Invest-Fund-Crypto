// NOTE: Setting up the currencies and market variables.
// These variables can be extended to more trading pairs and / or markets;

// If the markets are extended, you need to add:
// -----> the correct API keys in the keys file
// -----> the fees in the fees file

// Crypto being evaluated / traded on
let pairs = ["ETH/EUR", "BTC/EUR", "LTC/EUR", "XRP/EUR"];

// Exchanges lets you get the infos from the APIs and save them.
let exchanges = [
  "kraken",
  "exmo",
  "bitbay",
  "dsx",
  "livecoin",
  "bitfinex",
  "kuna",
  "bitstamp"
];

// authExchangesForInvest will check for investment opportunities.
let authExchangesForInvest = ["bitbay", "dsx", "bitstamp"];

// Investment Consideration variables:
var maxTimeOut = 3000;
var minProfit = 0.02; // NOTE: Min profit expressed in % over buy volume
var fundFee = 0.25; // NOTE: Fee charged on positive and successful operation by the fund.

// Exports:
module.exports = {
  pairs,
  exchanges,
  authExchangesForInvest,
  maxTimeOut,
  minProfit,
  fundFee
};
