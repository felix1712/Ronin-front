<template lang="pug" src="./index.pug"></template>

<script>
    import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
    export default {
        name: 'YourReviews',
		data() {
			return {
                activeTab: 0,
			}
		},

        created (){
            this.$emit(`update:layout`, MainLayouts);
        },
    };
</script>