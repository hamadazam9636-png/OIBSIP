const Order = require("../models/Order");
const User = require("../models/User");

const {
  createPaymentSession,
  createAuthToken,
  createCheckoutUrl,
  getPaymentTracker,
} = require("../services/paymentService");

// ======================================================
// CREATE SAFEPAY PAYMENT
// ======================================================
const createPayment = async (req, res) => {
  try {
    const {
      items,
      subtotal,
      deliveryFee,
      total,
    } = req.body;

    // ==================================================
    // Validate Cart
    // ==================================================
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // ==================================================
    // Validate Total
    // ==================================================
    const numericTotal = Number(total);

    if (!Number.isFinite(numericTotal) || numericTotal <= 0) {
      return res.status(400).json({
        message: "Invalid order total",
      });
    }

    // ==================================================
    // Get Logged-In User
    // ==================================================
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "User information not found in token",
      });
    }

    // ==================================================
    // Get User
    // ==================================================
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ==================================================
    // Customer Information
    // ==================================================
    const customerName =
      user.name ||
      user.username ||
      "Customer";

    const customerEmail = user.email;

    if (!customerEmail) {
      return res.status(400).json({
        message: "Your account does not have an email address",
      });
    }

    // ==================================================
    // Prepare Order Items
    // ==================================================
    const orderItems = items.map((item) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      const orderItem = {
        name: item.name || "Custom Pizza",
        image: item.image || "",
        price: Number.isFinite(price) ? price : 0,
        quantity:
          Number.isFinite(quantity) && quantity > 0
            ? quantity
            : 1,
      };

      // Add pizza ObjectId only when supplied
      if (
        item.pizza &&
        typeof item.pizza === "string" &&
        /^[0-9a-fA-F]{24}$/.test(item.pizza)
      ) {
        orderItem.pizza = item.pizza;
      }

      return orderItem;
    });

    // ==================================================
    // Validate Items
    // ==================================================
    const invalidItem = orderItems.find((item) => {
      return (
        !item.name ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isFinite(item.quantity) ||
        item.quantity < 1
      );
    });

    if (invalidItem) {
      return res.status(400).json({
        message: "Invalid cart item",
      });
    }

    // ==================================================
    // Create Order
    // ==================================================
    const order = await Order.create({
      customerName,
      customerEmail,

      items: orderItems,

      subtotal: Number(subtotal) || 0,

      deliveryFee: Number(deliveryFee) || 0,

      total: numericTotal,

      status: "Pending",

      paymentStatus: "Pending",

      paymentMethod: "Safepay",
    });

    console.log(
      "Order created:",
      order._id.toString()
    );

    try {
      // ==================================================
      // 1. Create Safepay Payment Session
      // ==================================================
      console.log(
        "Creating Safepay payment session..."
      );

      const paymentSession =
        await createPaymentSession({
          amount: numericTotal,
          orderId: order._id.toString(),
        });

      console.log(
        "Safepay payment session created:",
        paymentSession
      );

      const tracker =
        paymentSession?.data?.tracker;

      if (!tracker?.token) {
        console.error(
          "Invalid Safepay session response:",
          paymentSession
        );

        throw new Error(
          "Safepay tracker was not created"
        );
      }

      // ==================================================
      // 2. Create Authentication Token
      // ==================================================
      console.log(
        "Creating Safepay authentication token..."
      );

      const authResponse =
        await createAuthToken();

      const authToken =
        authResponse?.data;

      if (!authToken) {
        throw new Error(
          "Safepay authentication token was not created"
        );
      }

      // ==================================================
      // 3. Create Checkout URL
      // ==================================================
      const checkoutUrl =
        createCheckoutUrl({
          tracker: tracker.token,
          authToken,
          orderId: order._id.toString(),
        });

      if (!checkoutUrl) {
        throw new Error(
          "Safepay checkout URL was not created"
        );
      }

      // ==================================================
      // 4. Save Tracker
      // ==================================================
      order.safepayTracker =
        tracker.token;

      await order.save();

      console.log(
        "Safepay checkout successfully created"
      );

      // ==================================================
      // 5. Response
      // ==================================================
      return res.status(201).json({
        message: "Safepay checkout created",

        checkoutUrl,

        tracker: tracker.token,

        orderId: order._id.toString(),
      });

    } catch (paymentError) {
      console.error(
        "Safepay payment setup failed:",
        paymentError
      );

      order.paymentStatus = "Failed";

      await order.save();

      throw paymentError;
    }

  } catch (error) {
    console.error(
      "Safepay create payment error:",
      error
    );

    return res.status(500).json({
      message: "Unable to create payment",
      error: error.message,
    });
  }
};


// ======================================================
// VERIFY SAFEPAY PAYMENT
// ======================================================
// ======================================================
// VERIFY SAFEPAY PAYMENT
// ======================================================
const verifyPayment = async (req, res) => {
  try {
    const {
      tracker: rawTracker,
      orderId,
    } = req.body;

    // ==================================================
    // CLEAN TRACKER
    // ==================================================
    const tracker = String(rawTracker || "")
      .split("?")[0]
      .split("&")[0]
      .trim();

    console.log(
      "Raw tracker received:",
      rawTracker
    );

    console.log(
      "Clean Safepay tracker:",
      tracker
    );

    // ==================================================
    // Validate Tracker
    // ==================================================
    if (!tracker) {
      return res.status(400).json({
        message: "Safepay tracker is required",
      });
    }

    // ==================================================
    // Get Logged-In User
    // ==================================================
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // ==================================================
    // Get Payment Tracker From Safepay
    // ==================================================
    console.log(
      "Verifying Safepay tracker:",
      tracker
    );

    const payment =
      await getPaymentTracker(tracker);

    // ==================================================
    // Safepay Response
    // ==================================================
    console.log(
      "Safepay tracker response:",
      JSON.stringify(payment, null, 2)
    );

    // IMPORTANT:
    // Safepay response is:
    //
    // {
    //   ok: true,
    //   data: {
    //     token: "...",
    //     state: "TRACKER_ENDED"
    //   }
    // }
    //
    // So data itself is tracker data.

    const trackerData =
      payment?.data;

    if (!trackerData) {
      console.error(
        "Safepay tracker data missing:",
        payment
      );

      return res.status(404).json({
        message: "Payment tracker not found",
      });
    }

    // ==================================================
    // Extract Tracker State
    // ==================================================
    const trackerState = String(
      trackerData?.state || ""
    ).toUpperCase();

    console.log(
      "============================================"
    );

    console.log(
      "Safepay Tracker:",
      trackerData?.token
    );

    console.log(
      "Safepay Tracker State:",
      trackerState
    );

    console.log(
      "============================================"
    );

    // ==================================================
    // Find Order
    // ==================================================
    const query = {
      safepayTracker: tracker,
    };

    if (orderId) {
      query._id = orderId;
    }

    const order =
      await Order.findOne(query);

    if (!order) {
      return res.status(404).json({
        message:
          "Order associated with payment not found",
      });
    }

    // ==================================================
    // Authorization
    // ==================================================
    if (user.role !== "admin") {
      const userEmail =
        String(user.email || "")
          .trim()
          .toLowerCase();

      const orderEmail =
        String(order.customerEmail || "")
          .trim()
          .toLowerCase();

      if (
        !userEmail ||
        orderEmail !== userEmail
      ) {
        return res.status(403).json({
          message:
            "You are not authorized to verify this payment",
        });
      }
    }

    // ==================================================
    // Already Paid
    // ==================================================
    if (order.paymentStatus === "Paid") {
      console.log(
        "Payment already Paid:",
        order._id.toString()
      );

      return res.status(200).json({
        message: "Payment already verified",
        paymentStatus: "Paid",
        order,
      });
    }

    // ==================================================
    // PAYMENT SUCCESS
    // ==================================================
    //
    // Your actual Safepay response shows:
    //
    // state: "TRACKER_ENDED"
    //
    // Therefore this is the success condition.
    //
    if (trackerState === "TRACKER_ENDED") {
      console.log(
        "============================================"
      );

      console.log(
        "✅ SAFEPAY PAYMENT SUCCESS"
      );

      console.log(
        "Order:",
        order._id.toString()
      );

      console.log(
        "Tracker:",
        tracker
      );

      console.log(
        "============================================"
      );

      // ------------------------------------------------
      // Mark Payment Paid
      // ------------------------------------------------
      order.paymentStatus = "Paid";
      order.paymentMethod = "Safepay";

      // ------------------------------------------------
      // Save Payment Reference
      // ------------------------------------------------
      const paymentReference =
        trackerData?.charge?.token ||
        trackerData?.token ||
        tracker;

      if (paymentReference) {
        order.paymentReference =
          String(paymentReference);
      }

      // ------------------------------------------------
      // Save MongoDB
      // ------------------------------------------------
      await order.save();

      console.log(
        "✅ MongoDB order saved"
      );

      console.log(
        "MongoDB paymentStatus:",
        order.paymentStatus
      );

      // ------------------------------------------------
      // Verify From MongoDB
      // ------------------------------------------------
      const updatedOrder =
        await Order.findById(order._id);

      console.log(
        "✅ MongoDB paymentStatus AFTER FETCH:",
        updatedOrder?.paymentStatus
      );

      return res.status(200).json({
        message:
          "Payment verified successfully",

        paymentStatus:
          updatedOrder?.paymentStatus || "Paid",

        trackerState,

        order:
          updatedOrder || order,
      });
    }

    // ==================================================
    // PAYMENT FAILED
    // ==================================================
    if (
      trackerState === "TRACKER_FAILED"
    ) {
      console.log(
        "❌ SAFEPAY PAYMENT FAILED"
      );

      order.paymentStatus = "Failed";

      await order.save();

      return res.status(200).json({
        message: "Payment failed",

        paymentStatus: "Failed",

        trackerState,

        order,
      });
    }

    // ==================================================
    // STILL PENDING
    // ==================================================
    console.log(
      "⏳ Safepay payment is still pending"
    );

    return res.status(200).json({
      message:
        "Payment is still pending",

      paymentStatus:
        order.paymentStatus,

      trackerState,

      order,
    });

  } catch (error) {
    console.error(
      "Safepay verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Payment verification failed",

      error: error.message,
    });
  }
};


// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  createPayment,
  verifyPayment,
};