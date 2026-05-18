<template>
  <div class="bg-[#1e1e1e] py-12 min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[#1e1e1e] rounded-xl shadow-2xl p-6 md:p-8 border border-white/10">
        <h2 class="text-3xl font-bold text-white mb-6">Управление товарами</h2>

        <!-- Форма добавления / редактирования -->
        <div class="mb-10 p-6 bg-[#1e1e1e] rounded-lg border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ editingId ? 'Редактировать товар' : 'Добавить новый товар' }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-300 mb-1">Название *</label>
              <input v-model="form.name" type="text"
                     class="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                     placeholder="Например: Навес из металла" />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Цена * (BYN)</label>
              <input v-model="form.price" type="number"
                     class="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                     placeholder="1000" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-300 mb-1">Категория *</label>
              <select v-model="form.categorySlug"
                      class="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:border-blue-500 focus:outline-none">
                <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-300 mb-1">Описание</label>
              <textarea v-model="form.description" rows="2"
                        class="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        placeholder="Краткое описание товара"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-300 mb-1">Изображение товара</label>
              <input type="file" @change="handleFileUpload" accept="image/*"
                     class="w-full p-2 rounded bg-[#2a2a2a] text-white border border-gray-600" />
              <div v-if="uploading" class="text-gray-400 text-sm mt-1">Загрузка...</div>
              <div class="mt-2">
                <img :src="form.image" class="h-24 w-auto object-contain rounded cursor-pointer"
                     alt="Предпросмотр" @click="openImageModal" @error="handleImageError" />
              </div>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="saveProduct"
                    class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition">
              {{ editingId ? 'Сохранить изменения' : 'Добавить товар' }}
            </button>
            <button v-if="editingId" @click="cancelEdit"
                    class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded transition">
              Отмена
            </button>
          </div>
        </div>

        <!-- Список товаров -->
        <div>
          <h3 class="text-2xl font-semibold text-white mb-4">
            Существующие товары ({{ productsStore.products.length }})
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
              <thead class="bg-[#2a2a2a]">
                <tr>
                  <th class="px-4 py-2 text-left text-white">Фото</th>
                  <th class="px-4 py-2 text-left text-white">Название</th>
                  <th class="px-4 py-2 text-left text-white">Цена</th>
                  <th class="px-4 py-2 text-center text-white">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productsStore.products" :key="product.id" class="border-b border-gray-700 hover:bg-white/5">
                  <td class="px-4 py-2">
                    <img :src="product.image" class="h-12 w-12 object-cover rounded cursor-pointer"
                         @click="openTableImageModal(product.image)" @error="e => e.target.src='https://via.placeholder.com/300'" />
                  </td>
                  <td class="px-4 py-2 text-white">{{ product.name }}</td>
                  <td class="px-4 py-2 text-white">{{ product.price }} BYN</td>
                  <td class="px-4 py-2 text-center space-x-2">
                    <button @click="editProduct(product)"
                            class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition">
                      Редактировать
                    </button>
                    <button @click="deleteProduct(product.id)"
                            class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition">
                      Удалить
                    </button>
                  </td>
                </tr>
                <tr v-if="productsStore.products.length === 0">
                  <td colspan="4" class="px-4 py-8 text-center text-gray-400">
                    Нет товаров. Добавьте первый!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <ImageModal v-if="imageModalVisible" :image-url="modalImageUrl" @close="closeImageModal" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useProductsStore } from '../../../entities/product/model/productsStore'
import api from '../../../services/api'
import ImageModal from '../../../widgets/ImageModal.vue'
import { useToast } from '../../../shared/composables/useToast'
import { useConfirm } from '../../../shared/composables/useConfirm'

const { success, error: toastError } = useToast()
const { confirm } = useConfirm()

const productsStore = useProductsStore()
const uploading = ref(false)

// Модальное окно картинки
const imageModalVisible = ref(false)
const modalImageUrl = ref('')

const openImageModal = () => {
  if (form.image && form.image !== 'https://via.placeholder.com/300') {
    modalImageUrl.value = form.image
    imageModalVisible.value = true
  }
}

const openTableImageModal = (url) => {
  if (url && url !== 'https://via.placeholder.com/300') {
    modalImageUrl.value = url
    imageModalVisible.value = true
  }
}

const closeImageModal = () => {
  imageModalVisible.value = false
  modalImageUrl.value = ''
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

const form = reactive({
  name: '',
  description: '',
  price: '',
  categorySlug: 'canopies',
  image: 'https://via.placeholder.com/300'
})

const editingId = ref(null)

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.price = ''
  form.categorySlug = 'canopies'
  form.image = 'https://via.placeholder.com/300'
  editingId.value = null
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const fd = new FormData()
  fd.append('image', file)
  uploading.value = true
  try {
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    form.image = res.data.imageUrl
    success('Изображение загружено!')
  } catch (err) {
    console.error(err)
    toastError('Ошибка загрузки изображения')
  } finally {
    uploading.value = false
  }
}

const saveProduct = async () => {
  if (!form.name.trim()) {
    toastError('Введите название товара')
    return
  }
  if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
    toastError('Введите корректную цену')
    return
  }
  if (!form.categorySlug) {
    toastError('Выберите категорию')
    return
  }

  const productData = {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    categorySlug: form.categorySlug,
    image: form.image || 'https://via.placeholder.com/300'
  }

  try {
    if (editingId.value) {
      await productsStore.updateProduct(editingId.value, productData)
      success('Товар обновлён!')
    } else {
      await productsStore.createProduct(productData)
      success('Товар добавлен!')
    }
    resetForm()
  } catch (err) {
    toastError('Ошибка: ' + (err.response?.data?.message || err.message))
  }
}

const editProduct = (product) => {
  editingId.value = product.id
  form.name = product.name
  form.description = product.description || ''
  form.price = product.price
  form.categorySlug = product.categorySlug
  form.image = product.image
  document.querySelector('.bg-[#2a2b30]').scrollIntoView({ behavior: 'smooth' })
}

const cancelEdit = () => resetForm()

const deleteProduct = async (id) => {
  const isConfirmed = await confirm({
    title: 'Удалить товар',
    message: 'Вы уверены, что хотите удалить этот товар навсегда? Это действие нельзя отменить.',
  })
  if (isConfirmed) {
    try {
      await productsStore.deleteProduct(id)
      if (editingId.value === id) cancelEdit()
      success('Товар удалён')
    } catch (err) {
      toastError('Ошибка удаления: ' + (err.response?.data?.message || err.message))
    }
  }
}

const handleImageError = (e) => {
  e.target.src = '/images/placeholder.jpg'
}
</script>