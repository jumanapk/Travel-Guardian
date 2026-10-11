import unittest
import urllib.request
import urllib.error
import json
import threading
import time
import socketserver
import os
import sys

# Ensure backend root is on sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from server import TravelGuardHandler
from seed import seed_database
from database.db import query_one, get_connection

TEST_PORT = 5002
BASE_URL = f"http://127.0.0.1:{TEST_PORT}/api"

server_thread = None
httpd_server = None

def start_test_server():
    global server_thread, httpd_server
    socketserver.TCPServer.allow_reuse_address = True
    httpd_server = socketserver.ThreadingTCPServer(("127.0.0.1", TEST_PORT), TravelGuardHandler)
    server_thread = threading.Thread(target=httpd_server.serve_forever, daemon=True)
    server_thread.start()
    time.sleep(0.5)

def stop_test_server():
    global httpd_server
    if httpd_server:
        httpd_server.shutdown()
        httpd_server.server_close()

def api_request(path, method="GET", data=None, headers=None):
    url = f"{BASE_URL}{path}"
    req_headers = {"Content-Type": "application/json"}
    if headers:
        req_headers.update(headers)
    
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, headers=req_headers, method=method)
    
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            res_body = response.read().decode("utf-8")
            return response.status, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        res_body = e.read().decode("utf-8")
        return e.code, json.loads(res_body) if res_body else {}

class TravelGuardBackendTestSuite(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        print("\n--- Seeding Fresh Database for Integration Testing ---")
        seed_database()
        print(f"--- Starting Test Server on Port {TEST_PORT} ---")
        start_test_server()

    @classmethod
    def tearDownClass(cls):
        print("\n--- Stopping Test Server ---")
        stop_test_server()

    def test_01_health_and_database_connection(self):
        """Verifies server health and database connectivity."""
        status, data = api_request("/health")
        self.assertEqual(status, 200)
        self.assertEqual(data.get("status"), "ok")
        self.assertIn("timestamp", data)

    def test_02_auth_login_and_token(self):
        """Tests login for Jumana and token creation."""
        status, data = api_request("/auth/login", method="POST", data={
            "email": "jumana@travelguard.demo",
            "password": "Password123!"
        })
        self.assertEqual(status, 200)
        self.assertIn("token", data)
        self.assertEqual(data["user"]["name"], "Jumana")
        self.assertEqual(data["user"]["role"], "guide")

    def test_03_auth_invalid_credentials(self):
        """Tests that invalid login returns 401 Unauthorized."""
        status, data = api_request("/auth/login", method="POST", data={
            "email": "jumana@travelguard.demo",
            "password": "WrongPassword!"
        })
        self.assertEqual(status, 401)
        self.assertIn("error", data)

    def test_04_auth_register_and_profile(self):
        """Tests new tourist account registration."""
        reg_email = f"newuser_{int(time.time())}@travelguard.demo"
        status, data = api_request("/auth/register", method="POST", data={
            "name": "Arjun",
            "email": reg_email,
            "password": "SecurePassword123!",
            "role": "tourist",
            "phone": "+91 94470 99881"
        })
        self.assertEqual(status, 201)
        self.assertIn("token", data)
        self.assertEqual(data["user"]["name"], "Arjun")

    def test_05_group_members_retrieval(self):
        """Tests retrieval of demo tourists (Hisha, Rinsha, Sana, Dilrooba)."""
        status, data = api_request("/groups/grp-munnar-01/members")
        self.assertEqual(status, 200)
        members = data.get("members", [])
        self.assertEqual(len(members), 4)
        names = [m["name"] for m in members]
        self.assertIn("Hisha", names)
        self.assertIn("Rinsha", names)
        self.assertIn("Sana", names)
        self.assertIn("Dilrooba", names)

    def test_06_dashboard_summary_calculations(self):
        """Tests real dynamic dashboard calculation from DB records."""
        status, data = api_request("/dashboard/summary?groupId=grp-munnar-01")
        self.assertEqual(status, 200)
        self.assertEqual(data["total_tourists"], 4)
        self.assertEqual(data["tourists_with_group"], 2)  # Rinsha, Sana
        self.assertEqual(data["separated_tourists"], 2)    # Hisha, Dilrooba
        self.assertGreaterEqual(data["active_sos_alerts"], 1)

    def test_07_sos_alert_creation_and_idempotency(self):
        """Tests triggering SOS alert and handling duplicate submission."""
        # 1. Trigger SOS for Sana
        status, data = api_request("/alerts/sos", method="POST", data={
            "tourist_id": "usr-tourist-03", # Sana
            "group_id": "grp-munnar-01",
            "category": "Medical",
            "priority": "critical",
            "description": "Severe ankle sprain near Mattupetty viewpoint."
        })
        self.assertEqual(status, 201)
        self.assertIn("alert", data)
        alert_id = data["alert"]["alert_id"]
        self.assertEqual(data["alert"]["status"], "active")

        # 2. Duplicate submission test (idempotency check within cooldown)
        status2, data2 = api_request("/alerts/sos", method="POST", data={
            "tourist_id": "usr-tourist-03",
            "group_id": "grp-munnar-01",
            "category": "Medical",
            "priority": "critical",
            "description": "Severe ankle sprain near Mattupetty viewpoint."
        })
        self.assertEqual(status2, 200)
        self.assertTrue(data2.get("is_duplicate"))
        self.assertEqual(data2["alert"]["alert_id"], alert_id)

    def test_08_alert_retrieval_and_resolution(self):
        """Tests fetching alert details and resolving the alert."""
        # Retrieve alert
        status, data = api_request("/alerts/alt-sos-001")
        self.assertEqual(status, 200)
        self.assertEqual(data["alert"]["alert_id"], "alt-sos-001")
        self.assertEqual(data["alert"]["tourist_name"], "Hisha")

        # Resolve alert
        res_status, res_data = api_request("/alerts/alt-sos-001/resolve", method="PATCH")
        self.assertEqual(res_status, 200)
        self.assertEqual(res_data["status"], "resolved")

        # Verify in DB
        alert_in_db = query_one("SELECT status, resolved_at FROM alerts WHERE alert_id = ?", ("alt-sos-001",))
        self.assertEqual(alert_in_db["status"], "resolved")
        self.assertIsNotNone(alert_in_db["resolved_at"])

    def test_09_location_validation_and_update(self):
        """Tests location update, validation checks, and retrieval."""
        # Valid location
        status, data = api_request("/locations", method="POST", data={
            "tourist_id": "usr-tourist-02", # Rinsha
            "group_id": "grp-munnar-01",
            "latitude": 10.1085,
            "longitude": 77.1252,
            "accuracy": 3.5,
            "battery_pct": 95,
            "source": "gps"
        })
        self.assertEqual(status, 201)
        self.assertEqual(data["source"], "gps")

        # Out-of-bounds latitude (must fail)
        err_status, err_data = api_request("/locations", method="POST", data={
            "tourist_id": "usr-tourist-02",
            "latitude": 195.0, # invalid
            "longitude": 77.1252
        })
        self.assertEqual(err_status, 400)
        self.assertIn("error", err_data)

    def test_10_meeting_point_update_and_reunion(self):
        """Tests updating meeting point and completing reunion events."""
        # Update meeting point
        status, data = api_request("/groups/grp-munnar-01/meeting-point", method="PUT", data={
            "meeting_point_name": "Pothamedu Sunset Gazebo",
            "meeting_point_lat": 10.0760,
            "meeting_point_lng": 77.0620
        })
        self.assertEqual(status, 200)
        self.assertEqual(data["meeting_point_name"], "Pothamedu Sunset Gazebo")

        # Complete reunion for reu-001
        reu_status, reu_data = api_request("/reunion-events/reu-001/complete", method="PATCH")
        self.assertEqual(reu_status, 200)
        self.assertEqual(reu_data["status"], "completed")

    def test_11_notification_read_status(self):
        """Tests marking notifications as read."""
        status, data = api_request("/notifications")
        self.assertEqual(status, 200)
        self.assertGreaterEqual(len(data.get("notifications", [])), 1)

        first_id = data["notifications"][0]["notification_id"]
        read_status, read_data = api_request(f"/notifications/{first_id}/read", method="PATCH")
        self.assertEqual(read_status, 200)

    def test_12_ai_assistant_demo_response(self):
        """Tests AI Travel Assistant contextual response generation."""
        status, data = api_request("/assistant/chat", method="POST", data={
            "message": "What should I do if I am lost in the mist in Munnar?"
        })
        self.assertEqual(status, 200)
        self.assertIn("reply", data)
        self.assertEqual(data.get("source"), "travel_guard_safety_engine")
        self.assertIn("Separated Tourist Protocol", data["reply"])

    def test_13_missing_records_error_handling(self):
        """Tests 404 response when querying nonexistent records."""
        status, data = api_request("/alerts/alt-nonexistent-999")
        self.assertEqual(status, 404)
        self.assertIn("error", data)

    def test_14_profile_retrieval_and_update(self):
        """Tests retrieving and updating tour guide profile with validation and database persistence."""
        # 1. Retrieve current guide profile
        status, data = api_request("/profile")
        self.assertEqual(status, 200)
        self.assertIn("user", data)
        self.assertEqual(data["user"]["role"], "guide")

        # 2. Update guide name to 'Amina'
        status, update_data = api_request("/profile", method="PATCH", data={
            "name": "Amina",
            "phone": "+91 98471 99999"
        })
        self.assertEqual(status, 200)
        self.assertEqual(update_data["user"]["name"], "Amina")
        self.assertEqual(update_data["user"]["phone"], "+91 98471 99999")

        # 3. Direct database verification
        guide_in_db = query_one("SELECT name, phone FROM users WHERE role = 'guide'")
        self.assertEqual(guide_in_db["name"], "Amina")
        self.assertEqual(guide_in_db["phone"], "+91 98471 99999")

        # 4. Verify subsequent GET returns 'Amina'
        status_after, data_after = api_request("/profile")
        self.assertEqual(status_after, 200)
        self.assertEqual(data_after["user"]["name"], "Amina")

        # 5. Validation rejection on blank name
        err_status, err_data = api_request("/profile", method="PATCH", data={
            "name": "   "
        })
        self.assertEqual(err_status, 400)
        self.assertIn("error", err_data)

if __name__ == "__main__":
    unittest.main()
