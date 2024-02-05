<template>
  <div class="flex flex-column gap-8">
    <button class="btn" @click="openPopupWithMsk">Заказать в Москву</button>
    <button class="btn" @click="openPopupWithSpb">Заказать в Санкт-Петербург</button>
  </div>
</template>

<script>
import { store } from '../store/store.js';
export default {
  methods: {
    openPopupWithMsk() {
      store.state.chosenCity = 1
      store.commit('togglePopup')
    },

    openPopupWithSpb() {
      store.state.chosenCity = 2
      store.commit('togglePopup')
    },
  }
}
</script>

<style scoped>
.btn {
  @apply bg-green-200 p-4 rounded-lg shadow-lg hover:bg-green-300 transition-all duration-300
}

</style>