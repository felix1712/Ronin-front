<template lang="pug" src="./index.pug"></template>

<script>
import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';

  export default {
    name: 'ForgotPassword',
    created() {
    	this.$emit(`update:layout`, LoginLayouts);
    },
  };
</script>