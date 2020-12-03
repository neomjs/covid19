(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/DragDrop-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/DragDrop.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/DragDrop.mjs ***!
  \**********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.e, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
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

        _DomEvents_mjs__WEBPACK_IMPORTED_MODULE_2__.default.sendMessageToApp({
            ...parsedEvent,
            isDrop: isDrop,
            type  : 'drag:end'
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
                type: 'drag:move'
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
     *
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9EcmFnRHJvcC5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFDSDtBQUNBOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FB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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9FQUEwQjtBQUM3QztBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG9FQUEwQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlFQUFlLFFBQVEsRSIsImZpbGUiOiJjaHVua3Mvc3JjL21haW4vYWRkb24vRHJhZ0Ryb3AtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgICAgICBmcm9tICcuLi8uLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBEb21BY2Nlc3MgZnJvbSAnLi4vRG9tQWNjZXNzLm1qcyc7XG5pbXBvcnQgRG9tRXZlbnRzIGZyb20gJy4uL0RvbUV2ZW50cy5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICogQHNpbmdsZXRvblxuICovXG5jbGFzcyBEcmFnRHJvcCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubWFpbi5hZGRvbi5EcmFnRHJvcCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLm1haW4uYWRkb24uRHJhZ0Ryb3AnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYWx3YXlzRmlyZURyYWdNb3ZlPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBhbHdheXNGaXJlRHJhZ01vdmU6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7RE9NUmVjdHxudWxsfSBzY3JvbGxDb250YWluZXJSZWN0PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvdW5kYXJ5Q29udGFpbmVyUmVjdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gY2xpZW50WD0wXG4gICAgICAgICAqL1xuICAgICAgICBjbGllbnRYOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBjbGllbnRZPTBcbiAgICAgICAgICovXG4gICAgICAgIGNsaWVudFk6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gZHJhZ0VsZW1lbnRSb290SWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ0VsZW1lbnRSb290SWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRyYWdQcm94eUNscz0nbmVvLWRyYWdwcm94eSdcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUNsczogJ25lby1kcmFncHJveHknLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7SFRNTEVsZW1lbnR8bnVsbH0gZHJhZ1Byb3h5RWxlbWVudD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdQcm94eUVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtET01SZWN0fG51bGx9IGRyYWdQcm94eVJlY3Q9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1Byb3h5UmVjdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkcmFnWm9uZUlkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdab25lSWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBZb3UgY2FuIGVpdGhlciBwYXNzIGFuIGFycmF5IG9mIChkb20pIGlkcyBvciBjbHMgcnVsZXMgb3IgYm90aFxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBkcm9wWm9uZUlkZW50aWZpZXI6IHtcbiAgICAgICAgICogICAgIGlkczogWydmb28nLCdiYXInXVxuICAgICAgICAgKiB9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGRyb3Bab25lSWRlbnRpZmllcjoge1xuICAgICAgICAgKiAgICAgY2xzOiBbJ215LWNsYXNzLTEnLCdteS1jbGFzcy0yJ11cbiAgICAgICAgICogfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBkcm9wWm9uZUlkZW50aWZpZXI6IHtcbiAgICAgICAgICogICAgIGNsczogWydteS1jbGFzcy0xJywnbXktY2xhc3MtMiddLFxuICAgICAgICAgKiAgICAgaWRzOiBbJ2ZvbycsJ2JhciddXG4gICAgICAgICAqIH1cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IGRyb3Bab25lSWRlbnRpZmllcj1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcm9wWm9uZUlkZW50aWZpZXI6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGluaXRpYWxTY3JvbGxMZWZ0PTBcbiAgICAgICAgICovXG4gICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0OiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBpbml0aWFsU2Nyb2xsVG9wPTBcbiAgICAgICAgICovXG4gICAgICAgIGluaXRpYWxTY3JvbGxUb3A6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb3ZlSG9yaXpvbnRhbD10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBtb3ZlSG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vdmVWZXJ0aWNhbD10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBtb3ZlVmVydGljYWw6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG9mZnNldFg9MFxuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gb2Zmc2V0WT0wXG4gICAgICAgICAqL1xuICAgICAgICBvZmZzZXRZOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3RlIG1ldGhvZCBhY2Nlc3MgZm9yIG90aGVyIHdvcmtlcnNcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSByZW1vdGVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlOiB7XG4gICAgICAgICAgICBhcHA6IFtcbiAgICAgICAgICAgICAgICAnc2V0Q29uZmlncycsXG4gICAgICAgICAgICAgICAgJ3NldERyYWdQcm94eUVsZW1lbnQnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtIVE1MRWxlbWVudHxudWxsfSBzY3JvbGxDb250YWluZXJFbGVtZW50PW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjcm9sbENvbnRhaW5lckVsZW1lbnQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtET01SZWN0fG51bGx9IHNjcm9sbENvbnRhaW5lclJlY3Q9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyUmVjdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gc2Nyb2xsRmFjdG9yTGVmdD0xXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxGYWN0b3JMZWZ0OiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBzY3JvbGxGYWN0b3JUb3A9MVxuICAgICAgICAgKi9cbiAgICAgICAgc2Nyb2xsRmFjdG9yVG9wOiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpbXBvcnRzID0gW107XG5cbiAgICAgICAgRG9tRXZlbnRzLm9uKHtcbiAgICAgICAgICAgIG1vdXNlRW50ZXI6IG1lLm9uTW91c2VFbnRlcixcbiAgICAgICAgICAgIG1vdXNlTGVhdmU6IG1lLm9uTW91c2VMZWF2ZSxcbiAgICAgICAgICAgIHNjb3BlICAgICA6IG1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKE5lby5jb25maWcuaGFzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIGltcG9ydHMucHVzaChpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9tYWluL2RyYWdnYWJsZS9zZW5zb3IvVG91Y2gubWpzJyAqLyAnLi4vZHJhZ2dhYmxlL3NlbnNvci9Ub3VjaC5tanMnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbXBvcnRzLnB1c2goaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvbWFpbi9kcmFnZ2FibGUvc2Vuc29yL01vdXNlLm1qcycgKi8gJy4uL2RyYWdnYWJsZS9zZW5zb3IvTW91c2UubWpzJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5hbGwoaW1wb3J0cykudGhlbihtb2R1bGVzID0+IHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgVG91Y2ggb3IgTW91c2VTZW5zb3JcbiAgICAgICAgICAgIE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIG1vZHVsZTogbW9kdWxlc1swXS5kZWZhdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRHbG9iYWxFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOmVuZCcsICAgbWUub25EcmFnRW5kICAuYmluZChtZSksIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCAgbWUub25EcmFnTW92ZSAuYmluZChtZSksIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnOnN0YXJ0JywgbWUub25EcmFnU3RhcnQuYmluZChtZSksIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEV2ZW50RGF0YShldmVudCkge1xuICAgICAgICBjb25zdCBwYXRoID0gZXZlbnQucGF0aCB8fCBldmVudC5jb21wb3NlZFBhdGgoKTtcblxuICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgLi4uRG9tRXZlbnRzLmdldEV2ZW50RGF0YShldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudCksXG4gICAgICAgICAgICBjbGllbnRYOiBldmVudC5kZXRhaWwuY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFk6IGV2ZW50LmRldGFpbC5jbGllbnRZXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5ldmVudFBhdGgpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0UGF0aCA9IGV2ZW50LmRldGFpbC5ldmVudFBhdGgubWFwKGUgPT4gRG9tRXZlbnRzLmdldFRhcmdldERhdGEoZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS50YXJnZXRQYXRoID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBlLnBhdGggPSBwYXRoLm1hcChlID0+IERvbUV2ZW50cy5nZXRUYXJnZXREYXRhKGUpKTtcblxuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ0VuZChldmVudCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgcGFyc2VkRXZlbnQgPSBtZS5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgaXNEcm9wICAgICAgPSBtZS5wYXRoSW5jbHVkZXNEcm9wWm9uZShwYXJzZWRFdmVudC50YXJnZXRQYXRoKTtcblxuICAgICAgICBEb21BY2Nlc3Muc2V0Qm9keUNscyh7XG4gICAgICAgICAgICByZW1vdmU6IFsnbmVvLXVuc2VsZWN0YWJsZSddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgIC4uLnBhcnNlZEV2ZW50LFxuICAgICAgICAgICAgaXNEcm9wOiBpc0Ryb3AsXG4gICAgICAgICAgICB0eXBlICA6ICdkcmFnOmVuZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzRHJvcCkge1xuICAgICAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgICAgIC4uLkRvbUV2ZW50cy5nZXRNb3VzZUV2ZW50RGF0YShldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudCksXG4gICAgICAgICAgICAgICAgZHJhZ1pvbmVJZDogbWUuZHJhZ1pvbmVJZCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgOiAnZHJvcCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihtZSwge1xuICAgICAgICAgICAgYWx3YXlzRmlyZURyYWdNb3ZlICAgIDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZGFyeUNvbnRhaW5lclJlY3QgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ0VsZW1lbnRSb290SWQgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGRyYWdFbGVtZW50Um9vdFJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICBkcmFnUHJveHlDbHMgICAgICAgICAgOiAnbmVvLWRyYWdwcm94eScsXG4gICAgICAgICAgICBkcmFnUHJveHlFbGVtZW50ICAgICAgOiBudWxsLFxuICAgICAgICAgICAgZHJhZ1pvbmVJZCAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGRyb3Bab25lSWRlbnRpZmllciAgICA6IG51bGwsXG4gICAgICAgICAgICBpbml0aWFsU2Nyb2xsTGVmdCAgICAgOiAwLFxuICAgICAgICAgICAgaW5pdGlhbFNjcm9sbFRvcCAgICAgIDogMCxcbiAgICAgICAgICAgIG1vdmVIb3Jpem9udGFsICAgICAgICA6IHRydWUsXG4gICAgICAgICAgICBtb3ZlVmVydGljYWwgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lclJlY3QgICA6IG51bGwsXG4gICAgICAgICAgICBzZXRTY3JvbGxGYWN0b3JMZWZ0ICAgOiAxLFxuICAgICAgICAgICAgc2Nyb2xsRmFjdG9yVG9wICAgICAgIDogMVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBwcm94eVJlY3QgPSBtZS5kcmFnUHJveHlSZWN0LFxuICAgICAgICAgICAgcmVjdCAgICAgID0gbWUuYm91bmRhcnlDb250YWluZXJSZWN0LFxuICAgICAgICAgICAgZGF0YSwgbGVmdCwgdG9wO1xuXG4gICAgICAgIGlmIChtZS5zY3JvbGxDb250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICBkYXRhID0gbWUuc2Nyb2xsQ29udGFpbmVyKHtcbiAgICAgICAgICAgICAgICBjbGllbnRYOiBldmVudC5kZXRhaWwuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBjbGllbnRZOiBldmVudC5kZXRhaWwuY2xpZW50WVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV2ZW50LmRldGFpbC5jbGllbnRYID0gZGF0YS5jbGllbnRYO1xuICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmNsaWVudFkgPSBkYXRhLmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuZHJhZ1Byb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgbGVmdCA9IGV2ZW50LmRldGFpbC5jbGllbnRYIC0gbWUub2Zmc2V0WDtcbiAgICAgICAgICAgIHRvcCAgPSBldmVudC5kZXRhaWwuY2xpZW50WSAtIG1lLm9mZnNldFk7XG5cbiAgICAgICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnQgPCByZWN0LmxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxlZnQgPiByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSByZWN0LnJpZ2h0IC0gcHJveHlSZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3AgPCByZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA+IHJlY3QuYm90dG9tIC0gcHJveHlSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSByZWN0LmJvdHRvbSAtIHByb3h5UmVjdC5oZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbWUubW92ZUhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbWUuZHJhZ1Byb3h5UmVjdC54O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5kcmFnUHJveHlFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgICAgICAgICAgaWYgKCFtZS5tb3ZlVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBtZS5kcmFnUHJveHlSZWN0Lnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmRyYWdQcm94eUVsZW1lbnQuc3R5bGUudG9wID0gYCR7dG9wfXB4YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWUuZHJhZ1Byb3h5RWxlbWVudCB8fCBtZS5hbHdheXNGaXJlRHJhZ01vdmUpIHtcbiAgICAgICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAuLi5tZS5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnOm1vdmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgcmVjdCA9IGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBEb21BY2Nlc3Muc2V0Qm9keUNscyh7XG4gICAgICAgICAgICBhZGQ6IFsnbmVvLXVuc2VsZWN0YWJsZSddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWUsIHtcbiAgICAgICAgICAgIGRyYWdQcm94eVJlY3Q6IHJlY3QsXG4gICAgICAgICAgICBvZmZzZXRYICAgICAgOiBldmVudC5kZXRhaWwuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIG9mZnNldFkgICAgICA6IGV2ZW50LmRldGFpbC5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgRG9tRXZlbnRzLnNlbmRNZXNzYWdlVG9BcHAoe1xuICAgICAgICAgICAgLi4udGhpcy5nZXRFdmVudERhdGEoZXZlbnQpLFxuICAgICAgICAgICAgdHlwZTogJ2RyYWc6c3RhcnQnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZUVudGVyKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnBhdGhJbmNsdWRlc0Ryb3Bab25lKGV2ZW50LnBhdGgpKSB7XG4gICAgICAgICAgICBEb21FdmVudHMuc2VuZE1lc3NhZ2VUb0FwcCh7XG4gICAgICAgICAgICAgICAgLi4uZXZlbnQsXG4gICAgICAgICAgICAgICAgZHJhZ1pvbmVJZDogbWUuZHJhZ1pvbmVJZCxcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgOiAnZHJvcDplbnRlcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUucGF0aEluY2x1ZGVzRHJvcFpvbmUoZXZlbnQucGF0aCkpIHtcbiAgICAgICAgICAgIERvbUV2ZW50cy5zZW5kTWVzc2FnZVRvQXBwKHtcbiAgICAgICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgICAgICBkcmFnWm9uZUlkOiBtZS5kcmFnWm9uZUlkLFxuICAgICAgICAgICAgICAgIHR5cGUgICAgICA6ICdkcm9wOmxlYXZlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGhcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBwYXRoSW5jbHVkZXNEcm9wWm9uZShwYXRoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGhhc01hdGNoICAgPSB0cnVlLFxuICAgICAgICAgICAgaWRlbnRpZmllciA9IG1lLmRyb3Bab25lSWRlbnRpZmllcixcbiAgICAgICAgICAgIGNscywgaWRzO1xuXG4gICAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBjbHMgPSBpZGVudGlmaWVyLmNscztcbiAgICAgICAgICAgIGlkcyA9IGlkZW50aWZpZXIuaWRzO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcGF0aCkge1xuICAgICAgICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRhcmdldENscyBvZiBpdGVtLmNscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNscy5pbmNsdWRlcyh0YXJnZXRDbHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhhc01hdGNoICYmIGlkcyAmJiAhaWRzLmluY2x1ZGVzKGl0ZW0uaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhhc01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRhdGEuY2xpZW50WFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkYXRhLmNsaWVudFlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNjcm9sbENvbnRhaW5lcihkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZGVsdGFYID0gZGF0YS5jbGllbnRYIC0gbWUuY2xpZW50WCxcbiAgICAgICAgICAgIGRlbHRhWSA9IGRhdGEuY2xpZW50WSAtIG1lLmNsaWVudFksXG4gICAgICAgICAgICBlbCAgICAgPSBtZS5zY3JvbGxDb250YWluZXJFbGVtZW50LFxuICAgICAgICAgICAgZ2FwICAgID0gMjUwLFxuICAgICAgICAgICAgcmVjdCAgID0gbWUuc2Nyb2xsQ29udGFpbmVyUmVjdDtcblxuICAgICAgICBtZS5jbGllbnRYID0gIGRhdGEuY2xpZW50WDtcbiAgICAgICAgbWUuY2xpZW50WSA9ICBkYXRhLmNsaWVudFk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGRlbHRhWCA8IDAgJiYgZGF0YS5jbGllbnRYIDwgcmVjdC5sZWZ0ICArIGdhcCkgfHxcbiAgICAgICAgICAgIChkZWx0YVggPiAwICYmIGRhdGEuY2xpZW50WCA+IHJlY3QucmlnaHQgLSBnYXApXG4gICAgICAgICkge1xuICAgICAgICAgICAgZWwuc2Nyb2xsTGVmdCArPSAoZGVsdGFYICogbWUuc2Nyb2xsRmFjdG9yTGVmdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZGVsdGFZIDwgMCAmJiBkYXRhLmNsaWVudFkgPCByZWN0LnRvcCAgICArIGdhcCkgfHxcbiAgICAgICAgICAgIChkZWx0YVkgPiAwICYmIGRhdGEuY2xpZW50WSA+IHJlY3QuYm90dG9tIC0gZ2FwKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGVsLnNjcm9sbFRvcCArPSAoZGVsdGFZICogbWUuc2Nyb2xsRmFjdG9yVG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjbGllbnRYOiBtZS5jbGllbnRYICsgZWwuc2Nyb2xsTGVmdCAtIG1lLmluaXRpYWxTY3JvbGxMZWZ0LFxuICAgICAgICAgICAgY2xpZW50WTogbWUuY2xpZW50WSArIGVsLnNjcm9sbFRvcCAgLSBtZS5pbml0aWFsU2Nyb2xsVG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gIGRhdGFcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRhdGEuYWx3YXlzRmlyZURyYWdNb3ZlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9ICBkYXRhLmJvdW5kYXJ5Q29udGFpbmVySWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gIGRhdGEuc2Nyb2xsQ29udGFpbmVySWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gIGRhdGEuc2Nyb2xsRmFjdG9yTGVmdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgZGF0YS5zY3JvbGxGYWN0b3JUb3BcbiAgICAgKi9cbiAgICBzZXRDb25maWdzKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgaWYgKGRhdGEuYm91bmRhcnlDb250YWluZXJJZCkge1xuICAgICAgICAgICAgbm9kZSA9IERvbUFjY2Vzcy5nZXRFbGVtZW50T3JCb2R5KGRhdGEuYm91bmRhcnlDb250YWluZXJJZCk7XG4gICAgICAgICAgICBtZS5ib3VuZGFyeUNvbnRhaW5lclJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGRhdGEuYm91bmRhcnlDb250YWluZXJJZDtcblxuICAgICAgICBpZiAoZGF0YS5zY3JvbGxDb250YWluZXJJZCkge1xuICAgICAgICAgICAgbm9kZSA9IERvbUFjY2Vzcy5nZXRFbGVtZW50T3JCb2R5KGRhdGEuc2Nyb2xsQ29udGFpbmVySWQpO1xuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudDogbm9kZSxcbiAgICAgICAgICAgICAgICBzY3JvbGxDb250YWluZXJSZWN0ICAgOiBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTY3JvbGxMZWZ0ICAgICA6IG5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICBpbml0aWFsU2Nyb2xsVG9wICAgICAgOiBub2RlLnNjcm9sbFRvcFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgZGF0YS5zY3JvbGxDb250YWluZXJJZDtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIGlmIChtZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbWVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmtub3duIGtleSBwYXNzZWQgaW5zaWRlIHNldENvbmZpZ3MoKScsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5pZFxuICAgICAqL1xuICAgIHNldERyYWdQcm94eUVsZW1lbnQoZGF0YSkge1xuICAgICAgICB0aGlzLmRyYWdQcm94eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhLmlkKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKERyYWdEcm9wKTtcblxubGV0IGluc3RhbmNlID0gTmVvLmNyZWF0ZShEcmFnRHJvcCk7XG5cbk5lby5hcHBseVRvR2xvYmFsTnMoaW5zdGFuY2UpO1xuXG5leHBvcnQgZGVmYXVsdCBpbnN0YW5jZTsiXSwic291cmNlUm9vdCI6IiJ9