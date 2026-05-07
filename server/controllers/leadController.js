const leadModel = require('../models/leadModel');
const { sendLeadToTelegram } = require('../utils/telegram');

const createLead = async (req, res) => {
  console.log('📩 Пришёл POST запрос на /api/leads, тело:', req.body);
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone) {
      console.log('❌ Ошибка: нет имени или телефона');
      return res.status(400).json({ message: 'Имя и телефон обязательны' });
    }
    const newLead = await leadModel.createLead({ name, phone, message });
    console.log('✅ Заявка сохранена в БД, id:', newLead.id);
    // Отправляем в Telegram
    console.log('📤 Отправка в Telegram...');
    await sendLeadToTelegram(newLead);
    console.log('✅ Telegram отправлен');
    res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    console.error('❌ Ошибка в createLead:', err.message);
    res.status(500).json({ message: err.message });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await leadModel.getAllLeads();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLead, getAllLeads };