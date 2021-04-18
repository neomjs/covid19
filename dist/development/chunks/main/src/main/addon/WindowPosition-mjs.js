(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/WindowPosition-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 *
 * @class Neo.main.addon.WindowPosition
 * @extends Neo.core.Base
 * @singleton
 */
class WindowPosition extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.addon.WindowPosition'
         * @protected
         */
        className: 'Neo.main.addon.WindowPosition',
        /**
         * @member {String|null} intervalId=null
         */
        intervalId: null,
        /**
         * @member {Number} intervalTime=100
         */
        intervalTime: 20,
        /**
         * Remote method access for other workers
         * @member {Object} remote
         * @protected
         */
        remote: {
            app: [
                'registerWindow',
                'setDock',
                'unregisterWindow'
            ]
        },
        /**
         * @member {Number|null} screenLeft=null
         */
        screenLeft: null,
        /**
         * @member {Number|null} screenTop=null
         */
        screenTop: null,
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * @member {Object} windows={}
         * @protected
         */
        windows: {}
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me  = this,
            win = window;

        me.screenLeft = win.screenLeft;
        me.screenTop  = win.screenTop;

        win.addEventListener('mouseout', me.onMouseOut.bind(me));
        win.addEventListener('resize',   me.onResize.bind(me));
    }

    /**
     *
     */
    adjustPositions() {
        let position;

        Object.entries(this.windows).forEach(([key, value]) => {
            position = this.getPosition(value);

            Neo.Main.windowMoveTo({
                windowName: key,
                x         : position.left,
                y         : position.top
            });
        });
    }

    /**
     *
     */
    checkMovement() {
        let me         = this,
            Manager    = Neo.worker.Manager,
            win        = window,
            screenLeft = win.screenLeft,
            screenTop  = win.screenTop,
            winData;

        if (me.screenLeft !== screenLeft || me.screenTop !== screenTop) {
            winData = Neo.Main.getWindowData();

            me.adjustPositions();

            Manager.sendMessage('app', {
                action: 'windowPositionChange',
                data  : {
                    appName: Manager.appName,
                    ...winData
                }
            });

            me.screenLeft = screenLeft;
            me.screenTop  = screenTop;
        }
    }

    /**
     * Returns true in case the dock direction changes from horizontal (left, right)
     * to vertical (bottom, top) or vice versa.
     * @param {String} oldValue
     * @param {String} newValue
     * @returns {Boolean}
     */
    dockDirectionChange(oldValue, newValue) {
        return (oldValue === 'bottom' || oldValue === 'top') && (newValue === 'left' || newValue === 'right')
            || (newValue === 'bottom' || newValue === 'top') && (oldValue === 'left' || oldValue === 'right');
    }

    /**
     *
     * @param {Object} data
     */
    getPosition(data) {
        let win = window,
            left, top;

        switch (data.dock) {
            case 'bottom':
                left = win.screenLeft;
                top  = win.outerHeight + win.screenTop - 50;
                break;
            case 'left':
                left = win.screenLeft - data.size;
                top  = win.screenTop  + 28;
                break;
            case 'right':
                left = win.outerWidth + win.screenLeft;
                top  = win.screenTop  + 28;
                break;
            case 'top':
                left = win.screenLeft;
                top  = win.screenTop - data.size + 78;
                break;
        }

        return {
            left: left,
            top : top
        };
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseOut(event) {
        let me = this;

        if (!event.toElement) {
            if (!me.intervalId) {
                me.intervalId = setInterval(me.checkMovement.bind(me), me.intervalTime);
            }
        } else if (me.intervalId) {
            clearInterval(me.intervalId);
            me.intervalId = null;
        }
    }

    /**
     *
     * @param {Object} event
     */
    onResize(event) {
        let me  = this,
            win = window,
            height, width;

        Object.entries(me.windows).forEach(([key, value]) => {
            switch (value.dock) {
                case 'bottom':
                case 'top':
                    width = win.outerWidth;
                    break;
                case 'left':
                case 'right':
                    height = win.outerHeight - 28;
                    break;
            }

            Neo.Main.windowResizeTo({
                height    : height,
                width     : width,
                windowName: key
            });
        });

        me.adjustPositions();
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.dock
     * @param {String} data.name
     * @param {Number} data.size
     */
    registerWindow(data) {
        this.windows[data.name] = data;
    }

    /**
     * Docks an existing window to a new side
     * @param {Object} data
     * @param {String} data.dock
     * @param {String} data.name
     */
    setDock(data) {
        let me   = this,
            dock = data.dock,
            name = data.name,
            win  = me.windows[name],
            dockDirectionChange, position;

        if (win) {
            dockDirectionChange = me.dockDirectionChange(dock, win.dock);

            win.dock = dock;
            position = me.getPosition(win);

            if (dockDirectionChange) {
                Neo.Main.windowResizeTo({
                    height    : dock === 'bottom' || dock === 'top'   ? win.size : window.outerHeight - 28,
                    width     : dock === 'left'   || dock === 'right' ? win.size : window.outerWidth,
                    windowName: name
                });
            }

            Neo.Main.windowMoveTo({
                windowName: name,
                x         : position.left,
                y         : position.top
            });
        }
    }

    /**
     *
     * @param {Object} data
     * @param {String} data.name
     */
    unregisterWindow(data) {
        delete this.windows[data.name];
    }
}

Neo.applyClassConfig(WindowPosition);

let instance = Neo.create(WindowPosition);

Neo.applyToGlobalNs(instance);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9XaW5kb3dQb3NpdGlvbi5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBSTtBQUNqQyx3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUVBQWUsUUFBUSxFIiwiZmlsZSI6ImNodW5rcy9tYWluL3NyYy9tYWluL2FkZG9uL1dpbmRvd1Bvc2l0aW9uLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uV2luZG93UG9zaXRpb25cbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgV2luZG93UG9zaXRpb24gZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uV2luZG93UG9zaXRpb24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLldpbmRvd1Bvc2l0aW9uJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBpbnRlcnZhbElkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGludGVydmFsSWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGludGVydmFsVGltZT0xMDBcbiAgICAgICAgICovXG4gICAgICAgIGludGVydmFsVGltZTogMjAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdyZWdpc3RlcldpbmRvdycsXG4gICAgICAgICAgICAgICAgJ3NldERvY2snLFxuICAgICAgICAgICAgICAgICd1bnJlZ2lzdGVyV2luZG93J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNjcmVlbkxlZnQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2NyZWVuTGVmdDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBzY3JlZW5Ub3A9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2NyZWVuVG9wOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xldG9uPXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSB3aW5kb3dzPXt9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHdpbmRvd3M6IHt9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgID0gdGhpcyxcbiAgICAgICAgICAgIHdpbiA9IHdpbmRvdztcblxuICAgICAgICBtZS5zY3JlZW5MZWZ0ID0gd2luLnNjcmVlbkxlZnQ7XG4gICAgICAgIG1lLnNjcmVlblRvcCAgPSB3aW4uc2NyZWVuVG9wO1xuXG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIG1lLm9uTW91c2VPdXQuYmluZChtZSkpO1xuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgICBtZS5vblJlc2l6ZS5iaW5kKG1lKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGp1c3RQb3NpdGlvbnMoKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbjtcblxuICAgICAgICBPYmplY3QuZW50cmllcyh0aGlzLndpbmRvd3MpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKHZhbHVlKTtcblxuICAgICAgICAgICAgTmVvLk1haW4ud2luZG93TW92ZVRvKHtcbiAgICAgICAgICAgICAgICB3aW5kb3dOYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgeCAgICAgICAgIDogcG9zaXRpb24ubGVmdCxcbiAgICAgICAgICAgICAgICB5ICAgICAgICAgOiBwb3NpdGlvbi50b3BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNoZWNrTW92ZW1lbnQoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIE1hbmFnZXIgICAgPSBOZW8ud29ya2VyLk1hbmFnZXIsXG4gICAgICAgICAgICB3aW4gICAgICAgID0gd2luZG93LFxuICAgICAgICAgICAgc2NyZWVuTGVmdCA9IHdpbi5zY3JlZW5MZWZ0LFxuICAgICAgICAgICAgc2NyZWVuVG9wICA9IHdpbi5zY3JlZW5Ub3AsXG4gICAgICAgICAgICB3aW5EYXRhO1xuXG4gICAgICAgIGlmIChtZS5zY3JlZW5MZWZ0ICE9PSBzY3JlZW5MZWZ0IHx8IG1lLnNjcmVlblRvcCAhPT0gc2NyZWVuVG9wKSB7XG4gICAgICAgICAgICB3aW5EYXRhID0gTmVvLk1haW4uZ2V0V2luZG93RGF0YSgpO1xuXG4gICAgICAgICAgICBtZS5hZGp1c3RQb3NpdGlvbnMoKTtcblxuICAgICAgICAgICAgTWFuYWdlci5zZW5kTWVzc2FnZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3dpbmRvd1Bvc2l0aW9uQ2hhbmdlJyxcbiAgICAgICAgICAgICAgICBkYXRhICA6IHtcbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZTogTWFuYWdlci5hcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICAuLi53aW5EYXRhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnNjcmVlbkxlZnQgPSBzY3JlZW5MZWZ0O1xuICAgICAgICAgICAgbWUuc2NyZWVuVG9wICA9IHNjcmVlblRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpbiBjYXNlIHRoZSBkb2NrIGRpcmVjdGlvbiBjaGFuZ2VzIGZyb20gaG9yaXpvbnRhbCAobGVmdCwgcmlnaHQpXG4gICAgICogdG8gdmVydGljYWwgKGJvdHRvbSwgdG9wKSBvciB2aWNlIHZlcnNhLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGRvY2tEaXJlY3Rpb25DaGFuZ2Uob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiAob2xkVmFsdWUgPT09ICdib3R0b20nIHx8IG9sZFZhbHVlID09PSAndG9wJykgJiYgKG5ld1ZhbHVlID09PSAnbGVmdCcgfHwgbmV3VmFsdWUgPT09ICdyaWdodCcpXG4gICAgICAgICAgICB8fCAobmV3VmFsdWUgPT09ICdib3R0b20nIHx8IG5ld1ZhbHVlID09PSAndG9wJykgJiYgKG9sZFZhbHVlID09PSAnbGVmdCcgfHwgb2xkVmFsdWUgPT09ICdyaWdodCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbihkYXRhKSB7XG4gICAgICAgIGxldCB3aW4gPSB3aW5kb3csXG4gICAgICAgICAgICBsZWZ0LCB0b3A7XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLmRvY2spIHtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHdpbi5zY3JlZW5MZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCAgPSB3aW4ub3V0ZXJIZWlnaHQgKyB3aW4uc2NyZWVuVG9wIC0gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gd2luLnNjcmVlbkxlZnQgLSBkYXRhLnNpemU7XG4gICAgICAgICAgICAgICAgdG9wICA9IHdpbi5zY3JlZW5Ub3AgICsgMjg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHdpbi5vdXRlcldpZHRoICsgd2luLnNjcmVlbkxlZnQ7XG4gICAgICAgICAgICAgICAgdG9wICA9IHdpbi5zY3JlZW5Ub3AgICsgMjg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIGxlZnQgPSB3aW4uc2NyZWVuTGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgID0gd2luLnNjcmVlblRvcCAtIGRhdGEuc2l6ZSArIDc4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICB0b3AgOiB0b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBvbk1vdXNlT3V0KGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFldmVudC50b0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghbWUuaW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgICAgIG1lLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChtZS5jaGVja01vdmVtZW50LmJpbmQobWUpLCBtZS5pbnRlcnZhbFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lLmludGVydmFsSWQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWUuaW50ZXJ2YWxJZCk7XG4gICAgICAgICAgICBtZS5pbnRlcnZhbElkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgb25SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICB3aW4gPSB3aW5kb3csXG4gICAgICAgICAgICBoZWlnaHQsIHdpZHRoO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKG1lLndpbmRvd3MpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5kb2NrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpbi5vdXRlcldpZHRoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHdpbi5vdXRlckhlaWdodCAtIDI4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTmVvLk1haW4ud2luZG93UmVzaXplVG8oe1xuICAgICAgICAgICAgICAgIGhlaWdodCAgICA6IGhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aCAgICAgOiB3aWR0aCxcbiAgICAgICAgICAgICAgICB3aW5kb3dOYW1lOiBrZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS5hZGp1c3RQb3NpdGlvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuZG9ja1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm5hbWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5zaXplXG4gICAgICovXG4gICAgcmVnaXN0ZXJXaW5kb3coZGF0YSkge1xuICAgICAgICB0aGlzLndpbmRvd3NbZGF0YS5uYW1lXSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG9ja3MgYW4gZXhpc3Rpbmcgd2luZG93IHRvIGEgbmV3IHNpZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLmRvY2tcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5uYW1lXG4gICAgICovXG4gICAgc2V0RG9jayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvY2sgPSBkYXRhLmRvY2ssXG4gICAgICAgICAgICBuYW1lID0gZGF0YS5uYW1lLFxuICAgICAgICAgICAgd2luICA9IG1lLndpbmRvd3NbbmFtZV0sXG4gICAgICAgICAgICBkb2NrRGlyZWN0aW9uQ2hhbmdlLCBwb3NpdGlvbjtcblxuICAgICAgICBpZiAod2luKSB7XG4gICAgICAgICAgICBkb2NrRGlyZWN0aW9uQ2hhbmdlID0gbWUuZG9ja0RpcmVjdGlvbkNoYW5nZShkb2NrLCB3aW4uZG9jayk7XG5cbiAgICAgICAgICAgIHdpbi5kb2NrID0gZG9jaztcbiAgICAgICAgICAgIHBvc2l0aW9uID0gbWUuZ2V0UG9zaXRpb24od2luKTtcblxuICAgICAgICAgICAgaWYgKGRvY2tEaXJlY3Rpb25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBOZW8uTWFpbi53aW5kb3dSZXNpemVUbyh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCAgICA6IGRvY2sgPT09ICdib3R0b20nIHx8IGRvY2sgPT09ICd0b3AnICAgPyB3aW4uc2l6ZSA6IHdpbmRvdy5vdXRlckhlaWdodCAtIDI4LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCAgICAgOiBkb2NrID09PSAnbGVmdCcgICB8fCBkb2NrID09PSAncmlnaHQnID8gd2luLnNpemUgOiB3aW5kb3cub3V0ZXJXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93TmFtZTogbmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBOZW8uTWFpbi53aW5kb3dNb3ZlVG8oe1xuICAgICAgICAgICAgICAgIHdpbmRvd05hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgeCAgICAgICAgIDogcG9zaXRpb24ubGVmdCxcbiAgICAgICAgICAgICAgICB5ICAgICAgICAgOiBwb3NpdGlvbi50b3BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm5hbWVcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyV2luZG93KGRhdGEpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2luZG93c1tkYXRhLm5hbWVdO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoV2luZG93UG9zaXRpb24pO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFdpbmRvd1Bvc2l0aW9uKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=