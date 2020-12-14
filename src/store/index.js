import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import notifications from './notifications'
import houses from './houses'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, info, notifications, houses
  }
})
