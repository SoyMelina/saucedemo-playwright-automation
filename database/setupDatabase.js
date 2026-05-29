const Database = require('better-sqlite3');

const db = new Database('database/saucedemo.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL,
    result TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertUser = db.prepare(`
  INSERT INTO users (username, role, status)
  VALUES (?, ?, ?)
`);

insertUser.run('standard_user', 'customer', 'active');
insertUser.run('locked_out_user', 'customer', 'locked');

const insertResult = db.prepare(`
  INSERT INTO test_results (test_name, result)
  VALUES (?, ?)
`);

insertResult.run('Login válido', 'passed');
insertResult.run('Login usuario bloqueado', 'passed');

console.log('Base de datos creada correctamente');