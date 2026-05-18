<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-[#141414] rounded-2xl max-w-md w-full p-6 text-center border border-white/10 shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-white">Вход в админ-панель</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-300 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-gray-600 focus:border-white/30 focus:outline-none transition" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-300 mb-1">Пароль</label>
          <input v-model="password" type="password" required class="w-full p-3 rounded-xl bg-[#1e1e1e] text-white border border-gray-600 focus:border-white/30 focus:outline-none transition" />
        </div>
        <button type="submit" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../entities/auth/model/authStore'
import { useToast } from '../shared/composables/useToast'

const emit = defineEmits(['close', 'success'])
const authStore = useAuthStore()
const { error: toastError } = useToast()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success && authStore.isAdmin) {
    emit('success')
    emit('close')
  } else {
    toastError('Неверный email или пароль (или нет прав администратора)')
  }
}
</script>