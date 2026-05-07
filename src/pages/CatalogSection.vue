<template>
  <div class="bg-[#2B2B2B] py-12 min-h-screen">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-white text-center mb-12">НАША ПРОДУКЦИЯ</h2>
      
      <!-- Отображение текущей категории -->
      <div v-if="currentCategoryName" class="text-center text-[#A9A9A9] mb-6">
        Показаны товары категории: <span class="text-white font-semibold">{{ currentCategoryName }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.id" 
             class="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 cursor-pointer"
             @click="openProductDetail(product.id)">
          <img :src="product.image" class="w-full h-64 object-cover">
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-gray-600 mt-1">{{ product.price }} ₽</p>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <button @click="resetFilter" class="bg-black hover:bg-[#A9A9A9] text-white font-bold py-3 px-8 rounded-md transition text-lg">
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

const openProductDetail = (id) => {
  // Здесь можно открыть модалку с деталями товара или перейти на страницу.
  // Поскольку роутера нет, предлагаю показать alert с информацией.
  const product = productsStore.getProductById(id)
  alert(`${product.name}\n${product.description || 'Описание отсутствует'}\nЦена: ${product.price} ₽`)
}
</script>