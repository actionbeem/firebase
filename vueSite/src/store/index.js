import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentUserUid: null,
  },
  getters: {},
  actions: {},
  mutations: {
    setUserInfo(state, user){
      state.currentUser = user
    },
    setUserUid(state, userId){
      state.currentUserUid = userId
    },
    logOut(state){
      state.currentUser = null;
      state.currentUserUid = null;
    }
  },
});