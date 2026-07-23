# Test Report: Car Dealership Inventory System

## Project Information
- **Project Name**: Car Dealership Inventory System
- **Testing Framework**: Jest with Supertest
- **Test Strategy**: Automated backend API integration testing focusing on authentication, authorization, validation, and RESTful CRUD operations for vehicle management and inventory control.

---

## Testing Approach
- **Unit & Integration Testing**: Validates individual controllers and services within the context of the Express application using Supertest for simulating HTTP requests.
- **API Testing**: Ensures all endpoints (`/api/auth`, `/api/vehicles`) respond with expected status codes, data structures, and error messages.
- **Authentication Testing**: Verifies user registration, login credential validation, duplicate prevention, and proper JWT generation/validation.
- **Authorization Testing**: Ensures role-based access control (RBAC), explicitly testing that normal users cannot access admin-only endpoints (e.g., updating, restocking, or deleting vehicles).
- **Validation Testing**: Verifies the API correctly rejects invalid inputs, missing required fields, and malformed Object IDs with appropriate `400 Bad Request` responses.

---

## Test Coverage Summary
- **Authentication**: Registration, Login, Duplicate Email Prevention.
- **Vehicle Management**: Creating, Listing, and Searching vehicles with filters.
- **Inventory Operations**: Purchasing vehicles (stock decrementing) and Restocking (stock incrementing), preventing out-of-stock purchases.
- **Authorization**: Securing protected routes, validating JWTs, and enforcing Admin-only actions.
- **Validation**: Handling missing required fields (Mongoose `ValidationError`) and invalid MongoDB ObjectIds (`CastError`).
- **Database Operations**: Ensuring consistent state changes across `User` and `Vehicle` collections.

---

## Executed Test Suites
1. **`app.test.js`**: Verifies the base Express application configuration and testing environment setup.
2. **`auth.test.js`**: Tests all authentication and authorization logic, including user registration, login, token generation, and RBAC admin checks.
3. **`vehicle.test.js`**: Tests all vehicle inventory logic, encompassing CRUD operations, advanced searching/filtering, purchasing, restocking, and endpoint security.

---

## Test Results

```text
> test
> jest

PASS src/tests/app.test.js (5.502 s)
  App Testing Setup
    ✓ should verify that the testing environment is configured correctly (9 ms)
    ✓ should be able to import the Express app (1 ms)

PASS src/tests/auth.test.js (7.251 s)
  Auth Endpoints
    POST /api/auth/register
      ✓ should return a successful response for a valid registration (400 ms)
      ✓ should prevent registration if the email already exists (182 ms)
      ✓ should reject registration with missing fields (9 ms)
    POST /api/auth/login
      ✓ should login successfully with valid credentials (269 ms)
      ✓ should fail with invalid email (64 ms)
      ✓ should fail with invalid password (170 ms)
      ✓ should return a JWT token upon successful login (162 ms)
    Protected Routes (JWT Verification)
      ✓ should reject requests without a valid JWT token (9 ms)
    Admin Authorization
      ✓ should reject requests from non-admin users (263 ms)
      ✓ should allow requests from admin users (220 ms)

PASS src/tests/vehicle.test.js (7.346 s)
  Vehicle Endpoints
    POST /api/vehicles
      ✓ should create a new vehicle successfully when authenticated (48 ms)
      ✓ should reject vehicle creation with missing required fields (10 ms)
    GET /api/vehicles
      ✓ should return an empty array if no vehicles exist (60 ms)
      ✓ should return all vehicles from the database when records exist (66 ms)
    GET /api/vehicles/search
      ✓ should return an empty array when no vehicles match (35 ms)
      ✓ should return matching vehicles when filters are provided (150 ms)
      ✓ should return matching vehicles when a unified query string is provided (193 ms)
    POST /api/vehicles/:id/purchase
      ✓ should successfully purchase a vehicle and reduce stock (54 ms)
      ✓ should prevent purchase if vehicle is out of stock (67 ms)
      ✓ should return 404 if vehicle does not exist (46 ms)
      ✓ should reject operations with invalid vehicle IDs (6 ms)
    Admin Vehicle Management
      PUT /api/vehicles/:id
        ✓ should return 403 for non-admin user (30 ms)
        ✓ return 200 and updated vehicle for admin user (46 ms)
        ✓ return 404 if vehicle does not exist (44 ms)
      POST /api/vehicles/:id/restock
        ✓ should return 403 for non-admin user (25 ms)
        ✓ return 200 and updated vehicle for admin user (48 ms)
        ✓ return 404 if vehicle does not exist (44 ms)
      DELETE /api/vehicles/:id
        ✓ should return 403 for non-admin user (26 ms)
        ✓ return 200 and delete vehicle for admin user (47 ms)
        ✓ return 404 if vehicle does not exist (47 ms)

Test Suites: 3 passed, 3 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        8.48 s, estimated 12 s
Ran all test suites.
```

---

## Requirements Coverage

| Requirement | Status | Corresponding Tests |
| :--- | :---: | :--- |
| **User Registration** | ✓ | `should return a successful response for a valid registration`, `should prevent registration if the email already exists` |
| **Login** | ✓ | `should login successfully with valid credentials`, `should fail with invalid email`, `should fail with invalid password` |
| **JWT Authentication** | ✓ | `should return a JWT token upon successful login`, `should reject requests without a valid JWT token` |
| **Vehicle CRUD** | ✓ | `should create a new vehicle successfully...`, `should return all vehicles...`, Admin Update, Admin Delete tests |
| **Vehicle Search** | ✓ | `should return matching vehicles when filters are provided`, `...when a unified query string is provided` |
| **Purchase** | ✓ | `should successfully purchase a vehicle and reduce stock`, `should prevent purchase if vehicle is out of stock` |
| **Restock** | ✓ | `should return 200 and updated vehicle for admin user` (under POST /restock) |
| **Authorization** | ✓ | `should reject requests from non-admin users`, `should allow requests from admin users` |
| **Validation** | ✓ | `should reject vehicle creation with missing required fields`, `should reject operations with invalid vehicle IDs`, `should reject registration with missing fields` |

---

## Conclusion

All implemented backend features, business logic, authorization rules, and edge cases (including input validation) have been successfully verified through automated integration tests. The test suite executes entirely successfully with 100% of tests passing (32/32) and zero skipped tests, confirming that the backend API is robust and meets all assignment criteria.
