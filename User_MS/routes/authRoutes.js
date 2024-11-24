const express = require('express');
const { login, register, logout, resetPassword, getUserDetails, getAllUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register); // Register route
router.post('/login', login);
router.post('/reset-password', authMiddleware, resetPassword);
router.get('/user/:id', authMiddleware, getUserDetails);
router.get('/users', authMiddleware, getAllUsers);


module.exports = router;
