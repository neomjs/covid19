self["webpackChunk"](["vendors~chunks/apps-covid19-app-mjs"],{

/***/ "./node_modules/neo.mjs/src/component/Gallery.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/component/Gallery.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gallery; });
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _selection_GalleryModel_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../selection/GalleryModel.mjs */ "./node_modules/neo.mjs/src/selection/GalleryModel.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _data_Store_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");







const itemsMounted = Symbol.for('itemsMounted');

/**
 * @class Neo.component.Gallery
 * @extends Neo.component.Base
 */
class Gallery extends _Base_mjs__WEBPACK_IMPORTED_MODULE_2__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.component.Gallery'
         * @protected
         */
        className: 'Neo.component.Gallery',
        /**
         * @member {String} ntype='gallery'
         * @protected
         */
        ntype: 'gallery',
        /**
         * The amount of visible rows inside the gallery
         * @member {Number} amountRows_=3
         */
        amountRows_: 3,
        /**
         * The background color of the gallery container
         * @member {String} backgroundColor_='#000000'
         */
        backgroundColor_: '#000000',
        /**
         * @member {String[]} cls=['neo-gallery', 'page', 'view']
         */
        cls: ['neo-gallery', 'page', 'view'],
        /**
         * True disables selection of  gallery items
         * @member {Boolean} disableSelection=false
         */
        disableSelection: false,
        /**
         * The image height of the gallery
         * @member {Number} imageHeight=160
         */
        imageHeight: 160,
        /**
         * The image width of the gallery
         * @member {Number} imageWidth=120
         */
        imageWidth: 120,
        /**
         * @member {Object} itemTpl_
         */
        itemTpl_: {
            cls     : ['neo-gallery-item', 'image-wrap', 'view', 'neo-transition-1000'],
            tabIndex: '-1',
            cn: [{
                cls: ['neo-item-wrapper'],
                cn : [{
                    tag  : 'img',
                    cls  : [],
                    style: {}
                }]
            }]
        },
        /**
         * The unique record field containing the id.
         * @member {String} keyProperty='id'
         */
        keyProperty: 'id',
        /**
         * Additional used keys for the selection model
         * @member {Object} keys
         */
        keys: {},
        /**
         * The max amount of store items to show
         * @member {Number} maxItems_=300
         */
        maxItems_: 300,
        /**
         * The zooming factor which replaces the default wheelDelta.
         * @member {Number} mouseWheelDeltaX=10
         */
        mouseWheelDeltaX: 10,
        /**
         * The zooming factor which replaces the default wheelDelta.
         * @member {Number} mouseWheelDeltaY=10
         */
        mouseWheelDeltaY: 10,
        /**
         * Specifies whether the mouse wheel should change the translateZ value for zooming
         * @member {Boolean} mouseWheelEnabled_=true
         */
        mouseWheelEnabled_: true,
        /**
         * The DOM element offsetHeight of the top level div.
         * Gets fetched after the gallery got mounted.
         * @member {Number|null} offsetHeight=null
         * @protected
         */
        offsetHeight: null,
        /**
         * The DOM element offsetWidth of the top level div.
         * Gets fetched after the gallery got mounted.
         * @member {Number|null} offsetWidth=null
         * @protected
         */
        offsetWidth: null,
        /**
         * Set this one to true to order the items by row instead of by column
         * @member {Boolean} orderByRow_=false
         */
        orderByRow_: false,
        /**
         * The name of the CSS rule for selected items
         * @member {String} selectedItemCls='neo-selected'
         */
        selectedItemCls: 'neo-selected',
        /**
         * uses the selection.GalleryModel by default
         * @member {Neo.selection.GalleryModel|null} selectionModel_=null
         */
        selectionModel_: null,
        /**
         * True to select the item inside the middle of the store items on mount
         * @member {Boolean} selectOnMount=true
         */
        selectOnMount: true,
        /**
         * The store instance or class containing the data for the gallery items
         * @member {Neo.data.Store|null} store_=null
         */
        store_: null, // todo: use a store once collecitons are integrated
        /**
         * The setTimeout() ids for calls which can get cancelled
         * @member {Array} transitionTimeouts=[]
         * @protected
         */
        transitionTimeouts: [],
        /**
         * The translateX value of the view origin
         * @member {Number} translateX_=0
         */
        translateX_: 0,
        /**
         * The translateX value of the view origin
         * @member {Number} translateY_=0
         */
        translateY_: 0,
        /**
         * The translateX value of the view origin
         * @member {Number} translateZ_=0
         */
        translateZ_: 0,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cls     : ['page', 'view'],
            style   : {},
            tabIndex: '-1',
            cn: [{
                cls  : ['origin', 'view'],
                style: {},
                cn   : [{
                    cls  : ['camera', 'view'],
                    style: {},
                    cn   : [{
                        cls  : ['dolly', 'view'],
                        style: {},
                        cn   : [{
                            cls  : ['view'],
                            style: {},
                            cn   : []
                        }]
                    }]
                }]
            }]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = Neo.clone(me.domListeners, true),
            vdom         = me.vdom,
            origin       = vdom.cn[0],
            camera       = origin.cn[0],
            dolly        = camera.cn[0],
            view         = dolly.cn[0];

        me[itemsMounted] = false;

        camera.id = me.id + '__' + 'camera';
        dolly .id = me.id + '__' + 'dolly';
        origin.id = me.id + '__' + 'origin';
        view  .id = me.id + '__' + 'view';

        me.vdom = vdom;

        domListeners.push({
            click: {
                fn   : me.onClick,
                scope: me
            },
            wheel: {
                fn   : me.onMouseWheel,
                scope: me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        if (me.selectionModel) {
            me.selectionModel.register(me);
        }

        // load data for the example collection
        if (!(me.store instanceof _data_Store_mjs__WEBPACK_IMPORTED_MODULE_5__["default"])) {
            Neo.Xhr.promiseJson({
                insideNeo: true,
                url      : '../../resources/examples/data/ai_contacts.json'
            }).then(data => {
                me.store.items = data.json.data;
                setTimeout(() => { // todo: rendering check
                    me.createItems();

                    if (me.selectOnMount) {
                        me.afterSetMounted(true, false);
                    }
                }, 100);
            }).catch(err => {
                console.log('Error for Neo.Xhr.request', err, me.id);
            });
        }
    }

    /**
     * Triggered after the amountRows config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetAmountRows(value, oldValue) {
        if (Neo.isNumber(oldValue)) {
            let me = this;

            me.afterSetOrderByRow(me.orderByRow, !me.orderByRow);
        }
    }

    /**
     * Triggered after the maxItem config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetMaxItems(value, oldValue) {
        let me = this;

        if (value && me.rendered) {
            if (oldValue > value) {
                me.destroyItems(value, oldValue - value);
            } else {
                me.createItems(oldValue);
            }
        }
    }

    /**
     * Triggered after the mounted config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetMounted(value, oldValue) {
        if (value) {
            let me = this;

            setTimeout(() => {
                Neo.currentWorker.promiseMessage('main', {
                    action    : 'readDom',
                    appName   : me.appName,
                    vnodeId   : me.id,
                    attributes: [
                        'offsetHeight',
                        'offsetWidth'
                    ]
                }).then(data => {
                    me.offsetHeight = data.attributes.offsetHeight;
                    me.offsetWidth  = data.attributes.offsetWidth;

                    if (me.selectOnMount || me.selectionModel.hasSelection()) {
                        let selection = me.selectionModel.getSelection(),
                            key       = selection.length > 0 && selection[0];

                        if (!key) {
                            let index = parseInt(Math.min(me.maxItems, me.store.getCount()) / me.amountRows);

                            key = me.store.getKeyAt(index);
                        }

                        me.selectionModel.select(key);
                    }
                });
            }, 300);
        } else {
            this.selectionModel.items = [];
        }
    }

    /**
     * Triggered after the orderByRow config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetOrderByRow(value, oldValue) {
        if (Neo.isBoolean(oldValue)) {
            let me   = this,
                i    = 0,
                len  = Math.min(me.maxItems, me.store.items.length),
                vdom = me.vdom,
                view = me.getItemsRoot();

            if (me.rendered) {
                me.refreshImageReflection();

                setTimeout(() => {
                    for (; i < len; i++) {
                        view.cn[i].style.transform = me.getItemTransform(i);
                    }

                    me.vdom = vdom;

                    setTimeout(() => {
                        let sm = me.selectionModel;

                        if (sm.hasSelection()) {
                            me.onSelectionChange(sm.items);
                        }
                    }, 500);
                }, 50);
            }
        }
    }

    /**
     * Triggered after the selectionModel config got changed
     * @param {Neo.selection.Model} value
     * @param {Neo.selection.Model} oldValue
     * @protected
     */
    afterSetSelectionModel(value, oldValue) {
        if (this.rendered) {
            value.register(this);

            if (oldValue) {
                oldValue.destroy();
            }
        }
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Neo.data.Store|null} value
     * @param {Neo.data.Store|null} oldValue
     * @protected
     */
    beforeSetStore(value, oldValue) {
        let me = this;

        if (oldValue) {
            oldValue.destroy();
        }

        // todo: remove the if check once all demos use stores (instead of collections)
        if (value) {
            return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, _data_Store_mjs__WEBPACK_IMPORTED_MODULE_5__["default"], {
                listeners  : {
                    load : me.onStoreLoad,
                    sort : me.onSort,
                    scope: me
                }
            });
        }

        return Neo.create(_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"], {
            keyProperty: 'id',
            listeners  : {
                sort : me.onSort,
                scope: me
            }
        });
    }

    afterSetTranslateX() {this.moveOrigin();}
    afterSetTranslateY() {this.moveOrigin();}
    afterSetTranslateZ() {this.moveOrigin();}

    /**
     *
     * @returns {*}
     */
    beforeGetItemTpl() {
        return Neo.clone(this._itemTpl, true);
    }

    /**
     * Triggered before the selectionModel config gets changed.
     * @param {Neo.selection.Model} value
     * @param {Neo.selection.Model} oldValue
     * @protected
     */
    beforeSetSelectionModel(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, _selection_GalleryModel_mjs__WEBPACK_IMPORTED_MODULE_3__["default"], {
            listeners: {
                selectionChange: this.onSelectionChange,
                scope          : this
            }
        });
    }

    /**
     * Override this method to get different item-markups
     * @param {Object} vdomItem
     * @param {Object} record
     * @param {Number} index
     * @returns {Object} vdomItem
     */
    createItem(vdomItem, record, index) {
        let me        = this,
            imageVdom = vdomItem.cn[0].cn[0];

        vdomItem.id = me.getItemVnodeId(record[me.keyProperty]);

        imageVdom.src = Neo.config.resourcesPath + 'examples/' + record.image;

        imageVdom.style.height = me.imageHeight + 'px';
        imageVdom.style.width  = me.imageWidth  + 'px';

        return vdomItem;
    }

    /**
     * @param {Number} [startIndex] the start index for creating items,
     * e.g. increasing maxItems only needs to create the new ones
     * @protected
     */
    createItems(startIndex) {
        let me               = this,
            amountRows       = me.amountRows,
            orderByRow       = me.orderByRow,
            secondLastColumn = amountRows - 1,
            vdom             = me.vdom,
            itemsRoot        = me.getItemsRoot(),
            i                = startIndex || 0,
            len              = Math.min(me.maxItems, me.store.items.length),
            amountColumns, item, vdomItem;

        if (orderByRow) {
            amountColumns = Math.ceil(me.store.getCount() / amountRows);
        }

        for (; i < len; i++) {
            item      = me.store.items[i];
            vdomItem  = me.createItem(me.itemTpl, item, i);

            vdomItem. style = vdomItem.style || {};

            vdomItem.style['transform'] = me.getItemTransform(i);

            if (orderByRow) {
                if (i >= secondLastColumn * amountColumns) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].add(vdomItem.cls, 'neo-reflection');
                }
            } else {
                if (i % amountRows === secondLastColumn) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].add(vdomItem.cls, 'neo-reflection');
                }
            }

            itemsRoot.cn.push(vdomItem);
        }

        me.promiseVdomUpdate(vdom).then(() => {
            me[itemsMounted] = true;
        });
    }

    /**
     *
     * @param {Number} [startIndex]
     * @param {Number} [amountItems]
     */
    destroyItems(startIndex, amountItems) {
        let me           = this,
            vdom         = me.vdom,
            countItems   = amountItems || me.store.getCount(),
            selectedItem = me.selectionModel.items[0];

        me.getItemsRoot().cn.splice(startIndex || 0, countItems);
        me.vdom = vdom;

        if (me.selectionModel.hasSelection() && selectedItem > startIndex && selectedItem < startIndex + countItems) {
            me.afterSetMounted(true, false);
        }
    }

    /**
     *
     * @param {Number} index
     * @returns {Number[]}
     */
    getCameraTransformForCell(index) {
        let me          = this,
            amountRows  = me.amountRows,
            imageWidth  = me.imageWidth,
            gap         = 10,
            height      = me.offsetHeight / (amountRows + 2),
            spacing     = height + gap,
            x           = Math.floor(index / amountRows),
            y           = index - x * amountRows;

        if (me.orderByRow) {
            let amountColumns = Math.ceil(Math.min(me.maxItems, me.store.getCount()) / amountRows);

            x = index % amountColumns;
            y = Math.floor(index / amountColumns);
        }

        let cx = x * (imageWidth + 10),
            cy = (y + 0.5) * spacing * 1.1 + 50;

        return [-cx, -cy, 0];
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {Number} itemId
     */
    getItemId(vnodeId) {
        return parseInt(vnodeId.split('__')[1]);
    }

    /**
     * Returns the vdom node containing the gallery items
     * @returns {Object} vdom
     */
    getItemsRoot() {
        return this.vdom.cn[0].cn[0].cn[0].cn[0];
    }

    /**
     *
     * @param {Number} index
     * @returns {String}
     */
    getItemTransform(index) {
        let me         = this,
            amountRows = me.amountRows,
            x, y;

        if (me.orderByRow) {
            amountRows = Math.ceil(Math.min(me.maxItems, me.store.getCount()) / amountRows);

            x = index % amountRows;
            y = Math.floor(index / amountRows);
        } else {
            x = Math.floor(index / amountRows);
            y = index % amountRows;
        }

        return this.translate3d(
            x * (me.imageWidth  + 10),
            y * (me.imageHeight + 10) + 100,
            0
        );
    }

    /**
     *
     * @param {String} id
     * @returns {String}
     */
    getItemVnodeId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     */
    moveOrigin() {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[0].style.transform = me.translate3d(me.translateX, me.translateY, me.translateZ);

        me.vdom = vdom;
    }

    /**
     *
     * @param {Object} data
     */
    onClick(data) {
        this.fire(data.id === this.id ? 'containerClick' : 'itemClick', data);
    }

    /**
     *
     * @param {Object} data
     */
    onMouseWheel(data) {
        let me         = this,
            deltaX     = data.deltaX,
            deltaY     = data.deltaY,
            translateX = me.translateX,
            translateZ = me.translateZ;

        if (me.mouseWheelEnabled) {
            me._translateX = translateX - (deltaX * me.mouseWheelDeltaX); // silent update
            me._translateZ = translateZ + (deltaY * me.mouseWheelDeltaY); // silent update

            me.moveOrigin();

            me.fire('changeTranslateX', me._translateX);
            me.fire('changeTranslateZ', me._translateZ);
        }
    }

    /**
     *
     * @param {Array} value
     */
    onSelectionChange(value) {
        let me             = this,
            index          = me.store.indexOf(value && value[0] || 0),
            imageHeight    = me.imageHeight,
            imageWidth     = me.imageWidth,
            vdom           = me.vdom,
            camera         = vdom.cn[0].cn[0],
            dollyTransform = me.getCameraTransformForCell(index),
            height         = me.offsetHeight / (me.amountRows + 2),
            width          = Math.round(height * imageWidth / imageHeight),
            spacing        = width + 10,
            timeoutId;

        me.transitionTimeouts.forEach(item => {
            clearTimeout(item);
        });

        me.transitionTimeouts.splice(0, me.transitionTimeouts.length);

        Neo.currentWorker.promiseMessage('main', {
            action : 'updateDom',
            appName: me.appName,
            deltas : {
                id   : me.id + '__' + 'dolly',
                style: {
                    transform: me.translate3d(...dollyTransform)
                }
            }
        }).then(() => {
            Neo.currentWorker.promiseMessage('main', {
                action    : 'readDom',
                appName   : me.appName,
                vnodeId   : me.id,
                functions : [
                    {
                        fn            : 'getComputedStyle',
                        params        : [me.id + '__' + 'dolly', null],
                        paramIsDomNode: [true, false],
                        scope         : 'defaultView',
                        returnFnName  : 'transform',
                        returnValue   : 'transform'
                    }
                ]
            }).then(data => {
                let transform = data.functions.transform,
                    translateX, angle;

                if (transform.indexOf('matrix3d') === 0) {
                    transform = transform.substring(9, transform.length - 1); // remove matrix3d( ... )
                    transform = transform.split(',').map(e => parseFloat(e));
                    translateX = transform[12]; // bottom left element of the 4x4 matrix
                } else {
                    transform = transform.substring(7, transform.length - 1); // remove matrix( ... )
                    transform = transform.split(',').map(e => parseFloat(e));
                    translateX = transform[4]; // bottom left element of the 2x3 matrix
                }

                translateX = translateX - dollyTransform[0];
                angle      = Math.min(Math.max(translateX / (spacing * 3), -1), 1) * 45;

                camera.style.transform          = 'rotateY(' + angle + 'deg)';
                camera.style.transitionDuration = '330ms';

                me.vdom = vdom;

                timeoutId = setTimeout(() => {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].remove(me.transitionTimeouts, timeoutId);

                    vdom = me.vdom;

                    camera.style.transform          = 'rotateY(0deg)';
                    camera.style.transitionDuration = '5000ms';

                    me.vdom = vdom;
                }, 330);

                me.transitionTimeouts.push(timeoutId);
            });
        });
    }

    /**
     *
     */
    onSort() {
        if (this[itemsMounted] === true) {
            let me        = this,
                hasChange = false,
                items     = [...me.store.items || []],
                newCn     = [],
                vdom      = me.vdom,
                view      = me.getItemsRoot(),
                vdomMap   = view.cn.map(e => e.id),
                fromIndex, vdomId;

            items.length = Math.min(me.maxItems, me.store.getCount());

            if (items.length > 0) {
                items.forEach((item, index) => {
                    vdomId    = me.getItemVnodeId(item[me.keyProperty]);
                    fromIndex = vdomMap.indexOf(vdomId);

                    newCn.push(view.cn[fromIndex]);

                    if (index !== fromIndex) {
                        hasChange = true;
                    }
                });

                if (hasChange) {
                    view.cn = newCn;
                    me.vdom = vdom;

                    setTimeout(() => {
                        me.afterSetOrderByRow(me.orderByRow, !me.orderByRow);
                    }, 50);
                }
            }
        }
    }

    /**
     *
     * @param {Array} items
     */
    onStoreLoad(items) {
        this.getItemsRoot().cn = []; // silent update
        this.createItems();
    }

    /**
     *
     */
    refreshImageReflection() {
        let me               = this,
            amountRows       = me.amountRows,
            orderByRow       = me.orderByRow,
            secondLastColumn = amountRows - 1,
            vdom             = me.vdom,
            view             = me.getItemsRoot(),
            amountColumns;

        if (orderByRow) {
            amountColumns = Math.ceil(Math.min(me.maxItems, me.store.getCount()) / amountRows);
        }

        view.cn.forEach((item, index) => {
            if (orderByRow) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"][index >= secondLastColumn * amountColumns ? 'add' : 'remove'](item.cls, 'neo-reflection');
            } else {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"][index % amountRows === secondLastColumn   ? 'add' : 'remove'](item.cls, 'neo-reflection');
            }
        });

        me.vdom = vdom;
    }

    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @returns {String}
     */
    translate3d(x, y, z) {
        return 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
    }
}

Neo.applyClassConfig(Gallery);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Number.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Number.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Number; });
/* harmony import */ var _trigger_SpinDown_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trigger/SpinDown.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/SpinDown.mjs");
/* harmony import */ var _trigger_SpinUp_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trigger/SpinUp.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/SpinUp.mjs");
/* harmony import */ var _trigger_SpinUpDown_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trigger/SpinUpDown.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/SpinUpDown.mjs");
/* harmony import */ var _Text_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text.mjs */ "./node_modules/neo.mjs/src/form/field/Text.mjs");





/**
 * Uses an input type number and optionally provides custom spin buttons for up and down
 * @class Neo.form.field.Number
 * @extends Neo.form.field.Text
 */
class Number extends _Text_mjs__WEBPACK_IMPORTED_MODULE_3__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for triggerPosition
         * @member {String[]} triggerPositions=['right', 'sides']
         * @protected
         * @static
         */
        triggerPositions: ['right', 'sides']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Number'
         * @protected
         */
        className: 'Neo.form.field.Number',
        /**
         * @member {String} ntype='numberfield'
         * @protected
         */
        ntype: 'numberfield',
        /**
         * @member {Array} cls=['neo-numberfield', 'neo-textfield']
         */
        cls: ['neo-numberfield', 'neo-textfield'],
        /**
         * @member {Number[]|null} excluded=null
         */
        excludedValues: null,
        /**
         * false only allows changing the field using the spin buttons
         * @member {Boolean} inputEditable_=true
         */
        inputEditable_: true,
        /**
         * Value for the inputType_ textfield config
         * @member {String} inputType='number'
         */
        inputType: 'number',
        /**
         * @member {Number} maxValue_=100
         */
        maxValue_: 100,
        /**
         * @member {Number} minValue_=0
         */
        minValue_: 0,
        /**
         * @member {Number} stepSize_=1
         */
        stepSize_: 1,
        /**
         * Valid values: 'right', 'sides'
         * @member {String} triggerPosition='right'
         */
        triggerPosition_: 'right',
        /**
         * @member {Boolean} useSpinButtons_=true
         */
        useSpinButtons_: true
    }}

    /**
     *
     */
    onConstructed() {
        this.updateTriggers();
        super.onConstructed();
    }

    /**
     * Triggered after the inputEditable config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetInputEditable(value, oldValue) {
        let me      = this,
            vdom    = me.vdom,
            inputEl = me.getInputEl(),
            style   = inputEl.style || {};

        if (value) {
            delete style.pointerEvents;
        } else {
            style.pointerEvents = 'none';
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the maxValue config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetMaxValue(value, oldValue) {
        this.changeInputElKey('max', value);
    }

    /**
     * Triggered after the minValue config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetMinValue(value, oldValue) {
        this.changeInputElKey('min', value);
    }

    /**
     * Triggered after the stepSize config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetStepSize(value, oldValue) {
        let me  = this,
            val = me.value,
            modulo;

        me.changeInputElKey('step', value);

        if (val !== null) {
            modulo = (val - me.minValue) % value;

            if (modulo !== 0) { // find the closest valid value
                if (modulo / value > 0.5) {
                    if      (val + value - modulo < me.maxValue) {me.value = val + value - modulo;}
                    else if (val - modulo > me.minValue)         {me.value = val - modulo;}
                } else {
                    if      (val - modulo > me.minValue)         {me.value = val - modulo;}
                    else if (val + value - modulo < me.maxValue) {me.value = val + value - modulo;}
                }
            }
        }
    }

    /**
     * Triggered after the triggerPosition config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetTriggerPosition(value, oldValue) {
        if (oldValue) {
            this.updateTriggers();
        }
    }

    /**
     * Triggered after the useSpinButtons config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseSpinButtons(value, oldValue) {
        if (typeof oldValue === 'boolean') {
            this.updateTriggers();
        }
    }

    /**
     * Triggered before the triggerPosition config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    beforeSetTriggerPosition(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'triggerPosition');
    }

    /**
     * @param {Object} data
     * @override
     */
    onInputValueChange(data) {
        let me       = this,
            value    = data.value,
            oldValue = me.value;

        if (!value && !me.required) {
            super.onInputValueChange(data);
        } else {
            value = parseInt(value); // todo: support for other number types

            if (!Neo.isNumber(value)) {
                me._value = oldValue;
            } else {
                value = value - value % me.stepSize;
                value = Math.max(me.minValue, value);
                value = Math.min(me.maxValue, value);

                data.value = value;

                super.onInputValueChange(data);
            }
        }
    }

    /**
     * @protected
     */
    onSpinButtonDownClick() {
        let me       = this,
            oldValue = me.value || (me.maxValue + me.stepSize),
            value    = Math.max(me.minValue, oldValue - me.stepSize);

        if (me.excludedValues) {
            while(me.excludedValues.includes(value)) {
                value = Math.max(me.minValue, value - me.stepSize);
            }
        }

        if (oldValue !== value) {
            me.value = value;
        }
    }

    /**
     * @protected
     */
    onSpinButtonUpClick() {
        let me       = this,
            oldValue = me.value || (me.minValue - me.stepSize),
            value    = Math.min(me.maxValue, oldValue + me.stepSize);

        if (me.excludedValues) {
            while(me.excludedValues.includes(value)) {
                value = Math.min(me.maxValue, value + me.stepSize);
            }
        }

        if (oldValue !== value) {
            me.value = value;
        }
    }

    /**
     *
     */
    updateTriggers() {
        let me       = this,
            triggers = me.triggers || [];

        if (me.useSpinButtons) {
            if (me.triggerPosition === 'right') {
                if (!me.hasTrigger('spinupdown')) {
                    triggers.push(_trigger_SpinUpDown_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
                }

                me.removeTrigger('spindown', true, triggers);
                me.removeTrigger('spinup',   true, triggers);
            } else {
                if (!me.hasTrigger('spindown')) {
                    triggers.push(_trigger_SpinDown_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]);
                }

                if (!me.hasTrigger('spinup')) {
                    triggers.push(_trigger_SpinUp_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]);
                }

                me.removeTrigger('spinupdown', true, triggers);
            }
        } else {
            me.removeTrigger('spindown',   true, triggers);
            me.removeTrigger('spinup',     true, triggers);
            me.removeTrigger('spinupdown', true, triggers);
        }

        me.triggers = triggers;
    }
}

Neo.applyClassConfig(Number);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Range.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Range.mjs ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Range; });
/* harmony import */ var _Number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Number.mjs */ "./node_modules/neo.mjs/src/form/field/Number.mjs");


/**
 * @class Neo.form.field.Range
 * @extends Neo.form.field.Number
 */
class Range extends _Number_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Range'
         * @protected
         */
        className: 'Neo.form.field.Range',
        /**
         * @member {String} ntype='rangefield'
         * @protected
         */
        ntype: 'rangefield',
        /**
         * True shows a clear trigger in case the field has a non empty value.
         * @member {Boolean} clearable=false
         */
        clearable: false,
        /**
         * @member {String[]} cls=['neo-rangefield','neo-textfield']
         */
        cls: ['neo-rangefield', 'neo-textfield'],
        /**
         * Value for the inputType_ textfield config
         * @member {String} inputType='range'
         */
        inputType: 'range',
        /**
         * @member {Array} tickmarks_=[]
         */
        tickmarks_: [],
        /**
         * @member {Boolean} useInputEvent=false
         */
        useInputEvent : false,
        /**
         * Disables the field.Number buttons
         * @member {Boolean} useInputEvent=false
         */
        useSpinButtons: false
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners,
            inputEl      = me.vdom.cn[1];

        if (me.useInputEvent) {
            domListeners.push({
                input: {
                    fn    : me.onInputValueChange,
                    id    : me.vdom.cn[1].id,
                    scope : me
                }
            });

            me.domListeners = domListeners;
        }

        inputEl.cls = ['neo-rangefield-input']; // replace neo-textfield-input
    }

    /**
     * Triggered after the tickmarks config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    afterSetTickmarks(value, oldValue) {
        //console.log('updateTickmarks');
    }
}

Neo.applyClassConfig(Range);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/SpinDown.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/SpinDown.mjs ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpinDown; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");


/**
 * Decreases the value of a NumberField
 * @class Neo.form.field.trigger.SpinDown
 * @extends Neo.form.field.trigger.Base
 */
class SpinDown extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.SpinUp'
         * @protected
         */
        className: 'Neo.form.field.trigger.SpinDown',
        /**
         * @member {String} ntype='trigger-spindown'
         * @protected
         */
        ntype: 'trigger-spindown',
        /**
         * @member {String} align_='start'
         */
        align: 'start',
        /**
         * @member {String|null} iconCls='fa fa-chevron-left'
         */
        iconCls: 'fa fa-chevron-left',
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='spindown'
         * @protected
         */
        type: 'spindown'
    }}

    onTriggerClick(data) {
        this.field.onSpinButtonDownClick();
    }
}

Neo.applyClassConfig(SpinDown);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/SpinUp.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/SpinUp.mjs ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpinUp; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");


/**
 * Increases the value of a NumberField
 * @class Neo.form.field.trigger.SpinUp
 * @extends Neo.form.field.trigger.Base
 */
class SpinUp extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.SpinUp'
         * @protected
         */
        className: 'Neo.form.field.trigger.SpinUp',
        /**
         * @member {String} ntype='trigger-spinup'
         * @protected
         */
        ntype: 'trigger-spinup',
        /**
         * @member {String|null} iconCls='fa fa-chevron-right'
         */
        iconCls: 'fa fa-chevron-right',
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='spinup'
         * @protected
         */
        type: 'spinup'
    }}

    onTriggerClick(data) {
        this.field.onSpinButtonUpClick();
    }
}

Neo.applyClassConfig(SpinUp);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/SpinUpDown.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/SpinUpDown.mjs ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpinUpDown; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");


/**
 * Combines spin up & down inside one trigger
 * @class Neo.form.field.trigger.SpinUpDown
 * @extends Neo.form.field.trigger.Base
 */
class SpinUpDown extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.SpinUpDown'
         * @protected
         */
        className: 'Neo.form.field.trigger.SpinUpDown',
        /**
         * @member {String} ntype='trigger-spinupdown'
         * @protected
         */
        ntype: 'trigger-spinupdown',
        /**
         * @member {String[]} cls=['neo-field-trigger', 'neo-spin-buttons']
         */
        cls: ['neo-field-trigger', 'neo-spin-buttons'],
        /**
         * @member {String} spinButtonDownIconCls='fa fa-chevron-down'
         */
        spinButtonDownIconCls: 'fa fa-chevron-down',
        /**
         * @member {String} spinButtonUpIconCls='fa fa-chevron-up'
         */
        spinButtonUpIconCls: 'fa fa-chevron-up',
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='spinupdown'
         * @protected
         */
        type: 'spinupdown'
    }}

    onConstructed() {
        let me   = this,
            vdom = me.vdom;

        vdom.cn = [
            {cls: ['neo-spin-button', 'neo-up',   me.spinButtonUpIconCls]},
            {cls: ['neo-spin-button', 'neo-down', me.spinButtonDownIconCls]}
        ];

        me.vdom = vdom;

        super.onConstructed();
    }

    onTriggerClick(data) {
        let me     = this,
            target = data.path[0],
            cls    = target.cls.join(' ');

        if (cls.includes('neo-down')) {
            me.field.onSpinButtonDownClick();
        } else if (cls.includes('neo-up')) {
            me.field.onSpinButtonUpClick();
        }
    }
}

Neo.applyClassConfig(SpinUpDown);



/***/ }),

/***/ "./node_modules/neo.mjs/src/selection/GalleryModel.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/neo.mjs/src/selection/GalleryModel.mjs ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GalleryModel; });
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/selection/Model.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * A selection model intended to use for Neo.component.Gallery
 * @class Neo.selection.GalleryModel
 * @extends Neo.selection.Model
 */
class GalleryModel extends _Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.selection.GalleryModel'
         * @protected
         */
        className: 'Neo.selection.GalleryModel',
        /**
         * @member {String} ntype='selection-gallerymodel'
         * @protected
         */
        ntype: 'selection-gallerymodel',
        /**
         * True to stay in the same column when navigating with the up and down keys,
         * otherwise you will navigate to the next / prev column when moving out
         * @member {Boolean} stayInRow=false
         */
        stayInRow: false
    }}

    /**
     * Override to not apply a domListener
     */
    addDomListener() {}

    /**
     *
     */
    onContainerClick() {
        let me       = this,
            view     = me.view,
            oldItems = [...me.items],
            deltas   = [];

        me.items.forEach(item => {
            deltas.push({
                id : view.getItemVnodeId(item),
                cls: {
                    add   : [],
                    remove: ['neo-selected']
                }
            });
        });

        me.items.splice(0, me.items.length);

        Neo.currentWorker.promiseMessage('main', {
            action : 'updateDom',
            appName: view.appName,
            deltas : deltas
        }).then(() => {
            me.fire('selectionChange', me.items, oldItems);
        });
    }

    /**
     *
     * @param {Object} data
     */
    onItemClick(data) {
        let i    = 0,
            len  = data.path.length,
            view = this.view,
            key;

        for (; i < len; i++) {
            if (data.path[i].cls.includes('neo-gallery-item')) {
                key = view.getItemId(data.path[i].id);
                this.select(key);

                view.fire('select', {
                    record: view.store.get(key)
                });

                break;
            }
        }
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownDown(data) {
        this[this.view.orderByRow ? 'onNavKeyRow' : 'onNavKeyColumn'](1);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownLeft(data) {
        this[this.view.orderByRow ? 'onNavKeyColumn' : 'onNavKeyRow'](-1);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownRight(data) {
        this[this.view.orderByRow ? 'onNavKeyColumn' : 'onNavKeyRow'](1);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownUp(data) {
        this[this.view.orderByRow ? 'onNavKeyRow' : 'onNavKeyColumn'](-1);
    }

    /**
     *
     * @param {Number} step=1
     */
    onNavKeyColumn(step=1) {
        let me           = this,
            view         = me.view,
            store        = view.store,
            selected     = me.items[0],
            countRecords = store.getCount(),
            index, record;

        if (selected) {
            index = store.indexOf(selected) + step;
        } else {
            index = 0;
        }

        if (index < 0) {
            index = countRecords - 1;
        } else if (index >= countRecords) {
            index = 0;
        }

        record = store.getAt(index);

        me.select(record[store.keyProperty]);

        view.fire('select', {
            record: record
        });
    }

    /**
     *
     * @param {Number} step=1
     */
    onNavKeyRow(step=1) {
        let me           = this,
            view         = me.view,
            store        = view.store,
            selected     = me.items[0],
            countRecords = store.getCount(),
            amountRows   = view.amountRows,
            stayInRow    = me.stayInRow,
            index, record;

        if (view.orderByRow) {
            amountRows = Math.ceil(view.store.getCount() / amountRows);
        }

        step *= amountRows;

        if (selected) {
            index = store.indexOf(selected) + step;
        } else {
            index = 0;
        }

        if (index < 0) {
            if (!stayInRow) {
                index++;
            }
            while (index < (countRecords - amountRows)) {
                index += amountRows;
            }
        } else if (index >= countRecords) {
            if (!stayInRow) {
                index--;
            }
            while (index >= amountRows) {
                index -= amountRows;
            }
        }

        record = store.getAt(index);

        me.select(record[store.keyProperty]);

        view.fire('select', {
            record: record
        });
    }

    /**
     *
     * @param {Neo.component.Base} component
     */
    register(component) {
        super.register(component);

        let me   = this,
            id   = me.id,
            view = me.view;

        view.on({
            containerClick: me.onContainerClick,
            itemClick     : me.onItemClick,
            scope         : me
        });

        if (view.keys) {
            view.keys._keys.push(
                {fn: 'onKeyDownDown'  ,key: 'Down'  ,scope: id},
                {fn: 'onKeyDownLeft'  ,key: 'Left'  ,scope: id},
                {fn: 'onKeyDownRight' ,key: 'Right' ,scope: id},
                {fn: 'onKeyDownUp'    ,key: 'Up'    ,scope: id}
            );
        }
    }

    /**
     *
     * @param {String} itemId
     */
    select(itemId) {
        let me       = this,
            view     = me.view,
            oldItems = [...me.items],
            deltas   = [],
            vnodeId  = view.getItemVnodeId(itemId);

        if (me.singleSelect) {
            me.items.forEach(item => {
                if (item !== itemId) {console.log(item, itemId)
                    deltas.push({
                        id : view.getItemVnodeId(item),
                        cls: {
                            add   : [],
                            remove: ['neo-selected']
                        }
                    });
                }
            });

            me.items.splice(0, me.items.length);
        }

        deltas.push({
            id : vnodeId,
            cls: {
                add: ['neo-selected']
            }
        });

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]['add'](me.items, itemId);

        if (deltas.length > 0 && view.mounted) {
            Neo.currentWorker.promiseMessage('main', {
                action : 'updateDom',
                appName: view.appName,
                deltas : deltas
            }).then(() => {
                me.fire('selectionChange', me.items, oldItems);
            });
        } else if (view.mounted) {
            me.fire('selectionChange', me.items, oldItems);
        }
    }

    /**
     *
     */
    unregister() {
        let me   = this,
            id   = me.id,
            view = me.view;

        if (view.keys) {
            view.keys.removeKeys([
                {fn: 'onKeyDownDown'  ,key: 'Down'  ,scope: id},
                {fn: 'onKeyDownLeft'  ,key: 'Left'  ,scope: id},
                {fn: 'onKeyDownRight' ,key: 'Right' ,scope: id},
                {fn: 'onKeyDownUp'    ,key: 'Up'    ,scope: id}
            ]);
        }

        super.unregister();
    }
}

Neo.applyClassConfig(GalleryModel);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29tcG9uZW50L0dhbGxlcnkubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL051bWJlci5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvUmFuZ2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL3RyaWdnZXIvU3BpbkRvd24ubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL3RyaWdnZXIvU3BpblVwLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZm9ybS9maWVsZC90cmlnZ2VyL1NwaW5VcERvd24ubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9zZWxlY3Rpb24vR2FsbGVyeU1vZGVsLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzRDtBQUNGO0FBQ1g7QUFDbUI7QUFDWjtBQUNBOztBQUVoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpREFBUztBQUMvQix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFB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QUE4QztBQUMvRCxpQkFBaUIsOENBQThDO0FBQy9ELGlCQUFpQiw4Q0FBOEM7QUFDL0QsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6InZlbmRvcnN+Y2h1bmtzL2FwcHMtY292aWQxOS1hcHAtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENsYXNzU3lzdGVtVXRpbCBmcm9tICcuLi91dGlsL0NsYXNzU3lzdGVtLm1qcyc7XG5pbXBvcnQgQ29sbGVjdGlvbiAgICAgIGZyb20gJy4uL2NvbGxlY3Rpb24vQmFzZS5tanMnXG5pbXBvcnQgQ29tcG9uZW50ICAgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IEdhbGxlcnlNb2RlbCAgICBmcm9tICcuLi9zZWxlY3Rpb24vR2FsbGVyeU1vZGVsLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgICAgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBTdG9yZSAgICAgICAgICAgZnJvbSAnLi4vZGF0YS9TdG9yZS5tanMnO1xuXG5jb25zdCBpdGVtc01vdW50ZWQgPSBTeW1ib2wuZm9yKCdpdGVtc01vdW50ZWQnKTtcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmNvbXBvbmVudC5HYWxsZXJ5XG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgR2FsbGVyeSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb21wb25lbnQuR2FsbGVyeSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvbXBvbmVudC5HYWxsZXJ5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2dhbGxlcnknXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnZ2FsbGVyeScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYW1vdW50IG9mIHZpc2libGUgcm93cyBpbnNpZGUgdGhlIGdhbGxlcnlcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBhbW91bnRSb3dzXz0zXG4gICAgICAgICAqL1xuICAgICAgICBhbW91bnRSb3dzXzogMyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBnYWxsZXJ5IGNvbnRhaW5lclxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGJhY2tncm91bmRDb2xvcl89JyMwMDAwMDAnXG4gICAgICAgICAqL1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JfOiAnIzAwMDAwMCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLWdhbGxlcnknLCAncGFnZScsICd2aWV3J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tZ2FsbGVyeScsICdwYWdlJywgJ3ZpZXcnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgZGlzYWJsZXMgc2VsZWN0aW9uIG9mICBnYWxsZXJ5IGl0ZW1zXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGRpc2FibGVTZWxlY3Rpb249ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVTZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGltYWdlIGhlaWdodCBvZiB0aGUgZ2FsbGVyeVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGltYWdlSGVpZ2h0PTE2MFxuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VIZWlnaHQ6IDE2MCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbWFnZSB3aWR0aCBvZiB0aGUgZ2FsbGVyeVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGltYWdlV2lkdGg9MTIwXG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZVdpZHRoOiAxMjAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGl0ZW1UcGxfXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtVHBsXzoge1xuICAgICAgICAgICAgY2xzICAgICA6IFsnbmVvLWdhbGxlcnktaXRlbScsICdpbWFnZS13cmFwJywgJ3ZpZXcnLCAnbmVvLXRyYW5zaXRpb24tMTAwMCddLFxuICAgICAgICAgICAgdGFiSW5kZXg6ICctMScsXG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWl0ZW0td3JhcHBlciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnICA6ICdpbWcnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgIDogW10sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHVuaXF1ZSByZWNvcmQgZmllbGQgY29udGFpbmluZyB0aGUgaWQuXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30ga2V5UHJvcGVydHk9J2lkJ1xuICAgICAgICAgKi9cbiAgICAgICAga2V5UHJvcGVydHk6ICdpZCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpdGlvbmFsIHVzZWQga2V5cyBmb3IgdGhlIHNlbGVjdGlvbiBtb2RlbFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGtleXM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1heCBhbW91bnQgb2Ygc3RvcmUgaXRlbXMgdG8gc2hvd1xuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IG1heEl0ZW1zXz0zMDBcbiAgICAgICAgICovXG4gICAgICAgIG1heEl0ZW1zXzogMzAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHpvb21pbmcgZmFjdG9yIHdoaWNoIHJlcGxhY2VzIHRoZSBkZWZhdWx0IHdoZWVsRGVsdGEuXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gbW91c2VXaGVlbERlbHRhWD0xMFxuICAgICAgICAgKi9cbiAgICAgICAgbW91c2VXaGVlbERlbHRhWDogMTAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgem9vbWluZyBmYWN0b3Igd2hpY2ggcmVwbGFjZXMgdGhlIGRlZmF1bHQgd2hlZWxEZWx0YS5cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBtb3VzZVdoZWVsRGVsdGFZPTEwXG4gICAgICAgICAqL1xuICAgICAgICBtb3VzZVdoZWVsRGVsdGFZOiAxMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBtb3VzZSB3aGVlbCBzaG91bGQgY2hhbmdlIHRoZSB0cmFuc2xhdGVaIHZhbHVlIGZvciB6b29taW5nXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vdXNlV2hlZWxFbmFibGVkXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBtb3VzZVdoZWVsRW5hYmxlZF86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgRE9NIGVsZW1lbnQgb2Zmc2V0SGVpZ2h0IG9mIHRoZSB0b3AgbGV2ZWwgZGl2LlxuICAgICAgICAgKiBHZXRzIGZldGNoZWQgYWZ0ZXIgdGhlIGdhbGxlcnkgZ290IG1vdW50ZWQuXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBvZmZzZXRIZWlnaHQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBvZmZzZXRIZWlnaHQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgRE9NIGVsZW1lbnQgb2Zmc2V0V2lkdGggb2YgdGhlIHRvcCBsZXZlbCBkaXYuXG4gICAgICAgICAqIEdldHMgZmV0Y2hlZCBhZnRlciB0aGUgZ2FsbGVyeSBnb3QgbW91bnRlZC5cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IG9mZnNldFdpZHRoPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0V2lkdGg6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyBvbmUgdG8gdHJ1ZSB0byBvcmRlciB0aGUgaXRlbXMgYnkgcm93IGluc3RlYWQgb2YgYnkgY29sdW1uXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG9yZGVyQnlSb3dfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBvcmRlckJ5Um93XzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgQ1NTIHJ1bGUgZm9yIHNlbGVjdGVkIGl0ZW1zXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gc2VsZWN0ZWRJdGVtQ2xzPSduZW8tc2VsZWN0ZWQnXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3RlZEl0ZW1DbHM6ICduZW8tc2VsZWN0ZWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogdXNlcyB0aGUgc2VsZWN0aW9uLkdhbGxlcnlNb2RlbCBieSBkZWZhdWx0XG4gICAgICAgICAqIEBtZW1iZXIge05lby5zZWxlY3Rpb24uR2FsbGVyeU1vZGVsfG51bGx9IHNlbGVjdGlvbk1vZGVsXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3Rpb25Nb2RlbF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIHRvIHNlbGVjdCB0aGUgaXRlbSBpbnNpZGUgdGhlIG1pZGRsZSBvZiB0aGUgc3RvcmUgaXRlbXMgb24gbW91bnRcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2VsZWN0T25Nb3VudD10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3RPbk1vdW50OiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHN0b3JlIGluc3RhbmNlIG9yIGNsYXNzIGNvbnRhaW5pbmcgdGhlIGRhdGEgZm9yIHRoZSBnYWxsZXJ5IGl0ZW1zXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kYXRhLlN0b3JlfG51bGx9IHN0b3JlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzdG9yZV86IG51bGwsIC8vIHRvZG86IHVzZSBhIHN0b3JlIG9uY2UgY29sbGVjaXRvbnMgYXJlIGludGVncmF0ZWRcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzZXRUaW1lb3V0KCkgaWRzIGZvciBjYWxscyB3aGljaCBjYW4gZ2V0IGNhbmNlbGxlZFxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gdHJhbnNpdGlvblRpbWVvdXRzPVtdXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRyYW5zaXRpb25UaW1lb3V0czogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHJhbnNsYXRlWCB2YWx1ZSBvZiB0aGUgdmlldyBvcmlnaW5cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB0cmFuc2xhdGVYXz0wXG4gICAgICAgICAqL1xuICAgICAgICB0cmFuc2xhdGVYXzogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0cmFuc2xhdGVYIHZhbHVlIG9mIHRoZSB2aWV3IG9yaWdpblxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHRyYW5zbGF0ZVlfPTBcbiAgICAgICAgICovXG4gICAgICAgIHRyYW5zbGF0ZVlfOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRyYW5zbGF0ZVggdmFsdWUgb2YgdGhlIHZpZXcgb3JpZ2luXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gdHJhbnNsYXRlWl89MFxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNsYXRlWl86IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY2xzICAgICA6IFsncGFnZScsICd2aWV3J10sXG4gICAgICAgICAgICBzdHlsZSAgIDoge30sXG4gICAgICAgICAgICB0YWJJbmRleDogJy0xJyxcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNscyAgOiBbJ29yaWdpbicsICd2aWV3J10sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICAgIGNuICAgOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbHMgIDogWydjYW1lcmEnLCAndmlldyddLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgICAgICAgIGNuICAgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICA6IFsnZG9sbHknLCAndmlldyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY24gICA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzICA6IFsndmlldyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiAgIDogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBOZW8uY2xvbmUobWUuZG9tTGlzdGVuZXJzLCB0cnVlKSxcbiAgICAgICAgICAgIHZkb20gICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBvcmlnaW4gICAgICAgPSB2ZG9tLmNuWzBdLFxuICAgICAgICAgICAgY2FtZXJhICAgICAgID0gb3JpZ2luLmNuWzBdLFxuICAgICAgICAgICAgZG9sbHkgICAgICAgID0gY2FtZXJhLmNuWzBdLFxuICAgICAgICAgICAgdmlldyAgICAgICAgID0gZG9sbHkuY25bMF07XG5cbiAgICAgICAgbWVbaXRlbXNNb3VudGVkXSA9IGZhbHNlO1xuXG4gICAgICAgIGNhbWVyYS5pZCA9IG1lLmlkICsgJ19fJyArICdjYW1lcmEnO1xuICAgICAgICBkb2xseSAuaWQgPSBtZS5pZCArICdfXycgKyAnZG9sbHknO1xuICAgICAgICBvcmlnaW4uaWQgPSBtZS5pZCArICdfXycgKyAnb3JpZ2luJztcbiAgICAgICAgdmlldyAgLmlkID0gbWUuaWQgKyAnX18nICsgJ3ZpZXcnO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICA6IG1lLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2hlZWw6IHtcbiAgICAgICAgICAgICAgICBmbiAgIDogbWUub25Nb3VzZVdoZWVsLFxuICAgICAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdGlvbk1vZGVsLnJlZ2lzdGVyKG1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvYWQgZGF0YSBmb3IgdGhlIGV4YW1wbGUgY29sbGVjdGlvblxuICAgICAgICBpZiAoIShtZS5zdG9yZSBpbnN0YW5jZW9mIFN0b3JlKSkge1xuICAgICAgICAgICAgTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICAgICAgaW5zaWRlTmVvOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVybCAgICAgIDogJy4uLy4uL3Jlc291cmNlcy9leGFtcGxlcy9kYXRhL2FpX2NvbnRhY3RzLmpzb24nXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1lLnN0b3JlLml0ZW1zID0gZGF0YS5qc29uLmRhdGE7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIHRvZG86IHJlbmRlcmluZyBjaGVja1xuICAgICAgICAgICAgICAgICAgICBtZS5jcmVhdGVJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZS5zZWxlY3RPbk1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5hZnRlclNldE1vdW50ZWQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGZvciBOZW8uWGhyLnJlcXVlc3QnLCBlcnIsIG1lLmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhbW91bnRSb3dzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEFtb3VudFJvd3ModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChOZW8uaXNOdW1iZXIob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBtZS5hZnRlclNldE9yZGVyQnlSb3cobWUub3JkZXJCeVJvdywgIW1lLm9yZGVyQnlSb3cpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBtYXhJdGVtIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE1heEl0ZW1zKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiBtZS5yZW5kZXJlZCkge1xuICAgICAgICAgICAgaWYgKG9sZFZhbHVlID4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBtZS5kZXN0cm95SXRlbXModmFsdWUsIG9sZFZhbHVlIC0gdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVJdGVtcyhvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIG1vdW50ZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRNb3VudGVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24gICAgOiAncmVhZERvbScsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWUgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZub2RlSWQgICA6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnb2Zmc2V0SGVpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdvZmZzZXRXaWR0aCdcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLm9mZnNldEhlaWdodCA9IGRhdGEuYXR0cmlidXRlcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIG1lLm9mZnNldFdpZHRoICA9IGRhdGEuYXR0cmlidXRlcy5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWUuc2VsZWN0T25Nb3VudCB8fCBtZS5zZWxlY3Rpb25Nb2RlbC5oYXNTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IG1lLnNlbGVjdGlvbk1vZGVsLmdldFNlbGVjdGlvbigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSAgICAgICA9IHNlbGVjdGlvbi5sZW5ndGggPiAwICYmIHNlbGVjdGlvblswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChNYXRoLm1pbihtZS5tYXhJdGVtcywgbWUuc3RvcmUuZ2V0Q291bnQoKSkgLyBtZS5hbW91bnRSb3dzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IG1lLnN0b3JlLmdldEtleUF0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbWUuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbk1vZGVsLml0ZW1zID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIG9yZGVyQnlSb3cgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRPcmRlckJ5Um93KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoTmVvLmlzQm9vbGVhbihvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBpICAgID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gID0gTWF0aC5taW4obWUubWF4SXRlbXMsIG1lLnN0b3JlLml0ZW1zLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgdmRvbSA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgdmlldyA9IG1lLmdldEl0ZW1zUm9vdCgpO1xuXG4gICAgICAgICAgICBpZiAobWUucmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBtZS5yZWZyZXNoSW1hZ2VSZWZsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5jbltpXS5zdHlsZS50cmFuc2Zvcm0gPSBtZS5nZXRJdGVtVHJhbnNmb3JtKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc20gPSBtZS5zZWxlY3Rpb25Nb2RlbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNtLmhhc1NlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWUub25TZWxlY3Rpb25DaGFuZ2Uoc20uaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2VsZWN0aW9uTW9kZWwgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOZW8uc2VsZWN0aW9uLk1vZGVsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLnNlbGVjdGlvbi5Nb2RlbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTZWxlY3Rpb25Nb2RlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHZhbHVlLnJlZ2lzdGVyKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBzdG9yZSBjb25maWcgZ2V0cyBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuU3RvcmV8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge05lby5kYXRhLlN0b3JlfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldFN0b3JlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgb2xkVmFsdWUuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9kbzogcmVtb3ZlIHRoZSBpZiBjaGVjayBvbmNlIGFsbCBkZW1vcyB1c2Ugc3RvcmVzIChpbnN0ZWFkIG9mIGNvbGxlY3Rpb25zKVxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBDbGFzc1N5c3RlbVV0aWwuYmVmb3JlU2V0SW5zdGFuY2UodmFsdWUsIFN0b3JlLCB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzICA6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZCA6IG1lLm9uU3RvcmVMb2FkLFxuICAgICAgICAgICAgICAgICAgICBzb3J0IDogbWUub25Tb3J0LFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBOZW8uY3JlYXRlKENvbGxlY3Rpb24sIHtcbiAgICAgICAgICAgIGtleVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgbGlzdGVuZXJzICA6IHtcbiAgICAgICAgICAgICAgICBzb3J0IDogbWUub25Tb3J0LFxuICAgICAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZnRlclNldFRyYW5zbGF0ZVgoKSB7dGhpcy5tb3ZlT3JpZ2luKCk7fVxuICAgIGFmdGVyU2V0VHJhbnNsYXRlWSgpIHt0aGlzLm1vdmVPcmlnaW4oKTt9XG4gICAgYWZ0ZXJTZXRUcmFuc2xhdGVaKCkge3RoaXMubW92ZU9yaWdpbigpO31cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgYmVmb3JlR2V0SXRlbVRwbCgpIHtcbiAgICAgICAgcmV0dXJuIE5lby5jbG9uZSh0aGlzLl9pdGVtVHBsLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBzZWxlY3Rpb25Nb2RlbCBjb25maWcgZ2V0cyBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7TmVvLnNlbGVjdGlvbi5Nb2RlbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge05lby5zZWxlY3Rpb24uTW9kZWx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldFNlbGVjdGlvbk1vZGVsKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBDbGFzc1N5c3RlbVV0aWwuYmVmb3JlU2V0SW5zdGFuY2UodmFsdWUsIEdhbGxlcnlNb2RlbCwge1xuICAgICAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uQ2hhbmdlOiB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICAgIDogdGhpc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBnZXQgZGlmZmVyZW50IGl0ZW0tbWFya3Vwc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2ZG9tSXRlbVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB2ZG9tSXRlbVxuICAgICAqL1xuICAgIGNyZWF0ZUl0ZW0odmRvbUl0ZW0sIHJlY29yZCwgaW5kZXgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpbWFnZVZkb20gPSB2ZG9tSXRlbS5jblswXS5jblswXTtcblxuICAgICAgICB2ZG9tSXRlbS5pZCA9IG1lLmdldEl0ZW1Wbm9kZUlkKHJlY29yZFttZS5rZXlQcm9wZXJ0eV0pO1xuXG4gICAgICAgIGltYWdlVmRvbS5zcmMgPSBOZW8uY29uZmlnLnJlc291cmNlc1BhdGggKyAnZXhhbXBsZXMvJyArIHJlY29yZC5pbWFnZTtcblxuICAgICAgICBpbWFnZVZkb20uc3R5bGUuaGVpZ2h0ID0gbWUuaW1hZ2VIZWlnaHQgKyAncHgnO1xuICAgICAgICBpbWFnZVZkb20uc3R5bGUud2lkdGggID0gbWUuaW1hZ2VXaWR0aCAgKyAncHgnO1xuXG4gICAgICAgIHJldHVybiB2ZG9tSXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0SW5kZXhdIHRoZSBzdGFydCBpbmRleCBmb3IgY3JlYXRpbmcgaXRlbXMsXG4gICAgICogZS5nLiBpbmNyZWFzaW5nIG1heEl0ZW1zIG9ubHkgbmVlZHMgdG8gY3JlYXRlIHRoZSBuZXcgb25lc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtcyhzdGFydEluZGV4KSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFtb3VudFJvd3MgICAgICAgPSBtZS5hbW91bnRSb3dzLFxuICAgICAgICAgICAgb3JkZXJCeVJvdyAgICAgICA9IG1lLm9yZGVyQnlSb3csXG4gICAgICAgICAgICBzZWNvbmRMYXN0Q29sdW1uID0gYW1vdW50Um93cyAtIDEsXG4gICAgICAgICAgICB2ZG9tICAgICAgICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGl0ZW1zUm9vdCAgICAgICAgPSBtZS5nZXRJdGVtc1Jvb3QoKSxcbiAgICAgICAgICAgIGkgICAgICAgICAgICAgICAgPSBzdGFydEluZGV4IHx8IDAsXG4gICAgICAgICAgICBsZW4gICAgICAgICAgICAgID0gTWF0aC5taW4obWUubWF4SXRlbXMsIG1lLnN0b3JlLml0ZW1zLmxlbmd0aCksXG4gICAgICAgICAgICBhbW91bnRDb2x1bW5zLCBpdGVtLCB2ZG9tSXRlbTtcblxuICAgICAgICBpZiAob3JkZXJCeVJvdykge1xuICAgICAgICAgICAgYW1vdW50Q29sdW1ucyA9IE1hdGguY2VpbChtZS5zdG9yZS5nZXRDb3VudCgpIC8gYW1vdW50Um93cyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtICAgICAgPSBtZS5zdG9yZS5pdGVtc1tpXTtcbiAgICAgICAgICAgIHZkb21JdGVtICA9IG1lLmNyZWF0ZUl0ZW0obWUuaXRlbVRwbCwgaXRlbSwgaSk7XG5cbiAgICAgICAgICAgIHZkb21JdGVtLiBzdHlsZSA9IHZkb21JdGVtLnN0eWxlIHx8IHt9O1xuXG4gICAgICAgICAgICB2ZG9tSXRlbS5zdHlsZVsndHJhbnNmb3JtJ10gPSBtZS5nZXRJdGVtVHJhbnNmb3JtKGkpO1xuXG4gICAgICAgICAgICBpZiAob3JkZXJCeVJvdykge1xuICAgICAgICAgICAgICAgIGlmIChpID49IHNlY29uZExhc3RDb2x1bW4gKiBhbW91bnRDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIE5lb0FycmF5LmFkZCh2ZG9tSXRlbS5jbHMsICduZW8tcmVmbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgJSBhbW91bnRSb3dzID09PSBzZWNvbmRMYXN0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIE5lb0FycmF5LmFkZCh2ZG9tSXRlbS5jbHMsICduZW8tcmVmbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbXNSb290LmNuLnB1c2godmRvbUl0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUucHJvbWlzZVZkb21VcGRhdGUodmRvbSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZVtpdGVtc01vdW50ZWRdID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0SW5kZXhdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFthbW91bnRJdGVtc11cbiAgICAgKi9cbiAgICBkZXN0cm95SXRlbXMoc3RhcnRJbmRleCwgYW1vdW50SXRlbXMpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY291bnRJdGVtcyAgID0gYW1vdW50SXRlbXMgfHwgbWUuc3RvcmUuZ2V0Q291bnQoKSxcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA9IG1lLnNlbGVjdGlvbk1vZGVsLml0ZW1zWzBdO1xuXG4gICAgICAgIG1lLmdldEl0ZW1zUm9vdCgpLmNuLnNwbGljZShzdGFydEluZGV4IHx8IDAsIGNvdW50SXRlbXMpO1xuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICBpZiAobWUuc2VsZWN0aW9uTW9kZWwuaGFzU2VsZWN0aW9uKCkgJiYgc2VsZWN0ZWRJdGVtID4gc3RhcnRJbmRleCAmJiBzZWxlY3RlZEl0ZW0gPCBzdGFydEluZGV4ICsgY291bnRJdGVtcykge1xuICAgICAgICAgICAgbWUuYWZ0ZXJTZXRNb3VudGVkKHRydWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge051bWJlcltdfVxuICAgICAqL1xuICAgIGdldENhbWVyYVRyYW5zZm9ybUZvckNlbGwoaW5kZXgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFtb3VudFJvd3MgID0gbWUuYW1vdW50Um93cyxcbiAgICAgICAgICAgIGltYWdlV2lkdGggID0gbWUuaW1hZ2VXaWR0aCxcbiAgICAgICAgICAgIGdhcCAgICAgICAgID0gMTAsXG4gICAgICAgICAgICBoZWlnaHQgICAgICA9IG1lLm9mZnNldEhlaWdodCAvIChhbW91bnRSb3dzICsgMiksXG4gICAgICAgICAgICBzcGFjaW5nICAgICA9IGhlaWdodCArIGdhcCxcbiAgICAgICAgICAgIHggICAgICAgICAgID0gTWF0aC5mbG9vcihpbmRleCAvIGFtb3VudFJvd3MpLFxuICAgICAgICAgICAgeSAgICAgICAgICAgPSBpbmRleCAtIHggKiBhbW91bnRSb3dzO1xuXG4gICAgICAgIGlmIChtZS5vcmRlckJ5Um93KSB7XG4gICAgICAgICAgICBsZXQgYW1vdW50Q29sdW1ucyA9IE1hdGguY2VpbChNYXRoLm1pbihtZS5tYXhJdGVtcywgbWUuc3RvcmUuZ2V0Q291bnQoKSkgLyBhbW91bnRSb3dzKTtcblxuICAgICAgICAgICAgeCA9IGluZGV4ICUgYW1vdW50Q29sdW1ucztcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKGluZGV4IC8gYW1vdW50Q29sdW1ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3ggPSB4ICogKGltYWdlV2lkdGggKyAxMCksXG4gICAgICAgICAgICBjeSA9ICh5ICsgMC41KSAqIHNwYWNpbmcgKiAxLjEgKyA1MDtcblxuICAgICAgICByZXR1cm4gWy1jeCwgLWN5LCAwXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2bm9kZUlkXG4gICAgICogQHJldHVybnMge051bWJlcn0gaXRlbUlkXG4gICAgICovXG4gICAgZ2V0SXRlbUlkKHZub2RlSWQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZub2RlSWQuc3BsaXQoJ19fJylbMV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZkb20gbm9kZSBjb250YWluaW5nIHRoZSBnYWxsZXJ5IGl0ZW1zXG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbVxuICAgICAqL1xuICAgIGdldEl0ZW1zUm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmRvbS5jblswXS5jblswXS5jblswXS5jblswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0SXRlbVRyYW5zZm9ybShpbmRleCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBhbW91bnRSb3dzID0gbWUuYW1vdW50Um93cyxcbiAgICAgICAgICAgIHgsIHk7XG5cbiAgICAgICAgaWYgKG1lLm9yZGVyQnlSb3cpIHtcbiAgICAgICAgICAgIGFtb3VudFJvd3MgPSBNYXRoLmNlaWwoTWF0aC5taW4obWUubWF4SXRlbXMsIG1lLnN0b3JlLmdldENvdW50KCkpIC8gYW1vdW50Um93cyk7XG5cbiAgICAgICAgICAgIHggPSBpbmRleCAlIGFtb3VudFJvd3M7XG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihpbmRleCAvIGFtb3VudFJvd3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoaW5kZXggLyBhbW91bnRSb3dzKTtcbiAgICAgICAgICAgIHkgPSBpbmRleCAlIGFtb3VudFJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUzZChcbiAgICAgICAgICAgIHggKiAobWUuaW1hZ2VXaWR0aCAgKyAxMCksXG4gICAgICAgICAgICB5ICogKG1lLmltYWdlSGVpZ2h0ICsgMTApICsgMTAwLFxuICAgICAgICAgICAgMFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJdGVtVm5vZGVJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfXycgKyBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG1vdmVPcmlnaW4oKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIHZkb20uY25bMF0uc3R5bGUudHJhbnNmb3JtID0gbWUudHJhbnNsYXRlM2QobWUudHJhbnNsYXRlWCwgbWUudHJhbnNsYXRlWSwgbWUudHJhbnNsYXRlWik7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmZpcmUoZGF0YS5pZCA9PT0gdGhpcy5pZCA/ICdjb250YWluZXJDbGljaycgOiAnaXRlbUNsaWNrJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTW91c2VXaGVlbChkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRlbHRhWCAgICAgPSBkYXRhLmRlbHRhWCxcbiAgICAgICAgICAgIGRlbHRhWSAgICAgPSBkYXRhLmRlbHRhWSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVggPSBtZS50cmFuc2xhdGVYLFxuICAgICAgICAgICAgdHJhbnNsYXRlWiA9IG1lLnRyYW5zbGF0ZVo7XG5cbiAgICAgICAgaWYgKG1lLm1vdXNlV2hlZWxFbmFibGVkKSB7XG4gICAgICAgICAgICBtZS5fdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZVggLSAoZGVsdGFYICogbWUubW91c2VXaGVlbERlbHRhWCk7IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIG1lLl90cmFuc2xhdGVaID0gdHJhbnNsYXRlWiArIChkZWx0YVkgKiBtZS5tb3VzZVdoZWVsRGVsdGFZKTsgLy8gc2lsZW50IHVwZGF0ZVxuXG4gICAgICAgICAgICBtZS5tb3ZlT3JpZ2luKCk7XG5cbiAgICAgICAgICAgIG1lLmZpcmUoJ2NoYW5nZVRyYW5zbGF0ZVgnLCBtZS5fdHJhbnNsYXRlWCk7XG4gICAgICAgICAgICBtZS5maXJlKCdjaGFuZ2VUcmFuc2xhdGVaJywgbWUuX3RyYW5zbGF0ZVopO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZVxuICAgICAqL1xuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpbmRleCAgICAgICAgICA9IG1lLnN0b3JlLmluZGV4T2YodmFsdWUgJiYgdmFsdWVbMF0gfHwgMCksXG4gICAgICAgICAgICBpbWFnZUhlaWdodCAgICA9IG1lLmltYWdlSGVpZ2h0LFxuICAgICAgICAgICAgaW1hZ2VXaWR0aCAgICAgPSBtZS5pbWFnZVdpZHRoLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgY2FtZXJhICAgICAgICAgPSB2ZG9tLmNuWzBdLmNuWzBdLFxuICAgICAgICAgICAgZG9sbHlUcmFuc2Zvcm0gPSBtZS5nZXRDYW1lcmFUcmFuc2Zvcm1Gb3JDZWxsKGluZGV4KSxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgID0gbWUub2Zmc2V0SGVpZ2h0IC8gKG1lLmFtb3VudFJvd3MgKyAyKSxcbiAgICAgICAgICAgIHdpZHRoICAgICAgICAgID0gTWF0aC5yb3VuZChoZWlnaHQgKiBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHQpLFxuICAgICAgICAgICAgc3BhY2luZyAgICAgICAgPSB3aWR0aCArIDEwLFxuICAgICAgICAgICAgdGltZW91dElkO1xuXG4gICAgICAgIG1lLnRyYW5zaXRpb25UaW1lb3V0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS50cmFuc2l0aW9uVGltZW91dHMuc3BsaWNlKDAsIG1lLnRyYW5zaXRpb25UaW1lb3V0cy5sZW5ndGgpO1xuXG4gICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3VwZGF0ZURvbScsXG4gICAgICAgICAgICBhcHBOYW1lOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgZGVsdGFzIDoge1xuICAgICAgICAgICAgICAgIGlkICAgOiBtZS5pZCArICdfXycgKyAnZG9sbHknLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogbWUudHJhbnNsYXRlM2QoLi4uZG9sbHlUcmFuc2Zvcm0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgICAgIGFjdGlvbiAgICA6ICdyZWFkRG9tJyxcbiAgICAgICAgICAgICAgICBhcHBOYW1lICAgOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIHZub2RlSWQgICA6IG1lLmlkLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9ucyA6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4gICAgICAgICAgICA6ICdnZXRDb21wdXRlZFN0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyAgICAgICAgOiBbbWUuaWQgKyAnX18nICsgJ2RvbGx5JywgbnVsbF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbUlzRG9tTm9kZTogW3RydWUsIGZhbHNlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICAgOiAnZGVmYXVsdFZpZXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuRm5OYW1lICA6ICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgICA6ICd0cmFuc2Zvcm0nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBkYXRhLmZ1bmN0aW9ucy50cmFuc2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVgsIGFuZ2xlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybS5pbmRleE9mKCdtYXRyaXgzZCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5zdWJzdHJpbmcoOSwgdHJhbnNmb3JtLmxlbmd0aCAtIDEpOyAvLyByZW1vdmUgbWF0cml4M2QoIC4uLiApXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5zcGxpdCgnLCcpLm1hcChlID0+IHBhcnNlRmxvYXQoZSkpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNmb3JtWzEyXTsgLy8gYm90dG9tIGxlZnQgZWxlbWVudCBvZiB0aGUgNHg0IG1hdHJpeFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5zdWJzdHJpbmcoNywgdHJhbnNmb3JtLmxlbmd0aCAtIDEpOyAvLyByZW1vdmUgbWF0cml4KCAuLi4gKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm0uc3BsaXQoJywnKS5tYXAoZSA9PiBwYXJzZUZsb2F0KGUpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zZm9ybVs0XTsgLy8gYm90dG9tIGxlZnQgZWxlbWVudCBvZiB0aGUgMngzIG1hdHJpeFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVYIC0gZG9sbHlUcmFuc2Zvcm1bMF07XG4gICAgICAgICAgICAgICAgYW5nbGUgICAgICA9IE1hdGgubWluKE1hdGgubWF4KHRyYW5zbGF0ZVggLyAoc3BhY2luZyAqIDMpLCAtMSksIDEpICogNDU7XG5cbiAgICAgICAgICAgICAgICBjYW1lcmEuc3R5bGUudHJhbnNmb3JtICAgICAgICAgID0gJ3JvdGF0ZVkoJyArIGFuZ2xlICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMzMwbXMnO1xuXG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKG1lLnRyYW5zaXRpb25UaW1lb3V0cywgdGltZW91dElkKTtcblxuICAgICAgICAgICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgICAgICAgICBjYW1lcmEuc3R5bGUudHJhbnNmb3JtICAgICAgICAgID0gJ3JvdGF0ZVkoMGRlZyknO1xuICAgICAgICAgICAgICAgICAgICBjYW1lcmEuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzUwMDBtcyc7XG5cbiAgICAgICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICAgICAgfSwgMzMwKTtcblxuICAgICAgICAgICAgICAgIG1lLnRyYW5zaXRpb25UaW1lb3V0cy5wdXNoKHRpbWVvdXRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblNvcnQoKSB7XG4gICAgICAgIGlmICh0aGlzW2l0ZW1zTW91bnRlZF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGhhc0NoYW5nZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGl0ZW1zICAgICA9IFsuLi5tZS5zdG9yZS5pdGVtcyB8fCBbXV0sXG4gICAgICAgICAgICAgICAgbmV3Q24gICAgID0gW10sXG4gICAgICAgICAgICAgICAgdmRvbSAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgICAgICB2aWV3ICAgICAgPSBtZS5nZXRJdGVtc1Jvb3QoKSxcbiAgICAgICAgICAgICAgICB2ZG9tTWFwICAgPSB2aWV3LmNuLm1hcChlID0+IGUuaWQpLFxuICAgICAgICAgICAgICAgIGZyb21JbmRleCwgdmRvbUlkO1xuXG4gICAgICAgICAgICBpdGVtcy5sZW5ndGggPSBNYXRoLm1pbihtZS5tYXhJdGVtcywgbWUuc3RvcmUuZ2V0Q291bnQoKSk7XG5cbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmRvbUlkICAgID0gbWUuZ2V0SXRlbVZub2RlSWQoaXRlbVttZS5rZXlQcm9wZXJ0eV0pO1xuICAgICAgICAgICAgICAgICAgICBmcm9tSW5kZXggPSB2ZG9tTWFwLmluZGV4T2YodmRvbUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBuZXdDbi5wdXNoKHZpZXcuY25bZnJvbUluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBmcm9tSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5jbiA9IG5ld0NuO1xuICAgICAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmFmdGVyU2V0T3JkZXJCeVJvdyhtZS5vcmRlckJ5Um93LCAhbWUub3JkZXJCeVJvdyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gICAgICovXG4gICAgb25TdG9yZUxvYWQoaXRlbXMpIHtcbiAgICAgICAgdGhpcy5nZXRJdGVtc1Jvb3QoKS5jbiA9IFtdOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgIHRoaXMuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJlZnJlc2hJbWFnZVJlZmxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFtb3VudFJvd3MgICAgICAgPSBtZS5hbW91bnRSb3dzLFxuICAgICAgICAgICAgb3JkZXJCeVJvdyAgICAgICA9IG1lLm9yZGVyQnlSb3csXG4gICAgICAgICAgICBzZWNvbmRMYXN0Q29sdW1uID0gYW1vdW50Um93cyAtIDEsXG4gICAgICAgICAgICB2ZG9tICAgICAgICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIHZpZXcgICAgICAgICAgICAgPSBtZS5nZXRJdGVtc1Jvb3QoKSxcbiAgICAgICAgICAgIGFtb3VudENvbHVtbnM7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlSb3cpIHtcbiAgICAgICAgICAgIGFtb3VudENvbHVtbnMgPSBNYXRoLmNlaWwoTWF0aC5taW4obWUubWF4SXRlbXMsIG1lLnN0b3JlLmdldENvdW50KCkpIC8gYW1vdW50Um93cyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3LmNuLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAob3JkZXJCeVJvdykge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5W2luZGV4ID49IHNlY29uZExhc3RDb2x1bW4gKiBhbW91bnRDb2x1bW5zID8gJ2FkZCcgOiAncmVtb3ZlJ10oaXRlbS5jbHMsICduZW8tcmVmbGVjdGlvbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBOZW9BcnJheVtpbmRleCAlIGFtb3VudFJvd3MgPT09IHNlY29uZExhc3RDb2x1bW4gICA/ICdhZGQnIDogJ3JlbW92ZSddKGl0ZW0uY2xzLCAnbmVvLXJlZmxlY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRyYW5zbGF0ZTNkKHgsIHksIHopIHtcbiAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsICcgKyB6ICsgJ3B4KSc7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhHYWxsZXJ5KTtcblxuZXhwb3J0IHtHYWxsZXJ5IGFzIGRlZmF1bHR9OyIsImltcG9ydCBTcGluRG93blRyaWdnZXIgICBmcm9tICcuL3RyaWdnZXIvU3BpbkRvd24ubWpzJztcbmltcG9ydCBTcGluVXBUcmlnZ2VyICAgICBmcm9tICcuL3RyaWdnZXIvU3BpblVwLm1qcyc7XG5pbXBvcnQgU3BpblVwRG93blRyaWdnZXIgZnJvbSAnLi90cmlnZ2VyL1NwaW5VcERvd24ubWpzJztcbmltcG9ydCBUZXh0ICAgICAgICAgICAgICBmcm9tICcuL1RleHQubWpzJztcblxuLyoqXG4gKiBVc2VzIGFuIGlucHV0IHR5cGUgbnVtYmVyIGFuZCBvcHRpb25hbGx5IHByb3ZpZGVzIGN1c3RvbSBzcGluIGJ1dHRvbnMgZm9yIHVwIGFuZCBkb3duXG4gKiBAY2xhc3MgTmVvLmZvcm0uZmllbGQuTnVtYmVyXG4gKiBAZXh0ZW5kcyBOZW8uZm9ybS5maWVsZC5UZXh0XG4gKi9cbmNsYXNzIE51bWJlciBleHRlbmRzIFRleHQge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3IgdHJpZ2dlclBvc2l0aW9uXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSB0cmlnZ2VyUG9zaXRpb25zPVsncmlnaHQnLCAnc2lkZXMnXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHRyaWdnZXJQb3NpdGlvbnM6IFsncmlnaHQnLCAnc2lkZXMnXVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQuTnVtYmVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC5OdW1iZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbnVtYmVyZmllbGQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbnVtYmVyZmllbGQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGNscz1bJ25lby1udW1iZXJmaWVsZCcsICduZW8tdGV4dGZpZWxkJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tbnVtYmVyZmllbGQnLCAnbmVvLXRleHRmaWVsZCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyW118bnVsbH0gZXhjbHVkZWQ9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZXhjbHVkZWRWYWx1ZXM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmYWxzZSBvbmx5IGFsbG93cyBjaGFuZ2luZyB0aGUgZmllbGQgdXNpbmcgdGhlIHNwaW4gYnV0dG9uc1xuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBpbnB1dEVkaXRhYmxlXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBpbnB1dEVkaXRhYmxlXzogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbHVlIGZvciB0aGUgaW5wdXRUeXBlXyB0ZXh0ZmllbGQgY29uZmlnXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gaW5wdXRUeXBlPSdudW1iZXInXG4gICAgICAgICAqL1xuICAgICAgICBpbnB1dFR5cGU6ICdudW1iZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSBtYXhWYWx1ZV89MTAwXG4gICAgICAgICAqL1xuICAgICAgICBtYXhWYWx1ZV86IDEwMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gbWluVmFsdWVfPTBcbiAgICAgICAgICovXG4gICAgICAgIG1pblZhbHVlXzogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gc3RlcFNpemVfPTFcbiAgICAgICAgICovXG4gICAgICAgIHN0ZXBTaXplXzogMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlczogJ3JpZ2h0JywgJ3NpZGVzJ1xuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHRyaWdnZXJQb3NpdGlvbj0ncmlnaHQnXG4gICAgICAgICAqL1xuICAgICAgICB0cmlnZ2VyUG9zaXRpb25fOiAncmlnaHQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gdXNlU3BpbkJ1dHRvbnNfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHVzZVNwaW5CdXR0b25zXzogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVHJpZ2dlcnMoKTtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaW5wdXRFZGl0YWJsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJbnB1dEVkaXRhYmxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGlucHV0RWwgPSBtZS5nZXRJbnB1dEVsKCksXG4gICAgICAgICAgICBzdHlsZSAgID0gaW5wdXRFbC5zdHlsZSB8fCB7fTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzdHlsZS5wb2ludGVyRXZlbnRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWF4VmFsdWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TWF4VmFsdWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSW5wdXRFbEtleSgnbWF4JywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWluVmFsdWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TWluVmFsdWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSW5wdXRFbEtleSgnbWluJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc3RlcFNpemUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U3RlcFNpemUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgdmFsID0gbWUudmFsdWUsXG4gICAgICAgICAgICBtb2R1bG87XG5cbiAgICAgICAgbWUuY2hhbmdlSW5wdXRFbEtleSgnc3RlcCcsIHZhbHVlKTtcblxuICAgICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtb2R1bG8gPSAodmFsIC0gbWUubWluVmFsdWUpICUgdmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChtb2R1bG8gIT09IDApIHsgLy8gZmluZCB0aGUgY2xvc2VzdCB2YWxpZCB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChtb2R1bG8gLyB2YWx1ZSA+IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAgICAgICh2YWwgKyB2YWx1ZSAtIG1vZHVsbyA8IG1lLm1heFZhbHVlKSB7bWUudmFsdWUgPSB2YWwgKyB2YWx1ZSAtIG1vZHVsbzt9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbCAtIG1vZHVsbyA+IG1lLm1pblZhbHVlKSAgICAgICAgIHttZS52YWx1ZSA9IHZhbCAtIG1vZHVsbzt9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgICAgICAodmFsIC0gbW9kdWxvID4gbWUubWluVmFsdWUpICAgICAgICAge21lLnZhbHVlID0gdmFsIC0gbW9kdWxvO31cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsICsgdmFsdWUgLSBtb2R1bG8gPCBtZS5tYXhWYWx1ZSkge21lLnZhbHVlID0gdmFsICsgdmFsdWUgLSBtb2R1bG87fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdHJpZ2dlclBvc2l0aW9uIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRyaWdnZXJQb3NpdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRyaWdnZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZVNwaW5CdXR0b25zIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlU3BpbkJ1dHRvbnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2xkVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmlnZ2VycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgdHJpZ2dlclBvc2l0aW9uIGNvbmZpZyBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0VHJpZ2dlclBvc2l0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iZWZvcmVTZXRFbnVtVmFsdWUodmFsdWUsIG9sZFZhbHVlLCAndHJpZ2dlclBvc2l0aW9uJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBvbklucHV0VmFsdWVDaGFuZ2UoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmFsdWUgICAgPSBkYXRhLnZhbHVlLFxuICAgICAgICAgICAgb2xkVmFsdWUgPSBtZS52YWx1ZTtcblxuICAgICAgICBpZiAoIXZhbHVlICYmICFtZS5yZXF1aXJlZCkge1xuICAgICAgICAgICAgc3VwZXIub25JbnB1dFZhbHVlQ2hhbmdlKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7IC8vIHRvZG86IHN1cHBvcnQgZm9yIG90aGVyIG51bWJlciB0eXBlc1xuXG4gICAgICAgICAgICBpZiAoIU5lby5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBtZS5fdmFsdWUgPSBvbGRWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAtIHZhbHVlICUgbWUuc3RlcFNpemU7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1heChtZS5taW5WYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5taW4obWUubWF4VmFsdWUsIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGRhdGEudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIHN1cGVyLm9uSW5wdXRWYWx1ZUNoYW5nZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblNwaW5CdXR0b25Eb3duQ2xpY2soKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvbGRWYWx1ZSA9IG1lLnZhbHVlIHx8IChtZS5tYXhWYWx1ZSArIG1lLnN0ZXBTaXplKSxcbiAgICAgICAgICAgIHZhbHVlICAgID0gTWF0aC5tYXgobWUubWluVmFsdWUsIG9sZFZhbHVlIC0gbWUuc3RlcFNpemUpO1xuXG4gICAgICAgIGlmIChtZS5leGNsdWRlZFZhbHVlcykge1xuICAgICAgICAgICAgd2hpbGUobWUuZXhjbHVkZWRWYWx1ZXMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1heChtZS5taW5WYWx1ZSwgdmFsdWUgLSBtZS5zdGVwU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBtZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uU3BpbkJ1dHRvblVwQ2xpY2soKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBvbGRWYWx1ZSA9IG1lLnZhbHVlIHx8IChtZS5taW5WYWx1ZSAtIG1lLnN0ZXBTaXplKSxcbiAgICAgICAgICAgIHZhbHVlICAgID0gTWF0aC5taW4obWUubWF4VmFsdWUsIG9sZFZhbHVlICsgbWUuc3RlcFNpemUpO1xuXG4gICAgICAgIGlmIChtZS5leGNsdWRlZFZhbHVlcykge1xuICAgICAgICAgICAgd2hpbGUobWUuZXhjbHVkZWRWYWx1ZXMuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihtZS5tYXhWYWx1ZSwgdmFsdWUgKyBtZS5zdGVwU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBtZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICB1cGRhdGVUcmlnZ2VycygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRyaWdnZXJzID0gbWUudHJpZ2dlcnMgfHwgW107XG5cbiAgICAgICAgaWYgKG1lLnVzZVNwaW5CdXR0b25zKSB7XG4gICAgICAgICAgICBpZiAobWUudHJpZ2dlclBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZS5oYXNUcmlnZ2VyKCdzcGludXBkb3duJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcnMucHVzaChTcGluVXBEb3duVHJpZ2dlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlVHJpZ2dlcignc3BpbmRvd24nLCB0cnVlLCB0cmlnZ2Vycyk7XG4gICAgICAgICAgICAgICAgbWUucmVtb3ZlVHJpZ2dlcignc3BpbnVwJywgICB0cnVlLCB0cmlnZ2Vycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghbWUuaGFzVHJpZ2dlcignc3BpbmRvd24nKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2Vycy5wdXNoKFNwaW5Eb3duVHJpZ2dlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtZS5oYXNUcmlnZ2VyKCdzcGludXAnKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2Vycy5wdXNoKFNwaW5VcFRyaWdnZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lLnJlbW92ZVRyaWdnZXIoJ3NwaW51cGRvd24nLCB0cnVlLCB0cmlnZ2Vycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVUcmlnZ2VyKCdzcGluZG93bicsICAgdHJ1ZSwgdHJpZ2dlcnMpO1xuICAgICAgICAgICAgbWUucmVtb3ZlVHJpZ2dlcignc3BpbnVwJywgICAgIHRydWUsIHRyaWdnZXJzKTtcbiAgICAgICAgICAgIG1lLnJlbW92ZVRyaWdnZXIoJ3NwaW51cGRvd24nLCB0cnVlLCB0cmlnZ2Vycyk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS50cmlnZ2VycyA9IHRyaWdnZXJzO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTnVtYmVyKTtcblxuZXhwb3J0IHtOdW1iZXIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IE51bWJlciBmcm9tICcuL051bWJlci5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZm9ybS5maWVsZC5SYW5nZVxuICogQGV4dGVuZHMgTmVvLmZvcm0uZmllbGQuTnVtYmVyXG4gKi9cbmNsYXNzIFJhbmdlIGV4dGVuZHMgTnVtYmVyIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQuUmFuZ2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5mb3JtLmZpZWxkLlJhbmdlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3JhbmdlZmllbGQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAncmFuZ2VmaWVsZCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIHNob3dzIGEgY2xlYXIgdHJpZ2dlciBpbiBjYXNlIHRoZSBmaWVsZCBoYXMgYSBub24gZW1wdHkgdmFsdWUuXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGNsZWFyYWJsZT1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tcmFuZ2VmaWVsZCcsJ25lby10ZXh0ZmllbGQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1yYW5nZWZpZWxkJywgJ25lby10ZXh0ZmllbGQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbHVlIGZvciB0aGUgaW5wdXRUeXBlXyB0ZXh0ZmllbGQgY29uZmlnXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gaW5wdXRUeXBlPSdyYW5nZSdcbiAgICAgICAgICovXG4gICAgICAgIGlucHV0VHlwZTogJ3JhbmdlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSB0aWNrbWFya3NfPVtdXG4gICAgICAgICAqL1xuICAgICAgICB0aWNrbWFya3NfOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHVzZUlucHV0RXZlbnQ9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHVzZUlucHV0RXZlbnQgOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBmaWVsZC5OdW1iZXIgYnV0dG9uc1xuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSB1c2VJbnB1dEV2ZW50PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB1c2VTcGluQnV0dG9uczogZmFsc2VcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnMsXG4gICAgICAgICAgICBpbnB1dEVsICAgICAgPSBtZS52ZG9tLmNuWzFdO1xuXG4gICAgICAgIGlmIChtZS51c2VJbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm4gICAgOiBtZS5vbklucHV0VmFsdWVDaGFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkICAgIDogbWUudmRvbS5jblsxXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dEVsLmNscyA9IFsnbmVvLXJhbmdlZmllbGQtaW5wdXQnXTsgLy8gcmVwbGFjZSBuZW8tdGV4dGZpZWxkLWlucHV0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0aWNrbWFya3MgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRpY2ttYXJrcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndXBkYXRlVGlja21hcmtzJyk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhSYW5nZSk7XG5cbmV4cG9ydCB7UmFuZ2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogRGVjcmVhc2VzIHRoZSB2YWx1ZSBvZiBhIE51bWJlckZpZWxkXG4gKiBAY2xhc3MgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5TcGluRG93blxuICogQGV4dGVuZHMgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlXG4gKi9cbmNsYXNzIFNwaW5Eb3duIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5mb3JtLmZpZWxkLnRyaWdnZXIuU3BpblVwJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLlNwaW5Eb3duJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyaWdnZXItc3BpbmRvd24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHJpZ2dlci1zcGluZG93bicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGFsaWduXz0nc3RhcnQnXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbjogJ3N0YXJ0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBpY29uQ2xzPSdmYSBmYS1jaGV2cm9uLWxlZnQnXG4gICAgICAgICAqL1xuICAgICAgICBpY29uQ2xzOiAnZmEgZmEtY2hldnJvbi1sZWZ0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsIGZsYWcgdXNlZCBieSBmaWVsZC5nZXRUcmlnZ2VyKClcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0eXBlPSdzcGluZG93bidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogJ3NwaW5kb3duJ1xuICAgIH19XG5cbiAgICBvblRyaWdnZXJDbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuZmllbGQub25TcGluQnV0dG9uRG93bkNsaWNrKCk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTcGluRG93bik7XG5cbmV4cG9ydCB7U3BpbkRvd24gYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSB2YWx1ZSBvZiBhIE51bWJlckZpZWxkXG4gKiBAY2xhc3MgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5TcGluVXBcbiAqIEBleHRlbmRzIE5lby5mb3JtLmZpZWxkLnRyaWdnZXIuQmFzZVxuICovXG5jbGFzcyBTcGluVXAgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQudHJpZ2dlci5TcGluVXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5mb3JtLmZpZWxkLnRyaWdnZXIuU3BpblVwJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyaWdnZXItc3BpbnVwJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RyaWdnZXItc3BpbnVwJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBpY29uQ2xzPSdmYSBmYS1jaGV2cm9uLXJpZ2h0J1xuICAgICAgICAgKi9cbiAgICAgICAgaWNvbkNsczogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZmxhZyB1c2VkIGJ5IGZpZWxkLmdldFRyaWdnZXIoKVxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHR5cGU9J3NwaW51cCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogJ3NwaW51cCdcbiAgICB9fVxuXG4gICAgb25UcmlnZ2VyQ2xpY2soZGF0YSkge1xuICAgICAgICB0aGlzLmZpZWxkLm9uU3BpbkJ1dHRvblVwQ2xpY2soKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFNwaW5VcCk7XG5cbmV4cG9ydCB7U3BpblVwIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIENvbWJpbmVzIHNwaW4gdXAgJiBkb3duIGluc2lkZSBvbmUgdHJpZ2dlclxuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLnRyaWdnZXIuU3BpblVwRG93blxuICogQGV4dGVuZHMgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlXG4gKi9cbmNsYXNzIFNwaW5VcERvd24gZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQudHJpZ2dlci5TcGluVXBEb3duJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLlNwaW5VcERvd24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndHJpZ2dlci1zcGludXBkb3duJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RyaWdnZXItc3BpbnVwZG93bicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLWZpZWxkLXRyaWdnZXInLCAnbmVvLXNwaW4tYnV0dG9ucyddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLWZpZWxkLXRyaWdnZXInLCAnbmVvLXNwaW4tYnV0dG9ucyddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBzcGluQnV0dG9uRG93bkljb25DbHM9J2ZhIGZhLWNoZXZyb24tZG93bidcbiAgICAgICAgICovXG4gICAgICAgIHNwaW5CdXR0b25Eb3duSWNvbkNsczogJ2ZhIGZhLWNoZXZyb24tZG93bicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHNwaW5CdXR0b25VcEljb25DbHM9J2ZhIGZhLWNoZXZyb24tdXAnXG4gICAgICAgICAqL1xuICAgICAgICBzcGluQnV0dG9uVXBJY29uQ2xzOiAnZmEgZmEtY2hldnJvbi11cCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHVzZWQgYnkgZmllbGQuZ2V0VHJpZ2dlcigpXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdHlwZT0nc3BpbnVwZG93bidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogJ3NwaW51cGRvd24nXG4gICAgfX1cblxuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIHZkb20uY24gPSBbXG4gICAgICAgICAgICB7Y2xzOiBbJ25lby1zcGluLWJ1dHRvbicsICduZW8tdXAnLCAgIG1lLnNwaW5CdXR0b25VcEljb25DbHNdfSxcbiAgICAgICAgICAgIHtjbHM6IFsnbmVvLXNwaW4tYnV0dG9uJywgJ25lby1kb3duJywgbWUuc3BpbkJ1dHRvbkRvd25JY29uQ2xzXX1cbiAgICAgICAgXTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG4gICAgfVxuXG4gICAgb25UcmlnZ2VyQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldCA9IGRhdGEucGF0aFswXSxcbiAgICAgICAgICAgIGNscyAgICA9IHRhcmdldC5jbHMuam9pbignICcpO1xuXG4gICAgICAgIGlmIChjbHMuaW5jbHVkZXMoJ25lby1kb3duJykpIHtcbiAgICAgICAgICAgIG1lLmZpZWxkLm9uU3BpbkJ1dHRvbkRvd25DbGljaygpO1xuICAgICAgICB9IGVsc2UgaWYgKGNscy5pbmNsdWRlcygnbmVvLXVwJykpIHtcbiAgICAgICAgICAgIG1lLmZpZWxkLm9uU3BpbkJ1dHRvblVwQ2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU3BpblVwRG93bik7XG5cbmV4cG9ydCB7U3BpblVwRG93biBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgTW9kZWwgICAgZnJvbSAnLi9Nb2RlbC5tanMnO1xuaW1wb3J0IE5lb0FycmF5IGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBBIHNlbGVjdGlvbiBtb2RlbCBpbnRlbmRlZCB0byB1c2UgZm9yIE5lby5jb21wb25lbnQuR2FsbGVyeVxuICogQGNsYXNzIE5lby5zZWxlY3Rpb24uR2FsbGVyeU1vZGVsXG4gKiBAZXh0ZW5kcyBOZW8uc2VsZWN0aW9uLk1vZGVsXG4gKi9cbmNsYXNzIEdhbGxlcnlNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnNlbGVjdGlvbi5HYWxsZXJ5TW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5zZWxlY3Rpb24uR2FsbGVyeU1vZGVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3NlbGVjdGlvbi1nYWxsZXJ5bW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnc2VsZWN0aW9uLWdhbGxlcnltb2RlbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIHRvIHN0YXkgaW4gdGhlIHNhbWUgY29sdW1uIHdoZW4gbmF2aWdhdGluZyB3aXRoIHRoZSB1cCBhbmQgZG93biBrZXlzLFxuICAgICAgICAgKiBvdGhlcndpc2UgeW91IHdpbGwgbmF2aWdhdGUgdG8gdGhlIG5leHQgLyBwcmV2IGNvbHVtbiB3aGVuIG1vdmluZyBvdXRcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc3RheUluUm93PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF5SW5Sb3c6IGZhbHNlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRvIG5vdCBhcHBseSBhIGRvbUxpc3RlbmVyXG4gICAgICovXG4gICAgYWRkRG9tTGlzdGVuZXIoKSB7fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmlldyAgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgb2xkSXRlbXMgPSBbLi4ubWUuaXRlbXNdLFxuICAgICAgICAgICAgZGVsdGFzICAgPSBbXTtcblxuICAgICAgICBtZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgZGVsdGFzLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkIDogdmlldy5nZXRJdGVtVm5vZGVJZChpdGVtKSxcbiAgICAgICAgICAgICAgICBjbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgYWRkICAgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlOiBbJ25lby1zZWxlY3RlZCddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLml0ZW1zLnNwbGljZSgwLCBtZS5pdGVtcy5sZW5ndGgpO1xuXG4gICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgYWN0aW9uIDogJ3VwZGF0ZURvbScsXG4gICAgICAgICAgICBhcHBOYW1lOiB2aWV3LmFwcE5hbWUsXG4gICAgICAgICAgICBkZWx0YXMgOiBkZWx0YXNcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZS5maXJlKCdzZWxlY3Rpb25DaGFuZ2UnLCBtZS5pdGVtcywgb2xkSXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25JdGVtQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgaSAgICA9IDAsXG4gICAgICAgICAgICBsZW4gID0gZGF0YS5wYXRoLmxlbmd0aCxcbiAgICAgICAgICAgIHZpZXcgPSB0aGlzLnZpZXcsXG4gICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGEucGF0aFtpXS5jbHMuaW5jbHVkZXMoJ25lby1nYWxsZXJ5LWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGtleSA9IHZpZXcuZ2V0SXRlbUlkKGRhdGEucGF0aFtpXS5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Qoa2V5KTtcblxuICAgICAgICAgICAgICAgIHZpZXcuZmlyZSgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICAgICAgICByZWNvcmQ6IHZpZXcuc3RvcmUuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uS2V5RG93bkRvd24oZGF0YSkge1xuICAgICAgICB0aGlzW3RoaXMudmlldy5vcmRlckJ5Um93ID8gJ29uTmF2S2V5Um93JyA6ICdvbk5hdktleUNvbHVtbiddKDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbktleURvd25MZWZ0KGRhdGEpIHtcbiAgICAgICAgdGhpc1t0aGlzLnZpZXcub3JkZXJCeVJvdyA/ICdvbk5hdktleUNvbHVtbicgOiAnb25OYXZLZXlSb3cnXSgtMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uS2V5RG93blJpZ2h0KGRhdGEpIHtcbiAgICAgICAgdGhpc1t0aGlzLnZpZXcub3JkZXJCeVJvdyA/ICdvbk5hdktleUNvbHVtbicgOiAnb25OYXZLZXlSb3cnXSgxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25LZXlEb3duVXAoZGF0YSkge1xuICAgICAgICB0aGlzW3RoaXMudmlldy5vcmRlckJ5Um93ID8gJ29uTmF2S2V5Um93JyA6ICdvbk5hdktleUNvbHVtbiddKC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwPTFcbiAgICAgKi9cbiAgICBvbk5hdktleUNvbHVtbihzdGVwPTEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2aWV3ICAgICAgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgc3RvcmUgICAgICAgID0gdmlldy5zdG9yZSxcbiAgICAgICAgICAgIHNlbGVjdGVkICAgICA9IG1lLml0ZW1zWzBdLFxuICAgICAgICAgICAgY291bnRSZWNvcmRzID0gc3RvcmUuZ2V0Q291bnQoKSxcbiAgICAgICAgICAgIGluZGV4LCByZWNvcmQ7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpbmRleCA9IHN0b3JlLmluZGV4T2Yoc2VsZWN0ZWQpICsgc3RlcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gY291bnRSZWNvcmRzIC0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSBjb3VudFJlY29yZHMpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29yZCA9IHN0b3JlLmdldEF0KGluZGV4KTtcblxuICAgICAgICBtZS5zZWxlY3QocmVjb3JkW3N0b3JlLmtleVByb3BlcnR5XSk7XG5cbiAgICAgICAgdmlldy5maXJlKCdzZWxlY3QnLCB7XG4gICAgICAgICAgICByZWNvcmQ6IHJlY29yZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwPTFcbiAgICAgKi9cbiAgICBvbk5hdktleVJvdyhzdGVwPTEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2aWV3ICAgICAgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgc3RvcmUgICAgICAgID0gdmlldy5zdG9yZSxcbiAgICAgICAgICAgIHNlbGVjdGVkICAgICA9IG1lLml0ZW1zWzBdLFxuICAgICAgICAgICAgY291bnRSZWNvcmRzID0gc3RvcmUuZ2V0Q291bnQoKSxcbiAgICAgICAgICAgIGFtb3VudFJvd3MgICA9IHZpZXcuYW1vdW50Um93cyxcbiAgICAgICAgICAgIHN0YXlJblJvdyAgICA9IG1lLnN0YXlJblJvdyxcbiAgICAgICAgICAgIGluZGV4LCByZWNvcmQ7XG5cbiAgICAgICAgaWYgKHZpZXcub3JkZXJCeVJvdykge1xuICAgICAgICAgICAgYW1vdW50Um93cyA9IE1hdGguY2VpbCh2aWV3LnN0b3JlLmdldENvdW50KCkgLyBhbW91bnRSb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0ZXAgKj0gYW1vdW50Um93cztcblxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGluZGV4ID0gc3RvcmUuaW5kZXhPZihzZWxlY3RlZCkgKyBzdGVwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgaWYgKCFzdGF5SW5Sb3cpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgKGNvdW50UmVjb3JkcyAtIGFtb3VudFJvd3MpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggKz0gYW1vdW50Um93cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSBjb3VudFJlY29yZHMpIHtcbiAgICAgICAgICAgIGlmICghc3RheUluUm93KSB7XG4gICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA+PSBhbW91bnRSb3dzKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggLT0gYW1vdW50Um93cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29yZCA9IHN0b3JlLmdldEF0KGluZGV4KTtcblxuICAgICAgICBtZS5zZWxlY3QocmVjb3JkW3N0b3JlLmtleVByb3BlcnR5XSk7XG5cbiAgICAgICAgdmlldy5maXJlKCdzZWxlY3QnLCB7XG4gICAgICAgICAgICByZWNvcmQ6IHJlY29yZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBjb21wb25lbnRcbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXIoY29tcG9uZW50KTtcblxuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBpZCAgID0gbWUuaWQsXG4gICAgICAgICAgICB2aWV3ID0gbWUudmlldztcblxuICAgICAgICB2aWV3Lm9uKHtcbiAgICAgICAgICAgIGNvbnRhaW5lckNsaWNrOiBtZS5vbkNvbnRhaW5lckNsaWNrLFxuICAgICAgICAgICAgaXRlbUNsaWNrICAgICA6IG1lLm9uSXRlbUNsaWNrLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh2aWV3LmtleXMpIHtcbiAgICAgICAgICAgIHZpZXcua2V5cy5fa2V5cy5wdXNoKFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkRvd24nICAsa2V5OiAnRG93bicgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkxlZnQnICAsa2V5OiAnTGVmdCcgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blJpZ2h0JyAsa2V5OiAnUmlnaHQnICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blVwJyAgICAsa2V5OiAnVXAnICAgICxzY29wZTogaWR9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaXRlbUlkXG4gICAgICovXG4gICAgc2VsZWN0KGl0ZW1JZCkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmlldyAgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgb2xkSXRlbXMgPSBbLi4ubWUuaXRlbXNdLFxuICAgICAgICAgICAgZGVsdGFzICAgPSBbXSxcbiAgICAgICAgICAgIHZub2RlSWQgID0gdmlldy5nZXRJdGVtVm5vZGVJZChpdGVtSWQpO1xuXG4gICAgICAgIGlmIChtZS5zaW5nbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIG1lLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IGl0ZW1JZCkge2NvbnNvbGUubG9nKGl0ZW0sIGl0ZW1JZClcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQgOiB2aWV3LmdldEl0ZW1Wbm9kZUlkKGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkICAgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IFsnbmVvLXNlbGVjdGVkJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLml0ZW1zLnNwbGljZSgwLCBtZS5pdGVtcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsdGFzLnB1c2goe1xuICAgICAgICAgICAgaWQgOiB2bm9kZUlkLFxuICAgICAgICAgICAgY2xzOiB7XG4gICAgICAgICAgICAgICAgYWRkOiBbJ25lby1zZWxlY3RlZCddXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE5lb0FycmF5WydhZGQnXShtZS5pdGVtcywgaXRlbUlkKTtcblxuICAgICAgICBpZiAoZGVsdGFzLmxlbmd0aCA+IDAgJiYgdmlldy5tb3VudGVkKSB7XG4gICAgICAgICAgICBOZW8uY3VycmVudFdvcmtlci5wcm9taXNlTWVzc2FnZSgnbWFpbicsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24gOiAndXBkYXRlRG9tJyxcbiAgICAgICAgICAgICAgICBhcHBOYW1lOiB2aWV3LmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgZGVsdGFzIDogZGVsdGFzXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5maXJlKCdzZWxlY3Rpb25DaGFuZ2UnLCBtZS5pdGVtcywgb2xkSXRlbXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlldy5tb3VudGVkKSB7XG4gICAgICAgICAgICBtZS5maXJlKCdzZWxlY3Rpb25DaGFuZ2UnLCBtZS5pdGVtcywgb2xkSXRlbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBpZCAgID0gbWUuaWQsXG4gICAgICAgICAgICB2aWV3ID0gbWUudmlldztcblxuICAgICAgICBpZiAodmlldy5rZXlzKSB7XG4gICAgICAgICAgICB2aWV3LmtleXMucmVtb3ZlS2V5cyhbXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duRG93bicgICxrZXk6ICdEb3duJyAgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duTGVmdCcgICxrZXk6ICdMZWZ0JyAgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duUmlnaHQnICxrZXk6ICdSaWdodCcgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duVXAnICAgICxrZXk6ICdVcCcgICAgLHNjb3BlOiBpZH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIudW5yZWdpc3RlcigpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoR2FsbGVyeU1vZGVsKTtcblxuZXhwb3J0IHtHYWxsZXJ5TW9kZWwgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==