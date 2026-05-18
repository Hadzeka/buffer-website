<template>
  <div class="bg-[#0a0a0a] overflow-x-hidden">
    
    <!-- Hero-секция с большим фоновым изображением и параллаксом -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/60 z-10"></div>
        <div class="w-full h-full bg-cover bg-center animate-slow-zoom" 
             style="background-image: url('/images/naves1.jpg'); background-attachment: fixed;">
        </div>
      </div>
      <div class="relative z-20 text-center px-4 max-w-4xl mx-auto animate-fade-up">
        <h1 class="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
          ИНЖЕНЕРНЫЙ<br>МИНИМАЛИЗМ
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto my-6"></div>
        <p class="text-xl md:text-2xl text-gray-200 font-light">
          Металлоконструкции для современного пространства.<br> 
          Производство полного цикла: от идеи до монтажа.
        </p>
      </div>
    </section>

    <!-- Блок с реальными фактами (честно, без приукрашивания) -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="animate-on-scroll transform transition-all duration-700 hover:-translate-y-2">
            <div class="text-5xl md:text-6xl font-bold text-white">⚡</div>
            <div class="text-gray-300 mt-2 text-lg font-semibold">Гарантия 5 лет!</div>
            <div class="text-gray-400 text-sm mt-1">Своевременная поддержка на протяжении пяти лет</div>
            <div class="w-12 h-0.5 bg-white/30 mx-auto mt-4"></div>
          </div>
          <div class="animate-on-scroll transform transition-all duration-700 hover:-translate-y-2" style="transition-delay: 0.1s">
            <div class="text-5xl md:text-6xl font-bold text-white">🔨</div>
            <div class="text-gray-300 mt-2 text-lg font-semibold">Разработка индивидуальных проектов</div>
            <div class="text-gray-400 text-sm mt-1">Качество вместо количества</div>
            <div class="w-12 h-0.5 bg-white/30 mx-auto mt-4"></div>
          </div>
          <div class="animate-on-scroll transform transition-all duration-700 hover:-translate-y-2" style="transition-delay: 0.2s">
            <div class="text-5xl md:text-6xl font-bold text-white">🤝</div>
            <div class="text-gray-300 mt-2 text-lg font-semibold">Индивидуальный подход</div>
            <div class="text-gray-400 text-sm mt-1">Под каждую задачу — своё решение</div>
            <div class="w-12 h-0.5 bg-white/30 mx-auto mt-4"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Галерея проектов в виде сетки с интерактивными карточками -->
    <section class="py-20 px-4 bg-[#0f0f0f]">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 text-center">НАШИ РАБОТЫ</h2>
        <p class="text-gray-400 text-center max-w-2xl mx-auto mb-16">Примеры выполненных заказов</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(project, idx) in projects" :key="idx" 
               class="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer aspect-[4/3]">
            <img :src="project.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="project">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 class="text-white text-2xl font-bold">{{ project.title }}</h3>
              <p class="text-gray-300">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Цитата / отзыв -->
    <section class="py-20 px-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/images/naves2.webp')] bg-cover bg-center opacity-10 blur-sm"></div>
      <div class="relative max-w-4xl mx-auto text-center">
        <svg class="w-12 h-12 text-white/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.038-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4 3.038-4 5.849h3.983v10h-9.979z"/>
        </svg>
        <p class="text-xl md:text-2xl text-gray-200 italic leading-relaxed">
          «От навеса до качелей — металл, который греет душу.»
        </p>
        <p class="text-gray-400 mt-6">— Команда BUFFER</p>
      </div>
    </section>

    <!-- Карта / контакты в стиле minimal -->
    <section class="py-20 px-4 border-t border-white/10">
      <div class="max-w-7xl mx-auto text-center">
        <h3 class="text-3xl font-bold text-white mb-4">Готовы обсудить ваш проект?</h3>
        <p class="text-gray-400 mb-8">Свяжитесь с нами для консультации и расчёта стоимости</p>
        <button @click="scrollToContacts" class="px-10 py-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300">
          Связаться
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Данные для галереи (ваши реальные изображения)
const projects = [
  { image: '/images/naves1.jpg', title: 'Навес для авто', description: '3x6 м, усиленная конструкция' },
  { image: '/images/naves2.webp', title: 'Навес для авто', description: 'Усиленная конструкция' },
  { image: '/images/voler.webp', title: 'Вольер для животных', description: 'Надёжное ограждение' },
  { image: '/images/cherteg2d.webp', title: 'Чертёжные работы', description: '2D-визуализация' },
  { image: '/images/cherteg.webp', title: 'Чертёжные работы', description: '3D-визуализация' },
  { image: '/images/drovnitsa.webp', title: 'Металлическая дровница', description: 'С ящиками' }
]

const scrollToContacts = () => {
  const contactsSection = document.getElementById('contacts')
  if (contactsSection) {
    const offset = 70
    window.scrollTo({ top: contactsSection.offsetTop - offset, behavior: 'smooth' })
  }
}

onMounted(() => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  elements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700')
    observer.observe(el)
  })
})
</script>

<style scoped>
@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
.animate-slow-zoom {
  animation: slowZoom 20s ease-out infinite alternate;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}
</style>