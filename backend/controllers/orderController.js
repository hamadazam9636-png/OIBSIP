const Order = require("../models/Order");


// ================= GET ORDERS =================
// Admin  -> All orders
// User   -> Only own orders
const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      // Admin can see every order
      orders = await Order.find()
        .sort({ createdAt: -1 });
    } else {
      // Normal user can only see their own orders
      if (!req.user.email) {
        return res.status(401).json({
          message: "User email not found in authentication token",
        });
      }

      orders = await Order.find({
        customerEmail: req.user.email,
      }).sort({ createdAt: -1 });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


// ================= GET SINGLE ORDER =================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Admin can view any order
    if (req.user.role === "admin") {
      return res.status(200).json(order);
    }

    // User can only view their own order
    const userEmail = String(req.user.email || "").toLowerCase();
    const orderEmail = String(order.customerEmail || "").toLowerCase();

    if (orderEmail !== userEmail) {
      return res.status(403).json({
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};


// ================= CREATE ORDER =================
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;

    // Email should come from JWT,
    // not from frontend, so a user cannot create
    // an order under another customer's email.
    const customerEmail = req.user.email;

    if (!customerEmail) {
      return res.status(401).json({
        message: "User email not found in authentication token",
      });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};


// ================= UPDATE ORDER STATUS =================
// Admin only
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};


// ================= DELETE ORDER =================
// Admin -> Any order
// User  -> Own order only
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Admin can delete any order
    if (req.user.role === "admin") {
      await order.deleteOne();

      return res.status(200).json({
        message: "Order deleted successfully",
      });
    }

    // User can delete only their own order
    const userEmail = String(req.user.email || "").toLowerCase();
    const orderEmail = String(order.customerEmail || "").toLowerCase();

    if (orderEmail !== userEmail) {
      return res.status(403).json({
        message: "You are not authorized to delete this order",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};


module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};