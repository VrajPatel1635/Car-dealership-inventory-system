const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should return a successful response for a valid registration', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
      // Optionally expect a token or user ID, but we keep it minimal as requested.
    });
  });
});
