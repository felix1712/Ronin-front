<template lag="pug" src="./index.pug"></template>

<script>
import BlankLayouts from '@/layouts/BlankLayouts/BlankLayouts.vue';
import axios from 'axios';
  
  export default{
	name: 'PreviewTemplate',
	data(){
		return {
			api: null,
			templatesUuid: null,
			template: "",
			radioButton: "Yes",
			isAccActive: true,
		}
	},

	created() {
		this.$emit(`update:layout`, BlankLayouts);
		const checkToken = this.$cookie.get('AuthPrfrm');
		if(checkToken != null){
			this.api = axios.create({
			  baseURL: process.env.VUE_APP_OLD_API_URL,
			  headers: {
			    Authorization: this.$cookie.get('AuthPrfrm'),
			  },
			});

			this.templatesUuid = this.$route.params.uuid;

			this.api.get('templates/'+this.templatesUuid)
			.then(response => {
				this.template = response.data.contents.template;
				console.log(this.template);
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