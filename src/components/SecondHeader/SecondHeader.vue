<template lang="pug" src="./index.pug"></template>

<script>
	export default{
		name: 'SecondHeader',
		data() {
			return{
				signStatus: null,
				signUrl:null
			}
		},
		computed: {
			SignText(){
				if(this.$route.name == 'SignUp' || this.$route.name == 'ForgotPassword'){
					this.signUrl = 'SignIn'
					return this.signStatus = 'Sign In'
				} else {
					this.signUrl = 'SignUp'
					return this.signStatus = 'Sign Up'
				}
			}
		},
	};
</script>