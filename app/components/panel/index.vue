<template>
  <GridLayout columns="5, *" rows="auto" @loaded="loaded" ref="main" class="main-panel">
    <StackLayout v-if="!doing" col="0" class="border-panel"></StackLayout>
    <StackLayout col="1" class="content-panel" paddingRight="8">
      <StackLayout
        @tap="toggle"
        :class="`cp-header ${showPanel ? 'opened' : 'closed'}`"
        :paddingBottom="doing ? 0 : 16"
      >
        <GridLayout columns="*, auto" rows="auto">
          <StackLayout col="0" paddingLeft="16" paddingRight="8">
            <Label class="cp-title" :text="item.name" verticalAlignment="center"/>
            <Label class="cp-description" text="Số lượng: 5" verticalAlignment="center"/>
            <Label
              class="cp-description"
              text="Thời gian order: 5 phút trước"
              verticalAlignment="center"
            />
          </StackLayout>
          <AbsoluteLayout col="1" paddingLeft="8" paddingRight="8">
            <MDButton
              top="8"
              left="0"
              class="btn-rounded"
              fontWeight="500"
              backgroundColor="#00C9FF"
              rippleColor="rgba(0,0,0,0.08)"
              verticalAlignment="center"
              horizontalAlignment="center"
              :text="doing ? `Hoàn thành` : `Nhận`"
              elevation="0"
              variant="flat"
            />
          </AbsoluteLayout>
        </GridLayout>
        <GridLayout columns="*, 40" rows="auto" paddingRight="8" paddingLeft="16">
          <GridLayout col="0">
            <Label
              class="cp-description"
              text="Enim similique dolorem ad ratione sit beatae aut modi quia. Quis aut porro odio. Optio provident quae dolore vel aperiam maiores quam perferendis."
              verticalAlignment="center"
              :textWrap="descriptionWrap"
            />
          </GridLayout>
          <GridLayout col="1">
            <Label
              ref="caret"
              horizontalAlignment="right"
              color="#607D8B"
              marginRight="8"
              fontSize="24"
              class="fa"
              :text="'fa-caret-right' | fonticon"
            />
          </GridLayout>
        </GridLayout>
      </StackLayout>
      <GridLayout ref="panel" class="cp-panel" v-show="showPanel" rows="auto">
        <slot class="slot"></slot>
      </GridLayout>
      <ProgressBar v-if="doing" class="progressbar" value="50" marginTop="20"/>
    </StackLayout>
  </GridLayout>
</template>

<script>
import * as enums from "ui/enums";
import ProgressBar from "../progress";
import { Animation } from "../../plugins/animation";
import { Easing } from "@tweenjs/tween.js";

const timer = require("tns-core-modules/timer");

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    },
    doing: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ProgressBar
  },
  data() {
    return {
      item: this.data,
      showPanel: true,
      descriptionWrap: true,
      fixedHeight: 0,
      icon: "fa-caret-down"
    };
  },
  methods: {
    loaded() {
      if (this.fixedHeight === 0) {
        timer.setTimeout(() => {
          let panel = this.$refs.panel.nativeView;
          let height = panel.getActualSize().height;
          this.fixedHeight = height;
          if (this.fixedHeight !== 0) {
            panel.style.height = 0;
            this.showPanel = !this.showPanel;
            this.descriptionWrap = !this.descriptionWrap;
          }
        }, 0);
      }
    },
    toggle() {
      let view = this.$refs.panel.nativeView;
      let caret = this.$refs.caret.nativeView;
      if (this.showPanel) {
        new Animation({
          height: this.fixedHeight
        })
          .to(
            {
              height: 0
            },
            500
          )
          .easing(Easing.Back.In)
          .onUpdate(obj => {
            view.originY = 0;
            view.scaleY = obj.height / this.fixedHeight;
            view.height = obj.height;
            caret.style.rotate = (obj.height / this.fixedHeight) * 90;
          })
          .start()
          .onComplete(() => {
            this.showPanel = !this.showPanel;
            this.descriptionWrap = !this.descriptionWrap;
          });
      } else {
        this.showPanel = !this.showPanel;
        this.descriptionWrap = !this.descriptionWrap;
        new Animation({
          height: 0
        })
          .to(
            {
              height: this.fixedHeight
            },
            500
          )
          .easing(Easing.Back.Out)
          .onUpdate(obj => {
            view.originY = 0;
            view.scaleY = obj.height / this.fixedHeight;
            view.height = obj.height;
            caret.style.rotate = (obj.height / this.fixedHeight) * 90;
          })
          .start();
      }
    }
  }
};
</script>
<style scoped>
.main-panel {
  border-radius: 5;
  background-color: white;
}
.content-panel {
  border-radius: 5;
}
.border-panel {
  border-top-left-radius: 5;
  border-bottom-left-radius: 5;
  background-image: linear-gradient(to bottom, #69f0ae, #00c853);
}
/* .cp-header {
  border-top-right-radius: 5;
} */
/* .cp-header.closed {
  border-bottom-right-radius: 5;
}
.cp-header.opened {
  border-bottom-right-radius: 0;
} */
.cp-title {
  font-size: 20;
  color: #212121;
  font-weight: 500;
  padding-top: 8;
  padding-bottom: 4;
}
.cp-description {
  font-size: 16;
  color: #607d8b;
}
.cp-panel {
  padding: 10;
  background-color: white;
  color: black;
}
</style>
