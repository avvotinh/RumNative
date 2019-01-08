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

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";
import RoundButton from '../components/buttons/RoundButton'
import Login from './Login'

let snackbar = new SnackBar();

export default {
  components: {
    RoundButton
  },
  data() {
    return {
      msg: "Hello Native Script Vue!!!",
      collection: this.$firebase.firestore.collection("tasks")
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
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
      console.log('Login with facebook')
    },
    handleCreateAccount () {
      this.$navigateTo(Login)
    }
  },
  mounted() {
    console.log(this.loading);
    this.collection.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    });
    this.$axios
      .get("https://randomuser.me/api/?seed=1&page=1&results=20")
      .then(res => {
        console.log(this.loading);
        console.log(res);
      })
      .catch(e => console.log(e));
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
  padding-right: 20
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
