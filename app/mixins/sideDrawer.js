export default {
  data () {
    return {
      gesturesEnabled: false
    }
  },
  computed: {
    drawerElement () { return (this.$refs && this.$refs.drawer) || null },
    drawer: {
      get () { return this.$store.getters.sideDrawer },
      set (val) { return this.$store.commit('setSideDrawer', val) }
    }
  },
  watch: {
    drawer (val) {
      if (this.drawerElement) {
        return val ?
          this.drawerElement.nativeView.showDrawer() :
          this.drawerElement.nativeView.closeDrawer()
      }
    }
  },
  methods: {
    openDrawer () {
      this.drawer = true
    },
    closeDrawer () {
      this.drawer = false
    }
  }
}