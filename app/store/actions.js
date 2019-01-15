import firebase from 'nativescript-plugin-firebase'


export default {
  login({ commit, dispatch }, payload) {
    commit('LOGGING_IN', true)
    return new Promise((resolve, reject) => {
      firebase
        .login({
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: "vanhop.pt@gmail.com",
            password: "12345qwe"
          }
        })
        .then(result => {
          firebase.getAuthToken({
            forceRefresh: true
          }).then(token => {
            commit('LOGGING_IN', false)
            dispatch('setUserToken', token)
            resolve(token)
          })
        })
        .catch(error => {
          reject(error)
          commit('LOGGING_IN', false)
        });
    })
  },
  setUserToken({ commit }, payload) {
    commit('SET_USER_TOKEN', payload)
  },
  setPushNotificationToken({ commit }, payload) {
    commit('SET_NOTIFICATION_TOKEN', payload)
  },
  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  },

  setConnection({ commit }, payload) {
    commit('SET_CONNECTION', payload)
  },

  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      firebase.logout()
      dispatch('setUserToken', null)
      resolve()
    })
  }
}
