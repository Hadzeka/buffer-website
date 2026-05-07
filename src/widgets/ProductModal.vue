<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-fade-in-up">
      <div class="flex justify-end p-4">
        <button @click="$emit('close')" class="text-white text-2xl hover:text-[#A9A9A9]">&times;</button>
      </div>
      <div class="flex flex-col md:flex-row gap-8 p-6">
        <div class="md:w-1/2">
          <img :src="product.image" class="w-full rounded-xl shadow-lg" :alt="product.name">
        </div>
        <div class="md:w-1/2 text-white">
          <h2 class="text-3xl font-bold mb-4">{{ product.name }}</h2>
          <p class="text-2xl text-[#A9A9A9] mb-4">{{ product.price }} ₽</p>
          <p class="text-gray-300 leading-relaxed mb-6">{{ product.description || 'Описание отсутствует' }}</p>
          <button class="bg-black hover:bg-[#A9A9A9] text-white px-6 py-2 rounded-xl transition">Заказать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['product'])
defineEmits(['close'])
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}
</style>