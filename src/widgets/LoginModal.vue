<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-gray-800 rounded-2xl w-full max-w-md p-8 shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Вход в админ-панель</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-300 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-300 mb-1">Пароль</label>
          <input v-model="password" type="password" required class="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-blue-500" />
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">Войти</button>
      </form>
      <p v-if="error" class="text-red-400 text-center mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../entities/auth/model/authStore';

const emit = defineEmits(['close', 'success']);
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success && authStore.isAdmin) {
    emit('success');
    emit('close');
  } else {
    error.value = 'Неверный email или пароль (или нет прав администратора)';
  }
};
</script>