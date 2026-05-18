<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click.self="cancel">
      <div class="bg-[#141414] rounded-2xl max-w-md w-full p-6 border border-white/10 shadow-2xl">
        <div class="text-center">
          <div class="mx-auto w-14 h-14 bg-red-900/40 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
          <p class="text-gray-400 mb-6">{{ message }}</p>
          <div class="flex gap-3">
            <button @click="confirm" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition">Удалить</button>
            <button @click="cancel" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-xl transition">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
let resolvePromise = null

const show = ({ title = 'Подтверждение', message = 'Вы уверены?' }) => {
  visible.value = true
  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

const confirm = () => {
  visible.value = false
  if (resolvePromise) resolvePromise(true)
}

const cancel = () => {
  visible.value = false
  if (resolvePromise) resolvePromise(false)
}

defineExpose({ show })
</script>