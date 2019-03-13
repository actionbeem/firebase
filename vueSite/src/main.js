import Vue from 'vue'
import App from './App.vue'
import * as firebase from "firebase/app";

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyBJ6t_P_HVpmybrMIDHMD1JG-Ma0AEp1cU",
  authDomain: "vuesite-3c8e0.firebaseapp.com",
  databaseURL: "https://vuesite-3c8e0.firebaseio.com",
  projectId: "vuesite-3c8e0",
  storageBucket: "vuesite-3c8e0.appspot.com",
  messagingSenderId: "784181576601"
};
firebase.initializeApp(config);

new Vue({
  render: h => h(App),
}).$mount('#app')
