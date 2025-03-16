const express = require("express");
const bodyparser = require("body-parser");
const requireSignIn = require("../middlewares/userMiddleware");
const { getOrdersController, deleteOrdersController, addOrderController } = require('../controllers/orderController');

const router = express.Router();
router.use(bodyparser.json());

router.get("/", requireSignIn, getOrdersController)

router.post('/delete/:id', requireSignIn, deleteOrdersController);

router.post("/add", requireSignIn, addOrderController);

module.exports = router;