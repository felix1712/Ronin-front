<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
	import axios from 'axios';
	import ButtonFooter from './shared/button-footer/ButtonFooter.vue';
	// Form component
	import FormReviewInformation from '@/components/FormReviews/FormReviewInformations/FormReviewInformation.vue';
	import FormReviewQuestion from '@/components/FormReviews/FormReviewQuestions/FormReviewQuestion.vue';
	import FormReviewSchedule from '@/components/FormReviews/FormReviewSchedules/FormReviewSchedule.vue';

	export default{
		name: 'CompanyReviewCreate',
		data() {
			return {
				reviewStep: 1,
				editReview: 0,
				isTemplateReview: false,
				maxCharacters: 50,
				reviewedMethod: 1,
				selectedOrganiztionMethod: null,
				selectedOrganiztionChecked: null,
				selectedOrganization:[],
				selectedOrganizationMember: null,
				employeeMember: null,
				reviewedMember: [],
				selectedJobTitle: [],
				selectedJobTitleMember: null,
				selectedJobTitleChecked: null,
				memberJobTitle: null,
				getReviewerData: null,
				checkboxOrganization: [],
				checkboxJobTitle: [],
				user_ids: null,
				getReviewerMember: {},
				allSelectedMembers: [],
				selectedMembers: [],
				selectReviewedMembers: [],
				moreReviewerMember: [],
				moreReviewerSelect:[],
				templates: null,
				templateDetails: null,
				selectedTemplate: '',
				api: null,
				weightReviewers: 100,
				asd: null,
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

			setReviewer(data) {
				this.dataReview.members.forEach(item => {
					item.reviewers = [];
					data.forEach(function (value) {
						if (item.user_id == value.id) {
							if(value.reviewers.length > 0){
								value.reviewers.map(function(items){
									items.is_weight = Math.floor(100 / value.reviewers.length);
                  const checkWeightRemaining = item.weightRemaining - items.is_weight;
                  if(checkWeightRemaining > 0 && checkWeightRemaining < 5){
                    items.is_weight = items.is_weight + checkWeightRemaining;
                    item.weightRemaining = item.weightRemaining - items.is_weight;
                  } else {
                    item.weightRemaining = checkWeightRemaining;
                  }
								})
							}
							item.reviewers = value.reviewers;
						}
					})
				});
			},

			getReviewer() {
				const user_ids = [];
				this.dataReview.members.forEach(data => {
					user_ids.push(data.user_id);
				});
				this.api.post('getreviewers', {
					user_ids: user_ids,
					review_method: this.dataReview.review_method,
				})
				.then(response => {
					this.getReviewerData = response.data.contents.mapping_reviewers;
					this.setReviewer(this.getReviewerData);
				})
				.catch(e => {
					this.errors.push(e)
				});
			},

			setOptionReviewer(data) {
				this.moreReviewerSelect = this.reviewedMember;
				this.moreReviewerSelect = this.moreReviewerSelect.filter(item =>{
					return item.id != data.user_id
				});

				if(data.reviewers) {
					this.moreReviewerSelect = this.moreReviewerSelect.filter(arr => {
						return !data.reviewers.some(arr2 =>{
				        return arr.id === arr2.id;
				    });
					})
				}
			},

			addReviewer(data, data2, data3) {
				const getDataReviewer = this.employeeMember.filter(function(item){
					return item.user_id == this.moreReviewerMember.id
				}.bind(this))
				var found = false;
				for (var i = 0, len = data.length; i < len; i++) {
					for (var j = 0, len2 = getDataReviewer.length; j < len2; j++) {
						if (data[i].user_id === getDataReviewer[j].user_id) {
							var found = true;
						}
					}
				}

				if(!found){
					if(data2 && data2.id){
						getDataReviewer[0].is_weight = 0;
					}
					Array.prototype.push.apply(data,getDataReviewer);
				}

				this.moreReviewerMember = [];
			},

			changeReviewMehtod(e) {
				this.dataReview.members.forEach(data=>{
					data.is_self_review = 0;
					data.is_sequent = 0;
          data.weightRemaining = 100;
				})

				const user_ids = [];
				this.dataReview.members.forEach(data => {
					user_ids.push(data.user_id);
				});
				this.api.post('getreviewers', {
					user_ids: user_ids,
					review_method: event.target.value,
				})
				.then(response => {
					this.getReviewerData = response.data.contents.mapping_reviewers;
					this.setReviewer(this.getReviewerData);
				})
				.catch(e => {
					this.errors.push(e)
				});
			},

			removeReviewer(data, item){
				let getDataDelete = this.dataReview.members.filter(arr=> arr.user_id == data.user_id)[0];
				getDataDelete.reviewers = getDataDelete.reviewers.filter(arr=>{
					return arr.id != item.id;
				})

				this.weightRemaining(item, data);
			},

			selfReview(data){
				if(event.target.checked == true){
					const dataSelfReviewer = this.employeeMember.filter(function(e){
						return e.id == data.user_id
					})
					Array.prototype.unshift.apply(data.reviewers,dataSelfReviewer);
				} else {
					data.reviewers = data.reviewers.filter(item => {
						return item.id != data.user_id
					})
				}
			},

			weightRemaining(data, data2){
				if(data.is_weight <= 100 ){
					data2.weightRemaining = 100;
					let weightCount = data2.reviewers.map(e => {
            if(e.is_weight){
              return parseInt(e.is_weight)
            } else {
              return 0;
            }
          }).reduce(function(acc, val) { return acc + val; }, 0)
					data2.weightRemaining =  data2.weightRemaining - weightCount;
				}

				if(data2.weightRemaining < 0){
					this.$toast.open({
						message: 'Weight remaining out of limit',
						type: 'is-danger'
					})

					data2.weightRemaining = data2.weightRemaining + parseInt(data.is_weight);
					data.is_weight = 0;
				}
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
				this.$validator.validateAll().then((result) => {
					const reviewerExist = this.dataReview.members.map(function(data){
						return Object.keys(data.reviewers).length != 0;
					}).includes(false);

					if(reviewerExist){
						this.$toast.open({
							duration: 1500,
							message: 'Reviewer must be filled .',
							position: 'is-top',
							type: 'is-danger'
						})
					}

          let sumWeights = this.dataReview.members.map(data =>{
            if(data.reviewers){
              return data.reviewers.map(e =>{ 
                if(e.is_weight){
                  return parseInt(e.is_weight);
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
						this.dataReview.members.map(data => {
							if(data.reviewers){
								const result = data.reviewers.map(item => item.id);
								data.reviewers = result;
								return data
							}
						});

						this.api.post('createreview', {
							description: this.dataReview.description,
							name: this.dataReview.titles,
							is_repeat: this.dataReview.is_repeat,
							repeat_every: this.dataReview.repeat_every,
							review_start_date: this.dataReview.review_start_date,
							review_end_date: this.dataReview.review_end_date,
							review_method: this.dataReview.review_method,
							members: this.dataReview.members,
							question_set: this.dataReview.template,
						})
						.then(response => {
							if(response.data.status_code == 200){
								this.$toast.open({
									duration: 10000,
									message: 'Your create review cycle has been successfully created!',
									position: 'is-top',
									type: 'is-success'
								})
							}else{
								this.$toast.open({
									duration: 10000,
									message: 'Your create review cycle has been failed to be created. Please try again to save it!',
									position: 'is-top',
									type: 'is-danger'
								})
							}

							this.$router.push('/');
						})
						.catch(e => {
							console.log(e);
						});
					}
				});
			},
		},
		components: {
			FormReviewInformation,
			FormReviewQuestion,
			FormReviewSchedule,
			ButtonFooter,
		},

		created() {
			this.$emit(`update:layout`, MainLayouts);
		},

		mounted() {
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

				this.api.get('review/organizations',)
				.then(response => {
					this.selectedOrganization = response.data.data.map(data => {
						return{
							id: data.attributes.id,
							name: data.attributes.name
						}
					});
					this.selectedOrganizationMember = response.data.data;
					// console.log(this.selectedOrganization)
				})
				.catch(e => {
					// this.errors.push(e);
				});

				this.api.get('review/members')
				.then(response => {
					this.employeeMember = response.data.data;
					this.reviewedMember = response.data.data.map(member => {
						return{
							id: member.attributes.id,
							name: member.attributes.name
						}
					})

					this.allSelectedMembers = response.data.data.map(member => {
						return member.attributes.id
					})
					this.selectedMembers = this.allSelectedMembers;
					this.addMember();

					this.moreReviewerSelect = response.data.data.map(member => {
						return{
							id: member.attributes.id,
							name: member.attributes.name
						}
					})
					// console.log(response.data);
				})
				.catch(e => {
					// this.errors.push(e);
				});

				this.api.get('review/job_positions')
				.then(response => {
					this.selectedJobTitle = response.data.data.map(data => {
						return{
							id: data.attributes.id,
							name: data.attributes.title,
						}
					});

					this.selectedJobTitleMember = response.data.data;
					// console.log(response.data);
				})
				.catch(e => {
					// this.errors.push(e);
				});

				this.api.get('review/template')
				.then(response => {
					this.templates = response.data.data;
					this.getDetailTemplate(this.selectedTemplate);
				})
				.catch(e =>{
					// console.log(e);
				});

			}
		},

		watch: {
			reviewStep() {
				if(this.reviewStep == 4){
					this.getReviewer();
				}
			},
		},
	};
</script>
