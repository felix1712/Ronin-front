<template lang="pug" src="./index.pug"></template>

<script>
import ButtonFooter from '@/views/createReview/shared/button-footer/ButtonFooter.vue';
import Datepicker from 'vuejs-datepicker';
	export default{
		name: 'FormReviewSchedule',
		props:{

		},

		data() {
			return {
				schedule:{
					is_repeat: 0,
					repeat_every: 0,
					review_start_date: new Date(),
					review_end_date: new Date(),
				},
				deadline: 14,
			}
		},

		methods: {
			changeReviewDue() {
				const getStartDate = new Date(this.schedule.review_start_date);
				const dueValue = parseInt(this.deadline);
				if (dueValue >= 1 && dueValue <= 30) {
					this.schedule.review_end_date = getStartDate.setDate(getStartDate.getDate() + dueValue);
				}
			},

			changeStartDate(e) {
				const getStartDate = new Date(e);
				const dueValue = parseInt(this.deadline);
				this.schedule.review_end_date = getStartDate.setDate(getStartDate.getDate() + dueValue);
			},

			isRepeat(e){
				if(e.target.value == 1){
					this.schedule.repeat_every = 1;
				} else {
					this.schedule.repeat_every = 0;
				}
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.$emit('scheduleSave', {
							is_repeat: this.schedule.is_repeat, 
							start_date: this.schedule.review_start_date, 
							end_date:this.schedule.review_end_date
						})
						this.$parent.reviewStep+=1;
						this.$parent.editReview+=1;
					}
				});
			},
		},

		mounted() {
			//set init end date
			this.schedule.review_end_date = new Date(this.schedule.review_end_date.setDate(this.schedule.review_end_date.getDate() + this.deadline));
		},

		components:{
			ButtonFooter,
			Datepicker,
		}
	};
</script>