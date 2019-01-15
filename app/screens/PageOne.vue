<template>
  <Page>
    <ActionBar title="Search" class="action-bar"></ActionBar>
    <StackLayout>
      <Button text="Loading Modal" @tap="showLoading"/>
      <LottieView
        src="data.json"
        width="500"
        height="500"
        @loaded="animationLoaded"
        loop="true"
        autoplay="true"
        @tap="handleButton"
      />
      <LottieView
        src="loading.json"
        width="100"
        @loaded="animationLoaded"
        loop="true"
        autoplay="true"
        @tap="handleButton"
      />
      <Button text="play" @tap="playAnimation"/>
      <Button text="stop" @tap="stopAnimation"/>
    </StackLayout>
  </Page>
</template>

<script>
import { LottieView } from "nativescript-lottie";
import sideDrawer from "~/mixins/sideDrawer";
import Loading from "~/components/loading";

const timer = require("tns-core-modules/timer");
export default {
  mixins: [sideDrawer],
  data() {
    return {
      animation: null,
      speed: 1,
      progress: 0,
      text: "Hello Page One!"
    };
  },
  methods: {
    showLoading() {
      this.$showModal(Loading);
    },
    animationLoaded(event) {
      this.animation = event.object;
      if (this.animation.isAnimating()) {
        this.animation.cancelAnimation();
      } else {
        this.animation.playAnimation();
      }
      // console.log(this.animation.progress);
    },
    playAnimation() {
      this.animation.playAnimation();
    },
    stopAnimation() {
      this.animation.cancelAnimation();
    },
    handleButton(event) {}
  },
  mounted() {}
};
</script>

<style lang="css">
</style>