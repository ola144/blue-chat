const {
  getUserDetails,
  getAllUsers,
  updateUserDetails,
  updatePassword,
  uploadProfilePic,
} = require("../Controllers/userController");
const { protect } = require("../Middleware/protect");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/user/user-details:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user-details", protect, getUserDetails);

/**
 * @swagger
 * /api/v1/user/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/all-users", protect, getAllUsers);

/**
 * @swagger
 * /api/v1/user/update-user-details:
 *   patch:
 *     summary: Update user profile details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/update-user-details", protect, updateUserDetails);

/**
 * @swagger
 * /api/v1/user/update-user-password:
 *   patch:
 *     summary: Update current user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/update-user-password", protect, updatePassword);

/**
 * @swagger
 * /api/v1/user/upload-profile-picture:
 *   patch:
 *     summary: Upload a profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/upload-profile-picture", protect, uploadProfilePic);

module.exports = router;
