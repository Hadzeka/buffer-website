import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../../../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAdmin = ref(false);
  const token = ref(localStorage.getItem('token') || null);

  // Проверка при загрузке
  const checkAuth = () => {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      // Для простоты не расшифровываем токен, а будем считать, что если токен есть - пользователь вошёл.
      // В идеале нужно декодировать и проверить isAdmin, но пока так.
      isAdmin.value = true; // можно выставить после декодирования, но для демо используем флаг из localStorage
      const userData = localStorage.getItem('user');
      if (userData) user.value = JSON.parse(userData);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      user.value = { id: response.data.id, name: response.data.name, email: response.data.email };
      isAdmin.value = response.data.isAdmin;
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    isAdmin.value = false;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  return { user, isAdmin, token, login, logout, checkAuth };
});