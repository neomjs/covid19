self["webpackChunk"](["vendors~chunks/docs-app-mjs"],{

/***/ "./node_modules/neo.mjs/src/controller/Component.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/neo.mjs/src/controller/Component.mjs ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/controller/Base.mjs");
/* harmony import */ var _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../manager/Component.mjs */ "./node_modules/neo.mjs/src/manager/Component.mjs");
/* harmony import */ var _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../manager/DomEvent.mjs */ "./node_modules/neo.mjs/src/manager/DomEvent.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _util_Function_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Function.mjs */ "./node_modules/neo.mjs/src/util/Function.mjs");






/**
 * @class Neo.controller.Component
 * @extends Neo.controller.Base
 */
class Component extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.controller.Component'
         * @protected
         */
        className: 'Neo.controller.Component',
        /**
         * @member {String} ntype='view-controller'
         * @protected
         */
        ntype: 'component-controller',
        /**
         * @member {Object} references=null
         * @protected
         */
        references: null,
        /**
         * @member {Object} view_=null
         * @protected
         */
        view_: null
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        me.references = {};

        _util_Function_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createSequence(me.view, 'onConstructed', me.onViewConstructed, me);
    }

    /**
     * Triggered when accessing the view config
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    beforeGetView(value, oldValue) {
        return Neo.get(value);
    }

    /**
     * Triggered before the view config gets changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    beforeSetView(value, oldValue) {
        return value.id;
    }

    /**
     *
     * @param {String} [ntype]
     * @returns {Neo.controller.Component|null}
     */
    getParent(ntype) {
        let me      = this,
            view    = me.view,
            parents = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getParents(view),
            i       = 0,
            len     = parents.length,
            controller;

        for (; i < len; i++) {
            controller = parents[i].controller;

            if (controller) {
                if (ntype) {
                    if (ntype === controller.ntype) {
                        return controller;
                    }
                } else {
                    return controller;
                }
            }
        }

        return null;
    }

    /**
     *
     * @param {String} handlerName
     * @returns {Neo.controller.Component|null}
     */
    getParentHandlerScope(handlerName) {
        let me      = this,
            view    = me.view,
            parents = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getParents(view),
            i       = 0,
            len     = parents.length,
            controller;

        for (; i < len; i++) {
            controller = parents[i].controller;

            if (controller && controller[handlerName]) {
                return controller;
            }
        }

        return null;
    }

    /**
     * todo: cleanup no longer existing references
     * todo: update changed references (e.g. container.remove() then container.add() using the same key)
     * @param {String} name
     * @returns {*}
     */
    getReference(name) {
        let me          = this,
            componentId = me.references[name],
            component;

        if (componentId) {
            component = Neo.getComponent(componentId);
        }

        if (!component) {
            component = me.view.down({reference: name});

            if (component) {
                me.references[name] = component.id;
            }
        }

        return component || null;
    }

    /**
     *
     * @param {Neo.component.Base} view
     */
    onViewConstructed(view) {
        let me        = this,
            childCall = !!view,
            domListeners, eventHandler, fn, parentController;

        view = view || me.view;

        view.domListeners = Neo.clone(view.domListeners, true, true); // ensure there is no interference on prototype level
        domListeners = view.domListeners;

        if (domListeners) {
            if (!Array.isArray(domListeners)) {
                domListeners = [domListeners];
            }

            domListeners.forEach(domListener => {
                Object.entries(domListener).forEach(([key, value]) => {
                    eventHandler = null;

                    if (key !== 'scope' && key !== 'delegate') {
                        if (Neo.isString(value)) {
                            eventHandler = value;
                        } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                            eventHandler = value.fn;
                        }

                        if (eventHandler) {
                            if (!me[eventHandler]) {
                                parentController = me.getParentHandlerScope(eventHandler);

                                if (!parentController) {
                                    _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown domEvent handler for', view, eventHandler);
                                } else {
                                    fn               = parentController[eventHandler].bind(parentController);
                                    domListener[key] = fn;

                                    _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].updateListenerPlaceholder({
                                        componentId       : view.id,
                                        eventHandlerMethod: fn,
                                        eventHandlerName  : eventHandler,
                                        eventName         : key,
                                        scope             : parentController
                                    });
                                }
                            } else {
                                fn               = me[eventHandler].bind(me);
                                domListener[key] = fn;

                                _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].updateListenerPlaceholder({
                                    componentId       : view.id,
                                    eventHandlerMethod: fn,
                                    eventHandlerName  : eventHandler,
                                    eventName         : key,
                                    scope             : me
                                });
                            }
                        }
                    }
                });
            });
        }

        if (view.listeners) {
            Object.entries(view.listeners).forEach(([name, listener]) => {
                if (Array.isArray(listener)) {
                    listener.forEach(key => {
                        eventHandler = null;

                        if (Neo.isObject(key) && key.hasOwnProperty('fn') && Neo.isString(key.fn)) {
                            eventHandler = key.fn;

                            if (!me[eventHandler]) {
                                _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown event handler for', view, eventHandler);
                            } else {
                                key.fn = me[eventHandler].bind(me);
                            }
                        }
                    });
                }
            });
        }

        if (view.items) {
            view.items.forEach(item => {
                if (!item.controller) {
                    me.onViewConstructed(item);
                }
            });
        }

        if (!childCall) {
            me.onViewParsed();
        }
    }

    /**
     * Override this method inside your view controllers as a starting point in case you need references
     * (instead of using onConstructed() inside your controller)
     */
    onViewParsed() {

    }

    /**
     *
     * @param {Object} config
     */
    parseConfig(config) {
        let me           = this,
            view         = config || me.view,
            domListeners = view.domListeners,
            eventHandler;

        if (domListeners) {
            if (!Array.isArray(domListeners)) {
                domListeners = [domListeners];
            }

            domListeners.forEach(domListener => {
                Object.entries(domListener).forEach(([key, value]) => {
                    eventHandler = null;

                    if (key !== 'scope' && key !== 'delegate') {
                        if (Neo.isString(value)) {
                            eventHandler = value;
                        } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                            eventHandler = value.fn;
                        }

                        if (eventHandler) {
                            if (!me[eventHandler]) {
                                _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown domEvent handler for', view, eventHandler);
                            } else {console.log('#', key, me.id);
                                console.log('parseConfig', eventHandler);
                                domListener[key] = me[eventHandler].bind(me);
                            }
                        }
                    }
                });
            });
        }

        if (view.listeners) {
            Object.entries(view.listeners).forEach(([key, value]) => {
                eventHandler = null;

                if (key !== 'scope' && key !== 'delegate') {
                    if (Neo.isString(value)) {
                        eventHandler = value;
                    } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                        eventHandler = value.fn;
                    }

                    if (eventHandler) {
                        if (!me[eventHandler]) {
                            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown event handler for', view, eventHandler);
                        } else {
                            view.listeners[key] = me[eventHandler].bind(me);
                        }
                    }
                }
            });
        }

        if (view.headers) {
            view.headers.forEach(header => {
                if (!header.controller) {
                    me.parseConfig(header);
                }
            });
        }

        if (view.items) {
            view.items.forEach(item => {
                if (!item.controller) {
                    me.parseConfig(item);
                }
            });
        }
    }
}

Neo.applyClassConfig(Component);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Search.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Search.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _Text_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text.mjs */ "./node_modules/neo.mjs/src/form/field/Text.mjs");


/**
 * @class Neo.form.field.Search
 * @extends Neo.form.field.Text
 */
class Search extends _Text_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Search'
         * @protected
         */
        className: 'Neo.form.field.Search',
        /**
         * @member {String} ntype='searchfield'
         * @protected
         */
        ntype: 'searchfield',
        /**
         * @member {Array} cls=['neo-searchfield', 'neo-textfield']
         */
        cls: ['neo-searchfield', 'neo-textfield'],
        /**
         * Value for the hideLabel_ textfield config
         * @member {Boolean} hideLabel=true
         */
        hideLabel: true,
        /**
         * Value for the placeholderText_ textfield config
         * @member {String} placeholderText='Search'
         */
        placeholderText: 'Search',
    }}
}

Neo.applyClassConfig(Search);



/***/ }),

/***/ "./node_modules/neo.mjs/src/list/Base.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/list/Base.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _selection_ListModel_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../selection/ListModel.mjs */ "./node_modules/neo.mjs/src/selection/ListModel.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _data_Store_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");






/**
 * @class Neo.list.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.list.Base'
         * @protected
         */
        className: 'Neo.list.Base',
        /**
         * @member {String} ntype='list'
         * @protected
         */
        ntype: 'list',
        /**
         * True will destroy the used collection / store when the component gets destroyed
         * @member {Boolean} autoDestroyStore=true
         */
        autoDestroyStore: true,
        /**
         * @member {String[]} cls=['neo-list-container','neo-list']
         */
        cls: ['neo-list-container', 'neo-list'],
        /**
         * @member {Boolean} disableSelection_=false
         */
        disableSelection_: false,
        /**
         * @member {String} displayField='name'
         */
        displayField: 'name',
        /**
         * @member {Boolean} draggable_=false
         */
        draggable_: false,
        /**
         * @member {Neo.draggable.list.DragZone|null} dragZone=null
         */
        dragZone: null,
        /**
         * @member {Object} dragZoneConfig=null
         */
        dragZoneConfig: null,
        /**
         * @member {Boolean} highlightFilterValue=true
         */
        highlightFilterValue: true,
        /**
         * @member {String} itemCls='neo-list-item'
         */
        itemCls: 'neo-list-item',
        /**
         * Additional used keys for the selection model
         * @member {Object} keys
         */
        keys: {},
        /**
         * Either pass a selection.Model module, an instance or a config object
         * @member {Object|Neo.selection.Model} selectionModel_=null
         */
        selectionModel_: null,
        /**
         * Set this to true in case a select event should only update _vdom (e.g. when used inside a form.field.Select
         * @member {Boolean} silentSelect=false
         */
        silentSelect: false,
        /**
         * @member {Neo.data.Store|null} store_=null
         */
        store_: null,
        /**
         * True will add a checkbox in front of each list item
         * @member {Boolean} stacked_=true
         */
        useCheckBoxes_: false,
        /**
         * @member {Object} _vdom={tag:'ul',cn:[]}
         */
        _vdom: {
            tag: 'ul',
            cn : []
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push({
            click: {fn: me.onClick, scope: me}
        });

        me.domListeners = domListeners;
    }

    onConstructed() {
        super.onConstructed();

        let me = this;

        if (me.selectionModel) {
            me.selectionModel.register(me);
        }
    }

    /**
     * Triggered after the disableSelection config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDisableSelection(value, oldValue) {
        let me = this;

        if (value && me.rendered && me.selectionModel) {
            me.selectionModel.deselectAll();
        }
    }

    /**
     * Triggered after the draggable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDraggable(value, oldValue) {
        let me = this;

        if (value && !me.dragZone) {
            Promise.all(/*! import() | src/draggable/list/DragZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/list/DragZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/list/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs")).then(module => {
                me.dragZone = Neo.create({
                    module : module.default,
                    appName: me.appName,
                    owner  : me,
                    ...me.dragZoneConfig || {}
                });
            });
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
        }
    }

    /**
     * Triggered after the store config got changed
     * @param {Neo.data.Store} value
     * @param {Neo.data.Store} oldValue
     * @protected
     */
    afterSetStore(value, oldValue) {
        let me = this;

        if (value) {
            value.on({
                filter: me.onStoreFilter,
                load  : me.onStoreLoad,
                scope : me
            });

            if (value.getCount() > 0) {
                me.onStoreLoad();
            }
        }
    }

    /**
     * Triggered after the useCheckBoxes config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseCheckBoxes(value, oldValue) {
        let me  = this,
            cls = me.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][value ? 'add' : 'remove'](cls, 'neo-use-checkicons');
        me.cls = cls;
    }

    /**
     * Triggered before the selectionModel config gets changed.
     * @param {Neo.selection.Model} value
     * @param {Neo.selection.Model} oldValue
     * @returns {Neo.selection.Model}
     * @protected
     */
    beforeSetSelectionModel(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, _selection_ListModel_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetStore(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value);
    }

    /**
     * Override this method for custom list items
     * @param {Object} record
     * @returns {Object} The list item object
     */
    createItem(record) {
        let me          = this,
            itemContent = me.createItemContent(record);

        const item = {
            tag     : 'li',
            cls     : [me.itemCls],
            id      : me.getItemId(record[me.getKeyProperty()]),
            tabIndex: -1
        };

        item[typeof itemContent === 'string' ? 'html' : 'cn'] = itemContent;

        return item;
    }

    /**
     * Override this method for custom renderers
     * @param {Object} record
     * @returns {Object[]|String} Either an vdom cn array or a html string
     */
    createItemContent(record) {
        let me       = this,
            itemText = record[this.displayField],
            filter;

        if (me.highlightFilterValue) {
            filter = me.store.getFilter(me.displayField);

            if (filter && filter.value !== null && filter.value !== '') {
                itemText = itemText.replace(new RegExp(filter.value, 'gi'), function(match) {
                    return '<span class="neo-highlight-search">' + match + '</span>';
                });
            }
        }

        return itemText;
    }

    /**
     * @param {Boolean} [silent=false]
     */
    createItems(silent=false) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn = [];

        me.store.items.forEach(item => {
            vdom.cn.push(me.createItem(item));
        });

        if (silent) {
            me._vdom = vdom;
        } else {
            me.promiseVdomUpdate().then(() => {
                me.fire('createItems');
            });
        }
    }

    /**
     *
     */
    destroy() {
        let me = this;

        if (me.selectionModel) {
            me.selectionModel.destroy();
        }

        if (me.store && me.autoDestroyStore) {
            me.store.destroy();
        }

        super.destroy();
    }

    /**
     * Calls focus() on the top level DOM node of this component or on a given node via id
     * @param {String} [id]
     */
    focus(id) {
        super.focus(id);

        if (id) {
            // remote method access
            Neo.main.DomAccess.scrollIntoView({
                behavior: 'auto',
                id      : id || this.id
            });
        }
    }

    /**
     *
     * @param {Number|String} id
     * @returns {String}
     */
    getItemId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {String|Number} itemId
     */
    getItemRecordId(vnodeId) {
        let itemId   = vnodeId.split('__')[1],
            model    = this.store.model,
            keyField = model && model.getField(model.keyProperty);

        if (keyField && (keyField.type.toLowerCase() === 'integer' || keyField.type.toLowerCase() === 'number')) {
            itemId = parseInt(itemId);
        }

        return itemId;
    }

    /**
     * Support collections & stores
     * @returns {String}
     */
    getKeyProperty() {
        return this.store.keyProperty || this.store.model.keyProperty;
    }

    /**
     *
     * @param {Object} data
     */
    onClick(data) {
        let me = this;

        if (data.path[0].id === me.id) {
            me.onContainerClick(data);
        }  else if (data.path[0].cls.includes(me.itemCls)) {
            me.onItemClick(data);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onContainerClick(data) {
        /**
         * The containerClick event fires when a click occurs on the component, but not on a list item
         * @event containerClick
         * @param {String[]} cls the classList of the target node (converted to an array)
         * @param {String} id the target dom id
         * @param {String[]} path the event path
         * @returns {Object}
         */
        this.fire('containerClick', data);
    }

    /**
     *
     * @param {Object} data
     */
    onItemClick(data) {
        let me     = this,
            nodeId = data.path[0].id;

        if (!me.disableSelection && me.selectionModel) {
            me.selectionModel.select(nodeId);
        }

        /**
         * The itemClick event fires when a click occurs on a list item
         * @event itemClick
         * @param {String} id the record matching the list item
         * @returns {Object}
         */
        me.fire('itemClick', me.store.get(me.getItemRecordId(nodeId)));
    }

    /**
     *
     */
    onStoreFilter() {
        this.createItems();
    }

    /**
     *
     */
    onStoreLoad() {
        let me = this;

        if (!me.mounted && me.rendering) {
            const listenerId = me.on('rendered', () => {
                me.un('rendered', listenerId);
                me.createItems();
            });
        } else {
            me.createItems();
        }
    }

    /**
     * Convenience shortcut
     * @param {Number} index
     */
    selectItem(index) {
        let me = this;

        if (!me.disableSelection && me.selectionModel) {
            me.selectionModel.selectAt(index);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/selection/ListModel.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/selection/ListModel.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListModel; });
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/selection/Model.mjs");


/**
 * @class Neo.selection.ListModel
 * @extends Neo.selection.Model
 */
class ListModel extends _Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.selection.ListModel'
         * @protected
         */
        className: 'Neo.selection.ListModel',
        /**
         * @member {String} ntype='selection-listmodel'
         * @protected
         */
        ntype: 'selection-listmodel',
        /**
         * @member {Boolean} stayInList=true
         */
        stayInList: true
    }}

    /**
     *
     * @param {Object} data
     */
    onKeyDownDown(data) {
        if (!this.view.disableSelection) {
            this.onNavKey(data, 1);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownLeft(data) {
        this.onKeyDownUp(data);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownRight(data) {
        this.onKeyDownDown(data);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownUp(data) {
        if (!this.view.disableSelection) {
            this.onNavKey(data, -1);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Number} step
     */
    onNavKey(data, step) {
        let me               = this,
            item             = data.path[0],
            view             = me.view,
            store            = view.store,
            maxItems         = store.getCount(),
            preventSelection = false,
            index, itemId, record, recordId;

        if (item.cls.includes(view.itemCls)) {
            recordId = view.getItemRecordId(item.id);
            index    = store.indexOf(recordId) + step;

            if (index < 0) {
                if (me.stayInList) {
                    index = maxItems - 1;
                } else {
                    preventSelection = true;
                    view.fire('selectPreFirstItem');
                }
            } else if (index >= maxItems) {
                if (me.stayInList) {
                    index = 0;
                } else {
                    preventSelection = true;
                    view.fire('selectPostLastItem');
                }
            }
        } else {
            index = 0;
        }

        if (!preventSelection) {
            record = store.getAt(index);
            itemId = view.getItemId(record[me.view.getKeyProperty()]);

            me.select(itemId);
            view.focus(itemId);
            view.fire('itemNavigate', record);
        } else {
            me.deselectAll();
        }
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
     * @param {Number} index
     */
    selectAt(index) {
        let view      = this.view,
            recordKey = view.store.getKeyAt(index),
            itemId    = recordKey && view.getItemId(recordKey);

        if (itemId) {
            this.select(itemId);
            view.focus(itemId);
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

Neo.applyClassConfig(ListModel);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tab/Container.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/tab/Container.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Container; });
/* harmony import */ var _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _header_Button_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/Button.mjs */ "./node_modules/neo.mjs/src/tab/header/Button.mjs");
/* harmony import */ var _header_Toolbar_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/Toolbar.mjs */ "./node_modules/neo.mjs/src/tab/header/Toolbar.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _Strip_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Strip.mjs */ "./node_modules/neo.mjs/src/tab/Strip.mjs");






/**
 * @class Neo.tab.Container
 * @extends Neo.container.Base
 */
class Container extends _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for tabBarPosition
         * @member {String[]} tabBarPositions=['top', 'right', 'bottom', 'left']
         * @protected
         * @static
         */
        tabBarPositions: ['top', 'right', 'bottom', 'left']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.tab.Container'
         * @protected
         */
        className: 'Neo.tab.Container',
        /**
         * @member {String} ntype='tab-container'
         * @protected
         */
        ntype: 'tab-container',
        /**
         * @member {Number} activeIndex_=0
         */
        activeIndex_: 0,
        /**
         * True will activate a tab which gets dynamically inserted / added after the TabContainer is mounted
         * @member {Boolean} activateInsertedTabs=false
         */
        activateInsertedTabs: false,
        /**
         * @member {String} baseCls='neo-tab-container'
         */
        baseCls: 'neo-tab-container',
        /**
         * @member {String|null} [cardContainerId]=null
         */
        cardContainerId: null,
        /**
         * adds baseCls + '-plain' is case plain is set to true
         * @member {String[]} cls=['neo-tab-container'],
         * @protected
         */
        cls: ['neo-tab-container'],
        /**
         * Default configs for the tab.Strip
         * @member {Object|null} [contentContainerDefaults]=null
         */
        contentContainerDefaults: null,
        /**
         * Default configs for the tab.HeaderToolbar
         * @member {Object|null} [headerToolbarDefaults]=null
         */
        headerToolbarDefaults: null,
        /**
         * True to not apply a background effect to the tab header container
         * @member {Boolean} plain_=true
         */
        plain_: true,
        /*
         * Remove the DOM of inactive cards (TabContainer Body).
         * This will keep the instances & vdom trees
         * @member {Boolean} removeInactiveCards=true
         */
        removeInactiveCards: true,
        /**
         * true enables sorting tabs via drag&drop.
         * The config gets passed to the header toolbar
         * @member {Boolean} sortable_=false
         */
        sortable_: false,
        /**
         * @member {String|null} tabBarId=null
         */
        tabBarId: null,
        /**
         * Default configs for the tab.Strip
         * @member {Object|null} [tabStripDefaults]=null
         */
        tabStripDefaults: null,
        /**
         * @member {String|null} [tabStripId]=null
         */
        tabStripId: null,
        /**
         * The position of the tab header toolbar.
         * Valid values are top, right, bottom, left.
         * @member {String} tabBarPosition_='top'
         */
        tabBarPosition_: 'top',
        /**
         * @member {Boolean} useActiveTabIndicator_=true
         */
        useActiveTabIndicator_: true
    }}

    /**
     *
     */
    onConstructed() {
        this._layout = this.getLayoutConfig(); // silent update
        super.onConstructed();
    }

    /**
     * Adds one or multiple tabs at the end of the header
     * @param {Object|Array} item
     * @returns {Neo.component.Base|Neo.component.Base[]}
     */
    add(item) {
        return this.insert(this.getTabBar().items.length, item);
    }

    /**
     * Triggered after the activeIndex config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetActiveIndex(value, oldValue) {
        if (oldValue !== undefined) {
            let me            = this,
                cardContainer = Neo.getComponent(me.cardContainerId);

            if (cardContainer && value > -1) {
                me.updateTabButtons();

                cardContainer.layout.activeIndex = value;

                me.fire('activeIndexChange', {
                    oldValue: oldValue,
                    value   : value
                });
            }
        }
    }

    /**
     * Triggered after the plain config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetPlain(value, oldValue) {
        let me      = this,
            baseCls = me.baseCls,
            cls     = me.cls || [];

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][value ? 'unshift' : 'remove'](cls, baseCls + '-plain');
        me.cls = cls;
    }

    /**
     * Triggered after the sortable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetSortable(value, oldValue) {
        if (oldValue !== undefined) {
            this.getTabBar().sortable = value;
        }
    }

    /**
     * Triggered after the tabBarPosition config got changed
     * @param {String} value 'top', 'right', 'bottom', 'left'
     * @param {String} oldValue 'top', 'right', 'bottom', 'left'
     * @protected
     */
    afterSetTabBarPosition(value, oldValue) {
        let me  = this,
            cls = me.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(cls, 'neo-' + oldValue);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].add(cls, 'neo-' + value);
        me.cls = cls;

        if (me.rendered) {
            me.layout = me.getLayoutConfig();
            me.getTabBar().dock = value;
            me.getTabStrip().cls = ['neo-tab-strip',  'neo-dock-' + value];

            me.fire('tabBarPositionChange', {
                component: me,
                oldValue : oldValue,
                value    : value
            });
        }
    }

    /**
     * Triggered after the useActiveTabIndicator config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseActiveTabIndicator(value, oldValue) {
        if (oldValue !== undefined) {
            this.getTabBar()  .useActiveTabIndicator = value;
            this.getTabStrip().useActiveTabIndicator = value;
        }
    }

    /**
     * Triggered before the tabBarPosition config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     * @returns {String} value
     */
    beforeSetTabBarPosition(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'tabBarPosition');
    }

    /**
     *
     * @protected
     */
    createItems() {
        let me            = this,
            items         = me.items || [],
            tabButtons    = [],
            tabComponents = [];

        Object.assign(me, {
            cardContainerId: me.cardContainerId || Neo.getId('container'),
            tabBarId       : me.tabBarId        || Neo.getId('tab-header-toolbar'),
            tabStripId     : me.tabStripId      || Neo.getId('tab-strip')
        });

        items.forEach((item, index) => {
            tabButtons.push(me.getTabButtonConfig(item.tabButtonConfig, index));

            if (!(item instanceof Neo.component.Base)) {
                item = {...me.itemDefaults, flex: 1, isTab:true, ...item};
            }

            tabComponents.push(item);
        });

        me.items = [{
            module               : _header_Toolbar_mjs__WEBPACK_IMPORTED_MODULE_2__["default"],
            dock                 : me.tabBarPosition,
            flex                 : 'none',
            id                   : me.tabBarId,
            items                : tabButtons,
            sortable             : me.sortable,
            useActiveTabIndicator: me.useActiveTabIndicator,
            ...me.headerToolbarDefaults || {}
        }, {
            module               : _Strip_mjs__WEBPACK_IMPORTED_MODULE_4__["default"],
            cls                  : ['neo-tab-strip', 'neo-dock-' + me.tabBarPosition],
            flex                 : 'none',
            id                   : me.tabStripId,
            tabContainerId       : me.id,
            useActiveTabIndicator: me.useActiveTabIndicator,
            ...me.tabStripDefaults || {}
        }, {
            ntype                : 'container',
            cls                  : ['neo-container', 'neo-tab-content-container'],
            id                   : me.cardContainerId,
            itemDefaults         : me.itemDefaults,
            items                : tabComponents,
            layout               : {ntype: 'card', activeIndex: me.activeIndex, removeInactiveCards: me.removeInactiveCards},
            useActiveTabIndicator: me.useActiveTabIndicator,
            ...me.contentContainerDefaults || {}
        }];

        me.itemDefaults = null;

        super.createItems();
    }

    /**
     * Returns the card matching this.activeIndex
     * @returns {Neo.component.Base|null}
     */
    getActiveCard() {
        return this.getCardContainer().items[this.activeIndex] || null;
    }

    /**
     * Returns a card by a given index
     * @param {Number} index
     * @returns {Neo.component.Base|null}
     */
    getCard(index) {
        return this.getCardContainer().items[index] || null;
    }

    /**
     * @returns {Neo.container.Base}
     */
    getCardContainer() {
        return Neo.getComponent(this.cardContainerId);
    }

    /**
     * Returns the amount of items inside the tab header toolbar
     * @returns {Number}
     */
    getCount() {
        return this.getTabBar().items.length;
    }

    /**
     *
     * @returns {Object} layoutConfig
     * @protected
     */
    getLayoutConfig() {
        let me           = this,
            layoutConfig = null;

        switch(me.tabBarPosition) {
            case 'bottom':
                layoutConfig = {
                    ntype    : 'vbox',
                    align    : 'stretch',
                    direction: 'column-reverse',
                    pack     : 'start'
                };
                break;
            case 'left':
                layoutConfig = {
                    ntype    : 'hbox',
                    align    : 'stretch',
                    direction: 'row',
                    pack     : 'start'
                };
                break;
            case 'right':
                layoutConfig = {
                    ntype    : 'hbox',
                    align    : 'stretch',
                    direction: 'row-reverse',
                    pack     : 'start'
                };
                break;
            case 'top':
                layoutConfig = {
                    ntype: 'vbox',
                    align: 'stretch'
                };
                break;
        }

        return layoutConfig;
    }

    /**
     *
     * @param {Number} index
     * @returns {Neo.tab.header.Button|null}
     */
    getTabAtIndex(index) {
        return this.getTabBar().items[index] || null;
    }

    /**
     * @returns {Neo.container.Toolbar}
     */
    getTabBar() {
        return Neo.getComponent(this.tabBarId);
    }

    /**
     *
     * @param {Object} config
     * @param {Number} index
     * @returns {Object} The merged config
     * @protected
     */
    getTabButtonConfig(config, index) {
        let me = this,
            defaultConfig = {
                module : _header_Button_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
                flex   : 'none',
                index  : index,
                pressed: me.activeIndex === index,

                domListeners: [{
                    click: function(data) {
                        me.activeIndex = data.component.index;
                    },
                    scope: me
                }]
            };

        return {...defaultConfig, ...config};
    }

    /**
     * @returns {Neo.tab.Strip}
     */
    getTabStrip() {
        return Neo.getComponent(this.tabStripId);
    }

    /**
     * Inserts an item or array of items at a specific index
     * @param {Number} index
     * @param {Object|Object[]} item
     * @returns {Neo.component.Base|Neo.component.Base[]}
     */
    insert(index, item) {
        let me            = this,
            cardContainer = me.getCardContainer(),
            tabBar        = me.getTabBar(),
            hasItem       = false,
            i, len, superItem, tab, tabButtonConfig;

        if (Array.isArray(item)) {
            i   = 0;
            len = item.length;

            for (; i < len; i++) {
                // todo: render is async, ensure the order of items is correct

                // insert the array backwards
                item[i] = me.insert(item[len - 1], index);
            }
        } else if (typeof item === 'object') {
            i   = 0;
            len = cardContainer.items.length;

            for (; i < len; i++) {
                if (cardContainer.items[i].id === item.id) {
                    hasItem   = true;
                    superItem = cardContainer.items[i];
                    me.activeIndex = i;
                    break;
                }
            }
        }

        if (!hasItem) {
            tabButtonConfig = item.tabButtonConfig;

            tab = tabBar.insert(index, me.getTabButtonConfig(tabButtonConfig, index));

            // todo: non index based matching of tab buttons and cards
            i   = 0;
            len = tabBar.items.length;

            for (; i < len; i++) {
                tabBar.items[i].index = i;

            }

            item.flex = 1;
            superItem = cardContainer.insert(index, item);

            if (me.activateInsertedTabs) {
                if (!me.vnode) {
                    me.activeIndex = index;
                } else {
                    tab.on('mounted', me.onTabButtonMounted, me);
                }
            }
        }

        return superItem
    }

    /**
     * Moves an existing item to a new index
     * @param {Number} fromIndex
     * @param {Number} toIndex
     * @returns {Neo.component.Base} the card item
     */
    moveTo(fromIndex, toIndex) {
        let me            = this,
            cardContainer = me.getCardContainer(),
            tabBar        = me.getTabBar(),
            activeTab     = tabBar.items[me.activeIndex],
            index, returnValue;

        tabBar.moveTo(fromIndex, toIndex);
        index = activeTab.index;

        if (index !== me.activeIndex) {
            // silent updates
            me._activeIndex = index;
            cardContainer.layout._activeIndex = index;
        }

        returnValue = cardContainer.moveTo(fromIndex, toIndex);

        me.fire('moveTo', {
            fromIndex: fromIndex,
            toIndex  : toIndex
        });

        return returnValue;
    }

    /**
     * Gets triggered once a dynamically added header.Button gets mounted
     * in case activateInsertedTabs is set to true
     * @param {String} buttonId
     * @protected
     */
    onTabButtonMounted(buttonId) {
        let me            = this,
            cardContainer = me.getCardContainer(),
            tabBar        = me.getTabBar(),
            i             = 0,
            len           = tabBar.items.length,
            index         = -1,
            card, listenerId;

        for (; i < len; i++) {
            if (tabBar.items[i].id === buttonId) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            card = cardContainer.items[index];

            if (me.vnode && !card.mounted) {
                listenerId = card.on('mounted', () => {
                    card.un('mounted', listenerId);
                    me.activeIndex = index;
                });
            } else {
                me.activeIndex = index;
            }
        }
    }

    /**
     * Removes a container item by reference
     * @param {Neo.component.Base} component
     * @param {Boolean} [destroyItem=true]
     * @param {Boolean} [silent=false]
     */
    remove(component, destroyItem=true, silent=false) {
        let items = [...this.getCardContainer().items],
            i     = 0,
            len   = items.length;

        for (; i < len; i++) {
            if (items[i].id === component.id) {
                this.removeAt(i, destroyItem, silent);
            }
        }
    }

    /**
     *
     * @param {Number} index
     * @param {Boolean} [destroyItem=true]
     * @param {Boolean} [silent=false]
     */
    removeAt(index, destroyItem=true, silent=false) {
        let me            = this,
            activeIndex   = me.activeIndex,
            cardContainer = me.getCardContainer(),
            tabBar        = me.getTabBar(),
            i, len;

        cardContainer.removeAt(index, destroyItem, silent);
        tabBar       .removeAt(index, true,        false);

        if (index < activeIndex) {
            // silent updates
            me._activeIndex = activeIndex - 1;
            cardContainer.layout._activeIndex = activeIndex - 1;
        } else if (index === activeIndex) {
            me.activeIndex = activeIndex - 1;
        }

        // todo: non index based matching of tab buttons and cards
        i   = 0;
        len = tabBar.items.length;

        for (; i < len; i++) {
            tabBar.items[i].index = i;
        }
    }

    /**
     *
     * @protected
     */
    updateTabButtons() {
        let me          = this,
            activeIndex = me.activeIndex,
            tabButtons  = me.getTabBar().items || [];

        tabButtons.forEach((item, index) => {
            item.pressed = index === activeIndex;
        });
    }
}

Neo.applyClassConfig(Container);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tab/Strip.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/tab/Strip.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Strip; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * @class Neo.tab.Strip
 * @extends Neo.component.Base
 */
class Strip extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tab.Strip'
         * @protected
         */
        className: 'Neo.tab.Strip',
        /**
         * @member {String} ntype='tab-strip'
         * @protected
         */
        ntype: 'tab-strip',
        /**
         * @member {Array} cls=['neo-tab-strip']
         */
        cls: ['neo-tab-strip'],
        /**
         * @member {String|null} tabContainerId=null
         */
        tabContainerId: null,
        /**
         * @member {Boolean} useActiveTabIndicator_=true
         */
        useActiveTabIndicator_: true,
        /**
         * @member {Object} _vdom={cn: [{cls: 'neo-active-tab-indicator'}]}
         */
        _vdom: {
            cn: [{
                cls: ['neo-active-tab-indicator']
            }]
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        me.getTabContainer().on({
            activeIndexChange: me.getActiveTabRectThenMove,
            scope            : me
        });
    }

    /**
     * Triggered after the useActiveTabIndicator config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseActiveTabIndicator(value, oldValue) {
        if (oldValue !== undefined) {
            let me   = this,
                vdom = me.vdom;

            vdom.cn[0].removeDom = !value;

            if (me.mounted && value) {
                me._vdom = vdom; // silent update
                me.getActiveTabRectThenMove();
            } else {
                me.vdom = vdom;
            }
        }
    }

    /**
     * @param {Object|null} opts
     * @param {Number} opts.oldValue
     * @param {Number} opts.value
     * Gets the DomRect of the active tab, then moves the indicator
     */
    getActiveTabRectThenMove(opts) {
        let me           = this,
            ids          = [],
            tabContainer = me.getTabContainer();

        if (me.vnode) {
            if (opts) {
                ids.push(tabContainer.getTabAtIndex(opts.value), tabContainer.getTabAtIndex(opts.oldValue));
            } else {
                ids.push(tabContainer.getTabAtIndex(tabContainer.activeIndex));
            }

            ids = ids.map(e => e && e.id).filter(Boolean);

            if (me.useActiveTabIndicator) {
                Neo.main.DomAccess.getBoundingClientRect({
                    id: ids
                }).then(data => {
                    me.moveActiveIndicator(data);
                });
            }
        }
    }

    /**
     *
     */
    getTabContainer() {
        return Neo.getComponent(this.tabContainerId);
    }

    /**
     * Can either contain the new target rect or the new and old one
     * @param {Object[]} rects
     * @param {Number} rects[0].bottom
     * @param {Number} rects[0].height
     * @param {Number} rects[0].left
     * @param {Number} rects[0].right
     * @param {Number} rects[0].top
     * @param {Number} rects[0].width
     * @param {Number} rects[0].x
     * @param {Number} rects[0].y
     */
    moveActiveIndicator(rects) {
        let me   = this,
            rect = rects[1] || rects[0],
            activeTabIndicator, tabContainer, vdom;

        if (me.useActiveTabIndicator) {
            vdom               = me.vdom;
            activeTabIndicator = vdom.cn[0];
            tabContainer       = me.getTabContainer();

            switch (tabContainer.tabBarPosition) {
                case 'bottom':
                case 'top':
                    activeTabIndicator.style = {
                        height: null,
                        left  : `${rect.left}px`,
                        top   : null,
                        width : `${rect.width}px`
                    };
                    break;
                case 'left':
                case 'right':
                    activeTabIndicator.style = {
                        height: `${rect.height}px`,
                        left  : null,
                        top   : `${rect.top}px`,
                        width : null
                    };
                    break;
            }

            // in case there is a dynamic change (oldValue), call this method again
            if (rects[1]) {
                activeTabIndicator.style.opacity = 0;
                me.vdom = vdom;

                setTimeout(() => {
                    me.moveActiveIndicator([rects[0]]);
                }, 50)
            } else {
                activeTabIndicator.style.opacity = 1;
                me.vdom = vdom;

                setTimeout(() => {
                    activeTabIndicator.style.opacity = 0;
                    me.vdom = vdom;
                }, 300);
            }
        }
    }
}

Neo.applyClassConfig(Strip);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tab/header/Button.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/tab/header/Button.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _button_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../button/Base.mjs */ "./node_modules/neo.mjs/src/button/Base.mjs");


/**
 * @class Neo.tab.header.Button
 * @extends Neo.button.Base
 */
class Button extends _button_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tab.header.Button'
         * @protected
         */
        className: 'Neo.tab.header.Button',
        /**
         * @member {String} ntype='tab-header-button'
         * @protected
         */
        ntype: 'tab-header-button',
        /**
         * @member {Array} cls=['neo-button', 'neo-tab-button']
         */
        cls: ['neo-tab-header-button', 'neo-button'],
        /**
         * @member {Boolean} useActiveTabIndicator_=true
         */
        useActiveTabIndicator_: true,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            tag: 'button',
            cn : [{
                tag: 'span',
                cls: ['neo-button-glyph']
            }, {
                tag: 'span',
                cls: ['neo-button-text']
            }, {
                cls: ['neo-tab-button-indicator']
            }]
        }
    }}

    /**
     * Triggered after the useActiveTabIndicator config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseActiveTabIndicator(value, oldValue) {
        this.updateUseActiveTabIndicator();
    }

    /**
     *
     * @param {Boolean} [silent=false]
     */
    updateUseActiveTabIndicator(silent=false) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[2].removeDom = !me.useActiveTabIndicator;

        me[silent ? '_vdom' : 'vdom'] = vdom;
    }
}

Neo.applyClassConfig(Button);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tab/header/Toolbar.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/tab/header/Toolbar.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Toolbar; });
/* harmony import */ var _container_Toolbar_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../container/Toolbar.mjs */ "./node_modules/neo.mjs/src/container/Toolbar.mjs");


/**
 * @class Neo.tab.header.Toolbar
 * @extends Neo.container.Toolbar
 */
class Toolbar extends _container_Toolbar_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tab.header.Toolbar'
         * @protected
         */
        className: 'Neo.tab.header.Toolbar',
        /**
         * @member {String} ntype='tab-header-toolbar'
         * @protected
         */
        ntype: 'tab-header-toolbar',
        /**
         * @member {Array} cls=['neo-tab-header-toolbar','neo-toolbar']
         */
        cls: ['neo-tab-header-toolbar', 'neo-toolbar'],
        /**
         * @member {Boolean} useActiveTabIndicator_=true
         */
        useActiveTabIndicator_: true
    }}

    /**
     * Triggered after the sortable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetSortable(value, oldValue) {
        let me = this;

        if (value && !me.sortZone) {
            Promise.all(/*! import() | src/draggable/tab/header/toolbar/SortZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("vendors~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/draggable/toolbar/SortZone-mjs.js"), __webpack_require__.e("src/draggable/tab/header/toolbar/SortZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../../draggable/tab/header/toolbar/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/tab/header/toolbar/SortZone.mjs")).then(module => {
                me.sortZone = Neo.create({
                    module             : module.default,
                    appName            : me.appName,
                    boundaryContainerId: me.id,
                    owner              : me,
                    ...me.sortZoneConfig || {}
                });
            });
        }
    }

    /**
     * Triggered after the useActiveTabIndicator config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseActiveTabIndicator(value, oldValue) {
        if (oldValue !== undefined) {
            let me   = this,
                vdom = me.vdom;

            me.items.forEach(item => {
                // silent updates
                item._useActiveTabIndicator = value;
                item.updateUseActiveTabIndicator(true);
            });

            me.vdom = vdom;
        }
    }

    /**
     *
     * @protected
     */
    createItems() {
        let me       = this,
            defaults = me.itemDefaults || {};

        defaults.useActiveTabIndicator = me.useActiveTabIndicator;
        me.itemDefaults = defaults;

        super.createItems();
    }

    /**
     * Returns the layout config matching to the dock position
     * @returns {Object} layoutConfig
     * @protected
     */
    getLayoutConfig() {
        let layoutConfig;

        switch(this.dock) {
            case 'bottom':
            case 'top':
                layoutConfig = {
                    ntype: 'hbox',
                    align: 'center',
                    pack : 'start'
                };
                break;
            case 'left':
                layoutConfig = {
                    ntype    : 'vbox',
                    align    : 'center',
                    direction: 'column-reverse',
                    pack     : 'end'
                };
                break;
            case 'right':
                layoutConfig = {
                    ntype    : 'vbox',
                    align    : 'center',
                    direction: 'column',
                    pack     : 'start'
                };
                break;
        }

        return layoutConfig;
    }

    /**
     * Moves an existing item to a new index
     * @param {Number} fromIndex
     * @param {Number} toIndex
     * @returns {Neo.component.Base}
     */
    moveTo(fromIndex, toIndex) {
        let returnValue = super.moveTo(fromIndex, toIndex);

        if (fromIndex !== toIndex) {
            this.items.forEach((item, index) => {
                item.index = index;
            });
        }

        return returnValue;
    }
}

Neo.applyClassConfig(Toolbar);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tree/List.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/tree/List.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* harmony import */ var _list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/Base.mjs */ "./node_modules/neo.mjs/src/list/Base.mjs");
/* harmony import */ var _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");




/**
 * @class Neo.tree.List
 * @extends Neo.list.Base
 */
class Tree extends _list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tree.List'
         * @protected
         */
        className: 'Neo.tree.List',
        /**
         * @member {String} ntype='treelist'
         * @protected
         */
        ntype: 'treelist',
        /**
         * @member {String[]} cls=['neo-tree-list']
         */
        cls: ['neo-tree-list'],
        /**
         * todo: change the default to false once selection.TreeList is in place
         * @member {Boolean} disableSelection=true
         */
        disableSelection: true,
        /**
         * @member {Neo.draggable.tree.DragZone|null} dragZone=null
         */
        dragZone: null,
        /**
         * @member {Boolean} showCollapseExpandAllIcons=true
         */
        showCollapseExpandAllIcons: true,
        /**
         * @member {Boolean} sortable_=false
         */
        sortable_: false,
        /**
         * @member {Neo.draggable.tree.SortZone|null} sortZone=null
         */
        sortZone: null,
        /**
         * @member {Object} dragZoneConfig=null
         */
        sortZoneConfig: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                tag: 'ul',
                cls: ['neo-list-container', 'neo-list'],
                cn : []
            }]
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me   = this,
            vdom = me.vdom;

        if (me.showCollapseExpandAllIcons) {
            vdom.cn.unshift({
                cls: ['neo-treelist-menu-item', 'neo-treelist-collapse-all-icon'],
                cn : [{
                    tag: 'span',
                    cls: ['neo-treelist-menu-item-content']
                }]
            }, {
                cls: ['neo-treelist-menu-item', 'neo-treelist-expand-all-icon'],
                cn : [{
                    tag: 'span',
                    cls: ['neo-treelist-menu-item-content']
                }]
            });

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the draggable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDraggable(value, oldValue) {
        let me = this;

        if (value) {
            if (me.sortable) {
                console.error('tree.List can be either draggable or sortable, not both.', me.id);
            } else if (!me.dragZone) {
                Promise.all(/*! import() | src/draggable/tree/DragZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/tree/DragZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/tree/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/tree/DragZone.mjs")).then(module => {
                    me.dragZone = Neo.create({
                        module : module.default,
                        appName: me.appName,
                        owner  : me,
                        ...me.dragZoneConfig || {}
                    });
                });
            }
        }
    }

    /**
     * Triggered after the sortable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetSortable(value, oldValue) {
        let me = this;

        if (value) {
            if (me.draggable) {
                console.error('tree.List can be either draggable or sortable, not both.', me.id);
            } else if (!me.sortZone) {
                Promise.all(/*! import() | src/draggable/tree/SortZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/tree/SortZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/tree/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/tree/SortZone.mjs")).then(module => {
                    me.sortZone = Neo.create({
                        module             : module.default,
                        appName            : me.appName,
                        boundaryContainerId: me.id,
                        owner              : me,
                        ...me.sortZoneConfig || {}
                    });
                });
            }
        }
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetStore(value, oldValue) {
        if (!value) {
            value = Neo.create(_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"], {
                keyProperty: 'id'
            });
        }

        return super.beforeSetStore(value, oldValue);
    }


    /**
     * Collapses all folders
     * @param {Boolean} [silent]=false Set silent to true to prevent a vnode update
     */
    collapseAll(silent=false) {
        let me       = this,
            vdom     = me.vdom,
            hasMatch = false,
            node;

        me.store.items.forEach(item => {
            if (!item.isLeaf) {
                node = me.getVdomChild(me.getItemId(item.id), vdom);

                if (node.cls.includes('neo-folder-open')) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].remove(node.cls, 'neo-folder-open');
                    hasMatch = true;
                }
            }
        });

        if (hasMatch) {
            me[silent ? '_vdom' : 'vdom'] = vdom;
        }
    }

    /**
     *
     * @param {String} [parentId] The parent node
     * @param {Object} [vdomRoot] The vdom template root for the current sub tree
     * @param {Number} level The hierarchy level of the tree
     * @returns {Object} vdomRoot
     * @protected
     */
    createItems(parentId, vdomRoot, level) {
        let me    = this,
            items = me.store.find('parentId', parentId),
            cls, tmpRoot;

        if (items.length > 0) {
            if (!vdomRoot.cn) {
                vdomRoot.cn = [];
            }

            if (parentId !== null) {
                vdomRoot.cn.push({
                    tag: 'ul',
                    cls: ['neo-list'],
                    cn : [],
                    style: {
                        paddingLeft: '15px'
                    }
                });

                tmpRoot = vdomRoot.cn[vdomRoot.cn.length - 1];
            } else {
                tmpRoot = vdomRoot;
            }

            items.forEach(item => {
                cls = ['neo-list-item'];

                if (item.isLeaf) {
                    cls.push(item.singleton ? 'neo-list-item-leaf-singleton' : 'neo-list-item-leaf');
                } else {
                    cls.push('neo-list-folder');

                    if (!item.collapsed) {
                        cls.push('neo-folder-open');
                    }
                }

                tmpRoot.cn.push({
                    tag: 'li',
                    cls: cls,
                    id : me.getItemId(item.id),
                    cn : [{
                        tag      : 'span',
                        cls      : ['neo-list-item-content'],
                        innerHTML: item.name,
                        style: {
                            pointerEvents: 'none'
                        }
                    }],
                    style: {
                        padding : '10px',
                        position: item.isLeaf ? null : 'sticky',
                        top     : item.isLeaf ? null : (level * 38) + 'px',
                        zIndex  : item.isLeaf ? null : (20 / (level + 1)),
                    }
                });

                tmpRoot = me.createItems(item.id, tmpRoot, level + 1);
            });
        }

        return vdomRoot;
    }

    /**
     * Expands all folders
     * @param {Boolean} silent=false Set silent to true to prevent a vnode update
     */
    expandAll(silent=false) {
        let me       = this,
            vdom     = me.vdom,
            hasMatch = false,
            node;

        me.store.items.forEach(item => {
            if (!item.isLeaf) {
                node = me.getVdomChild(me.getItemId(item.id), vdom);

                if (!node.cls.includes('neo-folder-open')) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].add(node.cls, 'neo-folder-open');
                    hasMatch = true;
                }
            }
        });

        if (hasMatch) {
            me[silent ? '_vdom' : 'vdom'] = vdom;
        }
    }

    /**
     * Hides Tree nodes which do not match the filter
     * @param {String} property The store field to filter by
     * @param {String} value The filter value
     * @param {Number|null} parentId The root id for the current filter call
     * @param {Boolean} [parentMatch]=false In case a parent folder matches the filter, show its child items
     * @returns {Boolean} false if at least one child item is filtered
     */
    filter(property, value, parentId, parentMatch=false) {
        let me         = this,
            isFiltered = true,
            valueRegEx = new RegExp(value, 'gi'),
            vdom       = me.vdom,
            childReturnValue, directMatch, node;

        if (!value) {
            value = '';
        }

        me.store.items.forEach(item => {
            if (item.parentId === parentId) {
                directMatch = false;
                node        = me.getVdomChild(me.getItemId(item.id), vdom);

                node.cn[0].innerHTML = item[property].replace(valueRegEx, match => {
                    directMatch = true;
                    return `<span class="neo-highlight-search">${match}</span>`;
                });

                if (item.isLeaf) {
                    childReturnValue = true;
                } else {
                    childReturnValue = me.filter(property, value, item.id, directMatch || parentMatch);
                }

                if (directMatch || parentMatch || childReturnValue === false || value === '') {
                    isFiltered = false;
                }

                node.style.display = isFiltered ? 'none' : 'list-item';
            }
        });

        if (parentId === null) {
            me.expandAll(true);
            me.vdom = vdom;
        }

        return isFiltered;
    }

    /**
     *
     * @returns {Object}
     */
    getListItemsRoot() {
        return this.vdom.cn[this.showCollapseExpandAllIcons ? 2 : 0];
    }

    /**
     *
     * @param {Object} data
     */
    onClick(data) {
        if (data.target.cls.includes('neo-treelist-menu-item')) {
            this.onMenuItemClick(data.target.cls);
        } else {
            super.onClick(data);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onItemClick(data) {
        let me    = this,
            vdom  = me.vdom,
            items = me.store.items,
            i     = 0,
            len   = items.length,
            path  = data.path.map(e => e.id),
            item, record, tmpItem, vnodeId;

        for (; i < len; i++) {
            tmpItem = items[i];
            vnodeId = me.getItemId(tmpItem.id);

            if (path.includes(vnodeId)) {
                record = tmpItem;
                item   = me.getVdomChild(vnodeId);
                break;
            }
        }

        if (item) {
            if (item.cls && item.cls.includes('neo-list-folder')) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].toggle(item.cls, 'neo-folder-open');
                me.vdom = vdom;
            } else {
                me.onLeafItemClick(record);

                /**
                 * The leafItemClick event fires when a click occurs on a list item which does not have child items.
                 * Passes the item record to the event handler.
                 * @event leafItemClick
                 * @returns {Object} record
                 */
                me.fire('leafItemClick', record);
            }

            super.onItemClick(data);
        }
    }

    /**
     * Placeholder method
     * @param {Object} record
     */
    onLeafItemClick(record) {

    }

    /**
     * Gets triggered by clicks on the collapse or expand all icons
     * @param {Array} cls
     * @protected
     */
    onMenuItemClick(cls) {
        if (cls.includes('neo-treelist-collapse-all-icon')) {
            this.collapseAll();
        } else {
            this.expandAll();
        }
    }
}

Neo.applyClassConfig(Tree);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Function.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Function.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.util.Function
 * @extends Neo.core.Base
 */
class NeoFunction extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Function'
         * @protected
         */
        className: 'Neo.util.Function'
    }}

    /**
     * Append args instead of prepending them
     * @param {Object} scope
     * @returns {Function}
     */
    static bindAppend(scope) {
        const fn   = this,
              args = [].slice.call(arguments).slice(1);

        return function() {
            return fn.apply(scope, [].slice.call(arguments).concat(args));
        }
    }

    /**
     *
     * @param {Neo.core.Base} target
     * @param {String} methodName
     * @param {Function} fn
     * @param {Object} scope
     * @returns {Function}
     */
    static createSequence(target, methodName, fn, scope) {
        let method = target[methodName] || Neo.emptyFn;

        return (target[methodName] = function() {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }

    /**
     *
     * @param {Neo.core.Base} target
     * @param {String} methodName
     * @param {Function} fn
     * @param {Object} scope
     * @returns {Function}
     */
    static intercept(target, methodName, fn, scope) {
        let method = target[methodName] || Neo.emptyFn;

        return (target[methodName] = function() {
            let returnValue = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return returnValue;
        });
    }
}

Neo.applyClassConfig(NeoFunction);

/* harmony default export */ __webpack_exports__["default"] = (NeoFunction);

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udHJvbGxlci9Db21wb25lbnQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL1NlYXJjaC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2xpc3QvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3NlbGVjdGlvbi9MaXN0TW9kZWwubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy90YWIvQ29udGFpbmVyLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdGFiL1N0cmlwLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdGFiL2hlYWRlci9CdXR0b24ubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy90YWIvaGVhZGVyL1Rvb2xiYXIubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy90cmVlL0xpc3QubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0Z1bmN0aW9uLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEM7QUFDYztBQUNEO0FBQ0w7QUFDRTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaURBQUk7QUFDNUIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9B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QUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QixlQUFlLE9BQU87QUFDdEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFZSwwRUFBVyxFIiwiZmlsZSI6InZlbmRvcnN+Y2h1bmtzL2RvY3MtYXBwLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlICAgICAgICAgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IENvbXBvbmVudE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlci9Db21wb25lbnQubWpzJztcbmltcG9ydCBEb21FdmVudE1hbmFnZXIgIGZyb20gJy4uL21hbmFnZXIvRG9tRXZlbnQubWpzJztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgIGZyb20gJy4uL2NvcmUvTG9nZ2VyLm1qcyc7XG5pbXBvcnQgTmVvRnVuY3Rpb24gICAgICBmcm9tICcuLi91dGlsL0Z1bmN0aW9uLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5jb250cm9sbGVyLkNvbXBvbmVudFxuICogQGV4dGVuZHMgTmVvLmNvbnRyb2xsZXIuQmFzZVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmNvbnRyb2xsZXIuQ29tcG9uZW50J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29udHJvbGxlci5Db21wb25lbnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndmlldy1jb250cm9sbGVyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2NvbXBvbmVudC1jb250cm9sbGVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gcmVmZXJlbmNlcz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHJlZmVyZW5jZXM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHZpZXdfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdmlld186IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5yZWZlcmVuY2VzID0ge307XG5cbiAgICAgICAgTmVvRnVuY3Rpb24uY3JlYXRlU2VxdWVuY2UobWUudmlldywgJ29uQ29uc3RydWN0ZWQnLCBtZS5vblZpZXdDb25zdHJ1Y3RlZCwgbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIGFjY2Vzc2luZyB0aGUgdmlldyBjb25maWdcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVHZXRWaWV3KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gTmVvLmdldCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgdmlldyBjb25maWcgZ2V0cyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0Vmlldyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtudHlwZV1cbiAgICAgKiBAcmV0dXJucyB7TmVvLmNvbnRyb2xsZXIuQ29tcG9uZW50fG51bGx9XG4gICAgICovXG4gICAgZ2V0UGFyZW50KG50eXBlKSB7XG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZpZXcgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgcGFyZW50cyA9IENvbXBvbmVudE1hbmFnZXIuZ2V0UGFyZW50cyh2aWV3KSxcbiAgICAgICAgICAgIGkgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICA9IHBhcmVudHMubGVuZ3RoLFxuICAgICAgICAgICAgY29udHJvbGxlcjtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyID0gcGFyZW50c1tpXS5jb250cm9sbGVyO1xuXG4gICAgICAgICAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIGlmIChudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobnR5cGUgPT09IGNvbnRyb2xsZXIubnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGFuZGxlck5hbWVcbiAgICAgKiBAcmV0dXJucyB7TmVvLmNvbnRyb2xsZXIuQ29tcG9uZW50fG51bGx9XG4gICAgICovXG4gICAgZ2V0UGFyZW50SGFuZGxlclNjb3BlKGhhbmRsZXJOYW1lKSB7XG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZpZXcgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgcGFyZW50cyA9IENvbXBvbmVudE1hbmFnZXIuZ2V0UGFyZW50cyh2aWV3KSxcbiAgICAgICAgICAgIGkgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICA9IHBhcmVudHMubGVuZ3RoLFxuICAgICAgICAgICAgY29udHJvbGxlcjtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyID0gcGFyZW50c1tpXS5jb250cm9sbGVyO1xuXG4gICAgICAgICAgICBpZiAoY29udHJvbGxlciAmJiBjb250cm9sbGVyW2hhbmRsZXJOYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9kbzogY2xlYW51cCBubyBsb25nZXIgZXhpc3RpbmcgcmVmZXJlbmNlc1xuICAgICAqIHRvZG86IHVwZGF0ZSBjaGFuZ2VkIHJlZmVyZW5jZXMgKGUuZy4gY29udGFpbmVyLnJlbW92ZSgpIHRoZW4gY29udGFpbmVyLmFkZCgpIHVzaW5nIHRoZSBzYW1lIGtleSlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldFJlZmVyZW5jZShuYW1lKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb21wb25lbnRJZCA9IG1lLnJlZmVyZW5jZXNbbmFtZV0sXG4gICAgICAgICAgICBjb21wb25lbnQ7XG5cbiAgICAgICAgaWYgKGNvbXBvbmVudElkKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBOZW8uZ2V0Q29tcG9uZW50KGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBtZS52aWV3LmRvd24oe3JlZmVyZW5jZTogbmFtZX0pO1xuXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbWUucmVmZXJlbmNlc1tuYW1lXSA9IGNvbXBvbmVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnQgfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSB2aWV3XG4gICAgICovXG4gICAgb25WaWV3Q29uc3RydWN0ZWQodmlldykge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNoaWxkQ2FsbCA9ICEhdmlldyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycywgZXZlbnRIYW5kbGVyLCBmbiwgcGFyZW50Q29udHJvbGxlcjtcblxuICAgICAgICB2aWV3ID0gdmlldyB8fCBtZS52aWV3O1xuXG4gICAgICAgIHZpZXcuZG9tTGlzdGVuZXJzID0gTmVvLmNsb25lKHZpZXcuZG9tTGlzdGVuZXJzLCB0cnVlLCB0cnVlKTsgLy8gZW5zdXJlIHRoZXJlIGlzIG5vIGludGVyZmVyZW5jZSBvbiBwcm90b3R5cGUgbGV2ZWxcbiAgICAgICAgZG9tTGlzdGVuZXJzID0gdmlldy5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgaWYgKGRvbUxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRvbUxpc3RlbmVycykpIHtcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBbZG9tTGlzdGVuZXJzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzLmZvckVhY2goZG9tTGlzdGVuZXIgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGRvbUxpc3RlbmVyKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnc2NvcGUnICYmIGtleSAhPT0gJ2RlbGVnYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lby5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoTmVvLmlzT2JqZWN0KHZhbHVlKSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnZm4nKSAmJiBOZW8uaXNTdHJpbmcodmFsdWUuZm4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gdmFsdWUuZm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1lW2V2ZW50SGFuZGxlcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udHJvbGxlciA9IG1lLmdldFBhcmVudEhhbmRsZXJTY29wZShldmVudEhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyZW50Q29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZ0Vycm9yKCdVbmtub3duIGRvbUV2ZW50IGhhbmRsZXIgZm9yJywgdmlldywgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuICAgICAgICAgICAgICAgPSBwYXJlbnRDb250cm9sbGVyW2V2ZW50SGFuZGxlcl0uYmluZChwYXJlbnRDb250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbUxpc3RlbmVyW2tleV0gPSBmbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9tRXZlbnRNYW5hZ2VyLnVwZGF0ZUxpc3RlbmVyUGxhY2Vob2xkZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudElkICAgICAgIDogdmlldy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXJNZXRob2Q6IGZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlck5hbWUgIDogZXZlbnRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSAgICAgICAgIDoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgIDogcGFyZW50Q29udHJvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiAgICAgICAgICAgICAgID0gbWVbZXZlbnRIYW5kbGVyXS5iaW5kKG1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJba2V5XSA9IGZuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbUV2ZW50TWFuYWdlci51cGRhdGVMaXN0ZW5lclBsYWNlaG9sZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudElkICAgICAgIDogdmlldy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlck1ldGhvZDogZm4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXJOYW1lICA6IGV2ZW50SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSAgICAgICAgIDoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgOiBtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyh2aWV3Lmxpc3RlbmVycykuZm9yRWFjaCgoW25hbWUsIGxpc3RlbmVyXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVvLmlzT2JqZWN0KGtleSkgJiYga2V5Lmhhc093blByb3BlcnR5KCdmbicpICYmIE5lby5pc1N0cmluZyhrZXkuZm4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0ga2V5LmZuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZVtldmVudEhhbmRsZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVW5rbm93biBldmVudCBoYW5kbGVyIGZvcicsIHZpZXcsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LmZuID0gbWVbZXZlbnRIYW5kbGVyXS5iaW5kKG1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcuaXRlbXMpIHtcbiAgICAgICAgICAgIHZpZXcuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICBtZS5vblZpZXdDb25zdHJ1Y3RlZChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRDYWxsKSB7XG4gICAgICAgICAgICBtZS5vblZpZXdQYXJzZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluc2lkZSB5b3VyIHZpZXcgY29udHJvbGxlcnMgYXMgYSBzdGFydGluZyBwb2ludCBpbiBjYXNlIHlvdSBuZWVkIHJlZmVyZW5jZXNcbiAgICAgKiAoaW5zdGVhZCBvZiB1c2luZyBvbkNvbnN0cnVjdGVkKCkgaW5zaWRlIHlvdXIgY29udHJvbGxlcilcbiAgICAgKi9cbiAgICBvblZpZXdQYXJzZWQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBwYXJzZUNvbmZpZyhjb25maWcpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2aWV3ICAgICAgICAgPSBjb25maWcgfHwgbWUudmlldyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IHZpZXcuZG9tTGlzdGVuZXJzLFxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyO1xuXG4gICAgICAgIGlmIChkb21MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkb21MaXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gW2RvbUxpc3RlbmVyc107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5mb3JFYWNoKGRvbUxpc3RlbmVyID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhkb21MaXN0ZW5lcikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3Njb3BlJyAmJiBrZXkgIT09ICdkZWxlZ2F0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2ZuJykgJiYgTmVvLmlzU3RyaW5nKHZhbHVlLmZuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IHZhbHVlLmZuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZVtldmVudEhhbmRsZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVW5rbm93biBkb21FdmVudCBoYW5kbGVyIGZvcicsIHZpZXcsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtjb25zb2xlLmxvZygnIycsIGtleSwgbWUuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFyc2VDb25maWcnLCBldmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcltrZXldID0gbWVbZXZlbnRIYW5kbGVyXS5iaW5kKG1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyh2aWV3Lmxpc3RlbmVycykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdzY29wZScgJiYga2V5ICE9PSAnZGVsZWdhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChOZW8uaXNPYmplY3QodmFsdWUpICYmIHZhbHVlLmhhc093blByb3BlcnR5KCdmbicpICYmIE5lby5pc1N0cmluZyh2YWx1ZS5mbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IHZhbHVlLmZuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZVtldmVudEhhbmRsZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZ0Vycm9yKCdVbmtub3duIGV2ZW50IGhhbmRsZXIgZm9yJywgdmlldywgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5saXN0ZW5lcnNba2V5XSA9IG1lW2V2ZW50SGFuZGxlcl0uYmluZChtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHZpZXcuaGVhZGVycy5mb3JFYWNoKGhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFoZWFkZXIuY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICBtZS5wYXJzZUNvbmZpZyhoZWFkZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcuaXRlbXMpIHtcbiAgICAgICAgICAgIHZpZXcuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgICAgICBtZS5wYXJzZUNvbmZpZyhpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ29tcG9uZW50KTtcblxuZXhwb3J0IHtDb21wb25lbnQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IFRleHQgZnJvbSAnLi9UZXh0Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLlNlYXJjaFxuICogQGV4dGVuZHMgTmVvLmZvcm0uZmllbGQuVGV4dFxuICovXG5jbGFzcyBTZWFyY2ggZXh0ZW5kcyBUZXh0IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQuU2VhcmNoJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC5TZWFyY2gnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nc2VhcmNoZmllbGQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnc2VhcmNoZmllbGQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGNscz1bJ25lby1zZWFyY2hmaWVsZCcsICduZW8tdGV4dGZpZWxkJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tc2VhcmNoZmllbGQnLCAnbmVvLXRleHRmaWVsZCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogVmFsdWUgZm9yIHRoZSBoaWRlTGFiZWxfIHRleHRmaWVsZCBjb25maWdcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaGlkZUxhYmVsPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGhpZGVMYWJlbDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbHVlIGZvciB0aGUgcGxhY2Vob2xkZXJUZXh0XyB0ZXh0ZmllbGQgY29uZmlnXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gcGxhY2Vob2xkZXJUZXh0PSdTZWFyY2gnXG4gICAgICAgICAqL1xuICAgICAgICBwbGFjZWhvbGRlclRleHQ6ICdTZWFyY2gnLFxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFNlYXJjaCk7XG5cbmV4cG9ydCB7U2VhcmNoIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDbGFzc1N5c3RlbVV0aWwgZnJvbSAnLi4vdXRpbC9DbGFzc1N5c3RlbS5tanMnO1xuaW1wb3J0IENvbXBvbmVudCAgICAgICBmcm9tICcuLi9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IExpc3RNb2RlbCAgICAgICBmcm9tICcuLi9zZWxlY3Rpb24vTGlzdE1vZGVsLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgICAgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBTdG9yZSAgICAgICAgICAgZnJvbSAnLi4vZGF0YS9TdG9yZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubGlzdC5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5saXN0LkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5saXN0LkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGlzdCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdsaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgd2lsbCBkZXN0cm95IHRoZSB1c2VkIGNvbGxlY3Rpb24gLyBzdG9yZSB3aGVuIHRoZSBjb21wb25lbnQgZ2V0cyBkZXN0cm95ZWRcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gYXV0b0Rlc3Ryb3lTdG9yZT10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvRGVzdHJveVN0b3JlOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1saXN0LWNvbnRhaW5lcicsJ25lby1saXN0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tbGlzdC1jb250YWluZXInLCAnbmVvLWxpc3QnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGRpc2FibGVTZWxlY3Rpb25fPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBkaXNhYmxlU2VsZWN0aW9uXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRpc3BsYXlGaWVsZD0nbmFtZSdcbiAgICAgICAgICovXG4gICAgICAgIGRpc3BsYXlGaWVsZDogJ25hbWUnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gZHJhZ2dhYmxlXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ2dhYmxlXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZHJhZ2dhYmxlLmxpc3QuRHJhZ1pvbmV8bnVsbH0gZHJhZ1pvbmU9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1pvbmU6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGRyYWdab25lQ29uZmlnPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdab25lQ29uZmlnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaGlnaGxpZ2h0RmlsdGVyVmFsdWU9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaGlnaGxpZ2h0RmlsdGVyVmFsdWU6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGl0ZW1DbHM9J25lby1saXN0LWl0ZW0nXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtQ2xzOiAnbmVvLWxpc3QtaXRlbScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpdGlvbmFsIHVzZWQga2V5cyBmb3IgdGhlIHNlbGVjdGlvbiBtb2RlbFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGtleXNcbiAgICAgICAgICovXG4gICAgICAgIGtleXM6IHt9LFxuICAgICAgICAvKipcbiAgICAgICAgICogRWl0aGVyIHBhc3MgYSBzZWxlY3Rpb24uTW9kZWwgbW9kdWxlLCBhbiBpbnN0YW5jZSBvciBhIGNvbmZpZyBvYmplY3RcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fE5lby5zZWxlY3Rpb24uTW9kZWx9IHNlbGVjdGlvbk1vZGVsXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3Rpb25Nb2RlbF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyB0byB0cnVlIGluIGNhc2UgYSBzZWxlY3QgZXZlbnQgc2hvdWxkIG9ubHkgdXBkYXRlIF92ZG9tIChlLmcuIHdoZW4gdXNlZCBpbnNpZGUgYSBmb3JtLmZpZWxkLlNlbGVjdFxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaWxlbnRTZWxlY3Q9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHNpbGVudFNlbGVjdDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZGF0YS5TdG9yZXxudWxsfSBzdG9yZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmVfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSB3aWxsIGFkZCBhIGNoZWNrYm94IGluIGZyb250IG9mIGVhY2ggbGlzdCBpdGVtXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHN0YWNrZWRfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHVzZUNoZWNrQm94ZXNfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb209e3RhZzondWwnLGNuOltdfVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgIGNuIDogW11cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IG1lLmRvbUxpc3RlbmVycztcblxuICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBjbGljazoge2ZuOiBtZS5vbkNsaWNrLCBzY29wZTogbWV9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdGlvbk1vZGVsLnJlZ2lzdGVyKG1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZGlzYWJsZVNlbGVjdGlvbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldERpc2FibGVTZWxlY3Rpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIG1lLnJlbmRlcmVkICYmIG1lLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICBtZS5zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdEFsbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBkcmFnZ2FibGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREcmFnZ2FibGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFtZS5kcmFnWm9uZSkge1xuICAgICAgICAgICAgaW1wb3J0KFxuICAgICAgICAgICAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUtbWpzLmpzJyAqL1xuICAgICAgICAgICAgICAgICcuLi9kcmFnZ2FibGUvbGlzdC9EcmFnWm9uZS5tanMnXG4gICAgICAgICAgICApLnRoZW4obW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICBtZS5kcmFnWm9uZSA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGUgOiBtb2R1bGUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZTogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgb3duZXIgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1lLmRyYWdab25lQ29uZmlnIHx8IHt9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc2VsZWN0aW9uTW9kZWwgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOZW8uc2VsZWN0aW9uLk1vZGVsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLnNlbGVjdGlvbi5Nb2RlbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTZWxlY3Rpb25Nb2RlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWQpIHtcbiAgICAgICAgICAgIHZhbHVlLnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzdG9yZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge05lby5kYXRhLlN0b3JlfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuU3RvcmV9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U3RvcmUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZS5vbih7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBtZS5vblN0b3JlRmlsdGVyLFxuICAgICAgICAgICAgICAgIGxvYWQgIDogbWUub25TdG9yZUxvYWQsXG4gICAgICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRDb3VudCgpID4gMCkge1xuICAgICAgICAgICAgICAgIG1lLm9uU3RvcmVMb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZUNoZWNrQm94ZXMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VDaGVja0JveGVzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgID0gdGhpcyxcbiAgICAgICAgICAgIGNscyA9IG1lLmNscztcblxuICAgICAgICBOZW9BcnJheVt2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSddKGNscywgJ25lby11c2UtY2hlY2tpY29ucycpO1xuICAgICAgICBtZS5jbHMgPSBjbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgc2VsZWN0aW9uTW9kZWwgY29uZmlnIGdldHMgY2hhbmdlZC5cbiAgICAgKiBAcGFyYW0ge05lby5zZWxlY3Rpb24uTW9kZWx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOZW8uc2VsZWN0aW9uLk1vZGVsfSBvbGRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtOZW8uc2VsZWN0aW9uLk1vZGVsfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRTZWxlY3Rpb25Nb2RlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ2xhc3NTeXN0ZW1VdGlsLmJlZm9yZVNldEluc3RhbmNlKHZhbHVlLCBMaXN0TW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHN0b3JlIGNvbmZpZyBnZXRzIGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R8TmVvLmRhdGEuU3RvcmV9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R8TmVvLmRhdGEuU3RvcmV9IG9sZFZhbHVlXG4gICAgICogQHJldHVybnMge05lby5kYXRhLlN0b3JlfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRTdG9yZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ2xhc3NTeXN0ZW1VdGlsLmJlZm9yZVNldEluc3RhbmNlKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmb3IgY3VzdG9tIGxpc3QgaXRlbXNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGxpc3QgaXRlbSBvYmplY3RcbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtKHJlY29yZCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXRlbUNvbnRlbnQgPSBtZS5jcmVhdGVJdGVtQ29udGVudChyZWNvcmQpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgICAgICB0YWcgICAgIDogJ2xpJyxcbiAgICAgICAgICAgIGNscyAgICAgOiBbbWUuaXRlbUNsc10sXG4gICAgICAgICAgICBpZCAgICAgIDogbWUuZ2V0SXRlbUlkKHJlY29yZFttZS5nZXRLZXlQcm9wZXJ0eSgpXSksXG4gICAgICAgICAgICB0YWJJbmRleDogLTFcbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtW3R5cGVvZiBpdGVtQ29udGVudCA9PT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnY24nXSA9IGl0ZW1Db250ZW50O1xuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGZvciBjdXN0b20gcmVuZGVyZXJzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXXxTdHJpbmd9IEVpdGhlciBhbiB2ZG9tIGNuIGFycmF5IG9yIGEgaHRtbCBzdHJpbmdcbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtQ29udGVudChyZWNvcmQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1UZXh0ID0gcmVjb3JkW3RoaXMuZGlzcGxheUZpZWxkXSxcbiAgICAgICAgICAgIGZpbHRlcjtcblxuICAgICAgICBpZiAobWUuaGlnaGxpZ2h0RmlsdGVyVmFsdWUpIHtcbiAgICAgICAgICAgIGZpbHRlciA9IG1lLnN0b3JlLmdldEZpbHRlcihtZS5kaXNwbGF5RmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci52YWx1ZSAhPT0gbnVsbCAmJiBmaWx0ZXIudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbVRleHQgPSBpdGVtVGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoZmlsdGVyLnZhbHVlLCAnZ2knKSwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIm5lby1oaWdobGlnaHQtc2VhcmNoXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1UZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudD1mYWxzZV1cbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtcyhzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgdmRvbS5jbiA9IFtdO1xuXG4gICAgICAgIG1lLnN0b3JlLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB2ZG9tLmNuLnB1c2gobWUuY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzaWxlbnQpIHtcbiAgICAgICAgICAgIG1lLl92ZG9tID0gdmRvbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnByb21pc2VWZG9tVXBkYXRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuZmlyZSgnY3JlYXRlSXRlbXMnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgbWUuc2VsZWN0aW9uTW9kZWwuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLnN0b3JlICYmIG1lLmF1dG9EZXN0cm95U3RvcmUpIHtcbiAgICAgICAgICAgIG1lLnN0b3JlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBmb2N1cygpIG9uIHRoZSB0b3AgbGV2ZWwgRE9NIG5vZGUgb2YgdGhpcyBjb21wb25lbnQgb3Igb24gYSBnaXZlbiBub2RlIHZpYSBpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaWRdXG4gICAgICovXG4gICAgZm9jdXMoaWQpIHtcbiAgICAgICAgc3VwZXIuZm9jdXMoaWQpO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgLy8gcmVtb3RlIG1ldGhvZCBhY2Nlc3NcbiAgICAgICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBpZCAgICAgIDogaWQgfHwgdGhpcy5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldEl0ZW1JZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfXycgKyBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2bm9kZUlkXG4gICAgICogQHJldHVybnMge1N0cmluZ3xOdW1iZXJ9IGl0ZW1JZFxuICAgICAqL1xuICAgIGdldEl0ZW1SZWNvcmRJZCh2bm9kZUlkKSB7XG4gICAgICAgIGxldCBpdGVtSWQgICA9IHZub2RlSWQuc3BsaXQoJ19fJylbMV0sXG4gICAgICAgICAgICBtb2RlbCAgICA9IHRoaXMuc3RvcmUubW9kZWwsXG4gICAgICAgICAgICBrZXlGaWVsZCA9IG1vZGVsICYmIG1vZGVsLmdldEZpZWxkKG1vZGVsLmtleVByb3BlcnR5KTtcblxuICAgICAgICBpZiAoa2V5RmllbGQgJiYgKGtleUZpZWxkLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2ludGVnZXInIHx8IGtleUZpZWxkLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgICBpdGVtSWQgPSBwYXJzZUludChpdGVtSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1JZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdXBwb3J0IGNvbGxlY3Rpb25zICYgc3RvcmVzXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRLZXlQcm9wZXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUua2V5UHJvcGVydHkgfHwgdGhpcy5zdG9yZS5tb2RlbC5rZXlQcm9wZXJ0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25DbGljayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGRhdGEucGF0aFswXS5pZCA9PT0gbWUuaWQpIHtcbiAgICAgICAgICAgIG1lLm9uQ29udGFpbmVyQ2xpY2soZGF0YSk7XG4gICAgICAgIH0gIGVsc2UgaWYgKGRhdGEucGF0aFswXS5jbHMuaW5jbHVkZXMobWUuaXRlbUNscykpIHtcbiAgICAgICAgICAgIG1lLm9uSXRlbUNsaWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uQ29udGFpbmVyQ2xpY2soZGF0YSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbnRhaW5lckNsaWNrIGV2ZW50IGZpcmVzIHdoZW4gYSBjbGljayBvY2N1cnMgb24gdGhlIGNvbXBvbmVudCwgYnV0IG5vdCBvbiBhIGxpc3QgaXRlbVxuICAgICAgICAgKiBAZXZlbnQgY29udGFpbmVyQ2xpY2tcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gY2xzIHRoZSBjbGFzc0xpc3Qgb2YgdGhlIHRhcmdldCBub2RlIChjb252ZXJ0ZWQgdG8gYW4gYXJyYXkpXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCB0aGUgdGFyZ2V0IGRvbSBpZFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYXRoIHRoZSBldmVudCBwYXRoXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcmUoJ2NvbnRhaW5lckNsaWNrJywgZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uSXRlbUNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICA9IHRoaXMsXG4gICAgICAgICAgICBub2RlSWQgPSBkYXRhLnBhdGhbMF0uaWQ7XG5cbiAgICAgICAgaWYgKCFtZS5kaXNhYmxlU2VsZWN0aW9uICYmIG1lLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICBtZS5zZWxlY3Rpb25Nb2RlbC5zZWxlY3Qobm9kZUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaXRlbUNsaWNrIGV2ZW50IGZpcmVzIHdoZW4gYSBjbGljayBvY2N1cnMgb24gYSBsaXN0IGl0ZW1cbiAgICAgICAgICogQGV2ZW50IGl0ZW1DbGlja1xuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgdGhlIHJlY29yZCBtYXRjaGluZyB0aGUgbGlzdCBpdGVtXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICBtZS5maXJlKCdpdGVtQ2xpY2snLCBtZS5zdG9yZS5nZXQobWUuZ2V0SXRlbVJlY29yZElkKG5vZGVJZCkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU3RvcmVGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uU3RvcmVMb2FkKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUubW91bnRlZCAmJiBtZS5yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVySWQgPSBtZS5vbigncmVuZGVyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWUudW4oJ3JlbmRlcmVkJywgbGlzdGVuZXJJZCk7XG4gICAgICAgICAgICAgICAgbWUuY3JlYXRlSXRlbXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuY3JlYXRlSXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbmNlIHNob3J0Y3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0SXRlbShpbmRleCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICghbWUuZGlzYWJsZVNlbGVjdGlvbiAmJiBtZS5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgbWUuc2VsZWN0aW9uTW9kZWwuc2VsZWN0QXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBNb2RlbCBmcm9tICcuL01vZGVsLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5zZWxlY3Rpb24uTGlzdE1vZGVsXG4gKiBAZXh0ZW5kcyBOZW8uc2VsZWN0aW9uLk1vZGVsXG4gKi9cbmNsYXNzIExpc3RNb2RlbCBleHRlbmRzIE1vZGVsIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnNlbGVjdGlvbi5MaXN0TW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5zZWxlY3Rpb24uTGlzdE1vZGVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3NlbGVjdGlvbi1saXN0bW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnc2VsZWN0aW9uLWxpc3Rtb2RlbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzdGF5SW5MaXN0PXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHN0YXlJbkxpc3Q6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uS2V5RG93bkRvd24oZGF0YSkge1xuICAgICAgICBpZiAoIXRoaXMudmlldy5kaXNhYmxlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9uTmF2S2V5KGRhdGEsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uS2V5RG93bkxlZnQoZGF0YSkge1xuICAgICAgICB0aGlzLm9uS2V5RG93blVwKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbktleURvd25SaWdodChkYXRhKSB7XG4gICAgICAgIHRoaXMub25LZXlEb3duRG93bihkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25LZXlEb3duVXAoZGF0YSkge1xuICAgICAgICBpZiAoIXRoaXMudmlldy5kaXNhYmxlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9uTmF2S2V5KGRhdGEsIC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFxuICAgICAqL1xuICAgIG9uTmF2S2V5KGRhdGEsIHN0ZXApIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXRlbSAgICAgICAgICAgICA9IGRhdGEucGF0aFswXSxcbiAgICAgICAgICAgIHZpZXcgICAgICAgICAgICAgPSBtZS52aWV3LFxuICAgICAgICAgICAgc3RvcmUgICAgICAgICAgICA9IHZpZXcuc3RvcmUsXG4gICAgICAgICAgICBtYXhJdGVtcyAgICAgICAgID0gc3RvcmUuZ2V0Q291bnQoKSxcbiAgICAgICAgICAgIHByZXZlbnRTZWxlY3Rpb24gPSBmYWxzZSxcbiAgICAgICAgICAgIGluZGV4LCBpdGVtSWQsIHJlY29yZCwgcmVjb3JkSWQ7XG5cbiAgICAgICAgaWYgKGl0ZW0uY2xzLmluY2x1ZGVzKHZpZXcuaXRlbUNscykpIHtcbiAgICAgICAgICAgIHJlY29yZElkID0gdmlldy5nZXRJdGVtUmVjb3JkSWQoaXRlbS5pZCk7XG4gICAgICAgICAgICBpbmRleCAgICA9IHN0b3JlLmluZGV4T2YocmVjb3JkSWQpICsgc3RlcDtcblxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIGlmIChtZS5zdGF5SW5MaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbWF4SXRlbXMgLSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmZpcmUoJ3NlbGVjdFByZUZpcnN0SXRlbScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gbWF4SXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAobWUuc3RheUluTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZmlyZSgnc2VsZWN0UG9zdExhc3RJdGVtJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwcmV2ZW50U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZWNvcmQgPSBzdG9yZS5nZXRBdChpbmRleCk7XG4gICAgICAgICAgICBpdGVtSWQgPSB2aWV3LmdldEl0ZW1JZChyZWNvcmRbbWUudmlldy5nZXRLZXlQcm9wZXJ0eSgpXSk7XG5cbiAgICAgICAgICAgIG1lLnNlbGVjdChpdGVtSWQpO1xuICAgICAgICAgICAgdmlldy5mb2N1cyhpdGVtSWQpO1xuICAgICAgICAgICAgdmlldy5maXJlKCdpdGVtTmF2aWdhdGUnLCByZWNvcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGNvbXBvbmVudFxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNvbXBvbmVudCkge1xuICAgICAgICBzdXBlci5yZWdpc3Rlcihjb21wb25lbnQpO1xuXG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIGlkICAgPSBtZS5pZCxcbiAgICAgICAgICAgIHZpZXcgPSBtZS52aWV3O1xuXG4gICAgICAgIGlmICh2aWV3LmtleXMpIHtcbiAgICAgICAgICAgIHZpZXcua2V5cy5fa2V5cy5wdXNoKFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkRvd24nICAsa2V5OiAnRG93bicgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkxlZnQnICAsa2V5OiAnTGVmdCcgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blJpZ2h0JyAsa2V5OiAnUmlnaHQnICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blVwJyAgICAsa2V5OiAnVXAnICAgICxzY29wZTogaWR9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RBdChpbmRleCkge1xuICAgICAgICBsZXQgdmlldyAgICAgID0gdGhpcy52aWV3LFxuICAgICAgICAgICAgcmVjb3JkS2V5ID0gdmlldy5zdG9yZS5nZXRLZXlBdChpbmRleCksXG4gICAgICAgICAgICBpdGVtSWQgICAgPSByZWNvcmRLZXkgJiYgdmlldy5nZXRJdGVtSWQocmVjb3JkS2V5KTtcblxuICAgICAgICBpZiAoaXRlbUlkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtSWQpO1xuICAgICAgICAgICAgdmlldy5mb2N1cyhpdGVtSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBpZCAgID0gbWUuaWQsXG4gICAgICAgICAgICB2aWV3ID0gbWUudmlldztcblxuICAgICAgICBpZiAodmlldy5rZXlzKSB7XG4gICAgICAgICAgICB2aWV3LmtleXMucmVtb3ZlS2V5cyhbXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duRG93bicgICxrZXk6ICdEb3duJyAgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duTGVmdCcgICxrZXk6ICdMZWZ0JyAgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duUmlnaHQnICxrZXk6ICdSaWdodCcgLHNjb3BlOiBpZH0sXG4gICAgICAgICAgICAgICAge2ZuOiAnb25LZXlEb3duVXAnICAgICxrZXk6ICdVcCcgICAgLHNjb3BlOiBpZH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIudW5yZWdpc3RlcigpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTGlzdE1vZGVsKTtcblxuZXhwb3J0IHtMaXN0TW9kZWwgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2VDb250YWluZXIgZnJvbSAnLi4vY29udGFpbmVyL0Jhc2UubWpzJztcbmltcG9ydCBIZWFkZXJCdXR0b24gIGZyb20gJy4vaGVhZGVyL0J1dHRvbi5tanMnO1xuaW1wb3J0IEhlYWRlclRvb2xiYXIgZnJvbSAnLi9oZWFkZXIvVG9vbGJhci5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICAgZnJvbSAnLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFN0cmlwICAgICAgICAgZnJvbSAnLi9TdHJpcC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8udGFiLkNvbnRhaW5lclxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5CYXNlXG4gKi9cbmNsYXNzIENvbnRhaW5lciBleHRlbmRzIEJhc2VDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3IgdGFiQmFyUG9zaXRpb25cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHRhYkJhclBvc2l0aW9ucz1bJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGFiQmFyUG9zaXRpb25zOiBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udGFiLkNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnRhYi5Db250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndGFiLWNvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0YWItY29udGFpbmVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gYWN0aXZlSW5kZXhfPTBcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZUluZGV4XzogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgd2lsbCBhY3RpdmF0ZSBhIHRhYiB3aGljaCBnZXRzIGR5bmFtaWNhbGx5IGluc2VydGVkIC8gYWRkZWQgYWZ0ZXIgdGhlIFRhYkNvbnRhaW5lciBpcyBtb3VudGVkXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGFjdGl2YXRlSW5zZXJ0ZWRUYWJzPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmF0ZUluc2VydGVkVGFiczogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGJhc2VDbHM9J25lby10YWItY29udGFpbmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgYmFzZUNsczogJ25lby10YWItY29udGFpbmVyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBbY2FyZENvbnRhaW5lcklkXT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjYXJkQ29udGFpbmVySWQ6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhZGRzIGJhc2VDbHMgKyAnLXBsYWluJyBpcyBjYXNlIHBsYWluIGlzIHNldCB0byB0cnVlXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tdGFiLWNvbnRhaW5lciddLFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLXRhYi1jb250YWluZXInXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmF1bHQgY29uZmlncyBmb3IgdGhlIHRhYi5TdHJpcFxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8bnVsbH0gW2NvbnRlbnRDb250YWluZXJEZWZhdWx0c109bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29udGVudENvbnRhaW5lckRlZmF1bHRzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmYXVsdCBjb25maWdzIGZvciB0aGUgdGFiLkhlYWRlclRvb2xiYXJcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IFtoZWFkZXJUb29sYmFyRGVmYXVsdHNdPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGhlYWRlclRvb2xiYXJEZWZhdWx0czogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgdG8gbm90IGFwcGx5IGEgYmFja2dyb3VuZCBlZmZlY3QgdG8gdGhlIHRhYiBoZWFkZXIgY29udGFpbmVyXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHBsYWluXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBwbGFpbl86IHRydWUsXG4gICAgICAgIC8qXG4gICAgICAgICAqIFJlbW92ZSB0aGUgRE9NIG9mIGluYWN0aXZlIGNhcmRzIChUYWJDb250YWluZXIgQm9keSkuXG4gICAgICAgICAqIFRoaXMgd2lsbCBrZWVwIHRoZSBpbnN0YW5jZXMgJiB2ZG9tIHRyZWVzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlbW92ZUluYWN0aXZlQ2FyZHM9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSW5hY3RpdmVDYXJkczogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRydWUgZW5hYmxlcyBzb3J0aW5nIHRhYnMgdmlhIGRyYWcmZHJvcC5cbiAgICAgICAgICogVGhlIGNvbmZpZyBnZXRzIHBhc3NlZCB0byB0aGUgaGVhZGVyIHRvb2xiYXJcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc29ydGFibGVfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzb3J0YWJsZV86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRhYkJhcklkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhYkJhcklkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVmYXVsdCBjb25maWdzIGZvciB0aGUgdGFiLlN0cmlwXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBbdGFiU3RyaXBEZWZhdWx0c109bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFiU3RyaXBEZWZhdWx0czogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBbdGFiU3RyaXBJZF09bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGFiU3RyaXBJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgdGFiIGhlYWRlciB0b29sYmFyLlxuICAgICAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdC5cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0YWJCYXJQb3NpdGlvbl89J3RvcCdcbiAgICAgICAgICovXG4gICAgICAgIHRhYkJhclBvc2l0aW9uXzogJ3RvcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSB1c2VBY3RpdmVUYWJJbmRpY2F0b3JfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHVzZUFjdGl2ZVRhYkluZGljYXRvcl86IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICB0aGlzLl9sYXlvdXQgPSB0aGlzLmdldExheW91dENvbmZpZygpOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIG9uZSBvciBtdWx0aXBsZSB0YWJzIGF0IHRoZSBlbmQgb2YgdGhlIGhlYWRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBpdGVtXG4gICAgICogQHJldHVybnMge05lby5jb21wb25lbnQuQmFzZXxOZW8uY29tcG9uZW50LkJhc2VbXX1cbiAgICAgKi9cbiAgICBhZGQoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnQodGhpcy5nZXRUYWJCYXIoKS5pdGVtcy5sZW5ndGgsIGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYWN0aXZlSW5kZXggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QWN0aXZlSW5kZXgodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY2FyZENvbnRhaW5lciA9IE5lby5nZXRDb21wb25lbnQobWUuY2FyZENvbnRhaW5lcklkKTtcblxuICAgICAgICAgICAgaWYgKGNhcmRDb250YWluZXIgJiYgdmFsdWUgPiAtMSkge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZVRhYkJ1dHRvbnMoKTtcblxuICAgICAgICAgICAgICAgIGNhcmRDb250YWluZXIubGF5b3V0LmFjdGl2ZUluZGV4ID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBtZS5maXJlKCdhY3RpdmVJbmRleENoYW5nZScsIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSAgIDogdmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgcGxhaW4gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRQbGFpbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgYmFzZUNscyA9IG1lLmJhc2VDbHMsXG4gICAgICAgICAgICBjbHMgICAgID0gbWUuY2xzIHx8IFtdO1xuXG4gICAgICAgIE5lb0FycmF5W3ZhbHVlID8gJ3Vuc2hpZnQnIDogJ3JlbW92ZSddKGNscywgYmFzZUNscyArICctcGxhaW4nKTtcbiAgICAgICAgbWUuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc29ydGFibGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTb3J0YWJsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VGFiQmFyKCkuc29ydGFibGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGFiQmFyUG9zaXRpb24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGFiQmFyUG9zaXRpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgY2xzID0gbWUuY2xzO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICduZW8tJyArIG9sZFZhbHVlKTtcbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby0nICsgdmFsdWUpO1xuICAgICAgICBtZS5jbHMgPSBjbHM7XG5cbiAgICAgICAgaWYgKG1lLnJlbmRlcmVkKSB7XG4gICAgICAgICAgICBtZS5sYXlvdXQgPSBtZS5nZXRMYXlvdXRDb25maWcoKTtcbiAgICAgICAgICAgIG1lLmdldFRhYkJhcigpLmRvY2sgPSB2YWx1ZTtcbiAgICAgICAgICAgIG1lLmdldFRhYlN0cmlwKCkuY2xzID0gWyduZW8tdGFiLXN0cmlwJywgICduZW8tZG9jay0nICsgdmFsdWVdO1xuXG4gICAgICAgICAgICBtZS5maXJlKCd0YWJCYXJQb3NpdGlvbkNoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IG1lLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlIDogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgdmFsdWUgICAgOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZUFjdGl2ZVRhYkluZGljYXRvciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVzZUFjdGl2ZVRhYkluZGljYXRvcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VGFiQmFyKCkgIC51c2VBY3RpdmVUYWJJbmRpY2F0b3IgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VGFiU3RyaXAoKS51c2VBY3RpdmVUYWJJbmRpY2F0b3IgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHRhYkJhclBvc2l0aW9uIGNvbmZpZyBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRUYWJCYXJQb3NpdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlU2V0RW51bVZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgJ3RhYkJhclBvc2l0aW9uJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1zICAgICAgICAgPSBtZS5pdGVtcyB8fCBbXSxcbiAgICAgICAgICAgIHRhYkJ1dHRvbnMgICAgPSBbXSxcbiAgICAgICAgICAgIHRhYkNvbXBvbmVudHMgPSBbXTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKG1lLCB7XG4gICAgICAgICAgICBjYXJkQ29udGFpbmVySWQ6IG1lLmNhcmRDb250YWluZXJJZCB8fCBOZW8uZ2V0SWQoJ2NvbnRhaW5lcicpLFxuICAgICAgICAgICAgdGFiQmFySWQgICAgICAgOiBtZS50YWJCYXJJZCAgICAgICAgfHwgTmVvLmdldElkKCd0YWItaGVhZGVyLXRvb2xiYXInKSxcbiAgICAgICAgICAgIHRhYlN0cmlwSWQgICAgIDogbWUudGFiU3RyaXBJZCAgICAgIHx8IE5lby5nZXRJZCgndGFiLXN0cmlwJylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRhYkJ1dHRvbnMucHVzaChtZS5nZXRUYWJCdXR0b25Db25maWcoaXRlbS50YWJCdXR0b25Db25maWcsIGluZGV4KSk7XG5cbiAgICAgICAgICAgIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBOZW8uY29tcG9uZW50LkJhc2UpKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHsuLi5tZS5pdGVtRGVmYXVsdHMsIGZsZXg6IDEsIGlzVGFiOnRydWUsIC4uLml0ZW19O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YWJDb21wb25lbnRzLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLml0ZW1zID0gW3tcbiAgICAgICAgICAgIG1vZHVsZSAgICAgICAgICAgICAgIDogSGVhZGVyVG9vbGJhcixcbiAgICAgICAgICAgIGRvY2sgICAgICAgICAgICAgICAgIDogbWUudGFiQmFyUG9zaXRpb24sXG4gICAgICAgICAgICBmbGV4ICAgICAgICAgICAgICAgICA6ICdub25lJyxcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgIDogbWUudGFiQmFySWQsXG4gICAgICAgICAgICBpdGVtcyAgICAgICAgICAgICAgICA6IHRhYkJ1dHRvbnMsXG4gICAgICAgICAgICBzb3J0YWJsZSAgICAgICAgICAgICA6IG1lLnNvcnRhYmxlLFxuICAgICAgICAgICAgdXNlQWN0aXZlVGFiSW5kaWNhdG9yOiBtZS51c2VBY3RpdmVUYWJJbmRpY2F0b3IsXG4gICAgICAgICAgICAuLi5tZS5oZWFkZXJUb29sYmFyRGVmYXVsdHMgfHwge31cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbW9kdWxlICAgICAgICAgICAgICAgOiBTdHJpcCxcbiAgICAgICAgICAgIGNscyAgICAgICAgICAgICAgICAgIDogWyduZW8tdGFiLXN0cmlwJywgJ25lby1kb2NrLScgKyBtZS50YWJCYXJQb3NpdGlvbl0sXG4gICAgICAgICAgICBmbGV4ICAgICAgICAgICAgICAgICA6ICdub25lJyxcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgIDogbWUudGFiU3RyaXBJZCxcbiAgICAgICAgICAgIHRhYkNvbnRhaW5lcklkICAgICAgIDogbWUuaWQsXG4gICAgICAgICAgICB1c2VBY3RpdmVUYWJJbmRpY2F0b3I6IG1lLnVzZUFjdGl2ZVRhYkluZGljYXRvcixcbiAgICAgICAgICAgIC4uLm1lLnRhYlN0cmlwRGVmYXVsdHMgfHwge31cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbnR5cGUgICAgICAgICAgICAgICAgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIGNscyAgICAgICAgICAgICAgICAgIDogWyduZW8tY29udGFpbmVyJywgJ25lby10YWItY29udGVudC1jb250YWluZXInXSxcbiAgICAgICAgICAgIGlkICAgICAgICAgICAgICAgICAgIDogbWUuY2FyZENvbnRhaW5lcklkLFxuICAgICAgICAgICAgaXRlbURlZmF1bHRzICAgICAgICAgOiBtZS5pdGVtRGVmYXVsdHMsXG4gICAgICAgICAgICBpdGVtcyAgICAgICAgICAgICAgICA6IHRhYkNvbXBvbmVudHMsXG4gICAgICAgICAgICBsYXlvdXQgICAgICAgICAgICAgICA6IHtudHlwZTogJ2NhcmQnLCBhY3RpdmVJbmRleDogbWUuYWN0aXZlSW5kZXgsIHJlbW92ZUluYWN0aXZlQ2FyZHM6IG1lLnJlbW92ZUluYWN0aXZlQ2FyZHN9LFxuICAgICAgICAgICAgdXNlQWN0aXZlVGFiSW5kaWNhdG9yOiBtZS51c2VBY3RpdmVUYWJJbmRpY2F0b3IsXG4gICAgICAgICAgICAuLi5tZS5jb250ZW50Q29udGFpbmVyRGVmYXVsdHMgfHwge31cbiAgICAgICAgfV07XG5cbiAgICAgICAgbWUuaXRlbURlZmF1bHRzID0gbnVsbDtcblxuICAgICAgICBzdXBlci5jcmVhdGVJdGVtcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhcmQgbWF0Y2hpbmcgdGhpcy5hY3RpdmVJbmRleFxuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRBY3RpdmVDYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYXJkQ29udGFpbmVyKCkuaXRlbXNbdGhpcy5hY3RpdmVJbmRleF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2FyZCBieSBhIGdpdmVuIGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge05lby5jb21wb25lbnQuQmFzZXxudWxsfVxuICAgICAqL1xuICAgIGdldENhcmQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FyZENvbnRhaW5lcigpLml0ZW1zW2luZGV4XSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtOZW8uY29udGFpbmVyLkJhc2V9XG4gICAgICovXG4gICAgZ2V0Q2FyZENvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIE5lby5nZXRDb21wb25lbnQodGhpcy5jYXJkQ29udGFpbmVySWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGFtb3VudCBvZiBpdGVtcyBpbnNpZGUgdGhlIHRhYiBoZWFkZXIgdG9vbGJhclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0Q291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRhYkJhcigpLml0ZW1zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGxheW91dENvbmZpZ1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBnZXRMYXlvdXRDb25maWcoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgbGF5b3V0Q29uZmlnID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2gobWUudGFiQmFyUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgbGF5b3V0Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBudHlwZSAgICA6ICd2Ym94JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24gICAgOiAnc3RyZXRjaCcsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ2NvbHVtbi1yZXZlcnNlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFjayAgICAgOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGxheW91dENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnaGJveCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduICAgIDogJ3N0cmV0Y2gnLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgICAgICAgICBwYWNrICAgICA6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGxheW91dENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnaGJveCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduICAgIDogJ3N0cmV0Y2gnLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdyb3ctcmV2ZXJzZScsXG4gICAgICAgICAgICAgICAgICAgIHBhY2sgICAgIDogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIGxheW91dENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGU6ICd2Ym94JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246ICdzdHJldGNoJ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGF5b3V0Q29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge05lby50YWIuaGVhZGVyLkJ1dHRvbnxudWxsfVxuICAgICAqL1xuICAgIGdldFRhYkF0SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFiQmFyKCkuaXRlbXNbaW5kZXhdIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge05lby5jb250YWluZXIuVG9vbGJhcn1cbiAgICAgKi9cbiAgICBnZXRUYWJCYXIoKSB7XG4gICAgICAgIHJldHVybiBOZW8uZ2V0Q29tcG9uZW50KHRoaXMudGFiQmFySWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBtZXJnZWQgY29uZmlnXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGdldFRhYkJ1dHRvbkNvbmZpZyhjb25maWcsIGluZGV4KSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBkZWZhdWx0Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgIG1vZHVsZSA6IEhlYWRlckJ1dHRvbixcbiAgICAgICAgICAgICAgICBmbGV4ICAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgaW5kZXggIDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJlc3NlZDogbWUuYWN0aXZlSW5kZXggPT09IGluZGV4LFxuXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzOiBbe1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUuYWN0aXZlSW5kZXggPSBkYXRhLmNvbXBvbmVudC5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWd9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtOZW8udGFiLlN0cmlwfVxuICAgICAqL1xuICAgIGdldFRhYlN0cmlwKCkge1xuICAgICAgICByZXR1cm4gTmVvLmdldENvbXBvbmVudCh0aGlzLnRhYlN0cmlwSWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYW4gaXRlbSBvciBhcnJheSBvZiBpdGVtcyBhdCBhIHNwZWNpZmljIGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtPYmplY3R8T2JqZWN0W119IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7TmVvLmNvbXBvbmVudC5CYXNlfE5lby5jb21wb25lbnQuQmFzZVtdfVxuICAgICAqL1xuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjYXJkQ29udGFpbmVyID0gbWUuZ2V0Q2FyZENvbnRhaW5lcigpLFxuICAgICAgICAgICAgdGFiQmFyICAgICAgICA9IG1lLmdldFRhYkJhcigpLFxuICAgICAgICAgICAgaGFzSXRlbSAgICAgICA9IGZhbHNlLFxuICAgICAgICAgICAgaSwgbGVuLCBzdXBlckl0ZW0sIHRhYiwgdGFiQnV0dG9uQ29uZmlnO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICBpICAgPSAwO1xuICAgICAgICAgICAgbGVuID0gaXRlbS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyB0b2RvOiByZW5kZXIgaXMgYXN5bmMsIGVuc3VyZSB0aGUgb3JkZXIgb2YgaXRlbXMgaXMgY29ycmVjdFxuXG4gICAgICAgICAgICAgICAgLy8gaW5zZXJ0IHRoZSBhcnJheSBiYWNrd2FyZHNcbiAgICAgICAgICAgICAgICBpdGVtW2ldID0gbWUuaW5zZXJ0KGl0ZW1bbGVuIC0gMV0sIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGkgICA9IDA7XG4gICAgICAgICAgICBsZW4gPSBjYXJkQ29udGFpbmVyLml0ZW1zLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjYXJkQ29udGFpbmVyLml0ZW1zW2ldLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0l0ZW0gICA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVySXRlbSA9IGNhcmRDb250YWluZXIuaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNJdGVtKSB7XG4gICAgICAgICAgICB0YWJCdXR0b25Db25maWcgPSBpdGVtLnRhYkJ1dHRvbkNvbmZpZztcblxuICAgICAgICAgICAgdGFiID0gdGFiQmFyLmluc2VydChpbmRleCwgbWUuZ2V0VGFiQnV0dG9uQ29uZmlnKHRhYkJ1dHRvbkNvbmZpZywgaW5kZXgpKTtcblxuICAgICAgICAgICAgLy8gdG9kbzogbm9uIGluZGV4IGJhc2VkIG1hdGNoaW5nIG9mIHRhYiBidXR0b25zIGFuZCBjYXJkc1xuICAgICAgICAgICAgaSAgID0gMDtcbiAgICAgICAgICAgIGxlbiA9IHRhYkJhci5pdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YWJCYXIuaXRlbXNbaV0uaW5kZXggPSBpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0uZmxleCA9IDE7XG4gICAgICAgICAgICBzdXBlckl0ZW0gPSBjYXJkQ29udGFpbmVyLmluc2VydChpbmRleCwgaXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChtZS5hY3RpdmF0ZUluc2VydGVkVGFicykge1xuICAgICAgICAgICAgICAgIGlmICghbWUudm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWIub24oJ21vdW50ZWQnLCBtZS5vblRhYkJ1dHRvbk1vdW50ZWQsIG1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXJJdGVtXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYW4gZXhpc3RpbmcgaXRlbSB0byBhIG5ldyBpbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleFxuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V9IHRoZSBjYXJkIGl0ZW1cbiAgICAgKi9cbiAgICBtb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNhcmRDb250YWluZXIgPSBtZS5nZXRDYXJkQ29udGFpbmVyKCksXG4gICAgICAgICAgICB0YWJCYXIgICAgICAgID0gbWUuZ2V0VGFiQmFyKCksXG4gICAgICAgICAgICBhY3RpdmVUYWIgICAgID0gdGFiQmFyLml0ZW1zW21lLmFjdGl2ZUluZGV4XSxcbiAgICAgICAgICAgIGluZGV4LCByZXR1cm5WYWx1ZTtcblxuICAgICAgICB0YWJCYXIubW92ZVRvKGZyb21JbmRleCwgdG9JbmRleCk7XG4gICAgICAgIGluZGV4ID0gYWN0aXZlVGFiLmluZGV4O1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gbWUuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIC8vIHNpbGVudCB1cGRhdGVzXG4gICAgICAgICAgICBtZS5fYWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIGNhcmRDb250YWluZXIubGF5b3V0Ll9hY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuVmFsdWUgPSBjYXJkQ29udGFpbmVyLm1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpO1xuXG4gICAgICAgIG1lLmZpcmUoJ21vdmVUbycsIHtcbiAgICAgICAgICAgIGZyb21JbmRleDogZnJvbUluZGV4LFxuICAgICAgICAgICAgdG9JbmRleCAgOiB0b0luZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRyaWdnZXJlZCBvbmNlIGEgZHluYW1pY2FsbHkgYWRkZWQgaGVhZGVyLkJ1dHRvbiBnZXRzIG1vdW50ZWRcbiAgICAgKiBpbiBjYXNlIGFjdGl2YXRlSW5zZXJ0ZWRUYWJzIGlzIHNldCB0byB0cnVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJ1dHRvbklkXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uVGFiQnV0dG9uTW91bnRlZChidXR0b25JZCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjYXJkQ29udGFpbmVyID0gbWUuZ2V0Q2FyZENvbnRhaW5lcigpLFxuICAgICAgICAgICAgdGFiQmFyICAgICAgICA9IG1lLmdldFRhYkJhcigpLFxuICAgICAgICAgICAgaSAgICAgICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICAgICAgID0gdGFiQmFyLml0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIGluZGV4ICAgICAgICAgPSAtMSxcbiAgICAgICAgICAgIGNhcmQsIGxpc3RlbmVySWQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRhYkJhci5pdGVtc1tpXS5pZCA9PT0gYnV0dG9uSWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgY2FyZCA9IGNhcmRDb250YWluZXIuaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobWUudm5vZGUgJiYgIWNhcmQubW91bnRlZCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVySWQgPSBjYXJkLm9uKCdtb3VudGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXJkLnVuKCdtb3VudGVkJywgbGlzdGVuZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY29udGFpbmVyIGl0ZW0gYnkgcmVmZXJlbmNlXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2Rlc3Ryb3lJdGVtPXRydWVdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbc2lsZW50PWZhbHNlXVxuICAgICAqL1xuICAgIHJlbW92ZShjb21wb25lbnQsIGRlc3Ryb3lJdGVtPXRydWUsIHNpbGVudD1mYWxzZSkge1xuICAgICAgICBsZXQgaXRlbXMgPSBbLi4udGhpcy5nZXRDYXJkQ29udGFpbmVyKCkuaXRlbXNdLFxuICAgICAgICAgICAgaSAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgPSBpdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGl0ZW1zW2ldLmlkID09PSBjb21wb25lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0KGksIGRlc3Ryb3lJdGVtLCBzaWxlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZXN0cm95SXRlbT10cnVlXVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudD1mYWxzZV1cbiAgICAgKi9cbiAgICByZW1vdmVBdChpbmRleCwgZGVzdHJveUl0ZW09dHJ1ZSwgc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ICAgPSBtZS5hY3RpdmVJbmRleCxcbiAgICAgICAgICAgIGNhcmRDb250YWluZXIgPSBtZS5nZXRDYXJkQ29udGFpbmVyKCksXG4gICAgICAgICAgICB0YWJCYXIgICAgICAgID0gbWUuZ2V0VGFiQmFyKCksXG4gICAgICAgICAgICBpLCBsZW47XG5cbiAgICAgICAgY2FyZENvbnRhaW5lci5yZW1vdmVBdChpbmRleCwgZGVzdHJveUl0ZW0sIHNpbGVudCk7XG4gICAgICAgIHRhYkJhciAgICAgICAucmVtb3ZlQXQoaW5kZXgsIHRydWUsICAgICAgICBmYWxzZSk7XG5cbiAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIC8vIHNpbGVudCB1cGRhdGVzXG4gICAgICAgICAgICBtZS5fYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCAtIDE7XG4gICAgICAgICAgICBjYXJkQ29udGFpbmVyLmxheW91dC5fYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBtZS5hY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZG86IG5vbiBpbmRleCBiYXNlZCBtYXRjaGluZyBvZiB0YWIgYnV0dG9ucyBhbmQgY2FyZHNcbiAgICAgICAgaSAgID0gMDtcbiAgICAgICAgbGVuID0gdGFiQmFyLml0ZW1zLmxlbmd0aDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0YWJCYXIuaXRlbXNbaV0uaW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlVGFiQnV0dG9ucygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gbWUuYWN0aXZlSW5kZXgsXG4gICAgICAgICAgICB0YWJCdXR0b25zICA9IG1lLmdldFRhYkJhcigpLml0ZW1zIHx8IFtdO1xuXG4gICAgICAgIHRhYkJ1dHRvbnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucHJlc3NlZCA9IGluZGV4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDb250YWluZXIpO1xuXG5leHBvcnQge0NvbnRhaW5lciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby50YWIuU3RyaXBcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBTdHJpcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby50YWIuU3RyaXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby50YWIuU3RyaXAnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndGFiLXN0cmlwJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RhYi1zdHJpcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheX0gY2xzPVsnbmVvLXRhYi1zdHJpcCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLXRhYi1zdHJpcCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHRhYkNvbnRhaW5lcklkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhYkNvbnRhaW5lcklkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gdXNlQWN0aXZlVGFiSW5kaWNhdG9yXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICB1c2VBY3RpdmVUYWJJbmRpY2F0b3JfOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbT17Y246IFt7Y2xzOiAnbmVvLWFjdGl2ZS10YWItaW5kaWNhdG9yJ31dfVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNsczogWyduZW8tYWN0aXZlLXRhYi1pbmRpY2F0b3InXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmdldFRhYkNvbnRhaW5lcigpLm9uKHtcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4Q2hhbmdlOiBtZS5nZXRBY3RpdmVUYWJSZWN0VGhlbk1vdmUsXG4gICAgICAgICAgICBzY29wZSAgICAgICAgICAgIDogbWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VBY3RpdmVUYWJJbmRpY2F0b3IgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVc2VBY3RpdmVUYWJJbmRpY2F0b3IodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgICAgIHZkb20uY25bMF0ucmVtb3ZlRG9tID0gIXZhbHVlO1xuXG4gICAgICAgICAgICBpZiAobWUubW91bnRlZCAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG1lLl92ZG9tID0gdmRvbTsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgICAgIG1lLmdldEFjdGl2ZVRhYlJlY3RUaGVuTW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IG9wdHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5vbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnZhbHVlXG4gICAgICogR2V0cyB0aGUgRG9tUmVjdCBvZiB0aGUgYWN0aXZlIHRhYiwgdGhlbiBtb3ZlcyB0aGUgaW5kaWNhdG9yXG4gICAgICovXG4gICAgZ2V0QWN0aXZlVGFiUmVjdFRoZW5Nb3ZlKG9wdHMpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpZHMgICAgICAgICAgPSBbXSxcbiAgICAgICAgICAgIHRhYkNvbnRhaW5lciA9IG1lLmdldFRhYkNvbnRhaW5lcigpO1xuXG4gICAgICAgIGlmIChtZS52bm9kZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMpIHtcbiAgICAgICAgICAgICAgICBpZHMucHVzaCh0YWJDb250YWluZXIuZ2V0VGFiQXRJbmRleChvcHRzLnZhbHVlKSwgdGFiQ29udGFpbmVyLmdldFRhYkF0SW5kZXgob3B0cy5vbGRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZHMucHVzaCh0YWJDb250YWluZXIuZ2V0VGFiQXRJbmRleCh0YWJDb250YWluZXIuYWN0aXZlSW5kZXgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWRzID0gaWRzLm1hcChlID0+IGUgJiYgZS5pZCkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgICAgICBpZiAobWUudXNlQWN0aXZlVGFiSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZHNcbiAgICAgICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS5tb3ZlQWN0aXZlSW5kaWNhdG9yKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRUYWJDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiBOZW8uZ2V0Q29tcG9uZW50KHRoaXMudGFiQ29udGFpbmVySWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbiBlaXRoZXIgY29udGFpbiB0aGUgbmV3IHRhcmdldCByZWN0IG9yIHRoZSBuZXcgYW5kIG9sZCBvbmVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSByZWN0c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZWN0c1swXS5ib3R0b21cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVjdHNbMF0uaGVpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY3RzWzBdLmxlZnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVjdHNbMF0ucmlnaHRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVjdHNbMF0udG9wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY3RzWzBdLndpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY3RzWzBdLnhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVjdHNbMF0ueVxuICAgICAqL1xuICAgIG1vdmVBY3RpdmVJbmRpY2F0b3IocmVjdHMpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgcmVjdCA9IHJlY3RzWzFdIHx8IHJlY3RzWzBdLFxuICAgICAgICAgICAgYWN0aXZlVGFiSW5kaWNhdG9yLCB0YWJDb250YWluZXIsIHZkb207XG5cbiAgICAgICAgaWYgKG1lLnVzZUFjdGl2ZVRhYkluZGljYXRvcikge1xuICAgICAgICAgICAgdmRvbSAgICAgICAgICAgICAgID0gbWUudmRvbTtcbiAgICAgICAgICAgIGFjdGl2ZVRhYkluZGljYXRvciA9IHZkb20uY25bMF07XG4gICAgICAgICAgICB0YWJDb250YWluZXIgICAgICAgPSBtZS5nZXRUYWJDb250YWluZXIoKTtcblxuICAgICAgICAgICAgc3dpdGNoICh0YWJDb250YWluZXIudGFiQmFyUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYkluZGljYXRvci5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgIDogYCR7cmVjdC5sZWZ0fXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoIDogYCR7cmVjdC53aWR0aH1weGBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWJJbmRpY2F0b3Iuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3JlY3QuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCAgIDogYCR7cmVjdC50b3B9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbiBjYXNlIHRoZXJlIGlzIGEgZHluYW1pYyBjaGFuZ2UgKG9sZFZhbHVlKSwgY2FsbCB0aGlzIG1ldGhvZCBhZ2FpblxuICAgICAgICAgICAgaWYgKHJlY3RzWzFdKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiSW5kaWNhdG9yLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLm1vdmVBY3RpdmVJbmRpY2F0b3IoW3JlY3RzWzBdXSk7XG4gICAgICAgICAgICAgICAgfSwgNTApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYkluZGljYXRvci5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWJJbmRpY2F0b3Iuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFN0cmlwKTtcblxuZXhwb3J0IHtTdHJpcCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZUJ1dHRvbiBmcm9tICcuLi8uLi9idXR0b24vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8udGFiLmhlYWRlci5CdXR0b25cbiAqIEBleHRlbmRzIE5lby5idXR0b24uQmFzZVxuICovXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBCYXNlQnV0dG9uIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnRhYi5oZWFkZXIuQnV0dG9uJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udGFiLmhlYWRlci5CdXR0b24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndGFiLWhlYWRlci1idXR0b24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndGFiLWhlYWRlci1idXR0b24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGNscz1bJ25lby1idXR0b24nLCAnbmVvLXRhYi1idXR0b24nXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10YWItaGVhZGVyLWJ1dHRvbicsICduZW8tYnV0dG9uJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSB1c2VBY3RpdmVUYWJJbmRpY2F0b3JfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHVzZUFjdGl2ZVRhYkluZGljYXRvcl86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWJ1dHRvbi1nbHlwaCddXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgY2xzOiBbJ25lby1idXR0b24tdGV4dCddXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ25lby10YWItYnV0dG9uLWluZGljYXRvciddXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlQWN0aXZlVGFiSW5kaWNhdG9yIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlQWN0aXZlVGFiSW5kaWNhdG9yKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVVzZUFjdGl2ZVRhYkluZGljYXRvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbc2lsZW50PWZhbHNlXVxuICAgICAqL1xuICAgIHVwZGF0ZVVzZUFjdGl2ZVRhYkluZGljYXRvcihzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgdmRvbS5jblsyXS5yZW1vdmVEb20gPSAhbWUudXNlQWN0aXZlVGFiSW5kaWNhdG9yO1xuXG4gICAgICAgIG1lW3NpbGVudCA/ICdfdmRvbScgOiAndmRvbSddID0gdmRvbTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJ1dHRvbik7XG5cbmV4cG9ydCB7QnV0dG9uIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlVG9vbGJhciBmcm9tICcuLi8uLi9jb250YWluZXIvVG9vbGJhci5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8udGFiLmhlYWRlci5Ub29sYmFyXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLlRvb2xiYXJcbiAqL1xuY2xhc3MgVG9vbGJhciBleHRlbmRzIEJhc2VUb29sYmFyIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnRhYi5oZWFkZXIuVG9vbGJhcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnRhYi5oZWFkZXIuVG9vbGJhcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0YWItaGVhZGVyLXRvb2xiYXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndGFiLWhlYWRlci10b29sYmFyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBjbHM9WyduZW8tdGFiLWhlYWRlci10b29sYmFyJywnbmVvLXRvb2xiYXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10YWItaGVhZGVyLXRvb2xiYXInLCAnbmVvLXRvb2xiYXInXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHVzZUFjdGl2ZVRhYkluZGljYXRvcl89dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgdXNlQWN0aXZlVGFiSW5kaWNhdG9yXzogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNvcnRhYmxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U29ydGFibGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFtZS5zb3J0Wm9uZSkge1xuICAgICAgICAgICAgaW1wb3J0KFxuICAgICAgICAgICAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvZHJhZ2dhYmxlL3RhYi9oZWFkZXIvdG9vbGJhci9Tb3J0Wm9uZS1tanMuanMnICovXG4gICAgICAgICAgICAgICAgJy4uLy4uL2RyYWdnYWJsZS90YWIvaGVhZGVyL3Rvb2xiYXIvU29ydFpvbmUubWpzJ1xuICAgICAgICAgICAgICAgICkudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgIG1lLnNvcnRab25lID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgICAgICAgICAgICA6IG1vZHVsZS5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICBhcHBOYW1lICAgICAgICAgICAgOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICBib3VuZGFyeUNvbnRhaW5lcklkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgb3duZXIgICAgICAgICAgICAgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgIC4uLm1lLnNvcnRab25lQ29uZmlnIHx8IHt9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlQWN0aXZlVGFiSW5kaWNhdG9yIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlQWN0aXZlVGFiSW5kaWNhdG9yKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICBtZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIC8vIHNpbGVudCB1cGRhdGVzXG4gICAgICAgICAgICAgICAgaXRlbS5fdXNlQWN0aXZlVGFiSW5kaWNhdG9yID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGVVc2VBY3RpdmVUYWJJbmRpY2F0b3IodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtcygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRlZmF1bHRzID0gbWUuaXRlbURlZmF1bHRzIHx8IHt9O1xuXG4gICAgICAgIGRlZmF1bHRzLnVzZUFjdGl2ZVRhYkluZGljYXRvciA9IG1lLnVzZUFjdGl2ZVRhYkluZGljYXRvcjtcbiAgICAgICAgbWUuaXRlbURlZmF1bHRzID0gZGVmYXVsdHM7XG5cbiAgICAgICAgc3VwZXIuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXlvdXQgY29uZmlnIG1hdGNoaW5nIHRvIHRoZSBkb2NrIHBvc2l0aW9uXG4gICAgICogQHJldHVybnMge09iamVjdH0gbGF5b3V0Q29uZmlnXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGdldExheW91dENvbmZpZygpIHtcbiAgICAgICAgbGV0IGxheW91dENvbmZpZztcblxuICAgICAgICBzd2l0Y2godGhpcy5kb2NrKSB7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICBsYXlvdXRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIG50eXBlOiAnaGJveCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgcGFjayA6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgbGF5b3V0Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBudHlwZSAgICA6ICd2Ym94JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24gICAgOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAnY29sdW1uLXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICBwYWNrICAgICA6ICdlbmQnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBsYXlvdXRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIG50eXBlICAgIDogJ3Zib3gnLFxuICAgICAgICAgICAgICAgICAgICBhbGlnbiAgICA6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgICAgICAgICBwYWNrICAgICA6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxheW91dENvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhbiBleGlzdGluZyBpdGVtIHRvIGEgbmV3IGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZyb21JbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4XG4gICAgICogQHJldHVybnMge05lby5jb21wb25lbnQuQmFzZX1cbiAgICAgKi9cbiAgICBtb3ZlVG8oZnJvbUluZGV4LCB0b0luZGV4KSB7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IHN1cGVyLm1vdmVUbyhmcm9tSW5kZXgsIHRvSW5kZXgpO1xuXG4gICAgICAgIGlmIChmcm9tSW5kZXggIT09IHRvSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRvb2xiYXIpO1xuXG5leHBvcnQge1Rvb2xiYXIgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgICAgZnJvbSAnLi4vbGlzdC9CYXNlLm1qcyc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuLi9jb2xsZWN0aW9uL0Jhc2UubWpzJztcbmltcG9ydCBOZW9BcnJheSAgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLnRyZWUuTGlzdFxuICogQGV4dGVuZHMgTmVvLmxpc3QuQmFzZVxuICovXG5jbGFzcyBUcmVlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby50cmVlLkxpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby50cmVlLkxpc3QnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndHJlZWxpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHJlZWxpc3QnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby10cmVlLWxpc3QnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10cmVlLWxpc3QnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRvZG86IGNoYW5nZSB0aGUgZGVmYXVsdCB0byBmYWxzZSBvbmNlIHNlbGVjdGlvbi5UcmVlTGlzdCBpcyBpbiBwbGFjZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBkaXNhYmxlU2VsZWN0aW9uPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVTZWxlY3Rpb246IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZHJhZ2dhYmxlLnRyZWUuRHJhZ1pvbmV8bnVsbH0gZHJhZ1pvbmU9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ1pvbmU6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaG93Q29sbGFwc2VFeHBhbmRBbGxJY29ucz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93Q29sbGFwc2VFeHBhbmRBbGxJY29uczogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNvcnRhYmxlXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgc29ydGFibGVfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kcmFnZ2FibGUudHJlZS5Tb3J0Wm9uZXxudWxsfSBzb3J0Wm9uZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzb3J0Wm9uZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gZHJhZ1pvbmVDb25maWc9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc29ydFpvbmVDb25maWc6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tXG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgdGFnOiAndWwnLFxuICAgICAgICAgICAgICAgIGNsczogWyduZW8tbGlzdC1jb250YWluZXInLCAnbmVvLWxpc3QnXSxcbiAgICAgICAgICAgICAgICBjbiA6IFtdXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmIChtZS5zaG93Q29sbGFwc2VFeHBhbmRBbGxJY29ucykge1xuICAgICAgICAgICAgdmRvbS5jbi51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLXRyZWVsaXN0LW1lbnUtaXRlbScsICduZW8tdHJlZWxpc3QtY29sbGFwc2UtYWxsLWljb24nXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLXRyZWVsaXN0LW1lbnUtaXRlbS1jb250ZW50J11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNsczogWyduZW8tdHJlZWxpc3QtbWVudS1pdGVtJywgJ25lby10cmVlbGlzdC1leHBhbmQtYWxsLWljb24nXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLXRyZWVsaXN0LW1lbnUtaXRlbS1jb250ZW50J11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBkcmFnZ2FibGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREcmFnZ2FibGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobWUuc29ydGFibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd0cmVlLkxpc3QgY2FuIGJlIGVpdGhlciBkcmFnZ2FibGUgb3Igc29ydGFibGUsIG5vdCBib3RoLicsIG1lLmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW1lLmRyYWdab25lKSB7XG4gICAgICAgICAgICAgICAgaW1wb3J0KFxuICAgICAgICAgICAgICAgICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL2RyYWdnYWJsZS90cmVlL0RyYWdab25lLW1qcy5qcycgKi9cbiAgICAgICAgICAgICAgICAgICAgJy4uL2RyYWdnYWJsZS90cmVlL0RyYWdab25lLm1qcydcbiAgICAgICAgICAgICAgICAgICAgKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmRyYWdab25lID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgOiBtb2R1bGUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvd25lciAgOiBtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1lLmRyYWdab25lQ29uZmlnIHx8IHt9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzb3J0YWJsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFNvcnRhYmxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG1lLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3RyZWUuTGlzdCBjYW4gYmUgZWl0aGVyIGRyYWdnYWJsZSBvciBzb3J0YWJsZSwgbm90IGJvdGguJywgbWUuaWQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghbWUuc29ydFpvbmUpIHtcbiAgICAgICAgICAgICAgICBpbXBvcnQoXG4gICAgICAgICAgICAgICAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvZHJhZ2dhYmxlL3RyZWUvU29ydFpvbmUtbWpzLmpzJyAqL1xuICAgICAgICAgICAgICAgICAgICAnLi4vZHJhZ2dhYmxlL3RyZWUvU29ydFpvbmUubWpzJ1xuICAgICAgICAgICAgICAgICAgICApLnRoZW4obW9kdWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWUuc29ydFpvbmUgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZSAgICAgICAgICAgICA6IG1vZHVsZS5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSAgICAgICAgICAgIDogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5Q29udGFpbmVySWQ6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3duZXIgICAgICAgICAgICAgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tZS5zb3J0Wm9uZUNvbmZpZyB8fCB7fVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHN0b3JlIGNvbmZpZyBnZXRzIGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R8TmVvLmRhdGEuU3RvcmV9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R8TmVvLmRhdGEuU3RvcmV9IG9sZFZhbHVlXG4gICAgICogQHJldHVybnMge05lby5kYXRhLlN0b3JlfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRTdG9yZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBOZW8uY3JlYXRlKENvbGxlY3Rpb24sIHtcbiAgICAgICAgICAgICAgICBrZXlQcm9wZXJ0eTogJ2lkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuYmVmb3JlU2V0U3RvcmUodmFsdWUsIG9sZFZhbHVlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbGxhcHNlcyBhbGwgZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudF09ZmFsc2UgU2V0IHNpbGVudCB0byB0cnVlIHRvIHByZXZlbnQgYSB2bm9kZSB1cGRhdGVcbiAgICAgKi9cbiAgICBjb2xsYXBzZUFsbChzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGhhc01hdGNoID0gZmFsc2UsXG4gICAgICAgICAgICBub2RlO1xuXG4gICAgICAgIG1lLnN0b3JlLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0uaXNMZWFmKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG1lLmdldFZkb21DaGlsZChtZS5nZXRJdGVtSWQoaXRlbS5pZCksIHZkb20pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2xzLmluY2x1ZGVzKCduZW8tZm9sZGVyLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUobm9kZS5jbHMsICduZW8tZm9sZGVyLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhhc01hdGNoKSB7XG4gICAgICAgICAgICBtZVtzaWxlbnQgPyAnX3Zkb20nIDogJ3Zkb20nXSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbcGFyZW50SWRdIFRoZSBwYXJlbnQgbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdmRvbVJvb3RdIFRoZSB2ZG9tIHRlbXBsYXRlIHJvb3QgZm9yIHRoZSBjdXJyZW50IHN1YiB0cmVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBoaWVyYXJjaHkgbGV2ZWwgb2YgdGhlIHRyZWVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB2ZG9tUm9vdFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtcyhwYXJlbnRJZCwgdmRvbVJvb3QsIGxldmVsKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtcyA9IG1lLnN0b3JlLmZpbmQoJ3BhcmVudElkJywgcGFyZW50SWQpLFxuICAgICAgICAgICAgY2xzLCB0bXBSb290O1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIXZkb21Sb290LmNuKSB7XG4gICAgICAgICAgICAgICAgdmRvbVJvb3QuY24gPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmRvbVJvb3QuY24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1saXN0J10sXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW10sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJzE1cHgnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRtcFJvb3QgPSB2ZG9tUm9vdC5jblt2ZG9tUm9vdC5jbi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG1wUm9vdCA9IHZkb21Sb290O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNscyA9IFsnbmVvLWxpc3QtaXRlbSddO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNMZWFmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNscy5wdXNoKGl0ZW0uc2luZ2xldG9uID8gJ25lby1saXN0LWl0ZW0tbGVhZi1zaW5nbGV0b24nIDogJ25lby1saXN0LWl0ZW0tbGVhZicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNscy5wdXNoKCduZW8tbGlzdC1mb2xkZXInKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uY29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMucHVzaCgnbmVvLWZvbGRlci1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0bXBSb290LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdsaScsXG4gICAgICAgICAgICAgICAgICAgIGNsczogY2xzLFxuICAgICAgICAgICAgICAgICAgICBpZCA6IG1lLmdldEl0ZW1JZChpdGVtLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnICAgICAgOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHMgICAgICA6IFsnbmVvLWxpc3QtaXRlbS1jb250ZW50J10sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZyA6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBpdGVtLmlzTGVhZiA/IG51bGwgOiAnc3RpY2t5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCAgICAgOiBpdGVtLmlzTGVhZiA/IG51bGwgOiAobGV2ZWwgKiAzOCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4ICA6IGl0ZW0uaXNMZWFmID8gbnVsbCA6ICgyMCAvIChsZXZlbCArIDEpKSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdG1wUm9vdCA9IG1lLmNyZWF0ZUl0ZW1zKGl0ZW0uaWQsIHRtcFJvb3QsIGxldmVsICsgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZG9tUm9vdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmRzIGFsbCBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBzaWxlbnQ9ZmFsc2UgU2V0IHNpbGVudCB0byB0cnVlIHRvIHByZXZlbnQgYSB2bm9kZSB1cGRhdGVcbiAgICAgKi9cbiAgICBleHBhbmRBbGwoc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBoYXNNYXRjaCA9IGZhbHNlLFxuICAgICAgICAgICAgbm9kZTtcblxuICAgICAgICBtZS5zdG9yZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmlzTGVhZikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBtZS5nZXRWZG9tQ2hpbGQobWUuZ2V0SXRlbUlkKGl0ZW0uaWQpLCB2ZG9tKTtcblxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5jbHMuaW5jbHVkZXMoJ25lby1mb2xkZXItb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIE5lb0FycmF5LmFkZChub2RlLmNscywgJ25lby1mb2xkZXItb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGFzTWF0Y2gpIHtcbiAgICAgICAgICAgIG1lW3NpbGVudCA/ICdfdmRvbScgOiAndmRvbSddID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIFRyZWUgbm9kZXMgd2hpY2ggZG8gbm90IG1hdGNoIHRoZSBmaWx0ZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgVGhlIHN0b3JlIGZpZWxkIHRvIGZpbHRlciBieVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgZmlsdGVyIHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8bnVsbH0gcGFyZW50SWQgVGhlIHJvb3QgaWQgZm9yIHRoZSBjdXJyZW50IGZpbHRlciBjYWxsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcGFyZW50TWF0Y2hdPWZhbHNlIEluIGNhc2UgYSBwYXJlbnQgZm9sZGVyIG1hdGNoZXMgdGhlIGZpbHRlciwgc2hvdyBpdHMgY2hpbGQgaXRlbXNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gZmFsc2UgaWYgYXQgbGVhc3Qgb25lIGNoaWxkIGl0ZW0gaXMgZmlsdGVyZWRcbiAgICAgKi9cbiAgICBmaWx0ZXIocHJvcGVydHksIHZhbHVlLCBwYXJlbnRJZCwgcGFyZW50TWF0Y2g9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXNGaWx0ZXJlZCA9IHRydWUsXG4gICAgICAgICAgICB2YWx1ZVJlZ0V4ID0gbmV3IFJlZ0V4cCh2YWx1ZSwgJ2dpJyksXG4gICAgICAgICAgICB2ZG9tICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGNoaWxkUmV0dXJuVmFsdWUsIGRpcmVjdE1hdGNoLCBub2RlO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5zdG9yZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucGFyZW50SWQgPT09IHBhcmVudElkKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0TWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBub2RlICAgICAgICA9IG1lLmdldFZkb21DaGlsZChtZS5nZXRJdGVtSWQoaXRlbS5pZCksIHZkb20pO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5jblswXS5pbm5lckhUTUwgPSBpdGVtW3Byb3BlcnR5XS5yZXBsYWNlKHZhbHVlUmVnRXgsIG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0TWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwibmVvLWhpZ2hsaWdodC1zZWFyY2hcIj4ke21hdGNofTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNMZWFmKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUmV0dXJuVmFsdWUgPSBtZS5maWx0ZXIocHJvcGVydHksIHZhbHVlLCBpdGVtLmlkLCBkaXJlY3RNYXRjaCB8fCBwYXJlbnRNYXRjaCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdE1hdGNoIHx8IHBhcmVudE1hdGNoIHx8IGNoaWxkUmV0dXJuVmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpbHRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gaXNGaWx0ZXJlZCA/ICdub25lJyA6ICdsaXN0LWl0ZW0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGFyZW50SWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG1lLmV4cGFuZEFsbCh0cnVlKTtcbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRmlsdGVyZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldExpc3RJdGVtc1Jvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZkb20uY25bdGhpcy5zaG93Q29sbGFwc2VFeHBhbmRBbGxJY29ucyA/IDIgOiAwXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25DbGljayhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnRhcmdldC5jbHMuaW5jbHVkZXMoJ25lby10cmVlbGlzdC1tZW51LWl0ZW0nKSkge1xuICAgICAgICAgICAgdGhpcy5vbk1lbnVJdGVtQ2xpY2soZGF0YS50YXJnZXQuY2xzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLm9uQ2xpY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25JdGVtQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaXRlbXMgPSBtZS5zdG9yZS5pdGVtcyxcbiAgICAgICAgICAgIGkgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgID0gaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgcGF0aCAgPSBkYXRhLnBhdGgubWFwKGUgPT4gZS5pZCksXG4gICAgICAgICAgICBpdGVtLCByZWNvcmQsIHRtcEl0ZW0sIHZub2RlSWQ7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdG1wSXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgdm5vZGVJZCA9IG1lLmdldEl0ZW1JZCh0bXBJdGVtLmlkKTtcblxuICAgICAgICAgICAgaWYgKHBhdGguaW5jbHVkZXModm5vZGVJZCkpIHtcbiAgICAgICAgICAgICAgICByZWNvcmQgPSB0bXBJdGVtO1xuICAgICAgICAgICAgICAgIGl0ZW0gICA9IG1lLmdldFZkb21DaGlsZCh2bm9kZUlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5jbHMgJiYgaXRlbS5jbHMuaW5jbHVkZXMoJ25lby1saXN0LWZvbGRlcicpKSB7XG4gICAgICAgICAgICAgICAgTmVvQXJyYXkudG9nZ2xlKGl0ZW0uY2xzLCAnbmVvLWZvbGRlci1vcGVuJyk7XG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLm9uTGVhZkl0ZW1DbGljayhyZWNvcmQpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogVGhlIGxlYWZJdGVtQ2xpY2sgZXZlbnQgZmlyZXMgd2hlbiBhIGNsaWNrIG9jY3VycyBvbiBhIGxpc3QgaXRlbSB3aGljaCBkb2VzIG5vdCBoYXZlIGNoaWxkIGl0ZW1zLlxuICAgICAgICAgICAgICAgICAqIFBhc3NlcyB0aGUgaXRlbSByZWNvcmQgdG8gdGhlIGV2ZW50IGhhbmRsZXIuXG4gICAgICAgICAgICAgICAgICogQGV2ZW50IGxlYWZJdGVtQ2xpY2tcbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZWNvcmRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBtZS5maXJlKCdsZWFmSXRlbUNsaWNrJywgcmVjb3JkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3VwZXIub25JdGVtQ2xpY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBtZXRob2RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICovXG4gICAgb25MZWFmSXRlbUNsaWNrKHJlY29yZCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYnkgY2xpY2tzIG9uIHRoZSBjb2xsYXBzZSBvciBleHBhbmQgYWxsIGljb25zXG4gICAgICogQHBhcmFtIHtBcnJheX0gY2xzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uTWVudUl0ZW1DbGljayhjbHMpIHtcbiAgICAgICAgaWYgKGNscy5pbmNsdWRlcygnbmVvLXRyZWVsaXN0LWNvbGxhcHNlLWFsbC1pY29uJykpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VBbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kQWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRyZWUpO1xuXG5leHBvcnQge1RyZWUgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby51dGlsLkZ1bmN0aW9uXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIE5lb0Z1bmN0aW9uIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby51dGlsLkZ1bmN0aW9uJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udXRpbC5GdW5jdGlvbidcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGFyZ3MgaW5zdGVhZCBvZiBwcmVwZW5kaW5nIHRoZW1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICovXG4gICAgc3RhdGljIGJpbmRBcHBlbmQoc2NvcGUpIHtcbiAgICAgICAgY29uc3QgZm4gICA9IHRoaXMsXG4gICAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuc2xpY2UoMSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHNjb3BlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZW8uY29yZS5CYXNlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kTmFtZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVTZXF1ZW5jZSh0YXJnZXQsIG1ldGhvZE5hbWUsIGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgbWV0aG9kID0gdGFyZ2V0W21ldGhvZE5hbWVdIHx8IE5lby5lbXB0eUZuO1xuXG4gICAgICAgIHJldHVybiAodGFyZ2V0W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShzY29wZSB8fCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZE5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaW50ZXJjZXB0KHRhcmdldCwgbWV0aG9kTmFtZSwgZm4sIHNjb3BlKSB7XG4gICAgICAgIGxldCBtZXRob2QgPSB0YXJnZXRbbWV0aG9kTmFtZV0gfHwgTmVvLmVtcHR5Rm47XG5cbiAgICAgICAgcmV0dXJuICh0YXJnZXRbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IGZuLmFwcGx5KHNjb3BlIHx8IHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKE5lb0Z1bmN0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgTmVvRnVuY3Rpb247Il0sInNvdXJjZVJvb3QiOiIifQ==