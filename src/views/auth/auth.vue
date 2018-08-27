<template><h5>wew</h5></template>

<script>
import {newService} from '@/api/main-service';

	export default{
		name: 'login',
		data(){
			return{
				email: "ricky@dummy.com",
				password: "Sleekr1234",
				authToken: "",
			}
		},

		methods: {
			submitLogin() {
				newService.post('auth/login',{
          email : this.email,
          password : this.password,
        })
        .then(response => {
          if(response.data.status == 200){
	          this.authToken = response.data.data.token
	          this.$cookie.set('Auth', this.authToken);
	        }
        })
        .catch(e => {
          // console.log(e);
        }) 
			}
		},

		mounted(){
			this.submitLogin();
		}
	};
</script>
