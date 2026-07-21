const express = require('express');
const authController = require('../controllers/auth_controller');
const verifyToken = require('../middleware/auth_middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route for testing
router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
