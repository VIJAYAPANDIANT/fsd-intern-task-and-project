# Smart Medicine Reminder & Health Tracker

## 📌 Project Overview

The **Smart Medicine Reminder & Health Tracker** is a full-stack web application designed to help individuals and caregivers organize prescription schedules, receive daily medication alerts, monitor dose adherence, and track vital health indicators.

This project is developed as part of the Full Stack Web Development (FSD) Internship by **Vijayapandian T**.

---

## 🎯 Objectives

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) and bcryptjs password hashing.
- **Protected Routing**: Guard sensitive routes (`Dashboard`, `Medicines`, `Medication History`) from unauthenticated access.
- **Medication Scheduling (Step 3)**: Complete CRUD capability for prescriptions (name, dosage, frequency, 24-hr reminder times, start/end dates, instructions).
- **Cross-User Data Isolation**: Strict user-specific authorization ensuring no user can read, modify, or delete another's records.
- **Secure File-Based Storage**: Safe JSON persistence using atomic writes (`.tmp` + `fs.rename`), async write queuing, and corruption safeguards without external database dependencies.
- **Separation of Concerns**: Clean modular MVC / service architecture on Express with a decoupled React Vite frontend.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite 5
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **API Client**: Native `fetch` API (`client/src/services/medicineService.js`)
- **Session Persistence**: Browser `sessionStorage`

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js 4
- **Authentication**: `jsonwebtoken` (JWT with Bearer authentication)
- **Password Hashing**: `bcryptjs` (salt rounds: 10)
- **Architecture**: Modular Controller / Service-oriented REST API
- **Data Persistence**: JSON file storage (`server/data/medicines.json`, `server/data/users.json`) — *No external database (MongoDB/SQL) per specification*
- **Dev Tooling**: `nodemon` for auto-reloading

---

## 📂 Folder Structure

```text
smart-medicine-reminder-health-tracker/
├── .gitignore
├── README.md
├── postman/
│   ├── MediTrack_Step2_Auth.postman_collection.json
│   ├── MediTrack_Step3_Medicines.postman_collection.json
│   └── MediTrack_Step4_Tracking_History.postman_collection.json
├── client/
│   ├── .env
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
│           ├── medicineService.js
│           └── recordService.js
└── server/
    ├── .env
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

## 💊 Medicine CRUD REST APIs (Step 3)

All medicine routes are protected and require a valid Bearer JWT:
`Authorization: Bearer <token>`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/medicines` | Returns all medicines owned by the authenticated user. Supports optional query filters: `?name=...` and `?frequency=...` | `200`, `401` |
| **GET** | `/api/medicines/:id` | Returns a single medicine by ID. Enforces strict user ownership. | `200`, `401`, `404` |
| **POST** | `/api/medicines` | Creates a new prescription schedule for the authenticated user. | `201`, `400`, `401` |
| **PUT** | `/api/medicines/:id` | Updates an existing prescription. Enforces user ownership and validates values. | `200`, `400`, `401`, `404` |
| **DELETE** | `/api/medicines/:id` | Deletes a prescription schedule. Enforces user ownership. | `200`, `401`, `404` |

### Medicine Data Model (`medicines.json`)
```json
{
  "id": "med_1792775417787_6d8d71f8",
  "userId": "usr_alice_123",
  "name": "Metformin Hydrochloride",
  "dosage": "500 mg",
  "frequency": "Twice daily",
  "reminderTimes": ["08:00", "20:00"],
  "startDate": "2026-10-23",
  "endDate": "2026-11-23",
  "instructions": "Take with breakfast and dinner",
  "createdAt": "2026-10-23T17:10:17.787Z",
  "updatedAt": "2026-10-23T17:10:17.787Z"
}
```

### Strict Ownership & Security Rules
- **Derived Identity**: The backend derives `userId` exclusively from the verified JWT payload (`req.userId`), never from client request bodies or query parameters.
- **Cross-User Isolation**: A user attempting to read, edit, or delete another user's medicine receives `HTTP 404 Not Found` (to avoid confirming resource existence to unauthorized actors).
- **Input Validation**:
  - `reminderTimes`: Must be an array of valid 24-hour times matching `/^([01]\d|2[0-3]):([0-5]\d)$/` (e.g. `08:00`, `20:30`).
  - Dates: `startDate` and optional `endDate` must match `YYYY-MM-DD`. `endDate` must not precede `startDate`.

---

## 📅 Daily Medication Tracking, Progress & History (Step 4)

All tracking and history routes are protected and require a valid Bearer JWT:
`Authorization: Bearer <token>`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/records/today` | Generates or retrieves today's scheduled doses for active prescriptions. Returns doses with calculated adherence metrics (`total`, `taken`, `missed`, `pending`, `adherenceRate`). | `200`, `401` |
| **PATCH** | `/api/records/:id/status` | Updates the status of a scheduled dose (`Pending`, `Taken`, `Missed`). Setting `Taken` sets `takenAt = ISO string`; setting `Missed` or `Pending` sets `takenAt = null`. Enforces strict dose ownership. | `200`, `400`, `401`, `404` |
| **GET** | `/api/records/history` | Retrieves user's medication history logs. Supports optional query filters: `?date=YYYY-MM-DD` and `?status=Pending\|Taken\|Missed`. | `200`, `400`, `401` |

### Medication Record Data Model (`medicationRecords.json`)
```json
{
  "id": "rec_1792775417787_abc123",
  "userId": "usr_alice_123",
  "medicineId": "med_1792775417787_6d8d71f8",
  "scheduledDate": "2026-10-23",
  "scheduledTime": "08:00",
  "status": "Taken",
  "takenAt": "2026-10-23T08:15:22.000Z",
  "createdAt": "2026-10-23T00:00:00.000Z",
  "updatedAt": "2026-10-23T08:15:22.000Z"
}
```

### Auto-Schedule Generation Logic
- **Active Prescription Window**: A medicine is eligible for schedule generation on date $D$ if `startDate <= D` and (`!endDate` or `endDate >= D`).
- **Dose Generation**: Creates one scheduled dose record per entry in the prescription's `reminderTimes` array.
- **Idempotent & Deduplicated**: Before inserting, checks if a record with `(userId, medicineId, scheduledDate, scheduledTime)` already exists. Existing records and their current statuses are preserved.
- **Timezone Consistency**: Generates and checks schedules using the local server date (`YYYY-MM-DD`).
- **Frontend Independence**: The frontend never generates or inserts dose rows directly; simply calling `GET /api/records/today` triggers safe server-side generation.

### Real-Time Adherence Calculation
```text
Adherence Rate (%) = total > 0 ? Math.round((taken / total) * 100) : 0
```
Included in the response of `GET /api/records/today`:
```json
{
  "summary": {
    "date": "2026-10-23",
    "total": 3,
    "taken": 2,
    "missed": 0,
    "pending": 1,
    "adherenceRate": 67
  },
  "records": [...]
}
```

---

## 🗄️ JSON Persistence & Concurrency

- **No Database**: Prescriptions are persisted in [`server/data/medicines.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/server/data/medicines.json) and dose records in [`server/data/medicationRecords.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/server/data/medicationRecords.json).
- **Atomic File Writes**: The utility writes data to a temporary file (`.filename.json.tmp-...`) and then executes an atomic rename (`fs.rename`). This prevents corrupt or truncated files if a process crashes mid-write.
- **In-Memory Write Queue**: File write operations are serialized using promise chains in [`server/utils/jsonStorage.js`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/server/utils/jsonStorage.js) to avoid race conditions.
- **Architecture Limitation Note**: File-based JSON storage is ideal for this single-node internship project and local testing. In enterprise multi-instance or clustered production environments, an ACID-compliant database with row/document locking would be necessary.

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
- **Medicines API**: `http://localhost:5000/api/medicines`
- **Records API**: `http://localhost:5000/api/records`

### Terminal 2: Frontend Client (Vite + React)
```bash
cd smart-medicine-reminder-health-tracker/client
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

---

## 📮 Postman API Testing Guide

Importable Postman collections are located in [`smart-medicine-reminder-health-tracker/postman/`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/):
1. [`MediTrack_Step2_Auth.postman_collection.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/MediTrack_Step2_Auth.postman_collection.json)
2. [`MediTrack_Step3_Medicines.postman_collection.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/MediTrack_Step3_Medicines.postman_collection.json)
3. [`MediTrack_Step4_Tracking_History.postman_collection.json`](file:///c:/FSD%20Intern/smart-medicine-reminder-health-tracker/postman/MediTrack_Step4_Tracking_History.postman_collection.json)

### Step 4 Tested Scenarios:
1. **Login User** &mdash; `POST /api/auth/login` &rarr; `200 OK` (captures `authToken`)
2. **Fetch Today Schedule** &mdash; `GET /api/records/today` &rarr; `200 OK` (generates dose rows and summary)
3. **Mark Dose Taken** &mdash; `PATCH /api/records/:id/status` `{ "status": "Taken" }` &rarr; `200 OK` (sets `takenAt`)
4. **Mark Dose Missed** &mdash; `PATCH /api/records/:id/status` `{ "status": "Missed" }` &rarr; `200 OK` (`takenAt` cleared)
5. **Reset Dose to Pending** &mdash; `PATCH /api/records/:id/status` `{ "status": "Pending" }` &rarr; `200 OK`
6. **Fetch Medication History (Unfiltered)** &mdash; `GET /api/records/history` &rarr; `200 OK`
7. **Filter History by Date** &mdash; `GET /api/records/history?date=YYYY-MM-DD` &rarr; `200 OK`
8. **Filter History by Status** &mdash; `GET /api/records/history?status=Taken` &rarr; `200 OK`
9. **Reject Invalid Status** &mdash; `PATCH /api/records/:id/status` `{ "status": "Skipped" }` &rarr; `400 Bad Request`

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
- [x] Frontend Login & Register pages with session management and route guards (`ProtectedRoute.jsx`).

### ✅ Completed in Task 3 (Medicine CRUD APIs & UI)
- [x] Initialized `server/data/medicines.json` with strict schema validation.
- [x] Created `server/services/medicineService.js` and `server/controllers/medicineController.js`.
- [x] Implemented 5 REST endpoints: `GET /api/medicines`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`.
- [x] Enforced strict user ownership isolation (User B cannot access or modify User A's medicines).
- [x] Validated 24-hour reminder times (`HH:mm`) and date sequences (`endDate >= startDate`).
- [x] Created `client/src/services/medicineService.js` with session expiration dispatch.
- [x] Built interactive React Medicines page with Create/Edit modal dialogs, search filter, and delete confirmations.
- [x] Exported Postman collection: `postman/MediTrack_Step3_Medicines.postman_collection.json`.

### ✅ Completed in Task 4 (Daily Tracking, Adherence & History)
- [x] Initialized `server/data/medicationRecords.json` for dose log storage.
- [x] Built automatic schedule generation engine: computes doses for active prescriptions on the current server date.
- [x] Built deduplication logic ensuring doses for a given `(userId, medicineId, date, time)` are generated only once.
- [x] Implemented status transition API (`PATCH /api/records/:id/status`) with automatic `takenAt` timestamp assignment.
- [x] Built real-time daily progress adherence calculation (`adherenceRate`, `taken`, `missed`, `pending`).
- [x] Implemented medication history API (`GET /api/records/history`) with multi-param filtering (`?date=...`, `?status=...`).
- [x] Created `client/src/services/recordService.js` for API integration.
- [x] Upgraded `Dashboard.jsx` with dynamic progress bars, status counters, and instant dose status toggle buttons.
- [x] Upgraded `MedicationHistory.jsx` with date-picker and status-filter history query views.
- [x] Exported comprehensive Postman collection: `postman/MediTrack_Step4_Tracking_History.postman_collection.json`.
- [x] Preserved zero database dependency (strict JSON file storage).

### ⏳ Planned for Upcoming Tasks
- [ ] Health Vitals Tracking (blood pressure, heart rate, blood glucose, weight) (Step 5).
- [ ] Automated browser/push notification alerts for upcoming dose times.

---

## 👤 Author

**Vijayapandian T**  
*Full Stack Web Development Intern*
