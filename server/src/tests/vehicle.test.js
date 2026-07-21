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

  describe('GET /api/vehicles', () => {
    it('should return an empty array if no vehicles exist', async () => {
      // Clear the vehicles collection first to ensure it's empty
      const Vehicle = require('../models/Vehicle');
      await Vehicle.deleteMany({});

      const response = await request(app).get('/api/vehicles');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all vehicles from the database when records exist', async () => {
      const vehicleData = {
        make: 'Honda',
        model: 'Civic',
        year: 2022,
        price: 22000,
        mileage: 20000,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        color: 'Blue',
        stock: 3
      };

      await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${token}`)
        .send(vehicleData);

      const response = await request(app).get('/api/vehicles');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('make', 'Honda');
    });
  });

  describe('GET /api/vehicles/search', () => {
    it('should return an empty array when no vehicles match', async () => {
      const response = await request(app).get('/api/vehicles/search?make=NonExistentMake');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return matching vehicles when filters are provided', async () => {
      const Vehicle = require('../models/Vehicle');
      await Vehicle.deleteMany({});
      
      const vehicle1 = {
        make: 'Honda', model: 'Civic', year: 2022, price: 22000, mileage: 20000,
        fuelType: 'Gasoline', transmission: 'Automatic', color: 'Blue', stock: 3
      };
      const vehicle2 = {
        make: 'Toyota', model: 'Camry', year: 2023, price: 25000, mileage: 15000,
        fuelType: 'Hybrid', transmission: 'Automatic', color: 'Silver', stock: 5
      };

      await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(vehicle1);
      await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(vehicle2);

      // Filter by make
      let response = await request(app).get('/api/vehicles/search?make=Honda');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].make).toBe('Honda');

      // Filter by minPrice and maxPrice
      response = await request(app).get('/api/vehicles/search?minPrice=24000&maxPrice=30000');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].price).toBe(25000);
    });

    it('should return matching vehicles when a unified query string is provided', async () => {
      const Vehicle = require('../models/Vehicle');
      await Vehicle.deleteMany({});
      
      const vehicle1 = {
        make: 'Honda', model: 'City', year: 2022, price: 22000, mileage: 20000,
        fuelType: 'Gasoline', transmission: 'Automatic', color: 'Blue', stock: 3
      };
      const vehicle2 = {
        make: 'Toyota', model: 'Fortuner', year: 2023, price: 45000, mileage: 15000,
        fuelType: 'Diesel', transmission: 'Automatic', color: 'Black', stock: 5
      };
      const vehicle3 = {
        make: 'Honda', model: 'Civic', year: 2021, price: 20000, mileage: 30000,
        fuelType: 'Gasoline', transmission: 'Automatic', color: 'Black', stock: 2
      };

      await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(vehicle1);
      await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(vehicle2);
      await request(app).post('/api/vehicles').set('Authorization', `Bearer ${token}`).send(vehicle3);

      let response = await request(app).get('/api/vehicles/search?query=blue honda city');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].model).toBe('City');

      response = await request(app).get('/api/vehicles/search?query=black fortuner');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].model).toBe('Fortuner');

      // Combined with normal filters
      response = await request(app).get('/api/vehicles/search?query=honda&maxPrice=21000');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].model).toBe('Civic');
    });
  });

  describe('POST /api/vehicles/:id/purchase', () => {
    it('should successfully purchase a vehicle and reduce stock', async () => {
      const Vehicle = require('../models/Vehicle');
      const vehicle = await Vehicle.create({
        make: 'Ford', model: 'Mustang', year: 2023, price: 30000, mileage: 0,
        fuelType: 'Gasoline', transmission: 'Manual', color: 'Red', stock: 2
      });

      const response = await request(app)
        .post(`/api/vehicles/${vehicle._id}/purchase`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.stock).toBe(1);
    });

    it('should prevent purchase if vehicle is out of stock', async () => {
      const Vehicle = require('../models/Vehicle');
      const vehicle = await Vehicle.create({
        make: 'Tesla', model: 'Model 3', year: 2023, price: 40000, mileage: 0,
        fuelType: 'Electric', transmission: 'Automatic', color: 'White', stock: 0
      });

      const response = await request(app)
        .post(`/api/vehicles/${vehicle._id}/purchase`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 if vehicle does not exist', async () => {
      const fakeId = new (require('mongoose')).Types.ObjectId();
      const response = await request(app)
        .post(`/api/vehicles/${fakeId}/purchase`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
