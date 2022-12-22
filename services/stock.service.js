const Stock = require("../models/Stock");
const Brand = require("../models/Brand");

exports.getStockService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalStocks = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);

  return { totalStocks, pageCount, stocks };
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("brand.id")
    .populate("supplier.id");
  return stock;
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.updateStockService = async (productId, data) => {
  // We can use this way
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $set: data },
  //   { runValidators: true }
  // );

  // Better way
  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateStockService = async (data) => {
  // ekshate onek gulu product update korte chaile
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Stock.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  return result;
};

exports.deleteStockByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteStockService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
