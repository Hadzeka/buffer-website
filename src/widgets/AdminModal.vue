<template>
  <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10">
      <div class="sticky top-0 bg-[#1e1e1e] p-4 border-b border-white/10 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">Админ-панель</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div class="p-6">
        <AdminPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminPanel from '../features/product/ui/AdminPanel.vue'
defineEmits(['close'])
</script>