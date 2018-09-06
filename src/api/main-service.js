import axios from 'axios';
import Vue from 'vue';

var services = new Vue()

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

export const loginService = axios.create({
  baseURL: process.env.VUE_APP_OLD_API_URL,
});


export const service = axios.create({
  baseURL: process.env.VUE_APP_OLD_API_URL,
  headers: {
    Authorization: services.$cookie.get('AuthPrfrm'),
  },
});
