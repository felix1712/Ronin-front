<template lang="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import axios from 'axios';
  import DetailBody from '@/components/CompanyReviewDetails/DetailBodies/DetailBody.vue';
  import DetailHeader from '@/components/CompanyReviewDetails/DetailHeaders/DetailHeader.vue';
  export default {
    name: 'CompanyReviewDetail',
    data(){
      return{
        api: null,
        listId: null,
        detailCompanyReview: "",
        detailCompanyReviewMember: "",
        normalize: null,
        normalizeData: null,
        normalizeDataMember: null,
        normalizeDataReviewer: null,
        normalizeDataUser: null,
      }
    },

    mounted (){
      this.$emit(`update:layout`, MainLayouts);
      const checkToken = this.$cookie.get('AuthToken');
      const checkRefreshToken = this.$cookie.get('AuthRefresh');
      if(checkToken != null && checkRefreshToken != null){
        this.api = axios.create({
          baseURL: process.env.VUE_APP_API,
          headers: {
            Authorization: this.$cookie.get('AuthToken'),
            Refresh: this.$cookie.get('AuthRefresh'),
          },
        });

        this.listId = this.$route.params.id;

        this.apiReviewDetail();
      }
    },

    methods: {
      apiReviewDetail(){
        this.api.get('review/company-review/'+this.listId)
        .then(response => {
          if(response.data.data.token){
            this.token = response.data.data.token;
            this.refresh = response.data.data.refreshToken;
            this.$cookie.set('AuthToken', 'Bearer '+this.token);
            this.$cookie.set('AuthRefresh', 'Bearer '+this.refresh);
            this.apiReviewDetail();
          } else {
            this.detailCompanyReview = this.$normalize.deserialize(response.data);
            this.detailCompanyReviewMember = this.$normalize.deserialize(response.data).members.data;
          }
        })
        .catch(e => {
          // this.errors.push(e);
        });
      }
    },

    components: {
    	DetailBody,
      DetailHeader
    },
  };
</script>