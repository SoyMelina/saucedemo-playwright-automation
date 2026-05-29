const { test, expect } = require('@playwright/test');
const Database = require('better-sqlite3');

test('@database Test DB 1: Validar usuario activo', async () => {
  const db = new Database('database/saucedemo.db');

  const user = db
    .prepare(
      `
      SELECT *
      FROM users
      WHERE username = ?
    `
    )
    .get('standard_user');

  expect(user).toBeDefined();
  expect(user.status).toBe('active');

  db.close();
});

test('@database Test DB 2: Validar usuario bloqueado', async () => {
  const db = new Database('database/saucedemo.db');

  const user = db
    .prepare(
      `
      SELECT *
      FROM users
      WHERE username = ?
    `
    )
    .get('locked_out_user');

  expect(user).toBeDefined();
  expect(user.status).toBe('locked');

  db.close();
});

test('@database Test DB 3: Actualizar estado de usuario', async () => {
  const db = new Database('database/saucedemo.db');

  db.prepare(`
    UPDATE users
    SET status = ?
    WHERE username = ?
  `).run('inactive', 'standard_user');

  const user = db.prepare(`
    SELECT *
    FROM users
    WHERE username = ?
  `).get('standard_user');

  expect(user.status).toBe('inactive');

  db.prepare(`
    UPDATE users
    SET status = ?
    WHERE username = ?
  `).run('active', 'standard_user');

  db.close();
});

test('@database Test DB 4: Crear y eliminar usuario temporal', async () => {
  const db = new Database('database/saucedemo.db');

  db.prepare(`
    INSERT INTO users (username, role, status)
    VALUES (?, ?, ?)
  `).run('temporary_user', 'customer', 'active');

  const createdUser = db.prepare(`
    SELECT *
    FROM users
    WHERE username = ?
  `).get('temporary_user');

  expect(createdUser).toBeDefined();

  db.prepare(`
    DELETE FROM users
    WHERE username = ?
  `).run('temporary_user');

  const deletedUser = db.prepare(`
    SELECT *
    FROM users
    WHERE username = ?
  `).get('temporary_user');

  expect(deletedUser).toBeUndefined();

  db.close();
});