<template lang="pug" src="./index.pug"></template>

<script>
  import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';
  import { loginService } from '@/api/main-service.js';
  export default {
    name: 'SignInSleekr',

    created (){
        this.$emit(`update:layout`, LoginLayouts);
    },
  };
</script>