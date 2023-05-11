import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_users_table(conn):
    try:
        c = conn.cursor()
        c.execute(
            '''CREATE TABLE IF NOT EXISTS users (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   name TEXT NOT NULL,
                   email TEXT UNIQUE NOT NULL,
                   form_data TEXT
               );'''
        )
    except Error as e:
        print(e)

def add_user(conn, user):
    sql = '''INSERT INTO users(name, email, form_data) VALUES (?, ?, ?)'''
    cur = conn.cursor()
    cur.execute(sql, user)
    conn.commit()
    return cur.lastrowid

def add_form_data(conn, userEmail, formData):
    sql = '''UPDATE users SET form_data=? WHERE email=?'''
    cur = conn.cursor()
    cur.execute(sql, (formData, userEmail))
    conn.commit()