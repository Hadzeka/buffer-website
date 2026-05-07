<template>
  <div class="bg-[#0a0a0a] py-12">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-white text-center mb-12 tracking-tight">НАША ПРОДУКЦИЯ</h2>

      <div v-if="currentCategoryName" class="text-center text-gray-400 mb-6">
        Показаны товары категории: <span class="text-white font-semibold">{{ currentCategoryName }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.id" 
             class="group bg-[#141414] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 transition-all duration-300 transform hover:scale-105 hover:shadow-black/80 cursor-pointer"
             @click="openProductModal(product)">
          <div class="relative overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white text-lg font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">Подробнее</span>
            </div>
          </div>
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold text-white">{{ product.name }}</h3>
            <p class="text-gray-400 mt-1">{{ product.price }} ₽</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <button @click="resetFilter" class="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition backdrop-blur-sm border border-white/10">
          ВСЕ МОДЕЛИ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '../entities/product/model/productsStore'

const productsStore = useProductsStore()

const currentCategorySlug = computed(() => productsStore.currentCategorySlug)
const currentCategoryName = computed(() => {
  const names = {
    canopies: 'Навесы',
    'woodshed-large': 'Дровницы (большие)',
    'woodshed-small': 'Дровницы (маленькие)',
    benches: 'Лавочки',
    tables: 'Столы',
    chairs: 'Стулья',
    enclosures: 'Вольеры',
    fences: 'Ограждения',
    'utility-block': 'Хозблок',
    swings: 'Качели'
  }
  return names[currentCategorySlug.value] || ''
})

const filteredProducts = computed(() => {
  if (!currentCategorySlug.value) return productsStore.products
  return productsStore.getProductsByCategory(currentCategorySlug.value)
})

const resetFilter = () => {
  productsStore.resetCategoryFilter()
}

const openProductModal = (product) => {
  window.dispatchEvent(new CustomEvent('open-product-modal', { detail: product }))
}
</script>