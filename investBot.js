const { verifBaseInfo } = require("./checkForInvest");
const { balanceCheck } = require("./checkForInvest");

// NOTE: CHECK TO AGGREGATE INFO BASED ON BASIC INFO RULES + BALANCE
async function investBot(orderComp) {
  let invest = await verifBaseInfo(orderComp);
  if (invest === true) balanceCheck(orderComp);
  return orderComp;
}

// NOTE: TRYING TO GET RID OF THE DOUBLES ===> ie. There might be an investment opportunity on DSX and EXMO
// and another one on KRAKEN and EXMO. However we can't take both since Exmo might have limited availability
// therefore checking for the best possible scenario ==> max. net.totalProfit

function doubleCheck(digestArr) {
  if (digestArr.length > 1) {
    for (var i = 0; i < digestArr.length; i++) {
      let a = digestArr[i];
      for (var j = i + 1; j < digestArr.length; j++) {
        let b = digestArr[j];
        if (a.mkBase === b.mkBase || a.mkComp === b.mkComp) {
          if (a.investInfo.net.totalProfit > b.investInfo.net.totalProfit) {
            digestArr.splice(j, 1);
          } else {
            digestArr.splice(i, 1);
          }
        }
      }
    }
    return digestArr;
  } else if (digestArr.length === 1) {
    return digestArr;
  }
}

module.exports = {
  investBot,
  doubleCheck
};
