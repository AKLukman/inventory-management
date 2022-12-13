const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};
