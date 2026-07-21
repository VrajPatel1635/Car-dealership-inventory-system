const User = require('../models/User');

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};
