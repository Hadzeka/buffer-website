<template>
  <div class="bg-[#0a0a0a] py-36 min-h-screen">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Две колонки: текст слева, карусель справа -->
      <div class="flex flex-col lg:flex-row gap-20 items-center">
        <!-- Текстовый блок -->
        <div class="lg:w-1/2">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ИНЖЕНЕРНЫЙ<br />МИНИМАЛИЗМ
          </h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-4">
            Мы создаём металлоконструкции для современного пространства. 
            Производство полного цикла: от идеи до монтажа.
          </p>
          <p class="text-gray-400">
            Собственный цех, контроль качества, 3D-визуализация и монтаж под ключ.
          </p>
        </div>

        <!-- Карусель (справа) -->
        <div class="lg:w-1/2">
          <div class="relative flex items-center justify-center">
            <!-- Стрелка назад -->
            <button 
              @click="prevSlide"
              class="absolute left-0 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
              aria-label="Предыдущий"
            >
              <svg class="w-6 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <!-- Контейнер карусели (три картинки) -->
            <div class="flex items-center justify-center gap-2 md:gap-4 mx-12">
              <!-- Левая маленькая картинка -->
              <div class="hidden sm:block w-24 md:w-32 opacity-70 transition-all duration-300 hover:opacity-100">
                <img 
                  :src="getImageUrl(prevIndex)" 
                  class="w-full h-32 md:h-40 object-cover rounded-xl shadow-lg cursor-pointer"
                  @click="goToSlide(prevIndex)"
                >
              </div>
              
              <!-- Центральная большая картинка -->
              <div class="w-48 md:w-64 transition-all duration-300">
                <img 
                  :src="getImageUrl(currentIndex)" 
                  class="w-full h-48 md:h-64 object-cover rounded-2xl shadow-2xl border-2 border-white/20 cursor-pointer"
                  @click="goToSlide(currentIndex)"
                >
              </div>
              
              <!-- Правая маленькая картинка -->
              <div class="hidden sm:block w-24 md:w-32 opacity-70 transition-all duration-300 hover:opacity-100">
                <img 
                  :src="getImageUrl(nextIndex)" 
                  class="w-full h-32 md:h-40 object-cover rounded-xl shadow-lg cursor-pointer"
                  @click="goToSlide(nextIndex)"
                >
              </div>
            </div>

            <!-- Стрелка вперёд -->
            <button 
              @click="nextSlide"
              class="absolute right-0 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
              aria-label="Следующий"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Индикаторы (точки) -->
          <div class="flex justify-center gap-2 mt-6">
            <button 
              v-for="(img, idx) in images" 
              :key="idx"
              @click="goToSlide(idx)"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-300',
                currentIndex === idx ? 'w-6 bg-white' : 'bg-white/40 hover:bg-white/70'
              ]"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const images = [
  '/images/naves1.jpg',
  '/images/naves2.webp',
   '/images/naves3.webp', 
   '/images/naves4.jpg',
      '/images/naves5.jpg',
  '/images/drovnitsa.jpg',
  '/images/voler.jpg',
  '/images/voler2.jpg',
    '/images/cherteg.jpg',
]

const currentIndex = ref(0)

// Получаем URL картинки по индексу (с зацикливанием)
const getImageUrl = (index) => {
  const safeIndex = (index % images.length + images.length) % images.length
  return images[safeIndex]
}

// Предыдущий индекс (зацикленный)
const prevIndex = computed(() => (currentIndex.value - 1 + images.length) % images.length)
// Следующий индекс
const nextIndex = computed(() => (currentIndex.value + 1) % images.length)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}
</script>