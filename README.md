# Travel Guard (Travel-Guardian) 🛡️🌿

> **Safer Journeys. Happier Memories.**  
> Real-time tracking, instant SOS alerts, reunion workflows, and AI-powered safety assistance for tour operators, guides, and tourists.

---

## 🌟 Overview

**Travel Guard** is a modern, responsive, full-stack safety web platform designed for tour operations in mountainous and trekking terrains (such as Munnar, Kerala). Led by Tour Guide **Jumana** and supporting tourists (**Hisha, Rinsha, Sana, and Dilrooba**), the application provides seamless offline and online telemetry, emergency handling, and coordination across 9 comprehensive screens.

---

## 📱 The 9 Screens

1. **Welcome / Landing Page**: Hero showcase, value pillars, quick overview with direct access to the Tour Guide network.
2. **Dashboard**: High-level telemetry overview, real-time group metrics (total tourists, with group, separated, reunited, active SOS), and recent alerts.
3. **SOS Emergency Support**: High-priority incident reporting interface allowing guide Jumana to record urgent emergencies with confirmation modals and database persistence.
4. **Alert Details**: Complete incident briefing including priority status, affected tourist telemetry, incident timeline, and resolution workflows.
5. **Reunion Mode**: Safe checkpoint assembly manager, live rendezvous status, and physical reunion confirmations.
6. **Group Members**: Directory of all tour group members with live battery percentages, contact info, and status indicators.
7. **Live Location**: Interactive map grid displaying real-time coordinates, last check-in times, and telemetry sources (GPS / Demo).
8. **Alerts & Notifications**: Real-time safety notification feed and alert acknowledgement hub.
9. **AI Travel Assistant**: Interactive travel companion powered by Munnar safety guidelines, lost-tourist recovery protocols, and emergency guidance.

---

## 🚀 Technology Stack

### Frontend
- **HTML5 & Vanilla CSS / Modern Tailwind CSS**
- **React 18 & ReactDOM** (modular component architecture)
- **Leaflet.js** (interactive mapping and marker telemetry)
- **Lucide Icons** (vector SVG iconography)

### Backend & API
- **Node.js Serverless API (`api/index.js`)**: Native Vercel Serverless Function architecture.
- **Python REST API (`backend/server.py`)**: Zero-dependency multithreaded HTTP server with SQLite relational database (`backend/database/travelguard.db`).
- **Express.js & Prisma ORM (`backend-nodejs/`)**: PostgreSQL / Supabase ready production stack.

---

## 🛠️ Local Development Setup

### 1. Run Python Backend (Zero External Dependencies)
```bash
cd backend
python seed.py        # Initializes SQLite schema and seeds demo records
python server.py      # Starts REST API on port 5000 (http://127.0.0.1:5000)
```

### 2. Run Test Suite
```bash
cd backend/tests
python test_api.py    # Executes 13 automated integration tests
```

### 3. Open Frontend
Open `index.html` or `travelby/index.html` using VS Code Live Server or any static HTTP server.

---

## ☁️ Deployment on Vercel

This repository is pre-configured with `vercel.json` and a serverless API handler under `api/`:

```bash
# Deploy with Vercel CLI
npx vercel

# Or push to GitHub and import directly via the Vercel Dashboard
```

---

## 🔒 Security & Data Integrity

- Passwords hashed using PBKDF2 with 100,000 iterations and unique cryptographic salts.
- HMAC-SHA256 signed JWT tokens for API authorization.
- Idempotent emergency SOS submissions to prevent duplicate triggers.
- Full audit event logging for meeting point updates, alert resolutions, and reunion confirmations.
