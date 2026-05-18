import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../../../services/api'

const CATEGORY_STORAGE_KEY = 'buffer_selected_category'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentCategorySlug = ref(localStorage.getItem(CATEGORY_STORAGE_KEY) || null)

  const setCurrentCategory = (slug) => {
    currentCategorySlug.value = slug
    if (slug) {
      localStorage.setItem(CATEGORY_STORAGE_KEY, slug)
    } else {
      localStorage.removeItem(CATEGORY_STORAGE_KEY)
    }
  }

  const resetCategoryFilter = () => {
    setCurrentCategory(null)
  }

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await api.get('/products')
      products.value = response.data
      console.log('Товары загружены:', products.value.length) // отладка
    } catch (err) {
      error.value = err.message
      console.error('Ошибка загрузки товаров:', err)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData)
      products.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData)
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) products.value[index] = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const getProductsByCategory = (slug) => {
    return products.value.filter(p => p.categorySlug === slug)
  }

  const getProductById = (id) => {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
    loading,
    error,
    currentCategorySlug,
    setCurrentCategory,
    resetCategoryFilter,
    fetchProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
})