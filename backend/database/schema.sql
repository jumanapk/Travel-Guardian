-- Travel Guard Relational Database Schema (SQLite / PostgreSQL compatible)
-- Enforces foreign keys, timestamps, indexes, and constraints

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('guide', 'tourist', 'admin')),
    phone TEXT,
    account_status TEXT NOT NULL DEFAULT 'active' CHECK(account_status IN ('active', 'suspended', 'inactive')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS groups (
    group_id TEXT PRIMARY KEY,
    group_name TEXT NOT NULL,
    guide_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    meeting_point_name TEXT NOT NULL DEFAULT 'Mattupetty Dam Pavilion',
    meeting_point_lat REAL NOT NULL DEFAULT 10.1082,
    meeting_point_lng REAL NOT NULL DEFAULT 77.1245,
    group_status TEXT NOT NULL DEFAULT 'active' CHECK(group_status IN ('active', 'completed', 'paused')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS group_members (
    membership_id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    tourist_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    membership_status TEXT NOT NULL DEFAULT 'with_group' CHECK(membership_status IN ('with_group', 'separated', 'location_unavailable', 'offline')),
    reunion_status TEXT NOT NULL DEFAULT 'not_applicable' CHECK(reunion_status IN ('pending', 'in_progress', 'reunited', 'not_applicable')),
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, tourist_id)
);

CREATE TABLE IF NOT EXISTS tourist_locations (
    location_id TEXT PRIMARY KEY,
    tourist_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    group_id TEXT REFERENCES groups(group_id) ON DELETE SET NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    accuracy REAL,
    battery_pct INTEGER,
    source TEXT NOT NULL DEFAULT 'demo' CHECK(source IN ('demo', 'gps')),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alerts (
    alert_id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    tourist_id TEXT REFERENCES users(user_id) ON DELETE SET NULL,
    alert_type TEXT NOT NULL CHECK(alert_type IN ('sos_emergency', 'separated_tourist', 'location_unavailable', 'reunion_update', 'general_safety')),
    category TEXT NOT NULL DEFAULT 'Medical',
    priority TEXT NOT NULL CHECK(priority IN ('critical', 'high', 'medium', 'low')),
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'investigating', 'resolved', 'closed')),
    created_by TEXT NOT NULL REFERENCES users(user_id),
    resolved_by TEXT REFERENCES users(user_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME
);

CREATE TABLE IF NOT EXISTS reunion_events (
    reunion_event_id TEXT PRIMARY KEY,
    group_id TEXT NOT NULL REFERENCES groups(group_id) ON DELETE CASCADE,
    tourist_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    meeting_point_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK(status IN ('in_progress', 'completed', 'cancelled')),
    created_by TEXT NOT NULL REFERENCES users(user_id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id TEXT PRIMARY KEY,
    recipient_user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    related_alert_id TEXT REFERENCES alerts(alert_id) ON DELETE SET NULL,
    notification_type TEXT NOT NULL,
    message TEXT NOT NULL,
    read_status INTEGER NOT NULL DEFAULT 0 CHECK(read_status IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_events (
    audit_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details TEXT, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high performance querying
CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_tourist ON group_members(tourist_id);
CREATE INDEX IF NOT EXISTS idx_locations_tourist ON tourist_locations(tourist_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_group ON alerts(group_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_user_id, read_status);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_events(created_at DESC);
