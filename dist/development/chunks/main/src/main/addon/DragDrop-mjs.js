(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/DragDrop-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/DragDrop.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/DragDrop.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DomAccess.mjs */ "./node_modules/neo.mjs/src/main/DomAccess.mjs");
/* harmony import */ var _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DomEvents.mjs */ "./node_modules/neo.mjs/src/main/DomEvents.mjs");




/**
 * @class Neo.main.addon.DragDrop
 * @extends Neo.core.Base
 * @singleton
 */
class DragDrop extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.DragDrop'
         * @protected
         */
        className: 'Neo.main.addon.DragDrop',
        /**
         * @member {Boolean} alwaysFireDragMove=false
         */
        alwaysFireDragMove: false,
        /**
         * Optionally set a fixed cursor style to the document.body during drag operations
         * @member {String|null} bodyCursorStyle=null
         */
        bodyCursorStyle: null,
        /**
         * @member {DOMRect|null} scrollContainerRect=null
         */
        boundaryContainerRect: null,
        /**
         * @member {Number} clientX=0
         */
        clientX: 0,
        /**
         * @member {Number} clientY=0
         */
        clientY: 0,
        /**
         * @member {String|null} dragElementRootId=null
         */
        dragElementRootId: null,
        /**
         * @member {String} dragProxyCls='neo-dragproxy'
         */
        dragProxyCls: 'neo-dragproxy',
        /**
         * @member {HTMLElement|null} dragProxyElement=null
         * @protected
         */
        dragProxyElement: null,
        /**
         * @member {DOMRect|null} dragProxyRect=null
         */
        dragProxyRect: null,
        /**
         * @member {String|null} dragZoneId=null
         */
        dragZoneId: null,
        /**
         * You can either pass an array of (dom) ids or cls rules or both
         * @example
         * dropZoneIdentifier: {
         *     ids: ['foo','bar']
         * }
         * @example
         * dropZoneIdentifier: {
         *     cls: ['my-class-1','my-class-2']
         * }
         * @example
         * dropZoneIdentifier: {
         *     cls: ['my-class-1','my-class-2'],
         *     ids: ['foo','bar']
         * }
         * @member {Object|null} dropZoneIdentifier=null
         */
        dropZoneIdentifier: null,
        /**
         * @member {Number} initialScrollLeft=0
         */
        initialScrollLeft: 0,
        /**
         * @member {Number} initialScrollTop=0
         */
        initialScrollTop: 0,
        /**
         * @member {Boolean} moveHorizontal=true
         */
        moveHorizontal: true,
        /**
         * @member {Boolean} moveVertical=true
         */
        moveVertical: true,
        /**
         * @member {Number} offsetX=0
         */
        offsetX: 0,
        /**
         * @member {Number} offsetY=0
         */
        offsetY: 0,
        /**
         * Remote method access for other workers
         * @member {Object} remote
         * @protected
         */
        remote: {
            app: [
                'setConfigs',
                'setDragProxyElement'
            ]
        },
        /**
         * @member {HTMLElement|null} scrollContainerElement=null
         */
        scrollContainerElement: null,
        /**
         * @member {DOMRect|null} scrollContainerRect=null
         */
        scrollContainerRect: null,
        /**
         * @member {Number} scrollFactorLeft=1
         */
        scrollFactorLeft: 1,
        /**
         * @member {Number} scrollFactorTop=1
         */
        scrollFactorTop: 1,
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

        let me      = this,
            imports = [];

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.on({
            mouseEnter: me.onMouseEnter,
            mouseLeave: me.onMouseLeave,
            scope     : me
        });

        me.addGlobalEventListeners();

        if (Neo.config.hasTouchEvents) {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Touch.mjs */ "src/main/draggable/sensor/Touch.mjs").then(__webpack_require__.bind(__webpack_require__, /*! ../draggable/sensor/Touch.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Touch.mjs")));
        } else {
            imports.push(__webpack_require__.e(/*! import() | src/main/draggable/sensor/Mouse.mjs */ "src/main/draggable/sensor/Mouse.mjs").then(__webpack_require__.bind(__webpack_require__, /*! ../draggable/sensor/Mouse.mjs */ "./node_modules/neo.mjs/src/main/draggable/sensor/Mouse.mjs")));
        }

        Promise.all(imports).then(modules => {
            // create the Touch or MouseSensor
            Neo.create({
                module: modules[0].default
            });
        });
    }

    /**
     *
     */
    addGlobalEventListeners() {
        let me = this;

        document.addEventListener('drag:end',   me.onDragEnd  .bind(me), true);
        document.addEventListener('drag:move',  me.onDragMove .bind(me), true);
        document.addEventListener('drag:start', me.onDragStart.bind(me), true);
    }

    /**
     *
     * @param {Event} event
     * @returns {Object}
     */
    getEventData(event) {
        const path = event.path || event.composedPath();

        const e = {
            ..._DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getEventData(event.detail.originalEvent),
            clientX: event.detail.clientX,
            clientY: event.detail.clientY
        };

        if (event.detail.eventPath) {
            e.targetPath = event.detail.eventPath.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getTargetData(e));
        } else {
            e.targetPath = e.path || e.composedPath();
        }

        e.path = path.map(e => _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getTargetData(e));

        return e;
    }

    /**
     *
     * @param {Object} event
     */
    onDragEnd(event) {
        let me          = this,
            parsedEvent = me.getEventData(event),
            isDrop      = me.pathIncludesDropZone(parsedEvent.targetPath);

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setBodyCls({
            remove: ['neo-unselectable']
        });

        if (me.bodyCursorStyle) {
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setStyle({
                id   : 'document.body',
                style: {
                    cursor: null
                }
            });
        }

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
            ...parsedEvent,
            isDrop : isDrop,
            offsetX: me.offsetX,
            offsetY: me.offsetY,
            type   : 'drag:end'
        });

        if (isDrop) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ..._DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.getMouseEventData(event.detail.originalEvent),
                dragZoneId: me.dragZoneId,
                type      : 'drop'
            });
        }

        Object.assign(me, {
            alwaysFireDragMove    : false,
            bodyCursorStyle       : null,
            boundaryContainerRect : null,
            dragElementRootId     : null,
            dragElementRootRect   : null,
            dragProxyCls          : 'neo-dragproxy',
            dragProxyElement      : null,
            dragZoneId            : null,
            dropZoneIdentifier    : null,
            initialScrollLeft     : 0,
            initialScrollTop      : 0,
            moveHorizontal        : true,
            moveVertical          : true,
            scrollContainerElement: null,
            scrollContainerRect   : null,
            setScrollFactorLeft   : 1,
            scrollFactorTop       : 1
        });
    }

    /**
     *
     * @param {Object} event
     */
    onDragMove(event) {
        let me        = this,
            proxyRect = me.dragProxyRect,
            rect      = me.boundaryContainerRect,
            data, left, top;

        if (me.scrollContainerElement) {
            data = me.scrollContainer({
                clientX: event.detail.clientX,
                clientY: event.detail.clientY
            });

            event.detail.clientX = data.clientX;
            event.detail.clientY = data.clientY;
        }

        if (me.dragProxyElement) {
            left = event.detail.clientX - me.offsetX;
            top  = event.detail.clientY - me.offsetY;

            if (rect) {
                if (left < rect.left) {
                    left = rect.left;
                } else if (left > rect.right - proxyRect.width) {
                    left = rect.right - proxyRect.width;
                }

                if (top < rect.top) {
                    top = rect.top;
                } else if (top > rect.bottom - proxyRect.height) {
                    top = rect.bottom - proxyRect.height
                }
            }

            if (!me.moveHorizontal) {
                left = me.dragProxyRect.x;
            }

            me.dragProxyElement.style.left = `${left}px`;

            if (!me.moveVertical) {
                top = me.dragProxyRect.y;
            }

            me.dragProxyElement.style.top = `${top}px`;
        }

        if (!me.dragProxyElement || me.alwaysFireDragMove) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ...me.getEventData(event),
                offsetX: me.offsetX,
                offsetY: me.offsetY,
                type   : 'drag:move'
            });
        }
    }

    /**
     *
     * @param {Object} event
     */
    onDragStart(event) {
        let me   = this,
            rect = event.target.getBoundingClientRect();

        _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setBodyCls({
            add: ['neo-unselectable']
        });

        Object.assign(me, {
            dragProxyRect: rect,
            offsetX      : event.detail.clientX - rect.left,
            offsetY      : event.detail.clientY - rect.top
        });

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
            ...this.getEventData(event),
            type: 'drag:start'
        });
    }

    /**
     *
     * @param {Object} event
     */
    onMouseEnter(event) {
        let me = this;

        if (me.pathIncludesDropZone(event.path)) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ...event,
                dragZoneId: me.dragZoneId,
                type      : 'drop:enter'
            });
        }
    }

    /**
     *
     * @param {Object} event
     */
    onMouseLeave(event) {
        let me = this;

        if (me.pathIncludesDropZone(event.path)) {
            _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
                ...event,
                dragZoneId: me.dragZoneId,
                type      : 'drop:leave'
            });
        }
    }

    /**
     *
     * @param {Array} path
     * @returns {Boolean}
     */
    pathIncludesDropZone(path) {
        let me         = this,
            hasMatch   = true,
            identifier = me.dropZoneIdentifier,
            cls, ids;

        if (identifier) {
            cls = identifier.cls;
            ids = identifier.ids;

            for (const item of path) {
                if (cls) {
                    hasMatch = false;

                    for (const targetCls of item.cls) {
                        if (cls.includes(targetCls)) {
                            hasMatch = true;
                            break;
                        }
                    }
                }

                if (hasMatch && ids && !ids.includes(item.id)) {
                    hasMatch = false;
                }

                if (hasMatch) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     *
     * @param {Object} data
     * @param {Number} data.clientX
     * @param {Number} data.clientY
     * @returns {Object}
     */
    scrollContainer(data) {
        let me     = this,
            deltaX = data.clientX - me.clientX,
            deltaY = data.clientY - me.clientY,
            el     = me.scrollContainerElement,
            gap    = 250,
            rect   = me.scrollContainerRect;

        me.clientX =  data.clientX;
        me.clientY =  data.clientY;

        if (
            (deltaX < 0 && data.clientX < rect.left  + gap) ||
            (deltaX > 0 && data.clientX > rect.right - gap)
        ) {
            el.scrollLeft += (deltaX * me.scrollFactorLeft);
        }

        if (
            (deltaY < 0 && data.clientY < rect.top    + gap) ||
            (deltaY > 0 && data.clientY > rect.bottom - gap)
        ) {
            el.scrollTop += (deltaY * me.scrollFactorTop);
        }

        return {
            clientX: me.clientX + el.scrollLeft - me.initialScrollLeft,
            clientY: me.clientY + el.scrollTop  - me.initialScrollTop
        };
    }

    /**
     * DragZones will set these configs inside their dragStart() method.
     * They only persist until the end of a drag OP.
     * @param {Object}  data
     * @param {Boolean} data.alwaysFireDragMove
     * @param {String}  data.boundaryContainerId
     * @param {String}  data.scrollContainerId
     * @param {Number}  data.scrollFactorLeft
     * @param {Number}  data.scrollFactorTop
     */
    setConfigs(data) {
        let me = this,
            node;

        delete data.appName;

        if (data.boundaryContainerId) {
            node = _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getElementOrBody(data.boundaryContainerId);
            me.boundaryContainerRect = node.getBoundingClientRect();
        }

        delete data.boundaryContainerId;

        if (data.scrollContainerId) {
            node = _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.getElementOrBody(data.scrollContainerId);

            Object.assign(me, {
                scrollContainerElement: node,
                scrollContainerRect   : node.getBoundingClientRect(),
                initialScrollLeft     : node.scrollLeft,
                initialScrollTop      : node.scrollTop
            });
        }

        delete data.scrollContainerId;

        Object.entries(data).forEach(([key, value]) => {
            if (me.hasOwnProperty(key)) {
                me[key] = value;
            } else {
                console.error('unknown key passed inside setConfigs()', key);
            }
        });

        // we need to apply the custom style here, since onDragStart() triggers before we get the configs
        if (me.bodyCursorStyle) {
            _DomAccess_mjs__WEBPACK_IMPORTED_MODULE_1__.default.setStyle({
                id   : 'document.body',
                style: {
                    cursor: me.bodyCursorStyle
                }
            });
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.id
     */
    setDragProxyElement(data) {
        this.dragProxyElement = document.getElementById(data.id);
    }
}

Neo.applyClassConfig(DragDrop);

let instance = Neo.create(DragDrop);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNIO0FBQ0E7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQUk7QUFDM0Isd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG9FQUEwQjtBQUM3QztBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG9FQUEwQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFlBQVksNERBQWtCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL21haW4vc3JjL21haW4vYWRkb24vRHJhZ0Ryb3AtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgZnJvbSAnLi4vRG9tQWNjZXNzLm1qcyc7XG5pbXBvcnQgRG9tRXZlbnRzIGZyb20gJy4uL0RvbUV2ZW50cy5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBEcmFnRHJvcCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3AnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYWx3YXlzRmlyZURyYWdNb3ZlPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBhbHdheXNGaXJlRHJhZ01vdmU6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogT3B0aW9uYWxseSBzZXQgYSBmaXhlZCBjdXJzb3Igc3R5bGUgdG8gdGhlIGRvY3VtZW50LmJvZHkgZHVyaW5nIGRyYWcgb3BlcmF0aW9uc1xuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYm9keUN1cnNvclN0eWxlPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvZHlDdXJzb3JTdHlsZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0RPTVJlY3R8bnVsbH0gc2Nyb2xsQ29udGFpbmVyUmVjdD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBib3VuZGFyeUNvbnRhaW5lclJlY3Q6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGNsaWVudFg9MFxuICAgICAgICAgKi9cbiAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gY2xpZW50WT0wXG4gICAgICAgICAqL1xuICAgICAgICBjbGllbnRZOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGRyYWdFbGVtZW50Um9vdElkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdFbGVtZW50Um9vdElkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkcmFnUHJveHlDbHM9J25lby1kcmFncHJveHknXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHlDbHM6ICduZW8tZHJhZ3Byb3h5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0hUTUxFbGVtZW50fG51bGx9IGRyYWdQcm94eUVsZW1lbnQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnUHJveHlFbGVtZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBkcmFnUHJveHlSZWN0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eVJlY3Q6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gZHJhZ1pvbmVJZD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnWm9uZUlkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogWW91IGNhbiBlaXRoZXIgcGFzcyBhbiBhcnJheSBvZiAoZG9tKSBpZHMgb3IgY2xzIHJ1bGVzIG9yIGJvdGhcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZHJvcFpvbmVJZGVudGlmaWVyOiB7XG4gICAgICAgICAqICAgICBpZHM6IFsnZm9vJywnYmFyJ11cbiAgICAgICAgICogfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBkcm9wWm9uZUlkZW50aWZpZXI6IHtcbiAgICAgICAgICogICAgIGNsczogWydteS1jbGFzcy0xJywnbXktY2xhc3MtMiddXG4gICAgICAgICAqIH1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogZHJvcFpvbmVJZGVudGlmaWVyOiB7XG4gICAgICAgICAqICAgICBjbHM6IFsnbXktY2xhc3MtMScsJ215LWNsYXNzLTInXSxcbiAgICAgICAgICogICAgIGlkczogWydmb28nLCdiYXInXVxuICAgICAgICAgKiB9XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBkcm9wWm9uZUlkZW50aWZpZXI9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJvcFpvbmVJZGVudGlmaWVyOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBpbml0aWFsU2Nyb2xsTGVmdD0wXG4gICAgICAgICAqL1xuICAgICAgICBpbml0aWFsU2Nyb2xsTGVmdDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gaW5pdGlhbFNjcm9sbFRvcD0wXG4gICAgICAgICAqL1xuICAgICAgICBpbml0aWFsU2Nyb2xsVG9wOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbW92ZUhvcml6b250YWw9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZUhvcml6b250YWw6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb3ZlVmVydGljYWw9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbW92ZVZlcnRpY2FsOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBvZmZzZXRYPTBcbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG9mZnNldFk9MFxuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0WTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW90ZSBtZXRob2QgYWNjZXNzIGZvciBvdGhlciB3b3JrZXJzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVtb3RlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlbW90ZToge1xuICAgICAgICAgICAgYXBwOiBbXG4gICAgICAgICAgICAgICAgJ3NldENvbmZpZ3MnLFxuICAgICAgICAgICAgICAgICdzZXREcmFnUHJveHlFbGVtZW50J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7SFRNTEVsZW1lbnR8bnVsbH0gc2Nyb2xsQ29udGFpbmVyRWxlbWVudD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxDb250YWluZXJFbGVtZW50OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBzY3JvbGxDb250YWluZXJSZWN0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjcm9sbENvbnRhaW5lclJlY3Q6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHNjcm9sbEZhY3RvckxlZnQ9MVxuICAgICAgICAgKi9cbiAgICAgICAgc2Nyb2xsRmFjdG9yTGVmdDogMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gc2Nyb2xsRmFjdG9yVG9wPTFcbiAgICAgICAgICovXG4gICAgICAgIHNjcm9sbEZhY3RvclRvcDogMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaW1wb3J0cyA9IFtdO1xuXG4gICAgICAgIERvbUV2ZW50cy5vbih7XG4gICAgICAgICAgICBtb3VzZUVudGVyOiBtZS5vbk1vdXNlRW50ZXIsXG4gICAgICAgICAgICBtb3VzZUxlYXZlOiBtZS5vbk1vdXNlTGVhdmUsXG4gICAgICAgICAgICBzY29wZSAgICAgOiBtZVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5hZGRHbG9iYWxFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLmhhc1RvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICBpbXBvcnRzLnB1c2goaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL1RvdWNoLm1qcycgKi8gJy4uL2RyYWdnYWJsZS9zZW5zb3IvVG91Y2gubWpzJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1wb3J0cy5wdXNoKGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL21haW4vZHJhZ2dhYmxlL3NlbnNvci9Nb3VzZS5tanMnICovICcuLi9kcmFnZ2FibGUvc2Vuc29yL01vdXNlLm1qcycpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UuYWxsKGltcG9ydHMpLnRoZW4obW9kdWxlcyA9PiB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIFRvdWNoIG9yIE1vdXNlU2Vuc29yXG4gICAgICAgICAgICBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBtb2R1bGU6IG1vZHVsZXNbMF0uZGVmYXVsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzplbmQnLCAgIG1lLm9uRHJhZ0VuZCAgLmJpbmQobWUpLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzptb3ZlJywgIG1lLm9uRHJhZ01vdmUgLmJpbmQobWUpLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZzpzdGFydCcsIG1lLm9uRHJhZ1N0YXJ0LmJpbmQobWUpLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRFdmVudERhdGEoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IGV2ZW50LnBhdGggfHwgZXZlbnQuY29tcG9zZWRQYXRoKCk7XG5cbiAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgIC4uLkRvbUV2ZW50cy5nZXRFdmVudERhdGEoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQpLFxuICAgICAgICAgICAgY2xpZW50WDogZXZlbnQuZGV0YWlsLmNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZOiBldmVudC5kZXRhaWwuY2xpZW50WVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChldmVudC5kZXRhaWwuZXZlbnRQYXRoKSB7XG4gICAgICAgICAgICBlLnRhcmdldFBhdGggPSBldmVudC5kZXRhaWwuZXZlbnRQYXRoLm1hcChlID0+IERvbUV2ZW50cy5nZXRUYXJnZXREYXRhKGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGUudGFyZ2V0UGF0aCA9IGUucGF0aCB8fCBlLmNvbXBvc2VkUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5wYXRoID0gcGF0aC5tYXAoZSA9PiBEb21FdmVudHMuZ2V0VGFyZ2V0RGF0YShlKSk7XG5cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbkRyYWdFbmQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHBhcnNlZEV2ZW50ID0gbWUuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIGlzRHJvcCAgICAgID0gbWUucGF0aEluY2x1ZGVzRHJvcFpvbmUocGFyc2VkRXZlbnQudGFyZ2V0UGF0aCk7XG5cbiAgICAgICAgRG9tQWNjZXNzLnNldEJvZHlDbHMoe1xuICAgICAgICAgICAgcmVtb3ZlOiBbJ25lby11bnNlbGVjdGFibGUnXVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWUuYm9keUN1cnNvclN0eWxlKSB7XG4gICAgICAgICAgICBEb21BY2Nlc3Muc2V0U3R5bGUoe1xuICAgICAgICAgICAgICAgIGlkICAgOiAnZG9jdW1lbnQuYm9keScsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAuLi5wYXJzZWRFdmVudCxcbiAgICAgICAgICAgIGlzRHJvcCA6IGlzRHJvcCxcbiAgICAgICAgICAgIG9mZnNldFg6IG1lLm9mZnNldFgsXG4gICAgICAgICAgICBvZmZzZXRZOiBtZS5vZmZzZXRZLFxuICAgICAgICAgICAgdHlwZSAgIDogJ2RyYWc6ZW5kJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNEcm9wKSB7XG4gICAgICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAgICAgLi4uRG9tRXZlbnRzLmdldE1vdXNlRXZlbnREYXRhKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50KSxcbiAgICAgICAgICAgICAgICBkcmFnWm9uZUlkOiBtZS5kcmFnWm9uZUlkLFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICA6ICdkcm9wJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICBhbHdheXNGaXJlRHJhZ01vdmUgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIGJvZHlDdXJzb3JTdHlsZSAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBib3VuZGFyeUNvbnRhaW5lclJlY3QgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ0VsZW1lbnRSb290SWQgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGRyYWdFbGVtZW50Um9vdFJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICBkcmFnUHJveHlDbHMgICAgICAgICAgOiAnbmVvLWRyYWdwcm94eScsXG4gICAgICAgICAgICBkcmFnUHJveHlFbGVtZW50ICAgICAgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ1pvbmVJZCAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGRyb3Bab25lSWRlbnRpZmllciAgICA6IG51bGwsXG4gICAgICAgICAgICBpbml0aWFsU2Nyb2xsTGVmdCAgICAgOiAwLFxuICAgICAgICAgICAgaW5pdGlhbFNjcm9sbFRvcCAgICAgIDogMCxcbiAgICAgICAgICAgIG1vdmVIb3Jpem9udGFsICAgICAgICA6IHRydWUsXG4gICAgICAgICAgICBtb3ZlVmVydGljYWwgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lclJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICBzZXRTY3JvbGxGYWN0b3JMZWZ0ICAgOiAxLFxuICAgICAgICAgICAgc2Nyb2xsRmFjdG9yVG9wICAgICAgIDogMVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBwcm94eVJlY3QgPSBtZS5kcmFnUHJveHlSZWN0LFxuICAgICAgICAgICAgcmVjdCAgICAgID0gbWUuYm91bmRhcnlDb250YWluZXJSZWN0LFxuICAgICAgICAgICAgZGF0YSwgbGVmdCwgdG9wO1xuXG4gICAgICAgIGlmIChtZS5zY3JvbGxDb250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBkYXRhID0gbWUuc2Nyb2xsQ29udGFpbmVyKHtcbiAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5kZXRhaWwuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5kZXRhaWwuY2xpZW50WVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LmRldGFpbC5jbGllbnRYID0gZGF0YS5jbGllbnRYO1xuICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmNsaWVudFkgPSBkYXRhLmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuZHJhZ1Byb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgbGVmdCA9IGV2ZW50LmRldGFpbC5jbGllbnRYIC0gbWUub2Zmc2V0WDtcbiAgICAgICAgICAgIHRvcCAgPSBldmVudC5kZXRhaWwuY2xpZW50WSAtIG1lLm9mZnNldFk7XG5cbiAgICAgICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPCByZWN0LmxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPiByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCByZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA+IHJlY3QuYm90dG9tIC0gcHJveHlSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LmJvdHRvbSAtIHByb3h5UmVjdC5oZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbWUubW92ZUhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbWUuZHJhZ1Byb3h5UmVjdC54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5kcmFnUHJveHlFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgICAgICAgICAgaWYgKCFtZS5tb3ZlVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBtZS5kcmFnUHJveHlSZWN0Lnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmRyYWdQcm94eUVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWUuZHJhZ1Byb3h5RWxlbWVudCB8fCBtZS5hbHdheXNGaXJlRHJhZ01vdmUpIHtcbiAgICAgICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAuLi5tZS5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgICAgIG9mZnNldFg6IG1lLm9mZnNldFgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogbWUub2Zmc2V0WSxcbiAgICAgICAgICAgICAgICB0eXBlICAgOiAnZHJhZzptb3ZlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHJlY3QgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgRG9tQWNjZXNzLnNldEJvZHlDbHMoe1xuICAgICAgICAgICAgYWRkOiBbJ25lby11bnNlbGVjdGFibGUnXVxuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICBkcmFnUHJveHlSZWN0OiByZWN0LFxuICAgICAgICAgICAgb2Zmc2V0WCAgICAgIDogZXZlbnQuZGV0YWlsLmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgICAgICBvZmZzZXRZICAgICAgOiBldmVudC5kZXRhaWwuY2xpZW50WSAtIHJlY3QudG9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0RXZlbnREYXRhKGV2ZW50KSxcbiAgICAgICAgICAgIHR5cGU6ICdkcmFnOnN0YXJ0J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uTW91c2VFbnRlcihldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5wYXRoSW5jbHVkZXNEcm9wWm9uZShldmVudC5wYXRoKSkge1xuICAgICAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgICAgIGRyYWdab25lSWQ6IG1lLmRyYWdab25lSWQsXG4gICAgICAgICAgICAgICAgdHlwZSAgICAgIDogJ2Ryb3A6ZW50ZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZUxlYXZlKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnBhdGhJbmNsdWRlc0Ryb3Bab25lKGV2ZW50LnBhdGgpKSB7XG4gICAgICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAgICAgLi4uZXZlbnQsXG4gICAgICAgICAgICAgICAgZHJhZ1pvbmVJZDogbWUuZHJhZ1pvbmVJZCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgOiAnZHJvcDpsZWF2ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXRoXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgcGF0aEluY2x1ZGVzRHJvcFpvbmUocGF0aCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBoYXNNYXRjaCAgID0gdHJ1ZSxcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBtZS5kcm9wWm9uZUlkZW50aWZpZXIsXG4gICAgICAgICAgICBjbHMsIGlkcztcblxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgICAgY2xzID0gaWRlbnRpZmllci5jbHM7XG4gICAgICAgICAgICBpZHMgPSBpZGVudGlmaWVyLmlkcztcblxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YXJnZXRDbHMgb2YgaXRlbS5jbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbHMuaW5jbHVkZXModGFyZ2V0Q2xzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNNYXRjaCAmJiBpZHMgJiYgIWlkcy5pbmNsdWRlcyhpdGVtLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmNsaWVudFhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5jbGllbnRZXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzY3JvbGxDb250YWluZXIoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRlbHRhWCA9IGRhdGEuY2xpZW50WCAtIG1lLmNsaWVudFgsXG4gICAgICAgICAgICBkZWx0YVkgPSBkYXRhLmNsaWVudFkgLSBtZS5jbGllbnRZLFxuICAgICAgICAgICAgZWwgICAgID0gbWUuc2Nyb2xsQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICAgIGdhcCAgICA9IDI1MCxcbiAgICAgICAgICAgIHJlY3QgICA9IG1lLnNjcm9sbENvbnRhaW5lclJlY3Q7XG5cbiAgICAgICAgbWUuY2xpZW50WCA9ICBkYXRhLmNsaWVudFg7XG4gICAgICAgIG1lLmNsaWVudFkgPSAgZGF0YS5jbGllbnRZO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChkZWx0YVggPCAwICYmIGRhdGEuY2xpZW50WCA8IHJlY3QubGVmdCAgKyBnYXApIHx8XG4gICAgICAgICAgICAoZGVsdGFYID4gMCAmJiBkYXRhLmNsaWVudFggPiByZWN0LnJpZ2h0IC0gZ2FwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGVsLnNjcm9sbExlZnQgKz0gKGRlbHRhWCAqIG1lLnNjcm9sbEZhY3RvckxlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGRlbHRhWSA8IDAgJiYgZGF0YS5jbGllbnRZIDwgcmVjdC50b3AgICAgKyBnYXApIHx8XG4gICAgICAgICAgICAoZGVsdGFZID4gMCAmJiBkYXRhLmNsaWVudFkgPiByZWN0LmJvdHRvbSAtIGdhcClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBlbC5zY3JvbGxUb3AgKz0gKGRlbHRhWSAqIG1lLnNjcm9sbEZhY3RvclRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xpZW50WDogbWUuY2xpZW50WCArIGVsLnNjcm9sbExlZnQgLSBtZS5pbml0aWFsU2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIGNsaWVudFk6IG1lLmNsaWVudFkgKyBlbC5zY3JvbGxUb3AgIC0gbWUuaW5pdGlhbFNjcm9sbFRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYWdab25lcyB3aWxsIHNldCB0aGVzZSBjb25maWdzIGluc2lkZSB0aGVpciBkcmFnU3RhcnQoKSBtZXRob2QuXG4gICAgICogVGhleSBvbmx5IHBlcnNpc3QgdW50aWwgdGhlIGVuZCBvZiBhIGRyYWcgT1AuXG4gICAgICogQHBhcmFtIHtPYmplY3R9ICBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBkYXRhLmFsd2F5c0ZpcmVEcmFnTW92ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgZGF0YS5ib3VuZGFyeUNvbnRhaW5lcklkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBkYXRhLnNjcm9sbENvbnRhaW5lcklkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9ICBkYXRhLnNjcm9sbEZhY3RvckxlZnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gIGRhdGEuc2Nyb2xsRmFjdG9yVG9wXG4gICAgICovXG4gICAgc2V0Q29uZmlncyhkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBub2RlO1xuXG4gICAgICAgIGRlbGV0ZSBkYXRhLmFwcE5hbWU7XG5cbiAgICAgICAgaWYgKGRhdGEuYm91bmRhcnlDb250YWluZXJJZCkge1xuICAgICAgICAgICAgbm9kZSA9IERvbUFjY2Vzcy5nZXRFbGVtZW50T3JCb2R5KGRhdGEuYm91bmRhcnlDb250YWluZXJJZCk7XG4gICAgICAgICAgICBtZS5ib3VuZGFyeUNvbnRhaW5lclJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGRhdGEuYm91bmRhcnlDb250YWluZXJJZDtcblxuICAgICAgICBpZiAoZGF0YS5zY3JvbGxDb250YWluZXJJZCkge1xuICAgICAgICAgICAgbm9kZSA9IERvbUFjY2Vzcy5nZXRFbGVtZW50T3JCb2R5KGRhdGEuc2Nyb2xsQ29udGFpbmVySWQpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbm9kZSxcbiAgICAgICAgICAgICAgICBzY3JvbGxDb250YWluZXJSZWN0ICAgOiBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0ICAgICA6IG5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wICAgICAgOiBub2RlLnNjcm9sbFRvcFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgZGF0YS5zY3JvbGxDb250YWluZXJJZDtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGlmIChtZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbWVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmtub3duIGtleSBwYXNzZWQgaW5zaWRlIHNldENvbmZpZ3MoKScsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gYXBwbHkgdGhlIGN1c3RvbSBzdHlsZSBoZXJlLCBzaW5jZSBvbkRyYWdTdGFydCgpIHRyaWdnZXJzIGJlZm9yZSB3ZSBnZXQgdGhlIGNvbmZpZ3NcbiAgICAgICAgaWYgKG1lLmJvZHlDdXJzb3JTdHlsZSkge1xuICAgICAgICAgICAgRG9tQWNjZXNzLnNldFN0eWxlKHtcbiAgICAgICAgICAgICAgICBpZCAgIDogJ2RvY3VtZW50LmJvZHknLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogbWUuYm9keUN1cnNvclN0eWxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuaWRcbiAgICAgKi9cbiAgICBzZXREcmFnUHJveHlFbGVtZW50KGRhdGEpIHtcbiAgICAgICAgdGhpcy5kcmFnUHJveHlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5pZCk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhEcmFnRHJvcCk7XG5cbmxldCBpbnN0YW5jZSA9IE5lby5jcmVhdGUoRHJhZ0Ryb3ApO1xuXG5OZW8uYXBwbHlUb0dsb2JhbE5zKGluc3RhbmNlKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sInNvdXJjZVJvb3QiOiIifQ==