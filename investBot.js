const { verifBaseInfo } = require("./checkForInvest");
const { balanceCheck } = require("./checkForInvest");

function investBot(orderComp) {
  let invest = verifBaseInfo(orderComp);
  if (invest === true) {
    if (orderComp.investInfo.baseForInvest === "base") {
      // console.log(
      //   "base - " + orderComp.pairBase + ": ",
      //   orderComp.mkBase,
      //   orderComp.mkComp,
      //   orderComp.investInfo.net
      // );
    } else if (orderComp.investInfo.baseForInvest === "comp") {
      // console.log(
      //   "comp - " + orderComp.pairBase + ": ",
      //   orderComp.mkComp,
      //   orderComp.mkBase,
      //   orderComp.investInfo.net
      // );
    } else {
      console.log("An unexpected error occured");
    }
    balanceCheck(orderComp);
  } else {
  }
}

module.exports = {
  investBot
};
