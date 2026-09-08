const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {

    pizza: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: false,
    },

    // Custom pizza ke liye
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Custom pizza ingredients
    base: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    sauce: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    cheese: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    vegetables: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryFee: {
      type: Number,
      default: 150,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "Safepay",
      ],
      default: "COD",
    },

    safepayTracker: {
      type: String,
      default: null,
    },

    paymentReference: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;