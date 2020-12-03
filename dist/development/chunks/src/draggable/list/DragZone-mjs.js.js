(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/draggable/list/DragZone-mjs.js"],{

/***/ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/draggable/list/DragZone.mjs ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DragZone
/* harmony export */ });
/* harmony import */ var _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../draggable/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/DragZone.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");




/**
 * @class Neo.draggable.list.DragZone
 * @extends Neo.draggable.DragZone
 */
class DragZone extends _draggable_DragZone_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.draggable.list.DragZone'
         * @protected
         */
        className: 'Neo.draggable.list.DragZone',
        /**
         * @member {String} ntype='list-dragzone'
         * @protected
         */
        ntype: 'list-dragzone',
        /**
         * @member {Object|null} dragProxyConfig
         */
        dragProxyConfig: {
            cls: ['neo-list']
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            owner        = me.owner,
            domListeners = owner.domListeners,
            opts         = {delegate: '.neo-draggable', scope: me},
            store        = owner.store;

        domListeners.push(
            {'drag:end'  : me.onDragEnd,   ...opts},
            {'drag:start': me.onDragStart, ...opts}
        );

        owner.domListeners = domListeners;

        store.on({
            load : me.onStoreLoad,
            scope: me
        });

        // check if the store is already loaded
        if (store.getCount() > 0) {
            me.onStoreLoad();
        }
    }

    /**
     *
     * @param {Boolean} draggable
     */
    adjustListItemCls(draggable) {
        let me    = this,
            owner = me.owner,
            store = owner.store,
            vdom  = owner.vdom,
            node;

        store.items.forEach((record, index) => {
            node = me.getItemVdom(record, index);

            if (node) {
                node.cls = node.cls || [];
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default[draggable ? 'add' : 'remove'](node.cls, 'neo-draggable');
            }
        });

        owner.vdom = vdom;
    }

    /**
     *
     * @param {Object} record
     * @param {Number} index
     * @returns {Object|null} vdom
     */
    getItemVdom(record, index) {
        return this.owner.vdom.cn[index];
    }

    /**
     *
     * @param {Object} data
     */
    onDragEnd(data) {
        if (this.owner.draggable) {
            let me           = this,
                proxy        = me.dragProxy,
                cls          = proxy.cls || {},
                rect         = me.dragElementRect,
                wrapperStyle = proxy.wrapperStyle || {};

            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__.default.add(cls, 'neo-animate');
            proxy.cls = cls;

            // ensure to get into the next animation frame
            setTimeout(() => {
                wrapperStyle.left = `${rect.left}px`;
                wrapperStyle.top  = `${rect.top}px`;

                proxy.wrapperStyle = wrapperStyle;

                setTimeout(() => {
                    me.dragEnd();
                }, 300);
            }, 30);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onDragStart(data) {
        let me = this;

        if (me.owner.draggable) {
            me.dragElement = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_2__.default.findVdomChild(me.owner.vdom, data.path[0].id).vdom;
            me.dragStart(data);
        }
    }

    /**
     *
     */
    onStoreLoad() {
        this.adjustListItemCls(true);
    }

    /**
     *
     * @param {Object} data={}
     */
    setData(data={}) {
        let me       = this,
            owner    = me.owner,
            recordId = owner.getItemRecordId(me.getDragElementRoot().id);

        data.record = owner.store.get(recordId);

        super.setData(data);
    }
}

Neo.applyClassConfig(DragZone);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdEO0FBQ1I7QUFDRDs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNERBQVk7QUFDbkMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNDQUFzQztBQUNsRTs7QUFFQTtBQUNBLGFBQWEsc0NBQXNDO0FBQ25ELGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isb0RBQVE7QUFDeEI7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7O0FBRUEsWUFBWSx3REFBWTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLFVBQVU7QUFDakQsdUNBQXVDLFNBQVM7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsaUVBQXNCO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUtbWpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEcmFnWm9uZSBmcm9tICcuLi8uLi9kcmFnZ2FibGUvRHJhZ1pvbmUubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lXG4gKiBAZXh0ZW5kcyBOZW8uZHJhZ2dhYmxlLkRyYWdab25lXG4gKi9cbmNsYXNzIERyYWdab25lIGV4dGVuZHMgQmFzZURyYWdab25lIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGlzdC1kcmFnem9uZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdsaXN0LWRyYWd6b25lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcmFnUHJveHlDb25maWdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNvbmZpZzoge1xuICAgICAgICAgICAgY2xzOiBbJ25lby1saXN0J11cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIG93bmVyICAgICAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gb3duZXIuZG9tTGlzdGVuZXJzLFxuICAgICAgICAgICAgb3B0cyAgICAgICAgID0ge2RlbGVnYXRlOiAnLm5lby1kcmFnZ2FibGUnLCBzY29wZTogbWV9LFxuICAgICAgICAgICAgc3RvcmUgICAgICAgID0gb3duZXIuc3RvcmU7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB7J2RyYWc6ZW5kJyAgOiBtZS5vbkRyYWdFbmQsICAgLi4ub3B0c30sXG4gICAgICAgICAgICB7J2RyYWc6c3RhcnQnOiBtZS5vbkRyYWdTdGFydCwgLi4ub3B0c31cbiAgICAgICAgKTtcblxuICAgICAgICBvd25lci5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgc3RvcmUub24oe1xuICAgICAgICAgICAgbG9hZCA6IG1lLm9uU3RvcmVMb2FkLFxuICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzdG9yZSBpcyBhbHJlYWR5IGxvYWRlZFxuICAgICAgICBpZiAoc3RvcmUuZ2V0Q291bnQoKSA+IDApIHtcbiAgICAgICAgICAgIG1lLm9uU3RvcmVMb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZHJhZ2dhYmxlXG4gICAgICovXG4gICAgYWRqdXN0TGlzdEl0ZW1DbHMoZHJhZ2dhYmxlKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciA9IG1lLm93bmVyLFxuICAgICAgICAgICAgc3RvcmUgPSBvd25lci5zdG9yZSxcbiAgICAgICAgICAgIHZkb20gID0gb3duZXIudmRvbSxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgc3RvcmUuaXRlbXMuZm9yRWFjaCgocmVjb3JkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbm9kZSA9IG1lLmdldEl0ZW1WZG9tKHJlY29yZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICAgICAgTmVvQXJyYXlbZHJhZ2dhYmxlID8gJ2FkZCcgOiAncmVtb3ZlJ10obm9kZS5jbHMsICduZW8tZHJhZ2dhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG93bmVyLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gdmRvbVxuICAgICAqL1xuICAgIGdldEl0ZW1WZG9tKHJlY29yZCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXIudmRvbS5jbltpbmRleF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcHJveHkgICAgICAgID0gbWUuZHJhZ1Byb3h5LFxuICAgICAgICAgICAgICAgIGNscyAgICAgICAgICA9IHByb3h5LmNscyB8fCB7fSxcbiAgICAgICAgICAgICAgICByZWN0ICAgICAgICAgPSBtZS5kcmFnRWxlbWVudFJlY3QsXG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlID0gcHJveHkud3JhcHBlclN0eWxlIHx8IHt9O1xuXG4gICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWFuaW1hdGUnKTtcbiAgICAgICAgICAgIHByb3h5LmNscyA9IGNscztcblxuICAgICAgICAgICAgLy8gZW5zdXJlIHRvIGdldCBpbnRvIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlLmxlZnQgPSBgJHtyZWN0LmxlZnR9cHhgO1xuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZS50b3AgID0gYCR7cmVjdC50b3B9cHhgO1xuXG4gICAgICAgICAgICAgICAgcHJveHkud3JhcHBlclN0eWxlID0gd3JhcHBlclN0eWxlO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmRyYWdFbmQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgfSwgMzApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUub3duZXIuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBtZS5kcmFnRWxlbWVudCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQobWUub3duZXIudmRvbSwgZGF0YS5wYXRoWzBdLmlkKS52ZG9tO1xuICAgICAgICAgICAgbWUuZHJhZ1N0YXJ0KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblN0b3JlTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RMaXN0SXRlbUNscyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhPXt9XG4gICAgICovXG4gICAgc2V0RGF0YShkYXRhPXt9KSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvd25lciAgICA9IG1lLm93bmVyLFxuICAgICAgICAgICAgcmVjb3JkSWQgPSBvd25lci5nZXRJdGVtUmVjb3JkSWQobWUuZ2V0RHJhZ0VsZW1lbnRSb290KCkuaWQpO1xuXG4gICAgICAgIGRhdGEucmVjb3JkID0gb3duZXIuc3RvcmUuZ2V0KHJlY29yZElkKTtcblxuICAgICAgICBzdXBlci5zZXREYXRhKGRhdGEpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoRHJhZ1pvbmUpO1xuXG5leHBvcnQge0RyYWdab25lIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=