<template>
  <Page
    :actionBarHidden="true"
    androidStatusBarBackground="#008388"
    :backgroundSpanUnderStatusBar="true"
  >
    <ScrollView orientation="vertical">
      <StackLayout orientation="vertical">
        <Image
          src="~/assets/images/airbnb-logo.png"
          height="60"
          width="60"
          marginTop="50"
          horizontalAlignment="left"
        />
        <Label
          text="Welcome to Airbnb"
          marginTop="40"
          marginBottom="40"
          fontSize="30"
          fontWeight="600"
          color="white"
        />
        <RoundButton
          text="Login with Facebook"
          icon="fa-facebook"
          textColor="#008388"
          background="#fff"
          @tap="handleLoginFacebook"
        />
        <RoundButton
          marginTop="20"
          text="Create Account"
          textColor="white"
          @tap="handleCreateAccount"
        />
        <StackLayout orientation="horizontal">
          <MDButton
            class="fa btn-icon"
            rippleColor="rgba(255,255,255,0.2)"
            :text="'fa-user' | fonticon"
            elevation="0"
            variant="flat"
            color="white"
          />
          <MDButton
            class="fa btn-icon"
            rippleColor="rgba(255,255,255,0.2)"
            :text="'fa-facebook' | fonticon"
            elevation="0"
            variant="flat"
            color="white"
          />
          <MDButton
            class="fa btn-icon"
            backgroundColor="rgba(0,0,0,0.12)"
            rippleColor="rgba(255,255,255,0.2)"
            :text="'fa-bell' | fonticon"
            elevation="0"
            variant="flat"
            color="white"
          />
          <MDButton
            class="fa btn-icon"
            backgroundColor="rgba(255,0,0,0.4)"
            rippleColor="rgba(255,255,255,0.2)"
            :text="'fa-trash' | fonticon"
            elevation="0"
            variant="flat"
            color="white"
          />
        </StackLayout>
        <StackLayout orientation="vertical" v-for="item in items" :key="item.name">
          <ProgressBar class="progressbar" :value="item.progress" marginTop="20"/>
          <!-- <MDProgress :value="item.progress"></MDProgress> -->
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";
import RoundButton from "../components/buttons/RoundButton";
import ProgressBar from "../components/progress";
import Login from "./Login";

let snackbar = new SnackBar();
const timer = require("tns-core-modules/timer");

export default {
  components: {
    RoundButton,
    ProgressBar
  },
  data() {
    return {
      interval: {},
      msg: "Hello Native Script Vue!!!",
      collection: this.$firebase.firestore.collection("tasks"),
      items: this.itemsList()
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  watch: {
    items: {
      immediate: true,
      handler(val, olVal) {
        console.log(val);
      }
    }
  },
  methods: {
    itemsList() {
      let itemList = [];
      let items = [
        {
          name: "item 1",
          value: 5,
          seconds: this.$moment.duration(0)
        },
        {
          name: "item 2",
          value: 3,
          seconds: this.$moment.duration(0)
        },
        {
          name: "item 3",
          value: 10,
          seconds: this.$moment.duration(0)
        }
      ];
      for (let item of items) {
        let miliseconds = 0;
        let seconds = this.$moment.duration(0)
        let progress =
          Math.round(((item.seconds.asMinutes() * 100) / item.value) * 2) / 2;
        let value = {
          name: item.name,
          value: item.value,
          miliseconds: miliseconds,
          seconds: seconds,
          progress: progress,
          interval: {}
        };
        itemList.push(value);
      }
      return itemList;
    },
    onShowSnackBar() {
      let options = {
        actionText: "actionText",
        actionTextColor: "#ff4081", // Optional, Android only
        snackText: "snackText",
        textColor: "#346db2", // Optional, Android only
        hideDelay: 3500,
        backgroundColor: "#eaeaea", // Optional, Android only
        maxLines: 3, // Optional, Android Only
        isRTL: false // Optional, Android Only
      };

      snackbar.action(options).then(args => {
        if (args.command === "Action") {
          console.log(JSON.stringify(args));
          this.set("jsonResult", JSON.stringify(args));
        } else {
          console.log(JSON.stringify(args));
          this.set("jsonResult", JSON.stringify(args));
        }
      });
    },
    handleLoginFacebook() {
      console.log("Login with facebook");
    },
    handleCreateAccount() {
      this.$navigateTo(Login);
    },
    countdown(item, value) {
      item.interval = timer.setInterval(() => {
        if (item.progress >= 100) {
          timer.clearInterval(item.interval);
        }
        let miliseconds = item.miliseconds;
        miliseconds += 1000;
        this.$set(item, "miliseconds", miliseconds);
        item.seconds = this.$moment.duration(item.miliseconds);
        item.progress =
          Math.round(((item.seconds.asMinutes() * 100) / item.value) * 2) / 2;
      }, 1000);
      console.log(item)
    }
  },
  mounted() {
    this.$axios
      .get("https://randomuser.me/api/?seed=1&page=1&results=20")
      .then(res => {
        console.log(this.loading);
        console.log(res);
      })
      .catch(e => console.log(e));
    console.log(this.items);
    for (let item of this.items) {
      this.countdown(item, item.value);
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

ScrollView {
  background-color: #008388;
}

StackLayout {
  padding-left: 20;
  padding-right: 20;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
