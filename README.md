# FSD Intern Task and Project Repository

Welcome to the **FSD Intern Repository** maintained by **Vijayapandian T**. This repository contains the project code, tasks, and full-stack development implementations completed during the internship.

🌐 **Live Application Link**: [Smart Digital Museum](https://smart-digital-musem.vercel.app/)

---

## 📂 Repository Overview

| Directory | Description | Live Demo / Status | Tech Stack | Progress |
| :--- | :--- | :--- | :--- | :--- |
| [**`smart-digital-museum/`**](./smart-digital-museum) | Interactive Smart Digital Museum web app featuring 12 artifacts (including 8 Tamil Nadu heritage items), real-time search, filtering, comparison, room tours, year badges, image fallbacks, and dark mode. | [🌐 Live Demo](https://smart-digital-musem.vercel.app/) | React 18, Vite, Tailwind CSS, LocalStorage | **Completed** 🚀 |
| [**`smart-medicine-reminder-health-tracker/`**](./smart-medicine-reminder-health-tracker) | Full-stack application for managing medication schedules, real-time reminders, adherence tracking (Taken/Missed/Pending), and daily health vitals monitoring. | Localhost (Backend: `:5000`, Client: `:5173`) | React 18, Vite, Tailwind CSS, Node.js, Express, JSON Storage | **Task 1: Setup Done** 🔄 |

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

The **Smart Medicine Reminder & Health Tracker** is a full-stack medication schedule and health metrics tracking application. It helps individuals and caregivers set dosage schedules, receive dose reminders, monitor daily adherence rates, and track vital health indicators.

### Key Highlights
- **Full-Stack REST Architecture**: Decoupled React frontend (Vite) and Node.js/Express backend communicating over REST APIs.
- **File-Based JSON Storage**: Custom, persistent JSON file storage in `server/data/` adhering to assignment requirements with zero external database dependencies.
- **Dose Adherence Monitoring**: Designed to track medication statuses across `Taken`, `Missed`, and `Pending` states with adherence progress percentages.
- **Responsive Healthcare UI**: Styled with Tailwind CSS, including reusable `Card`, `StatusBadge`, and responsive navigation components.
- **Health Check Endpoint**: Backend `GET /api/health` verified with live connectivity polling from the frontend.

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
