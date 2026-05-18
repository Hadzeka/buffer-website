<template>
  <div class="bg-[#0a0a0a]">
    <nav class="fixed top-0 w-full z-50 transition-all duration-300 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-3 md:py-5 flex justify-between items-center">
        <div @click="scrollTo('home')" class="text-xl md:text-2xl font-bold text-white cursor-pointer hover:text-[#A9A9A9] transition whitespace-nowrap">
          BUFFER
        </div>
        <div class="hidden md:flex items-center space-x-4 lg:space-x-8">
          <div class="relative group">
            <button class="text-gray-200 hover:text-white flex items-center gap-1 transition-transform duration-200 hover:scale-105 text-sm lg:text-base whitespace-nowrap">
              Каталог
              <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 lg:w-56 bg-black/80 backdrop-blur-md border border-white/10 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div v-for="cat in categories" :key="cat.slug" @click="selectCategory(cat.slug)" 
                   class="block px-4 py-2 text-xs lg:text-sm text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer transition-transform duration-200 hover:scale-105 origin-left whitespace-nowrap">
                {{ cat.name }}
              </div>
            </div>
          </div>
          <button @click="scrollTo('catalog')" class="text-gray-200 hover:text-white transition-transform duration-200 hover:scale-105 text-sm lg:text-base whitespace-nowrap">Все товары</button>
          <button @click="scrollTo('about')" class="text-gray-200 hover:text-white transition-transform duration-200 hover:scale-105 text-sm lg:text-base whitespace-nowrap">О компании</button>
          <button @click="scrollTo('contacts')" class="text-gray-200 hover:text-white transition-transform duration-200 hover:scale-105 text-sm lg:text-base whitespace-nowrap">Контакты</button>
        </div>
        <!-- Телефон – теперь ссылка заменена на кнопку, открывающую модалку -->
        <div class="hidden md:block text-white font-medium whitespace-nowrap text-sm lg:text-base">
          <button @click="showPhoneModal = true" class="hover:text-[#A9A9A9] transition">
             A1 +375 29 397-25-30
          </button>
        </div>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white focus:outline-none">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 py-4 px-4 space-y-3">
        <div class="relative">
          <button @click="mobileCatalogOpen = !mobileCatalogOpen" class="text-gray-200 hover:text-white w-full text-left py-2 flex justify-between items-center">
            Каталог
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': mobileCatalogOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-if="mobileCatalogOpen" class="pl-4 space-y-2 mt-1">
            <div v-for="cat in categories" :key="cat.slug" @click="selectCategoryMobile(cat.slug)" class="block py-1 text-sm text-gray-300 hover:text-white cursor-pointer">
              {{ cat.name }}
            </div>
          </div>
        </div>
        <button @click="scrollToAndClose('catalog')" class="text-gray-200 hover:text-white block w-full text-left py-2">Все товары</button>
        <button @click="scrollToAndClose('about')" class="text-gray-200 hover:text-white block w-full text-left py-2">О компании</button>
        <button @click="scrollToAndClose('contacts')" class="text-gray-200 hover:text-white block w-full text-left py-2">Контакты</button>
        <div class="pt-2 border-t border-white/10">
          <!-- Мобильная версия – тоже кнопка -->
          <button @click="showPhoneModal = true" class="text-gray-200 hover:text-white block w-full text-left">
            📞 A1 +375 29 397-25-30
          </button>
        </div>
      </div>
    </nav>

    <main class="pt-16">
      <section id="home"><HomePage @scroll-to-catalog="() => scrollTo('catalog')" /></section>
      <section id="catalog"><CatalogPage /></section>
      <section id="about"><AboutPage /></section>
      <section id="contacts"><ContactsPage /></section>
    </main>

    <Footer />
    <AdminModal v-if="adminMode" @close="adminMode = false" />
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" @success="onLoginSuccess" />
    <ProductModal v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null" />
    <!-- Модальное окно с телефоном -->
    <PhoneModal v-if="showPhoneModal" @close="showPhoneModal = false" />
    <ConfirmModal ref="confirmModalRef" />
 <ToastContainer />
 </div>
</template>

<script setup>
import ToastContainer from '../widgets/ToastContainer.vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useProductsStore } from '../entities/product/model/productsStore'
import { useAuthStore } from '../entities/auth/model/authStore'
import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ContactsPage from '../pages/ContactsPage.vue'
import Footer from '../widgets/Footer.vue'
import AdminModal from '../widgets/AdminModal.vue'
import LoginModal from '../widgets/LoginModal.vue'
import ProductModal from '../widgets/ProductModal.vue'
import PhoneModal from '../widgets/PhoneModal.vue'
import ConfirmModal from '../widgets/ConfirmModal.vue'
import { useConfirm } from '../shared/composables/useConfirm'

const showPhoneModal = ref(false)
const adminMode = ref(false)
const selectedProduct = ref(null)
const showLoginModal = ref(false)

const productsStore = useProductsStore()
const authStore = useAuthStore()

const mobileMenuOpen = ref(false)
const mobileCatalogOpen = ref(false)

const confirmModalRef = ref(null)
const { setConfirmModalRef } = useConfirm()

// Текущая видимая секция
const currentSection = ref('home')
const sectionTitles = {
  home: 'Главная страница',
  catalog: 'Каталог',
  about: 'О компании',
  contacts: 'Контакты'
}

// Обновление заголовка вкладки
watch(currentSection, (newSection) => {
  document.title = sectionTitles[newSection] || 'BUFFER'
}, { immediate: true })

// Intersection Observer для отслеживания видимой секции
let observer = null

const setupObserver = () => {
  const sections = ['home', 'catalog', 'about', 'contacts']
  const elements = sections.map(id => document.getElementById(id)).filter(el => el !== null)
  
  if (!elements.length) return

  observer = new IntersectionObserver((entries) => {
    // Находим секцию с максимальной областью пересечения
    let maxRatio = 0
    let visibleSection = currentSection.value
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio
        visibleSection = entry.target.id
      }
    }
    if (visibleSection !== currentSection.value) {
      currentSection.value = visibleSection
    }
  }, { threshold: [0.2, 0.5, 0.8] }) // отслеживаем несколько порогов

  elements.forEach(el => observer.observe(el))
}

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

const selectCategory = (slug) => {
  productsStore.setCurrentCategory(slug)
  scrollTo('catalog')
}

const selectCategoryMobile = (slug) => {
  selectCategory(slug)
  mobileMenuOpen.value = false
  mobileCatalogOpen.value = false
}

const scrollToAndClose = (id) => {
  scrollTo(id)
  mobileMenuOpen.value = false
  mobileCatalogOpen.value = false
}

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (!element) return

  const offset = 70
  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })

  setTimeout(() => {
    const currentPos = window.scrollY
    const targetPos = element.offsetTop - offset
    if (Math.abs(currentPos - targetPos) > 3) {
      window.scrollTo({ top: targetPos, behavior: 'auto' })
    }
  }, 100)
}

const onLoginSuccess = () => {
  if (authStore.isAdmin) {
    adminMode.value = true
  }
}

onMounted(() => {
  window.addEventListener('open-product-modal', (e) => {
    selectedProduct.value = e.detail
  })

  // Устанавливаем ссылку на компонент ConfirmModal после монтирования
  setConfirmModalRef(confirmModalRef.value)
  
  authStore.checkAuth()
  
  let count = 0
  const logo = document.querySelector('.text-xl.md\\:text-2xl.font-bold')
  if (logo) {
    logo.addEventListener('click', (e) => {
      if (e.shiftKey) {
        count++
        if (count === 5) {
          count = 0
          if (authStore.isAdmin) {
            adminMode.value = true
          } else {
            showLoginModal.value = true
          }
        }
      } else {
        count = 0
      }
    })
  }

  setTimeout(() => {
    setupObserver()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>