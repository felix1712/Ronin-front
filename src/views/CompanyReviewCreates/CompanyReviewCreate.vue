<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
	import axios from 'axios';
	// Form component
	import FormReviewInformation from '@/components/FormReviews/FormReviewInformations/FormReviewInformation.vue';
	import FormReviewQuestion from '@/components/FormReviews/FormReviewQuestions/FormReviewQuestion.vue';
	import FormReviewSchedule from '@/components/FormReviews/FormReviewSchedules/FormReviewSchedule.vue';
	import FormReviewReviewer from '@/components/FormReviews/FormReviewReviewers/FormReviewReviewer.vue';

	export default{
		name: 'CompanyReviewCreate',
		data() {
			return {
				reviewStep: 1,
				editReview: 1,
				api: null,
				dataLoaded: false,
				dataReview: {
					titles: '',
					description: '',
					members_attributes: [],
					//form questionare
					question_set: null,
					// form schedule
					is_repeat: 0,
					repeat_every: 0,
					review_start_date: new Date(),
					review_end_date: new Date(),
					//form reviewer
					review_method: 'direct-report',
				},
			}
		},

		methods: {
			informationSave(data){
				this.dataReview.titles = data.title;
				this.dataReview.description = data.description;
				this.dataReview.members_attributes = data.members_attributes;
				this.dataLoaded = true;
				if(this.reviewStep == 1){
					this.reviewStep+=1;
				}
				if(this.editReview < 2 ){
					this.editReview+=1;
				}
			},

			questionSave(data){
				this.dataReview.question_set = data.question_set;
				if(this.reviewStep == 2){
					this.reviewStep+=1;
				}
				if(this.editReview < 3 ){
					this.editReview+=1;
				}
			},

			scheduleSave(data){
				this.dataReview.is_repeat = data.is_repeat;
				this.dataReview.repeat_every = data.repeat_every;
				this.dataReview.review_start_date = data.start_date;
				this.dataReview.review_end_date = data.end_date;
				if(this.reviewStep == 3){
					this.reviewStep+=1;
				}
				if(this.editReview < 4 ){
					this.editReview+=1;
				}
			},

			editReviewStep(data) {
				if(data == 1){
					this.dataLoaded = false;
				}
				this.$validator.validateAll().then((result) => {
					if (result) {
						if(this.reviewStep == 1){
							this.$refs.FormInformation.validateBeforeSubmit();
						} else if(this.reviewStep == 4){
							
						}
						this.reviewStep = data;
					}
				});
			},

			showSaveDraft(){
				if(this.dataReview.titles){
					this.$toast.open({
						duration: 3000,
						message: 'Review has been successfully saved as draft.',
						position: 'is-top',
						type: 'is-success'
					})

					this.$router.push('/');
				} else {
					this.$toast.open({
						duration: 3000,
						message: 'Title must be filled.',
						position: 'is-top',
						type: 'is-danger'
					})
				}
			},

			submitFormReview() {
				const checkToken = this.$cookie.get('AuthToken');
				const checkRefreshToken = this.$cookie.get('AuthRefresh');
				if(checkToken != null && checkRefreshToken != null){
					this.api = axios.create({
						baseURL: process.env.VUE_APP_API,
						headers: {
							Authorization: this.$cookie.get('AuthToken'),
							Refresh: this.$cookie.get('AuthRefresh'),
						},
					});
					this.$validator.validateAll().then((result) => {
						const reviewerExist = this.dataReview.members_attributes.map(function(data){
							return Object.keys(data.reviewers_attributes).length != 0;
						}).includes(false);

						if(reviewerExist){
							this.$toast.open({
								duration: 1500,
								message: 'Reviewer must be filled .',
								position: 'is-top',
								type: 'is-danger'
							});
						}

						let sumWeights = this.dataReview.members_attributes.map(data =>{
							if(data.reviewers_attributes){
								return data.reviewers_attributes.map(e =>{ 
									if(e.weight){
										return parseInt(e.weight);
									} else {
										return 0
									}
								})
							} else {
								return 0;
							}
						});

						sumWeights = sumWeights[0];
						if(sumWeights.length <= 1 && sumWeights[0] == 0){
							sumWeights =  100;
						} else {
							sumWeights = sumWeights.reduce(function(acc, val) { return acc + val; }, 0)
						}

						let checkWeight = true;

						if(sumWeights == 100){
							checkWeight =  true;
						} else {
							checkWeight = false;
						}

						if(!checkWeight){
							this.$toast.open({
								duration: 1500,
								message: 'Total reviewer weight must be at 100%.',
								position: 'is-top',
								type: 'is-danger'
							})
						}

						if (result && !reviewerExist && checkWeight) {
							this.api.post('/review/company-review', {
								description: this.dataReview.description,
								title: this.dataReview.titles,
								is_repeat: this.dataReview.is_repeat,
								repeat_every: this.dataReview.repeat_every,
								review_start_date: this.dataReview.review_start_date,
								review_end_date: this.dataReview.review_end_date,
								review_method: this.dataReview.review_method,
								members_attributes: this.dataReview.members_attributes,
								question_set: this.dataReview.question_set,
							})
							.then(response => {
								console.log(response.data);
								if(response.data.status == 200){
									this.$toast.open({
										duration: 10000,
										message: response.data.data,
										position: 'is-top',
										type: 'is-success'
									})
								}else{
									this.$toast.open({
										duration: 10000,
										message: response.data.data,
										position: 'is-top',
										type: 'is-danger'
									})
								}

								this.$router.push({name:'CompanyReview'});
							})
							.catch(e => {
								console.log(e);
							});
						}
					});
				}
			},
		},
		components: {
			FormReviewInformation,
			FormReviewQuestion,
			FormReviewSchedule,
			FormReviewReviewer,
		},

		created() {
			this.$emit(`update:layout`, MainLayouts);
		},
	};
</script>
