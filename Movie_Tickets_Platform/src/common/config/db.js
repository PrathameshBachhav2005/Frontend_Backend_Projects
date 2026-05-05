import Database from 'better-sqlite3';
const db = new Database('database.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS seats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    isBooked INTEGER DEFAULT 0,
    bookedBy INTEGER
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    seatId INTEGER,
    movieId TEXT,
    UNIQUE(seatId, movieId)
  );
`);

const count = db.prepare("SELECT COUNT(*) as total FROM seats").get();

if (count.total === 0) {
  const insert = db.prepare("INSERT INTO seats (isBooked) VALUES (0)");
  
  for (let i = 0; i < 20; i++) {
    insert.run();
  }
}

export default db;