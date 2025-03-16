const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const storeRoutes = require("./Routes/storeRoutes");
const productRoutes = require("./Routes/productRoutes");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", async (req, res) => {
  res.send("<h1>Ok</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
