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
				const checkToken = this.$cookie.get('AuthPrfrm');
				if(checkToken != null){
					this.$router.push('/');
				}
			}
		},

		created() {
			this.checkAuth();
		},

		updated() {
			const checkToken = this.$cookie.get('AuthPrfrm');
			if(checkToken != null){
				this.$router.push('/');
			}
		},
	};
</script>