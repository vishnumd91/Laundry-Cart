const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
 storeLocation: {
    type : String,
    
 },
 storePhone: {
    type : Number,
 },
 storeAddress: {
    type : String,
 },
 storeCity: {
    type : String,
 },
});

const Store = mongoose.model("Store",  storeSchema)
module.exports = Store;