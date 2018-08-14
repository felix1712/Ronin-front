<template lag="pug" src="./index.pug"></template>

<script>
	import {service} from '@/api/main-service';
	import ButtonFooter from './shared/button-footer/ButtonFooter.vue';

	export default{
		name:'createReview',
		data(){
			return {
				reviewStep: 1,
				editReview: 0
			}
		},

		methods: {
			editReviewStep1() {
				this.reviewStep = 1
			},

			editReviewStep2() {
				this.reviewStep = 2
			},

			editReviewStep3() {
				this.reviewStep = 3
			},
		},
		components: {
			ButtonFooter
		}


		
	};
</script>