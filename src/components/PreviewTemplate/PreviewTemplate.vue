<template lag="pug" src="./index.pug"></template>

<script>
import BlankLayouts from '@/layouts/BlankLayouts/BlankLayouts.vue';
import axios from 'axios';
  
  export default{
	name: 'PreviewTemplate',
	data(){
		return {
			api: null,
			templateId: null,
			template: "",
			radioButton: "Yes",
			isAccActive: true,
		}
	},

	created() {
		this.$emit(`update:layout`, BlankLayouts);
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

			this.templateId = this.$route.params.id;

			this.api.get('review/template/'+this.templateId)
			.then(response => {
				this.template = response.data.data.relationships.category_templates;
				console.log(response);
			})
			.catch(e =>{
				console.log(e);
			});
		}
	},

	methods: {
		closeWindow(){
			window.close();
		},

		accToggle(){
			this.isAccActive = !this.isAccActive
		}
	}
  };
</script>