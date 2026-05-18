import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../../../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAdmin = ref(false);
  const token = ref(localStorage.getItem('token') || null);

  const checkAuth = () => {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
      isAdmin.value = true; // если токен есть, считаем админом (упрощённо)
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/admin/login', { email, password });
      if (response.data.token) {
        user.value = response.data.admin;
        isAdmin.value = true;
        token.value = response.data.token;
        localStorage.setItem('token', token.value);
        api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    isAdmin.value = false;
    token.value = null;
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return { user, isAdmin, token, login, logout, checkAuth };
});