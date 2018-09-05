<template lag="pug" src="./index.pug"></template>

<script>
import BlankLayouts from '@/layouts/BlankLayouts/BlankLayouts.vue';
  export default{
    name: 'PreviewTemplate',
    created() {
    	this.$emit(`update:layout`, BlankLayouts);
    },
  };
</script>