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
          :autofocus="true"
          label="Email Address"
          @focus="emailFocus"
          @textChange="handleEmailChange"
          :showCheckmark="valid.user"
          keyboardType="email"
          returnKeyType="next"
        />
        <LabelTextField
          v-model="user.password"
          color="white"
          label="Password"
          :secure="true"
          @textChange="handlePasswordChange"
          :showCheckmark="valid.password"
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
import Loading from "~/components/loading";
import Home from "./Home";

const timer = require("tns-core-modules/timer");
const enums = require("tns-core-modules/ui/enums");

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
      },
      valid: {
        email: false,
        password: false
      }
    };
  },
  computed: {
    isLogging() {
      return this.$store.state.logging_in;
    }
  },
  watch: {
    isLogging: {
      deep: true,
      handler(val, oldVal) {
        if (val) {
          this.$showModal(Loading);
        } else {
          this.$modal.close("Loading");
        }
      }
    }
  },
  methods: {
    goBack() {
      this.$navigateBack();
    },
    handleEmailChange(e) {
      let val = e.object.text;
      let emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(emailCheckRegex.test(val));
      if (emailCheckRegex.test(val)) this.valid.email = true;
    },
    handlePasswordChange(e) {
      let val = e.object.text;
      let strongCheckRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      let mediumCheckRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

      if (strongCheckRegex.test(val)) {
        console.log("Mat khau manh");
      } else if (mediumCheckRegex.test(val)) {
        console.log("Mat khau trung binh");
      } else {
        console.log("Mat khau yeu");
      }
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
        this.$navigateTo(Home, {
          animated: true,
          transition: {
            name: "slideLeft",
            duration: 250,
            curve: "easeIn"
          },
          clearHistory: true
        });
      });
    }
  },
  mounted() {}
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
.text-input {
  border-radius: 100;
  padding-left: 15;
  padding-right: 15;
  padding-bottom: 15;
  padding-top: 15;
  margin-top: 10;
  border-width: 1;
  border-color: white;
}
</style>
