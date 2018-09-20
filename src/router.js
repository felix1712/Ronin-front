import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import auth from './views/auth/auth.vue';
import SignUp from './views/SignUp/SignUp.vue';
import SignIn from './views/SignIn/SignIn.vue';
import SignInSleekr from './views/SignInSleekrs/SignInSleekr.vue';
import ForgotPassword from './views/ForgotPassword/ForgotPassword.vue';
import Page404 from './views/Page404/Page404.vue';
import CompanyReviewCreate from './views/CompanyReviewCreates/CompanyReviewCreate.vue';
import ListReviews from './views/ListReviews/ListReviews.vue';
import ListReviewsTodo from './views/ListReviewsTodo/ListReviewsTodo.vue';
import ListReviewsGiven from './views/ListReviewsGiven/ListReviewsGiven.vue';
import CompanyReview from './views/CompanyReviews/CompanyReview.vue';
import CompanyReviewDetail from './views/CompanyReviewDetails/CompanyReviewDetail.vue';
import CompanyReviewSummary from './views/CompanyReviewSummary/CompanyReviewSummary.vue';
import PreviewTemplate from './components/PreviewTemplate/PreviewTemplate.vue';


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
			name: 'CompanyReviewCreate',
			component: CompanyReviewCreate,
		},
		{
			path: '/company',
			name: 'CompanyReview',
			component: CompanyReview,
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
			name: 'SignIn',
			component: SignIn,
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp,
		},
		{
			path: '/sign-in-sleekr',
			name: 'SignInSleekr',
			component: SignInSleekr,
		},
		{
			path: '/forgot-password',
			name: 'ForgotPassword',
			component: ForgotPassword,
		},
		{
			path: '/404',
			name: 'Page404',
			component: Page404,
		},
		{
			path: '/list-reviews',
			name: 'ListReviews',
			component: ListReviews,
		},
		{
			path: '/list-reviews-todo',
			name: 'ListReviewsTodo',
			component: ListReviewsTodo,
		},
		{
			path: '/list-reviews-given',
			name: 'ListReviewsGiven',
			component: ListReviewsGiven,
		},
		{
			path: '/company-review-detail/:id',
			name: 'CompanyReviewDetail',
			component: CompanyReviewDetail,
		},
		{
			path: '/company-review-summary',
			name: 'CompanyReviewSummary',
			component: CompanyReviewSummary,
		},
		{
			path: '/preview-template/:id',
			name: 'PreviewTemplate',
			component: PreviewTemplate,
		},
	],
});
