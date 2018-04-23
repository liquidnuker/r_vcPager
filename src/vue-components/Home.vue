<template>
  <div>
    <vcPager1 
    :pr-data="items" />
  </div>
</template>
<script>
const vcPager1 = () => import ('./vcPager1.vue');
  export default {
    data () {
      return {    
        items: []
      }
    },
    components: {
      vcPager1: vcPager1
    },
    mounted: function () {
      this.generateTempData();
    },
    methods: {
      generateTempData: function() {
        for (let i = 0, l = 162; i < l; i++) {
          this.items.push(i);
        }
      }
    }
  }
</script>