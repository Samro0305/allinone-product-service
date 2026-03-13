const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./products.db", (err) => {
 if (err) {
  console.log(err.message);
 } else {
  console.log("Database connected");
 }
});

db.run(`
CREATE TABLE IF NOT EXISTS products(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 description TEXT,
 price REAL,
 sku TEXT,
 availability TEXT,
 image TEXT
)
`);

module.exports = db;