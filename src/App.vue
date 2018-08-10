<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <Header/>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/header/header.vue';

  export default {
    name: 'App',
    components: {
      Header,
    }
  };
</script>