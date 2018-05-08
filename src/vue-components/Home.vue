<template>
  <div>
    <vcPager1 
    :pr-data="items" />
    <br>
    <br>
    <vcPager2
    :pr-data="items" />
    <br>
    <br>
    <vcPager3
    :pr-data="items" />
    <br>
    <br>
    <vcPager4
    :pr-data="items" />
    <br>
    <br>
    <vcPager5
    :pr-data="items" />

  </div>
</template>
<script>
const vcPager1 = () => import ('./vcPager1.vue');
const vcPager2 = () => import ('./vcPager2.vue');
const vcPager3 = () => import ('./vcPager3.vue');
const vcPager4 = () => import ('./vcPager4.vue');
const vcPager5 = () => import ('./vcPager5.vue');

  export default {
    data () {
      return {    
        items: []
      }
    },
    components: {
      vcPager1: vcPager1,
      vcPager2: vcPager2,
      vcPager3: vcPager3,
      vcPager4: vcPager4,
      vcPager5: vcPager5
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