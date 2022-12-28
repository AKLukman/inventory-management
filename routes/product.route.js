const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");

// sob gulu route verify korte chaile
// app.use(verifyToken);

// file upload
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUploader
);

/* <input type="file" name="image" /> */
// const formData = new FormData();
// formData.append("image",formData);

router.route("/bulk-update").patch(productController.bulkUpdateProductById);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updatePorductById)
  .delete(productController.deleteProductById);

module.exports = router;
