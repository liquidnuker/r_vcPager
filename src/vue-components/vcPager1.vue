<template>
<div>
  <!-- jspager1 -->
  <div class="jspager1_holder">
    <!-- main item list -->
    <ul id="jspager1_items" class="row jspager1_items"
    aria-atomic="true" aria-live="assertive" aria-relevant="all">
      <li v-for="i in itemList">
      {{ i }}
      </li>
    </ul>
    <!-- /main item list  -->

    <nav class="jspager1">
      <!-- page selector/firstlast/page buttons -->
      <!-- page selector -->
      <aside class="jspager1_totalpagesholder">
        <label for="jspager1_select">Page:</label>
        <p id="jspager1_currentpage"></p>
        <select id="jspager1_select" name="jspager1_select" class="jspager1_select" tabindex="0" v-model="currentPage" 
      @change="">
        <option v-for="i in totalPages" :value="i" 
        @click="">{{ i }}</option>
      </select>
        <p id="jspager1_totalpages"></p>
      </aside>
      <!-- /page selector -->
      <!-- firstlast -->
      <aside class="jspager1_prevnextholder">
        <!-- first -->
        <button id="jspager1_first" class="btn btn_first" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>First</span>
        </button>
        <!-- prev -->
        <button id="jspager1_prev" class="btn btn_prev" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Prev</span>
        </button>
        <!-- next -->
        <button id="jspager1_next" class="btn btn_next" tabindex="0">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
        <!-- last -->
        <button id="jspager1_last" class="btn btn_last" tabindex="0">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
      </aside>
      <!-- /firstlast -->
      
      <!-- page buttons -->
      <aside id="jspager1_pagebtnholder" class="jspager1_pagebtnholder"
        aria-atomic="true" aria-live="polite" aria-relevant="additions">
      </aside>
      <!-- /page buttons -->
      
      <!-- jump to page/perpage -->
      <!-- jump to page -->
      <aside class="jspager1_jumptopageholder">
        <label for="jspager1_jump">jump to page:&nbsp;</label>
        <input type="tel" name="jspager1_jump" id="jspager1_jump" class=" jspager1_jump" placeholder="" tabindex="0" />
        <button id="jspager1_jumpbtn" class="btn" tabindex="0">Go</button>
      </aside>
      <!-- /jump to page -->
      
      <!-- perpage -->
      <aside class="jspager1_perpageholder">
        <label for="jspager1_perpage">perPage:&nbsp;</label>
        <select id="jspager1_perpage" name="jspager1_perpage"
       class="jspager1_perpage" tabindex="0" v-model="perPage" 
      @change="">
        <option v-for="i in perPageItems" :value="i" 
        @click="">{{ i }}</option>
      </select>
      </aside>
      <!-- /perpage -->
    </nav>
  </div>
  <!-- /jspager1 -->
</div>
</template>
<script>
import Pager from "../js/pager.js";
import pageBtns from "../js/pagebtns.js";

export default {
  data () {
    return {   
      items: "", // from props

      itemList: "", // paginated items
      pg: "", 
      perPage: 10,
      perPageItems: [10, 20, 50, 100],
      totalPages: "",
      currentPage: ""
    }
  },
  watch: {
  // : function () {
  // }
  },
  props: [
    "prData"
  ],
  components: {
  },
  mounted: function () {
    this.items = this.prData;
    this.activatePager();
  },
  methods: {   
    activatePager: function() {
      this.pg = null;
      this.pg = new Pager({
        perPage: this.perPage,
        data: this.items
      });
      this.totalPages = this.pg.getTotalPages();
      
      this.showItems(1);
    },
    showItems: function(num) {
      this.itemList = this.pg.page(num);
      this.currentPage = this.pg.currentPage;
    }     
  }
}
</script>