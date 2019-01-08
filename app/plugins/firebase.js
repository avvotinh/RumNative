import firebase from 'nativescript-plugin-firebase'
import { messaging } from "nativescript-plugin-firebase/messaging";
import store from '../store'

const VuePlugin = {
  install(Vue, options) {

    firebase.init({
      onMessageReceivedCallback: function (message) {
        console.log("Title: " + message.title);
        console.log("Body: " + message.body);
        console.log("Value of 'foo': " + JSON.stringify(message.data));
      },
      onPushTokenReceivedCallback: function (token) {
        console.log("Firebase push token: " + token);
      },
      showNotifications: true,
      showNotificationsWhenInForeground: true
    }).then(
      instance => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    ).catch(e => console.log(e))

    messaging.getCurrentPushToken()
      .then(token => {
        console.log(`Current push token: ${token}`)
        store.dispatch('setPushNotificationToken', token)
      });

    Vue.prototype.$firebase = firebase
  }
}

export default VuePlugin