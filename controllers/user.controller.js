const { signupService, findUserByEmail } = require("../services/user.service");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

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

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if Email and password are given
    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        error: "Please provide your credential",
      });
    }

    // Load user with email
    const user = await findUserByEmail(email);

    // if not user send res
    if (!user) {
      return res.status(401).json({
        status: "Failed",
        error: "No user found! Please create an account",
      });
    }

    // compare password
    const isPasswordValid = user.comparePassword(password, user.password);

    // if password not correct send res
    if (!isPasswordValid) {
      res.status(403).json({
        status: "Failed",
        error: "Password is not valid",
      });
    }

    // check if user is active
    if (user.status != "active") {
      res.status(401).json({
        status: "fail",
        error: "your account is not active yet",
      });
    }

    // generate token
    const token = generateToken(user);

    // security perpose a client side a password patanu jabe na
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "successfully logged in the user",
      data: {
        token,
        user: others,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "couldn't  login the user",
      error: error.message,
    });
  }
};
