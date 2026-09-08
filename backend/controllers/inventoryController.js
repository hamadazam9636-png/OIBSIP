const Inventory = require("../models/Inventory");

// --------------------------------
// Get all inventory items
// --------------------------------

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .sort({ createdAt: -1 });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory",
      error: error.message,
    });
  }
};


// --------------------------------
// Get single inventory item
// --------------------------------

const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory item",
      error: error.message,
    });
  }
};


// --------------------------------
// Create inventory item
// --------------------------------

const createInventory = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      threshold,
      available,
      price,
      image,
    } = req.body;

    const item = await Inventory.create({
      name,
      category,
      quantity,
      unit,
      threshold,
      available,
      price: price ?? 0,
      image: image ?? "",
    });

    res.status(201).json({
      message: "Inventory item created successfully",
      item,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create inventory item",
      error: error.message,
    });
  }
};


// --------------------------------
// Update inventory item
// --------------------------------

const updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      item,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update inventory",
      error: error.message,
    });
  }
};


// --------------------------------
// Update stock quantity + price
// --------------------------------

// Update stock quantity and price
const updateStock = async (req, res) => {
  try {
    const { quantity, price } = req.body;

    if (
      quantity === undefined ||
      Number(quantity) < 0
    ) {
      return res.status(400).json({
        message:
          "Quantity must be a valid number greater than or equal to 0",
      });
    }

    if (
      price === undefined ||
      Number(price) < 0
    ) {
      return res.status(400).json({
        message:
          "Price must be a valid number greater than or equal to 0",
      });
    }

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        quantity: Number(quantity),
        price: Number(price),
        available: Number(quantity) > 0,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message: "Stock and price updated successfully",
      item,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update stock",
      error: error.message,
    });
  }
};


// --------------------------------
// Delete inventory item
// --------------------------------

const deleteInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete inventory item",
      error: error.message,
    });
  }
};


// --------------------------------
// Exports
// --------------------------------

module.exports = {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  updateStock,
  deleteInventory,
};