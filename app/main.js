import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

import * as setting from 'tns-core-modules/application-settings'
import VMoment from "vue-moment";
import Connectivity from './plugins/connectivity'
import Firebase from './plugins/firebase'
import Axios from './plugins/axios'
import store from './store'
import routes from '~/router'

// Import Components
import RadListView from 'nativescript-ui-listview/vue';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

/**
 * Import Material Components
 */
import { Button } from 'nativescript-material-button'
import { Ripple } from 'nativescript-material-ripple'
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton'
import { TextField } from 'nativescript-material-textfield'
import { CardView } from 'nativescript-cardview'
import { Slider } from 'nativescript-material-slider'
import { Progress } from 'nativescript-material-progress'
import { ActivityIndicator } from 'nativescript-material-activityindicator'
import { LottieView } from 'nativescript-lottie'

// Import drawer componets
import Layout from '~/layout'
import Drawer from '~/components/drawer'

// Import root component


if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.31.166' })
}
// Prints Vue logs when --en v.production is *NOT* set while building
Vue.config.silent = true

// Load Font
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './fonts/font-awesome.min.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

// Use Plugin
Vue.use(Connectivity)
Vue.use(VMoment)
Vue.use(Firebase)
Vue.use(Axios)
Vue.use(RadListView);
Vue.prototype.$routes = routes
Vue.prototype.$storage = setting

/**
 * Register Element Material Component
 */
Vue.registerElement('RadSideDrawer', () => RadSideDrawer)
Vue.registerElement('MDButton', () => Button)
Vue.registerElement('MDRipple', () => Ripple)
Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton);
Vue.registerElement('MDTextField', () => TextField);
Vue.registerElement('CardView', () => CardView);
Vue.registerElement('MDSlider', () => Slider);
Vue.registerElement('MDProgress', () => Progress);
Vue.registerElement('MDActivityIndicator', () => ActivityIndicator);
Vue.registerElement('LottieView', () => LottieView)

let token = setting.getString('token')

new Vue({
  data() {
    return {
      networkStatus: "",
    }
  },
  render: h => {
    return h(
      Layout,
      [
        h(Drawer, { slot: 'drawerContent' }),
        h(token ? routes.Home : routes.LoggedOut, { slot: 'mainContent' })
      ]
    )
  },
  store
}).$start()
