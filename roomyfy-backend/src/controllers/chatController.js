import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// GET ALL CHATS FOR USER
export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
      .populate("participants", "name email")
      .populate("property", "title location")
      .sort({ lastTime: -1 });

    res.json({ chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE OR GET CHAT
export const createOrGetChat = async (req, res) => {
  try {
    const { participantId, propertyId } = req.body;

    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, participantId] },
      property: propertyId
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [req.user._id, participantId],
        property: propertyId
      });
    }

    await chat.populate("participants", "name email");
    await chat.populate("property", "title location");

    res.json({ chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MESSAGES FOR CHAT
export const getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { chatId } = req.params;

    const message = await Message.create({
      chat: chatId,
      sender: req.user._id,
      text
    });

    // Update last message in chat
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: text,
      lastTime: new Date()
    });

    await message.populate("sender", "name");

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};