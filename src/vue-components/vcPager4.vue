<template>
<div>
  <!-- jspager4 -->
  <div class="jspager4_holder">
    <!-- main item list -->
    <ul id="jspager4_items" class="row jspager4_items"
      aria-atomic="true" aria-live="assertive" aria-relevant="all">
      <li v-for="i in itemList">
        {{ i }}
      </li>
    </ul>
    <!-- /main item list  -->
    <nav class="jspager4">
      <!-- firstprev -->
      <aside class="jspager4_prevnextholder">
        <!-- first -->
        <button id="jspager4_first" class="btn btn_first" tabindex="0" @click="showItems(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>First</span>
        </button>
        <!-- prev -->
        <button id="jspager4_prev" class="btn btn_prev" tabindex="0" @click="flip()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        <span>Prev</span>
        </button>
      </aside>
      <!-- /firstprev -->
      <!-- page selector -->
      <aside class="jspager4_totalpagesholder">
        <label for="jspager4_select">Page:</label>
        <p id="jspager4_currentpage"></p>
        <select id="jspager4_select" name="jspager4_select" class="jspager4_select" tabindex="0" v-model="currentPage"
          @change="showItems($event.target.value)">
          <option v-for="i in totalPages" :value="i">{{ i }}</option>
        </select>
        <p id="jspager4_totalpages">of {{ totalPages }}</p>
      </aside>
      <!-- /page selector -->
      <!-- nextlast -->
      <aside class="jspager4_prevnextholder">
        <!-- next -->
        <button id="jspager4_next" class="btn btn_next" tabindex="0" @click="flip('next')">
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
        <!-- last -->
        <button id="jspager4_last" class="btn btn_last" tabindex="0" @click="showItems(totalPages)">
        <span>Last</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        </button>
      </aside>
      <!-- /nextlast -->
      
      <!-- perpage -->
      <aside class="jspager4_perpageholder">
        <label for="jspager4_perpage">perPage:&nbsp;</label>
        <select id="jspager4_perpage" name="jspager4_perpage"
          class="jspager4_perpage" tabindex="0" v-model="perPage"
          @change="changePerPage($event.target.value)">
          <option v-for="i in perPageItems" :value="i">{{ i }}</option>
        </select>
      </aside>
      <!-- /perpage -->
    </nav>
  </div>
  <!-- /jspager4 -->
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
      this.showItems(1);
    },
    showItems: function(num) {
      this.itemList = this.pg.page(num);
      this.currentPage = this.pg.currentPage;
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
  }
};
</script>