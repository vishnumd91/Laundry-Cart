const express = require("express");
const requireSignIn = require("../middlewares/userMiddleware");
const { createStore, getStores } = require("../controllers/storeController");

const router = express.Router();

router.post("/create", requireSignIn, createStore);
router.get("/", requireSignIn, getStores);

module.exports = router;
