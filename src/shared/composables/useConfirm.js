import { ref } from 'vue'

const confirmModalRef = ref(null)

export const useConfirm = () => {
  const confirm = async (options) => {
    if (confirmModalRef.value) {
      return await confirmModalRef.value.show(options)
    }
    return window.confirm(options?.message || 'Вы уверены?') // fallback
  }

  const setConfirmModalRef = (ref) => {
    confirmModalRef.value = ref
  }

  return { confirm, setConfirmModalRef }
}