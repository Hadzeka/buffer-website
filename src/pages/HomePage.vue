<template>
  <div class="relative min-h-screen flex items-center justify-start overflow-hidden">
    <!-- Фоновое изображение с размытием -->
    <div 
      class="absolute inset-0 bg-cover bg-center blur-sm scale-110"
      style="background-image: url('/images/naves5.jpg')"
    ></div>
    
    <!-- Затемнение для читаемости текста -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Контент -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="text-white">
        <!-- Заголовок -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Минимализм.<br />
          Металл.<br />
          Архитектура.
        </h1>

        <!-- Кнопка -->
        <button 
          @click="$emit('scrollToCatalog')"
          class="mt-6 sm:mt-8 bg-black/60 backdrop-blur-sm border-2 border-white hover:bg-white/20 hover:border-white/80 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-md transition text-base sm:text-lg"
        >
          СМОТРЕТЬ КАТАЛОГ
        </button>

        <!-- Горизонтальная линия -->
        <div class="flex items-center gap-2 sm:gap-4 mt-8 sm:mt-12">
          <hr class="flex-1 border-t border-white/30 sm:border-t-2">
          <span class="text-white/70 text-xs sm:text-sm tracking-wider whitespace-nowrap">МЕТАЛЛОКОНСТРУКЦИИ В МИНСКЕ</span>
          <hr class="flex-1 border-t border-white/30 sm:border-t-2">
        </div>

        <!-- Блок этапов (стеклянные карточки) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div 
            v-for="step in steps" 
            :key="step.number" 
            class="text-center p-3 sm:p-4 rounded-xl border-white/20 hover:bg-white/20 transition"
          >
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 text-white flex items-center justify-center text-base sm:text-xl font-bold mx-auto mb-2 sm:mb-3">
              {{ step.number }}
            </div>
            <h3 class="text-white font-semibold text-xs sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">{{ step.title }}</h3>
            <p class="text-gray-200 text-xs sm:text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['scrollToCatalog'])

const steps = [
  { number: 1, title: 'БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ', description: 'Предоставляем развёрнутую консультацию по материалам и свойствам навесов.' },
  { number: 2, title: 'ВЫЕЗЖАЕМ НА ЗАМЕРЫ', description: 'Договариваемся и выезжаем на место для согласования всех нюансов и снятия замеров.' },
  { number: 3, title: 'СОГЛАСОВАНИЕ И ДОГОВОР', description: 'Согласовываем проект и работы. Оформляем договор.' },
  { number: 4, title: 'ПРОЕКТИРУЕМ И ВИЗУАЛИЗИРУЕМ', description: 'Делаем визуализацию будущей конструкции и делаем расчёт стоимости.' },
  { number: 5, title: 'ПРОИЗВОДСТВО И МОНТАЖ', description: 'Все детали изготавливаются и красятся на собственном производстве, на монтаж приезжают готовые детали в установленное договором сроки.' }
]
</script>