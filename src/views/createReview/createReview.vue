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
				selectedOrganiztionMethod: null,
				selectedOrganiztionChecked: null,
				selectedOrganization: null,
				employeeMember: null,
				selectedJobTitle: null,
				memberJobTitle: null,
				getReviewerData: null,
				checkboxOrganization: [],
				checkboxJobTitle: [],
				user_ids: null,
				getReviewerMember: {},
				selectedMembers: [],
				dataReview: {
					name: null,
					description: null,
					members: [],
					//form questionare
					template: {
						is_new: 0,
						name: 'Chec',
						new_name: '',
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
      check(e){
        // debugger
        e.target.offsetParent.lastChild.style.position="absolute"
        e.target.offsetParent.lastChild.style.left=-e.clientY/3+'px'
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

			changeMemberSelectedType() {
				this.dataReview.members = [];
				this.selectedMembers = [];
			},  

			changeSelectedOrganization(e) {
				this.selectedOrganiztionMethod = e.target.value;
				this.selectedOrganiztionChecked = e.target.checked;
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

			changeReviewMehtod(e) {
				// this.user_ids = this.dataReview.members
			},

			addMember() {
				this.selectedMembers.forEach(function (value) {
					const addMembers = {
						user_id: value,
						reviewer: null,
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
				const intValue = parseInt(value);
				this.dataReview.members = this.dataReview.members.filter(function (item) { 
					return item.user_id !== intValue;
				});
			},

			checkboxMember(e) {
				if (e.target.checked === true) {
					this.addMember();
				} else {
					 this.removeMember(e.target.value);
				}
			},

			setReviewer(data) {
				this.dataReview.members.forEach(function(item) {
					item.reviewer = [];
					data.forEach(function (value) {
						if (item.user_id == value.id) {
							item.reviewer = value.reviewers;
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

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.reviewStep+=1;
						this.editReview+=1;
					}
				});


				if (this.reviewStep === 3) {
					this.getReviewer();
				}
			},

			submitFormReview() {
				const templateReview = {
					is_new: 0,
					name: 'Chec',
					new_name: '',
					select_type: 'non-predefined',
					uuid: '07869262-adb1-4a53-848d-1cbaf6e24859',
					categories: [],
				};
				const dataMember = {
					members: [
						{ user_id: 70340, reviewers: [70337], is_self_review: 0, is_sequent: 0 },
						{ user_id: 70339, reviewers: [70337], is_self_review: 0, is_sequent: 0 },
					],
				};
				service.post('createreview',{
					name: this.dataReview.name,
					description: this.dataReview.description,
					is_repeat: this.dataReview.is_repeat,
					repeat_every: this.dataReview.repeat_every,
					review_start_date: this.dataReview.review_start_date,
					review_end_date: this.dataReview.review_end_date,
					review_method: this.dataReview.review_method,
					members: dataMember.members,
					template: templateReview,
				})
				.then(response => {
					console.log(response.data);
					this.$toastr('success', 'Review has been created');
					this.$router.push('/');
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
				this.selectedOrganization = response.data.contents.organizations;
				// console.log(this.selectedOrganization)
			})
			.catch(e => {
				this.errors.push(e);
			});

			service.get('employee')
			.then(response => {
				this.employeeMember = response.data.contents.users;
				// console.log(response.data);
			})
			.catch(e => {
				this.errors.push(e);
			});

			service.get('jobposition')
			.then(response => {
				this.selectedJobTitle = response.data.contents.job_positions;
				// console.log(response.data);
			})
			.catch(e => {
				this.errors.push(e);
			});
		},
	};
</script>
