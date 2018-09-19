<template lang="pug" src="./index.pug"></template>

<script>
	import ProgressBar from '@/components/ProgressBars/ProgressBar.vue';
	export default{
		name: 'CompanyReviewList',
		props: {
			listCompanyReview: {
				type: Array
			},
		},

		computed: {
      totalReviewList: function () {
      	if(this.listCompanyReview){
        	return this.listCompanyReview.length;
      	}
      },
    },

    components: {
    	ProgressBar,
    }
	};
</script>