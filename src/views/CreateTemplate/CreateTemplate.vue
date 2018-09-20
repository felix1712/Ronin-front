<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import { VueEditor } from "vue2-editor";
  import vueSlider from 'vue-slider-component'
  export default {
    name: 'CreateTemplate',

    components: {
	    VueEditor,
	    vueSlider
	  },

    created (){
        this.$emit(`update:layout`, MainLayouts);
    },

    data() {
	    return {
	    	value: '',
	    	value2: 5,
	    	radioButton: "Yes",
	    	options: ['Select option', 'Score percentage', 'Yes/No', 'Free text', 'Rating'],
	      content: "<p></p>",
	      customToolbar: [
	        ["bold", "italic", "underline"],
	        [{ list: "ordered" }, { list: "bullet" }]
	      ]
	    };
	  }
  };
</script>