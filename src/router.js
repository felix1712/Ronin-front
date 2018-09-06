import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import auth from './views/auth/auth.vue';
import SignUp from './views/SignUp/SignUp.vue';
import SignIn from './views/SignIn/SignIn.vue';
import ForgotPassword from './views/ForgotPassword/ForgotPassword.vue';
import Page404 from './views/Page404/Page404.vue';
import createReview from './views/createReview/createReview.vue';
import Company from './views/company/Company.vue';
import CompanyReviewDetail from './views/CompanyReviewDetail/CompanyReviewDetail.vue';
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
			name: 'createReview',
			component: createReview,
		},
		{
			path: '/company',
			name: 'Company',
			component: Company,
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
			path: '/company-review-detail',
			name: 'CompanyReviewDetail',
			component: CompanyReviewDetail,
		},
		{
			path: '/company-review-summary',
			name: 'CompanyReviewSummary',
			component: CompanyReviewSummary,
		},
		{
			path: '/preview-template/:uuid',
			name: 'PreviewTemplate',
			component: PreviewTemplate,
		},
	],
});
