import axios from 'axios';
import Vue from 'vue';

export const loginService = axios.create({
  baseURL: process.env.VUE_APP_OLD_API_URL,
});
