import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//Plugins
import VueCookie from 'vue-cookie';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// If you would like custom styling of the toastr the css file can be replaced
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'

Vue.use(VueCookie)
Vue.use(Buefy)
Vue.use(VeeValidate);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
