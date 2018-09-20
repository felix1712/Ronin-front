<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
	import { loginService } from '@/api/main-service';

	export default{
		name: 'Home',
		data() {
			return {
				posts: [],
			};
		},

		created() {
			this.$emit(`update:layout`, MainLayouts);
		},

		methods: {
		},

		components: {
		},
	};
</script>
