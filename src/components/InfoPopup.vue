<template>
  <div class="popup-bg">
    <div class="popup">
      <h3 class="popup-headline">Готово!</h3>
      <span>Ваша заявка успешно отправлена.</span>
      <button class="btn-submit" @click="closePopup">Ок</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store/store.js';

export default {
  methods: {
    closePopup() {
      store.commit('toggleSuccessPopup')
    }
  }
}
</script>

<style scoped>
.popup-bg {
  @apply absolute bg-black flex justify-center items-center bg-opacity-50 w-full h-screen z-10
}

.popup {
  @apply relative bg-neutral-50 rounded-lg opacity-100 p-12 min-w-80 flex flex-col gap-4 z-20
}

.btn-submit {
  @apply bg-green-200 p-3 rounded-lg hover:bg-green-300 transition-all duration-300 shadow-lg
}

.popup-headline {
  @apply font-bold text-xl
}

</style>