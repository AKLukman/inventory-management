const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

/**
 * 1. check if token is exists
 * 2. if not token res
 * 3. decode the token
 * 4. if valid next
 *
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "failed",
        error: "You are not logged in!",
      });
    }

    const decoded = promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
    // console.log("decode", decoded);
    // const user = User.findOne({ email: decode.email });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token",
    });
  }
};
