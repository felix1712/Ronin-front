<template>
	<div id="app" class="u-bg-snow">
		<Header/>
		<router-view/>
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