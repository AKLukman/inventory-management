const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

// sob gulu route verify korte chaile
// app.use(verifyToken);

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/me").get(verifyToken, userController.getMe);

module.exports = router;
