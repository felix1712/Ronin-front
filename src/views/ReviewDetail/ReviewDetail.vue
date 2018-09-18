<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  export default {
    name: 'ReviewDetail',

    created (){
        this.$emit(`update:layout`, MainLayouts);
    },
  };
</script>