<template>
  <FlexboxLayout flexDirection="column">
    <Label :text="label" class="label-input-group" :color="color"/> 
    <TextField 
      v-model="inputVal"
      class="input-field" 
      :color="color"
      :borderBottomColor="color"
      :hint="hint"
      :keyboardType="keyboardType"
      :returnKeyType="returnKeyType"
      :autocorrect="autocorrect"
      :secure="secure"
      :maxLength="maxLength"
      @focus="focus"
      @blur="blur"
      @returnPress="returnPress"
      @textChange="textChange"
    />
  </FlexboxLayout>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: 'Label'
    }, 
    color: {
      type: String,
      default: 'white'
    },
    keyboardType: {
      type: String,
    },
    returnKeyType: {
      type: String
    },
    hint: {
      type: String,
      default: ''
    },
    autocorrect: {
      type: Boolean,
      default: false
    },
    secure: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: Infinity
    },
  },
  data() {
    return {
      inputVal: this.value
    }
  },
   watch: {
    inputVal(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    focus() {
      this.$emit('focus')
    },
    blur(){
      this.$emit('blur')
    },
    returnPress() {
      this.$emit('returnPress')
    },
    textChange() {
      this.$emit('textChange')
    }
  }
}
</script>
<style scoped>
.label-input-group {
  font-size: 14;
  font-weight: 500;
  margin-bottom: 10
}
.input-field {
  border-bottom-width: 1;
  padding-top: 5;
  padding-bottom: 10
}
</style>



