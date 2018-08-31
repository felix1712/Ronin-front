<template lag="pug" src="./index.pug"></template>

<script>
	import { service } from '@/api/main-service';
	import ButtonFooter from './shared/button-footer/ButtonFooter.vue';
	import Datepicker from 'vuejs-datepicker';

	export default{
		name: 'createReview',
		data() {
			return {
				reviewStep: 1,
				editReview: 0,
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
				dataReview: {
					titles: null,
					description: null,
					members: [],
					//form questionare
					template: {
						is_new: 0,
						name: 'Chec',
						select_type: 'non-predefined',
						uuid: '07869262-adb1-4a53-848d-1cbaf6e24859',
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
				review:{
					deadline: 14,
				},
			}
		},

		methods: {
      dropDownPosition(e){
        e.target.offsetParent.lastChild.style.position="absolute"
        e.target.offsetParent.lastChild.style.left=-e.clientY/3+'px'
      },

      reviewedSelectMemberId() {
      	this.selectedMembers = this.selectReviewedMembers.map(function(data) {
      		return data.id
      	});

      	this.addMember();
      },

			editReviewStep1() {
				this.reviewStep = 1;
			},

			editReviewStep2() {
				this.reviewStep = 2;
			},

			editReviewStep3() {
				this.reviewStep = 3;
			},

			changeReviewDue() {
				const getStartDate = new Date(this.dataReview.review_start_date);
				const dueValue = parseInt(this.review.deadline);
				if (dueValue >= 1 && dueValue <= 30) {
					this.dataReview.review_end_date = getStartDate.setDate(getStartDate.getDate() + dueValue);
				}
			},

			changeStartDate(e) {
				const getStartDate = new Date(e);
				const dueValue = parseInt(this.review.deadline);
				this.dataReview.review_end_date = getStartDate.setDate(getStartDate.getDate() + dueValue);
			},

			addMember() {
				// console.log(this.selectedMembers);
				this.selectedMembers.forEach(function (value) {
					const addMembers = {
						user_id: value,
						reviewers: null,
						is_self_review: 0,
						is_sequent: 0,
					};
					const checkDataArr = this.dataReview.members.filter(function (item) {
						return item.user_id == value;
					});

					if (!checkDataArr.length) {
						this.dataReview.members.push(addMembers);
					}
				}.bind(this));
			},

			removeMember(value) {
				// console.log(this.selectedMembers);
				const intValue = parseInt(value);
				this.dataReview.members = this.dataReview.members.filter(function (item) { 
					return item.user_id !== intValue;
				});
			},

			changeMemberSelectedType(e) {
				if(e.target.value != 1){
					this.dataReview.members = [];
					this.selectedMembers = [];
					this.selectReviewedMembers = [];
				} else {
					this.selectedMembers = this.allSelectedMember;
					this.addMember();
				}
			},  

			checkboxMember(e) {
				if (e.target.checked === true) {
          this.addMember();
          e.currentTarget.closest("label").classList.remove('not-checked')
				} else {
					this.removeMember(e.target.value);
					e.currentTarget.closest("label").classList.add('not-checked')
				}
			},

			templateChanges(e) {
				if(e.target.checked == true){
					e.currentTarget.classList.add('is-checked')
				} else {
					e.currentTarget.classList.remove('is-checked')
				}
			},

			setReviewer(data) {
				this.dataReview.members.forEach(function(item) {
					item.reviewers = [];
					data.forEach(function (value) {
						if (item.user_id == value.id) {
							item.reviewers = value.reviewers;
						}
					})
				});
			},

			getReviewer() {
				const user_ids = [];
				this.dataReview.members.forEach(function (data) {
					user_ids.push(data.user_id);
				});
				service.post('getreviewers', {
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
				this.moreReviewerSelect = this.moreReviewerSelect.filter(function(item){
					return item.id != data.user_id
				});
				// const checkCurrentReviewer = [];
				
				// data.reviewer.forEach(function(arr){
				// 	checkCurrentReviewer = arr.user_id;
				// });

				// this.moreReviewerSelect = this.moreReviewerSelect.filter(function(item){
				// 	return item.id != checkCurrentReviewer.user_id
				// })
			},

			addReviewer(data) {
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
		    	Array.prototype.push.apply(data,getDataReviewer);
		    }

		    this.moreReviewerMember = [];
			},

			changeReviewMehtod(e) {
				this.getReviewer();
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.reviewStep+=1;
						this.editReview+=1;
					}
				});
			},

			submitFormReview() {
				const templateReview = {
					is_new: 0,
					name: 'Chec',
					new_name: '',
					select_type: 'non-predefined',
					uuid: '07869262-adb1-4a53-848d-1cbaf6e24859',
					categories: [
						{
							name: 'apaja',
							description: 'asd',
							is_weight: 0,
							weight: 0,
							questions: [
								{
									name: 'apaja',
									description: 'asa',
									is_weight: 0,
									weight: 0,
									can_comment: 0,
									answer_type: 'rating',
									ratings: [
										{
											value: 1,
											description: 'asd',
										}
									]
								}
							] 
						}
					],
				};

			 	this.dataReview.members.forEach(function(data){
					if(data.reviewers.length > 0){
						var result = data.reviewers.map(item => item.id);
						data.reviewers = result;
						return data;
					}
				})

				service.post('createreview',{
					name: this.dataReview.titles,
					description: this.dataReview.description,
					is_repeat: this.dataReview.is_repeat,
					repeat_every: this.dataReview.repeat_every,
					review_start_date: this.dataReview.review_start_date,
					review_end_date: this.dataReview.review_end_date,
					review_method: this.dataReview.review_method,
					members: this.dataReview.members,
					question_set: templateReview,
				})
				.then(response => {
					// console.log(response.data);
					this.$router.push('/');
					this.$toastr('success', 'Review has been created');
				})
				.catch(e => {
					console.log(e);
				}); 
			},
		},
		components: {
			ButtonFooter,
			Datepicker,
		},

		created() {
			// set review end date
			this.dataReview.review_end_date = new Date(this.dataReview.review_end_date.setDate(this.dataReview.review_end_date.getDate() + this.review.deadline));

			service.get('organizations')
			.then(response => {
        this.selectedOrganization = response.data.contents.organizations.map(function(test){
          return{
            id: test.id,
            name: test.name
          }
        });
        this.selectedOrganizationMember = response.data.contents.organizations;
				// console.log(this.selectedOrganization)
			})
			.catch(e => {
				this.errors.push(e);
			});

			service.get('employee')
			.then(response => {
				this.employeeMember = response.data.contents.users;
				this.reviewedMember = response.data.contents.users.map(function(member){
					return{
						id: member.id,
						name: member.user.name
					}
				})

				this.allSelectedMember = response.data.contents.users.map(function(member){
					return member.id
				})
				this.selectedMembers = this.allSelectedMember;
				this.addMember();

				this.moreReviewerSelect = response.data.contents.users.map(function(member){
					return{
						id: member.id,
						name: member.user.name
					}
				})
				// console.log(response.data);
			})
			.catch(e => {
				this.errors.push(e);
			});

			service.get('jobposition')
			.then(response => {
        this.selectedJobTitle = response.data.contents.job_positions.map(function(test){
          return{
            id: test.id,
            name: test.title
          }
        });

				this.selectedJobTitleMember = response.data.contents.job_positions;
				// console.log(response.data);
			})
			.catch(e => {
				this.errors.push(e);
			});
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
