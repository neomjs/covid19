(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/draggable/sensor/Touch.mjs"],{

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs ***!
  \*****************************************************************/
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
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Abstract base class for other sensors
 * @class Neo.main.draggable.sensor.Base
 * @extends Neo.core.Base
 */
class Base extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Base'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Base',
        /**
         * @member {HTMLElement|null} currentElement=null
         * @protected
         */
        currentElement: null,
        /**
         * @member {String[]} dragTargetClasses=['neo-draggable','neo-resizable']
         */
        dragTargetClasses: ['neo-draggable', 'neo-resizable'],
        /**
         * @member {Boolean} isDragging=false
         * @protected
         */
        isDragging: false,
        /**
         * @member {Event|null} lastEvent=null
         * @protected
         */
        lastEvent: null,
        /**
         * @member {Event|null} startEvent=null
         * @protected
         */
        startEvent: null
    }}

    /**
     *
     */
    onConstructed() {
        this.attach();
        super.onConstructed();
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {}

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {}

    /**
     * Triggers a custom event on the target element
     * @param {HTMLElement} element - Element to trigger event on
     * @param {Object} sensorEvent - Sensor event to trigger
     * @returns {Event}
     */
    trigger(element, sensorEvent) {
        const event = document.createEvent('Event');
        event.detail = sensorEvent;
        event.initEvent(sensorEvent.type, true, true);
        element.dispatchEvent(event);
        this.lastEvent = sensorEvent;

        return sensorEvent;
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs ***!
  \******************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Touch
/* harmony export */ });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Base.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");



let preventScrolling = false;

// WebKit requires cancelable touchmove events to be added as early as possible
window.addEventListener('touchmove', event => {
    if (!preventScrolling) {
        return;
    }

    // Prevent scrolling
    if (event.cancelable) {
        event.preventDefault();
    }
}, {cancelable: true, passive: false});

/**
 * @class Neo.main.draggable.sensor.Touch
 * @extends Neo.main.draggable.sensor.Base
 */
class Touch extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.draggable.sensor.Touch'
         * @protected
         */
        className: 'Neo.main.draggable.sensor.Touch',
        /**
         * @member {Number} delay=200
         */
        delay: 200,
        /**
         * @member {Number} minDistance=0
         */
        minDistance: 0,
        /**
         * @member {Number|null} pageX=null
         * @protected
         */
        pageX: null,
        /**
         * @member {Number|null} pageY=null
         * @protected
         */
        pageY: null,
        /**
         * @member {Number|null} tapTimeout=null
         */
        tapTimeout: null,
        /**
         * @member {Number} touchStartTime=0
         */
        touchStartTime: 0
    }}

    /**
     *
     * @param config
     */
    constructor(config) {
        super(config);
        Neo.bindMethods(this, ['onDistanceChange', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'startDrag']);
    }

    /**
     * Attaches sensors event listeners to the DOM
     */
    attach() {
        document.addEventListener('touchstart', this.onTouchStart);
    }

    /**
     * Detaches sensors event listeners from the DOM
     */
    detach() {
        document.removeEventListener('touchstart', this.onTouchStart);
    }

    /**
     * Detect change in distance, starting drag when both delay and distance requirements are met
     * @param {TouchEvent|Object} event - Object in case it does get trigger via the tapTimeout
     */
    onDistanceChange(event) {
        let me = this;

        if (me.currentElement) {
            const {pageX, pageY}    = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(event),
                  start             = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(me.startEvent),
                  timeElapsed       = Date.now() - me.touchStartTime,
                  distanceTravelled = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getDistance(start.pageX, start.pageY, pageX, pageY) || 0;

            Object.assign(me, {pageX, pageY});

            if (timeElapsed >= me.delay && distanceTravelled >= me.minDistance) {
                clearTimeout(me.tapTimeout);
                document.removeEventListener('touchmove', me.onDistanceChange);
                me.startDrag();
            }
        }
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchEnd(event) {
        preventScrolling = false;

        let me = this;

        clearTimeout(me.tapTimeout);

        document.removeEventListener('dragstart',   preventDefault);
        document.removeEventListener('touchcancel', me.onTouchEnd);
        document.removeEventListener('touchend',    me.onTouchEnd);
        document.removeEventListener('touchmove',   me.onDistanceChange);

        if (me.dragging) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(event);

            let element = me.currentElement,
                target  = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

            event.preventDefault();

            me.trigger(element, {
                clientX      : pageX,
                clientY      : pageY,
                element,
                eventPath    : _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getPathFromElement(target),
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:end'
            });

            document.removeEventListener('contextmenu', preventDefault, true);
            document.removeEventListener('touchmove',   me.onTouchMove);

            Object.assign(me, {
                currentElement: null,
                dragging      : false,
                startEvent    : null
            });
        }

        me.dragging = false;
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchMove(event) {
        let me = this;

        if (me.dragging) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(event);

            let element = me.currentElement,
                target  = document.elementFromPoint(pageX - window.scrollX, pageY - window.scrollY);

            me.trigger(element, {
                clientX      : pageX,
                clientY      : pageY,
                element,
                eventPath    : _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getPathFromElement(target),
                originalEvent: event,
                path         : me.startEvent.path || me.startEvent.composedPath(),
                target,
                type         : 'drag:move'
            });
        }
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchStart(event) {
        let me     = this,
            target = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.testPathInclusion(event, me.dragTargetClasses);

        if (target) {
            const {pageX, pageY} = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(event);

            Object.assign(me, {
                currentElement: target.node,
                pageX         : pageX,
                pageY         : pageY,
                startEvent    : event,
                touchStartTime: Date.now()
            });

            document.addEventListener('dragstart',   preventDefault);
            document.addEventListener('touchcancel', me.onTouchEnd);
            document.addEventListener('touchend',    me.onTouchEnd);
            document.addEventListener('touchmove',   me.onDistanceChange, {cancelable: true});

            me.tapTimeout = setTimeout(() => {
                me.onDistanceChange({touches: [{pageX: me.pageX, pageY: me.pageY}]});
            }, me.delay);
        }
    }

    /**
     *
     */
    startDrag() {
        let me         = this,
            element    = me.currentElement,
            startEvent = me.startEvent,
            touch      = _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getTouchCoords(me.startEvent);

        me.trigger(element, {
            clientX      : touch.pageX,
            clientY      : touch.pageY,
            element,
            originalEvent: startEvent,
            path         : startEvent.path || startEvent.composedPath(),
            target       : startEvent.target,
            type         : 'drag:start'
        });

        me.dragging = true; // todo

        if (me.dragging) {
            document.addEventListener('contextmenu', preventDefault, true);
            document.addEventListener('touchmove',   me.onTouchMove);
        }

        preventScrolling = me.dragging;
    }
}

function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

Neo.applyClassConfig(Touch);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL0Jhc2UubWpzIiwid2VicGFjazovL2NvdmlkMTktZ2FsbGVyeS8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvVG91Y2gubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtREFBUTtBQUMzQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRW1DO0FBQ1M7O0FBRTVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsaUNBQWlDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4Q0FBSTtBQUN4Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsYUFBYSxNQUFNLGtFQUF3QjtBQUM5RCxzQ0FBc0Msa0VBQXdCO0FBQzlEO0FBQ0Esc0NBQXNDLCtEQUFxQjs7QUFFM0QsK0JBQStCLGFBQWE7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGFBQWEsR0FBRyxrRUFBd0I7O0FBRTNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isc0VBQTRCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsYUFBYSxHQUFHLGtFQUF3Qjs7QUFFM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixzRUFBNEI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxRUFBMkI7O0FBRWhEO0FBQ0EsbUJBQW1CLGFBQWEsR0FBRyxrRUFBd0I7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLGlCQUFpQjs7QUFFNUY7QUFDQSxxQ0FBcUMsV0FBVyxpQ0FBaUMsRUFBRTtBQUNuRixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixrRUFBd0I7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9zcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL1RvdWNoLm1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb3JlQmFzZSBmcm9tICcuLi8uLi8uLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBvdGhlciBzZW5zb3JzXG4gKiBAY2xhc3MgTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb3JlQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uZHJhZ2dhYmxlLnNlbnNvci5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fG51bGx9IGN1cnJlbnRFbGVtZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY3VycmVudEVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gZHJhZ1RhcmdldENsYXNzZXM9WyduZW8tZHJhZ2dhYmxlJywnbmVvLXJlc2l6YWJsZSddXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnVGFyZ2V0Q2xhc3NlczogWyduZW8tZHJhZ2dhYmxlJywgJ25lby1yZXNpemFibGUnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzRHJhZ2dpbmc9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtFdmVudHxudWxsfSBsYXN0RXZlbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBsYXN0RXZlbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtFdmVudHxudWxsfSBzdGFydEV2ZW50PW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnRFdmVudDogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoKCk7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgRE9NXG4gICAgICovXG4gICAgYXR0YWNoKCkge31cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHNlbnNvcnMgZXZlbnQgbGlzdGVuZXJzIGZyb20gdGhlIERPTVxuICAgICAqL1xuICAgIGRldGFjaCgpIHt9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byB0cmlnZ2VyIGV2ZW50IG9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNlbnNvckV2ZW50IC0gU2Vuc29yIGV2ZW50IHRvIHRyaWdnZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnR9XG4gICAgICovXG4gICAgdHJpZ2dlcihlbGVtZW50LCBzZW5zb3JFdmVudCkge1xuICAgICAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICBldmVudC5kZXRhaWwgPSBzZW5zb3JFdmVudDtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHNlbnNvckV2ZW50LnR5cGUsIHRydWUsIHRydWUpO1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmxhc3RFdmVudCA9IHNlbnNvckV2ZW50O1xuXG4gICAgICAgIHJldHVybiBzZW5zb3JFdmVudDtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBEb21FdmVudHMgZnJvbSAnLi4vLi4vRG9tRXZlbnRzLm1qcyc7XG5cbmxldCBwcmV2ZW50U2Nyb2xsaW5nID0gZmFsc2U7XG5cbi8vIFdlYktpdCByZXF1aXJlcyBjYW5jZWxhYmxlIHRvdWNobW92ZSBldmVudHMgdG8gYmUgYWRkZWQgYXMgZWFybHkgYXMgcG9zc2libGVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBldmVudCA9PiB7XG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IHNjcm9sbGluZ1xuICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSwge2NhbmNlbGFibGU6IHRydWUsIHBhc3NpdmU6IGZhbHNlfSk7XG5cbi8qKlxuICogQGNsYXNzIE5lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuVG91Y2hcbiAqIEBleHRlbmRzIE5lby5tYWluLmRyYWdnYWJsZS5zZW5zb3IuQmFzZVxuICovXG5jbGFzcyBUb3VjaCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLlRvdWNoJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubWFpbi5kcmFnZ2FibGUuc2Vuc29yLlRvdWNoJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gZGVsYXk9MjAwXG4gICAgICAgICAqL1xuICAgICAgICBkZWxheTogMjAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBtaW5EaXN0YW5jZT0wXG4gICAgICAgICAqL1xuICAgICAgICBtaW5EaXN0YW5jZTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBwYWdlWD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHBhZ2VYOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHBhZ2VZPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcGFnZVk6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gdGFwVGltZW91dD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB0YXBUaW1lb3V0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB0b3VjaFN0YXJ0VGltZT0wXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaFN0YXJ0VGltZTogMFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgTmVvLmJpbmRNZXRob2RzKHRoaXMsIFsnb25EaXN0YW5jZUNoYW5nZScsICdvblRvdWNoRW5kJywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hTdGFydCcsICdzdGFydERyYWcnXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgc2Vuc29ycyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIERPTVxuICAgICAqL1xuICAgIGF0dGFjaCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBzZW5zb3JzIGV2ZW50IGxpc3RlbmVycyBmcm9tIHRoZSBET01cbiAgICAgKi9cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0IGNoYW5nZSBpbiBkaXN0YW5jZSwgc3RhcnRpbmcgZHJhZyB3aGVuIGJvdGggZGVsYXkgYW5kIGRpc3RhbmNlIHJlcXVpcmVtZW50cyBhcmUgbWV0XG4gICAgICogQHBhcmFtIHtUb3VjaEV2ZW50fE9iamVjdH0gZXZlbnQgLSBPYmplY3QgaW4gY2FzZSBpdCBkb2VzIGdldCB0cmlnZ2VyIHZpYSB0aGUgdGFwVGltZW91dFxuICAgICAqL1xuICAgIG9uRGlzdGFuY2VDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHtwYWdlWCwgcGFnZVl9ICAgID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKGV2ZW50KSxcbiAgICAgICAgICAgICAgICAgIHN0YXJ0ICAgICAgICAgICAgID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKG1lLnN0YXJ0RXZlbnQpLFxuICAgICAgICAgICAgICAgICAgdGltZUVsYXBzZWQgICAgICAgPSBEYXRlLm5vdygpIC0gbWUudG91Y2hTdGFydFRpbWUsXG4gICAgICAgICAgICAgICAgICBkaXN0YW5jZVRyYXZlbGxlZCA9IERvbUV2ZW50cy5nZXREaXN0YW5jZShzdGFydC5wYWdlWCwgc3RhcnQucGFnZVksIHBhZ2VYLCBwYWdlWSkgfHwgMDtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge3BhZ2VYLCBwYWdlWX0pO1xuXG4gICAgICAgICAgICBpZiAodGltZUVsYXBzZWQgPj0gbWUuZGVsYXkgJiYgZGlzdGFuY2VUcmF2ZWxsZWQgPj0gbWUubWluRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWUudGFwVGltZW91dCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgbWUub25EaXN0YW5jZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgbWUuc3RhcnREcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHByZXZlbnRTY3JvbGxpbmcgPSBmYWxzZTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGNsZWFyVGltZW91dChtZS50YXBUaW1lb3V0KTtcblxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAgIHByZXZlbnREZWZhdWx0KTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBtZS5vblRvdWNoRW5kKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAgICBtZS5vblRvdWNoRW5kKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgICBtZS5vbkRpc3RhbmNlQ2hhbmdlKTtcblxuICAgICAgICBpZiAobWUuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHtwYWdlWCwgcGFnZVl9ID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKGV2ZW50KTtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBtZS5jdXJyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQgID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChwYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCBwYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbWUudHJpZ2dlcihlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgY2xpZW50WCAgICAgIDogcGFnZVgsXG4gICAgICAgICAgICAgICAgY2xpZW50WSAgICAgIDogcGFnZVksXG4gICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBldmVudFBhdGggICAgOiBEb21FdmVudHMuZ2V0UGF0aEZyb21FbGVtZW50KHRhcmdldCksXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcGF0aCAgICAgICAgIDogbWUuc3RhcnRFdmVudC5wYXRoIHx8IG1lLnN0YXJ0RXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnOmVuZCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHByZXZlbnREZWZhdWx0LCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsICAgbWUub25Ub3VjaE1vdmUpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZHJhZ2dpbmcgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0RXZlbnQgICAgOiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1RvdWNoRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHtwYWdlWCwgcGFnZVl9ID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKGV2ZW50KTtcblxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBtZS5jdXJyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQgID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChwYWdlWCAtIHdpbmRvdy5zY3JvbGxYLCBwYWdlWSAtIHdpbmRvdy5zY3JvbGxZKTtcblxuICAgICAgICAgICAgbWUudHJpZ2dlcihlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgY2xpZW50WCAgICAgIDogcGFnZVgsXG4gICAgICAgICAgICAgICAgY2xpZW50WSAgICAgIDogcGFnZVksXG4gICAgICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBldmVudFBhdGggICAgOiBEb21FdmVudHMuZ2V0UGF0aEZyb21FbGVtZW50KHRhcmdldCksXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcGF0aCAgICAgICAgIDogbWUuc3RhcnRFdmVudC5wYXRoIHx8IG1lLnN0YXJ0RXZlbnQuY29tcG9zZWRQYXRoKCksXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICA6ICdkcmFnOm1vdmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtUb3VjaEV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldCA9IERvbUV2ZW50cy50ZXN0UGF0aEluY2x1c2lvbihldmVudCwgbWUuZHJhZ1RhcmdldENsYXNzZXMpO1xuXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHtwYWdlWCwgcGFnZVl9ID0gRG9tRXZlbnRzLmdldFRvdWNoQ29vcmRzKGV2ZW50KTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50OiB0YXJnZXQubm9kZSxcbiAgICAgICAgICAgICAgICBwYWdlWCAgICAgICAgIDogcGFnZVgsXG4gICAgICAgICAgICAgICAgcGFnZVkgICAgICAgICA6IHBhZ2VZLFxuICAgICAgICAgICAgICAgIHN0YXJ0RXZlbnQgICAgOiBldmVudCxcbiAgICAgICAgICAgICAgICB0b3VjaFN0YXJ0VGltZTogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsICAgcHJldmVudERlZmF1bHQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBtZS5vblRvdWNoRW5kKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgICAgbWUub25Ub3VjaEVuZCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAgIG1lLm9uRGlzdGFuY2VDaGFuZ2UsIHtjYW5jZWxhYmxlOiB0cnVlfSk7XG5cbiAgICAgICAgICAgIG1lLnRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5vbkRpc3RhbmNlQ2hhbmdlKHt0b3VjaGVzOiBbe3BhZ2VYOiBtZS5wYWdlWCwgcGFnZVk6IG1lLnBhZ2VZfV19KTtcbiAgICAgICAgICAgIH0sIG1lLmRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc3RhcnREcmFnKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBlbGVtZW50ICAgID0gbWUuY3VycmVudEVsZW1lbnQsXG4gICAgICAgICAgICBzdGFydEV2ZW50ID0gbWUuc3RhcnRFdmVudCxcbiAgICAgICAgICAgIHRvdWNoICAgICAgPSBEb21FdmVudHMuZ2V0VG91Y2hDb29yZHMobWUuc3RhcnRFdmVudCk7XG5cbiAgICAgICAgbWUudHJpZ2dlcihlbGVtZW50LCB7XG4gICAgICAgICAgICBjbGllbnRYICAgICAgOiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgIGNsaWVudFkgICAgICA6IHRvdWNoLnBhZ2VZLFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IHN0YXJ0RXZlbnQsXG4gICAgICAgICAgICBwYXRoICAgICAgICAgOiBzdGFydEV2ZW50LnBhdGggfHwgc3RhcnRFdmVudC5jb21wb3NlZFBhdGgoKSxcbiAgICAgICAgICAgIHRhcmdldCAgICAgICA6IHN0YXJ0RXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgdHlwZSAgICAgICAgIDogJ2RyYWc6c3RhcnQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRyYWdnaW5nID0gdHJ1ZTsgLy8gdG9kb1xuXG4gICAgICAgIGlmIChtZS5kcmFnZ2luZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBwcmV2ZW50RGVmYXVsdCwgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAgIG1lLm9uVG91Y2hNb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZlbnRTY3JvbGxpbmcgPSBtZS5kcmFnZ2luZztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVG91Y2gpO1xuXG5leHBvcnQge1RvdWNoIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=