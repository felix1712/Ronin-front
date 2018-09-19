<template lang="pug" src="./index.pug"></template>

<script>
import LoginLayouts from '@/layouts/LoginLayouts/LoginLayouts.vue';
import FormLogin from '@/components/FormLogins/FormLogin.vue'
  export default {
    name: 'SignIn',
    data(){
    	return {
    		typeLogin: 'normalLogin'
    	}
    },

	  created() {
	  	this.$emit(`update:layout`, LoginLayouts);
	  },

	  components: {
	  	FormLogin,
	  }
  };
</script>