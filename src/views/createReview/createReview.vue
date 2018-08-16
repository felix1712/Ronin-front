<template lag="pug" src="./index.pug"></template>

<script>
  import {service} from '@/api/main-service';
  import ButtonFooter from './shared/button-footer/ButtonFooter.vue';

  export default{
    name:'createReview',
    data(){
      return {
        reviewStep: 1,
        editReview: 0,
        dataReview: {
          name: null,
          description: null,
          members: null,
          //form questionare
          template: null,
          // form schedule
          is_repeat: null,
          review_start_date: null,
          review_end_date: null,
          repeat_every: null,
          //form reviewer
          review_method: null,
        }
      }
    },

    methods: {
      editReviewStep1() {
        this.reviewStep = 1
      },

      editReviewStep2() {
        this.reviewStep = 2
      },

      editReviewStep3() {
        this.reviewStep = 3
      },
    },
    components: {
      ButtonFooter
    }


    
  };
</script>