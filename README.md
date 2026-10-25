<div align="center">

# 🚀 Full-Stack Web Development Internship Portfolio

**Official Repository for Internship Tasks & Production Web Applications**  
*Maintained by **Vijayapandian T** &bull; Full-Stack Web Development Intern at **Career Solutions77***

[![React 18](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Vercel Deployed](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Status-Completed_%26_Production_Ready-success?style=for-the-badge)]()

</div>

---

## 🌐 Live Application Deployments

| Project | Live Web Application | Project Category | Tech Stack | Status |
| :--- | :--- | :--- | :--- | :--- |
| **🏛️ Project 1: Smart Digital Museum** | [**🌐 Live Demo**](https://smart-digital-musem.vercel.app/) | Cultural Heritage & Interactive Museum SPA | React 18, Vite, Tailwind CSS, LocalStorage | **Completed** 🚀 |
| **💊 Project 2: Smart Medicine Reminder & Health Tracker** | [**🌐 Live Demo**](https://health-tracker-khaki-nine.vercel.app/) | Full-Stack Healthcare & Adherence Platform | React 18, Node.js, Express, JWT, JSON Engine | **Completed** 🚀 |

---

## 📑 Table of Contents

- [Executive Summary](#executive-summary)
- [Project 1: Smart Digital Museum](#project-1-smart-digital-museum)
  - [Key Highlights & Features](#key-highlights--features)
  - [Tamil Nadu Cultural Heritage Dataset](#tamil-nadu-cultural-heritage-dataset)
  - [Quick Start Guide](#quick-start-smart-digital-museum)
- [Project 2: Smart Medicine Reminder & Health Tracker (MediTrack)](#project-2-smart-medicine-reminder--health-tracker-meditrack)
  - [System Architecture & Design](#system-architecture--design)
  - [Core Feature Modules](#core-feature-modules)
  - [JSON Persistence & Concurrency Engine](#json-persistence--concurrency-engine)
  - [REST API Endpoint Matrix](#rest-api-endpoint-matrix)
  - [Postman API Testing Suite](#postman-api-testing-suite)
  - [Quick Start Guide](#quick-start-smart-medicine-reminder--health-tracker)
- [Security & Data Integrity Practices](#security--data-integrity-practices)
- [Repository Directory Structure](#repository-directory-structure)
- [Internship Details & Author](#internship-details--author)

---

<a id="executive-summary"></a>
## 📌 Executive Summary

This repository houses the full-stack software development projects engineered during the **Full-Stack Development (FSD) Internship** at **Career Solutions77**.

All applications are built following modern production engineering standards:
- **Decoupled Architecture**: Independent frontend single-page applications (SPAs) and Express backend services communicating via standardized REST APIs.
- **Strict Data Isolation**: Zero-trust authenticated endpoints ensuring user records are accessible exclusively by their owner.
- **Zero-Database Mandate**: Engineered a custom, resilient JSON file-based database system utilizing atomic temp-file swaps, promise-based write queues, and serverless runtime adaptors.
- **Defensive Error Handling**: Comprehensive input validation, centralized error-handling middleware, session expiration dispatchers, and UI loading/empty state feedback.
- **Production Cloud Deployment**: High-availability frontend and backend deployments configured on Vercel with zero cross-origin (CORS) friction.

---

<a id="project-1-smart-digital-museum"></a>
## 🏛️ Project 1: Smart Digital Museum

The **Smart Digital Museum** is an interactive, museum-grade web application designed for exploring world-famous historical artifacts, sculptures, and architectural wonders, featuring a dedicated focus on **Tamil Nadu cultural heritage**.

### Key Highlights & Features
- **Curated 12-Artifact Collection**: Highlights 8 authentic Tamil Nadu historical masterworks alongside celebrated global treasures.
- **Side-by-Side Artifact Comparison Tool**: Interactive matrix allowing visitors to evaluate historical context, materials, eras, and significance simultaneously.
- **360° Virtual Museum Rooms**: Spatial room tours organizing artifacts into thematic galleries (Chola Dynasty, Dravidian Architecture, Classical Art).
- **Graceful Image Error Recovery**: Automated `onError` fallback handlers preventing broken visual assets across varying network conditions.
- **Persistent Client-Side State**: Favorites, recently viewed items, and dark/light themes persist across browser sessions using `localStorage`.
- **Era-Specific Formatting**: Accurate `BCE` / `CE` year calculation badges on all artifact cards and detail modals.

### Tamil Nadu Cultural Heritage Dataset
- **Chola Nataraja Bronze** (Thanjavur &bull; 10th Century CE)
- **Brihadisvara Temple Reliefs** (Thanjavur &bull; 1010 CE)
- **Mahabalipuram Shore Temple** (Mamallapuram &bull; 700 CE)
- **Tanjore Painting of Lord Krishna** (Thanjavur &bull; 16th Century CE)
- **Madurai Meenakshi Musical Pillars** (Madurai &bull; 16th Century CE)
- **Kanchipuram Silk Handloom** (Kanchipuram &bull; Ancient Tradition)
- **Poompuhar Underwater Artifacts** (Kaveripattinam &bull; Sangam Era)
- **Maratha Palace Artifacts** (Thanjavur &bull; 18th Century CE)

### Quick Start (Smart Digital Museum)
```bash
cd smart-digital-museum
npm install
npm run dev
```
- Local Application: `http://localhost:5173`
- Production Deployment: [https://smart-digital-musem.vercel.app/](https://smart-digital-musem.vercel.app/)

---

<a id="project-2-smart-medicine-reminder--health-tracker-meditrack"></a>
## 💊 Project 2: Smart Medicine Reminder & Health Tracker (MediTrack)

**MediTrack** is an enterprise-grade full-stack health platform designed to combat medication non-adherence. It organizes multi-drug prescription schedules, calculates daily intake compliance in real time, and provides multi-criteria intake audit logs.

🌐 **Live Deployments**:
- **Frontend Web Application**: [https://health-tracker-khaki-nine.vercel.app/](https://health-tracker-khaki-nine.vercel.app/)
- **Backend REST API**: [https://health-tracker-backend-neon.vercel.app/](https://health-tracker-backend-neon.vercel.app/)
- **API Health Check**: [https://health-tracker-backend-neon.vercel.app/api/health](https://health-tracker-backend-neon.vercel.app/api/health)

### System Architecture & Design

```text
┌────────────────────────────────────────────────────────┐
│               React 18 + Vite Frontend                 │
│   (Home Landing • Dashboard • Medicines • History)     │
└───────────────────────────┬────────────────────────────┘
                            │  JSON REST API (Bearer JWT)
                            ▼
┌────────────────────────────────────────────────────────┐
│               Node.js + Express Backend                │
│ (Auth Controller • Medicine Controller • Record Engine)│
└───────────┬────────────────────────────────┬───────────┘
            │                                │
            ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐
│     JWT Auth / Me     │        │  Atomic JSON Storage  │
│(bcryptjs Salted Hash) │        │ (Queues + /tmp EROFS) │
└───────────────────────┘        └───────────────────────┘
```

### Core Feature Modules

1. **Comprehensive Public Home Landing Page**:
   - Rich introductory landing page detailing the platform's clinical mission, core capabilities, step-by-step workflow, and live schedule preview card.
2. **JWT Authentication & Profile Guard**:
   - User registration with duplicate email rejection (`409 Conflict`), salted password hashing (`bcryptjs`, 10 rounds), signed JWT tokens, and automatic session restoration.
3. **Prescription Lifecycle Management (CRUD)**:
   - Full management of medication records (name, dosage, daily frequency, multiple 24-hr reminder times `HH:mm`, active dates, and meal instructions) with confirmation modal dialogs on deletion.
4. **Automated Daily Schedule & Deduplication Engine**:
   - Server-side generator that schedules doses for all active prescriptions on the current server date. Doses are idempotent and generated only once per `(userId, medicineId, date, time)`.
5. **Real-Time Adherence Tracking & Analytics**:
   - Dose status toggles (`Taken`, `Missed`, `Pending`). Marking `Taken` logs the exact ISO timestamp. Live compliance rate formula:
     $$\text{Adherence Rate (\%)} = \text{total} > 0 \;?\; \text{round}\left(\frac{\text{taken}}{\text{total}} \times 100\right) : 0$$
6. **Multi-Criteria Medication History**:
   - Query past doses filtered by custom date ranges (`From Date` - `To Date`), specific medicine dropdowns, and status filters, with newest records displayed first.
7. **Centralized Frontend API Client**:
   - Single point of truth (`client/src/services/apiClient.js`) providing automatic token injection, network error normalization, and global 401 session expiration handling.

### JSON Persistence & Concurrency Engine

The project strictly fulfills the internship requirement prohibiting external SQL/NoSQL databases (no MongoDB/MySQL). Persistence is managed by a custom engine in [`server/utils/jsonStorage.js`](./smart-medicine-reminder-health-tracker/server/utils/jsonStorage.js):
- **Atomic File Writes**: Writes data to `.filename.tmp-...` and executes an atomic `fs.rename` so file corruptions are physically impossible even during unexpected process termination.
- **In-Memory Write Queues**: Promise chains sequence concurrent writes per file, preventing race conditions.
- **Serverless Runtime Compatibility**: Automatically detects Vercel / AWS Lambda environments and uses `/tmp/meditrack_data/` to prevent `EROFS: read-only file system` crashes.
- **Corruption Safeguard**: Throws explicit corruption errors rather than silently overwriting user data with empty arrays.

### REST API Endpoint Matrix

| Module | Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- | :--- |
| **System** | `GET` | `/api/health` | Public | Returns server uptime, status, and timestamp |
| **Auth** | `POST` | `/api/auth/register` | Public | Registers user, hashes password, returns JWT & profile |
| **Auth** | `POST` | `/api/auth/login` | Public | Authenticates credentials, returns signed JWT |
| **Auth** | `GET` | `/api/auth/me` | Bearer JWT | Returns current authenticated user profile |
| **Medicines**| `GET` | `/api/medicines` | Bearer JWT | Lists user's prescriptions (optional filters: name, frequency) |
| **Medicines**| `GET` | `/api/medicines/:id` | Bearer JWT | Retrieves single prescription (enforces ownership) |
| **Medicines**| `POST` | `/api/medicines` | Bearer JWT | Creates new prescription schedule |
| **Medicines**| `PUT` | `/api/medicines/:id` | Bearer JWT | Updates prescription details (enforces ownership) |
| **Medicines**| `DELETE`| `/api/medicines/:id` | Bearer JWT | Deletes prescription schedule (enforces ownership) |
| **Tracking** | `GET` | `/api/records/today` | Bearer JWT | Auto-generates/retrieves today's doses & adherence summary |
| **Tracking** | `PATCH`| `/api/records/:id/status` | Bearer JWT | Updates dose status (`Taken`, `Missed`, `Pending`) & timestamp |
| **Tracking** | `GET` | `/api/records/history` | Bearer JWT | Queries history logs (`?startDate=`, `?endDate=`, `?medicineId=`) |

### Postman API Testing Suite

An exportable, fully automated Postman collection is located at:  
[`smart-medicine-reminder-health-tracker/postman/MediTrack_Full_Integration_Step5.postman_collection.json`](./smart-medicine-reminder-health-tracker/postman/MediTrack_Full_Integration_Step5.postman_collection.json)

- **35 Automated Test Cases Executed**: Covering registration, duplicate prevention, login, JWT verification, medicine CRUD, schedule generation, status mutations, adherence calculations, history filters, cross-user isolation, and error validation (100% Pass Rate).

### Quick Start (Smart Medicine Reminder & Health Tracker)

#### Terminal 1: Backend Server (Node.js + Express)
```bash
cd smart-medicine-reminder-health-tracker/server
npm install
npm run dev
```
- Server URL: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

#### Terminal 2: Frontend Client (Vite + React)
```bash
cd smart-medicine-reminder-health-tracker/client
npm install
npm run dev
```
- Client URL: `http://localhost:5173`

---

<a id="security--data-integrity-practices"></a>
## 🔒 Security & Data Integrity Practices

1. **Derived User Identity**: The backend derives `userId` exclusively from the verified JWT payload (`req.userId`), never trusting client-supplied user identifiers in request bodies or query parameters.
2. **Cross-User Data Isolation**: Unauthorized cross-user requests return `404 Not Found` rather than `403 Forbidden` to prevent malicious actors from verifying resource existence.
3. **Bcryptjs Password Hashing**: Passwords are salted and hashed (10 rounds). Password hashes are scrubbed by `sanitizeUser()` before serialization and are never logged or returned.
4. **CORS Whitelisting**: Strict origin policy configured in Express permitting localhost dev environments and production Vercel frontend domains.
5. **No Secret Leaks**: All secrets are managed through environment variables (`.env`). Gitignore patterns strictly prevent `.env` and `.tmp` files from entering source control.

---

<a id="repository-directory-structure"></a>
## 📂 Repository Directory Structure

```text
fsd-intern-task-and-project/
├── README.md                                   # Global portfolio documentation
├── smart-digital-museum/                       # Project 1: Smart Digital Museum
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── data/artifactsData.js               # 12 Curated artifacts (8 Tamil Nadu heritage items)
│       └── components/                         # ArtifactCard, ComparisonModal, RoomTour, etc.
│
└── smart-medicine-reminder-health-tracker/     # Project 2: Smart Medicine Reminder & Health Tracker
    ├── README.md                               # Project-specific technical documentation
    ├── .gitignore
    ├── postman/
    │   └── MediTrack_Full_Integration_Step5.postman_collection.json
    ├── client/                                 # React 18 + Vite Frontend
    │   ├── .env.example
    │   ├── package.json
    │   ├── tailwind.config.js
    │   ├── vite.config.js
    │   └── src/
    │       ├── App.jsx                         # Main router & session state coordinator
    │       ├── components/                     # Navbar, Footer, Card, StatusBadge, ProtectedRoute
    │       ├── pages/                          # Home, Dashboard, Medicines, MedicationHistory, Login, Register
    │       └── services/                       # apiClient.js, authService.js, medicineService.js, recordService.js
    └── server/                                 # Node.js + Express Backend
        ├── .env.example
        ├── package.json
        ├── server.js                           # Express server & route registration
        ├── controllers/                        # authController, healthController, medicineController, recordController
        ├── middleware/                         # authMiddleware, errorHandler
        ├── routes/                             # authRoutes, healthRoutes, medicineRoutes, recordRoutes
        ├── services/                           # medicineService, recordService, userService
        ├── utils/                              # jsonStorage.js (Atomic writes & serverless runtime safety)
        └── data/                               # Persistent JSON stores (users.json, medicines.json, medicationRecords.json)
```

---

<a id="internship-details--author"></a>
## 👤 Internship Details & Author

- **Intern Name**: **Vijayapandian T**
- **Internship Role**: Full-Stack Web Development Intern
- **Host Organization**: **Career Solutions77**
- **GitHub Repository**: [VIJAYAPANDIANT/fsd-intern-task-and-project](https://github.com/VIJAYAPANDIANT/fsd-intern-task-and-project)
- **Primary Tech Stack**: React.js, Vite, Tailwind CSS, Node.js, Express.js, REST APIs, JWT Authentication, JSON Persistence

---

<div align="center">
  <sub>Developed with precision and pride as part of the Full-Stack Web Development Internship. All rights reserved.</sub>
</div>
