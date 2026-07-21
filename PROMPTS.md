# PROMPTS

This document contains the AI prompts used during the development of this project, strictly following the structured format provided during the conversation.

---

# 1. MongoDB Configuration

**Task**: 
Configure MongoDB for the Express backend.

**Context**: 
The project already has a basic Express application with app.js and server.js. This commit is only for configuring the database connection.

**Requirements**:
- Install and configure Mongoose.
- Create a database connection utility inside src/config/db.js.
- Use dotenv to load environment variables.
- Add MONGODB_URI to .env.example.
- Connect to MongoDB before starting the server.
- If the database connection succeeds, start the server.
- If the database connection fails, log the error and exit the process.
- Keep the database configuration modular and reusable.

**Constraints**:
- Use JavaScript.
- Do not create any models.
- Do not create routes.
- Do not create controllers.
- Do not implement authentication.
- Do not add business logic.
- Keep the implementation simple and production-ready.

---

# 2. Testing Setup (Jest & Supertest)

**Task**: 
Configure the testing environment for the Express backend.

**Context**: 
The project already has a working Express application and MongoDB configuration. This commit should only prepare the project for Test-Driven Development.

**Requirements**:
- Install and configure Jest and Supertest.
- Create a jest.config.js file.
- Configure the package.json test scripts.
- Create src/tests/setup.js for shared test configuration.
- Ensure the Express app can be imported without starting the HTTP server.
- Add a simple placeholder test that verifies the testing setup is working.
- Keep the testing configuration clean and easy to extend.

**Constraints**:
- Use JavaScript.
- Do not create feature tests yet.
- Do not create models.
- Do not create routes.
- Do not implement authentication.
- Do not implement business logic.
- Keep the implementation minimal.

---

# 3. User Registration (Failing Test)

**Task**: 
Write the first failing test for user registration using Test-Driven Development.

**Context**: 
The project already has Express, MongoDB configuration, Jest, and Supertest set up. This is the first TDD cycle.

**Requirements**:
- Create a test for POST /api/auth/register.
- The test should send a valid name, email, and password.
- The expected behavior is that the endpoint returns a successful response for a valid registration.
- Do not implement the endpoint.
- Do not create controllers or services.
- The test should fail because the feature does not exist yet.

**Constraints**:
- Use Jest and Supertest.
- Keep the test simple and focused on a single behavior.
- Do not add validation tests.
- Do not test duplicate emails.
- Do not implement any production code.

---

# 4. User Registration (Implementation)

**Task**: 
Implement the minimum production code required to make the user registration test pass.

**Context**: 
A failing Jest and Supertest test already exists for POST /api/auth/register. This is the GREEN phase of the first TDD cycle.

**Requirements**:
- Create the User model.
- Create auth_routes.js, auth_controller.js, and auth_service.js.
- Implement POST /api/auth/register.
- Accept name, email, and password.
- Save the user to MongoDB.
- Return the response expected by the existing test.
- Do not return the password in the response.
- Keep the implementation minimal.

**Constraints**:
- Do not implement duplicate email checking.
- Do not hash passwords yet.
- Do not generate JWT tokens.
- Do not add input validation.
- Do not implement login.
- Do not add functionality beyond what is required to make the existing test pass.

---

# 5. Duplicate Email Protection (Failing Test)

**Task**: 
Write a failing test for duplicate email registration using Test-Driven Development.

**Context**: 
The project already supports successful user registration. The next behavior is preventing users from registering with an email that already exists.

**Requirements**:
- Write a Jest and Supertest test for POST /api/auth/register.
- Register a user successfully.
- Attempt to register another user with the same email.
- Expect the request to fail with an appropriate HTTP status code and error message.
- Do not modify the existing implementation.
- The test should fail because duplicate email handling has not been implemented yet.

**Constraints**:
- Do not implement production code.
- Do not add input validation tests.
- Do not implement password hashing.
- Keep the test focused on one behavior.

---

# 6. Duplicate Email Protection (Implementation)

**Task**: 
Implement duplicate email protection for user registration.

**Context**: 
The project already supports successful user registration. A failing Jest and Supertest test exists for duplicate email registration. This is the GREEN phase of the TDD cycle.

**Requirements**:
- Before creating a new user, check whether another user already exists with the same email.
- If the email already exists, return the HTTP status code expected by the existing test with an appropriate error message.
- If the email does not exist, continue with the existing registration flow.
- Modify only the code necessary to make the failing test pass.

**Constraints**:
- Do not implement password hashing.
- Do not implement JWT.
- Do not add input validation.
- Do not refactor unrelated code.
- Keep the implementation minimal.

---

# 7. Secure Authentication

**Task**: 
Implement secure user authentication.

**Context**: 
The backend already supports user registration and prevents duplicate email registration. Passwords are currently stored in plain text, and there is no login functionality.

**Requirements**:
- Install and configure bcrypt.
- Hash the user's password before saving it during registration.
- Create POST /api/auth/login.
- The login endpoint should accept email and password.
- Verify the user's credentials using bcrypt.
- Return a successful response when the credentials are valid.
- Return an appropriate error response when the email does not exist or the password is incorrect.
- Do not return the user's password in any response.
- Keep all business logic inside auth_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement JWT.
- Do not implement authentication middleware.
- Do not implement authorization middleware.
- Do not add request validation.
- Do not add refresh tokens.
- Keep the implementation clean and minimal.

---

# 8. JWT Authentication (Failing Test)

**Task**: 
Write failing tests for JWT-based authentication.

**Context**: 
The project already supports user registration, password hashing, and login. Authentication currently ends after verifying the user's credentials.

**Requirements**:
- Write a test that expects POST /api/auth/login to return a JWT token after successful authentication.
- Write a test that verifies a protected endpoint rejects requests without a valid JWT.
- Do not implement JWT generation.
- Do not implement authentication middleware.
- The tests should fail because JWT support does not exist yet.

**Constraints**:
- Use Jest and Supertest.
- Keep the tests focused only on JWT authentication.
- Do not modify the existing login implementation.
- Do not add authorization tests.

---

# 9. JWT Authentication (Implementation)

**Task**: 
Implement JWT-based authentication.

**Context**: 
The project already supports secure user registration and login. Failing tests exist for JWT authentication. This is the GREEN phase of the TDD cycle.

**Requirements**:
- Install and configure jsonwebtoken.
- Generate a JWT after successful login.
- Include the authenticated user's id and role in the token payload.
- Create auth_middleware.js to verify JWTs.
- Reject requests with missing, invalid, or expired tokens.
- Attach the authenticated user to req.user after successful verification.
- Implement only the functionality required to make the existing JWT tests pass.

**Constraints**:
- Use JavaScript.
- Do not implement role-based authorization.
- Do not implement refresh tokens.
- Do not implement logout.
- Do not add validation.
- Keep the implementation minimal and clean.

---

# 10. Vehicle Creation (Failing Test)

**Task**: 
Write a failing test for vehicle creation using Test-Driven Development.

**Context**: 
The backend already supports user registration, login, password hashing, and JWT authentication. The next feature is vehicle inventory management.

**Requirements**:
- Create a failing Jest and Supertest test for POST /api/vehicles.
- Authenticate a user and include a valid JWT in the Authorization header.
- Send valid vehicle data.
- Expect the vehicle to be created successfully with the appropriate HTTP status code.
- Verify that the response contains the created vehicle details.
- The test should fail because the endpoint has not been implemented yet.
Vehicle fields:
- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

**Constraints**:
- Do not implement production code.
- Do not create the Vehicle model.
- Do not create routes, controllers, or services.
- Do not add validation tests.
- Keep the test focused on successful vehicle creation only.

---

# 11. Vehicle Creation (Implementation)

**Task**: 
Implement vehicle creation using Test-Driven Development.

**Context**: 
The backend already supports user registration, secure authentication (bcrypt + JWT), and protected routes. The next feature is vehicle inventory management.

**Requirements**:
- Write a Jest and Supertest test for POST /api/vehicles.
- Create a Vehicle model with the required fields: make, model, year, price, mileage, fuelType, transmission, color, stock.
- Create vehicle_routes.js, vehicle_controller.js, and vehicle_service.js.
- Implement POST /api/vehicles.
- Require a valid JWT to access the endpoint.
- Save the vehicle to MongoDB.
- Return HTTP 201 with the created vehicle.
- Keep business logic inside vehicle_service.js.
- Implement only the functionality required for successful vehicle creation.

**Constraints**:
- Use JavaScript.
- Do not implement vehicle listing.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase or restock.

---

# 12. Vehicle Listing

**Task**: 
Implement vehicle listing using Test-Driven Development.

**Context**: 
The backend already supports user authentication and vehicle creation. The next feature is listing vehicles in the inventory.

**Requirements**:
- Write a Jest and Supertest test for GET /api/vehicles.
- Implement GET /api/vehicles.
- Return HTTP 200 on success.
- Return an empty array if no vehicles exist.
- Return all vehicles from the database when records exist.
- Keep business logic inside vehicle_service.js.
- Reuse the existing Vehicle model, controller, and routes.

**Constraints**:
- Use JavaScript.
- Do not implement filtering.
- Do not implement searching.
- Do not implement pagination.
- Do not implement sorting.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase.
- Do not implement restock.
- Do not implement role-based authorization.
- Do not add request validation.
- Keep the implementation simple and focused on listing vehicles only.

---

# 13. Vehicle Search & Filtering

**Task**: 
Implement vehicle search and filtering using Test-Driven Development.

**Context**: 
The backend already supports authentication, vehicle creation, and vehicle listing. The next feature is searching the vehicle inventory.

**Requirements**:
- Write Jest and Supertest tests for GET /api/vehicles/search.
- Implement filtering using query parameters.
- Support filtering by: make, model, fuelType, transmission, minPrice, maxPrice.
- Return HTTP 200.
- Return an empty array when no vehicles match.
- Return only the matching vehicles when filters are provided.
- Keep the business logic inside vehicle_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement pagination.
- Do not implement sorting.
- Do not implement fuzzy search.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase.
- Do not implement restock.
- Do not add validation.
- Keep the implementation clean and minimal.

---

# 14. Vehicle Purchase

**Task**: 
Implement vehicle purchasing using Test-Driven Development.

**Context**: 
The backend already supports authentication and vehicle inventory management. The next feature is purchasing a vehicle.

**Requirements**:
- Write Jest and Supertest tests for POST /api/vehicles/:id/purchase.
- Reduce the vehicle stock by one after a successful purchase.
- Return HTTP 200 with the updated vehicle.
- Prevent purchases when the stock is zero.
- Return an appropriate error response when the vehicle is out of stock.
- Return an appropriate error response when the vehicle does not exist.
- Keep all business logic inside vehicle_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement payment processing.
- Do not create purchase history.
- Do not implement transactions.
- Do not implement reservations.
- Do not implement admin authorization.
- Keep the implementation focused only on inventory updates.

---

# 15. Admin Seed Script

**Task**: 
Implement an admin seed script for the backend.

**Context**: 
The project already supports user registration, secure authentication (bcrypt + JWT), and role-based users with USER as the default role. Admin-only features will be implemented next, so the project needs a reliable way to create an administrator account for development and testing.

**Requirements**:
- Create a seed script inside scripts/seed_admin.js.
- Create an ADMIN user only if one does not already exist.
- Read the admin credentials from environment variables: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD.
- Hash the password using bcrypt before saving it.
- Save the user with role set to ADMIN.
- Connect to MongoDB using the existing database configuration.
- Print a success message when the admin is created.
- Print an informative message if the admin already exists.
- Close the database connection before exiting.
- Add an npm script named seed:admin.

**Constraints**:
- Use JavaScript.
- Reuse the existing User model.
- Do not modify the existing database configuration.

---

# 16. Admin Authorization

**Task**: 
Implement reusable admin authorization middleware using Test-Driven Development.

**Context**: 
The backend already supports JWT authentication and an admin seed script. Authenticated users include their role in the JWT payload. The next step is to restrict admin-only operations using reusable middleware.

**Requirements**:
- Create admin_middleware.js.
- Write Jest and Supertest tests for the middleware.
- Allow requests to continue only when req.user.role is ADMIN.
- Return HTTP 403 Forbidden when the authenticated user is not an ADMIN.
- Return a clear error message for forbidden access.
- Keep the middleware reusable for future admin-only endpoints.
- Apply the middleware to a temporary protected test route or an existing endpoint used only for testing the authorization behavior.

**Constraints**:
- Use JavaScript.
- Reuse the existing authentication middleware.
- Do not modify JWT generation.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement vehicle restocking.

---

# 17. Admin Vehicle Management

**Task**: 
Implement admin vehicle management using Test-Driven Development.

**Context**: 
The backend already supports authentication, JWT authorization, vehicle creation, vehicle listing, vehicle search, vehicle purchasing, and reusable admin authorization middleware. The next feature is managing the inventory through admin-only operations.

**Requirements**:
- Write Jest and Supertest tests for the following endpoints:
  - PUT /api/vehicles/:id
  - POST /api/vehicles/:id/restock
  - DELETE /api/vehicles/:id
- Protect all three endpoints using the existing authentication and admin authorization middleware.
- Implement vehicle updates.
- Implement vehicle restocking by increasing the stock quantity.
- Implement vehicle deletion.
- Return appropriate HTTP status codes and error responses.
- Return 403 Forbidden for authenticated non-admin users.
- Return 404 Not Found when the vehicle does not exist.
- Keep all business logic inside vehicle_service.js.
- Reuse the existing Vehicle model, controller, routes, and middleware.

**Constraints**:
- Use JavaScript.
- Keep the implementation simple and focused on the required functionality.

---

# 18. Backend Refactoring

**Task**: 
Refactor the backend to improve code organization and readability without changing application behavior.

**Context**: 
The backend is functionally complete and all existing tests are passing. The goal of this commit is to improve code quality while preserving all current functionality.

**Requirements**:
- Keep all existing API behavior unchanged.
- Keep all existing tests passing.
- Remove duplicated code where appropriate.
- Improve method and variable names if they are unclear.
- Simplify complex methods by extracting small helper functions where it improves readability.
- Ensure controllers only handle HTTP request/response logic.
- Keep business logic inside service files.
- Remove unused imports, variables, and dead code.
- Ensure consistent response structure across controllers where possible.
- Keep error handling consistent throughout the application.
- Improve overall code readability without introducing unnecessary abstractions.

**Constraints**:
- Use JavaScript.
- Do not add new features.
- Do not create new tests.

---

# 19. Backend Documentation & Code Review

**Task**: 
Perform a comprehensive backend code review and improve the implementation where appropriate without changing any existing functionality.

**Context**: 
The backend implementation is feature complete. All existing tests are passing. The goal of this task is to review the project as a senior software engineer before release and improve code quality while preserving behavior.

**Requirements**:
Review the project for the following:
Architecture
- Verify separation of concerns between routes, controllers, services, middleware, models, and configuration.
- Ensure controllers remain thin and business logic resides in services.
- Remove unnecessary coupling.
Code Quality
- Improve naming where necessary.
- Remove duplicated logic.
- Remove unused code, imports, variables, and comments.
- Simplify overly complex methods.
- Ensure consistent formatting and readability.
API Design
- Verify consistent HTTP status codes.
- Verify response structure consistency where practical.
- Verify error messages are meaningful and consistent.

**Constraints**:
- Use JavaScript.
- Do not add new features.
- Do not break existing tests.