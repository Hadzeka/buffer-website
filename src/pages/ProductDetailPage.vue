<template>
  <div class="bg-[#2B2B2B] py-12 min-h-screen">
    <div class="max-w-7xl mx-auto px-4" v-if="product">
      <button @click="$router.back()" class="text-white mb-6 flex items-center gap-2 hover:text-[#A9A9A9]">← Назад</button>
      <div class="flex flex-col md:flex-row gap-12 bg-gray-800 rounded-2xl p-8 shadow-xl">
        <div class="md:w-1/2">
          <img :src="product.image" class="w-full rounded-xl shadow-lg" :alt="product.name">
        </div>
        <div class="md:w-1/2 text-white">
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
          <p class="text-2xl text-[#A9A9A9] mb-4">{{ product.price }} ₽</p>
          <p class="text-gray-300 leading-relaxed mb-6">{{ product.description || 'Описание отсутствует' }}</p>
          <div class="flex gap-4">
            <button class="bg-black hover:bg-[#A9A9A9] text-white px-6 py-2 rounded-xl transition">Заказать</button>
            <button @click="$router.back()" class="border border-white/30 hover:bg-white/10 px-6 py-2 rounded-xl transition">Вернуться</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-white py-20">Товар не найден</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../entities/product/model/productsStore'

const route = useRoute()
const productsStore = useProductsStore()
const product = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  product.value = productsStore.getProductById(id)
})
</script>