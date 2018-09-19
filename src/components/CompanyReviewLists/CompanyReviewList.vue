<template lang="pug" src="./index.pug"></template>

<script>
	import ProgressBar from '@/components/ProgressBars/ProgressBar.vue';
	export default{
		name: 'CompanyReviewList',
		props: {
			listCompanyReview: {
				type: Array
			},
			listCompanyIncluded: {
				type: Array
			},

			normalizeData: {
				type: Array
			},

			normalizeDataMember: {
				type: Array
			},

			normalizeDataReviewer: {
				type: Array
			},

			normalizeDataUser: {
				type: Array
			}
		},

		computed: {
      totalReviewList: function () {
      	if(this.normalizeData){
        	return this.normalizeData.length;
      	}
      },
    },

    components: {
    	ProgressBar,
    }
	};
</script>