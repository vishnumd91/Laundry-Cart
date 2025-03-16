const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in mongoDB: ${error}`);
  }
};

module.exports = connectDB;
