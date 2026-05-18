<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-[#1e1e1e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
      <div class="flex justify-end p-4 sticky top-0 bg-[#1e1e1e] z-10">
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div class="flex flex-col md:flex-row gap-8 p-6 pt-0">
        <div class="md:w-1/2">
          <img :src="product.image" class="w-full rounded-xl shadow-lg" :alt="product.name">
        </div>
        <div class="md:w-1/2 text-white flex flex-col">
          <h2 class="text-3xl font-bold mb-4">{{ product.name }}</h2>
          <p class="text-2xl text-[#A9A9A9] mb-4">{{ product.price }} BYN</p>
          <!-- Блок описания с правильным переносом текста -->
          <div class="bg-[#2a2a2a] rounded-xl p-4 mb-6 max-h-48 overflow-y-auto break-words whitespace-pre-wrap">
            <p class="text-gray-300 leading-relaxed">{{ product.description || 'Описание отсутствует' }}</p>
          </div>
          <button @click="goToContacts" class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition self-start">
            Заказать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product'])
const emit = defineEmits(['close'])

const goToContacts = () => {
  emit('close')
  const contactsSection = document.getElementById('contacts')
  if (contactsSection) {
    const offset = 70
    const elementPosition = contactsSection.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
  }
}
</script>