<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-[#141414] rounded-2xl max-w-md w-full p-6 text-center border border-white/10 shadow-2xl">
      <div class="flex justify-end">
        <button @click="$emit('close')" class="text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      <div class="py-4">
        <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Свяжитесь с нами</h3>
        <p class="text-gray-400 mb-6">Позвоните нам по телефону:</p>
        <a href="tel:+375447354067" class="text-3xl font-bold text-white hover:text-[#A9A9A9] transition block mb-4">+375 29 397-25-30</a>
        <button @click="$emit('close')" class="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-xl transition">Закрыть</button>
      </div>
    </div>
  </div>
</template>