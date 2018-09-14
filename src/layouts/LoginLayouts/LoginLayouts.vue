<template lang="pug" src="./index.pug"></template>

<script>
	import SecondHeader from '@/components/SecondHeader/SecondHeader.vue';

	export default {
		name: 'LoginLayouts',
		components: {
			SecondHeader,
		},
		methods: {
			checkAuth() {
				const checkToken = this.$cookie.get('AuthToken');
				const checkRefreshToken = this.$cookie.get('AuthRefresh');
				if(checkToken != null && checkRefreshToken != null){
					this.$router.push('/');
				}
			}
		},

		mounted() {
			this.checkAuth();
		},

		updated() {
			const checkToken = this.$cookie.get('AuthToken');
			const checkRefreshToken = this.$cookie.get('AuthRefresh');
			if(checkToken != null && checkRefreshToken != null){
				this.$router.push('/');
			}
		},
	};
</script>