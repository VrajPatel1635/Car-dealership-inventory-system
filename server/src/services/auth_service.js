const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    
    const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET || 'testsecret';
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
    
    return token;
};
