<template lang="pug" src="./index.pug"></template>

<script>
	import UserProfileList from '@/components/UserProfiles/UserProfileLists/UserProfileList.vue';
	import ProgressBar from '@/components/ProgressBars/ProgressBar.vue';
	
	export default{
		name: 'DetailBody',
		props: {
			detailCompanyReview: {
				
			},
			detailCompanyReviewMember:{

			}
		},

		components:{
			UserProfileList,
			ProgressBar
		},
	};
</script>