const authService = require('../services/auth_service');

exports.register = async (req, res) => {
    try {
        await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.message === 'Email already exists') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
