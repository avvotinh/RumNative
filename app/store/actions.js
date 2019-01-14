import firebase from '../plugins/firebase'

export default {
  async login({ commit }, { data }) {
    commit('LOGGING_IN', true)

  },
  setPushNotificationToken({commit}, payload){
    commit('SET_NOTIFICATION_TOKEN', payload)
  } ,
  setUser({commit}, payload) {
    commit('SET_USER', payload)
  },

  setConnection({commit}, payload) {
    commit('SET_CONNECTION', payload)
  },

  logout({commit}, {navigate}) {
  }
}
