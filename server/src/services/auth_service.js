const User = require('../models/User');

exports.registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};
