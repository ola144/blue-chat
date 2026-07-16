const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
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

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
