(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/draggable/tab/header/toolbar/SortZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/tab/header/toolbar/SortZone.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/tab/header/toolbar/SortZone.mjs ***!
  \****************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SortZone
/* harmony export */ });
/* harmony import */ var _toolbar_SortZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../toolbar/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.draggable.tab.header.toolbar.SortZone
 * @extends Neo.draggable.toolbar.SortZone
 */
class SortZone extends _toolbar_SortZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.tab.header.toolbar.SortZone'
         * @protected
         */
        className: 'Neo.draggable.tab.header.toolbar.SortZone',
        /**
         * @member {String} ntype='tab-header-toolbar-sortzone'
         * @protected
         */
        ntype: 'tab-header-toolbar-sortzone',
        /**
         * @member {Object|null} dragProxyConfig
         */
        dragProxyConfig: {
            cls: ['neo-tab-header-toolbar', 'neo-toolbar']
        }
    }}

    /**
     * Override this method for class extensions (e.g. tab.header.Toolbar)
     * @param {Number} fromIndex
     * @param {Number} toIndex
     */
    moveTo(fromIndex, toIndex) {
        this.owner.up().moveTo(fromIndex, toIndex);
    }

    /**
     *
     * @param {Object} data
     */
    onDragEnd(data) {
        super.onDragEnd(data);

        setTimeout(() => {
            let me    = this,
                owner = me.owner,
                cls   = owner.cls || [];

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.remove(cls, 'neo-no-animation');
            owner.cls = cls;
        }, 300);
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me    = this,
            owner = me.owner,
            cls   = owner.cls || [];

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(cls, 'neo-no-animation');
        owner.cls = cls;

        super.onDragStart(data);
    }
}

Neo.applyClassConfig(SortZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL3RhYi9oZWFkZXIvdG9vbGJhci9Tb3J0Wm9uZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5RDtBQUNIOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBWTtBQUNuQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDJEQUFlO0FBQzNCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHdEQUFZO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJjaHVua3Mvc3JjL2RyYWdnYWJsZS90YWIvaGVhZGVyL3Rvb2xiYXIvU29ydFpvbmUtbWpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VTb3J0Wm9uZSBmcm9tICcuLi8uLi8uLi90b29sYmFyL1NvcnRab25lLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgIGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS50YWIuaGVhZGVyLnRvb2xiYXIuU29ydFpvbmVcbiAqIEBleHRlbmRzIE5lby5kcmFnZ2FibGUudG9vbGJhci5Tb3J0Wm9uZVxuICovXG5jbGFzcyBTb3J0Wm9uZSBleHRlbmRzIEJhc2VTb3J0Wm9uZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kcmFnZ2FibGUudGFiLmhlYWRlci50b29sYmFyLlNvcnRab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLnRhYi5oZWFkZXIudG9vbGJhci5Tb3J0Wm9uZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0YWItaGVhZGVyLXRvb2xiYXItc29ydHpvbmUnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndGFiLWhlYWRlci10b29sYmFyLXNvcnR6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcmFnUHJveHlDb25maWdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNvbmZpZzoge1xuICAgICAgICAgICAgY2xzOiBbJ25lby10YWItaGVhZGVyLXRvb2xiYXInLCAnbmVvLXRvb2xiYXInXVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZvciBjbGFzcyBleHRlbnNpb25zIChlLmcuIHRhYi5oZWFkZXIuVG9vbGJhcilcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXhcbiAgICAgKi9cbiAgICBtb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIHRoaXMub3duZXIudXAoKS5tb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25EcmFnRW5kKGRhdGEpIHtcbiAgICAgICAgc3VwZXIub25EcmFnRW5kKGRhdGEpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBvd25lciA9IG1lLm93bmVyLFxuICAgICAgICAgICAgICAgIGNscyAgID0gb3duZXIuY2xzIHx8IFtdO1xuXG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCAnbmVvLW5vLWFuaW1hdGlvbicpO1xuICAgICAgICAgICAgb3duZXIuY2xzID0gY2xzO1xuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkRyYWdTdGFydChkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciA9IG1lLm93bmVyLFxuICAgICAgICAgICAgY2xzICAgPSBvd25lci5jbHMgfHwgW107XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby1uby1hbmltYXRpb24nKTtcbiAgICAgICAgb3duZXIuY2xzID0gY2xzO1xuXG4gICAgICAgIHN1cGVyLm9uRHJhZ1N0YXJ0KGRhdGEpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU29ydFpvbmUpO1xuXG5leHBvcnQge1NvcnRab25lIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=