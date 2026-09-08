const express = require("express");

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================================
// GET ALL / OWN ORDERS
// =====================================================
// Admin  -> All orders
// User   -> Own orders only
router.get(
  "/",
  protect,
  getOrders
);


// =====================================================
// GET SINGLE ORDER
// =====================================================
// Admin -> Any order
// User  -> Own order only
router.get(
  "/:id",
  protect,
  getOrderById
);


// =====================================================
// CREATE ORDER
// =====================================================
// Logged-in users
router.post(
  "/",
  protect,
  createOrder
);


// =====================================================
// UPDATE ORDER STATUS
// =====================================================
// Admin only
router.patch(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);


// =====================================================
// DELETE ORDER
// =====================================================
// Admin -> Any order
// User  -> Own order only
router.delete(
  "/:id",
  protect,
  deleteOrder
);


module.exports = router;