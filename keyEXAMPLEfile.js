// NOTE: Please replicate this file with your own credentials.
// Watch-out! Some markets require more information, others do not support the nonce reseter.
// Please refer to every exchange's specificity to calibrate correctly this file

let timeout = 1500;

keys = {
  kraken: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  bitfinex: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  livecoin: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  dsx: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  bitbay: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true
  },
  exmo: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  kuna: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  },
  bitstamp: {
    timeout: timeout,
    apiKey: "XXXXXXXXXX",
    secret: "XXXXXXXXXX",
    uid: "XXXXXXXXX",
    enableRateLimit: true,
    nonce() {
      return this.milliseconds();
    }
  }
};

module.exports = {
  keys
};
