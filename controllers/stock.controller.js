const { createStockService } = require("../services/stock.service");

exports.createStock = async (req, res, next) => {
  try {
    const stock = await createStockService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the stock",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't create the stock",
      error: error.message,
    });
  }
};
