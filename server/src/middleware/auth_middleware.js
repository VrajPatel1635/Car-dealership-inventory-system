const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No valid token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.warn('WARNING: JWT_SECRET is not defined in environment variables. Using insecure fallback.');
        }
        const decoded = jwt.verify(token, secret || 'testsecret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = verifyToken;
