<template lang="pug" src="./index.pug"></template>

<script>
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
	};
</script>