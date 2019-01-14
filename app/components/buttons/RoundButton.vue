<template>
  <GridLayout
    columns="70, *, 70"
    rows="50"
    class="button-round"
    :backgroundColor="background"
    @tap="tap"
  >
    <Label
      class="icon fa"
      :color="textColor"
      :text="icon | fonticon"
      col="0"
      verticalAlignment="center"
      horizontalAlignment="center"
    />
    <Label
      class="btn-text"
      :color="textColor"
      :text="text"
      col="1"
      verticalAlignment="center"
      horizontalAlignment="center"
    />
  </GridLayout>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      default: "#000000"
    },
    background: {
      type: String,
      default: "transparent"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  data() {},
  methods: {
    tap() {
      this.$emit("tap");
    }
  }
};
</script>
<style scoped>
.button-round {
  border-radius: 100%;
  border-color: white;
  border-width: 2;
}
.icon {
  font-size: 18;
}
.btn-text {
  font-size: 18;
  font-weight: 600;
}
</style>


