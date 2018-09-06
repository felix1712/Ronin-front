<template lang="pug">
	#app.u-bg-snow(:is="layout")
		router-view(:layout.sync="layout")
		<!-- Modal Section -->
		.c-popover.jc-povc-confirmation.u-w-400.u-dn
			.u-tac
				h3.c-smb-15.u-mb-20 Cancel confirmation
				p Are you sure want to cancel this process?
				.u-mt-40
					button.c-btn.c-btn--ghost.c-btn--sm.jc-pov-x No
					button.c-btn.c-btn--delete.c-btn--sm(type="submit") Yes
</template>

<script>
	import LoginLayouts from './layouts/LoginLayouts/LoginLayouts.vue';

	export default {
		name: 'App',
		components: {
			LoginLayouts
		},

		data() {
			return {
				layout: 'div',
			}
		},

		methods: {
			// checkAuth() {
			// 	const tokenCookies = this.$cookie.get('Auth');
			// 	if(!tokenCookies || tokenCookies == null){
			// 		this.$router.replace({ name: "login" });
			// 		this.hasLoggedIn = false;
			// 	} else {
			// 		this.hasLoggedIn = true;
			// 	}
			// }
		},

		mounted() {
			// this.checkAuth();
		}
	};
</script>

<style src="@/assets/styles/main.scss"></style>
