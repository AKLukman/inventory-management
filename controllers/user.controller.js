const { signupService } = require("../services/user.service");

exports.signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    console.log(user);

    res.status(200).json({
      status: "success",
      message: "successfully signup the user",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "couldn't  signup the user",
      error: error.message,
    });
  }
};
