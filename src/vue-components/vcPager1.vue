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
      @change="pageJump($event.target.value)">
        <option v-for="i in totalPages" :value="i">{{ i }}</option>
      </select>
        <p id="jspager1_totalpages">of {{ totalPages }}</p>
      </aside>
      <!-- /page selector -->
      <!-- firstlast -->
      <aside class="jspager1_prevnextholder">
        <!-- first -->
        <button id="jspager1_first" class="btn btn_first" tabindex="0" @click="showItems(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>First</span>
        </button>
        <!-- prev -->
        <button id="jspager1_prev" class="btn btn_prev" tabindex="0" @click="flip()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Prev</span>
        </button>
        <!-- next -->
        <button id="jspager1_next" class="btn btn_next" tabindex="0" @click="flip('next')">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
        <!-- last -->
        <button id="jspager1_last" class="btn btn_last" tabindex="0" @click="showItems(totalPages)">
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
        <template v-for="(i, index) in buttonSet">
          <a v-if="i === currentPage" 
          class="jspager1_pagebtn jspager1_pagebtn--active" tabindex="0" 
          :aria-posinset="currentPage" aria-selected="true"
          @click="showItems(i)">{{ i }}</a>
          <a v-else class="jspager1_pagebtn" tabindex="0" 
          :aria-posinset="index + 1" @click="showItems(i)">
            {{ i }}
          </a>
        </template>
      </aside>
      <!-- /page buttons -->
      
      <!-- jump to page/perpage -->
      <!-- jump to page -->
      <aside class="jspager1_jumptopageholder">
        <label for="jspager1_jump">jump to page:&nbsp;</label>
        <input type="tel" name="jspager1_jump" id="jspager1_jump" class=" jspager1_jump" placeholder="" tabindex="0" 
        :value="toPage" v-model="toPage" @keyup.enter= "pageJump(toPage)" />
        <button id="jspager1_jumpbtn" class="btn" tabindex="0" 
        @keyup.enter= "pageJump(toPage)" @click= "pageJump(toPage)">Go</button>
      </aside>
      <!-- /jump to page -->
      
      <!-- perpage -->
      <aside class="jspager1_perpageholder">
        <label for="jspager1_perpage">perPage:&nbsp;</label>
        <select id="jspager1_perpage" name="jspager1_perpage"
       class="jspager1_perpage" tabindex="0" v-model="perPage" 
      @change="changePerPage($event.target.value)">
        <option v-for="i in perPageItems" :value="i">{{ i }}</option>
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
import {pageBtns} from "../js/pagebtns.js";

export default {
  data () {
    return {   
      items: "", // from props
      itemList: "", // paginated items

      pg: "", 
      perPage: 10,
      perPageItems: [10, 20, 50, 100],
      totalPages: "",
      currentPage: "",

      temp: "", // temp page buttons
      buttonSet: "",

      toPage: ""
    };
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
      
      this.setPageBtns();
      this.showItems(1);
    },
    showItems: function(num) {
      this.itemList = this.pg.page(num);
      this.currentPage = this.pg.currentPage;

      this.changePageBtns();
    },
    changePerPage: function(perPage) {
      this.perPage = perPage;
      this.activatePager();
    },
    flip: function(direction) {
      if (direction === "next") {
        this.showItems(this.pg.next());
      } else {
        this.showItems(this.pg.prev());
      }
    },
    setPageBtns: function() {
      this.temp = [];
      for (let i = 0, l = this.pg.getTotalPages(); i < l; i++) {
        this.temp.push(pageBtns(i, l));
      }
    },
    changePageBtns: function() {
      this.buttonSet = this.temp[this.pg.currentPage - 1];
    },
    pageJump: function(page) {
      this.showItems(Number(page));
    }     
  }
};
</script>