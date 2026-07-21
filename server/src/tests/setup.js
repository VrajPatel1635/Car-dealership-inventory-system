const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/car_dealership';
  const testUri = uri.includes('?') ? uri.replace('?', '_test?') : uri + '_test';
  await mongoose.connect(testUri);
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
  await mongoose.connection.close();
});
