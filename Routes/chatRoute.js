const {
  createNewChat,
  getAllUserChat,
  clearUnreadMessage,
} = require("../Controllers/chatController");
const { protect } = require("../Middleware/protect");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/chat/create-new-chat:
 *   post:
 *     summary: Create or open a chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [receiverId]
 *             properties:
 *               receiverId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chat created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/create-new-chat", protect, createNewChat);

/**
 * @swagger
 * /api/v1/chat/get-all-chat:
 *   get:
 *     summary: Get all chats for the current user
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chats fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/get-all-chat", protect, getAllUserChat);

/**
 * @swagger
 * /api/v1/chat/clear-unread-message:
 *   post:
 *     summary: Clear unread message count for a chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [chatId]
 *             properties:
 *               chatId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unread messages cleared
 *       401:
 *         description: Unauthorized
 */
router.post("/clear-unread-message", protect, clearUnreadMessage);

module.exports = router;
