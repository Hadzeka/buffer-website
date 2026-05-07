const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password, isAdmin = false) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, "isAdmin") VALUES ($1, $2, $3, $4) RETURNING id, name, email, "isAdmin"',
    [name, email, hashedPassword, isAdmin]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const matchPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { createUser, findUserByEmail, matchPassword };