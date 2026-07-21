const authService = require('../services/auth_service');

exports.register = async (req, res) => {
    try {
        const existingUser = await authService.getUserByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const user = await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
