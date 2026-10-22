# Smart Medicine Reminder & Health Tracker

## 📌 Project Overview

The **Smart Medicine Reminder & Health Tracker** is a full-stack web application designed to help individuals and caregivers organize prescription schedules, receive daily medication alerts, monitor dose adherence, and track vital health indicators.

This project is developed as part of the Full Stack Web Development (FSD) Internship by **Vijayapandian T**.

---

## 🎯 Objectives

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) and bcryptjs password hashing.
- **Protected Routing**: Guard sensitive routes (`Dashboard`, `Medicines`, `Medication History`) from unauthenticated access.
- **Medication Scheduling**: Allow users to configure medicine names, dosages, frequencies, and scheduled intake times (Step 3).
- **Real-Time Reminders & Status Tracking**: Categorize daily doses across `Taken`, `Missed`, and `Pending` states.
- **Daily Adherence Tracking**: Provide clear visual feedback on daily dose compliance and historical intake.
- **Secure File-Based Storage**: Manage data safely using structured JSON file storage with atomic writes and corruption safeguards.
- **Separation of Concerns**: Deliver a clean RESTful architecture with a React frontend and Node.js/Express backend.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite 5
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **API Client**: Native `fetch` API
- **Session Persistence**: Browser `sessionStorage` (with XSS considerations documented)

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js 4
- **Authentication**: `jsonwebtoken` (JWT)
- **Password Hashing**: `bcryptjs` (salt rounds: 10)
- **Architecture**: Modular MVC / Service-oriented REST API
- **Data Persistence**: JSON file storage (`server/data/`) — *No external database (MongoDB/SQL) per specification*
- **Environment Management**: `dotenv`
- **CORS Handling**: `cors` middleware
- **Dev Tooling**: `nodemon` for auto-reloading

---

## 📂 Folder Structure

```text
smart-medicine-reminder-health-tracker/
├── .gitignore
├── README.md
├── postman/
│   └── MediTrack_Step2_Auth.postman_collection.json
├── client/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── Card.jsx
│       │   ├── Footer.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── StatusBadge.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Login.jsx
│           ├── MedicationHistory.jsx
│           ├── Medicines.jsx
│           └── Register.jsx
└── server/
    ├── .env
    ├── .env.example
    ├── package.json
    ├── server.js
    ├── controllers/
    │   ├── authController.js
    │   └── healthController.js
    ├── data/
    │   ├── README.md
    │   ├── history.json
    │   ├── medicines.json
    │   └── users.json
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── healthRoutes.js
    ├── services/
    │   └── userService.js
    └── utils/
        └── jsonStorage.js
```

---

## 🔐 Authentication & Security Architecture (Step 2)

### 1. User Registration (`POST /api/auth/register`)
- Accepts `name`, `email`, `password`.
- Validates required fields, email format regex, and minimum password length (≥ 6 characters).
- Checks for duplicate emails (case-insensitive) in `users.json` and rejects with `HTTP 409 Conflict`.
- Hashes passwords using `bcryptjs.hash(password, 10)` before persisting.
- Generates a unique user ID (`usr_<timestamp>_<randomHex>`).
- Persists to `server/data/users.json` via atomic writes.
- Returns `HTTP 201 Created` with a sanitized user object (omits `passwordHash`) and a signed JWT token.

### 2. User Login (`POST /api/auth/login`)
- Accepts `email`, `password`.
- Finds the user in `users.json`.
- Compares passwords using `bcryptjs.compare()`.
- Returns a generic `401 Unauthorized` message (`Invalid email or password`) for nonexistent users or mismatched passwords (prevents user enumeration).
- Signs a JWT with payload `{ id: user.id, email: user.email }` using `process.env.JWT_SECRET` and expiration (`JWT_EXPIRES_IN`).
- Returns `HTTP 200 OK` with sanitized user information and the JWT token.

### 3. JWT Authentication Middleware (`server/middleware/authMiddleware.js`)
- Inspects the `Authorization` header for `Bearer <token>`.
- Verifies signature and token expiry using `jwt.verify()`.
- Retrieves the user record by ID from storage to confirm the account exists.
- Attaches the sanitized user to `req.user` and ID to `req.userId`.
- Rejects missing, malformed, or expired tokens with `HTTP 401 Unauthorized`.
- **Zero Frontend Trust**: The authenticated user identity is derived strictly from the verified JWT payload, never from unverified request parameters.

### 4. Protected User Profile (`GET /api/auth/me`)
- Secured behind `authMiddleware`.
- Returns the authenticated user's profile (`id`, `name`, `email`, `createdAt`).
- Guarantees password hashes are never exposed.

### 5. Frontend Session & Protected Routes
- **Session Persistence**: JWT stored in `sessionStorage` for session lifetime.
- **XSS & Browser Storage Disclosure**: In this college prototype, `sessionStorage` is used for client-side state. For enterprise production systems, `httpOnly`, `secure`, `SameSite=Strict` cookies are recommended to prevent client-side JavaScript access (XSS attacks). Passwords are never stored on the client.
- **Protected Views**: `Dashboard`, `Medicines`, and `Medication History` are wrapped in `<ProtectedRoute />`.
- **Session Validation**: On page load or reload, `App.jsx` validates the stored token against `GET /api/auth/me`. Expired or invalid tokens are automatically purged and redirected to the login view.
- **Logout**: Clears `sessionStorage`, resets React user state, and immediately routes to the login page.

---

## 📋 Prerequisites

Ensure the following tools are installed on your machine before running the project:
- **Node.js**: `v18.0.0` or later (tested on `v24.13.0`)
- **npm**: `v9.0.0` or later (tested on `11.6.2`)
- **Git**
- Modern Web Browser (Chrome, Firefox, Edge, Safari)
- **Postman** (optional, for API testing)

---

## 🚀 Installation Instructions

### 1. Repository Setup
Navigate to the project directory:
```bash
cd smart-medicine-reminder-health-tracker
```

### 2. Backend Dependencies
Navigate to the `server/` directory and install required npm packages:
```bash
cd server
npm install
```

### 3. Frontend Dependencies
Navigate to the `client/` directory and install required npm packages:
```bash
cd ../client
npm install
```

---

## 💻 Commands to Run Frontend and Backend

The application consists of two decoupled services that run concurrently in separate terminals:

### Terminal 1: Backend Server (Node.js + Express)
```bash
cd smart-medicine-reminder-health-tracker/server
npm run dev
```
- **Backend URL**: `http://localhost:5000`
- **Health Check Endpoint**: `http://localhost:5000/api/health`
- **Auth Endpoint**: `http://localhost:5000/api/auth`

### Terminal 2: Frontend Client (Vite + React)
```bash
cd smart-medicine-reminder-health-tracker/client
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

---

## 📮 Postman API Testing Guide

An importable Postman collection is included at:  
[`postman/MediTrack_Step2_Auth.postman_collection.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/MediTrack_Step2_Auth.postman_collection.json)

### Tested Scenarios:
1. **Health Check** &mdash; `GET http://localhost:5000/api/health` &rarr; `200 OK`
2. **Register User (Valid)** &mdash; `POST /api/auth/register` &rarr; `201 Created`
3. **Register Duplicate Email** &mdash; `POST /api/auth/register` &rarr; `409 Conflict`
4. **Register Invalid Input (Short Password)** &mdash; `POST /api/auth/register` &rarr; `400 Bad Request`
5. **Login (Valid Credentials)** &mdash; `POST /api/auth/login` &rarr; `200 OK` (returns JWT)
6. **Login (Invalid Credentials)** &mdash; `POST /api/auth/login` &rarr; `401 Unauthorized`
7. **Access Protected Profile (With Token)** &mdash; `GET /api/auth/me` with `Authorization: Bearer <token>` &rarr; `200 OK`
8. **Access Protected Profile (Without Token)** &mdash; `GET /api/auth/me` &rarr; `401 Unauthorized`
9. **Access Protected Profile (Invalid Token)** &mdash; `GET /api/auth/me` with `Authorization: Bearer bad_token` &rarr; `401 Unauthorized`

---

## 📊 Current Implementation Status

### ✅ Completed in Task 1 (Project Setup)
- [x] Initialized project directory structure under the existing repository.
- [x] Express.js server configured with JSON parsing, CORS, and centralized error handling.
- [x] Backend `GET /api/health` endpoint implemented and verified.
- [x] Prepared JSON file storage structure in `server/data/` for users, medicines, and logs.
- [x] React 18 + Vite application scaffolded and configured with Tailwind CSS.
- [x] Responsive layout designed with reusable `Navbar`, `Footer`, `Card`, and `StatusBadge` components.

### ✅ Completed in Task 2 (Auth & Protected Routes)
- [x] User Registration API (`POST /api/auth/register`) with validation and duplicate prevention.
- [x] Password hashing using `bcryptjs` (passwords never stored in plain text).
- [x] User Login API (`POST /api/auth/login`) with credential comparison and signed JWT generation.
- [x] JWT Authentication Middleware (`server/middleware/authMiddleware.js`) with Bearer token verification.
- [x] Protected User Profile API (`GET /api/auth/me`) returning sanitized user profiles.
- [x] Safe JSON storage with atomic temp-file writes and corruption prevention (`server/utils/jsonStorage.js`).
- [x] Frontend Register page with controlled inputs, error validation, and auto-authentication.
- [x] Frontend Login page with `sessionStorage` token caching and error handling.
- [x] Protected route component (`ProtectedRoute.jsx`) guarding Dashboard, Medicines, and Medication History.
- [x] Session restoration and token verification on startup.
- [x] Logout functionality clearing tokens and resetting user state.
- [x] Complete Postman test collection exported to `postman/`.

### ⏳ Planned for Upcoming Tasks
- [ ] Medicine Schedule CRUD APIs & interactive forms (Step 3).
- [ ] Dose tracking actions (Mark as Taken / Missed / Pending).
- [ ] History log filtering and adherence rate analytics.

---

## 👤 Author

**Vijayapandian T**  
*Full Stack Web Development Intern*
