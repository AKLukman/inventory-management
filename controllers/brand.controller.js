const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't create the brand",
      error: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully gets the brands",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the brands",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { barndId } = req.params;
    const brand = await getBrandByIdService(barndId);

    if (!brand) {
      res.status(400).json({
        status: "Failed",
        error: "Coudn't find a brand with this id!!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully get the brand",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the brand",
      error: error.message,
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { barndId } = req.params;
    const result = await updateBrandByIdService(barndId, req.body);

    if (!result.nModified) {
      res.status(400).json({
        status: "Failed",
        error: "Coudn't update the brand with this id!!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't update the brand",
      error: error.message,
    });
  }
};
