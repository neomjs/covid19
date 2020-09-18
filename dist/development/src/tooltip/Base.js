self["webpackChunk"](["src/tooltip/Base"],{

/***/ "./node_modules/neo.mjs/src/tooltip/Base.mjs":
/*!***************************************************!*\
  !*** ./node_modules/neo.mjs/src/tooltip/Base.mjs ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Floating.mjs */ "./node_modules/neo.mjs/src/util/Floating.mjs");
/* harmony import */ var _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/Label.mjs */ "./node_modules/neo.mjs/src/component/Label.mjs");




/**
 * Base class for component tooltips
 * @class Neo.tooltip.Base
 * @extends Neo.container.Base
 */
class Base extends _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
        mixins: [_util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]],
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

            domListeners.push({
                mouseenter: me.onMouseEnter,
                scope     : me
            }, {
                mouseleave: me.onMouseLeave,
                scope     : me
            });

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
                    module: _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__["default"],
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
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Mixin to make Components floating (e.g. Windows)
 * @class Neo.util.Floating
 * @extends Neo.core.Base
 */
class Floating extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

/* harmony default export */ __webpack_exports__["default"] = (Floating);

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdG9vbHRpcC9CYXNlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9GbG9hdGluZy5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDRDtBQUNFOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDJEQUFTO0FBQzVCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTTtBQUMxQjtBQUNBO0FBQ0EsaUJBQWlCLDBEQUFRO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0QkFBNEIsNERBQUs7QUFDakM7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3pSQTtBQUFBO0FBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNEQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSx1RUFBUSxFIiwiZmlsZSI6InNyYy90b29sdGlwL0Jhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lci9CYXNlLm1qcyc7XG5pbXBvcnQgRmxvYXRpbmcgIGZyb20gJy4uL3V0aWwvRmxvYXRpbmcubWpzJztcbmltcG9ydCBMYWJlbCAgICAgZnJvbSAnLi4vY29tcG9uZW50L0xhYmVsLm1qcyc7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgY29tcG9uZW50IHRvb2x0aXBzXG4gKiBAY2xhc3MgTmVvLnRvb2x0aXAuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udG9vbHRpcC5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udG9vbHRpcC5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2x0aXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbHRpcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLXRvb2x0aXAnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10b29sdGlwJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IGNvbXBvbmVudCB3aGljaCBpcyBzdXBwb3NlZCB0byBzaG93IHRoaXMgdG9vbHRpcCBvbiBtb3VzZWVudGVyXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBjb21wb25lbnRJZF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50SWRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZWdhdGVzIGRvd24gdG8gYSBDU1Mgc2VsZWN0b3IgaW5zaWRlIHRoZSB0YXJnZXQgY29tcG9uZW50XG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkZWxlZ2F0ZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkZWxlZ2F0ZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBoaWRkZW4gd2hpbGUgaG92ZXJpbmcgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAgICAgKiBVc2UgbnVsbCB0byBkaXNhYmxlIHRoZSBkaXNtaXNzIGxvZ2ljLlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZGlzbWlzc0RlbGF5PTEwMDAwXG4gICAgICAgICAqL1xuICAgICAgICBkaXNtaXNzRGVsYXk6IDEwMDAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpc21pc3NEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGRpc21pc3NEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRpc21pc3NEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBzaG93blxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5PTQwMFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5OiA0MDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2hvd0RlbGF5IHRhc2sgaWQgZ2VuZXJhdGVkIGJ5IHNldFRpbWVvdXQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5VGFza0lkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5VGFza0lkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IG1peGluc1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtGbG9hdGluZ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVsYXkgaW4gbXMgYmVmb3JlIHRoZSB0b29sdGlwIGdldHMgc2hvd25cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheT0yMDBcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheTogMjAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNob3dEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgcHJldmVudHMgdGhlIHRvb2x0aXAgZnJvbSBoaWRpbmcgd2hpbGUgdGhlIG1vdXNlIGN1cnNvciBpcyBhYm92ZSBpdFxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufG51bGx9IHN0YXlPbkhvdmVyXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF5T25Ib3Zlcl86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCB0byBhZGQgYSBsYWJlbCBpdGVtXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdGV4dF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dF86IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb21wb25lbnRJZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDb21wb25lbnRJZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiByZW1vdmUgdGhlIGNvbXBvbmVudCBkb21MaXN0ZW5lcnNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50ICAgID0gTmVvLmdldENvbXBvbmVudCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gY29tcG9uZW50LmRvbUxpc3RlbmVycyB8fCBbXTtcblxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1vdXNlZW50ZXI6IG1lLnNob3dEZWxheWVkLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlICA6IG1lLmRlbGVnYXRlLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgICA6IG1lXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbW91c2VsZWF2ZTogbWUuaGlkZURlbGF5ZWQsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUgIDogbWUuZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzdGF5T25Ib3ZlciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFN0YXlPbkhvdmVyKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHJlbW92ZSB0aGUgY29tcG9uZW50IGRvbUxpc3RlbmVyc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnMgfHwgW107XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtb3VzZWVudGVyOiBtZS5vbk1vdXNlRW50ZXIsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBtb3VzZWxlYXZlOiBtZS5vbk1vdXNlTGVhdmUsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRleHQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBpdGVtcyA9IG1lLml0ZW1zIHx8IFtdLFxuICAgICAgICAgICAgICAgIGl0ZW0gID0gaXRlbXNbMF07XG5cbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ubnR5cGUgPT09ICdsYWJlbCcpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZTogTGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHQgIDogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1lLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgb25lIG9yIG11bHRpcGxlIHNldFRpbWVvdXQgY2FsbChzKVxuICAgICAqIEBwYXJhbSB7U3RyaW5nW118U3RyaW5nfSB0aW1lcnMgdmFsaWQgdmFsdWVzOiBkaXNtaXNzLCBoaWRlLCBzaG93XG4gICAgICovXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVycykge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGltZXJzKSkge1xuICAgICAgICAgICAgdGltZXJzID0gW3RpbWVyc107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgaWQ7XG5cbiAgICAgICAgdGltZXJzLmZvckVhY2godGltZXIgPT4ge1xuICAgICAgICAgICAgaWQgPSB0aW1lciArICdEZWxheVRhc2tJZCc7XG5cbiAgICAgICAgICAgIGlmIChtZVtpZF0pIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWVbaWRdKTtcbiAgICAgICAgICAgICAgICBtZVtpZF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnN0YW50bHkgaGlkZXMgdGhlIHRvb2x0aXBcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSBkYXRhXG4gICAgICovXG4gICAgaGlkZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuY2xlYXJUaW1lb3V0KFsnZGlzbWlzcycsICdoaWRlJywgJ3Nob3cnXSk7XG5cbiAgICAgICAgaWYgKG1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIG1lLnVubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSB0b29sdGlwIHVzaW5nIHRoZSBnaXZlbiBoaWRlRGVsYXlcbiAgICAgKiBAcGFyYW0ge09iamVjdHxudWxsfSBkYXRhXG4gICAgICovXG4gICAgaGlkZURlbGF5ZWQoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5oaWRlRGVsYXkpIHtcbiAgICAgICAgICAgIG1lLmhpZGVEZWxheVRhc2tJZCA9IHNldFRpbWVvdXQobWUuaGlkZS5iaW5kKG1lKSwgbWUuaGlkZURlbGF5LCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmhpZGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBtb3VzZWVudGVyIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgdG9vbHRpcCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbk1vdXNlRW50ZXIoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0SWQgPSBkYXRhLnBhdGhbMF0uaWQ7XG5cbiAgICAgICAgLy8gb25seSB1c2UgcGF0aFswXSBiYXNlZCBldmVudHMgdG8gaWdub3JlIG1vdXNlZW50ZXIgJiBsZWF2ZSBmb3IgY2hpbGQgbm9kZXNcbiAgICAgICAgaWYgKG1lLmlkID09PSB0YXJnZXRJZCkge1xuICAgICAgICAgICAgbWUuY2xlYXJUaW1lb3V0KFsnZGlzbWlzcycsICdoaWRlJ10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbW91c2VsZWF2ZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHRvb2x0aXAgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Nb3VzZUxlYXZlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldElkID0gZGF0YS5wYXRoWzBdLmlkO1xuXG4gICAgICAgIC8vIG9ubHkgdXNlIHBhdGhbMF0gYmFzZWQgZXZlbnRzIHRvIGlnbm9yZSBtb3VzZWVudGVyICYgbGVhdmUgZm9yIGNoaWxkIG5vZGVzXG4gICAgICAgIGlmIChtZS5pZCA9PT0gdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIG1lLmhpZGVEZWxheWVkKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGx5IHNob3dzIHRoZSB0b29sdGlwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBzaG93KGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5zaG93RGVsYXlUYXNrSWQgPSBudWxsO1xuXG4gICAgICAgIG1lLmNsZWFyVGltZW91dCgnaGlkZScpO1xuXG4gICAgICAgIGlmIChtZS5kaXNtaXNzRGVsYXkpIHtcbiAgICAgICAgICAgIG1lLmRpc21pc3NEZWxheVRhc2tJZCA9IHNldFRpbWVvdXQobWUuaGlkZS5iaW5kKG1lKSwgbWUuZGlzbWlzc0RlbGF5LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWUubW91bnRlZCkge1xuICAgICAgICAgICAgbWUubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSB0b29sdGlwIHVzaW5nIHRoZSBnaXZlbiBzaG93RGVsYXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIHNob3dEZWxheWVkKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc2hvd0RlbGF5KSB7XG4gICAgICAgICAgICBtZS5zaG93RGVsYXlUYXNrSWQgPSBzZXRUaW1lb3V0KG1lLnNob3cuYmluZChtZSksIG1lLnNob3dEZWxheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5zaG93KGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIE1peGluIHRvIG1ha2UgQ29tcG9uZW50cyBmbG9hdGluZyAoZS5nLiBXaW5kb3dzKVxuICogQGNsYXNzIE5lby51dGlsLkZsb2F0aW5nXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIEZsb2F0aW5nIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby51dGlsLkZsb2F0aW5nJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udXRpbC5GbG9hdGluZycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdtaXhpbi1mbG9hdGluZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdtaXhpbi1mbG9hdGluZycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtaXhpbj10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBhbmltYXRlVGFyZ2V0SWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0ZVRhcmdldElkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW9kYWw9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIG1vZGFsOiBmYWxzZVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEZsb2F0aW5nKTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmc7Il0sInNvdXJjZVJvb3QiOiIifQ==