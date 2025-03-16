const Product = require("../models/Products");

const getProducts = async (_req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

const addProducts = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.json({
      status: "Success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProducts,
};
