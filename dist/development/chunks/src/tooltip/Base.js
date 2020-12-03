(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/tooltip/Base"],{

/***/ "./node_modules/neo.mjs/src/tooltip/Base.mjs":
/*!***************************************************!*\
  !*** ./node_modules/neo.mjs/src/tooltip/Base.mjs ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Base
/* harmony export */ });
/* harmony import */ var _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Floating.mjs */ "./node_modules/neo.mjs/src/util/Floating.mjs");
/* harmony import */ var _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/Label.mjs */ "./node_modules/neo.mjs/src/component/Label.mjs");




/**
 * Base class for component tooltips
 * @class Neo.tooltip.Base
 * @extends Neo.container.Base
 */
class Base extends _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tooltip.Base'
         * @protected
         */
        className: 'Neo.tooltip.Base',
        /**
         * @member {String} ntype='tooltip'
         * @protected
         */
        ntype: 'tooltip',
        /**
         * @member {String[]} cls=['neo-tooltip']
         */
        cls: ['neo-tooltip'],
        /**
         * A reference to the target component which is supposed to show this tooltip on mouseenter
         * @member {String|null} componentId_=null
         */
        componentId_: null,
        /**
         * Delegates down to a CSS selector inside the target component
         * @member {String|null} delegate=null
         */
        delegate: null,
        /**
         * The delay in ms before the tooltip gets hidden while hovering the target element.
         * Use null to disable the dismiss logic.
         * @member {Number|null} dismissDelay=10000
         */
        dismissDelay: 10000,
        /**
         * The dismissDelay task id generated by setTimeout()
         * @member {Number|null} dismissDelayTaskId=null
         * @protected
         */
        dismissDelayTaskId: null,
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} hideDelay=400
         */
        hideDelay: 400,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} hideDelayTaskId=null
         * @protected
         */
        hideDelayTaskId: null,
        /**
         * @member {Array} mixins
         * @protected
         */
        mixins: [_util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__.default],
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} showDelay=200
         */
        showDelay: 200,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} showDelayTaskId=null
         * @protected
         */
        showDelayTaskId: null,
        /**
         * True prevents the tooltip from hiding while the mouse cursor is above it
         * @member {Boolean|null} stayOnHover_=true
         */
        stayOnHover_: true,
        /**
         * Shortcut to add a label item
         * @member {String} text_=null
         */
        text_: null
    }}

    /**
     * Triggered after the componentId config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetComponentId(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                component    = Neo.getComponent(value),
                domListeners = component.domListeners || [];

            domListeners.push({
                mouseenter: me.showDelayed,
                delegate  : me.delegate,
                scope     : me
            }, {
                mouseleave: me.hideDelayed,
                delegate  : me.delegate,
                scope     : me
            });

            component.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the stayOnHover config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetStayOnHover(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                domListeners = me.domListeners || [];

            domListeners.push(
                {mouseenter: me.onMouseEnter, scope: me},
                {mouseleave: me.onMouseLeave, scope: me}
            );

            me.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the text config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetText(value) {
        if (value) {
            let me    = this,
                items = me.items || [],
                item  = items[0];

            if (item && item.ntype === 'label') {
                item.text = value;
            } else {
                items.push({
                    module: _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                    text  : value
                });

                me.items = items;
            }
        }
    }

    /**
     * Clears one or multiple setTimeout call(s)
     * @param {String[]|String} timers valid values: dismiss, hide, show
     */
    clearTimeout(timers) {
        if (!Array.isArray(timers)) {
            timers = [timers];
        }

        let me = this,
            id;

        timers.forEach(timer => {
            id = timer + 'DelayTaskId';

            if (me[id]) {
                clearTimeout(me[id]);
                me[id] = null;
            }
        });
    }

    /**
     * Instantly hides the tooltip
     * @param {Object|null} data
     */
    hide(data) {
        let me = this;

        me.clearTimeout(['dismiss', 'hide', 'show']);

        if (me.mounted) {
            me.unmount();
        }
    }

    /**
     * Hides the tooltip using the given hideDelay
     * @param {Object|null} data
     */
    hideDelayed(data) {
        let me = this;

        if (me.hideDelay) {
            me.hideDelayTaskId = setTimeout(me.hide.bind(me), me.hideDelay, data);
        } else {
            me.hide(data);
        }
    }

    /**
     * mouseenter event listener for the tooltip element
     * @param {Object} data
     */
    onMouseEnter(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.clearTimeout(['dismiss', 'hide']);
        }
    }

    /**
     * mouseleave event listener for the tooltip element
     * @param {Object} data
     */
    onMouseLeave(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.hideDelayed(null);
        }
    }

    /**
     * Instantly shows the tooltip
     * @param {Object} data
     */
    show(data) {
        let me = this;

        me.showDelayTaskId = null;

        me.clearTimeout('hide');

        if (me.dismissDelay) {
            me.dismissDelayTaskId = setTimeout(me.hide.bind(me), me.dismissDelay, data);
        }

        if (!me.mounted) {
            me.mount();
        }
    }

    /**
     * Shows the tooltip using the given showDelay
     * @param {Object} data
     */
    showDelayed(data) {
        let me = this;

        if (me.showDelay) {
            me.showDelayTaskId = setTimeout(me.show.bind(me), me.showDelay, data);
        } else {
            me.show(data);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Floating.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Floating.mjs ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Mixin to make Components floating (e.g. Windows)
 * @class Neo.util.Floating
 * @extends Neo.core.Base
 */
class Floating extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Floating'
         * @protected
         */
        className: 'Neo.util.Floating',
        /**
         * @member {String} ntype='mixin-floating'
         * @protected
         */
        ntype: 'mixin-floating',
        /**
         * @member {Boolean} mixin=true
         */
        mixin: true,
        /**
         * @member {String|null} animateTargetId=null
         */
        animateTargetId: null,
        /**
         * @member {Boolean} modal=false
         */
        modal: false
    }}
}

Neo.applyClassConfig(Floating);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Floating);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdG9vbHRpcC9CYXNlLm1qcyIsIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9GbG9hdGluZy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7QUFDRDtBQUNFOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdEQUFTO0FBQzVCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0EsaUJBQWlCLHVEQUFRO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1Q0FBdUM7QUFDeEQsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNEJBQTRCLHlEQUFLO0FBQ2pDO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RSb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3Mvc3JjL3Rvb2x0aXAvQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVyL0Jhc2UubWpzJztcbmltcG9ydCBGbG9hdGluZyAgZnJvbSAnLi4vdXRpbC9GbG9hdGluZy5tanMnO1xuaW1wb3J0IExhYmVsICAgICBmcm9tICcuLi9jb21wb25lbnQvTGFiZWwubWpzJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBjb21wb25lbnQgdG9vbHRpcHNcbiAqIEBjbGFzcyBOZW8udG9vbHRpcC5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby50b29sdGlwLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby50b29sdGlwLkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndG9vbHRpcCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0b29sdGlwJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tdG9vbHRpcCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLXRvb2x0aXAnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSB0YXJnZXQgY29tcG9uZW50IHdoaWNoIGlzIHN1cHBvc2VkIHRvIHNob3cgdGhpcyB0b29sdGlwIG9uIG1vdXNlZW50ZXJcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGNvbXBvbmVudElkXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnRJZF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxlZ2F0ZXMgZG93biB0byBhIENTUyBzZWxlY3RvciBpbnNpZGUgdGhlIHRhcmdldCBjb21wb25lbnRcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGRlbGVnYXRlPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRlbGVnYXRlOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlbGF5IGluIG1zIGJlZm9yZSB0aGUgdG9vbHRpcCBnZXRzIGhpZGRlbiB3aGlsZSBob3ZlcmluZyB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICAgICAqIFVzZSBudWxsIHRvIGRpc2FibGUgdGhlIGRpc21pc3MgbG9naWMuXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBkaXNtaXNzRGVsYXk9MTAwMDBcbiAgICAgICAgICovXG4gICAgICAgIGRpc21pc3NEZWxheTogMTAwMDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGlzbWlzc0RlbGF5IHRhc2sgaWQgZ2VuZXJhdGVkIGJ5IHNldFRpbWVvdXQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZGlzbWlzc0RlbGF5VGFza0lkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZGlzbWlzc0RlbGF5VGFza0lkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlbGF5IGluIG1zIGJlZm9yZSB0aGUgdG9vbHRpcCBnZXRzIHNob3duXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBoaWRlRGVsYXk9NDAwXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlRGVsYXk6IDQwMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzaG93RGVsYXkgdGFzayBpZCBnZW5lcmF0ZWQgYnkgc2V0VGltZW91dCgpXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBoaWRlRGVsYXlUYXNrSWQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlRGVsYXlUYXNrSWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gbWl4aW5zXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG1peGluczogW0Zsb2F0aW5nXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBzaG93blxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gc2hvd0RlbGF5PTIwMFxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd0RlbGF5OiAyMDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2hvd0RlbGF5IHRhc2sgaWQgZ2VuZXJhdGVkIGJ5IHNldFRpbWVvdXQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gc2hvd0RlbGF5VGFza0lkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd0RlbGF5VGFza0lkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBwcmV2ZW50cyB0aGUgdG9vbHRpcCBmcm9tIGhpZGluZyB3aGlsZSB0aGUgbW91c2UgY3Vyc29yIGlzIGFib3ZlIGl0XG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW58bnVsbH0gc3RheU9uSG92ZXJfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHN0YXlPbkhvdmVyXzogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3J0Y3V0IHRvIGFkZCBhIGxhYmVsIGl0ZW1cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0ZXh0Xz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0XzogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudElkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENvbXBvbmVudElkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHJlbW92ZSB0aGUgY29tcG9uZW50IGRvbUxpc3RlbmVyc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgICAgPSBOZW8uZ2V0Q29tcG9uZW50KHZhbHVlKSxcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBjb21wb25lbnQuZG9tTGlzdGVuZXJzIHx8IFtdO1xuXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbW91c2VlbnRlcjogbWUuc2hvd0RlbGF5ZWQsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUgIDogbWUuZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBtb3VzZWxlYXZlOiBtZS5oaWRlRGVsYXllZCxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZSAgOiBtZS5kZWxlZ2F0ZSxcbiAgICAgICAgICAgICAgICBzY29wZSAgICAgOiBtZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbXBvbmVudC5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHN0YXlPbkhvdmVyIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U3RheU9uSG92ZXIodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gdG9kbzogcmVtb3ZlIHRoZSBjb21wb25lbnQgZG9tTGlzdGVuZXJzXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycyB8fCBbXTtcblxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICAgICAge21vdXNlZW50ZXI6IG1lLm9uTW91c2VFbnRlciwgc2NvcGU6IG1lfSxcbiAgICAgICAgICAgICAgICB7bW91c2VsZWF2ZTogbWUub25Nb3VzZUxlYXZlLCBzY29wZTogbWV9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRleHQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBpdGVtcyA9IG1lLml0ZW1zIHx8IFtdLFxuICAgICAgICAgICAgICAgIGl0ZW0gID0gaXRlbXNbMF07XG5cbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ubnR5cGUgPT09ICdsYWJlbCcpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZTogTGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQgIDogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgb25lIG9yIG11bHRpcGxlIHNldFRpbWVvdXQgY2FsbChzKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW118U3RyaW5nfSB0aW1lcnMgdmFsaWQgdmFsdWVzOiBkaXNtaXNzLCBoaWRlLCBzaG93XG4gICAgICovXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVycykge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGltZXJzKSkge1xuICAgICAgICAgICAgdGltZXJzID0gW3RpbWVyc107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgaWQ7XG5cbiAgICAgICAgdGltZXJzLmZvckVhY2godGltZXIgPT4ge1xuICAgICAgICAgICAgaWQgPSB0aW1lciArICdEZWxheVRhc2tJZCc7XG5cbiAgICAgICAgICAgIGlmIChtZVtpZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWVbaWRdKTtcbiAgICAgICAgICAgICAgICBtZVtpZF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50bHkgaGlkZXMgdGhlIHRvb2x0aXBcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSBkYXRhXG4gICAgICovXG4gICAgaGlkZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuY2xlYXJUaW1lb3V0KFsnZGlzbWlzcycsICdoaWRlJywgJ3Nob3cnXSk7XG5cbiAgICAgICAgaWYgKG1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIG1lLnVubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSB0b29sdGlwIHVzaW5nIHRoZSBnaXZlbiBoaWRlRGVsYXlcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSBkYXRhXG4gICAgICovXG4gICAgaGlkZURlbGF5ZWQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5oaWRlRGVsYXkpIHtcbiAgICAgICAgICAgIG1lLmhpZGVEZWxheVRhc2tJZCA9IHNldFRpbWVvdXQobWUuaGlkZS5iaW5kKG1lKSwgbWUuaGlkZURlbGF5LCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmhpZGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtb3VzZWVudGVyIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgdG9vbHRpcCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbk1vdXNlRW50ZXIoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0SWQgPSBkYXRhLnBhdGhbMF0uaWQ7XG5cbiAgICAgICAgLy8gb25seSB1c2UgcGF0aFswXSBiYXNlZCBldmVudHMgdG8gaWdub3JlIG1vdXNlZW50ZXIgJiBsZWF2ZSBmb3IgY2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKG1lLmlkID09PSB0YXJnZXRJZCkge1xuICAgICAgICAgICAgbWUuY2xlYXJUaW1lb3V0KFsnZGlzbWlzcycsICdoaWRlJ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbW91c2VsZWF2ZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHRvb2x0aXAgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Nb3VzZUxlYXZlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldElkID0gZGF0YS5wYXRoWzBdLmlkO1xuXG4gICAgICAgIC8vIG9ubHkgdXNlIHBhdGhbMF0gYmFzZWQgZXZlbnRzIHRvIGlnbm9yZSBtb3VzZWVudGVyICYgbGVhdmUgZm9yIGNoaWxkIG5vZGVzXG4gICAgICAgIGlmIChtZS5pZCA9PT0gdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIG1lLmhpZGVEZWxheWVkKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGx5IHNob3dzIHRoZSB0b29sdGlwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBzaG93KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5zaG93RGVsYXlUYXNrSWQgPSBudWxsO1xuXG4gICAgICAgIG1lLmNsZWFyVGltZW91dCgnaGlkZScpO1xuXG4gICAgICAgIGlmIChtZS5kaXNtaXNzRGVsYXkpIHtcbiAgICAgICAgICAgIG1lLmRpc21pc3NEZWxheVRhc2tJZCA9IHNldFRpbWVvdXQobWUuaGlkZS5iaW5kKG1lKSwgbWUuZGlzbWlzc0RlbGF5LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWUubW91bnRlZCkge1xuICAgICAgICAgICAgbWUubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSB0b29sdGlwIHVzaW5nIHRoZSBnaXZlbiBzaG93RGVsYXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHNob3dEZWxheWVkKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc2hvd0RlbGF5KSB7XG4gICAgICAgICAgICBtZS5zaG93RGVsYXlUYXNrSWQgPSBzZXRUaW1lb3V0KG1lLnNob3cuYmluZChtZSksIG1lLnNob3dEZWxheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5zaG93KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIE1peGluIHRvIG1ha2UgQ29tcG9uZW50cyBmbG9hdGluZyAoZS5nLiBXaW5kb3dzKVxuICogQGNsYXNzIE5lby51dGlsLkZsb2F0aW5nXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIEZsb2F0aW5nIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby51dGlsLkZsb2F0aW5nJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udXRpbC5GbG9hdGluZycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdtaXhpbi1mbG9hdGluZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdtaXhpbi1mbG9hdGluZycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtaXhpbj10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBhbmltYXRlVGFyZ2V0SWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0ZVRhcmdldElkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kYWw9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIG1vZGFsOiBmYWxzZVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEZsb2F0aW5nKTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmc7Il0sInNvdXJjZVJvb3QiOiIifQ==