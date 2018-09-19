<template lang="pug" src="./index.pug"></template>

<script>
	import UserProfileTop from '@/components/UserProfiles/UserProfileTops/UserProfileTop.vue';
	import ProgressBar from '@/components/ProgressBars/ProgressBar.vue';

	export default {
		name: 'DetailHeader',
		props: {
			detailCompanyReview: {

			},
		},

		components: {
			UserProfileTop,
			ProgressBar
		}
	};
</script>