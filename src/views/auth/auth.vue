<template><h5>wew</h5></template>

<script>
import {service} from '@/api/main-service';
// import {newService} from '@/api/main-service';
import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';

	export default{
		name: 'login',
		data(){
			return{
				email: "ricky@dummy.com",
				password: "Sleekr1234",
				authToken: "",
			}
		},

		created() {
			this.$emit(`update:layout`, LoginLayouts);
		},

		methods: {
			// submitLogin() {
			// 	newService.post('auth/login',{
			// 		email : this.email,
			// 		password : this.password,
			// 	})
			// 	.then(response => {
			// 		if(response.data.status == 200){
			// 			this.authToken = response.data.data.token
			// 			this.$cookie.set('Auth', this.authToken);
			// 		}
			// 	})
			// 	.catch(e => {
			// 		// console.log(e);
			// 	}) 
			// }

			loginLatestApi(){
				service.post('oauth/access_token', {
					email: this.email,
					password: this.password,
				})
				.then(response => {
					if(response.data.status_code == 200){
						this.authToken = 'Bearer'+response.data.contents.token
						this.$cookie.set('Auth', this.authToken, { expires: '23h' });
					}
				})
				.catch(e => {
					console.log(e);
				})
			}
		},

		mounted(){
			this.loginLatestApi();
		}
	};
</script>
