const sqlite3 = require("sqlite3").verbose();

// Connect to your database file
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  console.log("✅ Users table created successfully!");
});

db.close();
