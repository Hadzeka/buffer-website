<template>
  <div class="bg-[#0a0a0a] py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-white text-center mb-6 tracking-tight">Контакты</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Левая колонка: контакты -->
        <div class="bg-[#141414] rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/5">
          <div class="space-y-4">
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">📞 Телефон</h3>
              <a href="tel:+375291234567" class="text-gray-400 hover:text-white transition">+375 44 735 40 67</a>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">💬 Соцсети</h3>
              <div class="flex space-x-4">
                <a href="https://t.me/vnsttt" target="_blank" class="text-gray-400 hover:text-white">Telegram</a>
                <a href="https://www.instagram.com/buffer.by?igsh=MTczazN2dnNpMm1zbA==" target="_blank" class="text-gray-400 hover:text-white">Instagram</a>
                <a href="https://www.tiktok.com/@bufer.by?_r=1&_t=ZS-968l02NbWXE" target="_blank" class="text-gray-400 hover:text-white">TikTok</a>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">✉️ Email</h3>
              <a href="mailto:info@buffer.by" class="text-gray-400 hover:text-white">info@buffer.by</a>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">🕒 Время работы</h3>
              <p class="text-gray-400">Пн–Пт: 9:00 – 18:00</p>
              <p class="text-gray-400">Сб: 10:00 – 15:00</p>
              <p class="text-gray-400">Вс: выходной</p>
            </div>
          </div>
        </div>

        <!-- Правая колонка: форма "Написать нам" -->
        <div class="bg-[#141414] rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/5">
          <h3 class="text-2xl font-bold text-white mb-4">Написать нам</h3>
          <form @submit.prevent="submitContactForm" class="space-y-3">
            <div>
              <label class="block text-gray-400 mb-1 text-sm">Имя *</label>
              <input v-model="contactForm.name" type="text" required
                     class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition">
            </div>
            <div>
              <label class="block text-gray-400 mb-1 text-sm">Телефон *</label>
              <input v-model="contactForm.phone" type="tel" required
                     @input="validateContactPhone"
                     class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition"
                     :class="{ 'border-red-500': contactPhoneError }">
              <p v-if="contactPhoneError" class="text-red-400 text-xs mt-1">{{ contactPhoneError }}</p>
            </div>
            <div>
              <label class="block text-gray-400 mb-1 text-sm">Сообщение</label>
              <textarea v-model="contactForm.message" rows="3"
                        class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition"></textarea>
            </div>
            <button type="submit" :disabled="contactPhoneError" 
                    class="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed">
              Отправить
            </button>
          </form>
        </div>
      </div>

      <!-- Блок расчёта стоимости -->
      <div class="bg-[#141414] rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/5">
        <h3 class="text-2xl font-bold text-white text-center mb-3">ЗАКАЗАТЬ РАСЧЕТ СТОИМОСТИ</h3>
        <p class="text-gray-400 text-center mb-5 text-sm">
          Вы можете оставить заявку на предварительный расчёт цены конструкции по вашим размерам, без выезда замерщика!
        </p>
        <form @submit.prevent="submitEstimateForm" class="max-w-2xl mx-auto space-y-3">
          <div>
            <label class="block text-gray-400 mb-1 text-sm">Имя *</label>
            <input v-model="estimateForm.name" type="text" required
                   class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition">
          </div>
          <div>
            <label class="block text-gray-400 mb-1 text-sm">Телефон *</label>
            <input v-model="estimateForm.phone" type="tel" required
                   @input="validateEstimatePhone"
                   class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition"
                   :class="{ 'border-red-500': estimatePhoneError }">
            <p v-if="estimatePhoneError" class="text-red-400 text-xs mt-1">{{ estimatePhoneError }}</p>
          </div>
          <div>
            <label class="block text-gray-400 mb-1 text-sm">Сообщение (размеры, пожелания)</label>
            <textarea v-model="estimateForm.message" rows="3"
                      class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-white/10 focus:border-white/30 focus:outline-none transition"></textarea>
          </div>
          <button type="submit" :disabled="estimatePhoneError"
                  class="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from '../services/api'

const contactForm = ref({ name: '', phone: '', message: '' })
const estimateForm = ref({ name: '', phone: '', message: '' })

// Валидация телефона (белорусские номера, можно с +375, 80, 375, 29, 33, 44, 25 и т.д.)
const validatePhone = (phone) => {
  if (!phone) return 'Телефон обязателен'
  // Убираем всё, кроме цифр и плюса
  const cleaned = phone.replace(/[^\d+]/g, '')
  // Проверяем, что начинается с +375, 375, 80 или 8, и далее 9 цифр (всего 11-13 цифр)
  const phoneRegex = /^(\+375|375|80|8)?\d{9}$/
  // Также можно просто проверить, что в строке только цифры и +, и длина 11-13 символов
  const digits = cleaned.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 12) return 'Введите корректный номер телефона (11-12 цифр)'
  if (!phoneRegex.test(cleaned) && !/^\d{9,12}$/.test(digits)) return 'Неверный формат телефона'
  return null
}

// Валидация email
const validateEmail = (email) => {
  if (!email) return 'Email обязателен'
  const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  if (!re.test(email)) return 'Введите корректный email'
  return null
}

// Контактная форма: проверка телефона
const contactPhoneError = ref('')
const validateContactPhone = () => {
  contactPhoneError.value = validatePhone(contactForm.value.phone)
}
// Форма расчёта: проверка телефона
const estimatePhoneError = ref('')
const validateEstimatePhone = () => {
  estimatePhoneError.value = validatePhone(estimateForm.value.phone)
}

// Отправка заявки
const submitContactForm = async () => {
  const phoneErr = validatePhone(contactForm.value.phone)
  if (phoneErr) {
    contactPhoneError.value = phoneErr
    return
  }
  try {
    const response = await api.post('/leads', {
      name: contactForm.value.name,
      phone: contactForm.value.phone,
      message: contactForm.value.message || '',
    })
    if (response.data.success) {
      alert(`Спасибо, ${contactForm.value.name}! Мы свяжемся с вами.`)
      contactForm.value = { name: '', phone: '', message: '' }
      contactPhoneError.value = ''
    } else {
      alert('Ошибка при отправке. Попробуйте позже.')
    }
  } catch (err) {
    console.error(err)
    alert('Ошибка соединения с сервером.')
  }
}

const submitEstimateForm = async () => {
  const phoneErr = validatePhone(estimateForm.value.phone)
  if (phoneErr) {
    estimatePhoneError.value = phoneErr
    return
  }
  try {
    const response = await api.post('/leads', {
      name: estimateForm.value.name,
      phone: estimateForm.value.phone,
      message: `[Заявка на расчёт] ${estimateForm.value.message || ''}`,
    })
    if (response.data.success) {
      alert(`Спасибо, ${estimateForm.value.name}! Мы подготовим расчёт.`)
      estimateForm.value = { name: '', phone: '', message: '' }
      estimatePhoneError.value = ''
    } else {
      alert('Ошибка при отправке. Попробуйте позже.')
    }
  } catch (err) {
    console.error(err)
    alert('Ошибка соединения с сервером.')
  }
}
</script>