<template lang="pug">
	#app.u-bg-snow(:is="layout")
		Loader(
			:isLoading="isLoading"
		)
		router-view(
			:layout.sync="layout"
			@loadingStatus="loadingStatus"
		)
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
	import Loader from '@/components/Loaders/Loader.vue';


	export default {
		name: 'App',
		components: {
			LoginLayouts,
			Loader
		},

		data() {
			return {
				layout: 'div',
				isLoading: false,
			}
		},

		methods: {
			loadingStatus(data) {
				this.isLoading = data.isLoading;
			}
		},
	};
</script>

<style src="@/assets/styles/main.scss"></style>
