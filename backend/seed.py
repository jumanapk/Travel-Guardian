import os
import sys
import datetime
from database.db import init_db, execute_write, query_one, get_connection
from auth import hash_password

def seed_database():
    """Seeds the database with Tour Guide Jumana and 4 demo tourists: Hisha, Rinsha, Sana, Dilrooba."""
    print("Initializing database schema...")
    init_db()
    conn = get_connection()
    
    # Check if already seeded
    existing_guide = query_one("SELECT * FROM users WHERE email = ?", ("jumana@travelguard.demo",))
    if existing_guide:
        print("Database already contains demo data. Resetting demo records cleanly...")
        with conn:
            conn.execute("DELETE FROM audit_events;")
            conn.execute("DELETE FROM notifications;")
            conn.execute("DELETE FROM reunion_events;")
            conn.execute("DELETE FROM alerts;")
            conn.execute("DELETE FROM tourist_locations;")
            conn.execute("DELETE FROM group_members;")
            conn.execute("DELETE FROM groups;")
            conn.execute("DELETE FROM users;")

    print("Seeding users...")
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    users = [
        ("usr-guide-01", "Jumana", "jumana@travelguard.demo", hash_password("Password123!"), "guide", "+91 98471 23456"),
        ("usr-tourist-01", "Hisha", "hisha@travelguard.demo", hash_password("Tourist123!"), "tourist", "+91 94462 11001"),
        ("usr-tourist-02", "Rinsha", "rinsha@travelguard.demo", hash_password("Tourist123!"), "tourist", "+91 94462 11002"),
        ("usr-tourist-03", "Sana", "sana@travelguard.demo", hash_password("Tourist123!"), "tourist", "+91 94462 11003"),
        ("usr-tourist-04", "Dilrooba", "dilrooba@travelguard.demo", hash_password("Tourist123!"), "tourist", "+91 94462 11004"),
    ]
    
    with conn:
        for u in users:
            conn.execute("""
                INSERT INTO users (user_id, name, email, password_hash, role, phone, account_status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)
            """, (u[0], u[1], u[2], u[3], u[4], u[5], now, now))

    print("Seeding group...")
    group_id = "grp-munnar-01"
    group_name = "Munnar Tea Hills Expedition"
    guide_id = "usr-guide-01"
    meeting_pt = "Mattupetty Dam Pavilion"
    meeting_lat = 10.1082
    meeting_lng = 77.1245
    
    with conn:
        conn.execute("""
            INSERT INTO groups (group_id, group_name, guide_id, meeting_point_name, meeting_point_lat, meeting_point_lng, group_status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?)
        """, (group_id, group_name, guide_id, meeting_pt, meeting_lat, meeting_lng, now, now))

    print("Seeding group memberships...")
    memberships = [
        ("mem-01", group_id, "usr-tourist-01", "separated", "pending"),       # Hisha
        ("mem-02", group_id, "usr-tourist-02", "with_group", "not_applicable"),# Rinsha
        ("mem-03", group_id, "usr-tourist-03", "with_group", "not_applicable"),# Sana
        ("mem-04", group_id, "usr-tourist-04", "separated", "pending"),       # Dilrooba
    ]
    
    with conn:
        for m in memberships:
            conn.execute("""
                INSERT INTO group_members (membership_id, group_id, tourist_id, membership_status, reunion_status, joined_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (m[0], m[1], m[2], m[3], m[4], now, now))

    print("Seeding demo tourist locations (marked source='demo')...")
    locations = [
        # Hisha: separated near Eravikulam
        ("loc-01", "usr-tourist-01", group_id, 10.0889, 77.0595, 12.5, 42, "demo"),
        # Rinsha: near meeting point
        ("loc-02", "usr-tourist-02", group_id, 10.1075, 77.1240, 5.0, 88, "demo"),
        # Sana: near meeting point
        ("loc-03", "usr-tourist-03", group_id, 10.1080, 77.1250, 4.2, 91, "demo"),
        # Dilrooba: separated near Pothamedu
        ("loc-04", "usr-tourist-04", group_id, 10.0750, 77.0600, 18.0, 15, "demo"),
    ]
    
    with conn:
        for loc in locations:
            conn.execute("""
                INSERT INTO tourist_locations (location_id, tourist_id, group_id, latitude, longitude, accuracy, battery_pct, source, recorded_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (loc[0], loc[1], loc[2], loc[3], loc[4], loc[5], loc[6], loc[7], now))

    print("Seeding alerts...")
    alerts = [
        ("alt-sos-001", group_id, "usr-tourist-01", "sos_emergency", "Lost/Separated", "critical",
         "Separated from trekking group near Eravikulam Tea Trail. Footpath unclear due to dense mist.", "active", "usr-guide-01", None, now, now, None),
        ("alt-gen-002", group_id, "usr-tourist-04", "separated_tourist", "Safety Threat", "high",
         "Low battery warning (15%). Last confirmed position near Pothamedu Viewpoint.", "investigating", "usr-guide-01", None, now, now, None),
    ]
    
    with conn:
        for a in alerts:
            conn.execute("""
                INSERT INTO alerts (alert_id, group_id, tourist_id, alert_type, category, priority, description, status, created_by, resolved_by, created_at, updated_at, resolved_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, a)

    print("Seeding reunion events...")
    with conn:
        conn.execute("""
            INSERT INTO reunion_events (reunion_event_id, group_id, tourist_id, meeting_point_name, status, created_by, created_at, completed_at)
            VALUES (?, ?, ?, ?, 'in_progress', ?, ?, NULL)
        """, ("reu-001", group_id, "usr-tourist-01", meeting_pt, "usr-guide-01", now))

    print("Seeding notifications...")
    notifications = [
        ("notif-01", "usr-guide-01", "alt-sos-001", "sos_alert", "SOS Alert: Hisha reported separated near Eravikulam Tea Trail.", 0, now),
        ("notif-02", "usr-guide-01", "alt-gen-002", "info", "Battery Warning: Dilrooba's device is at 15%.", 0, now),
        ("notif-03", "usr-tourist-01", None, "reunion_update", "Reunion Mode active: Head towards Mattupetty Dam Pavilion.", 0, now),
    ]
    
    with conn:
        for n in notifications:
            conn.execute("""
                INSERT INTO notifications (notification_id, recipient_user_id, related_alert_id, notification_type, message, read_status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, n)

    print("Seeding audit events...")
    with conn:
        conn.execute("""
            INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, ("aud-01", "usr-guide-01", "GROUP_INITIALIZED", '{"group_id": "grp-munnar-01", "name": "Munnar Tea Hills Expedition"}', now))
        conn.execute("""
            INSERT INTO audit_events (audit_id, user_id, action, details, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, ("aud-02", "usr-guide-01", "SOS_CREATED", '{"alert_id": "alt-sos-001", "tourist": "Hisha", "priority": "critical"}', now))

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
