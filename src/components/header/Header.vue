<template lag="pug" src="./index.pug"></template>

<script>
  export default{
    name: 'Header',
    props: 
    {
      msg: String,
    },
    methods: {
    	signOut(){
    		this.$cookie.delete('AuthToken');
    		this.$cookie.delete('AuthRefresh');
    		this.$router.push('/');
    	}
    }
  };
</script>