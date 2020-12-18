import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import { VueMaskDirective } from 'v-mask'
import moment from 'moment';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


Vue.prototype.$moment = moment;

Vue.directive('mask', VueMaskDirective);

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDJBWTMdiSwmeXlZykBU6t-V9Qc3XTp6go",
  authDomain: "median-5546c.firebaseapp.com",
  databaseURL: "https://median-5546c-default-rtdb.firebaseio.com",
  projectId: "median-5546c",
  storageBucket: "median-5546c.appspot.com",
  messagingSenderId: "75713316284",
  appId: "1:75713316284:web:bc0723bb5c048fbb4e17b9",
  measurementId: "G-7J2CQ49B3K"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
