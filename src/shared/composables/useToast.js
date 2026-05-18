import { ref } from 'vue'

const toasts = ref([])
let nextId = 1

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) toasts.value.splice(index, 1)
}

const addToast = ({ message, type = 'info', duration = 3000, position = 'bottom-right' }) => {
  const id = nextId++
  toasts.value.push({ id, message, type, duration, position })
  setTimeout(() => removeToast(id), duration + 500)
}

export const useToast = () => {
  const success = (msg, dur = 2000) => addToast({ message: msg, type: 'success', duration: dur })
  const error = (msg, dur = 3000) => addToast({ message: msg, type: 'error', duration: dur })
  const info = (msg, dur = 2000) => addToast({ message: msg, type: 'info', duration: dur })
  const warning = (msg, dur = 2500) => addToast({ message: msg, type: 'warning', duration: dur })
  return { toasts, success, error, info, warning, removeToast }
}