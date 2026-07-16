const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    //decoded token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const currentUser = await User.findById(decodedToken.userId);

    req.user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
};
