const express = require("express");

const {
  getCustomers,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  admin,
  getCustomers
);

module.exports = router;