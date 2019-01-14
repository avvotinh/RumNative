const state = {
  sideDrawer: false
}

const mutations = {
  setSideDrawer (state, data) {
    state.sideDrawer = data
  }
}

const getters = {
  sideDrawer: (state) => state.sideDrawer
}

export default {
  state,
  mutations,
  getters
}