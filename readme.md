# User Management & Auth Service

A production-ready RESTful API for user management, featuring robust authentication, Google OAuth integration, and a scalable architectural pattern. This project was built in several evenings to refresh in mind on some core web technologies and serve as a reliable boilerplate for future applications or pet projects.

## 🚀 Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod
- **Security:** JWT (Access/Refresh strategy) & OTP

## ✨ Key Features

- **Multi-channel Auth:** Secure registration/login via email or **Google OAuth 2.0**.
- **Token Management:** JWT pairs with short-lived Access and long-lived Refresh tokens.
- **Security Middlewares:** Auth/Guest guards for route protection.
  - OTP (One-Time Password) verification layer.
  - Role-based access control (RBAC).

- **Data Validation:** Zero-trust input validation using Zod schemas.
- **Hybrid Potential:** Built as REST with a foundational GraphQL integration (WIP).

## 📁 Project Structure

```
src/
├── controllers/  # Request handlers & HTTP logic
├── services/     # Core business logic (Auth, User, OAuth)
├── middleware/   # Authentication, OTP, and Role guards
├── routes/       # API endpoint definitions
├── schemas/      # Zod validation schemas
├── exceptions/   # Custom error classes & global handler
├── types/        # Type definitions & global augmentations
├── utils/        # Shared helper functions (Token, Mailer)
└── graphql/      # GraphQL integration (Work in Progress)

```

## 🛠 Setup & Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/rossdoker/auth-app-backend
    ```

2.  **Install dependencies:**

    ```
    npm install
    ```

3.  **Configure Environment Variables:** Create a `.env` file in the root directory:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
    JWT_ACCESS_SECRET="your_access_secret"
    JWT_REFRESH_SECRET="your_refresh_secret"
    GOOGLE_CLIENT_ID="your_google_client_id"
    ```

4.  **Database Migration:**

    ```
    npx prisma migrate dev
    ```

5.  **Run the application:**

    ```
    npm run dev
    ```

## 🔐 Middleware Overview

- `authMiddleware`: Validates JWT Access tokens for protected resources.
- `otpMiddleware`: Intercepts requests to verify 2FA/OTP status before sensitive actions.
- `roleMiddleware`: Restricts access based on user permissions (e.g., `ADMIN`, `USER`).

---

### 🛠 Roadmap

- [ ] Complete GraphQL resolvers and schema integration.
- [ ] Implement Unit & Integration testing (Jest).
- [ ] Add Swagger documentation for REST endpoints.
