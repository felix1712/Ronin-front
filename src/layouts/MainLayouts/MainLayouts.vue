<template lang="pug" src="./index.pug"></template>

<script>
	import Header from '@/components/header/Header.vue';
	import Footer from '@/components/footer/Footer.vue';
	export default{
		name: 'MainLayouts',
		components:{
			Header,
			Footer
		},

		methods: {
			checkAuth() {
				const checkToken = this.$cookie.get('AuthPrfrm');
				if(checkToken == "undefined" || checkToken == null){
					this.$router.push('/login');
				}
			}
		},
		mounted() {
			this.checkAuth();
		},
	};
</script>