const pool = require('../db');

// Получить все товары
const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
  return result.rows;
};

// Получить товар по ID
const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
};

// Создать товар
const createProduct = async (product) => {
  const { name, description, price, categorySlug, image } = product;
  const result = await pool.query(
    `INSERT INTO products (name, description, price, "categorySlug", image)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, price, categorySlug, image]
  );
  return result.rows[0];
};

// Обновить товар
const updateProduct = async (id, product) => {
  const { name, description, price, categorySlug, image } = product;
  const result = await pool.query(
    `UPDATE products 
     SET name = $1, description = $2, price = $3, "categorySlug" = $4, image = $5, "updatedAt" = CURRENT_TIMESTAMP
     WHERE id = $6 RETURNING *`,
    [name, description, price, categorySlug, image, id]
  );
  return result.rows[0];
};

// Удалить товар
const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};