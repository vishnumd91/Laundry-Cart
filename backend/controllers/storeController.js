const Store = require("../models/Stores");

const createStore = async (req, res) => {
  try {
    const newStore = new Store(req.body);
    await newStore.save();
    res.status(201).json({
      status: 201,
      data: { message: "Store created Successfully", newStore },
    });
  } catch (error) {
    res.status(500).json({ status: 500, data: { message: "Server Error" } });
  }
};

const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json({ status: 200, data: stores });
  } catch (error) {
    res.status(500).json({ status: 500, data: { message: "Server Error" } });
  }
};

module.exports = {
  createStore,
  getStores,
};
