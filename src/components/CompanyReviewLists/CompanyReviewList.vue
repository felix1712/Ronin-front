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
			}
		},

	};
</script>