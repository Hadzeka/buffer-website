const pool = require('../db');
const bcrypt = require('bcryptjs');

const createAdmin = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, "createdAt"',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const findAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
  return result.rows[0];
};

const findAdminById = async (id) => {
  const result = await pool.query('SELECT id, name, email, "createdAt" FROM admins WHERE id = $1', [id]);
  return result.rows[0];
};

const matchPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { createAdmin, findAdminByEmail, findAdminById, matchPassword };