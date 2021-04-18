(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/AnalyticsByGoogle-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/AnalyticsByGoogle.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Required for the online version of the examples & docs app
 * We can not name the file GoogleAnalytics, since it does break when using uBlock origin for dist versions.
 * See: https://github.com/neomjs/neo/issues/651
 * @class Neo.main.addon.AnalyticsByGoogle
 * @extends Neo.core.Base
 * @singleton
 */
class AnalyticsByGoogle extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.AnalyticsByGoogle'
         * @protected
         */
        className: 'Neo.main.addon.AnalyticsByGoogle',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);
        this.insertGoogleAnalyticsScript();
    }

    /**
     *
     * @protected
     */
    insertGoogleAnalyticsScript() {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', Neo.config.gtagId);

        const script = document.createElement('script');

        Object.assign(script, {
            async: true,
            src  : `https://www.googletagmanager.com/gtag/js?id=${Neo.config.gtagId}`
        });

        document.head.appendChild(script);
    }
}

Neo.applyClassConfig(AnalyticsByGoogle);

let instance = Neo.create(AnalyticsByGoogle);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9BbmFseXRpY3NCeUdvb2dsZS5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsbURBQUk7QUFDcEMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWtFLGtCQUFrQjtBQUNwRixTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL21haW4vc3JjL21haW4vYWRkb24vQW5hbHl0aWNzQnlHb29nbGUtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogUmVxdWlyZWQgZm9yIHRoZSBvbmxpbmUgdmVyc2lvbiBvZiB0aGUgZXhhbXBsZXMgJiBkb2NzIGFwcFxuICogV2UgY2FuIG5vdCBuYW1lIHRoZSBmaWxlIEdvb2dsZUFuYWx5dGljcywgc2luY2UgaXQgZG9lcyBicmVhayB3aGVuIHVzaW5nIHVCbG9jayBvcmlnaW4gZm9yIGRpc3QgdmVyc2lvbnMuXG4gKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZW9tanMvbmVvL2lzc3Vlcy82NTFcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5BbmFseXRpY3NCeUdvb2dsZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBBbmFseXRpY3NCeUdvb2dsZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5BbmFseXRpY3NCeUdvb2dsZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uQW5hbHl0aWNzQnlHb29nbGUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgdGhpcy5pbnNlcnRHb29nbGVBbmFseXRpY3NTY3JpcHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBpbnNlcnRHb29nbGVBbmFseXRpY3NTY3JpcHQoKSB7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGd0YWcoKSB7XG4gICAgICAgICAgICBkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgZ3RhZygnY29uZmlnJywgTmVvLmNvbmZpZy5ndGFnSWQpO1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2NyaXB0LCB7XG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHNyYyAgOiBgaHR0cHM6Ly93d3cuZ29vZ2xldGFnbWFuYWdlci5jb20vZ3RhZy9qcz9pZD0ke05lby5jb25maWcuZ3RhZ0lkfWBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQW5hbHl0aWNzQnlHb29nbGUpO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKEFuYWx5dGljc0J5R29vZ2xlKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=