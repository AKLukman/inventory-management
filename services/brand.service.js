const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  // const result = await Brand.create(data);
  console.log(data);
  // return result;
  const result = await Brand.create(data);
  return result;
};

exports.getBrandService = async () => {
  const brands = await Brand.find({}).populate("products");
  return brands;
};

exports.getBrandByIdService = async (barndId) => {
  const brands = await Brand.findOne({ _id: barndId });
  return brands;
};

exports.updateBrandByIdService = async (barndId, data) => {
  const result = await Brand.updateOne({ _id: barndId }, data, {
    runValidators: true,
  });
  return result;
};
