const Message = require("../Models/messageModel");
const Chat = require("../Models/chatModel");

exports.sendMessage = async (req, res) => {
  try {
    // Store the message in messages collection
    const newMsg = new Message(req.body);
    const savedMsg = await newMsg.save();

    // update the lastMessage on the chats collection
    // const currentChat = await Chat.findById(req.body.chatId);
    // currentChat.lastMessage = savedMsg._id;
    // await currentChat.save();
    // OR
    const currentChat = await Chat.findOneAndUpdate(
      {
        _id: req.body.chatId,
      },
      {
        lastMessage: savedMsg._id,
        $inc: { unreadMessageCount: 1 },
      },
    );

    res.status(201).json({
      status: "success",
      message: "Message sent successfully!",
      data: savedMsg,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const chatMsgs = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      status: "success",
      message: "Messages fetched successfully!",
      data: chatMsgs,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.updateMessageText = async (req, res) => {
  try {
    const messageId = req.params.messageId;

    const updatedUser = await Message.findByIdAndUpdate(messageId, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Message updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.messsage,
    });
  }
};
