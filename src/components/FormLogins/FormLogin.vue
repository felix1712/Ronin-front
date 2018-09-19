<template lang="pug" src="./index.pug"></template>

<script>
	import { loginService } from '@/api/main-service.js';

	export default{
		name: 'FormLogin',
		data(){
			return{
				form: {
					loginEmail: 'ricky@dummy.com',
	    		loginPassword: 'Sleekr1234',
    		},
    		token: null,
    		refresh: null,
			}
		},

		methods: {
			validateLogin() {
	  		this.$validator.validateAll().then((result) => {
					if (result) {
						loginService.post('/auth/login',{
							email: this.form.loginEmail,
							password: this.form.loginPassword,
						})
						.then(response => {
							if(response.data.status == 200){
								this.token = response.data.data.token;
								this.refresh = response.data.data.refreshToken;
								this.$cookie.set('AuthToken', 'Bearer '+this.token, { expires: '59m' });
								this.$cookie.set('AuthRefresh', 'Bearer '+this.refresh, { expires: '59m' });
								this.$router.push('/');
							} else {
								this.$toast.open({
									duration: 3000,
									message: response.data.message,
									type: 'is-danger'
								})
							}
						})
						.catch(e =>{
							this.$toast.open({
								duration: 3000,
								message: 'Ooops look something wrong !',
								type: 'is-danger'
							})
						});
					} else {
						this.$toast.open({
							duration: 3000,
							message: 'Check your form completeness.',
							type: 'is-danger'
						})
					}
				});
	  	}
		}
	};
</script>