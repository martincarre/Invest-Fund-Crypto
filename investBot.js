var _ = require("lodash");
var ccxt = require("ccxt");
var maxTimeOut = 2000;
var minPriceSpread = 5;

function investBot(orderComp) {
  let invest = verifBaseInfo(orderComp);
  if (invest === true) {
    console.log(orderComp.investInfo);
  } else {
  }
}

function verifBaseInfo(orderComp) {
  if (
    orderComp.oriTimeInfo.pingBase < maxTimeOut &&
    orderComp.oriTimeInfo.pingComp < maxTimeOut &&
    orderComp.processedTimeInfo.snSpread < maxTimeOut &&
    orderComp.processedTimeInfo.pingSpread < maxTimeOut &&
    (orderComp.processedPriceInfo.basePriceSpread > minPriceSpread ||
      orderComp.processedPriceInfo.compPriceSpread > minPriceSpread)
  ) {
    if (orderComp.processedPriceInfo.basePriceSpread > minPriceSpread) {
      orderComp.investInfo = {
        invest: true,
        baseForInvest: "base",
        pBuy: orderComp.oriPriceInfo.pAskBase,
        pSell: orderComp.oriPriceInfo.pBidComp,
        vBuy: orderComp.oriPriceInfo.vAskBase,
        vSell: orderComp.oriPriceInfo.vBidComp,
        volumeSelector: null,
        totalBuy: null,
        totalSell: null,
        totalProfit: null
      };
      if (orderComp.investInfo.vSell < orderComp.investInfo.vBuy) {
        orderComp.investInfo.totalBuy =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskBase;
        orderComp.investInfo.volumeSelector = "Sell";
        orderComp.investInfo.totalSell =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidComp;
        orderComp.investInfo.totalProfit =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidComp -
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskBase;
      } else if (orderComp.investInfo.vSell > orderComp.investInfo.vBuy) {
        orderComp.investInfo.totalBuy =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskBase;
        orderComp.investInfo.volumeSelector = "Buy";
        orderComp.investInfo.totalSell =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidComp;
        orderComp.investInfo.totalProfit =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidComp -
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskBase;
      } else {
        console.log("Something went wrong!");
      }
      return true;

      // NOTE: *****
    } else if (orderComp.processedPriceInfo.compPriceSpread > minPriceSpread) {
      orderComp.investInfo = {
        invest: true,
        baseForInvest: "comp",
        pBuy: orderComp.oriPriceInfo.pAskComp,
        pSell: orderComp.oriPriceInfo.pBidBase,
        vBuy: orderComp.oriPriceInfo.vAskComp,
        vSell: orderComp.oriPriceInfo.vBidBase,
        volumeSelector: null,
        totalBuy: null,
        totalSell: null,
        totalProfit: null
      };
      if (orderComp.investInfo.vSell < orderComp.investInfo.vBuy) {
        orderComp.investInfo.totalBuy =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskComp;
        orderComp.investInfo.volumeSelector = "Sell";
        orderComp.investInfo.totalSell =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidBase;
        orderComp.investInfo.totalProfit =
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidBase -
          orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskComp;
      } else if (orderComp.investInfo.vSell > orderComp.investInfo.vBuy) {
        orderComp.investInfo.totalBuy =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskComp;
        orderComp.investInfo.volumeSelector = "Buy";
        orderComp.investInfo.totalSell =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidBase;
        orderComp.investInfo.totalProfit =
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidBase -
          orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskComp;
      } else {
        console.log("Something went wrong!");
      }
      return true;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = {
  investBot
};
