# Travel Guard — Vercel Deployment Guide

This guide explains how to deploy the entire **Travel Guard** full-stack application (all 9 screens + real Serverless REST APIs) to [Vercel](https://vercel.com).

---

## 1. What Was Added for Vercel

1. **[`vercel.json`](file:///c:/Users/déll/OneDrive/Desktop/web/vercel.json)**:
   - Configures serverless rewrites so all `/api/*` calls automatically route to our Vercel Serverless Function handler.
   - Preserves static routing for the React landing page, assets, and `/travelby` paths.
   - Injects permissive CORS headers for all endpoints.

2. **[`api/index.js`](file:///c:/Users/déll/OneDrive/Desktop/web/api/index.js)**:
   - Dedicated Vercel Node.js serverless API function.
   - Implements every required backend endpoint:
     * `GET /api/health`
     * `GET /api/dashboard/summary` (Dynamic counts for total tourists, active SOS, separated tourists)
     * `GET /api/dashboard/recent-alerts`
     * `GET /api/dashboard/group-status`
     * `GET /api/groups/:id/members` (Hisha, Rinsha, Sana, Dilrooba)
     * `GET /api/groups/:id/locations`
     * `GET /api/groups/:id/reunion`
     * `PUT /api/groups/:id/meeting-point`
     * `POST /api/alerts/sos`
     * `GET /api/alerts`
     * `PATCH /api/alerts/:id/resolve`
     * `POST /api/assistant/chat` (Munnar safety advisory assistant)
     * `GET /api/notifications`

3. **[`package.json`](file:///c:/Users/déll/OneDrive/Desktop/web/package.json)**:
   - Root project manifest declaring serverless dependencies.

4. **[`.vercelignore`](file:///c:/Users/déll/OneDrive/Desktop/web/.vercelignore)**:
   - Prevents unnecessary scratch files and local cache binaries from uploading.

5. **Dynamic `API_BASE` in [`app.js`](file:///c:/Users/déll/OneDrive/Desktop/web/app.js) and [`travelby/app.js`](file:///c:/Users/déll/OneDrive/Desktop/web/travelby/app.js)**:
   - Automatically detects whether the app is running locally on `localhost:5000` or hosted on Vercel at `https://your-domain.vercel.app/api`.

---

## 2. Deploying via Vercel CLI (Command Line)

If you have Node.js / Vercel CLI installed:

```bash
# 1. Open the project root folder
cd c:\Users\déll\OneDrive\Desktop\web

# 2. Deploy directly with Vercel CLI
npx vercel

# 3. For production deployment
npx vercel --prod
```

---

## 3. Deploying via GitHub / Vercel Web Dashboard (Recommended)

1. Push this project folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Travel Guard full-stack with Vercel serverless backend"
   git branch -M main
   git remote add origin https://github.com/<your-username>/travel-guard.git
   git push -u origin main
   ```

2. Open the [Vercel Dashboard](https://vercel.com/new).
3. Click **"Import Project"** and select your GitHub repository.
4. Keep the default settings:
   - **Framework Preset**: `Other` (or auto-detected)
   - **Root Directory**: `./`
5. Click **"Deploy"**.

---

## 4. Verifying the Deployment

Once deployed, visit your assigned Vercel URL (e.g., `https://travel-guard.vercel.app`):

1. **Frontend Landing Page**: `https://<your-app>.vercel.app`
2. **Dashboard & App**: Click **"Get Started"** — check that the header shows `API Online`!
3. **API Health Check**: `https://<your-app>.vercel.app/api/health`
4. **Dashboard Summary API**: `https://<your-app>.vercel.app/api/dashboard/summary`
5. **Group Members API**: `https://<your-app>.vercel.app/api/groups/grp-munnar-01/members`
6. **AI Assistant Endpoint**: Test `POST https://<your-app>.vercel.app/api/assistant/chat`
