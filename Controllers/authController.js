const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User with the provided email is already exist!",
      });
    }

    // Encrypt the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully!",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User with the provided email does not exist",
      });
    }

    // check the password
    const isValid = await user.comparePasswordInDb(
      req.body.password,
      user.password,
    );

    console.log(isValid);

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials!",
      });
    }

    // Authenticating the user
    const token = await jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.LOGIN_EXPIRES,
    });

    user.password = undefined;

    res.status(200).json({
      status: "success",
      message: "User sign in successfully",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
