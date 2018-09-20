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

		methods: {
      openLoading() {
          this.isLoading = true
          setTimeout(() => {
              this.isLoading = false
          }, 10 * 1000)
      }
    },
	};
</script>
