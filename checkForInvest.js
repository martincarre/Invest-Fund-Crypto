const _ = require("lodash");
const { maxTimeOut } = require("./config");
const { minPriceSpread } = require("./config");

function verifBaseInfo(orderComp) {
  // NOTE: **************** CHECKING BASIC INVESMENT RULES DEFINED IN THE CONFIG FILE
  if (
    orderComp.oriTimeInfo.pingBase < maxTimeOut &&
    orderComp.oriTimeInfo.pingComp < maxTimeOut &&
    orderComp.processedTimeInfo.snSpread < maxTimeOut &&
    orderComp.processedTimeInfo.pingSpread < maxTimeOut &&
    (orderComp.processedPriceInfo.basePriceSpread > minPriceSpread ||
      orderComp.processedPriceInfo.compPriceSpread > minPriceSpread)
  ) {
    // NOTE: ************************ CHECKING WHEN BASE IS THE BASE INVESTMENT
    if (orderComp.processedPriceInfo.basePriceSpread > minPriceSpread) {
      orderComp.investInfo = {
        invest: true,
        baseForInvest: "base",
        buyMk: orderComp.mkBase,
        counterPart: "comp",
        sellMk: orderComp.mkComp,
        pBuy: orderComp.oriPriceInfo.pAskBase,
        pSell: orderComp.oriPriceInfo.pBidComp,
        vBuy: orderComp.oriPriceInfo.vAskBase,
        vSell: orderComp.oriPriceInfo.vBidComp
      };
      if (orderComp.investInfo.vSell < orderComp.investInfo.vBuy) {
        orderComp.investInfo.volumeSelector = "Sell";
        orderComp.investInfo.finalVol = orderComp.investInfo.vSell;
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
            (1 + orderComp.oriFeesInfo.compFeesHard),
          totalProfit:
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pBidComp *
              (1 - orderComp.oriFeesInfo.baseFeesHard) -
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pAskBase *
              (1 + orderComp.oriFeesInfo.compFeesHard)
        };
      } else if (orderComp.investInfo.vSell > orderComp.investInfo.vBuy) {
        orderComp.investInfo.volumeSelector = "Buy";
        orderComp.investInfo.finalVol = orderComp.investInfo.vBuy;
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
            (1 + orderComp.oriFeesInfo.compFeesHard),
          totalProfit:
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pBidComp *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pAskBase *
              (1 + orderComp.oriFeesInfo.baseFeesHard)
        };
      } else {
        console.log("Something went wrong!");
      }
      return true;

      // NOTE: ************************ CHECKING WHEN COMP IS THE BASE INVESTMENT
    } else if (orderComp.processedPriceInfo.compPriceSpread > minPriceSpread) {
      orderComp.investInfo = {
        invest: true,
        baseForInvest: "comp",
        mkBuy: orderComp.mkComp,
        counterPart: "base",
        mkSell: orderComp.mkBase,
        pBuy: orderComp.oriPriceInfo.pAskComp,
        pSell: orderComp.oriPriceInfo.pBidBase,
        vBuy: orderComp.oriPriceInfo.vAskComp,
        vSell: orderComp.oriPriceInfo.vBidBase,
        volumeSelector: null
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
            (1 + orderComp.oriFeesInfo.baseFeesHard),
          totalProfit:
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pBidBase *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vSell *
              orderComp.oriPriceInfo.pAskComp *
              (1 + orderComp.oriFeesInfo.baseFeesHard)
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
            (1 + orderComp.oriFeesInfo.baseFeesHard),
          totalProfit:
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pBidBase *
              (1 - orderComp.oriFeesInfo.compFeesHard) -
            orderComp.investInfo.vBuy *
              orderComp.oriPriceInfo.pAskComp *
              (1 + orderComp.oriFeesInfo.baseFeesHard)
        };
      } else {
        // NOTE: Something went wrong here. This shouldn't happen ===> Error handling to be dev.
        console.log("Something went wrong![Basic Investment Rules]");
      }
      return true;
    } else {
      // NOTE: Something went wrong here. This shouldn't happen ===> Error handling to be dev.
      orderComp.investInfo.invest = false;
      return null;
    }
  } else {
    // NOTE: in case the basic investment rules were not respected
    orderComp.investInfo.invest = false;
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
    console.log("[ERROR]: Balance Check Error");
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
    if (availableToBuy === 0 && availableToSell === 0) {
      orderToPass(
        orderComp,
        false,
        availableToBuy,
        vToBuy,
        availableToSell,
        vToSell,
        false,
        "both"
      );
    } else if (availableToBuy === 0 && availableToSell > 0) {
      orderToPass(
        orderComp,
        false,
        availableToBuy,
        vToBuy,
        availableToSell,
        vToSell,
        false,
        "buyMk"
      );
    } else if (availableToBuy > 0 && availableToSell === 0) {
      orderToPass(
        orderComp,
        false,
        availableToBuy,
        vToBuy,
        availableToSell,
        vToSell,
        false,
        "sellMk"
      );
    } else if (availableToBuy > 0 && availableToSell > 0) {
      if (availableToBuy < vToBuy && availableToSell < vToSell) {
        orderToPass(
          orderComp,
          true,
          availableToBuy,
          vToBuy,
          availableToSell,
          vToSell,
          true,
          "both"
        );
      } else if (availableToBuy < vToBuy && availableToSell >= vToSell) {
        orderToPass(
          orderComp,
          true,
          availableToBuy,
          vToBuy,
          availableToSell,
          vToSell,
          true,
          "buyMk"
        );
      } else if (availableToBuy >= vToBuy && availableToSell < vToSell) {
        orderToPass(
          orderComp,
          true,
          availableToBuy,
          vToBuy,
          availableToSell,
          vToSell,
          true,
          "sellMk"
        );
      } else if (availableToBuy >= vToBuy && availableToSell >= vToSell) {
        orderToPass(
          orderComp,
          true,
          availableToBuy,
          vToBuy,
          availableToSell,
          vToSell,
          false,
          "none"
        );
      } else {
        console.log("something went wrong balance check 2nd level");
      }
    } else {
      console.log("something went wrong balance check 1st level");
    }
  }
}

function orderToPass(
  orderComp,
  avail,
  availableToBuy,
  vToBuy,
  availableToSell,
  vToSell,
  limit,
  missing
) {
  orderComp.investInfo.orderToPass = {
    availability: avail,
    availableToBuy: availableToBuy,
    vToBuy: vToBuy,
    mToBuy: vToBuy - availableToBuy,
    availableToSell: availableToSell,
    vToSell: vToSell,
    mToSell: vToSell - availableToSell,
    limit: limit,
    missing: missing
  };
}

module.exports = {
  verifBaseInfo,
  balanceCheck
};
