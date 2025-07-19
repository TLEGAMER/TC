import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./fitness.db');

db.run(`CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  type TEXT,
  duration INTEGER,
  date TEXT
)`);

export default db;
