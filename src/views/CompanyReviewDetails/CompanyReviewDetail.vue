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
        normalize: null,
        normalizeData: null,
        normalizeDataMember: null,
        normalizeDataReviewer: null,
        normalizeDataUser: null,
      }
    },

    created (){
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

        this.api.get('review/company-review/'+this.listId)
        .then(response => {
          this.detailCompanyReview = this.$normalize.deserialize(response.data);
          console.log(this.detailCompanyReview);
          // this.normalize = this.$normalize(response.data);
          // this.normalizeData = Object.values(this.normalize.cycle);
          // this.normalizeDataMember = Object.values(this.normalize.member);
          // this.normalizeDataReviewer = Object.values(this.normalize.reviewer);
          // this.normalizeDataUser = Object.values(this.normalize.user);
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