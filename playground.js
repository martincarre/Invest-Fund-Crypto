const ccxt = require("ccxt");

let kraken = new ccxt.kraken({
  timeout: 2500,
  apiKey: "8+6pUuV7qONTxIbOqyu6it3Dtg/oLHY3njjGP99p/ZOkMFhIavMW5Qra",
  secret:
    "xDxxXZIgyJfADqp1+JMsll9EgP0SJz9d8B6Q3QH6Vsa7buAppmjp308Goo13DMHGRLa0X9VQcb37r+EneKOdcA==",
  enableRateLimit: true,
  nonce() {
    return this.milliseconds();
  }
});

kraken
  .fetchBalance()
  .then(b => {
    console.log(b);
  })
  .catch(err => {
    console.log(err);
  });
