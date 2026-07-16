const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is a required field!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is a required field!"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field!"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is a required field!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field!"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    profilePic: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ((ret.id = ret._id), delete ret._id, delete ret.__v);
      },
    },
    toObject: {
      transform(doc, ret) {
        ((ret.id = ret._id), delete ret._id, delete ret.__v);
      },
    },
    timestamps: true,
  },
);

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 10);
// });

userSchema.methods.comparePasswordInDb = async function (
  password,
  passwordInDb,
) {
  return await bcrypt.compare(password, passwordInDb);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
