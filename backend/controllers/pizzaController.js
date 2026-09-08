const Pizza = require("../models/Pizza");

// Get all pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find().sort({ createdAt: -1 });

    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pizzas",
      error: error.message,
    });
  }
};

// Get single pizza
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pizza",
      error: error.message,
    });
  }
};

// Create pizza
const createPizza = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      price,
      rating,
      popular,
      category,
      available,
    } = req.body;

    const pizza = await Pizza.create({
      name,
      description,
      image,
      price,
      rating,
      popular,
      category,
      available,
    });

    res.status(201).json({
      message: "Pizza created successfully",
      pizza,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create pizza",
      error: error.message,
    });
  }
};

// Update pizza
const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      message: "Pizza updated successfully",
      pizza,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update pizza",
      error: error.message,
    });
  }
};

// Delete pizza
const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      message: "Pizza deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete pizza",
      error: error.message,
    });
  }
};

module.exports = {
  getPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};