<template lang="pug" src="./index.pug"></template>

<script>
import ButtonFooter from '@/views/CompanyReviewCreates/shared/button-footer/ButtonFooter.vue';
	export default{
		name: 'FormReviewQuestion',
		props:{
			templates: {
				type: Array
			},
		},

		data() {
			return {
				selectedTemplate: '',
				templateDetails: null,
				//post data
				template: {
					id: null,
					name: '', 
				}
			}
		},

		methods: {
			getDetailTemplate(data) {
				this.$parent.api.get('review/template/'+data )
				.then(response => {
					this.templateDetails = response.data.data;
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
				this.$parent.api.delete('review/template/'+ data)
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
				if(this.templateDetails != null){
					this.template.name = this.templateDetails.attributes.title;
					this.template.id = this.templateDetails.attributes.id;
					// this.templateDetails.review_categories.forEach((arr) => {
					// 	const detailCategories = {
					// 		name: arr.name,
					// 		description: arr.description,
					// 		is_weight: arr.use_weight,
					// 		weight: arr.weight,
					// 		questions:[],
					// 	};

					// 	this.dataReview.template.categories.push(detailCategories);

					// 	arr.review_indicators.forEach(arr2 => {
					// 		const detailQuestions = {
					// 			name: arr2.name,
					// 			description: arr2.description,
					// 			is_weight: arr2.use_weight,
					// 			weight: arr2.weight,
					// 			can_comment: arr2.can_comment,
					// 			answer_type: arr2.answer_type,
					// 			ratings:[],
					// 		};

					// 		detailCategories.questions.push(detailQuestions);

					// 		if(arr2.answer_type == "rating"){
					// 			arr2.review_ratings.forEach(arr3 => {
					// 				const detailRatings = {
					// 					value: arr3.value,
					// 					description: arr3.description,
					// 				}

					// 				detailQuestions.ratings.push(detailRatings);
					// 			})
					// 		}
					// 	})
					// });
				}
			},

			validateBeforeSubmit() {
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.setTemplate();
						this.$emit('questionSave', {id: this.template.id, name: this.template.name})
						this.$parent.reviewStep+=1;
						this.$parent.editReview+=1;
					}
				});
			},
		},

		mounted() {
			if(this.templates){
				this.selectedTemplate = this.templates[0].attributes.id;
				this.getDetailTemplate(this.selectedTemplate);
			}
		},

		components: {
			ButtonFooter
		}
	};
</script>