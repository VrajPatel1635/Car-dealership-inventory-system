const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/car_dealership';
  const workerId = process.env.JEST_WORKER_ID || '1';
  const testUri = uri.includes('?') ? uri.replace('?', `_test_${workerId}?`) : uri + `_test_${workerId}`;
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
