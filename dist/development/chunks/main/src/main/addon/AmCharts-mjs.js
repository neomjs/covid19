(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/AmCharts-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/AmCharts.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/AmCharts.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");



/**
 * Helper class to include amCharts into your neo.mjs app
 * https://www.amcharts.com/docs/v4/
 * @class Neo.main.addon.AmCharts
 * @extends Neo.core.Base
 * @singleton
 */
class AmCharts extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.AmCharts'
         * @protected
         */
        className: 'Neo.main.addon.AmCharts',
        /**
         * Stores all chart ids inside an object
         * @member {Object} charts={}
         * @protected
         */
        charts: {},
        /**
         * Stores all chart config objects which arrived before the chart lib scripts got loaded
         * @member {Object[]} chartsToCreate=[]
         * @protected
         */
        chartsToCreate: [],
        /**
         * Stores all chart data inside an object. key => chart id
         * No array since in case a chart gets loaded multiple times, we only want to apply the last data on mount.
         * @member {Object} dataMap={}
         * @protected
         */
        dataMap: {},
        /**
         * @member {String} downloadPath='https//www.amcharts.com/lib/4/'
         * @protected
         */
        downloadPath: 'https://www.amcharts.com/lib/4/',
        /**
         * @member {String} fallbackPath='https://neomjs.github.io/pages/resources/amCharts/'
         * @protected
         */
        fallbackPath: 'https://neomjs.github.io/pages/resources/amCharts/',
        /**
         * @member {Boolean} scriptsLoaded_=true
         * @protected
         */
        scriptsLoaded_: false,
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'callMethod',
                'create',
                'destroy',
                'setProperties',
                'setProperty',
                'updateData'
            ]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        this.insertAmChartsScripts();
    }

    /**
     * Triggered after the scriptsLoaded config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetScriptsLoaded(value, oldValue) {
        if (value) {
            const me = this;

            me.chartsToCreate.forEach(config => {
                me.create(config);
            });

            me.chartsToCreate = [];

            setTimeout(() => {
                Object.entries(me.dataMap).forEach(([key, dataValue]) => {
                    me.updateData(dataValue);
                });

                me.dataMap = {};
            }, 1000);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {String} data.path
     * @param {Array} [data.params]
     */
    callMethod(data) {
        if (this.hasChart(data.id)) {
            const chart      = this.charts[data.id],
                  pathArray  = data.path.split('.'),
                  methodName = pathArray.pop(),
                  scope      = pathArray.length < 1 ? chart:  Neo.ns(pathArray.join('.'), false, chart);

            scope[methodName].call(scope, ...data.params || []);
        } else {
            // todo
        }
    }

    /**
     *
     * @param {Object} chart
     */
    combineSeriesTooltip(chart) {
        chart.series.each(series => {
            series.adapter.add('tooltipText', () => {
                let text = "[bold]{dateX}[/]\n";

                chart.series.each(item => {
                    text += "[" + item.stroke + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}\n";
                });

                return text;
            });
        });
    }

    /**
     *
     * @param {Object}  data
     * @param {Boolean} data.combineSeriesTooltip
     * @param {Object}  data.config
     * @param {Array}   [data.data]
     * @param {String}  [data.dataPath]
     * @param {String}  data.id
     * @param {String}  data.package
     * @param {String}  data.type='XYChart'
     */
    create(data) {
        const me = this;

        if (!me.scriptsLoaded) {
            me.chartsToCreate.push(data);
        } else {
            // todo: check if self[data.package] exists, if not load it and call create afterwards

            me.charts[data.id] = am4core.createFromConfig(data.config, data.id, self[data.package][data.type || 'XYChart']);

            if (data.combineSeriesTooltip) {
                me.combineSeriesTooltip(me.charts[data.id]);
            }

            // in case data has arrived before the chart got created, apply it now
            if (data.data) {
                me.updateData({
                    data    : data.data,
                    dataPath: data.dataPath,
                    id      : data.id
                });
            } else if (me.dataMap[data.id]) {
                me.updateData(me.dataMap[data.id]);
                delete me.dataMap[data.id];
            }
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    destroy(data) {
        this.charts[data.id].dispose();
        delete this.charts[data.id];
    }

    /**
     *
     * @param {String} id
     * @returns {Boolean}
     */
    hasChart(id) {
        return !!this.charts[id];
    }

    /**
     * Async approach
     * core.js has to arrive first or the other scripts will cause JS errors since they rely on it
     * => fetching the other files after core.js is loaded
     */
    insertAmChartsScripts(useFallback=false) {
        const me       = this,
              basePath = useFallback ? me.fallbackPath : me.downloadPath;

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadScript(basePath + 'core.js').then(() => {
            Promise.all([
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadScript(basePath + 'charts.js'),
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadScript(basePath + 'maps.js'),
                _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.loadScript(basePath + 'geodata/worldLow.js')
            ]).then(() => {
                me.scriptsLoaded = true;
            });
        }).catch(e => {
            console.log('Download from amcharts.com failed, switching to fallback', e);
            me.insertAmChartsScripts(true);
        });
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Object} data.properties
     */
    setProperties(data) {
        Object.entries(data.properties).forEach(([key, value]) => {
            this.setProperty({
                id   : data.id,
                path : key,
                value: value
            })
        });
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     * @param {Boolean} [data.isColor=false] true will wrap the value into am4core.color()
     * @param {String} data.path
     * @param {*} data.value
     */
    setProperty(data) {
        if (this.hasChart(data.id)) {
            const chart        = this.charts[data.id],
                  pathArray    = data.path.split('.'),
                  propertyName = pathArray.pop(),
                  scope        = Neo.ns(pathArray.join('.'), false, chart);

            scope[propertyName] = data.isColor ? am4core.color(data.value) : data.value;
        } else {
            // todo
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Object} data.data
     * @param {String} data.dataPath
     * @param {String} data.id
     */
    updateData(data) {
        const me = this;

        if (!me.scriptsLoaded || !me.hasChart(data.id)) {
            me.dataMap[data.id] = data;
        } else {
            const chart = me.charts[data.id];

            if (data.dataPath === '') {
                chart.data = data.data;
            } else {
                Neo.ns(data.dataPath, false, chart).data = data.data;
            }
        }
    }
}

Neo.applyClassConfig(AmCharts);

let instance = Neo.create(AmCharts);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9BbUNoYXJ0cy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0g7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07O0FBRXpDO0FBQ0EsMkVBQTJFLCtCQUErQjtBQUMxRyxpQkFBaUI7O0FBRWpCO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsUUFBUTtBQUN2QixlQUFlLE9BQU87QUFDdEIsZUFBZSxNQUFNO0FBQ3JCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDhEQUFvQjtBQUM1QjtBQUNBLGdCQUFnQiw4REFBb0I7QUFDcEMsZ0JBQWdCLDhEQUFvQjtBQUNwQyxnQkFBZ0IsOERBQW9CO0FBQ3BDO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsRUFBRTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFIiwiZmlsZSI6ImNodW5rcy9tYWluL3NyYy9tYWluL2FkZG9uL0FtQ2hhcnRzLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgRG9tQWNjZXNzIGZyb20gJy4uL0RvbUFjY2Vzcy5tanMnO1xuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0byBpbmNsdWRlIGFtQ2hhcnRzIGludG8geW91ciBuZW8ubWpzIGFwcFxuICogaHR0cHM6Ly93d3cuYW1jaGFydHMuY29tL2RvY3MvdjQvXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uQW1DaGFydHNcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgQW1DaGFydHMgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uQW1DaGFydHMnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLkFtQ2hhcnRzJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgY2hhcnQgaWRzIGluc2lkZSBhbiBvYmplY3RcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBjaGFydHM9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2hhcnRzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgY2hhcnQgY29uZmlnIG9iamVjdHMgd2hpY2ggYXJyaXZlZCBiZWZvcmUgdGhlIGNoYXJ0IGxpYiBzY3JpcHRzIGdvdCBsb2FkZWRcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W119IGNoYXJ0c1RvQ3JlYXRlPVtdXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNoYXJ0c1RvQ3JlYXRlOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3JlcyBhbGwgY2hhcnQgZGF0YSBpbnNpZGUgYW4gb2JqZWN0LiBrZXkgPT4gY2hhcnQgaWRcbiAgICAgICAgICogTm8gYXJyYXkgc2luY2UgaW4gY2FzZSBhIGNoYXJ0IGdldHMgbG9hZGVkIG11bHRpcGxlIHRpbWVzLCB3ZSBvbmx5IHdhbnQgdG8gYXBwbHkgdGhlIGxhc3QgZGF0YSBvbiBtb3VudC5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkYXRhTWFwPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRhdGFNYXA6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkb3dubG9hZFBhdGg9J2h0dHBzLy93d3cuYW1jaGFydHMuY29tL2xpYi80LydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZG93bmxvYWRQYXRoOiAnaHR0cHM6Ly93d3cuYW1jaGFydHMuY29tL2xpYi80LycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGZhbGxiYWNrUGF0aD0naHR0cHM6Ly9uZW9tanMuZ2l0aHViLmlvL3BhZ2VzL3Jlc291cmNlcy9hbUNoYXJ0cy8nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGZhbGxiYWNrUGF0aDogJ2h0dHBzOi8vbmVvbWpzLmdpdGh1Yi5pby9wYWdlcy9yZXNvdXJjZXMvYW1DaGFydHMvJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNjcmlwdHNMb2FkZWRfPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2NyaXB0c0xvYWRlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGU9e2FwcDogWy8vLi4uXX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnY2FsbE1ldGhvZCcsXG4gICAgICAgICAgICAgICAgJ2NyZWF0ZScsXG4gICAgICAgICAgICAgICAgJ2Rlc3Ryb3knLFxuICAgICAgICAgICAgICAgICdzZXRQcm9wZXJ0aWVzJyxcbiAgICAgICAgICAgICAgICAnc2V0UHJvcGVydHknLFxuICAgICAgICAgICAgICAgICd1cGRhdGVEYXRhJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIHRoaXMuaW5zZXJ0QW1DaGFydHNTY3JpcHRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzY3JpcHRzTG9hZGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U2NyaXB0c0xvYWRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIG1lLmNoYXJ0c1RvQ3JlYXRlLmZvckVhY2goY29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGUoY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5jaGFydHNUb0NyZWF0ZSA9IFtdO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhtZS5kYXRhTWFwKS5mb3JFYWNoKChba2V5LCBkYXRhVmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnVwZGF0ZURhdGEoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLmRhdGFNYXAgPSB7fTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEucGF0aFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtkYXRhLnBhcmFtc11cbiAgICAgKi9cbiAgICBjYWxsTWV0aG9kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hhcnQoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0ICAgICAgPSB0aGlzLmNoYXJ0c1tkYXRhLmlkXSxcbiAgICAgICAgICAgICAgICAgIHBhdGhBcnJheSAgPSBkYXRhLnBhdGguc3BsaXQoJy4nKSxcbiAgICAgICAgICAgICAgICAgIG1ldGhvZE5hbWUgPSBwYXRoQXJyYXkucG9wKCksXG4gICAgICAgICAgICAgICAgICBzY29wZSAgICAgID0gcGF0aEFycmF5Lmxlbmd0aCA8IDEgPyBjaGFydDogIE5lby5ucyhwYXRoQXJyYXkuam9pbignLicpLCBmYWxzZSwgY2hhcnQpO1xuXG4gICAgICAgICAgICBzY29wZVttZXRob2ROYW1lXS5jYWxsKHNjb3BlLCAuLi5kYXRhLnBhcmFtcyB8fCBbXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFydFxuICAgICAqL1xuICAgIGNvbWJpbmVTZXJpZXNUb29sdGlwKGNoYXJ0KSB7XG4gICAgICAgIGNoYXJ0LnNlcmllcy5lYWNoKHNlcmllcyA9PiB7XG4gICAgICAgICAgICBzZXJpZXMuYWRhcHRlci5hZGQoJ3Rvb2x0aXBUZXh0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gXCJbYm9sZF17ZGF0ZVh9Wy9dXFxuXCI7XG5cbiAgICAgICAgICAgICAgICBjaGFydC5zZXJpZXMuZWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIltcIiArIGl0ZW0uc3Ryb2tlICsgXCJd4pePWy9dIFwiICsgaXRlbS5uYW1lICsgXCI6IHtcIiArIGl0ZW0uZGF0YUZpZWxkcy52YWx1ZVkgKyBcIn1cXG5cIjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLmNvbWJpbmVTZXJpZXNUb29sdGlwXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkYXRhLmNvbmZpZ1xuICAgICAqIEBwYXJhbSB7QXJyYXl9ICAgW2RhdGEuZGF0YV1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIFtkYXRhLmRhdGFQYXRoXVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgZGF0YS5pZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgZGF0YS5wYWNrYWdlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBkYXRhLnR5cGU9J1hZQ2hhcnQnXG4gICAgICovXG4gICAgY3JlYXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCkge1xuICAgICAgICAgICAgbWUuY2hhcnRzVG9DcmVhdGUucHVzaChkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGNoZWNrIGlmIHNlbGZbZGF0YS5wYWNrYWdlXSBleGlzdHMsIGlmIG5vdCBsb2FkIGl0IGFuZCBjYWxsIGNyZWF0ZSBhZnRlcndhcmRzXG5cbiAgICAgICAgICAgIG1lLmNoYXJ0c1tkYXRhLmlkXSA9IGFtNGNvcmUuY3JlYXRlRnJvbUNvbmZpZyhkYXRhLmNvbmZpZywgZGF0YS5pZCwgc2VsZltkYXRhLnBhY2thZ2VdW2RhdGEudHlwZSB8fCAnWFlDaGFydCddKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuY29tYmluZVNlcmllc1Rvb2x0aXApIHtcbiAgICAgICAgICAgICAgICBtZS5jb21iaW5lU2VyaWVzVG9vbHRpcChtZS5jaGFydHNbZGF0YS5pZF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbiBjYXNlIGRhdGEgaGFzIGFycml2ZWQgYmVmb3JlIHRoZSBjaGFydCBnb3QgY3JlYXRlZCwgYXBwbHkgaXQgbm93XG4gICAgICAgICAgICBpZiAoZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgICAgOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQYXRoOiBkYXRhLmRhdGFQYXRoLFxuICAgICAgICAgICAgICAgICAgICBpZCAgICAgIDogZGF0YS5pZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZS5kYXRhTWFwW2RhdGEuaWRdKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlRGF0YShtZS5kYXRhTWFwW2RhdGEuaWRdKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWUuZGF0YU1hcFtkYXRhLmlkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIGRlc3Ryb3koZGF0YSkge1xuICAgICAgICB0aGlzLmNoYXJ0c1tkYXRhLmlkXS5kaXNwb3NlKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNoYXJ0c1tkYXRhLmlkXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGhhc0NoYXJ0KGlkKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuY2hhcnRzW2lkXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBc3luYyBhcHByb2FjaFxuICAgICAqIGNvcmUuanMgaGFzIHRvIGFycml2ZSBmaXJzdCBvciB0aGUgb3RoZXIgc2NyaXB0cyB3aWxsIGNhdXNlIEpTIGVycm9ycyBzaW5jZSB0aGV5IHJlbHkgb24gaXRcbiAgICAgKiA9PiBmZXRjaGluZyB0aGUgb3RoZXIgZmlsZXMgYWZ0ZXIgY29yZS5qcyBpcyBsb2FkZWRcbiAgICAgKi9cbiAgICBpbnNlcnRBbUNoYXJ0c1NjcmlwdHModXNlRmFsbGJhY2s9ZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICBiYXNlUGF0aCA9IHVzZUZhbGxiYWNrID8gbWUuZmFsbGJhY2tQYXRoIDogbWUuZG93bmxvYWRQYXRoO1xuXG4gICAgICAgIERvbUFjY2Vzcy5sb2FkU2NyaXB0KGJhc2VQYXRoICsgJ2NvcmUuanMnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChiYXNlUGF0aCArICdjaGFydHMuanMnKSxcbiAgICAgICAgICAgICAgICBEb21BY2Nlc3MubG9hZFNjcmlwdChiYXNlUGF0aCArICdtYXBzLmpzJyksXG4gICAgICAgICAgICAgICAgRG9tQWNjZXNzLmxvYWRTY3JpcHQoYmFzZVBhdGggKyAnZ2VvZGF0YS93b3JsZExvdy5qcycpXG4gICAgICAgICAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5zY3JpcHRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb3dubG9hZCBmcm9tIGFtY2hhcnRzLmNvbSBmYWlsZWQsIHN3aXRjaGluZyB0byBmYWxsYmFjaycsIGUpO1xuICAgICAgICAgICAgbWUuaW5zZXJ0QW1DaGFydHNTY3JpcHRzKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5wcm9wZXJ0aWVzXG4gICAgICovXG4gICAgc2V0UHJvcGVydGllcyhkYXRhKSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEucHJvcGVydGllcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb3BlcnR5KHtcbiAgICAgICAgICAgICAgICBpZCAgIDogZGF0YS5pZCxcbiAgICAgICAgICAgICAgICBwYXRoIDoga2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmlkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGF0YS5pc0NvbG9yPWZhbHNlXSB0cnVlIHdpbGwgd3JhcCB0aGUgdmFsdWUgaW50byBhbTRjb3JlLmNvbG9yKClcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5wYXRoXG4gICAgICogQHBhcmFtIHsqfSBkYXRhLnZhbHVlXG4gICAgICovXG4gICAgc2V0UHJvcGVydHkoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5oYXNDaGFydChkYXRhLmlkKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnQgICAgICAgID0gdGhpcy5jaGFydHNbZGF0YS5pZF0sXG4gICAgICAgICAgICAgICAgICBwYXRoQXJyYXkgICAgPSBkYXRhLnBhdGguc3BsaXQoJy4nKSxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZSA9IHBhdGhBcnJheS5wb3AoKSxcbiAgICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICA9IE5lby5ucyhwYXRoQXJyYXkuam9pbignLicpLCBmYWxzZSwgY2hhcnQpO1xuXG4gICAgICAgICAgICBzY29wZVtwcm9wZXJ0eU5hbWVdID0gZGF0YS5pc0NvbG9yID8gYW00Y29yZS5jb2xvcihkYXRhLnZhbHVlKSA6IGRhdGEudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEuZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmRhdGFQYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuc2NyaXB0c0xvYWRlZCB8fCAhbWUuaGFzQ2hhcnQoZGF0YS5pZCkpIHtcbiAgICAgICAgICAgIG1lLmRhdGFNYXBbZGF0YS5pZF0gPSBkYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY2hhcnQgPSBtZS5jaGFydHNbZGF0YS5pZF07XG5cbiAgICAgICAgICAgIGlmIChkYXRhLmRhdGFQYXRoID09PSAnJykge1xuICAgICAgICAgICAgICAgIGNoYXJ0LmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE5lby5ucyhkYXRhLmRhdGFQYXRoLCBmYWxzZSwgY2hhcnQpLmRhdGEgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEFtQ2hhcnRzKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShBbUNoYXJ0cyk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9