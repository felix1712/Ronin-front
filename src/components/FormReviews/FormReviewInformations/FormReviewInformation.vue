<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios';
import ButtonFooter from '@/views/CompanyReviewCreates/shared/button-footer/ButtonFooter.vue';
	export default{
		name: 'FormReviewInformation',

		props: {
			title: {
				type: String,
				default: '',
			},

			description: {
				type: String,
				default: '',
			},

			members:{
				type: Array,
				default: () => []
			},
		},

		data() {
			return {
				//custom data
				maxCharacters: 50,
				reviewedMethod: 1,
				allSelectedMembers: [],
				selectedOrganization:[],
				selectedOrganiztionChecked: null,
				selectedOrganizationMember: null,
				selectedJobTitle: [],
				selectedJobTitleChecked: null,
				selectedJobTitleMember: null,
				reviewedMember: [],
				selectedMembers: [],
				selectReviewedMembers: [],
				employeeMember: null,
				//send data
				form :{
					title: this.title,
					description: this.description,
					members: this.members,
				}
			}
		},

		methods: {
			//global function
			changeMemberSelectedType(e) {
				if(e.target.value != 1){
					this.form.members = [];
					this.selectedMembers = [];
					this.selectReviewedMembers = [];
					this.selectedJobTitleChecked = [];
					this.selectedOrganiztionChecked = [];
				} else {
					this.selectedMembers = this.allSelectedMembers;
				}
			},

			addMember() {
				this.selectedMembers.forEach(function(value){
					const addMembers = {
						user_id: value,
						reviewers: null,
						is_self_review: 0,
						is_sequent: 0,
						weightRemaining: 100,
					};

					let checkDataArr = this.form.members.filter(item =>{
						return item.user_id == value;
					});

					if (!checkDataArr.length) {
						this.form.members.push(addMembers);
					}
				}.bind(this));
			},

			removeMember(value) {
				// console.log(this.selectedMembers);
				const intValue = parseInt(value);
				this.form.members = this.form.members.filter(item =>{
					return item.user_id !== intValue;
				});
			},

			checkboxMember(e) {
				if (e.target.checked === true) {
					e.currentTarget.closest("label").classList.remove('not-checked')
				} else {
					this.removeMember(e.target.value);
					e.currentTarget.closest("label").classList.add('not-checked')
				}
			},

			//select organization function
			selectOrganizationChecked(data) {
				if (data != null) {
					let getIdOrg = "";
					getIdOrg = data.map(item =>{
						return item.id
					});

					getIdOrg = getIdOrg[getIdOrg.length -1];

          let memberOrg = this.employeeMember.filter(e =>{
						return e.attributes.department_id == getIdOrg
					});

					memberOrg.map(function(item){
						if(this.selectedMembers.includes(item.attributes.id) == false){
							this.selectedMembers.push(item.attributes.id);
						}
					}.bind(this));
				}
			},

			deleteOrganizationSelect(id){
				this.selectedOrganiztionChecked = this.selectedOrganiztionChecked.filter(data =>{
					return data.id != id
				})

				let memberOrg = this.employeeMember.filter(e =>{
					return e.attributes.department_id == id;
				})

				memberOrg = memberOrg.map(data =>{
					return data.attributes.id;
				})

				this.selectedMembers = this.selectedMembers.filter(el =>{
					return memberOrg.indexOf( el ) < 0;
				});
			},

			selectEveryoneOrganization(data) {
				let memberOrg = this.employeeMember.filter(e =>{
					return e.attributes.department_id == data
				})

				memberOrg.map(function(item){
					if(this.selectedMembers.includes(item.attributes.id) == false){
						this.selectedMembers.push(item.attributes.id);
					}
				}.bind(this))
			},

			unselectEveryoneOrganization(data) {
				let memberOrg = this.employeeMember.filter(e =>{
					return e.attributes.department_id == data
				})

				memberOrg = memberOrg.map(data =>{
					return data.attributes.id
				})

				this.selectedMembers = this.selectedMembers.filter(el =>{
					return memberOrg.indexOf( el ) < 0;
				});
			},

			//select Job title function
			selectJobTitleChecked(data) {
				if(data != null){
					let getIdJobTitle = "";
					getIdJobTitle = data.map(item =>{
						return item.id
					});

					getIdJobTitle = getIdJobTitle[getIdJobTitle.length -1];

					let memberJobTitle = this.employeeMember.filter(e =>{
						return e.attributes.job_title_id == getIdJobTitle;
					})

					memberJobTitle.map(function(item){
						if(this.selectedMembers.includes(item.attributes.id) == false){
							this.selectedMembers.push(item.attributes.id);
						}
					}.bind(this));
				}
			},

			deleteJobTitleSelect(id){
				this.selectedJobTitleChecked = this.selectedJobTitleChecked.filter(data =>{
					return data.id != id
				})

				let memberJobTitle = this.employeeMember.filter(e =>{
					return e.attributes.job_title_id == id;
				})

				memberJobTitle = memberJobTitle.map(data =>{
					return data.attributes.id;
				})

				this.selectedMembers = this.selectedMembers.filter( el =>{
					return memberJobTitle.indexOf( el ) < 0;
				});
			},

			selectEveryoneJobTitle(data) {
				let memberJobTitle = this.employeeMember.filter(e =>{
					return e.attributes.job_title_id == data
				})

				memberJobTitle.map(function(item){
					if(this.selectedMembers.includes(item.attributes.id) == false){
						this.selectedMembers.push(item.attributes.id);
					}
				}.bind(this))
			},

			unselectEveryoneJobTitle(data) {
				let memberJobTitle = this.employeeMember.filter(e =>{
					return e.attributes.job_title_id == data;
				})

				memberJobTitle = memberJobTitle.map(data =>{
					return data.attributes.id;
				})

				this.selectedMembers = this.selectedMembers.filter(el =>{
					return memberJobTitle.indexOf( el ) < 0;
				});
			},

			//select specific staff function
			reviewedSelectMemberId() {
				this.selectedMembers = this.selectReviewedMembers.map(data =>{
					return data.id
				});
			},


			selectSpecificStaff(data) {
				let getIdSpecificStaff = "";
				getIdSpecificStaff = data.map(item =>{
					return item.id
				});

				getIdSpecificStaff.map(function(item){
					if(this.selectedMembers.includes(item) == false){
						this.selectedMembers.push(item)
					}
				}.bind(this));
			},

			unselectSpecificStaff() {
				this.selectedMembers = [];
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						if(this.reviewedMethod == 1 && this.selectedMembers.length == 0){
							if(this.allSelectedMembers.length > 0){
								this.selectedMembers = this.allSelectedMembers;
								this.addMember();
							}
						} else {
							this.addMember();
						}

						this.$emit('informationSave', {title: this.form.title, description: this.form.description, members: this.form.members})
						this.$parent.reviewStep+=1;
						this.$parent.editReview+=1;
					}
				});
			}
		},

		components: {
			ButtonFooter,
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

				this.api.get('review/organizations')
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
					console.log(this.employeeMember);
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
			}
		},

		computed: {
			charactersRemaining: function () {
				return this.maxCharacters - this.form.title.length;
			},
		},
	};
</script>