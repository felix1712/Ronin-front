<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import DetailBody from '@/components/CompanyReviewDetails/DetailBodies/DetailBody.vue';
  import DetailHeader from '@/components/CompanyReviewDetails/DetailHeaders/DetailHeader.vue';
  export default {
    name: 'CompanyReviewDetail',

    created (){
      this.$emit(`update:layout`, MainLayouts);
    },

    components: {
    	DetailBody,
      DetailHeader
    }
  };
</script>