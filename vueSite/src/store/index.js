import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentUserUid: "",
  },
  getters: {},
  actions: {},
  mutations: {
    setUserInfo(state, user){
      state.currentUser = user
    },
    setUserUid(state, userId){
      state.currentUserUid = userId
    }
  },
});