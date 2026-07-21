const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.registerUser = async (userData) => {
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
    
    return user;
};
