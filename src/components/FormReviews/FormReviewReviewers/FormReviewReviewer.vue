<template lang="pug" src="./index.pug"></template>

<script>
	import SelectReviewer from './shared/SelectReviewers/SelectReviewer.vue';
	export default{
		name: 'FormReviewReviewer',
		props: {
			members_attributes: {
				type: Array,
			}
		},

		data() {
			return{
				review_method_get: 'direct-report',
				form: {
					review_method: 'direct-report',
				}
			}
		},

		methods: {
			changeReviewMehtod(event){
				this.members_attributes.forEach(data=>{
					data.is_self_review = 0;
					data.is_sequent = 0;
					data.weightRemaining = 100;
				})
				if(event.target.value == "direct-report"){
					this.form.review_method = event.target.value;
					this.review_method_get = 'direct-report';
				} else if (event.target.value == "manager-review"){
					this.form.review_method = event.target.value;
					this.review_method_get = 'manager-review';
				} else if(event.target.value == '360'){
					this.form.review_method = event.target.value;
					this.review_method_get = 'threesixty';
				}

				this.$refs.SelectReviewerChild.$data.review_method_get = this.review_method_get;

				this.$refs.SelectReviewerChild.getReviewer();
			},
		},

		mounted(){
			this.$refs.SelectReviewerChild.getReviewer();
		},

		components: {
			SelectReviewer,
		}
	};
</script>