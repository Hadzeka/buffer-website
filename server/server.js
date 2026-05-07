const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pool = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статическая раздача папки uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Маршруты
app.get('/api', (req, res) => {
  res.json({ message: 'Сервер работает на PostgreSQL!' });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const leadRoutes = require('./routes/leadRoutes');
app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});