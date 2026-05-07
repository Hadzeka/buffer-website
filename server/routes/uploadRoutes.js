const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadFile } = require('../controllers/uploadController');

// Защитим маршрут авторизацией позже, пока без неё для теста
router.post('/', upload.single('image'), uploadFile);

module.exports = router;