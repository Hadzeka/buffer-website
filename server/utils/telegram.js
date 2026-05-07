const axios = require('axios');
require('dotenv').config();

/**
 * Отправка произвольного текстового сообщения в Telegram
 * @param {string} text - Текст сообщения (можно с HTML-разметкой)
 * @returns {Promise<boolean>} - true, если отправлено успешно
 */
const sendTelegramMessage = async (text) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  let chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('❌ TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в .env');
    return false;
  }

  // Telegram API ожидает числовой chat_id, но если он пришёл как строка из цифр – преобразуем
  if (typeof chatId === 'string' && /^\d+$/.test(chatId)) {
    chatId = parseInt(chatId, 10);
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
    disable_web_page_preview: true, // не показывать превью ссылок
  };

  try {
    const response = await axios.post(url, payload);
    if (response.data && response.data.ok) {
      console.log('✅ Уведомление в Telegram отправлено');
      return true;
    } else {
      console.error('❌ Telegram вернул ошибку:', response.data);
      return false;
    }
  } catch (err) {
    console.error('❌ Ошибка отправки в Telegram:', err.message);
    if (err.response) {
      console.error('   Статус:', err.response.status);
      console.error('   Данные:', err.response.data);
    }
    return false;
  }
};

/**
 * Отправка уведомления о новой заявке
 * @param {object} lead - Объект заявки с полями name, phone, message
 * @returns {Promise<boolean>}
 */
const sendLeadToTelegram = async (lead) => {
  const { name, phone, message } = lead;
  
  // Экранируем спецсимволы для HTML (чтобы не ломалось, если в сообщении есть < > &)
  const escapeHtml = (str) => {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  };

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message) || '—';

  const text = `
🔔 <b>НОВАЯ ЗАЯВКА С САЙТА BUFFER!</b>

👤 Имя: ${safeName}
📞 Телефон: ${safePhone}
💬 Сообщение: ${safeMessage}
🕒 Время: ${new Date().toLocaleString()}
  `;

  console.log('📤 Пытаемся отправить заявку в Telegram:', { name: safeName, phone: safePhone });
  return await sendTelegramMessage(text);
};

module.exports = { sendTelegramMessage, sendLeadToTelegram };