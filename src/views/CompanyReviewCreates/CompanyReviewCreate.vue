<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
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
				editReview: 0,
				dataReview: {
					titles: '',
					description: '',
					members: [],
					//form questionare
					template:
					{
						is_new: 0,
						name: null,
						select_type: 'non-predefined',
						id: null,
						categories: [],
					},
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
				this.dataReview.members = data.members;
			},

			questionSave(data){
				this.dataReview.template.name = data.name;
				this.dataReview.template.id = data.id;
			},

			scheduleSave(data){
				console.log(data);
				this.dataReview.is_repeat = data.is_repeat;
				this.dataReview.repeat_every = data.repeat_every;
				this.dataReview.review_start_date = data.start_date;
				this.dataReview.review_end_date = data.end_date;
			},

			editReviewStep(data) {
				this.$validator.validateAll().then((result) => {
					if (result) {
						if(this.reviewStep == 1){
							this.addMember();
						} else if(this.reviewStep == 4){
							this.dataReview.members.forEach(data =>{
								data.weightRemaining = 100;
							})
						}
						this.reviewStep = data;
					}
				});
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						if(this.reviewStep == 1){
							this.addMember();
						} else if(this.reviewStep == 2){
							console.log(this.$child)
							this.$child.setTemplate();
						}
						this.reviewStep+=1;
						this.editReview+=1;
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
				console.log(this.dataReview);
				// this.$validator.validateAll().then((result) => {
				// 	const reviewerExist = this.dataReview.members.map(function(data){
				// 		return Object.keys(data.reviewers).length != 0;
				// 	}).includes(false);

				// 	if(reviewerExist){
				// 		this.$toast.open({
				// 			duration: 1500,
				// 			message: 'Reviewer must be filled .',
				// 			position: 'is-top',
				// 			type: 'is-danger'
				// 		})
				// 	}

				// 	let sumWeights = this.dataReview.members.map(data =>{
				// 		if(data.reviewers){
				// 			return data.reviewers.map(e =>{ 
				// 				if(e.is_weight){
				// 					return parseInt(e.is_weight);
				// 				} else {
				// 					return 0
				// 				}
				// 			})
				// 		} else {
				// 			return 0;
				// 		}
				// 	});

				// 	sumWeights = sumWeights[0];
				// 	if(sumWeights.length <= 1 && sumWeights[0] == 0){
				// 		sumWeights =  100;
				// 	} else {
				// 		sumWeights = sumWeights.reduce(function(acc, val) { return acc + val; }, 0)
				// 	}

				// 	let checkWeight = true;

				// 	if(sumWeights == 100){
				// 		checkWeight =  true;
				// 	} else {
				// 		checkWeight = false;
				// 	}

				// 	if(!checkWeight){
				// 		this.$toast.open({
				// 			duration: 1500,
				// 			message: 'Total reviewer weight must be at 100%.',
				// 			position: 'is-top',
				// 			type: 'is-danger'
				// 		})
				// 	}

				// 	if (result && !reviewerExist && checkWeight) {
				// 		this.dataReview.members.map(data => {
				// 			if(data.reviewers){
				// 				const result = data.reviewers.map(item => item.id);
				// 				data.reviewers = result;
				// 				return data
				// 			}
				// 		});

				// 		this.api.post('createreview', {
				// 			description: this.dataReview.description,
				// 			name: this.dataReview.titles,
				// 			is_repeat: this.dataReview.is_repeat,
				// 			repeat_every: this.dataReview.repeat_every,
				// 			review_start_date: this.dataReview.review_start_date,
				// 			review_end_date: this.dataReview.review_end_date,
				// 			review_method: this.dataReview.review_method,
				// 			members: this.dataReview.members,
				// 			question_set: this.dataReview.template,
				// 		})
				// 		.then(response => {
				// 			if(response.data.status_code == 200){
				// 				this.$toast.open({
				// 					duration: 10000,
				// 					message: 'Your create review cycle has been successfully created!',
				// 					position: 'is-top',
				// 					type: 'is-success'
				// 				})
				// 			}else{
				// 				this.$toast.open({
				// 					duration: 10000,
				// 					message: 'Your create review cycle has been failed to be created. Please try again to save it!',
				// 					position: 'is-top',
				// 					type: 'is-danger'
				// 				})
				// 			}

				// 			this.$router.push('/');
				// 		})
				// 		.catch(e => {
				// 			console.log(e);
				// 		});
				// 	}
				// });
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
