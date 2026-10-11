import sqlite3
import os
import threading

DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DB_DIR, "travelguard.db")
SCHEMA_PATH = os.path.join(DB_DIR, "schema.sql")

_local = threading.local()

def get_connection():
    """Returns a thread-local SQLite connection with row_factory and foreign keys enabled."""
    if not hasattr(_local, "connection") or _local.connection is None:
        conn = sqlite3.connect(DB_PATH, timeout=30.0, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON;")
        conn.execute("PRAGMA journal_mode = WAL;")
        _local.connection = conn
    return _local.connection

def init_db():
    """Initializes the database schema if tables do not exist."""
    conn = get_connection()
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    with conn:
        conn.executescript(schema_sql)
    return True

def query_all(sql, params=()):
    """Executes a query and returns a list of dictionaries."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, params)
    rows = cursor.fetchall()
    return [dict(row) for row in rows]

def query_one(sql, params=()):
    """Executes a query and returns a single dictionary, or None."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, params)
    row = cursor.fetchone()
    return dict(row) if row else None

def execute_write(sql, params=()):
    """Executes an INSERT, UPDATE, or DELETE query and commits."""
    conn = get_connection()
    with conn:
        cursor = conn.cursor()
        cursor.execute(sql, params)
        return cursor.lastrowid, cursor.rowcount

def execute_script(sql_script):
    """Executes a multi-statement SQL script inside a transaction."""
    conn = get_connection()
    with conn:
        conn.executescript(sql_script)
