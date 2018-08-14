<template lang="pug" src="./index.pug"></template>

<script>
export default {
	name: 'ButtonFooter',
	data(){
		return {
		}
	},
	methods: {
    nextReviewStep() {
      this.$parent.reviewStep++;
      this.$parent.editReview++;
    },
    submit() {
      // alert('Submit to blah and show blah and etc.');
    }
	},
};
</script>