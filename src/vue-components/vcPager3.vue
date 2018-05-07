<template>
<div>
  <!-- jspager3 -->
  <div class="jspager3_holder">
    <!-- main item list -->
    <ul id="jspager3_items" class="row jspager3_items"
      aria-atomic="true" aria-live="assertive" aria-relevant="all">
      <li v-for="i in itemList">
        {{ i }}
      </li>
    </ul>
    <!-- /main item list  -->

    <nav class="jspager3">
      <!-- page selector/firstlast/page buttons -->
      <!-- firstprev -->
      <aside class="jspager3_prevnextholder">
        <!-- first -->
        <button id="jspager3_first" class="btn btn_first" tabindex="0" @click="showItems(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>First</span>
        </button>
        <!-- prev -->
        <button id="jspager3_prev" class="btn btn_prev" tabindex="0" @click="flip()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Prev</span>
        </button>
      </aside>
      <!-- /firstprev -->

      <!-- page selector -->
      <aside class="jspager3_totalpagesholder">
        <label for="jspager3_select">Page:</label>
        <p id="jspager3_currentpage"></p>
        <select id="jspager3_select" name="jspager3_select" class="jspager3_select" tabindex="0" v-model="currentPage"
          @change="showItems($event.target.value)">
          <option v-for="i in totalPages" :value="i">{{ i }}</option>
        </select>
        <p id="jspager3_totalpages">of {{ totalPages }}</p>
      </aside>
      <!-- /page selector -->

      <!-- nextlast -->
      <aside class="jspager3_prevnextholder">
        <button id="jspager3_next" class="btn btn_next" tabindex="0" @click="flip('next')">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
        <!-- last -->
        <button id="jspager3_last" class="btn btn_last" tabindex="0" @click="showItems(totalPages)">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
      </aside>
      <!-- /nextlast -->
      
      <!-- page buttons -->
      <aside id="jspager3_pagebtnholder" class="jspager3_pagebtnholder"
        aria-atomic="true" aria-live="polite" aria-relevant="additions">
        <template v-for="(i, index) in buttonSet">
        <a v-if="i === currentPage"
          class="jspager3_pagebtn jspager3_pagebtn--active" tabindex="0"
          :aria-posinset="currentPage" aria-selected="true"
        @click="showItems(i)">{{ i }}</a>
        <a v-else class="jspager3_pagebtn" tabindex="0"
          :aria-posinset="index + 1" @click="showItems(i)">
          {{ i }}
        </a>
        </template>
      </aside>
      <!-- /page buttons -->
      
      <!-- perpage -->
      <aside class="jspager3_perpageholder">
        <label for="jspager3_perpage">perPage:&nbsp;</label>
        <select id="jspager3_perpage" name="jspager3_perpage"
          class="jspager3_perpage" tabindex="0" v-model="perPage"
          @change="changePerPage($event.target.value)">
          <option v-for="i in perPageItems" :value="i">{{ i }}</option>
        </select>
      </aside>
      <!-- /perpage -->
    </nav>
  </div>
  <!-- /jspager3 -->
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