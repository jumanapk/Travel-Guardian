# Travel Guard — Backend Architecture & API Documentation

This directory contains the operational backend REST API server and relational database supporting all nine screens of the Travel Guard web application.

---

## 1. Quick Start

### Starting the Python REST API (Zero external dependencies)
The server runs on Python 3's built-in standard library (`sqlite3`, `http.server`, `hashlib`, `hmac`):

1. **Initialize and Seed Database**:
   ```bash
   cd backend
   python seed.py
   ```

2. **Start the API Server**:
   ```bash
   python server.py
   ```
   The API server listens on `http://127.0.0.1:5000/api`.

3. **Run Automated Test Suite**:
   ```bash
   cd backend/tests
   python test_api.py
   ```

---

## 2. API Endpoints Reference

### Health & Auth
* `GET /api/health` — Service health and timestamp.
* `POST /api/auth/register` — Register a tourist or guide account with PBKDF2 hash.
* `POST /api/auth/login` — Authenticate and receive a JWT token.
* `GET /api/auth/me` — Retrieve current authenticated profile.

### Dashboard
* `GET /api/dashboard/summary?groupId=grp-munnar-01` — Dynamic calculations for total tourists, with group, separated, reunited, unavailable, and active SOS counts.
* `GET /api/dashboard/recent-alerts?groupId=grp-munnar-01` — 5 most recent alerts.
* `GET /api/dashboard/group-status?groupId=grp-munnar-01` — Group expedition and tour guide profile.

### Group Management
* `GET /api/groups` — List all expedition groups.
* `GET /api/groups/:groupId` — Group details.
* `GET /api/groups/:groupId/members` — Members with live status, battery telemetry, and coordinates.
* `GET /api/members/:memberId` — Single tourist member details.
* `PATCH /api/members/:memberId/status` — Update membership status (`with_group`, `separated`) and reunion status.
* `POST /api/groups/:groupId/members` — Add a tourist to a group.

### SOS & Alert Management
* `POST /api/alerts/sos` — Idempotent SOS alert recording with server timestamp, member status update, in-app notification, and audit event.
* `GET /api/alerts` — List all alerts (optional `?status=active` filter).
* `GET /api/alerts/:alertId` — Detailed alert record with tourist phone, notes, and timeline.
* `PATCH /api/alerts/:alertId/resolve` — Mark alert resolved with timestamp and audit log.
* `PATCH /api/alerts/:alertId/reopen` — Reopen an alert.
* `GET /api/alerts/unread-count` — Count of unacknowledged alerts.

### Live Location
* `POST /api/locations` — Submit tourist location telemetry (validates coordinate ranges; stores `source='demo'` or `source='gps'`).
* `GET /api/groups/:groupId/locations` — Latest coordinates and battery telemetry for group members.
* `GET /api/members/:memberId/location` — Latest position for a specific tourist.

### Reunion Mode
* `GET /api/groups/:groupId/reunion` — Current rendezvous point, separated tourists, and active reunion events.
* `PUT /api/groups/:groupId/meeting-point` — Update meeting point name, latitude, and longitude.
* `POST /api/groups/:groupId/reunion-events` — Initiate a reunion event for a separated tourist.
* `PATCH /api/reunion-events/:eventId/complete` — Mark tourist physically reunited and record audit log.
* `GET /api/groups/:groupId/reunion-history` — History of completed reunions.

### Notifications
* `GET /api/notifications` — In-app notifications for authenticated user.
* `GET /api/notifications/unread-count` — Unread notification count.
* `PATCH /api/notifications/:notificationId/read` — Mark notification read.
* `PATCH /api/notifications/read-all` — Mark all notifications read.

### AI Travel Assistant
* `POST /api/assistant/chat` — Safe context-aware safety guidance based on the Munnar safety knowledge engine.

---

## 3. Database Schema Overview
* `users` — Guide Jumana and tourists with password hashes, roles, and timestamps.
* `groups` — Expedition group with assigned guide and meeting point coordinates.
* `group_members` — Tourist memberships, group connection statuses, and reunion statuses.
* `tourist_locations` — Coordinates, accuracy, battery levels, timestamps, and data source tags.
* `alerts` — SOS and safety alerts with category, priority, status, and resolution audit.
* `reunion_events` — Rendezvous events linked to meeting points and tourist IDs.
* `notifications` — In-app notification records for urgent alerts and updates.
* `audit_events` — Security and operations audit trail for critical state changes.
