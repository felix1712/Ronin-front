<template lang="pug" src="./index.pug"></template>

<script>
	export default{
		name: 'ProgressBar',
		props: ['currentBar', 'maxBar'],
		computed: {
			classProgress() {
				return {
		      '': this.currentBar == 0,
		      'is-slate': (this.currentBar / this.maxBar) > 0 && (this.currentBar / this.maxBar) < 0.5,
		      'is-blue': (this.currentBar / this.maxBar) >= 0.5 && (this.currentBar / this.maxBar) < 1,
		      'is-purple': this.currentBar == this.maxBar,
		    }
			}
		}
	};
</script>