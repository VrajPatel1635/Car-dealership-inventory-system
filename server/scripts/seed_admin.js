const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminName = process.env.ADMIN_NAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminName || !adminPassword) {
            console.error('Missing ADMIN credentials in environment variables.');
            process.exit(1);
        }

        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (existingAdmin) {
            console.log('Admin user already exists.');
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            
            const adminUser = new User({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN'
            });

            await adminUser.save();
            console.log('Admin user created successfully.');
        }

    } catch (error) {
        console.error('Error seeding admin user:', error.message);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedAdmin();
