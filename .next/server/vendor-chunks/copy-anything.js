"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/copy-anything";
exports.ids = ["vendor-chunks/copy-anything"];
exports.modules = {

/***/ "(ssr)/./node_modules/copy-anything/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/copy-anything/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   copy: () => (/* binding */ copy)\n/* harmony export */ });\n/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ \"(ssr)/./node_modules/is-what/dist/index.js\");\n\n\nfunction assignProp(carry, key, newVal, originalObject, includeNonenumerable) {\n  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? \"enumerable\" : \"nonenumerable\";\n  if (propType === \"enumerable\")\n    carry[key] = newVal;\n  if (includeNonenumerable && propType === \"nonenumerable\") {\n    Object.defineProperty(carry, key, {\n      value: newVal,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    });\n  }\n}\nfunction copy(target, options = {}) {\n  if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {\n    return target.map((item) => copy(item, options));\n  }\n  if (!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(target)) {\n    return target;\n  }\n  const props = Object.getOwnPropertyNames(target);\n  const symbols = Object.getOwnPropertySymbols(target);\n  return [...props, ...symbols].reduce((carry, key) => {\n    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(options.props) && !options.props.includes(key)) {\n      return carry;\n    }\n    const val = target[key];\n    const newVal = copy(val, options);\n    assignProp(carry, key, newVal, target, options.nonenumerable);\n    return carry;\n  }, {});\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY29weS1hbnl0aGluZy9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWlEOztBQUVqRDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsTUFBTSxnREFBTztBQUNiO0FBQ0E7QUFDQSxPQUFPLHNEQUFhO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7O0FBRWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW90b3Jjb250cm9sLy4vbm9kZV9tb2R1bGVzL2NvcHktYW55dGhpbmcvZGlzdC9pbmRleC5qcz8wMTc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQXJyYXksIGlzUGxhaW5PYmplY3QgfSBmcm9tICdpcy13aGF0JztcblxuZnVuY3Rpb24gYXNzaWduUHJvcChjYXJyeSwga2V5LCBuZXdWYWwsIG9yaWdpbmFsT2JqZWN0LCBpbmNsdWRlTm9uZW51bWVyYWJsZSkge1xuICBjb25zdCBwcm9wVHlwZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob3JpZ2luYWxPYmplY3QsIGtleSkgPyBcImVudW1lcmFibGVcIiA6IFwibm9uZW51bWVyYWJsZVwiO1xuICBpZiAocHJvcFR5cGUgPT09IFwiZW51bWVyYWJsZVwiKVxuICAgIGNhcnJ5W2tleV0gPSBuZXdWYWw7XG4gIGlmIChpbmNsdWRlTm9uZW51bWVyYWJsZSAmJiBwcm9wVHlwZSA9PT0gXCJub25lbnVtZXJhYmxlXCIpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FycnksIGtleSwge1xuICAgICAgdmFsdWU6IG5ld1ZhbCxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gY29weSh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldC5tYXAoKGl0ZW0pID0+IGNvcHkoaXRlbSwgb3B0aW9ucykpO1xuICB9XG4gIGlmICghaXNQbGFpbk9iamVjdCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIGNvbnN0IHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCk7XG4gIHJldHVybiBbLi4ucHJvcHMsIC4uLnN5bWJvbHNdLnJlZHVjZSgoY2FycnksIGtleSkgPT4ge1xuICAgIGlmIChpc0FycmF5KG9wdGlvbnMucHJvcHMpICYmICFvcHRpb25zLnByb3BzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYXJyeTtcbiAgICB9XG4gICAgY29uc3QgdmFsID0gdGFyZ2V0W2tleV07XG4gICAgY29uc3QgbmV3VmFsID0gY29weSh2YWwsIG9wdGlvbnMpO1xuICAgIGFzc2lnblByb3AoY2FycnksIGtleSwgbmV3VmFsLCB0YXJnZXQsIG9wdGlvbnMubm9uZW51bWVyYWJsZSk7XG4gICAgcmV0dXJuIGNhcnJ5O1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydCB7IGNvcHkgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/copy-anything/dist/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/copy-anything/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/copy-anything/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   copy: () => (/* binding */ copy)\n/* harmony export */ });\n/* harmony import */ var is_what__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-what */ \"(rsc)/./node_modules/is-what/dist/index.js\");\n\n\nfunction assignProp(carry, key, newVal, originalObject, includeNonenumerable) {\n  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? \"enumerable\" : \"nonenumerable\";\n  if (propType === \"enumerable\")\n    carry[key] = newVal;\n  if (includeNonenumerable && propType === \"nonenumerable\") {\n    Object.defineProperty(carry, key, {\n      value: newVal,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    });\n  }\n}\nfunction copy(target, options = {}) {\n  if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {\n    return target.map((item) => copy(item, options));\n  }\n  if (!(0,is_what__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(target)) {\n    return target;\n  }\n  const props = Object.getOwnPropertyNames(target);\n  const symbols = Object.getOwnPropertySymbols(target);\n  return [...props, ...symbols].reduce((carry, key) => {\n    if ((0,is_what__WEBPACK_IMPORTED_MODULE_0__.isArray)(options.props) && !options.props.includes(key)) {\n      return carry;\n    }\n    const val = target[key];\n    const newVal = copy(val, options);\n    assignProp(carry, key, newVal, target, options.nonenumerable);\n    return carry;\n  }, {});\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvY29weS1hbnl0aGluZy9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWlEOztBQUVqRDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsTUFBTSxnREFBTztBQUNiO0FBQ0E7QUFDQSxPQUFPLHNEQUFhO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7O0FBRWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW90b3Jjb250cm9sLy4vbm9kZV9tb2R1bGVzL2NvcHktYW55dGhpbmcvZGlzdC9pbmRleC5qcz8xNWNkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQXJyYXksIGlzUGxhaW5PYmplY3QgfSBmcm9tICdpcy13aGF0JztcblxuZnVuY3Rpb24gYXNzaWduUHJvcChjYXJyeSwga2V5LCBuZXdWYWwsIG9yaWdpbmFsT2JqZWN0LCBpbmNsdWRlTm9uZW51bWVyYWJsZSkge1xuICBjb25zdCBwcm9wVHlwZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob3JpZ2luYWxPYmplY3QsIGtleSkgPyBcImVudW1lcmFibGVcIiA6IFwibm9uZW51bWVyYWJsZVwiO1xuICBpZiAocHJvcFR5cGUgPT09IFwiZW51bWVyYWJsZVwiKVxuICAgIGNhcnJ5W2tleV0gPSBuZXdWYWw7XG4gIGlmIChpbmNsdWRlTm9uZW51bWVyYWJsZSAmJiBwcm9wVHlwZSA9PT0gXCJub25lbnVtZXJhYmxlXCIpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FycnksIGtleSwge1xuICAgICAgdmFsdWU6IG5ld1ZhbCxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gY29weSh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldC5tYXAoKGl0ZW0pID0+IGNvcHkoaXRlbSwgb3B0aW9ucykpO1xuICB9XG4gIGlmICghaXNQbGFpbk9iamVjdCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIGNvbnN0IHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCk7XG4gIHJldHVybiBbLi4ucHJvcHMsIC4uLnN5bWJvbHNdLnJlZHVjZSgoY2FycnksIGtleSkgPT4ge1xuICAgIGlmIChpc0FycmF5KG9wdGlvbnMucHJvcHMpICYmICFvcHRpb25zLnByb3BzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYXJyeTtcbiAgICB9XG4gICAgY29uc3QgdmFsID0gdGFyZ2V0W2tleV07XG4gICAgY29uc3QgbmV3VmFsID0gY29weSh2YWwsIG9wdGlvbnMpO1xuICAgIGFzc2lnblByb3AoY2FycnksIGtleSwgbmV3VmFsLCB0YXJnZXQsIG9wdGlvbnMubm9uZW51bWVyYWJsZSk7XG4gICAgcmV0dXJuIGNhcnJ5O1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydCB7IGNvcHkgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/copy-anything/dist/index.js\n");

/***/ })

};
;