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