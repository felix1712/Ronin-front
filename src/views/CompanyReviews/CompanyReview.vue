<template lag="pug" src="./index.pug"></template>

<script>
  import MainLayouts from '@/layouts/MainLayouts/MainLayouts.vue';
  import axios from 'axios';
  import CompanyReviewList from '@/components/CompanyReviewLists/CompanyReviewList.vue';
  export default{
    name:'CompanyReview',
    data() {
      return {
        activeTab: 0,
        api: null,
        listCompanyReview: null,
        listCompanyIncluded: null,
        normalize: null,
        normalizeData: null,
        normalizeDataMember: null,
        normalizeDataReviewer: null,
        normalizeDataUser: null,
      }
    },

    created (){
      this.$emit(`update:layout`, MainLayouts);
      this.$emit('loadingStatus', {isLoading: true});
    },

    mounted() {
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

        this.api.get('review/company-review')
        .then(response => {
          this.listCompanyReview = this.$normalize.deserialize(response.data).data;
          this.$emit('loadingStatus', {isLoading: false});
        })
        .catch(e => {
          this.$emit('loadingStatus', {isLoading: false});
          this.$toast.open({
            duration: 1500,
            message: e.response.statusText,
            position: 'is-top',
            type: 'is-danger'
          })
          // this.errors.push(e);
        });
      }
    },

    components: {
      CompanyReviewList,
    }
  };
</script>