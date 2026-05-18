<template>
  <div class="fixed inset-0 pointer-events-none z-[9999]">
    <Teleport to="body">
      <div v-for="toast in toasts" :key="toast.id" class="pointer-events-auto">
        <Toast :message="toast.message" :type="toast.type" :duration="toast.duration" :position="toast.position" @close="removeToast(toast.id)" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { useToast } from '../shared/composables/useToast'
import Toast from './Toast.vue'
const { toasts, removeToast } = useToast()
</script>