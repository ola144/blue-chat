const {
  sendMessage,
  getChatMessages,
} = require("../Controllers/messageController");
const { protect } = require("../Middleware/protect");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/message/new-message:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [chatId, text]
 *             properties:
 *               chatId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/new-message", protect, sendMessage);

/**
 * @swagger
 * /api/v1/message/all-message/{chatId}:
 *   get:
 *     summary: Get all messages for a chat
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Messages fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/all-message/:chatId", protect, getChatMessages);

/**
 * @swagger
 * /api/v1/message/update-message/{messageId}:
 *   patch:
 *     summary: Update a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/update-message/:messageId", protect, getChatMessages);

module.exports = router;
