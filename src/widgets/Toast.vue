<template>
  <Transition name="toast" @after-leave="remove">
    <div v-if="visible" :class="['fixed z-50 p-4 rounded-lg shadow-xl backdrop-blur-md flex items-center gap-3 min-w-[280px] transition-all',
      type === 'success' ? 'bg-green-900/80 border border-green-500 text-white' : '',
      type === 'error' ? 'bg-red-900/80 border border-red-500 text-white' : '',
      type === 'info' ? 'bg-blue-900/80 border border-blue-500 text-white' : '',
      type === 'warning' ? 'bg-yellow-900/80 border border-yellow-600 text-white' : '',
    ]" :style="positionStyle">
      <span class="text-xl">{{ icon }}</span>
      <div class="flex-1 text-sm">{{ message }}</div>
      <button @click="close" class="text-white/60 hover:text-white">&times;</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: 'info' },
  duration: { type: Number, default: 3000 },
  position: { type: String, default: 'bottom-right' },
})

const emit = defineEmits(['close'])
const visible = ref(false)
let timeout = null

const icon = computed(() => {
  switch (props.type) {
    case 'success': return '✓'
    case 'error': return '✗'
    case 'warning': return '⚠'
    default: return 'ℹ'
  }
})

const positionStyle = computed(() => {
  const offset = 20
  switch (props.position) {
    case 'top-left': return { top: offset + 'px', left: offset + 'px' }
    case 'top-right': return { top: offset + 'px', right: offset + 'px' }
    case 'bottom-left': return { bottom: offset + 'px', left: offset + 'px' }
    default: return { bottom: offset + 'px', right: offset + 'px' }
  }
})

const close = () => {
  visible.value = false
  setTimeout(() => emit('close'), 300)
}

onMounted(() => {
  visible.value = true
  timeout = setTimeout(close, props.duration)
})

onUnmounted(() => clearTimeout(timeout))
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(100%); }
</style>