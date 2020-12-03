(self["webpackChunkcovid19_gallery"] = self["webpackChunkcovid19_gallery"] || []).push([["src/main/addon/WindowPosition-mjs"],{

/***/ "./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/main/addon/WindowPosition.mjs ***!
  \****************************************************************/
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
     * @param {Object} data
     */
    adjustPositions(data) {
        let me = this,
            left, top;

        Object.entries(me.windows).forEach(([key, value]) => {
            switch (value.dock) {
                case 'bottom':
                    left = data.screenLeft;
                    top  = data.outerHeight  + data.screenTop - 50;
                    break;
                case 'left':
                    left = data.screenLeft - value.size;
                    top  = data.screenTop  + 28;
                    break;
                case 'right':
                    left = data.outerWidth + data.screenLeft;
                    top  = data.screenTop  + 28;
                    break;
                case 'top':
                    left = data.screenLeft;
                    top  = data.screenTop - value.size;
                    break;
            }

            Neo.Main.windowMoveTo({
                windowName: key,
                x         : left,
                y         : top
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

            me.adjustPositions(winData);

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
        let me      = this,
            winData = Neo.Main.getWindowData(),
            height, width;

        Object.entries(me.windows).forEach(([key, value]) => {
            switch (value.dock) {
                case 'bottom':
                case 'top':
                    width = winData.outerWidth;
                    break;
                case 'left':
                case 'right':
                    height = winData.outerHeight - 28;
                    break;
            }

            Neo.Main.windowResizeTo({
                height    : height,
                width     : width,
                windowName: key
            });
        });

        me.adjustPositions(winData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3ZpZDE5LWdhbGxlcnkvLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbWFpbi9hZGRvbi9XaW5kb3dQb3NpdGlvbi5tanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsbURBQUk7QUFDakMsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL3NyYy9tYWluL2FkZG9uL1dpbmRvd1Bvc2l0aW9uLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqXG4gKiBAY2xhc3MgTmVvLm1haW4uYWRkb24uV2luZG93UG9zaXRpb25cbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgV2luZG93UG9zaXRpb24gZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLm1haW4uYWRkb24uV2luZG93UG9zaXRpb24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5tYWluLmFkZG9uLldpbmRvd1Bvc2l0aW9uJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBpbnRlcnZhbElkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGludGVydmFsSWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGludGVydmFsVGltZT0xMDBcbiAgICAgICAgICovXG4gICAgICAgIGludGVydmFsVGltZTogMjAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdGUgbWV0aG9kIGFjY2VzcyBmb3Igb3RoZXIgd29ya2Vyc1xuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlbW90ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdGU6IHtcbiAgICAgICAgICAgIGFwcDogW1xuICAgICAgICAgICAgICAgICdyZWdpc3RlcldpbmRvdycsXG4gICAgICAgICAgICAgICAgJ3VucmVnaXN0ZXJXaW5kb3cnXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gc2NyZWVuTGVmdD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY3JlZW5MZWZ0OiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNjcmVlblRvcD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY3JlZW5Ub3A6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaW5nbGV0b249dHJ1ZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBzaW5nbGV0b246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHdpbmRvd3M9e31cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgd2luZG93czoge31cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgd2luID0gd2luZG93O1xuXG4gICAgICAgIG1lLnNjcmVlbkxlZnQgPSB3aW4uc2NyZWVuTGVmdDtcbiAgICAgICAgbWUuc2NyZWVuVG9wICA9IHdpbi5zY3JlZW5Ub3A7XG5cbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgbWUub25Nb3VzZU91dC5iaW5kKG1lKSk7XG4gICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAgIG1lLm9uUmVzaXplLmJpbmQobWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgYWRqdXN0UG9zaXRpb25zKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGxlZnQsIHRvcDtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhtZS53aW5kb3dzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAodmFsdWUuZG9jaykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkYXRhLnNjcmVlbkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgPSBkYXRhLm91dGVySGVpZ2h0ICArIGRhdGEuc2NyZWVuVG9wIC0gNTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gZGF0YS5zY3JlZW5MZWZ0IC0gdmFsdWUuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgdG9wICA9IGRhdGEuc2NyZWVuVG9wICArIDI4O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSBkYXRhLm91dGVyV2lkdGggKyBkYXRhLnNjcmVlbkxlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRvcCAgPSBkYXRhLnNjcmVlblRvcCAgKyAyODtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGRhdGEuc2NyZWVuTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdG9wICA9IGRhdGEuc2NyZWVuVG9wIC0gdmFsdWUuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE5lby5NYWluLndpbmRvd01vdmVUbyh7XG4gICAgICAgICAgICAgICAgd2luZG93TmFtZToga2V5LFxuICAgICAgICAgICAgICAgIHggICAgICAgICA6IGxlZnQsXG4gICAgICAgICAgICAgICAgeSAgICAgICAgIDogdG9wXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjaGVja01vdmVtZW50KCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBNYW5hZ2VyICAgID0gTmVvLndvcmtlci5NYW5hZ2VyLFxuICAgICAgICAgICAgd2luICAgICAgICA9IHdpbmRvdyxcbiAgICAgICAgICAgIHNjcmVlbkxlZnQgPSB3aW4uc2NyZWVuTGVmdCxcbiAgICAgICAgICAgIHNjcmVlblRvcCAgPSB3aW4uc2NyZWVuVG9wLFxuICAgICAgICAgICAgd2luRGF0YTtcblxuICAgICAgICBpZiAobWUuc2NyZWVuTGVmdCAhPT0gc2NyZWVuTGVmdCB8fCBtZS5zY3JlZW5Ub3AgIT09IHNjcmVlblRvcCkge1xuICAgICAgICAgICAgd2luRGF0YSA9IE5lby5NYWluLmdldFdpbmRvd0RhdGEoKTtcblxuICAgICAgICAgICAgbWUuYWRqdXN0UG9zaXRpb25zKHdpbkRhdGEpO1xuXG4gICAgICAgICAgICBNYW5hZ2VyLnNlbmRNZXNzYWdlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnd2luZG93UG9zaXRpb25DaGFuZ2UnLFxuICAgICAgICAgICAgICAgIGRhdGEgIDoge1xuICAgICAgICAgICAgICAgICAgICBhcHBOYW1lOiBNYW5hZ2VyLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC4uLndpbkRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUuc2NyZWVuTGVmdCA9IHNjcmVlbkxlZnQ7XG4gICAgICAgICAgICBtZS5zY3JlZW5Ub3AgID0gc2NyZWVuVG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgb25Nb3VzZU91dChldmVudCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghZXZlbnQudG9FbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIW1lLmludGVydmFsSWQpIHtcbiAgICAgICAgICAgICAgICBtZS5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwobWUuY2hlY2tNb3ZlbWVudC5iaW5kKG1lKSwgbWUuaW50ZXJ2YWxUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZS5pbnRlcnZhbElkKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lLmludGVydmFsSWQpO1xuICAgICAgICAgICAgbWUuaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHdpbkRhdGEgPSBOZW8uTWFpbi5nZXRXaW5kb3dEYXRhKCksXG4gICAgICAgICAgICBoZWlnaHQsIHdpZHRoO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKG1lLndpbmRvd3MpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5kb2NrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHdpbkRhdGEub3V0ZXJXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSB3aW5EYXRhLm91dGVySGVpZ2h0IC0gMjg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBOZW8uTWFpbi53aW5kb3dSZXNpemVUbyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ICAgIDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoICAgICA6IHdpZHRoLFxuICAgICAgICAgICAgICAgIHdpbmRvd05hbWU6IGtleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmFkanVzdFBvc2l0aW9ucyh3aW5EYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuZG9ja1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm5hbWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGF0YS5zaXplXG4gICAgICovXG4gICAgcmVnaXN0ZXJXaW5kb3coZGF0YSkge1xuICAgICAgICB0aGlzLndpbmRvd3NbZGF0YS5uYW1lXSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLm5hbWVcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyV2luZG93KGRhdGEpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2luZG93c1tkYXRhLm5hbWVdO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoV2luZG93UG9zaXRpb24pO1xuXG5sZXQgaW5zdGFuY2UgPSBOZW8uY3JlYXRlKFdpbmRvd1Bvc2l0aW9uKTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyJdLCJzb3VyY2VSb290IjoiIn0=