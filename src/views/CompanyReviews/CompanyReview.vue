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
      }
    },

    created (){
      this.$emit(`update:layout`, MainLayouts);
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

        this.api.get('review/company-review',)
        .then(response => {
          this.listCompanyReview = response.data.data;
          this.listCompanyIncluded = response.data.included;
          console.log(response.data);
        })
        .catch(e => {
          // this.errors.push(e);
        });
      }
    },

    components: {
      CompanyReviewList,
    }
  };
</script>