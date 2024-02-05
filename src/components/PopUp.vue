<template>
  <div class="popup-bg w-full h-screen">
    <div class="popup">

      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48" class="btn-close"
        @click="closePopup">
        <path
          d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z">
        </path>
      </svg>

      <div class="popup-inputs">
        <div class="popup-inputWrap">
          <input type="text" name="name" placeholder="Имя" class="popup-input" v-model.trim="name" maxlength="15">
          <label for="name" class="placeholder">Имя</label>
          <p class="input-warning">{{ nameError }}</p>
        </div>

        <div class="popup-inputWrap">
          <input type="tel" name="phone" placeholder="Телефон" class="popup-input" v-model.number="phone" maxlength="16"
            v-imask="mask" @accept="onAccept" @complete="onComplete">
          <label for="phone" class="placeholder">Телефон</label>
          <p class="input-warning">{{ phoneError }}</p>
        </div>

        <div class="popup-inputWrap">
          <input type="text" name="email" placeholder="Почта" class="popup-input" v-model="email">
          <label for="email" class="placeholder">Почта</label>
          <p class="input-warning">{{ emailError }}</p>
        </div>

        <div class="popup-inputWrap">
          <select name="city" class="popup-input" v-model="chosenCity">
            <option value="1">Москва</option>
            <option value="2">Санкт-Петербург</option>
            <option value="3">Казань</option>
          </select>
        </div>
      </div>

      <div class="btn-submitWrap">
        <button class="btn-submit" @click="submit">Отправить</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store/store.js'
import { IMaskDirective } from 'vue-imask';

export default {
  data() {
    return {
      chosenCity: store.state.chosenCity,
      name: store.state.name,
      nameError: '',
      phone: '',
      phoneError: '',
      email: store.state.email,
      emailError: '',
      mask: {
        mask: '{+7}(000)000-00-00',
        lazy: true
      },
    }
  },

  methods: {
    closePopup() {
      store.commit('togglePopup')
    },

    isNameValid(name) {
      let isValid = false
      const regExpName = /^[А-Я][а-яё]*$/

      if (regExpName.test(name)) {
        isValid = true
        this.nameError = ''
      } else if (!regExpName.test(name) && name) {
        isValid = false
        this.nameError = 'Имя введено некорректно'
      } else if (!name) {
        isValid = false
        this.nameError = 'Обязательное поле'
      }
      return isValid
    },

    isEmailValid(email) {
      let isValid = false
      const regExpEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/

      if (regExpEmail.test(email)) {
        isValid = true
        this.emailError = ''
      } else if (!regExpEmail.test(email) && email) {
        this.emailError = 'Email введён некорректно'
      } else if (!email) {
        this.emailError = 'Обязательное поле'
      }
      return isValid
    },

    isPhoneValid(phoneNumber) {
      let isValid = false

      if (phoneNumber && phoneNumber.length < 12) {
        this.phoneError = 'Формат +7(999)999-99-99'
      } else if (!phoneNumber || phoneNumber.length <= 2) {
        this.phoneError = 'Обязательное поле'
      } else if (phoneNumber.length === 12) {
        isValid = true
        this.phoneError = ''
      }
      return isValid
    },

    onAccept(e) {
      const maskRef = e.detail;
      this.phone = maskRef.unmaskedValue
    },

    onComplete(e) {
      const maskRef = e.detail;
      this.phone = maskRef.unmaskedValue
    },

    fetchCompleted() {
      store.commit('toggleSuccessPopup')
    },

    async submit() {
      if (this.isEmailValid(this.email) == true && this.isNameValid(this.name) == true && this.isPhoneValid(this.phone) == true) {

        const url = 'http://hh.autodrive-agency.ru/test-tasks/front/task-7/'
        const response = await fetch(url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              phone: this.phone,
              email: this.email,
              city_id: this.chosenCity
            }),
          }
        );

        this.closePopup()
        this.fetchCompleted()

      }
    },
  },
  directives: {
    imask: IMaskDirective
  }
}
</script>

<style scoped>
.popup-bg {
  z-index: 2;
  @apply absolute bg-black flex justify-center items-center bg-opacity-50
}

.popup {
  z-index: 3;
  @apply relative bg-neutral-50 rounded-lg opacity-100 p-12 min-w-80
}

.btn-close {
  @apply absolute top-4 right-4 cursor-pointer hover:scale-110 transition-all duration-300
}

.popup-inputs {
  @apply flex flex-col gap-6 mb-8;
}

.popup-inputWrap {
  @apply relative
}

.popup-input {
  @apply rounded-lg bg-neutral-200 p-2 focus:outline-none w-full;
}

.popup-input:focus+.placeholder,
.popup-input:not(:placeholder-shown)+.placeholder {
  @apply text-sm -translate-y-8
}

.placeholder {
  @apply absolute left-2 top-2 pointer-events-none transition-all duration-300 ease-in-out text-base;
}

.popup-input::placeholder {
  color: transparent;
}

.input-warning {
  @apply text-red-500
}

.btn-submitWrap {
  @apply flex justify-end items-end
}

.btn-submit {
  @apply bg-green-200 p-3 rounded-lg hover:bg-green-300 transition-all duration-300 shadow-lg
}
</style>