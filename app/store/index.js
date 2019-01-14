import Vue from 'nativescript-vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import sideDrawer from './modules/sideDrawer'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    sideDrawer
  },
  strict: debug
})

Vue.prototype.$store = store

export default store