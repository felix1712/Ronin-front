<template lag="pug" src="./index.pug"></template>

<script>
import BlankLayouts from '@/layouts/BlankLayouts/BlankLayouts.vue';
import axios from 'axios';
  
  export default{
		name: 'PreviewTemplate',
		props: {
			id: {
				type:String
			}
		},
		
		data(){
			return {
				api: null,
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

				this.apiPreviewTemplate();
			}
		},


		methods: {
			//global function
			closeWindow(){
				window.close();
			},

			accToggle(){
				this.isAccActive = !this.isAccActive
			},

			//api function

			apiPreviewTemplate(){
				this.api.get('review/template/'+this.id)
				.then(response => {
					if(response.data.data.token){
            this.token = response.data.data.token;
            this.refresh = response.data.data.refreshToken;
            this.$cookie.set('AuthToken', 'Bearer '+this.token);
            this.$cookie.set('AuthRefresh', 'Bearer '+this.refresh);
            this.apiPreviewTemplate();
          } else {
						this.template = this.$normalize.deserialize(response.data).category_templates.data;
					};
				})
				.catch(e =>{
					console.log(e);
				});
			}
		},
  };
</script>