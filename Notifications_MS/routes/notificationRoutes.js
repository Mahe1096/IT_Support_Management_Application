const express = require("express");
const { saveNotification,sendNotificationEmail } = require("../controllers/notificationController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
// POST /notifications - Save a notification
router.post("/", saveNotification);


module.exports = router;
