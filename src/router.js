import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/home.vue';
import auth from './views/auth/auth.vue';
import SignUp from './views/SignUp/SignUp.vue';
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
			name: 'login',
			component: auth,
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp,
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
			path: '/preview-template',
			name: 'PreviewTemplate',
			component: PreviewTemplate,
		},
	],
});
