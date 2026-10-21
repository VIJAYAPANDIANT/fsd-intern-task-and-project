# Smart Medicine Reminder & Health Tracker

## 📌 Project Overview

The **Smart Medicine Reminder & Health Tracker** is a full-stack web application designed to help individuals and caregivers organize prescription schedules, receive daily medication alerts, monitor dose adherence, and track vital health indicators.

This project is developed as part of the Full Stack Web Development (FSD) Internship by **Vijayapandian T**.

---

## 🎯 Objectives

- **Medication Scheduling**: Allow users to configure medicine names, dosages, frequencies, and scheduled intake times.
- **Real-Time Reminders & Status Tracking**: Categorize daily doses across `Taken`, `Missed`, and `Pending` states.
- **Daily Adherence Tracking**: Provide clear visual feedback on daily dose compliance and historical intake.
- **Medication History & Filtering**: Allow users to review and filter past records by date and status.
- **Secure File-Based Storage**: Manage data safely using structured JSON file storage without external database overhead.
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

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js 4
- **Architecture**: REST API
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
    │   └── healthController.js
    ├── data/
    │   ├── README.md
    │   ├── history.json
    │   ├── medicines.json
    │   └── users.json
    ├── middleware/
    │   └── errorHandler.js
    ├── routes/
    │   └── healthRoutes.js
    ├── services/
    └── utils/
        └── jsonStorage.js
```

---

## 📋 Prerequisites

Ensure the following tools are installed on your machine before running the project:
- **Node.js**: `v18.0.0` or later (tested on `v24.13.0`)
- **npm**: `v9.0.0` or later (tested on `11.6.2`)
- **Git**
- Modern Web Browser (Chrome, Firefox, Edge, Safari)

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

### Terminal 2: Frontend Client (Vite + React)
```bash
cd smart-medicine-reminder-health-tracker/client
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

---

## 📊 Current Implementation Status

### ✅ Completed in Task 1 (Project Setup)
- [x] Initialized project directory structure under the existing repository.
- [x] Express.js server configured with JSON parsing, CORS, and centralized error handling.
- [x] Backend `GET /api/health` endpoint implemented and verified.
- [x] Prepared JSON file storage structure in `server/data/` for users, medicines, and logs.
- [x] React 18 + Vite application scaffolded and configured with Tailwind CSS.
- [x] Responsive layout designed with reusable `Navbar`, `Footer`, `Card`, and `StatusBadge` components.
- [x] Placeholder views created for **Dashboard**, **Medicines**, **Medication History**, **Login**, and **Register**.
- [x] Frontend health-check polling hooked up to report backend server connection status.
- [x] Development scripts configured (`npm run dev` for both frontend and backend).

### ⏳ Planned for Upcoming Tasks
- [ ] User Registration, Login, and Password Hashing with bcrypt (Task 2).
- [ ] JWT Authentication & Protected Routes (Task 2).
- [ ] Medicine Schedule CRUD APIs & interactive forms (Task 3).
- [ ] Dose tracking actions (Mark as Taken / Missed / Pending).
- [ ] History log filtering and adherence rate analytics.
- [ ] Postman API collection verification.

---

## 👤 Author

**Vijayapandian T**  
*Full Stack Web Development Intern*
