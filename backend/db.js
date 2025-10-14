// backend/db.js
const Database = require('better-sqlite3');

// Crée (ou ouvre) une base locale "data.db"
const db = new Database('data.db');

// Crée la table si elle n'existe pas déjà
db.prepare(`
  CREATE TABLE IF NOT EXISTS recharges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    kwh INTEGER,
    prix INTEGER
  )
`).run();

module.exports = db;
