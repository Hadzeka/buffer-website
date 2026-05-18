const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Ищем админа по id из токена (ключ adminId, а не userId)
      const admin = await adminModel.findAdminById(decoded.adminId);
      if (!admin) {
        return res.status(401).json({ message: 'Не авторизован' });
      }
      // Добавляем isAdmin для совместимости со старой проверкой
      req.user = { ...admin, isAdmin: true };
      next();
    } catch (error) {
      console.error(error);
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