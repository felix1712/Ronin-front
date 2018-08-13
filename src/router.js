import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import auth from './views/auth/auth.vue';
import createReview from './views/createReview/createReview.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reviews/create-review',
      name: 'reviews',
      component: createReview,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: auth,
    },
  ],
});
