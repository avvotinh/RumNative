<template>
  <FlexboxLayout flexDirection="column">
    <Label :text="label" class="label-input-group" :color="color"/>
    <GridLayout ref="input-group" class="input" columns="*, 30">
      <TextField
        col="0"
        v-model="inputVal"
        ref="input"
        class="input-field"
        :color="color"
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
      <Label
        col="1"
        ref="mark"
        class="fa check-mark"
        verticalAlignment="middle"
        horizontalAlignment="center"
        fontSize="18"
        :color="color"
        :text="'fa-check' | fonticon"
      />
    </GridLayout>
  </FlexboxLayout>
</template>
<script>
const timer = require("tns-core-modules/timer");

export default {
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default: "Label"
    },
    color: {
      type: String,
      default: "white"
    },
    keyboardType: {
      type: String
    },
    returnKeyType: {
      type: String
    },
    hint: {
      type: String,
      default: ""
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
    showCheckmark: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputVal: this.value
    };
  },
  watch: {
    inputVal: {
      deep: true,
      handler(val, oldVal) {
        this.$emit("input", newVal);
      }
    }
  },
  methods: {
    focus(event) {
      this.$emit("focus", event);
    },
    blur(event) {
      this.$emit("blur", event);
    },
    returnPress(event) {
      this.$emit("returnPress", event);
    },
    textChange(event) {
      this.$emit("textChange", event);
    }
  },

  mounted() {
    if (this.autofocus) {
      timer.setTimeout(() => {
        let input = this.$refs.input.nativeView;
        input.focus();
      }, 600);
    }
  }
};
</script>
<style scoped>
TextField {
  border-bottom-width: 1;
  border-bottom-color: transparent;
}
.input {
  border-bottom-width: 1;
  border-bottom-color: white;
}

.focus-input {
  border-bottom-width: 1;
  border-bottom-color: red;
}
.label-input-group {
  font-size: 14;
  font-weight: 500;
  margin-bottom: 10;
}
.input-field {
  padding-top: 5;
  padding-bottom: 10;
}
.check-mark {
  transform: scale(0, 0);
}
</style>



