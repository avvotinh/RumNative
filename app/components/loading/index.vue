<template>
  <GridLayout class="loading-modal">
    <LottieView src="loading.json" loop="true" autoplay="true" @loaded="loadingLoaded"/>
  </GridLayout>
</template>
<script>
export default {
  computed: {
    isLogging() {
      return this.$store.state.logging_in;
    }
  },
  methods: {
    loadingLoaded(event) {
      let loading = event.object;
      if (loading.isAnimating()) {
        loading.cancelAnimation();
      } else {
        loading.playAnimation();
      }
    }
  },
  mounted() {
    let vm = this;
    vm.$watch(
      "isLogging",
      (val, oldVal) => {
        this.$modal.close();
      },
      {
        deep: true
      }
    );
  }
};
</script>
<style scoped>
.loading-modal {
  width: 100;
  height: 100;
}
</style>

