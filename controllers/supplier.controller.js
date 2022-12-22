const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't create the supplier",
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const result = await getSuppliersService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully get supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't get the suppliers",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: "failed",
        message: "Couldn't get the supplier with this id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully get supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't get the supplier",
      error: error.message,
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "failed",
        message: "Couldn't update the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully update the supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update the supplier",
      error: error.message,
    });
  }
};
