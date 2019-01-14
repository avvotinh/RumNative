<template>
  <GridLayout :height="size" :columns="columns" class="progressbar">
    <StackLayout col="1" class="progressbar-value"></StackLayout>
  </GridLayout>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      default: '5'
    },
  },
  data() {
    return {
      columns: 0
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        console.log(val)
        this.columns = (100 - val) + "*," + val + "*"
      }
    }
  }
};
</script>
<style scoped>
.progressbar {
  background-image: linear-gradient(to right, #69F0AE , #00C853);
}
.progressbar-value {
  background: white;
}
</style>


