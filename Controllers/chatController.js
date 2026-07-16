const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");

exports.createNewChat = async (req, res) => {
  try {
    const chat = new Chat(req.body);

    const newChat = await (await chat.save()).populate("members");

    res.status(201).json({
      status: "success",
      message: "Chat created successfully!",
      data: newChat,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllUserChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const userChats = await Chat.find({ members: { $in: userId } })
      .populate("members")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      status: "success",
      message: "Chat fetched successfully!",
      data: userChats,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.clearUnreadMessage = async (req, res) => {
  try {
    const chatId = req.body.chatId;

    // we wnat to update the unread message cont in chat collection
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        status: "failed",
        message: "No chat found with given chat ID!",
      });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { unreadMessageCount: 0 },
      { new: true },
    )
      .populate("members")
      .populate("lastMessage");

    //we want to update the read property to true in message collection
    await Message.updateMany({ chatId: chatId, read: false }, { read: true });

    res.status(200).json({
      status: "success",
      message: "Unread message clear successfully!",
      data: updatedChat,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
