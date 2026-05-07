const jwt = require('jsonwebtoken');
const pool = require('../db');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const result = await pool.query('SELECT id, name, email, "isAdmin" FROM users WHERE id = $1', [decoded.userId]);
      req.user = result.rows[0];
      if (!req.user) return res.status(401).json({ message: 'Не авторизован' });
      next();
    } catch (error) {
      res.status(401).json({ message: 'Неверный токен' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Нет токена' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Доступ запрещён. Требуются права администратора.' });
  }
};

module.exports = { protect, admin };