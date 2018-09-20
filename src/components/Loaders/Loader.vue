<template lag="pug" src="./index.pug"></template>

<script>
	import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
	import { loginService } from '@/api/main-service';

	export default{
		name: 'Loader',
		data() {
			return {
				isLoading: false,
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
		created() {
			this.$emit(`update:layout`, MainLayouts);
		},
	};
</script>
