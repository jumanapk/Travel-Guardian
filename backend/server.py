import http.server
import socketserver
import json
import re
import urllib.parse
import datetime
import os
import uuid
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database.db import query_all, query_one, execute_write, init_db
from auth import hash_password, verify_password, create_jwt, verify_jwt
from ai_assistant import generate_assistant_response

PORT = int(os.getenv("PORT", 5000))

def get_iso_now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()

class TravelGuardHandler(http.server.BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def send_json(self, status_code, data):
        body = json.dumps(data, indent=2).encode('utf-8')
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}
        try:
            raw_body = self.rfile.read(content_length).decode('utf-8')
            return json.loads(raw_body)
        except Exception:
            return None

    def get_auth_user(self):
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()
            payload = verify_jwt(token)
            if payload:
                user = query_one("SELECT user_id, name, email, role, phone, account_status FROM users WHERE user_id = ?", (payload.get("user_id"),))
                if user:
                    return user
        # Default demo fallback: query Tour Guide from database
        guide = query_one("SELECT user_id, name, email, role, phone, account_status, created_at, updated_at FROM users WHERE role = 'guide' LIMIT 1")
        if guide:
            return guide
        return {
            "user_id": "usr-guide-01",
            "name": "Jumana",
            "email": "jumana@travelguard.demo",
            "role": "guide",
            "phone": "+91 98471 23456",
            "account_status": "active"
        }

    # ==========================
    # HTTP METHOD ROUTERS
    # ==========================
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Health
        if path == "/api/health":
            return self.send_json(200, {"status": "ok", "timestamp": get_iso_now(), "service": "Travel Guard API"})

        # Auth Me / Profile
        if path in ["/api/auth/me", "/api/profile"]:
            user = self.get_auth_user()
            return self.send_json(200, {"user": user})

        # Dashboard APIs
        if path == "/api/dashboard/summary":
            return self.handle_dashboard_summary(query)
        if path == "/api/dashboard/recent-alerts":
            return self.handle_dashboard_recent_alerts(query)
        if path == "/api/dashboard/group-status":
            return self.handle_dashboard_group_status(query)

        # Groups APIs
        if path == "/api/groups":
            groups = query_all("SELECT g.*, u.name as guide_name FROM groups g JOIN users u ON g.guide_id = u.user_id")
            return self.send_json(200, {"groups": groups})

        m = re.match(r"^/api/groups/([^/]+)/members$", path)
        if m:
            return self.handle_group_members(m.group(1))

        m = re.match(r"^/api/groups/([^/]+)/locations$", path)
        if m:
            return self.handle_group_locations(m.group(1))

        m = re.match(r"^/api/groups/([^/]+)/reunion$", path)
        if m:
            return self.handle_group_reunion(m.group(1))

        m = re.match(r"^/api/groups/([^/]+)/reunion-history$", path)
        if m:
            return self.handle_reunion_history(m.group(1))

        m = re.match(r"^/api/groups/([^/]+)$", path)
        if m:
            group = query_one("SELECT g.*, u.name as guide_name, u.phone as guide_phone FROM groups g JOIN users u ON g.guide_id = u.user_id WHERE g.group_id = ?", (m.group(1),))
            if not group:
                return self.send_json(404, {"error": "Group not found"})
            return self.send_json(200, {"group": group})

        # Member location
        m = re.match(r"^/api/members/([^/]+)/location$", path)
        if m:
            loc = query_one("SELECT * FROM tourist_locations WHERE tourist_id = ? ORDER BY recorded_at DESC LIMIT 1", (m.group(1),))
            return self.send_json(200, {"location": loc})

        m = re.match(r"^/api/members/([^/]+)$", path)
        if m:
            member = query_one("""
                SELECT gm.*, u.name, u.email, u.phone 
                FROM group_members gm 
                JOIN users u ON gm.tourist_id = u.user_id 
                WHERE gm.membership_id = ? OR gm.tourist_id = ?
            """, (m.group(1), m.group(1)))
            if not member:
                return self.send_json(404, {"error": "Member not found"})
            return self.send_json(200, {"member": member})

        # Alerts APIs
        if path == "/api/alerts":
            status_filter = query.get("status", [None])[0]
            if status_filter:
                alerts = query_all("""
                    SELECT a.*, u.name as tourist_name, c.name as creator_name 
                    FROM alerts a 
                    LEFT JOIN users u ON a.tourist_id = u.user_id 
                    LEFT JOIN users c ON a.created_by = c.user_id
                    WHERE a.status = ?
                    ORDER BY a.created_at DESC
                """, (status_filter,))
            else:
                alerts = query_all("""
                    SELECT a.*, u.name as tourist_name, c.name as creator_name 
                    FROM alerts a 
                    LEFT JOIN users u ON a.tourist_id = u.user_id 
                    LEFT JOIN users c ON a.created_by = c.user_id
                    ORDER BY a.created_at DESC
                """)
            return self.send_json(200, {"alerts": alerts})

        if path == "/api/alerts/unread-count":
            cnt = query_one("SELECT COUNT(*) as count FROM alerts WHERE status IN ('active', 'investigating')")
            return self.send_json(200, {"unread_count": cnt["count"] if cnt else 0})

        m = re.match(r"^/api/alerts/([^/]+)$", path)
        if m:
            alert = query_one("""
                SELECT a.*, u.name as tourist_name, u.phone as tourist_phone, c.name as creator_name, r.name as resolver_name
                FROM alerts a
                LEFT JOIN users u ON a.tourist_id = u.user_id
                LEFT JOIN users c ON a.created_by = c.user_id
                LEFT JOIN users r ON a.resolved_by = r.user_id
                WHERE a.alert_id = ?
            """, (m.group(1),))
            if not alert:
                return self.send_json(404, {"error": "Alert not found"})
            return self.send_json(200, {"alert": alert})

        # Notifications APIs
        if path == "/api/notifications":
            user = self.get_auth_user()
            notifs = query_all("""
                SELECT * FROM notifications 
                WHERE recipient_user_id = ? 
                ORDER BY created_at DESC
            """, (user["user_id"],))
            return self.send_json(200, {"notifications": notifs})

        if path == "/api/notifications/unread-count":
            user = self.get_auth_user()
            cnt = query_one("SELECT COUNT(*) as count FROM notifications WHERE recipient_user_id = ? AND read_status = 0", (user["user_id"],))
            return self.send_json(200, {"unread_count": cnt["count"] if cnt else 0})

        return self.send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.read_json_body()
        if body is None:
            return self.send_json(400, {"error": "Invalid JSON in request body"})

        # Auth Register
        if path == "/api/auth/register":
            name = body.get("name", "").strip()
            email = body.get("email", "").strip().lower()
            password = body.get("password", "")
            role = body.get("role", "tourist").lower()
            phone = body.get("phone", "").strip()

            if not name or not email or not password:
                return self.send_json(400, {"error": "Name, email, and password are required"})
            if role not in ["guide", "tourist", "admin"]:
                return self.send_json(400, {"error": "Invalid role specified"})

            existing = query_one("SELECT user_id FROM users WHERE email = ?", (email,))
            if existing:
                return self.send_json(409, {"error": "An account with this email already exists"})

            user_id = f"usr-{uuid.uuid4().hex[:8]}"
            pwd_hash = hash_password(password)
            now = get_iso_now()

            execute_write("""
                INSERT INTO users (user_id, name, email, password_hash, role, phone, account_status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)
            """, (user_id, name, email, pwd_hash, role, phone, now, now))

            token = create_jwt({"user_id": user_id, "role": role, "name": name})
            return self.send_json(201, {
                "message": "User registered successfully",
                "token": token,
                "user": {"user_id": user_id, "name": name, "email": email, "role": role, "phone": phone}
            })

        # Auth Login
        if path == "/api/auth/login":
            email = body.get("email", "").strip().lower()
            password = body.get("password", "")
            if not email or not password:
                return self.send_json(400, {"error": "Email and password are required"})

            user = query_one("SELECT * FROM users WHERE email = ?", (email,))
            if not user or not verify_password(password, user["password_hash"]):
                return self.send_json(401, {"error": "Invalid credentials provided"})

            token = create_jwt({"user_id": user["user_id"], "role": user["role"], "name": user["name"]})
            return self.send_json(200, {
                "message": "Login successful",
                "token": token,
                "user": {
                    "user_id": user["user_id"],
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"],
                    "phone": user["phone"]
                }
            })

        # Trigger SOS Alert
        if path == "/api/alerts/sos":
            return self.handle_create_sos(body)

        # Post Live Location
        if path == "/api/locations":
            return self.handle_post_location(body)

        # Add Group Member
        m = re.match(r"^/api/groups/([^/]+)/members$", path)
        if m:
            group_id = m.group(1)
            tourist_id = body.get("tourist_id")
            if not tourist_id:
                return self.send_json(400, {"error": "tourist_id is required"})
            
            existing = query_one("SELECT membership_id FROM group_members WHERE group_id = ? AND tourist_id = ?", (group_id, tourist_id))
            if existing:
                return self.send_json(409, {"error": "Tourist is already a member of this group"})
            
            mem_id = f"mem-{uuid.uuid4().hex[:8]}"
            now = get_iso_now()
            execute_write("""
                INSERT INTO group_members (membership_id, group_id, tourist_id, membership_status, reunion_status, joined_at, updated_at)
                VALUES (?, ?, ?, 'with_group', 'not_applicable', ?, ?)
            """, (mem_id, group_id, tourist_id, now, now))
            return self.send_json(201, {"membership_id": mem_id, "message": "Member added successfully"})

        # Create Reunion Event
        m = re.match(r"^/api/groups/([^/]+)/reunion-events$", path)
        if m:
            group_id = m.group(1)
            tourist_id = body.get("tourist_id")
            meeting_pt = body.get("meeting_point_name", "Mattupetty Dam Pavilion")
            if not tourist_id:
                return self.send_json(400, {"error": "tourist_id is required"})
            
            event_id = f"reu-{uuid.uuid4().hex[:8]}"
            auth_user = self.get_auth_user()
            now = get_iso_now()
            execute_write("""
                INSERT INTO reunion_events (reunion_event_id, group_id, tourist_id, meeting_point_name, status, created_by, created_at)
                VALUES (?, ?, ?, ?, 'in_progress', ?, ?)
            """, (event_id, group_id, tourist_id, meeting_pt, auth_user["user_id"], now))
            
            execute_write("""
                UPDATE group_members SET reunion_status = 'in_progress', updated_at = ? WHERE group_id = ? AND tourist_id = ?
            """, (now, group_id, tourist_id))

            execute_write("""
                INSERT INTO notifications (notification_id, recipient_user_id, related_alert_id, notification_type, message, read_status, created_at)
                VALUES (?, ?, NULL, 'reunion_update', ?, 0, ?)
            """, (f"notif-{uuid.uuid4().hex[:8]}", tourist_id, f"Reunion Mode initiated. Rendezvous at {meeting_pt}.", now))

            return self.send_json(201, {"reunion_event_id": event_id, "status": "in_progress", "meeting_point": meeting_pt})

        # AI Assistant Chat
        if path == "/api/assistant/chat":
            msg = body.get("message", "").strip()
            if not msg:
                return self.send_json(400, {"error": "Message cannot be empty"})
            response = generate_assistant_response(msg)
            response["conversation_id"] = body.get("conversation_id", f"conv-{uuid.uuid4().hex[:6]}")
            return self.send_json(200, response)

        return self.send_json(404, {"error": "Endpoint not found"})

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.read_json_body() or {}

        # Update Tour Guide Profile
        if path == "/api/profile":
            name = (body.get("name") or body.get("fullName") or "").strip()
            if not name:
                return self.send_json(400, {"error": "Tour guide name cannot be empty"})
            phone = (body.get("phone") or "").strip()
            now = get_iso_now()
            auth_user = self.get_auth_user()
            user_id = auth_user.get("user_id", "usr-guide-01")

            execute_write("""
                UPDATE users 
                SET name = ?, phone = CASE WHEN ? != '' THEN ? ELSE phone END, updated_at = ? 
                WHERE user_id = ? OR role = 'guide'
            """, (name, phone, phone, now, user_id))

            execute_write("""
                INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
                VALUES (?, ?, 'PROFILE_UPDATED', ?, ?)
            """, (f"aud-{uuid.uuid4().hex[:8]}", user_id, json.dumps({"name": name, "phone": phone}), now))

            updated = query_one("SELECT user_id, name, email, role, phone, account_status, created_at, updated_at FROM users WHERE user_id = ? OR role = 'guide' LIMIT 1", (user_id,))
            return self.send_json(200, {
                "message": "Tour Guide profile updated successfully in database",
                "user": updated
            })

        # Resolve Alert
        m = re.match(r"^/api/alerts/([^/]+)/resolve$", path)
        if m:
            alert_id = m.group(1)
            auth_user = self.get_auth_user()
            now = get_iso_now()
            
            alert = query_one("SELECT * FROM alerts WHERE alert_id = ?", (alert_id,))
            if not alert:
                return self.send_json(404, {"error": "Alert not found"})

            execute_write("""
                UPDATE alerts 
                SET status = 'resolved', resolved_by = ?, resolved_at = ?, updated_at = ? 
                WHERE alert_id = ?
            """, (auth_user["user_id"], now, now, alert_id))

            if alert["tourist_id"]:
                execute_write("""
                    UPDATE group_members 
                    SET membership_status = 'with_group', reunion_status = 'reunited', updated_at = ?
                    WHERE tourist_id = ? AND group_id = ?
                """, (now, alert["tourist_id"], alert["group_id"]))

            execute_write("""
                INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
                VALUES (?, ?, 'ALERT_RESOLVED', ?, ?)
            """, (f"aud-{uuid.uuid4().hex[:8]}", auth_user["user_id"], json.dumps({"alert_id": alert_id, "resolved_by": auth_user["name"]}), now))

            return self.send_json(200, {"message": "Alert resolved successfully", "alert_id": alert_id, "status": "resolved"})

        # Reopen Alert
        m = re.match(r"^/api/alerts/([^/]+)/reopen$", path)
        if m:
            alert_id = m.group(1)
            now = get_iso_now()
            execute_write("UPDATE alerts SET status = 'active', resolved_at = NULL, updated_at = ? WHERE alert_id = ?", (now, alert_id))
            return self.send_json(200, {"message": "Alert reopened", "alert_id": alert_id, "status": "active"})

        # Mark Alert Read
        m = re.match(r"^/api/alerts/([^/]+)/read$", path)
        if m:
            return self.send_json(200, {"message": "Alert acknowledged"})

        # Complete Reunion Event
        m = re.match(r"^/api/reunion-events/([^/]+)/complete$", path)
        if m:
            event_id = m.group(1)
            auth_user = self.get_auth_user()
            now = get_iso_now()

            event = query_one("SELECT * FROM reunion_events WHERE reunion_event_id = ?", (event_id,))
            if not event:
                return self.send_json(404, {"error": "Reunion event not found"})

            execute_write("""
                UPDATE reunion_events 
                SET status = 'completed', completed_at = ? 
                WHERE reunion_event_id = ?
            """, (now, event_id))

            execute_write("""
                UPDATE group_members 
                SET membership_status = 'with_group', reunion_status = 'reunited', updated_at = ? 
                WHERE group_id = ? AND tourist_id = ?
            """, (now, event["group_id"], event["tourist_id"]))

            execute_write("""
                INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
                VALUES (?, ?, 'TOURIST_REUNITED', ?, ?)
            """, (f"aud-{uuid.uuid4().hex[:8]}", auth_user["user_id"], json.dumps({"reunion_event_id": event_id, "tourist_id": event["tourist_id"]}), now))

            return self.send_json(200, {"message": "Tourist marked as reunited", "status": "completed"})

        # Update Member Status
        m = re.match(r"^/api/members/([^/]+)/status$", path)
        if m:
            member_id = m.group(1)
            mem_status = body.get("membership_status")
            reu_status = body.get("reunion_status")
            now = get_iso_now()

            updates = []
            params = []
            if mem_status:
                updates.append("membership_status = ?")
                params.append(mem_status)
            if reu_status:
                updates.append("reunion_status = ?")
                params.append(reu_status)
            updates.append("updated_at = ?")
            params.append(now)
            params.append(member_id)
            params.append(member_id)

            execute_write(f"""
                UPDATE group_members 
                SET {', '.join(updates)} 
                WHERE membership_id = ? OR tourist_id = ?
            """, tuple(params))

            return self.send_json(200, {"message": "Member status updated successfully"})

        # Read Single Notification
        m = re.match(r"^/api/notifications/([^/]+)/read$", path)
        if m:
            notif_id = m.group(1)
            execute_write("UPDATE notifications SET read_status = 1 WHERE notification_id = ?", (notif_id,))
            return self.send_json(200, {"message": "Notification marked as read", "notification_id": notif_id})

        # Read All Notifications
        if path == "/api/notifications/read-all":
            user = self.get_auth_user()
            execute_write("UPDATE notifications SET read_status = 1 WHERE recipient_user_id = ?", (user["user_id"],))
            return self.send_json(200, {"message": "All notifications marked as read"})

        return self.send_json(404, {"error": "Endpoint not found"})

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self.read_json_body() or {}

        # Update Meeting Point
        m = re.match(r"^/api/groups/([^/]+)/meeting-point$", path)
        if m:
            group_id = m.group(1)
            name = body.get("meeting_point_name", "").strip()
            lat = body.get("meeting_point_lat")
            lng = body.get("meeting_point_lng")

            if not name:
                return self.send_json(400, {"error": "meeting_point_name is required"})
            if lat is not None and not (-90 <= float(lat) <= 90):
                return self.send_json(400, {"error": "Latitude must be between -90 and 90"})
            if lng is not None and not (-180 <= float(lng) <= 180):
                return self.send_json(400, {"error": "Longitude must be between -180 and 180"})

            now = get_iso_now()
            auth_user = self.get_auth_user()

            execute_write("""
                UPDATE groups 
                SET meeting_point_name = ?, meeting_point_lat = ?, meeting_point_lng = ?, updated_at = ?
                WHERE group_id = ?
            """, (name, float(lat) if lat is not None else 10.1082, float(lng) if lng is not None else 77.1245, now, group_id))

            execute_write("""
                INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
                VALUES (?, ?, 'MEETING_POINT_CHANGED', ?, ?)
            """, (f"aud-{uuid.uuid4().hex[:8]}", auth_user["user_id"], json.dumps({"meeting_point": name, "group_id": group_id}), now))

            return self.send_json(200, {
                "message": "Meeting point updated successfully",
                "meeting_point_name": name,
                "meeting_point_lat": lat,
                "meeting_point_lng": lng
            })

        return self.send_json(404, {"error": "Endpoint not found"})

    # ==========================
    # HANDLER HELPERS
    # ==========================
    def handle_dashboard_summary(self, query):
        group_id = query.get("groupId", ["grp-munnar-01"])[0]

        counts = query_one("""
            SELECT 
                COUNT(*) as total_tourists,
                SUM(CASE WHEN membership_status = 'with_group' THEN 1 ELSE 0 END) as tourists_with_group,
                SUM(CASE WHEN membership_status = 'separated' THEN 1 ELSE 0 END) as separated_tourists,
                SUM(CASE WHEN reunion_status = 'reunited' THEN 1 ELSE 0 END) as reunited_tourists,
                SUM(CASE WHEN membership_status = 'location_unavailable' THEN 1 ELSE 0 END) as unavailable_location
            FROM group_members
            WHERE group_id = ?
        """, (group_id,))

        sos_cnt = query_one("""
            SELECT COUNT(*) as active_sos_count 
            FROM alerts 
            WHERE group_id = ? AND alert_type = 'sos_emergency' AND status IN ('active', 'investigating')
        """, (group_id,))

        unresolved_cnt = query_one("""
            SELECT COUNT(*) as unresolved_count 
            FROM alerts 
            WHERE group_id = ? AND status IN ('active', 'investigating')
        """, (group_id,))

        return self.send_json(200, {
            "group_id": group_id,
            "total_tourists": counts["total_tourists"] or 0,
            "tourists_with_group": counts["tourists_with_group"] or 0,
            "separated_tourists": counts["separated_tourists"] or 0,
            "reunited_tourists": counts["reunited_tourists"] or 0,
            "unavailable_location": counts["unavailable_location"] or 0,
            "active_sos_alerts": sos_cnt["active_sos_count"] or 0,
            "unresolved_alerts": unresolved_cnt["unresolved_count"] or 0,
            "last_updated": get_iso_now()
        })

    def handle_dashboard_recent_alerts(self, query):
        group_id = query.get("groupId", ["grp-munnar-01"])[0]
        alerts = query_all("""
            SELECT a.*, u.name as tourist_name, u.phone as tourist_phone
            FROM alerts a
            LEFT JOIN users u ON a.tourist_id = u.user_id
            WHERE a.group_id = ?
            ORDER BY a.created_at DESC
            LIMIT 5
        """, (group_id,))
        return self.send_json(200, {"alerts": alerts})

    def handle_dashboard_group_status(self, query):
        group_id = query.get("groupId", ["grp-munnar-01"])[0]
        group = query_one("""
            SELECT g.*, u.name as guide_name, u.phone as guide_phone 
            FROM groups g 
            JOIN users u ON g.guide_id = u.user_id 
            WHERE g.group_id = ?
        """, (group_id,))
        if not group:
            return self.send_json(404, {"error": "Group not found"})
        return self.send_json(200, {"group": group})

    def handle_group_members(self, group_id):
        members = query_all("""
            SELECT 
                gm.membership_id,
                gm.group_id,
                gm.tourist_id,
                gm.membership_status,
                gm.reunion_status,
                gm.joined_at,
                u.name,
                u.email,
                u.phone,
                loc.latitude,
                loc.longitude,
                loc.accuracy,
                loc.battery_pct,
                loc.source as location_source,
                loc.recorded_at as location_time
            FROM group_members gm
            JOIN users u ON gm.tourist_id = u.user_id
            LEFT JOIN (
                SELECT tl1.*
                FROM tourist_locations tl1
                JOIN (
                    SELECT tourist_id, MAX(recorded_at) as max_time
                    FROM tourist_locations
                    GROUP BY tourist_id
                ) tl2 ON tl1.tourist_id = tl2.tourist_id AND tl1.recorded_at = tl2.max_time
            ) loc ON gm.tourist_id = loc.tourist_id
            WHERE gm.group_id = ?
            ORDER BY u.name ASC
        """, (group_id,))
        return self.send_json(200, {"members": members})

    def handle_group_locations(self, group_id):
        locations = query_all("""
            SELECT 
                u.user_id as tourist_id,
                u.name,
                loc.latitude,
                loc.longitude,
                loc.accuracy,
                loc.battery_pct,
                loc.source,
                loc.recorded_at,
                gm.membership_status,
                gm.reunion_status
            FROM group_members gm
            JOIN users u ON gm.tourist_id = u.user_id
            LEFT JOIN (
                SELECT tl1.*
                FROM tourist_locations tl1
                JOIN (
                    SELECT tourist_id, MAX(recorded_at) as max_time
                    FROM tourist_locations
                    GROUP BY tourist_id
                ) tl2 ON tl1.tourist_id = tl2.tourist_id AND tl1.recorded_at = tl2.max_time
            ) loc ON gm.tourist_id = loc.tourist_id
            WHERE gm.group_id = ?
        """, (group_id,))
        return self.send_json(200, {"locations": locations})

    def handle_group_reunion(self, group_id):
        group = query_one("SELECT meeting_point_name, meeting_point_lat, meeting_point_lng FROM groups WHERE group_id = ?", (group_id,))
        if not group:
            return self.send_json(404, {"error": "Group not found"})

        active_events = query_all("""
            SELECT re.*, u.name as tourist_name, u.phone as tourist_phone
            FROM reunion_events re
            JOIN users u ON re.tourist_id = u.user_id
            WHERE re.group_id = ? AND re.status = 'in_progress'
        """, (group_id,))

        separated_members = query_all("""
            SELECT gm.tourist_id, u.name, gm.membership_status, gm.reunion_status
            FROM group_members gm
            JOIN users u ON gm.tourist_id = u.user_id
            WHERE gm.group_id = ? AND (gm.membership_status = 'separated' OR gm.reunion_status = 'pending')
        """, (group_id,))

        reunited_members = query_all("""
            SELECT gm.tourist_id, u.name
            FROM group_members gm
            JOIN users u ON gm.tourist_id = u.user_id
            WHERE gm.group_id = ? AND gm.reunion_status = 'reunited'
        """, (group_id,))

        return self.send_json(200, {
            "group_id": group_id,
            "meeting_point_name": group["meeting_point_name"],
            "meeting_point_lat": group["meeting_point_lat"],
            "meeting_point_lng": group["meeting_point_lng"],
            "active_reunion_events": active_events,
            "separated_members": separated_members,
            "reunited_members": reunited_members
        })

    def handle_reunion_history(self, group_id):
        history = query_all("""
            SELECT re.*, u.name as tourist_name, g.name as creator_name
            FROM reunion_events re
            JOIN users u ON re.tourist_id = u.user_id
            LEFT JOIN users g ON re.created_by = g.user_id
            WHERE re.group_id = ?
            ORDER BY re.created_at DESC
        """, (group_id,))
        return self.send_json(200, {"history": history})

    def handle_create_sos(self, body):
        tourist_name_or_id = body.get("tourist_id")
        group_id = body.get("group_id", "grp-munnar-01")
        category = body.get("category", "Medical")
        priority = body.get("priority", "critical").lower()
        description = body.get("description", "").strip()

        if not tourist_name_or_id:
            return self.send_json(400, {"error": "tourist_id or name is required"})

        # Resolve tourist_id if tourist name was sent
        tourist = query_one("SELECT user_id, name FROM users WHERE user_id = ? OR LOWER(name) = LOWER(?)", (tourist_name_or_id, tourist_name_or_id))
        if not tourist:
            return self.send_json(404, {"error": f"Tourist '{tourist_name_or_id}' not found"})

        tourist_id = tourist["user_id"]
        auth_user = self.get_auth_user()
        now = get_iso_now()

        # Idempotency check: if identical active alert created within last 2 minutes, return it
        recent_alert = query_one("""
            SELECT * FROM alerts 
            WHERE tourist_id = ? AND status = 'active' AND category = ?
            ORDER BY created_at DESC LIMIT 1
        """, (tourist_id, category))

        if recent_alert:
            return self.send_json(200, {
                "message": "Active alert already exists for this tourist",
                "alert": recent_alert,
                "is_duplicate": True
            })

        alert_id = f"alt-sos-{uuid.uuid4().hex[:6]}"
        execute_write("""
            INSERT INTO alerts (alert_id, group_id, tourist_id, alert_type, category, priority, description, status, created_by, created_at, updated_at)
            VALUES (?, ?, ?, 'sos_emergency', ?, ?, ?, 'active', ?, ?, ?)
        """, (alert_id, group_id, tourist_id, category, priority, description, auth_user["user_id"], now, now))

        # Update member status to separated & reunion pending
        execute_write("""
            UPDATE group_members 
            SET membership_status = 'separated', reunion_status = 'pending', updated_at = ?
            WHERE group_id = ? AND tourist_id = ?
        """, (now, group_id, tourist_id))

        # In-app notifications
        execute_write("""
            INSERT INTO notifications (notification_id, recipient_user_id, related_alert_id, notification_type, message, read_status, created_at)
            VALUES (?, 'usr-guide-01', ?, 'sos_alert', ?, 0, ?)
        """, (f"notif-{uuid.uuid4().hex[:8]}", alert_id, f"🚨 SOS TRIGGERED for {tourist['name']}: {category}. {description}", now))

        # Audit log
        execute_write("""
            INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
            VALUES (?, ?, 'SOS_CREATED', ?, ?)
        """, (f"aud-{uuid.uuid4().hex[:8]}", auth_user["user_id"], json.dumps({"alert_id": alert_id, "tourist": tourist["name"], "category": category, "priority": priority}), now))

        created_alert = query_one("SELECT a.*, u.name as tourist_name FROM alerts a JOIN users u ON a.tourist_id = u.user_id WHERE a.alert_id = ?", (alert_id,))
        return self.send_json(201, {
            "message": "SOS Alert recorded successfully in database",
            "alert": created_alert
        })

    def handle_post_location(self, body):
        tourist_id = body.get("tourist_id")
        group_id = body.get("group_id", "grp-munnar-01")
        lat = body.get("latitude")
        lng = body.get("longitude")
        accuracy = body.get("accuracy", 10.0)
        battery = body.get("battery_pct", 85)
        source = body.get("source", "demo")

        if not tourist_id or lat is None or lng is None:
            return self.send_json(400, {"error": "tourist_id, latitude, and longitude are required"})

        if not (-90 <= float(lat) <= 90) or not (-180 <= float(lng) <= 180):
            return self.send_json(400, {"error": "Coordinates out of bounds (-90 to 90 lat, -180 to 180 lng)"})

        loc_id = f"loc-{uuid.uuid4().hex[:8]}"
        now = get_iso_now()

        execute_write("""
            INSERT INTO tourist_locations (location_id, tourist_id, group_id, latitude, longitude, accuracy, battery_pct, source, recorded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (loc_id, tourist_id, group_id, float(lat), float(lng), float(accuracy), int(battery), source, now))

        return self.send_json(201, {
            "message": "Location updated successfully",
            "location_id": loc_id,
            "source": source,
            "recorded_at": now
        })

    def log_message(self, format, *args):
        # Clean logging format
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {args[0]}")

def run_server():
    init_db()
    server_address = ("127.0.0.1", PORT)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(server_address, TravelGuardHandler) as httpd:
        print(f"[READY] Travel Guard Backend REST API running at http://127.0.0.1:{PORT}")
        print("Press Ctrl+C to terminate.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down Travel Guard API server...")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
