<template>
  <div class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="relative max-w-4xl max-h-[90vh]">
      <button @click="$emit('close')" class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300">&times;</button>
      <img :src="imageUrl" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" alt="Увеличенное изображение">
    </div>
  </div>
</template>

<script setup>
defineProps(['imageUrl'])
defineEmits(['close'])
</script>