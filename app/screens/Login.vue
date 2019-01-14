<template>
  <Page
    :actionBarHidden="true"
    androidStatusBarBackground="#008388"
    :backgroundSpanUnderStatusBar="true"
  >
    <ScrollView orientation="vertical">
      <StackLayout orientation="vertical">
        <Label
          class="fa"
          :text="'fa-chevron-left' | fonticon"
          marginTop="40"
          fontSize="24"
          fontWeight="600"
          color="white"
          @tap="goBack"
        />
        <Label
          text="Login"
          marginTop="25"
          marginBottom="40"
          fontSize="30"
          fontWeight="600"
          color="white"
        />
        <LabelTextField
          ref="email"
          v-model="user.email"
          color="white"
          label="Email Address"
          keyboardType="email"
          returnKeyType="next"
        />
        <LabelTextField
          v-model="user.password"
          color="white"
          label="Password"
          :secure="true"
          returnKeyType="done"
          marginTop="40"
        />
        <RoundButton
          text="Login"
          textColor="#008388"
          marginTop="40"
          background="#fff"
          @tap="login"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
import LabelTextField from "../components/form/LabelTextField";
import RoundButton from "../components/buttons/RoundButton";
import Home from "./Home";

const timer = require("tns-core-modules/timer");

export default {
  components: {
    LabelTextField,
    RoundButton
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    goBack() {
      this.$navigateBack();
    },
    login() {
      // if (!this.user.email || !this.user.password) {
      //   alert("Please provide both an email address and password.");
      //   return;
      // }
      // alert("Please provide both an email address and password.");

      let payload = {
        user: this.user.email,
        password: this.user.password
      };

      this.$store.dispatch("login", payload).then(token => {
        this.$storage.setString("token", JSON.stringify(token));
        this.$navigateTo(Home);
      });
      // this.$firebase
      //   .login({
      //     type: this.$firebase.LoginType.PASSWORD,
      //     passwordOptions: {
      //       email: "vanhop.pt@gmail.com",
      //       password: "12345qwe"
      //     }
      //   })
      //   .then(result => {
      //     console.log(JSON.stringify(result));
      //     this.$navigateTo(Home);
      //   })
      //   .catch(error => console.log(error));
    }
  },
  mounted() {
    let emailView = this.$refs.email.nativeView;
    timer.setTimeout(() => {
      emailView.focus();
    }, 500);
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
</style>
