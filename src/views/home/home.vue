<template lag="pug" src="./index.pug"></template>

<script>
	import {service} from '@/api/main-service';

	export default{
		name:'Home',
		data(){
			return {
				posts: [] 
			}
		},

		methods: {
			testApi(){
				 service.get(`me`)
			    .then(response => {
			      this.posts = response.data
			    })
			    .catch(e => {
			      this.errors.push(e)
			    })
			}
		},
		components: {

		}


		
	};
</script>