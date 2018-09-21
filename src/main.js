import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//Plugins
import VueCookie from 'vue-cookie';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import Buefy from 'buefy'
import Multiselect from 'vue-multiselect'
import VueSlideUpDown from 'vue-slide-up-down'
import { VueEditor } from "vue2-editor"
import Formatter from './assets/scripts/json-api-formatter.js';
import vueSlider from 'vue-slider-component/src/vue2-slider.vue'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// If you would like custom styling of the toastr the css file can be replaced
import 'vue-multiselect/dist/vue-multiselect.min.css'

Vue.use(VueCookie)
Vue.use(Buefy)
Vue.component('multiselect', Multiselect)
Vue.use(VeeValidate);
Vue.use(require('vue-moment'));
Vue.component('vue-slide-up-down', VueSlideUpDown)
const formatter = new Formatter();
Vue.prototype.$normalize = formatter;
Vue.config.productionTip = false;

Validator.localize({
  en: {
    custom: {
      // the field name
      email: {
        // the rules
        required: "Please enter your email address",
        email: "Your email does not look right"
      },
      title: {
      	required: "This field is mandatory.",
      	title: "Input title field with maximum of 50 characters."
      },
      select_reviewee: {
      	required: "This field is mandatory",
      },
      revieweeCheckbox: {
        required: "Staff to be reviewed",
      },
      loginEmail: {
        required: "This field is mandatory",
        email: "Your email does not look right"
      },
      loginPassword: {
        required: "This field is mandatory",
      },
      is_repeat_every: {
        required: "This field is mandatory",
        between: "This field is between 1 - 12",
      },
      review_due: {
        required: "This field is mandatory",
        between: "This field is between 1 - 30",
      },
      weight: {
        between: "This field is between 1 - 100",
      },
    }
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
