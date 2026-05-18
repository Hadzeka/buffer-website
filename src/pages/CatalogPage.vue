<template>
  <div class="bg-[#0a0a0a] py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Заголовок и кнопка фильтра -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
        <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight text-center sm:text-left">
          НАША ПРОДУКЦИЯ
        </h2>
        <div class="relative w-full sm:w-auto">
          <button 
            @click="toggleFilters"
            class="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 w-full sm:w-auto"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            <span>Фильтр</span>
            <span v-if="activeFiltersCount > 0" class="bg-white/20 rounded-full px-2 py-0.5 text-xs">{{ activeFiltersCount }}</span>
          </button>
          
          <!-- Плавающая панель фильтров (мобильная + десктопная) -->
          <Transition name="filter">
            <div v-if="filtersVisible" 
                 class="fixed md:absolute left-4 right-4 md:left-auto md:right-0 md:w-80 top-1/2 md:top-auto md:mt-3 transform -translate-y-1/2 md:translate-y-0 z-50 md:z-20">
              <div class="bg-[#141414] rounded-2xl shadow-2xl border border-white/10 p-5 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4 md:hidden">
                  <h3 class="text-white font-semibold">Фильтры</h3>
                  <button @click="filtersVisible = false" class="text-gray-400 hover:text-white text-xl">&times;</button>
                </div>
                <div class="space-y-5">
                  <!-- Фильтр по категории -->
                  <div>
                    <label class="block text-gray-300 text-sm mb-2">Категория</label>
                    <select v-model="localCategorySlug" @change="onCategoryChange" 
                            class="w-full bg-[#1e1e1e] text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-white/30">
                      <option value="">Все категории</option>
                      <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
                    </select>
                  </div>
                  <!-- Фильтр по цене -->
                  <div>
                    <label class="block text-gray-300 text-sm mb-2">Цена, BYN</label>
                    <div class="flex gap-3">
                      <input type="number" v-model="priceMin" placeholder="от" 
                             class="w-full bg-[#1e1e1e] text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-white/30">
                      <input type="number" v-model="priceMax" placeholder="до" 
                             class="w-full bg-[#1e1e1e] text-white border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-white/30">
                    </div>
                    <button @click="resetPriceFilter" class="text-gray-400 text-sm mt-2 hover:text-white">Сбросить цену</button>
                  </div>
                  <!-- Кнопка сброса всех фильтров -->
                  <button v-if="hasActiveFilters" @click="resetAllFilters" 
                          class="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl transition">
                    Сбросить все фильтры
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Сообщение о текущей категории -->
      <div v-if="currentCategoryName" class="text-center text-gray-400 text-sm sm:text-base mb-6">
        Показаны товары категории: <span class="text-white font-semibold">{{ currentCategoryName }}</span>
      </div>

      <!-- Список товаров (адаптивная сетка) -->
      <div v-if="filteredProducts.length" class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div v-for="product in displayedProducts" :key="product.id" 
             class="group bg-[#141414] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 transition-all duration-300 transform hover:scale-105 hover:shadow-black/80 cursor-pointer"
             @click="openProductModal(product)">
          <div class="relative overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white text-sm sm:text-lg font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full">Подробнее</span>
            </div>
          </div>
          <div class="p-3 sm:p-4 text-center">
            <h3 class="text-base sm:text-xl font-semibold text-white">{{ product.name }}</h3>
            <p class="text-gray-400 mt-1 text-sm sm:text-base">{{ product.price }} BYN</p>
          </div>
        </div>
      </div>

      <!-- Сообщение, если товаров нет -->
      <div v-else class="text-center text-gray-400 py-12">
        Нет товаров, соответствующих выбранным фильтрам.
      </div>

      <!-- Кнопки управления пагинацией -->
      <div v-if="filteredProducts.length" class="flex flex-col items-center gap-4 mt-8 sm:mt-12">
        <button v-if="visibleCount < filteredProducts.length" @click="loadMore" 
                class="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition backdrop-blur-sm border border-white/10 text-sm sm:text-base">
          Показать ещё ({{ filteredProducts.length - visibleCount }} осталось)
        </button>
        <button v-if="visibleCount > INITIAL_VISIBLE" @click="resetPagination" 
                class="text-gray-400 text-xs sm:text-sm hover:text-white">
          Свернуть
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductsStore } from '../entities/product/model/productsStore'

const productsStore = useProductsStore()

// Константы
const INITIAL_VISIBLE = 3
const HEADER_OFFSET = 70

// Категории
const categories = [
  { name: 'Навесы', slug: 'canopies' },
  { name: 'Дровницы (большие)', slug: 'woodshed-large' },
  { name: 'Дровницы (маленькие)', slug: 'woodshed-small' },
  { name: 'Лавочки', slug: 'benches' },
  { name: 'Столы', slug: 'tables' },
  { name: 'Стулья', slug: 'chairs' },
  { name: 'Вольеры', slug: 'enclosures' },
  { name: 'Ограждения', slug: 'fences' },
  { name: 'Хозблок', slug: 'utility-block' },
  { name: 'Качели', slug: 'swings' }
]

// UI состояние
const filtersVisible = ref(false)

// Локальное состояние фильтров
const localCategorySlug = ref(productsStore.currentCategorySlug || '')
const priceMin = ref('')
const priceMax = ref('')
const visibleCount = ref(INITIAL_VISIBLE)

// Вычисляемые свойства
const allProducts = computed(() => productsStore.products)

const filteredProducts = computed(() => {
  let result = allProducts.value
  if (localCategorySlug.value) {
    result = result.filter(p => p.categorySlug === localCategorySlug.value)
  }
  const min = priceMin.value !== '' ? Number(priceMin.value) : null
  const max = priceMax.value !== '' ? Number(priceMax.value) : null
  if (min !== null && !isNaN(min)) result = result.filter(p => p.price >= min)
  if (max !== null && !isNaN(max)) result = result.filter(p => p.price <= max)
  return result
})

const displayedProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))

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
  return names[localCategorySlug.value] || ''
})

const hasActiveFilters = computed(() => !!(localCategorySlug.value || priceMin.value || priceMax.value))

const activeFiltersCount = computed(() => {
  let count = 0
  if (localCategorySlug.value) count++
  if (priceMin.value) count++
  if (priceMax.value) count++
  return count
})

// Методы
const toggleFilters = () => {
  filtersVisible.value = !filtersVisible.value
}

const scrollToCatalogSection = () => {
  const catalogSection = document.getElementById('catalog')
  if (catalogSection) {
    const elementPosition = catalogSection.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: elementPosition - HEADER_OFFSET, behavior: 'smooth' })
  }
}

const loadMore = () => {
  visibleCount.value += 6
}

const resetPagination = () => {
  visibleCount.value = INITIAL_VISIBLE
}

const onCategoryChange = () => {
  productsStore.setCurrentCategory(localCategorySlug.value)
  resetPagination()
  if (window.innerWidth < 768) filtersVisible.value = false
}

const resetPriceFilter = () => {
  priceMin.value = ''
  priceMax.value = ''
  resetPagination()
}

const resetAllFilters = () => {
  localCategorySlug.value = ''
  productsStore.resetCategoryFilter()
  priceMin.value = ''
  priceMax.value = ''
  resetPagination()
  filtersVisible.value = false
}

const openProductModal = (product) => {
  window.dispatchEvent(new CustomEvent('open-product-modal', { detail: product }))
}

// Синхронизация с глобальной категорией (из меню)
watch(() => productsStore.currentCategorySlug, (newVal) => {
  localCategorySlug.value = newVal || ''
  resetPagination()
})

watch([localCategorySlug, priceMin, priceMax], () => {
  resetPagination()
})

onMounted(() => {
  productsStore.fetchProducts()
  localCategorySlug.value = productsStore.currentCategorySlug || ''
})
</script>

<style scoped>
.filter-enter-active, .filter-leave-active {
  transition: all 0.3s ease;
}
.filter-enter-from, .filter-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
/* Для мобильной версии – плавное появление из центра */
@media (max-width: 767px) {
  .filter-enter-from, .filter-leave-to {
    transform: translateY(0) scale(0.9);
    opacity: 0;
  }
  .filter-enter-active, .filter-leave-active {
    transition: all 0.2s ease;
  }
}
</style>