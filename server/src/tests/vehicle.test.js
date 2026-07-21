const request = require('supertest');
const app = require('../app');

describe('Vehicle Endpoints', () => {
  let token;

  beforeAll(async () => {
    // Register a user
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Vehicle Test User',
        email: 'vehicletest@example.com',
        password: 'securepassword123'
      });

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'vehicletest@example.com',
        password: 'securepassword123'
      });

    token = loginResponse.body.token;
  });

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle successfully when authenticated', async () => {
      const vehicleData = {
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        price: 25000,
        mileage: 15000,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        color: 'Silver',
        stock: 5
      };

      const response = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${token}`)
        .send(vehicleData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('make', 'Toyota');
      expect(response.body).toHaveProperty('model', 'Camry');
      expect(response.body).toHaveProperty('year', 2023);
      expect(response.body).toHaveProperty('_id');
    });
  });
});
