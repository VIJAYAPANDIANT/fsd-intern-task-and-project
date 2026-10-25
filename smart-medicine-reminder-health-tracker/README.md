# Smart Medicine Reminder & Health Tracker

## 📌 Project Overview

The **Smart Medicine Reminder & Health Tracker (MediTrack)** is a full-stack healthcare web application designed to help patients, chronic illness sufferers, and caregivers manage complex medication schedules, track daily dose adherence in real time, and analyze historical intake logs.

This project is developed as part of the Full Stack Web Development (FSD) Internship by **Vijayapandian T**.

🌐 **Live Deployment**:
- **Live Web Application**: [https://health-tracker-khaki-nine.vercel.app/](https://health-tracker-khaki-nine.vercel.app/)

---

## 🚨 Problem Statement

Patients on multi-drug regimens frequently struggle with medication non-adherence—forgetting dose timings, missing intake windows, or misplacing prescriptions. Inadvertent dose omissions can lead to treatment failure, hospital readmissions, and severe health complications. 

Traditional paper schedules and generic alarm clocks lack accountability, intake confirmation, adherence analytics, and multi-criteria intake history tracking. **MediTrack** solves this problem by delivering a structured, secure, and user-friendly platform to record prescriptions, generate automatic daily schedules, record status changes (`Taken`, `Missed`, `Pending`), and evaluate adherence trends.

---

## 🎯 Objectives

1. **Secure Authentication & Identity**: Implement JWT-based registration and login with `bcryptjs` password hashing and strictly isolated cross-user data access.
2. **Prescription Lifecycle Management**: Full CRUD capabilities for medications (dosages, daily frequencies, multiple 24-hour reminder times, start/end dates, instructions).
3. **Automated Daily Dose Engine**: Server-side engine that evaluates active prescriptions and generates today's dose cards without frontend manual insertion, ensuring idempotency and deduplication.
4. **Real-Time Adherence Progress**: Instant calculation of daily compliance percentages, dynamic visual progress rings/bars, and stat counters (`Total`, `Taken`, `Missed`, `Pending`).
5. **Comprehensive Medication History**: Multi-parameter historical queries supporting date ranges (`startDate` / `endDate`), specific medicine filters, and dose status filters, ordered with newest records first.
6. **Robust File-Based JSON Storage**: Resilient persistence mechanism utilizing atomic rename operations, write queues, and corruption guards—strictly adhering to assignment requirements with zero external database dependencies.
7. **Clean Separation of Concerns**: Modular MVC/service architecture in Node.js/Express and a decoupled, responsive React + Tailwind CSS client communicating over a centralized API service layer.

---

## ✨ Main Features

### 1. Authentication & Route Guards
- User registration with email format validation and duplicate prevention.
- Passwords hashed with `bcryptjs` (salt rounds: 10); hashes never exposed in responses or logs.
- Signed JSON Web Tokens (JWT) containing user ID and expiration window.
- Bearer token authentication middleware that derives user identity exclusively from verified JWTs.
- `ProtectedRoute` client component guarding `Dashboard`, `Medicines`, and `History` views from unauthorized access.
- Centralized session expiration listener that gracefully redirects to login when tokens expire.

### 2. Medicine Management (CRUD)
- Create, view, update, and delete prescriptions.
- Validation for 24-hour reminder times (`HH:mm`), active date boundaries (`endDate >= startDate`), and non-empty required fields.
- Custom confirmation modal before deleting prescriptions to prevent accidental removal.
- Search filter by medicine name and category filter by frequency.

### 3. Daily Medication Tracking & Auto-Generation
- Server-side generator that schedules doses for all active prescriptions on the current date.
- Idempotency guard preventing duplicate dose creation for identical `(userId, medicineId, date, time)`.
- Status toggles: `Taken` (logs exact ISO timestamp), `Missed` (clears timestamp), and `Reset to Pending`.
- Instant adherence recalculation upon status changes.

### 4. Medication History & Analytics
- Chronological intake log displaying newest records first.
- Date range filtering (`From Date` and `To Date`).
- Medicine dropdown selector dynamically populated from the user's active prescriptions.
- Status filter dropdown (`All`, `Taken`, `Missed`, `Pending`).
- One-click `Clear All Filters` button.
- Filtered KPI summary cards showing total matching doses, taken, missed, pending, and completion percentage.

### 5. Centralized API Client Architecture
- Single source of truth for backend URL configuration (`client/src/services/apiClient.js`).
- Unified fetch wrapper injecting Bearer JWT headers, normalizing network errors, and catching 401 unauthorizations.
- Zero hardcoded API URLs across client pages.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, JavaScript (ES6+), Tailwind CSS 3, Lucide React Icons |
| **Backend** | Node.js 20+, Express.js 4, RESTful APIs |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs` Password Hashing |
| **Data Storage** | Persistent JSON Files (`users.json`, `medicines.json`, `medicationRecords.json`) with Atomic Writes & Queuing |
| **API Client** | Native Fetch API via Centralized Service Layer (`apiClient.js`, `authService.js`, `medicineService.js`, `recordService.js`) |
| **Testing & Tooling** | Postman, Node.js Test Runner, Nodemon |

---

## 📂 Folder Structure

```text
smart-medicine-reminder-health-tracker/
├── .gitignore
├── README.md
├── postman/
│   ├── MediTrack_Step2_Auth.postman_collection.json
│   ├── MediTrack_Step3_Medicines.postman_collection.json
│   ├── MediTrack_Step4_Tracking_History.postman_collection.json
│   └── MediTrack_Full_Integration_Step5.postman_collection.json
├── client/
│   ├── .env.example
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
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── MedicationHistory.jsx
│       │   ├── Medicines.jsx
│       │   └── Register.jsx
│       └── services/
│           ├── apiClient.js
│           ├── authService.js
│           ├── medicineService.js
│           └── recordService.js
└── server/
    ├── .env.example
    ├── package.json
    ├── server.js
    ├── controllers/
    │   ├── authController.js
    │   ├── healthController.js
    │   ├── medicineController.js
    │   └── recordController.js
    ├── data/
    │   ├── README.md
    │   ├── medicationRecords.json
    │   ├── medicines.json
    │   └── users.json
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── healthRoutes.js
    │   ├── medicineRoutes.js
    │   └── recordRoutes.js
    ├── services/
    │   ├── medicineService.js
    │   ├── recordService.js
    │   └── userService.js
    └── utils/
        └── jsonStorage.js
```

---

## ⚙️ Prerequisites & Environment Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Environment Setup

#### 1. Backend Environment (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Default configuration values:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_long_random_jwt_secret_key_here
JWT_EXPIRES_IN=1h
```

#### 2. Frontend Environment (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
Default configuration values:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 How to Start the Application

The frontend and backend run as decoupled services in separate terminal windows:

### Terminal 1: Backend Server (Node.js + Express)
```bash
cd smart-medicine-reminder-health-tracker/server
npm install
npm run dev
```
- **Base URL**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### Terminal 2: Frontend Client (Vite + React)
```bash
cd smart-medicine-reminder-health-tracker/client
npm install
npm run dev
```
- **Client Application**: `http://localhost:5173`

---

## 📡 REST API Endpoint Documentation

All private routes require a valid Bearer token header:  
`Authorization: Bearer <token>`

### 1. System Health
| Method | Endpoint | Access | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Returns server status, uptime, and timestamp | `200` |

### 2. Authentication & Profile
| Method | Endpoint | Access | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Registers a user, hashes password, returns JWT & safe profile | `201`, `400`, `409` |
| `POST` | `/api/auth/login` | Public | Validates credentials, returns signed JWT & safe profile | `200`, `400`, `401` |
| `GET` | `/api/auth/me` | Protected | Returns authenticated user profile | `200`, `401` |

### 3. Medicine Management (CRUD)
| Method | Endpoint | Access | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/medicines` | Protected | Lists medicines owned by user (supports `?name=...` & `?frequency=...`) | `200`, `401` |
| `GET` | `/api/medicines/:id` | Protected | Retrieves single medicine (enforces ownership) | `200`, `401`, `404` |
| `POST` | `/api/medicines` | Protected | Creates a new prescription schedule | `201`, `400`, `401` |
| `PUT` | `/api/medicines/:id` | Protected | Updates prescription details (enforces ownership) | `200`, `400`, `401`, `404` |
| `DELETE` | `/api/medicines/:id` | Protected | Deletes prescription schedule (enforces ownership) | `200`, `401`, `404` |

### 4. Daily Medication Tracking & Status
| Method | Endpoint | Access | Description | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/records/today` | Protected | Generates/retrieves today's doses and adherence metrics | `200`, `400`, `401` |
| `PATCH` | `/api/records/:id/status`| Protected | Updates dose status (`Pending`, `Taken`, `Missed`) and logs `takenAt` | `200`, `400`, `401`, `404` |
| `GET` | `/api/records/history`| Protected | Queries intake logs with filters (`?startDate=`, `?endDate=`, `?medicineId=`, `?status=`) | `200`, `400`, `401` |

---

## 🔒 Security Architecture & Isolation

- **Derived Identity**: All write and read operations extract `userId` strictly from verified JWT tokens (`req.userId`), ignoring any spoofed client payload identifiers.
- **Cross-User Data Isolation**: When a user attempts to read, modify, or delete a resource owned by another user, the API responds with `404 Not Found` to prevent confirming resource existence.
- **Password Protection**: Passwords are never stored in plain text. Passwords are salted and hashed using `bcryptjs` (10 rounds). User sanitization methods strip `passwordHash` before any JSON serialization.
- **Input Sanitization**: Strings are trimmed, emails normalized to lower case, and dates/times verified via regex before storage operations.

---

## 🗄️ JSON Persistence & Concurrency Engine

The assignment requirements strictly prohibit external SQL/NoSQL databases (such as MongoDB or MySQL). MediTrack implements a custom, reliable JSON file storage engine ([`server/utils/jsonStorage.js`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/server/utils/jsonStorage.js)):

1. **Atomic File Replacement**: File write operations write to a temporary file (`.filename.tmp-...`) in the `server/data/` directory and perform an atomic `fs.rename`. If a crash occurs during writing, the original data file remains unharmed.
2. **Per-File In-Memory Write Queue**: Concurrent write operations on the same JSON file are sequenced through Promise chains to eliminate race conditions.
3. **Corruption Protection**: If invalid JSON is encountered in a data file, the reader throws a descriptive `Data corruption error` instead of silently replacing real patient records with an empty array.

---

## 📮 Postman API Testing Guide

The complete test suite is available at:  
[`postman/MediTrack_Full_Integration_Step5.postman_collection.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/MediTrack_Full_Integration_Step5.postman_collection.json)

### Tested Scenarios:
1. **Health Check**: `GET /api/health` &rarr; `200 OK`
2. **Registration**: `POST /api/auth/register` &rarr; `201 Created` (sets `authToken`)
3. **Duplicate Prevention**: `POST /api/auth/register` with same email &rarr; `409 Conflict`
4. **Login**: `POST /api/auth/login` &rarr; `200 OK`
5. **Unauthorized Guard**: `GET /api/auth/me` without token &rarr; `401 Unauthorized`
6. **Create Medicines**: `POST /api/medicines` &rarr; `201 Created` (sets `medicineId`)
7. **Validation Rejection**: `POST /api/medicines` with `25:99` or inverted dates &rarr; `400 Bad Request`
8. **List & Update**: `GET /api/medicines` &rarr; `200 OK`, `PUT /api/medicines/:id` &rarr; `200 OK`
9. **Auto-Generate Schedule**: `GET /api/records/today` &rarr; `200 OK` (calculates initial adherence)
10. **Status Mutation**: `PATCH /api/records/:id/status` &rarr; `200 OK` (sets `takenAt`)
11. **History Filtering**:
    - `GET /api/records/history?status=Taken`
    - `GET /api/records/history?medicineId={{medicineId}}`
    - `GET /api/records/history?startDate=2026-10-01&endDate=2026-12-31`
12. **Cross-User Isolation**: User B requests User A's medicine/records &rarr; `404 Not Found`
13. **Delete Medicine**: `DELETE /api/medicines/:id` &rarr; `200 OK`

---

## ⚠️ Known Limitations

1. **File-Based JSON Storage Scope**: While resilient and concurrency-safe for single-instance Node.js applications, JSON file storage is not designed for multi-server clustered architectures with distributed transactions.
2. **Server Local Timezone Assumption**: Schedule dates and times are evaluated based on the server's local date format (`YYYY-MM-DD`). For globally distributed users across timezones, UTC storage with client offset conversions would be recommended.

---

## 📊 Current Implementation Status

### ✅ Implemented Features (Steps 1–5)
- [x] **Project Foundation**: Scaffolded Vite React client and Node.js Express server with Tailwind CSS styling.
- [x] **Authentication & JWT**: User registration, login, bcryptjs password hashing, JWT signing, `authMiddleware`, and route guards.
- [x] **Medicine Management**: Full CRUD REST APIs, 24-hr reminder validation, date validations, and interactive React UI with delete confirmations.
- [x] **Daily Medication Tracking**: Automatic dose schedule generation for active prescriptions, deduplication, Taken/Missed/Pending status toggles, and timestamp logging.
- [x] **Dynamic Adherence Dashboard**: Real-time progress bar, percentage calculation, status badges, and dose counters.
- [x] **Advanced Medication History**: History view with date range filters, medicine filter, status filter, and newest-records-first ordering.
- [x] **Centralized API Architecture**: Single `apiClient.js` service with environment-driven base URL, Bearer injection, and zero hardcoded URLs.
- [x] **Comprehensive Testing**: 35-case backend integration test suite and verified React production build.

### ⏳ Future Enhancements (Post-Internship Roadmap)
- [ ] Automated browser push notifications / Web Push API for upcoming dose reminders.
- [ ] Bluetooth Low Energy (BLE) integration with smart pillboxes and blood pressure monitors.
- [ ] Exportable PDF adherence reports for healthcare providers.

---

## 👤 Author

**Vijayapandian T**  
*Full Stack Web Development Intern*
