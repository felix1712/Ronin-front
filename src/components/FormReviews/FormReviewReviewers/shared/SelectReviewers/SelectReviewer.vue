<template lang="pug" src="./index.pug"></template>

<script>
	import axios from 'axios';
	import Loader from '@/components/Loaders/Loader.vue';
	export default{
		name: 'SelectReviewer',
		props: {
			members_attributes: {
				type: Array,
			},
		},

		data(){
			return {
				isLoading: true,
				review_method_get: 'direct-report',
				moreReviewerSelect:[],
				employeeMember: null,
				api: null,
				// data to parent
				moreReviewerMember: [],
				form: {
					members_attributes: [],
				}
			}
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

				this.apiReviewerMembers();
			}
		},

		methods: {
			// api get reviewer
			apiReviewerMembers(){
				this.api.get('review/members')
				.then(response => {
					if(response.data.data.token){
						this.token = response.data.data.token;
						this.refresh = response.data.data.refreshToken;
						this.$cookie.set('AuthToken', 'Bearer '+this.token);
						this.$cookie.set('AuthRefresh', 'Bearer '+this.refresh);
						this.apiReviewerMembers();
					} else {
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

						this.moreReviewerSelect = response.data.data.map(member => {
							return{
								id: member.attributes.id,
								name: member.attributes.name
							}
						})
						this.loadingHide();
						// console.log(response.data);
					}
				})
				.catch(e => {
					// this.errors.push(e);
				});
			},

			// function set reviewer
			setReviewer(data, data2) {
				if(data2.length > 0){
					data.weightRemaining = 100;
					data2.forEach((value, key, arr) => {
						value.attributes.weight = Math.floor(100 / data2.length);
						value.attributes.is_self_review = 0;
						value.attributes.user_id = value.attributes.id;
						data.weightRemaining = parseInt(data.weightRemaining) - parseInt(value.attributes.weight);
						if(data.weightRemaining > 0 && data.weightRemaining < 5){
						 	if (Object.is(arr.length - 1, key)) {
						 		value.attributes.weight += data.weightRemaining;
						 		data.weightRemaining -= data.weightRemaining;
				      }
						}
						data.reviewers_attributes = arr.map( e => {return e.attributes});
					})
				} else {
					data.reviewers_attributes = [];
				}
			},

			getReviewer(){
				this.members_attributes.forEach(data => {
					this.api.get('review/reviewer/'+this.review_method_get + '/' +data.user_id)
					.then(response => {
						const dataReviewer = response.data.data;
						this.setReviewer(data, dataReviewer);
						this.loadingHide();
					})
					.catch(e => {
						// this.errors.push(e);
					})
				});
			},

			setOptionReviewer(data) {
				this.moreReviewerSelect = this.reviewedMember;
				this.moreReviewerSelect = this.moreReviewerSelect.filter(item =>{
					return item.id != data.user_id
				});

				if(data.reviewers_attributes) {
					this.moreReviewerSelect = this.moreReviewerSelect.filter(arr => {
						return !data.reviewers_attributes.some(arr2 =>{
								return arr.id === arr2.id;
						});
					})
				}
			},

			addReviewer(data, data2, data3) {
				if(data2.id){
					const getDataReviewer = this.employeeMember.filter(item => {
						return item.attributes.id == this.moreReviewerMember.id
					}).map(item => {return item.attributes});
					var found = false;
					for (var i = 0, len = data.length; i < len; i++) {
						for (var j = 0, len2 = getDataReviewer.length; j < len2; j++) {
							if (data[i].id === getDataReviewer[j].id) {
								var found = true;
							}
						}
					}

					if(!found){
						if(data2 && data2.id){
							getDataReviewer[0].weight = 0;
							getDataReviewer[0].user_id = data2.id;
							getDataReviewer[0].is_self_review = 0;
						};
						// Array.prototype.push.apply(data,getDataReviewer);
						data.push(getDataReviewer[0]);
					};
					this.moreReviewerMember = [];
				}
			},

			removeReviewer(data, item){
				data.reviewers_attributes = data.reviewers_attributes.filter(value => {
					return value.id != item.id;
				})

				this.weightRemaining(item, data);
			},

			selfReview(data){
				if(event.target.checked == true){
					const dataSelfReviewer = this.employeeMember.filter(function(e){
						return e.attributes.id == data.user_id
					}).map(e => {
						e.attributes.user_id = e.attributes.id;
						e.attributes.is_self_review = 0;
						e.attributes.weight = 0;
						return e.attributes;
					});
					Array.prototype.unshift.apply(data.reviewers_attributes,dataSelfReviewer);
				} else {
					data.reviewers_attributes = data.reviewers_attributes.filter(item => {
						return item.id != data.user_id;
					})
				}
			},

			weightRemaining(data, data2){
				if(data.weight <= 100 ){
					data2.weightRemaining = 100;
					let weightCount = data2.reviewers_attributes.map(e => {
						if(e.weight){
							return parseInt(e.weight)
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

					data2.weightRemaining = data2.weightRemaining + parseInt(data.weight);
					data.weight = 0;
				}
			},

			loadingShow() {
				this.isLoading = true;
			},

			loadingHide() {
				this.isLoading = false;
			}
		},

		components: {
			Loader
		},
	};
</script>