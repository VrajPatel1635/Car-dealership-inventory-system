const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user, checking for email uniqueness and securely hashing the password.
 * 
 * @param {Object} userData - The user details (name, email, password, role).
 * @returns {Promise<Object>} The created User document.
 */
exports.registerUser = async (userData) => {
    if (!userData.password) {
        throw new Error('Password is required');
    }
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
};

/**
 * Authenticates a user and generates a JSON Web Token (JWT) containing their ID and role.
 * 
 * @param {String} email - The user's email address.
 * @param {String} password - The user's plain-text password.
 * @returns {Promise<String>} The signed JWT token.
 */
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.warn('WARNING: JWT_SECRET is not defined in environment variables. Using insecure fallback.');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, secret || 'testsecret', { expiresIn: '1h' });
    
    return token;
};
