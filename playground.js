const { orderServer } = require("./orderServer");
let orderComp = {
  mkBase: "bitstamp",
  mkComp: "dsx",
  pairBase: "LTC/USD",
  pairComp: "LTC/USD",
  oriPriceInfo: {
    pBidBase: 149.3,
    pBidComp: 148.5,
    vBidBase: 33.5543,
    vBidComp: 2,
    pAskBase: 149.35,
    pAskComp: 149.295401,
    vAskBase: 2,
    vAskComp: 1.953
  },
  processedPriceInfo: {
    basePriceSpread: -0.8499999999999943,
    compPriceSpread: 0.00459900000001312,
    baseVolSpread: 0,
    compVolSpread: -31.6013
  },
  investInfo: {
    invest: true,
    baseForInvest: "comp",
    mkBuy: "dsx",
    counterPart: "base",
    mkSell: "bitstamp",
    pBuy: 149.295401,
    pSell: 149.3,
    vBuy: 1.953,
    vSell: 33.5543,
    fBuy: 0.0025,
    fSell: 0.0035,
    volumeSelector: "Buy",
    gross: {
      totalBuy: 291.573918153,
      totalSell: 291.58290000000005,
      totalProfit: 0.008981847000029575
    },
    net: {
      totalBuy: 292.5944268665355,
      totalSell: 290.85394275000004,
      totalProfit: -1.7404930983824443
    },
    orderToPass: {
      availability: false,
      availableToBuy: 192.13,
      vToBuy: 291.573918153,
      mToBuy: 99.44391815300003,
      availableToSell: 0,
      vToSell: 1.953,
      mToSell: 1.953,
      limit: false,
      missing: "sellMk",
      cryptVolume: 0,
      expected: {
        toBuy: 291.573918153,
        toSell: 291.58290000000005,
        exProfit: -1.7404930983824443,
        PoV: -0.005969303116711354
      },
      real: {
        toBuy: 0,
        toSell: 0,
        exProfit: 0
      }
    }
  },
  oriBalanceInfo: {
    baseBalance: {
      free: {
        BCH: 0,
        BTC: 0.02148266,
        ETH: 0,
        EUR: 190.19,
        LTC: 0,
        USD: 0,
        XRP: 0
      },
      used: {
        BCH: 0,
        BTC: 0,
        ETH: 0,
        EUR: 0,
        LTC: 0,
        USD: 0,
        XRP: 0
      },
      total: {
        BCH: 0,
        BTC: 0.02148266,
        ETH: 0,
        EUR: 190.19,
        LTC: 0,
        USD: 0,
        XRP: 0
      }
    },
    compBalance: {
      free: {
        BTC: 0.02683079,
        USD: 0,
        EUR: 192.13,
        LTC: 0,
        RUB: 0,
        ETH: 0,
        GBP: 0,
        BCH: 0,
        BTG: 0
      },
      used: {
        BTC: 0,
        USD: 0,
        EUR: 0,
        LTC: 0,
        RUB: 0,
        ETH: 0,
        GBP: 0,
        BCH: 0,
        BTG: 0
      },
      total: {
        BTC: 0.02683079,
        USD: 0,
        EUR: 192.13,
        LTC: 0,
        RUB: 0,
        ETH: 0,
        GBP: 0,
        BCH: 0,
        BTG: 0
      }
    }
  },
  oriFeesInfo: {
    baseFeesHard: 0.0025,
    compFeesHard: 0.0035
  },
  oriTimeInfo: {
    pingBase: -1895,
    pingComp: 2501,
    snBase: 1517997954000,
    snComp: 1517997958398
  },
  processedTimeInfo: {
    pingSpread: -4396,
    snSpread: -4398
  }
};

orderServer(null, null, orderComp);
