<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
	import { loginService } from '@/api/main-service';

	export default{
		name: 'Loader',
		props: {
			isLoading: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				isFullPage: true
			};
		},
	};
</script>
