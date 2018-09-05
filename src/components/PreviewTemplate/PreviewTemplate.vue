<template lag="pug" src="./index.pug"></template>

<script>
import BlankLayouts from '@/layouts/BlankLayouts/BlankLayouts.vue';
import { service } from '@/api/main-service';
  
  export default{
	name: 'PreviewTemplate',
	data(){
		return {
			templatesUuid: null,
			template: "",
			radioButton: "Yes",
		}
	},

	created() {
		this.$emit(`update:layout`, BlankLayouts);
		this.templatesUuid = this.$route.params.uuid;
		service.get('templates/'+this.templatesUuid)
			.then(response => {
				this.template = response.data.contents.template;
				// console.log(this.template);
			})
			.catch(e =>{
				console.log(e);
			});
	},

	methods: {
		closeWindow(){
			window.close();
		}
	}
  };
</script>