<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import { VueEditor } from "vue2-editor";
  export default {
    name: 'CreateTemplate',

    components: {
	    VueEditor
	  },

    created (){
        this.$emit(`update:layout`, MainLayouts);
    },

    data() {
	    return {
	      content: "<p></p>",
	      customToolbar: [
	        ["bold", "italic", "underline"],
	        [{ list: "ordered" }, { list: "bullet" }]
	      ]
	    };
	  }
  };
</script>