const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary");

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    res.status(200).json({
      status: "success",
      message: "User details fetch successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.messsage,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } }).sort({
      firstName: -1,
    });

    res.status(200).json({
      status: "success",
      message: "User details fetch successfully!",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.messsage,
    });
  }
};

exports.uploadProfilePic = async (req, res) => {
  try {
    const image = req.body.profilePic;

    //UPLOAD THE IMAGE TO CLOUDINARY
    const imageUrl = await cloudinary.v2.uploader.upload(image, {
      folder: "blue-chat",
    });

    // UPDATE THE USER MODEL AND SET THE PROFILE PIC PROPERTY
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { profilePic: imageUrl.secure_url },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      message: "Profile picture updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.messsage,
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "User details updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.messsage,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const isValid = await user.comparePasswordInDb(
      req.body.currentPassword,
      user.password,
    );

    if (!isValid) {
      return res.status(400).json({
        status: "failed",
        message: "The current password you provide is wrong!",
      });
    }

    // Encrypt the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User password updated successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
