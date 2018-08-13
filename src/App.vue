<template>
	<div id="app" class="u-bg-snow">
		<Header/>
		<div class="p-prfrm-wrapper">
		  <div class="p-prfrm-content u-hsm-up u-tac u-py-90">
		    <h1 class="c-smb-18 u-mb-40">
		    	Halaman tidak tersedia dalam ukuran mobile.
		    </h1>
		    <!-- <img src=""> -->
		  </div>
			<router-view/>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/header/header.vue';

	export default {
		name: 'App',
		components: {
			Header,
		}
	};
</script>

<style src="@/assets/styles/main.scss"></style>