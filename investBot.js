const { verifBaseInfo } = require("./checkForInvest");
const { balanceCheck } = require("./checkForInvest");

async function investBot(orderComp) {
  let invest = await verifBaseInfo(orderComp);
  if (invest === true) {
    balanceCheck(orderComp);
    console.log(
      "[INVEST]: ",
      `${orderComp.mkBase}/${orderComp.mkComp}`,
      orderComp.pairBase + ": " + orderComp.investInfo.net.totalProfit
    );
  } else {
    console.log(
      "[NO INVEST]: ",
      `${orderComp.mkBase}/${orderComp.mkComp}`,
      orderComp.pairBase
    );
  }
}

module.exports = {
  investBot
};
