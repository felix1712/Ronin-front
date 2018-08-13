<template><h5>wew</h5></template>

<script>
	import Firebase from 'firebase'

	let config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
  };

  let app = Firebase.initializeApp(config)


	export default{
		name: 'auth',

		created() {
			console.log(process.env.VUE_APP_FIREBASE_API_KEY);
			console.log(process.env.VUE_APP_BASE_URL);
		}
	};
</script>