webpackJsonp([0],{

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var vcPager1 = function vcPager1() {
  return __webpack_require__.e/* import() */(4).then(__webpack_require__.bind(null, 64));
};
var vcPager2 = function vcPager2() {
  return __webpack_require__.e/* import() */(3).then(__webpack_require__.bind(null, 67));
};
var vcPager3 = function vcPager3() {
  return __webpack_require__.e/* import() */(2).then(__webpack_require__.bind(null, 70));
};
var vcPager4 = function vcPager4() {
  return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 73));
};

exports.default = {
  data: function data() {
    return {
      items: []
    };
  },

  components: {
    vcPager1: vcPager1,
    vcPager2: vcPager2,
    vcPager3: vcPager3,
    vcPager4: vcPager4
  },
  mounted: function mounted() {
    this.generateTempData();
  },
  methods: {
    generateTempData: function generateTempData() {
      for (var i = 0, l = 162; i < l; i++) {
        this.items.push(i);
      }
    }
  }
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(63)
/* template */
var __vue_template__ = __webpack_require__(76)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vue-components\\Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19b7a970", Component.options)
  } else {
    hotAPI.reload("data-v-19b7a970", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('vcPager1', {
    attrs: {
      "pr-data": _vm.items
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('vcPager2', {
    attrs: {
      "pr-data": _vm.items
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('vcPager3', {
    attrs: {
      "pr-data": _vm.items
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('vcPager4', {
    attrs: {
      "pr-data": _vm.items
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19b7a970", module.exports)
  }
}

/***/ })

});