<template>
  <Page>
    <ActionBar title="Search" class="action-bar"></ActionBar>
    <StackLayout>
      <Button text="closeModal()" @tap="closeModal"/>

      <LottieView/>
    </StackLayout>
  </Page>
</template>

<script>
import sideDrawer from "~/mixins/sideDrawer";
export default {
  mixins: [sideDrawer],
  data() {
    return {
      text: "Hello Page One!"
    };
  },
  methods: {
    closeModal() {
      this.$modal.close();
    }
  }
};
</script>

<style lang="css">
</style>