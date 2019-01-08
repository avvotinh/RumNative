import Vue from 'nativescript-vue'
import App from './screens/App'
import Login from './screens/Login'
import Home from './screens/Home'
import VueDevtools from 'nativescript-vue-devtools'
import RadListView from 'nativescript-ui-listview/vue';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

import Firebase from './plugins/firebase'
import Axios from './plugins/axios'
import store from './store'

/**
 * Import Material Component
 */
import { Button } from 'nativescript-material-button'
import { Ripple } from 'nativescript-material-ripple'
import { FloatingActionButton } from 'nativescript-material-floatingactionbutton'
import { TextField } from 'nativescript-material-textfield'
import { CardView } from 'nativescript-material-cardview'
import { Slider } from 'nativescript-material-slider'
import { Progress } from 'nativescript-material-progress'
import { ActivityIndicator } from 'nativescript-material-activityindicator'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools, { host: '192.168.31.166' })
}
// Prints Vue logs when --en v.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

// Load Font
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './fonts/font-awesome.min.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

// Use Plugin
Vue.use(Firebase) 
Vue.use(Axios)
Vue.use(RadListView);

/**
 * Register Element Material Component
 */
Vue.registerElement('MDButton', () => Button)
Vue.registerElement('MDRipple',() => Ripple)
Vue.registerElement('MDFloatingActionButton', () => FloatingActionButton);
Vue.registerElement('MDTextField', () => TextField);
Vue.registerElement('MDCardView', () => CardView);
Vue.registerElement('MDSlider', () => Slider);
Vue.registerElement('MDProgress', () => Progress);
Vue.registerElement('MDActivityIndicator', () => ActivityIndicator);

new Vue({
  render: h => h('frame', [h(Home)]),
  store
}).$start()
