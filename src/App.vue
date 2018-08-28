<template lang="pug">
	#app.u-bg-snow
		Header
		.p-prfrm-wrapper
			.p-prfrm-content.u-hsm-up.u-tac.u-py-90
				h1.c-smb-18.u-mb-40 Halaman tidak tersedia dalam ukuran mobile.
				<!-- img(src="/assets/images/pages/icon-goals.svg", alt="") -->
			router-view
		Footer

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
	import Header from '@/components/header/Header.vue';
	import Footer from '@/components/footer/Footer.vue';

	export default {
		name: 'App',
		components: {
			Header,
			Footer,
		},
		mounted() {
		}
	};
</script>

<style src="@/assets/styles/main.scss"></style>
