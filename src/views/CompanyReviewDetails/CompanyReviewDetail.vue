<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import UserProfileList from '@/components/UserProfiles/UserProfileLists/UserProfileList.vue';
  import UserProfileTop from '@/components/UserProfiles/UserProfileTops/UserProfileTop.vue';
  export default {
    name: 'CompanyReviewDetail',

    created (){
      this.$emit(`update:layout`, MainLayouts);
    },

    components: {
    	UserProfileList,
    	UserProfileTop
    }
  };
</script>