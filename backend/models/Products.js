const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  wash_type: {
    type: [String],
    required: true,
    enum: ["washing-machine", "ironing", "towel", "bleach"],
  },
  price_per_unit: {
    type: Number,
    required: true,
    default: 0,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
