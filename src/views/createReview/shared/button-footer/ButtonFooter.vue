<template lang="pug" src="./index.pug"></template>

<script>
export default {
  name: 'ButtonFooter',
 	data(){
		return {
			reviewStep: 1
		}
	},
  methods: {
  	prevReviewStep() {

      // this.reviewStep--;
    },
    nextReviewStep() {
      // this.reviewStep++;
      debugger
    },
    submit() {
      // alert('Submit to blah and show blah and etc.');
    }
	  },
};
</script>