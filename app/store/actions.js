import firebase from 'nativescript-plugin-firebase'
import Vue from 'nativescript-vue'

export default {
  login({ commit, dispatch }, payload) {
    commit('LOGGING_IN', true)
    return new Promise((resolve, reject) => {
      Vue.prototype.$firebase
        .login({
          type: Vue.prototype.$firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: "vanhop.pt@gmail.com",
            password: "12345qwe"
          }
        })
        .then(result => {
          Vue.prototype.$firebase.getAuthToken({
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
  loginFB({ commit, dispatch }) {
    commit('LOGGING_IN', true)
    return new Promise((resolve, reject) => {
      Vue.prototype.$firebase.login({
        type: Vue.prototype.$firebase.LoginType.FACEBOOK,
        facebookOptions: {
          scope: ["public_profile", "email"]
        }
      }).then(
        result => {
          console.log(JSON.stringify(result));
          Vue.prototype.$firebase.getAuthToken({
            forceRefresh: true
          }).then(token => {
            commit('LOGGING_IN', false)
            dispatch('setUserToken', token)
            resolve(token)
          })
        },
        errorMessage => {
          reject(errorMessage)
          commit('LOGGING_IN', false)
        }
      );
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
