# Car Dealership Inventory System

A full-stack Car Dealership Inventory Management System built as part of the Incubyte Software Craftsperson hiring assessment.

The application allows users to browse and purchase vehicles while providing administrators with secure inventory management capabilities through role-based access control.

---

## Features

### Authentication

- User registration
- Secure login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization (User / Admin)

### Vehicle Management

- Create vehicle
- List all vehicles
- Search and filter vehicles
- Purchase vehicle
- Update vehicle (Admin)
- Restock vehicle (Admin)
- Delete vehicle (Admin)

### Testing

- Unit and integration tests using Jest and Supertest
- Test-driven development (TDD) approach followed throughout development

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Jest
- Supertest

---

## Project Structure

```
server/
│
├── scripts/
│   └── seed_admin.js
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
├── .env.example
└── package.json
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to the backend

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create environment variables

```bash
cp .env.example .env
```

Update the values inside `.env`.

---

## Environment Variables

```
PORT=
MONGODB_URI=
JWT_SECRET=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

## Available Scripts

Start development server

```bash
npm run dev
```

Run tests

```bash
npm test
```

Seed administrator account

```bash
npm run seed:admin
```

---

## API Overview

### Authentication

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | View profile (Test route) | Authenticated |
| GET | `/api/auth/admin-only` | Admin access (Test route) | Admin |

---

### Vehicles

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | `/api/vehicles` | Create vehicle | Authenticated |
| GET | `/api/vehicles` | List vehicles | Public |
| GET | `/api/vehicles/search` | Search & Filter | Public |
| POST | `/api/vehicles/:id/purchase` | Purchase vehicle | Authenticated |
| PUT | `/api/vehicles/:id` | Update vehicle | Admin |
| POST | `/api/vehicles/:id/restock` | Restock vehicle | Admin |
| DELETE | `/api/vehicles/:id` | Delete vehicle | Admin |

---

## Authentication

Protected endpoints require a JWT.

```
Authorization: Bearer <token>
```

---

## Admin Account

Create the default administrator account using:

```bash
npm run seed:admin
```

The credentials are read from the environment variables:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

---

## Running Tests

Run all tests

```bash
npm test
```

The project currently includes automated tests covering:

- Application setup
- Authentication
- Vehicle management
- Authorization
- Inventory operations

---

## AI Usage

AI tools were used as development assistants throughout this assessment.

Responsibilities included:

- discussing architecture decisions
- reviewing implementation approaches
- generating initial boilerplate
- suggesting refactoring opportunities
- assisting with test design
- improving documentation

Every AI-generated change was reviewed, understood, and modified where necessary before being committed.

The prompts used during development are documented in `PROMPTS.md`.

---

## Assumptions

- Every registered user is assigned the `USER` role by default.
- Administrator accounts are created using the provided seed script.
- JWT is used for stateless authentication.
- Only administrators can perform inventory management operations such as update, restock, and delete.
- Purchase reduces available stock by one.
- Purchasing is not allowed when stock reaches zero.

---

## Future Improvements

Given additional time, the following enhancements could be considered:

- Pagination
- Sorting
- Advanced filtering
- API documentation (Swagger/OpenAPI)
- Docker Compose
- Rate limiting
- Request logging
- CI/CD pipeline

---

## License

This project was created solely for the Incubyte Software Craftsperson hiring assessment.
