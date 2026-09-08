const safepay = require("../config/safepay");

// ======================================================
// Safepay Configuration
// ======================================================
const getBaseUrl = () => {
  return (
    process.env.SAFE_PAY_BASE_URL ||
    "https://sandbox.api.getsafepay.com"
  ).replace(/\/+$/, "");
};


// ======================================================
// Create Safepay Payment Session
// ======================================================
const createPaymentSession = async ({
  amount,
  orderId,
}) => {
  const baseUrl = getBaseUrl();

  const numericAmount = Number(amount);

  if (
    !Number.isFinite(numericAmount) ||
    numericAmount <= 0
  ) {
    throw new Error(
      "Invalid Safepay payment amount"
    );
  }

  const apiKey =
    process.env.SAFE_PAY_PUBLIC_KEY;

  const secretKey =
    process.env.SAFE_PAY_SECRET_KEY;

  if (!apiKey) {
    throw new Error(
      "SAFE_PAY_PUBLIC_KEY is missing from .env"
    );
  }

  if (!secretKey) {
    throw new Error(
      "SAFE_PAY_SECRET_KEY is missing from .env"
    );
  }

  const url =
    `${baseUrl}/order/payments/v3/`;

  const body = {
    merchant_api_key: apiKey,

    intent:
      process.env.SAFEPAY_INTENT ||
      "CYBERSOURCE",

    mode: "payment",

    entry_mode: "raw",

    currency: "PKR",

    amount: Math.round(
      numericAmount * 100
    ),

    metadata: {
      order_id: String(orderId),
    },

    include_fees: false,
  };

  console.log(
    "Safepay payment request:",
    {
      url,
      amount: body.amount,
      currency: body.currency,
      intent: body.intent,
      mode: body.mode,
      orderId:
        body.metadata.order_id,
    }
  );

  let response;

  try {
    response = await fetch(
      url,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-SFPY-MERCHANT-SECRET":
            secretKey,
        },

        body:
          JSON.stringify(body),
      }
    );
  } catch (networkError) {
    console.error(
      "Safepay payment network error:",
      networkError
    );

    throw new Error(
      `Unable to connect to Safepay payment API: ${networkError.message}`
    );
  }

  const responseText =
    await response.text();

  let data;

  try {
    data =
      responseText
        ? JSON.parse(responseText)
        : null;
  } catch {
    data = {
      raw: responseText,
    };
  }

  console.log(
    "Safepay payment response:",
    {
      status: response.status,
      ok: response.ok,
      hasData: !!data?.data,
      message:
        data?.status?.message ||
        data?.message ||
        null,
    }
  );

  if (!response.ok) {
    console.error(
      "Safepay payment API error:",
      data
    );

    throw new Error(
      data?.status?.message ||
      data?.message ||
      data?.error ||
      `Safepay payment API returned HTTP ${response.status}`
    );
  }

  if (!data?.data) {
    console.error(
      "Unexpected Safepay response:",
      data
    );

    throw new Error(
      "Safepay payment session was not returned"
    );
  }

  return data;
};


// ======================================================
// Create Safepay Authentication Token
// ======================================================
const createAuthToken = async () => {
  const baseUrl =
    getBaseUrl();

  const secretKey =
    process.env.SAFE_PAY_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "SAFE_PAY_SECRET_KEY is missing from .env"
    );
  }

  const url =
    `${baseUrl}/client/passport/v1/token`;

  console.log(
    "Creating Safepay authentication token..."
  );

  let response;

  try {
    response = await fetch(
      url,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-SFPY-MERCHANT-SECRET":
            secretKey,
        },
      }
    );
  } catch (networkError) {
    console.error(
      "Safepay auth network error:",
      networkError
    );

    throw new Error(
      `Unable to connect to Safepay authentication API: ${networkError.message}`
    );
  }

  const responseText =
    await response.text();

  let data;

  try {
    data =
      responseText
        ? JSON.parse(responseText)
        : null;
  } catch {
    data = {
      raw: responseText,
    };
  }

  console.log(
    "Safepay auth response:",
    {
      status: response.status,
      ok: response.ok,
      hasData: !!data?.data,
    }
  );

  if (!response.ok) {
    console.error(
      "Safepay auth error:",
      data
    );

    throw new Error(
      data?.status?.message ||
      data?.message ||
      data?.error ||
      "Failed to create Safepay authentication token"
    );
  }

  if (!data?.data) {
    throw new Error(
      "Safepay authentication token was not returned"
    );
  }

  return {
    data: data.data,
  };
};


// ======================================================
// Create Safepay Checkout URL
// ======================================================
const createCheckoutUrl = ({
  tracker,
  authToken,
  orderId,
}) => {
  if (!tracker) {
    throw new Error(
      "Safepay tracker is required"
    );
  }

  if (!authToken) {
    throw new Error(
      "Safepay authentication token is required"
    );
  }

  if (!orderId) {
    throw new Error(
      "Order ID is required"
    );
  }

  const environment =
    process.env.SAFEPAY_ENV ||
    "sandbox";

  const frontendUrl =
    process.env.FRONTEND_URL ||
    "http://localhost:5173";

  const redirectUrl =
    `${frontendUrl}/orders` +
    `?payment=success` +
    `&orderId=${encodeURIComponent(orderId)}` +
    `&tracker=${encodeURIComponent(tracker)}`;

  const cancelUrl =
    `${frontendUrl}/orders` +
    `?payment=cancelled` +
    `&orderId=${encodeURIComponent(orderId)}` +
    `&tracker=${encodeURIComponent(tracker)}`;

  const checkoutUrl =
    safepay.checkout.createCheckoutUrl({
      env: environment,

      tracker,

      tbt: authToken,

      source: "hosted",

      redirect_url:
        redirectUrl,

      cancel_url:
        cancelUrl,
    });

  console.log(
    "Safepay checkout URL:",
    checkoutUrl
  );

  return checkoutUrl;
};


// ======================================================
// Get Payment Tracker
// ======================================================
const getPaymentTracker = async (
  trackerToken
) => {
  if (!trackerToken) {
    throw new Error(
      "Safepay tracker token is required"
    );
  }

  const response =
    await safepay.reporter.payments.fetch(
      trackerToken
    );

  return response;
};


// ======================================================
// Exports
// ======================================================
module.exports = {
  createPaymentSession,
  createAuthToken,
  createCheckoutUrl,
  getPaymentTracker,
};