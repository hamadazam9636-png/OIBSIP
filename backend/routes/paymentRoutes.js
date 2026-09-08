const express = require("express");

const {
  createPayment,
  verifyPayment,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Safepay checkout
router.post(
  "/create",
  protect,
  createPayment
);

// Verify Safepay payment
router.post(
  "/verify",
  protect,
  verifyPayment
);

module.exports = router;