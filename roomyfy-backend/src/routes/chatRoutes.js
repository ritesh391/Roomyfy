import express from "express";
import {
  getMyChats,
  createOrGetChat,
  getChatMessages,
  sendMessage
} from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyChats);
router.post("/", protect, createOrGetChat);
router.get("/:chatId/messages", protect, getChatMessages);
router.post("/:chatId/messages", protect, sendMessage);

export default router;