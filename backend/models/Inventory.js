const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Base",
        "Sauce",
        "Cheese",
        "Vegetable",
        "Other",
      ],
      required: true,
    },

    price: {
      type: Number,
      min: 0,
      default: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
      default: "pieces",
    },

    threshold: {
      type: Number,
      required: true,
      min: 0,
      default: 5,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model(
  "Inventory",
  inventorySchema
);

module.exports = Inventory;