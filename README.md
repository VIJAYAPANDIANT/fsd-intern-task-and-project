# FSD Intern Task and Project Repository

Welcome to the **FSD Intern Repository** maintained by **Vijayapandian T**. This repository contains the project code, tasks, and full-stack development implementations completed during the internship.

🌐 **Live Application Deployments**:
- 🏛️ **Project 1 - Smart Digital Museum**: [https://smart-digital-musem.vercel.app/](https://smart-digital-musem.vercel.app/)
- 💊 **Project 2 - Smart Medicine Reminder & Health Tracker**: [https://health-tracker-khaki-nine.vercel.app/](https://health-tracker-khaki-nine.vercel.app/) &bull; [Backend API](https://health-tracker-backend-neon.vercel.app/)

---

## 📂 Repository Overview

| Directory | Description | Live Demo / Status | Tech Stack | Progress |
| :--- | :--- | :--- | :--- | :--- |
| [**`smart-digital-museum/`**](./smart-digital-museum) | Interactive Smart Digital Museum web app featuring 12 artifacts (including 8 Tamil Nadu heritage items), real-time search, filtering, comparison, room tours, year badges, image fallbacks, and dark mode. | [🌐 Live Demo](https://smart-digital-musem.vercel.app/) | React 18, Vite, Tailwind CSS, LocalStorage | **Completed** 🚀 |
| [**`smart-medicine-reminder-health-tracker/`**](./smart-medicine-reminder-health-tracker) | Full-stack application for managing medication schedules, real-time reminders, adherence tracking (Taken/Missed/Pending), and daily health vitals monitoring. | Localhost (Backend: `:5000`, Client: `:5173`) | React 18, Vite, Tailwind CSS, Node.js, Express, JWT, bcryptjs, JSON Storage | **Completed & Fully Integrated** 🚀 |

---

## 🌟 Project 1: Smart Digital Museum

The **Smart Digital Museum** is a modern web application designed for exploring historical artifacts, famous artworks, and cultural treasures worldwide, with a dedicated highlight on **Tamil Nadu, India cultural heritage**.

### Key Highlights
- **🌐 Live Deployment**: Hosted on Vercel at [smart-digital-musem.vercel.app](https://smart-digital-musem.vercel.app/).
- **React 18 & Vite**: Built with high-performance modular components.
- **Tailwind CSS**: Modern responsive styling with custom gold branding and dark mode support.
- **Enriched Artifact Dataset**: 12 curated historical artifacts including 8 Tamil Nadu items (Chola Nataraja Bronze, Brihadisvara Temple reliefs, Mahabalipuram Shore Temple, Tanjore Paintings, Madurai Musical Pillars, Kanchipuram Silk Loom, etc.).
- **Formatted Year Badges**: Formatted `CE` / `BCE` badges on all artifact cards and modals.
- **Image Fallback Recovery**: Graceful `onError` fallback handling so broken external image links fall back to a high-quality placeholder.
- **State Management & Persistence**: Synchronized favorites, recently viewed items, and theme preferences stored in `localStorage`.
- **Interactive Features**: Artifact detail modal, side-by-side artifact comparison tool, category/period filters, and virtual museum rooms.

### Quick Start (Smart Digital Museum)
```bash
cd smart-digital-museum
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 💊 Project 2: Smart Medicine Reminder & Health Tracker

The **Smart Medicine Reminder & Health Tracker (MediTrack)** is a full-stack medication schedule and health metrics tracking application. It helps individuals and caregivers set dosage schedules, receive dose reminders, monitor daily adherence rates, and track vital health indicators with strict cross-user privacy.

- 🌐 **Live Web Application (Frontend)**: [https://health-tracker-khaki-nine.vercel.app/](https://health-tracker-khaki-nine.vercel.app/)
- ⚙️ **Live Backend API**: [https://health-tracker-backend-neon.vercel.app/](https://health-tracker-backend-neon.vercel.app/)
- 🩺 **Live Health Check**: [https://health-tracker-backend-neon.vercel.app/api/health](https://health-tracker-backend-neon.vercel.app/api/health)

### Key Highlights
- **Full-Stack REST Architecture**: Decoupled React 18 frontend (Vite + Tailwind CSS) and Node.js/Express backend communicating over REST APIs.
- **JWT Authentication & Password Hashing**: Secure user registration and login with `bcryptjs` password hashing (salt rounds: 10) and signed JWTs. Protected client routing via `ProtectedRoute`.
- **Prescription CRUD Lifecycle**: Full management of medication records (name, dosage, daily frequency, multiple 24-hr reminder times, start/end dates, and instructions) with confirmation modal dialogs on deletion.
- **Automated Daily Dose Engine**: Server-side schedule generator that automatically computes today's scheduled doses from active user prescriptions with idempotency and deduplication guards.
- **Real-Time Adherence Monitoring**: Instant recalculation of daily adherence compliance ($0-100\%$), visual progress bar, status badges, and counters across `Taken`, `Missed`, and `Pending` states.
- **Multi-Criteria Medication History**: Interactive log querying with date range filters (`From Date` and `To Date`), medicine selector dropdown, and status filters, with newest doses displayed first.
- **File-Based JSON Storage Engine**: Custom, persistent JSON file storage in `server/data/` utilizing atomic rename writes (`.tmp` + `rename`), Promise write queues, and corruption safeguards—adhering strictly to assignment requirements with zero external database dependencies.
- **Centralized API Client Architecture**: Unified frontend API client (`client/src/services/apiClient.js`) that automatically resolves environment variables, injects Bearer JWT headers, handles network failures, and catches 401 session expirations.
- **Postman API Test Suite**: Comprehensive collections in `postman/` covering all 7 endpoint groups and 35 automated test scenarios.

### Quick Start (Smart Medicine Reminder & Health Tracker)

#### 1. Start the Backend Server (Terminal 1)
```bash
cd smart-medicine-reminder-health-tracker/server
npm install
npm run dev
```
- Server runs at: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

#### 2. Start the Frontend Client (Terminal 2)
```bash
cd smart-medicine-reminder-health-tracker/client
npm install
npm run dev
```
- Client runs at: `http://localhost:5173`

#### 3. Postman API Testing
Import the collection from:  
[`smart-medicine-reminder-health-tracker/postman/MediTrack_Full_Integration_Step5.postman_collection.json`](./smart-medicine-reminder-health-tracker/postman/MediTrack_Full_Integration_Step5.postman_collection.json)

---

## 🛠️ Global Tech Stack & Tools

- **Frontend**: React.js 18, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS 3
- **Backend**: Node.js, Express.js 4, REST APIs, JSON File Persistence
- **Build Tools & Utilities**: Vite 5, PostCSS, Autoprefixer, Lucide React, Nodemon, Dotenv, CORS
- **Testing & Tooling**: Postman, PowerShell, Git & GitHub
- **Deployment**: Vercel

---

## 👤 Author

**Vijayapandian T**  
*Full Stack Web Development Intern*
