const User = require("../models/User");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select(
        "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomers,
};