# Booking Platform REST API

A backend REST API built with **NestJS**, **TypeScript**, and **PostgreSQL** for managing services and customer bookings. Built as part of the EN2H Software Engineer Intern (NestJS) technical assessment.

## Project Overview

This API allows:
- Authenticated users (admins) to manage services (create, update, delete, view)
- Customers to create bookings without authentication
- Booking status management with business rule enforcement (PENDING → CONFIRMED → COMPLETED, or CANCELLED)

**Tech Stack:**
- NestJS + TypeScript
- PostgreSQL + TypeORM
- JWT Authentication (Passport)
- class-validator for request validation
- Swagger for API documentation
- Docker & Docker Compose for containerization

---

## Prerequisites

- Node.js v20+ (tested on v24.14.0)
- PostgreSQL 16+ (or use Docker)
- npm
- Docker Desktop (optional, for containerized setup)

---

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/kalanichamodya/booking-platform-api.git
cd booking-platform-api
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file and configure it:
```bash
cp .env.example .env
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=booking_platform

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

See `.env.example` for reference.

---

## Database Setup

### Option 1 — Local PostgreSQL

1. Create a database:
```sql
CREATE DATABASE booking_platform;
```
2. Update `.env` with your local PostgreSQL credentials.

### Option 2 — Docker (Recommended)

PostgreSQL runs automatically as part of `docker-compose.yml` — no manual setup needed (see **Running with Docker** below).

---

## Running the Application

### Local Development

```bash
npm run start:dev
```

App runs on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start:prod
```

### Running with Docker

```bash
docker-compose up --build
```

This starts both the NestJS app and a PostgreSQL container. App will be available at `http://localhost:3000`.

---

## Running Migrations

This project uses TypeORM migrations instead of `synchronize: true` for schema management.

```bash
# Generate a new migration (after changing entities)
npm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

Migrations run automatically against whatever database is configured in `.env` / `data-source.ts`.

---

## API Documentation

Interactive Swagger documentation is available once the app is running:

http://localhost:3000/api/docs

JWT-protected endpoints can be tested by clicking **Authorize** and pasting a valid access token obtained from `/auth/login`.

---

## API Overview

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive JWT token |

### Services
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/services` | Required | Create a service |
| GET | `/services` | Public | Get all services |
| GET | `/services/:id` | Public | Get service by ID |
| PUT | `/services/:id` | Required | Update a service |
| DELETE | `/services/:id` | Required | Delete a service |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/bookings` | Public | Create a booking |
| GET | `/bookings` | Public | Get all bookings |
| GET | `/bookings/:id` | Public | Get booking by ID |
| PATCH | `/bookings/:id/status` | Public | Update booking status |
| PATCH | `/bookings/:id/cancel` | Public | Cancel a booking |

---

## Business Rules Implemented

- A booking must reference an existing service (validated before creation).
- Booking dates cannot be in the past.
- Cancelled bookings cannot be marked as `COMPLETED`.
- Only authenticated users can create, update, or delete services.
- Customers can create bookings without authentication.
- Duplicate bookings for the same service, date, and time are rejected.
- A global exception filter provides consistent, structured error responses across the API.

---

## Assumptions Made

- All registered users are treated as admins with equal permissions to manage services (no `role` field specified in requirements).
- `duration` for a service is stored in minutes (integer).
- `bookingTime` is validated in 24-hour `HH:mm` format.
- Booking `status` defaults to `PENDING` on creation.
- `synchronize` is disabled in favor of migrations to reflect production-safe practices.
- Passwords are hashed using bcrypt before storage; plaintext passwords are never stored or returned in API responses.

---

## Future Improvements

- Add role-based access control (e.g., ADMIN vs STAFF)
- Add pagination, search, and status filtering for bookings
- Add refresh token support for longer-lived sessions
- Add unit and e2e test coverage
- Add rate limiting on public endpoints to prevent abuse

---

## Author

Kalani Chamodya — EN2H Software Engineer Intern (NestJS) Technical Assessment