import { createStore } from "vuex";

export const store = createStore({
  state: {
    isPopupOpen: false,
    chosenCity: 1,
    name: "",
    phone: "",
    email: "",
    isFetchCompleted: false,
  },

  mutations: {
    togglePopup(state) {
      state.isPopupOpen = !state.isPopupOpen;
    },

    toggleSuccessPopup(state) {
      state.isFetchCompleted = !state.isFetchCompleted;
    },
  },
});
