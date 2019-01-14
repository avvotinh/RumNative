export default {
  SET_AUTH (state, payload) {
    state.isAuthenticated = payload;
  },

  LOGGING_IN (state, payload) {
    state.logging_in = payload;
  },
  
  SET_NOTIFICATION_TOKEN(state, payload){
    state.notification_token = payload
  },

  SET_USER (state, {user}) {
    state.user = user;
    state.logging_in = false;
  },
  CLEAR_USER (state, payload) {
    state.user = null
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_CONNECTION (state, payload) {
    state.connection.type = payload.type
    state.connection.status = payload.status
  },
}
