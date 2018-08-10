<template>
  <div id="app">
    <main class="p-prfm-wrapper">
      <router-view/>
    </main>
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

<style src="@/assets/styles/main.min.css"></style>