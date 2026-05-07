import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../../../services/api'; // путь к api.js

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentCategorySlug = ref(null); // добавляем

  // Загрузка товаров с сервера
  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await api.get('/products');
      products.value = response.data;
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Установка текущей категории
  const setCurrentCategory = (slug) => {
    currentCategorySlug.value = slug;
  };

  // Сброс фильтра
  const resetCategoryFilter = () => {
    currentCategorySlug.value = null;
  };

  // Создание товара
  const createProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      products.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Обновление товара
  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) products.value[index] = response.data;
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Удаление товара
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      products.value = products.value.filter(p => p.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Вспомогательные методы
  const getProductsByCategory = (slug) => {
    return products.value.filter(p => p.categorySlug === slug);
  };

  const getProductById = (id) => {
    return products.value.find(p => p.id === id);
  };

  return {
    products,
    loading,
    error,
    currentCategorySlug,
    fetchProducts,
    setCurrentCategory,
    resetCategoryFilter,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductById,
  };
});