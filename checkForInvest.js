var maxTimeOut = 2000;
var minPriceSpread = 1;
const _ = require("lodash");
const { processOrder } = require("./orders");

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
        counterPart: "comp",
        pBuy: orderComp.oriPriceInfo.pAskBase,
        pSell: orderComp.oriPriceInfo.pBidComp,
        vBuy: orderComp.oriPriceInfo.vAskBase,
        vSell: orderComp.oriPriceInfo.vBidComp
      };
      if (orderComp.investInfo.vSell < orderComp.investInfo.vBuy) {
        orderComp.investInfo.volumeSelector = "Sell";
        orderComp.investInfo.gross = {
          totalBuy:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskBase,
          totalSell:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidComp,
          totalProfit:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidComp -
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskBase
        };
        orderComp.investInfo.net = {
          totalBuy:
            orderComp.investInfo.vSell *
            orderComp.oriPriceInfo.pAskBase *
            (1 - orderComp.oriFeesInfo.baseFeesHard),
          totalSell:
            orderComp.investInfo.vSell *
            orderComp.oriPriceInfo.pBidComp *
            (1 - orderComp.oriFeesInfo.compFeesHard),
          totalProfit:
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pBidComp *
              (1 - orderComp.oriFeesInfo.baseFeesHard) -
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pAskBase *
              (1 - orderComp.oriFeesInfo.compFeesHard)
        };
      } else if (orderComp.investInfo.vSell > orderComp.investInfo.vBuy) {
        orderComp.investInfo.volumeSelector = "Buy";
        orderComp.investInfo.gross = {
          totalBuy: orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskBase,
          totalSell:
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidComp,
          totalProfit:
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidComp -
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskBase
        };
        orderComp.investInfo.net = {
          totalBuy:
            orderComp.investInfo.vBuy *
            orderComp.oriPriceInfo.pAskBase *
            (1 - orderComp.oriFeesInfo.baseFeesHard),
          totalSell:
            orderComp.investInfo.vBuy *
            orderComp.oriPriceInfo.pBidComp *
            (1 - orderComp.oriFeesInfo.compFeesHard),
          totalProfit:
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pBidComp *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pAskBase *
              (1 - orderComp.oriFeesInfo.baseFeesHard)
        };
      } else {
        console.log("Something went wrong!");
      }
      return true;

      // NOTE: *****
    } else if (orderComp.processedPriceInfo.compPriceSpread > minPriceSpread) {
      orderComp.investInfo = {
        invest: true,
        baseForInvest: "comp",
        counterPart: "base",
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
        orderComp.investInfo.volumeSelector = "Sell";
        orderComp.investInfo.gross = {
          totalBuy:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskComp,
          totalSell:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidBase,
          totalProfit:
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pBidBase -
            orderComp.investInfo.vSell * orderComp.oriPriceInfo.pAskComp
        };
        orderComp.investInfo.net = {
          totalBuy:
            orderComp.investInfo.vSell *
            orderComp.oriPriceInfo.pAskComp *
            (1 - orderComp.oriFeesInfo.compFeesHard),
          totalSell:
            orderComp.investInfo.vSell *
            orderComp.oriPriceInfo.pBidBase *
            (1 - orderComp.oriFeesInfo.baseFeesHard),
          totalProfit:
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pBidBase *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pAskComp *
              (1 - orderComp.oriFeesInfo.baseFeesHard)
        };
      } else if (orderComp.investInfo.vSell > orderComp.investInfo.vBuy) {
        orderComp.investInfo.volumeSelector = "Buy";
        orderComp.investInfo.gross = {
          totalBuy: orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskComp,
          totalSell:
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidBase,
          totalProfit:
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pBidBase -
            orderComp.investInfo.vBuy * orderComp.oriPriceInfo.pAskComp
        };
        orderComp.investInfo.net = {
          totalBuy:
            orderComp.investInfo.vBuy *
            orderComp.oriPriceInfo.pAskComp *
            (1 - orderComp.oriFeesInfo.compFeesHard),
          totalSell:
            orderComp.investInfo.vBuy *
            orderComp.oriPriceInfo.pBidBase *
            (1 - orderComp.oriFeesInfo.baseFeesHard),
          totalProfit:
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pBidBase *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pAskComp *
              (1 - orderComp.oriFeesInfo.baseFeesHard)
        };
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

// NOTE: ***** Checking the balance ****

function balanceCheck(orderComp) {
  if (
    _.isUndefined(
      orderComp.oriBalanceInfo[orderComp.investInfo.baseForInvest + "Balance"]
        .free
    ) ||
    _.isNull(
      orderComp.oriBalanceInfo[orderComp.investInfo.baseForInvest + "Balance"]
        .free
    ) ||
    _.isUndefined(
      orderComp.oriBalanceInfo[orderComp.investInfo.counterPart + "Balance"]
        .free
    ) ||
    _.isNull(
      orderComp.oriBalanceInfo[orderComp.investInfo.counterPart + "Balance"]
        .free
    )
  ) {
  } else {
    let vToSell =
      orderComp.investInfo["v" + orderComp.investInfo.volumeSelector];
    let vToBuy = orderComp.investInfo.gross.totalBuy;
    let availableToBuy =
      orderComp.oriBalanceInfo[orderComp.investInfo.baseForInvest + "Balance"]
        .free.EUR;
    let availableToSell =
      orderComp.oriBalanceInfo[orderComp.investInfo.counterPart + "Balance"]
        .free[orderComp.pairComp.slice(0, 3)];
    if (availableToBuy !== 0 && availableToSell !== 0) {
      orderComp.investInfo.orderToPass = {
        availability: true,
        availableToBuy: availableToBuy,
        availableToSell: availableToSell,
        missing: false
      };
      processOrder(orderComp);
    } else if (availableToBuy === 0 && availableToSell !== 0) {
      orderComp.investInfo.orderToPass = {
        availability: false,
        availableToBuy: availableToBuy,
        availableToSell: availableToSell,
        missing: "availableToBuy"
      };
    } else if (availableToSell === 0 && availableToBuy !== 0) {
      orderComp.investInfo.orderToPass = {
        availability: false,
        availableToBuy: availableToBuy,
        availableToSell: availableToSell,
        missing: "availableToSell"
      };
    } else if (availableToSell === 0 && availableToBuy === 0) {
      orderComp.investInfo.orderToPass = {
        availability: false,
        availableToBuy: availableToBuy,
        availableToSell: availableToSell,
        missing: "both"
      };
    } else {
      console.log("Something went wrong[Checking availability]");
    }
  }
}

module.exports = {
  verifBaseInfo,
  balanceCheck
};
