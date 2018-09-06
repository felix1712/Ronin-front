<template lang="pug" src="./index.pug"></template>

<script>
import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';
import { loginService } from '@/api/main-service.js';
  export default {
    name: 'SignIn',
    data() {
    	return {
    		loginEmail: '',
    		loginPassword: '',
    		token: null,
    	}
    },

	  created() {
	  	this.$emit(`update:layout`, LoginLayouts);
	  },

	  methods: {
	  	validateLogin() {
	  		this.$validator.validateAll().then((result) => {
					if (result) {
						loginService.post('/oauth/access_token',{
							email: this.loginEmail,
							password: this.loginPassword,
						})
						.then(response => {
							if(response.data.status_code == 200){
								this.token = response.data.contents.token;
								this.$cookie.set('Auth', this.token, { expires: '23h' });
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
	  },
  };
</script>