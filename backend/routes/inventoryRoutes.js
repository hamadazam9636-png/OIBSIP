const express = require("express");

const {
  getInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  updateStock,
  deleteInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

// Get all inventory
router.get("/", getInventory);

// Get single inventory item
router.get("/:id", getInventoryById);

// Create inventory item
router.post("/", createInventory);

// Update complete inventory item
router.put("/:id", updateInventory);

// Update stock quantity
router.patch("/:id/stock", updateStock);

// Delete inventory item
router.delete("/:id", deleteInventory);

module.exports = router;