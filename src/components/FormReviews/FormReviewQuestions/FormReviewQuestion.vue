<template lang="pug" src="./index.pug"></template>

<script>
	import axios from 'axios';
	import Loader from '@/components/Loaders/Loader.vue';
	import ButtonFooter from '@/views/CompanyReviewCreates/shared/button-footer/ButtonFooter.vue';
	export default{
		name: 'FormReviewQuestion',

		data() {
			return {
				isLoading: true,
				templates: null,
				templateDetails: null,
				selectedTemplate: '',
				//post data
				question_set: {
					title: '',
					categories_attributes:[],
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
				this.apiTemplate();
			}
		},

		methods: {
			// api template
			apiTemplate(){
				this.api.get('review/template')
				.then(response => {
					if(response.data.data.token){
						this.token = response.data.data.token;
						this.refresh = response.data.data.refreshToken;
						this.$cookie.set('AuthToken', 'Bearer '+this.token);
						this.$cookie.set('AuthRefresh', 'Bearer '+this.refresh);
						this.apiTemplate();
					} else {
						this.templates = response.data.data;
						this.selectedTemplate = this.templates[0].attributes.id;
						this.getDetailTemplate(this.selectedTemplate);
						this.isLoading=false;
					}
				})
				.catch(e =>{
					this.$toast.open({
						duration: 1500,
						message: "Internal Server Error",
						position: 'is-top',
						type: 'is-danger'
					})
					this.isLoading=false;
				});
			},

			// function template
			getDetailTemplate(data) {
				this.api.get('review/template/'+data )
				.then(response => {
					this.templateDetails = this.$normalize.deserialize(response.data);
				})
				.catch(e =>{
					console.log(e);
				});
			},

			dropDownPosition(e){
				let iconDelete = e.target;
				e.target.offsetParent.lastChild.style.position="absolute"
				// e.target.offsetParent.lastChild.style.left=-e.clientY/2.1+'px'
			},

			deleteTemplate(data, index){
				this.api.delete('review/template/'+ data)
				.then(response => {
					this.templates.splice(index, 1);
					this.$toast.open({
						message: response.data.contents,
						type: 'is-success'
					})
				})
				.catch(e =>{
					this.$toast.open({
						message: e.response.data.messages,
						type: 'is-danger'
					})
				});
			},

			setTemplate() {
				this.question_set.title = this.templateDetails.title;
				this.templateDetails.category_templates.data.forEach((arr) => {
					const detailCategories = {
						title: arr.title,
						description: arr.description,
						use_weight: arr.use_weight,
						weight: arr.weight,
						question_attributes:[],
						questions:[],
					};

					this.question_set.categories_attributes.push(detailCategories);

					arr.question_templates.data.forEach(arr2 => {
						const questionAttributes = {
							title: arr2.title,
							description: arr2.description,
							use_weight: arr2.use_weight,
							weight: arr2.weight,
							kind:arr2.kind,
							rating_attributes:[],
							questions:[],
						};

						let question = "";
						if(arr2.kind == "rating"){
							arr2.rating_templates.data.forEach(arr3 => {
								const ratingAttributes = {
									// value: arr3.value,
									description: arr3.description,
								}

								questionAttributes.rating_attributes.push(ratingAttributes);

								question ={
									value: arr3.value,									
								};
								questionAttributes.questions.push(question);

							});

							// detailCategories.questions.push(question);
						};


						detailCategories.question_attributes.push(questionAttributes);

					});
				});
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.setTemplate();
						this.$emit('questionSave', {question_set: this.question_set})
					}
				});
			},
		},

		components: {
			Loader,
			ButtonFooter
		}
	};
</script>