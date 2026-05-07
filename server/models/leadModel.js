const pool = require('../db');

const createLead = async (lead) => {
  const { name, phone, message } = lead;
  const result = await pool.query(
    `INSERT INTO leads (name, phone, message, status)
     VALUES ($1, $2, $3, 'new')
     RETURNING *`,
    [name, phone, message || null]
  );
  return result.rows[0];
};

const getAllLeads = async () => {
  const result = await pool.query('SELECT * FROM leads ORDER BY id DESC');
  return result.rows;
};

module.exports = { createLead, getAllLeads };