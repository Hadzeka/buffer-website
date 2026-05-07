const express = require('express');
const router = express.Router();
const { createLead, getAllLeads } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

// Публичная отправка заявки (доступна всем)
router.post('/', createLead);

// Просмотр списка заявок (только для админа)
router.get('/', protect, admin, getAllLeads);

module.exports = router;