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

    it('should prevent registration if the email already exists', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'duplicate@example.com',
          password: 'password123'
        });

      // Second registration with the same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'duplicate@example.com',
          password: 'newpassword123'
        });

      expect(response.status).toBe(400); // Expecting Bad Request or Conflict
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login User',
          email: 'login@example.com',
          password: 'securepassword123'
        });
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'securepassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should fail with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'securepassword123'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should fail with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return a JWT token upon successful login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'securepassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('Protected Routes (JWT Verification)', () => {
    it('should reject requests without a valid JWT token', async () => {
      const response = await request(app)
        .get('/api/auth/profile') // Hypothetical protected endpoint
        .set('Authorization', 'Bearer invalid_or_missing_token');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Admin Authorization', () => {
    it('should reject requests from non-admin users', async () => {
      // Register and login a normal user
      await request(app).post('/api/auth/register').send({
        name: 'Normal Auth User', email: 'normal_auth@example.com', password: 'password123'
      });
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'normal_auth@example.com', password: 'password123'
      });
      const normalToken = loginRes.body.token;

      const response = await request(app)
        .get('/api/auth/admin-only')
        .set('Authorization', `Bearer ${normalToken}`);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('error');
    });

    it('should allow requests from admin users', async () => {
      // Manually create an admin user for testing
      const bcrypt = require('bcrypt');
      const User = require('../models/User');
      const hashedPassword = await bcrypt.hash('adminpass', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin_auth@example.com',
        password: hashedPassword,
        role: 'ADMIN'
      });

      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'admin_auth@example.com', password: 'adminpass'
      });
      const adminToken = loginRes.body.token;

      const response = await request(app)
        .get('/api/auth/admin-only')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Welcome Admin');
    });
  });
});
