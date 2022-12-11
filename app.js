const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// Schema->Model->Query
// Schema design

// Routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const stockRoute = require("./routes/stock.route");

app.get("/", (req, res) => {
  res.send("Route is working");
});

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/stock", stockRoute);

module.exports = app;
