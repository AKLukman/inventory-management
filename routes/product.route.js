const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");

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
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updatePorductById)
  .delete(productController.deleteProductById);

module.exports = router;
