const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async () => {
  const supplier = await Supplier.find({});
  return supplier;
};

exports.getSupplierByIdService = async (barndId) => {
  const supplier = await Supplier.findOne({ _id: barndId }).populate(
    "products"
  );
  return supplier;
};

exports.updateSupplierService = async (barndId, data) => {
  const result = await Supplier.updateOne({ _id: barndId }, data, {
    runValidators: true,
  });
  return result;
};
