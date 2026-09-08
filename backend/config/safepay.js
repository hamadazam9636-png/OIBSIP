const safepay = require("@sfpy/node-core");

const safepayClient = safepay(
  process.env.SAFE_PAY_SECRET_KEY,
  {
    authType: "secret",

    host:
      process.env.SAFE_PAY_BASE_URL ||
      "https://sandbox.api.getsafepay.com",
  }
);


module.exports = safepayClient;