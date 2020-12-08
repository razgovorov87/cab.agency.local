import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'


import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
