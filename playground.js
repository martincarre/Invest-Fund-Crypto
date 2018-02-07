const ccxt = require("ccxt");
let i = 0;

setInterval(async function() {
  console.log("test: ", i++);
  let kraken = new ccxt.kraken({
    timeout: 2500,
    apiKey: "XXXXXX",
    secret: "XXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  });

  let balance = await kraken
    .fetchBalance()
    .then(b => {
      return b;
    })
    .catch(err => {
      console.log(err);
      return 1;
    });

  console.log(balance);
}, 2000);
