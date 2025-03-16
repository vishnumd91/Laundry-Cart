const express = require("express");
const requireSignIn = require("../middlewares/userMiddleware");
const {
  getProducts,
  addProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", requireSignIn, getProducts);

router.post("/", requireSignIn, addProducts);

module.exports = router;
