<template lang="pug" src="./index.pug"></template>

<script>
	import UserProfileList from '@/components/UserProfiles/UserProfileLists/UserProfileList.vue';
	
	export default{
		name: 'DetailBody',
		props: {

		},

		components:{
			UserProfileList
		},
	};
</script>