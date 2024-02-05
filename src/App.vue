<script setup>
import Buttons from './components/Buttons.vue';
import PopUp from './components/PopUp.vue'
import InfoPopup from './components/InfoPopup.vue'
import { store } from './store/store.js'


</script>

<template>
  <div class="bg-neutral-100 flex justify-center items-center w-100 h-screen app">
    <Buttons />
    <PopUp v-if="store.state.isPopupOpen" />
    <InfoPopup v-if="store.state.isFetchCompleted"/>
  </div>
</template>

<style scoped>
.app {
  z-index: 1;
}
</style>
