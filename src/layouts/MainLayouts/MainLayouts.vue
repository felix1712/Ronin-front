<template lang="pug" src="./index.pug"></template>

<script>
	import Header from '@/components/Headers/Header.vue';
	import Footer from '@/components/Footers/Footer.vue';
	export default{
		name: 'MainLayouts',
		components:{
			Header,
			Footer
		},

		methods: {
			checkAuth() {
				const checkToken = this.$cookie.get('AuthToken');
				const checkRefreshToken = this.$cookie.get('AuthRefresh');
				if(checkToken == null && checkRefreshToken == null){
					this.$router.push('/login');
				}
			}
		},

		mounted() {
			this.checkAuth();
		},

		updated() {
			const checkToken = this.$cookie.get('AuthToken');
			const checkRefreshToken = this.$cookie.get('AuthRefresh');
			if(checkToken == null && checkRefreshToken == null){
				this.$router.push('/login');
			}
		},
	};
</script>