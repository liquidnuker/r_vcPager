<template>
<div>
  <!-- jspager5 -->
  <div class="jspager5_holder">
    <!-- main item list -->
    <ul id="jspager5_items" class="row jspager5_items"
      aria-atomic="true" aria-live="assertive" aria-relevant="all">
      <li v-for="i in itemList">
        {{ i }}
      </li>
    </ul>
    <!-- /main item list  -->
    <nav class="jspager5">
      <!-- page selector/firstlast/page buttons -->
      <!-- page selector -->
      <aside class="jspager5_totalpagesholder">
        <label for="jspager5_select">Page:</label>
        <p id="jspager5_currentpage"></p>
        <select id="jspager5_select" name="jspager5_select" class="jspager5_select" tabindex="0" v-model="currentPage"
          @change="showItems($event.target.value)">
          <option v-for="i in totalPages" :value="i">{{ i }}</option>
        </select>
        <p id="jspager5_totalpages">of {{ totalPages }}</p>
      </aside>
      <!-- /page selector -->
      <!-- firstprev -->
      <aside class="jspager5_prevnextholder">
        <!-- first -->
        <button id="jspager5_first" class="btn btn_first" tabindex="0" @click="showItems(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>First</span>
        </button>
        <!-- prev -->
        <button id="jspager5_prev" class="btn btn_prev" tabindex="0" @click="flip()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Prev</span>
        </button>
        
      </aside>
      <!-- /firstprev -->
      
      <!-- page buttons -->
      <aside id="jspager5_pagebtnholder" class="jspager5_pagebtnholder"
        aria-atomic="true" aria-live="polite" aria-relevant="additions">
        <template v-for="(i, index) in buttonSet">
        <a v-if="i === currentPage"
          class="jspager5_pagebtn jspager5_pagebtn--active" tabindex="0"
          :aria-posinset="currentPage" aria-selected="true"
        @click="showItems(i)">{{ i }}</a>
        <a v-else class="jspager5_pagebtn" tabindex="0"
          :aria-posinset="index + 1" @click="showItems(i)">
          {{ i }}
        </a>
        </template>
      </aside>
      <!-- /page buttons -->
      <!-- nextlast -->
      <aside class="jspager5_prevnextholder">
        <!-- next -->
        <button id="jspager5_next" class="btn btn_next" tabindex="0" @click="flip('next')">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
        <!-- last -->
        <button id="jspager5_last" class="btn btn_last" tabindex="0" @click="showItems(totalPages)">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
      </aside>
      <!-- /nextlast -->
      
      <!-- perpage -->
      <aside class="jspager5_perpageholder">
        <label for="jspager5_perpage">perPage:&nbsp;</label>
        <select id="jspager5_perpage" name="jspager5_perpage"
          class="jspager5_perpage" tabindex="0" v-model="perPage"
          @change="changePerPage($event.target.value)">
          <option v-for="i in perPageItems" :value="i">{{ i }}</option>
        </select>
      </aside>
      <!-- /perpage -->
    </nav>
  </div>
  <!-- /jspager5 -->
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
      
      this.setPageBtns();
      this.showItems(1);
    },
    showItems: function(num) {
      this.itemList = this.pg.page(num);
      this.currentPage = this.pg.currentPage;

      this.changePageBtns();
    },
    changePerPage: function(perPage) {
      console.log(perPage);
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
}
</script>