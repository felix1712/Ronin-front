<template lang="pug" src="./index.pug"></template>

<script>
import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';

  export default {
    name: 'ForgotPassword',
    data() {
    	return {
    		hasLink: false,
    	}
    },

    created() {
    	this.$emit(`update:layout`, LoginLayouts);
    },

    methods: {
    	sendLinkForgot() {
    		this.hasLink = true;
    	}
    },
  };
</script>