self["webpackChunk"](["vendors~chunks/apps-covid19-app-mjs~chunks/docs-app-mjs"],{

/***/ "./node_modules/neo.mjs/src/button/Base.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/button/Base.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.button.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for iconPosition
         * @member {String[]} iconPositions=['top', 'right', 'bottom', 'left']
         * @protected
         * @static
         */
        iconPositions: ['top', 'right', 'bottom', 'left']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.button.Base'
         * @protected
         */
        className: 'Neo.button.Base',
        /**
         * @member {String} ntype='button'
         * @protected
         */
        ntype: 'button',
        /**
         * @member {String[]} cls=['neo-button']
         */
        cls: ['neo-button'],
        /**
         * false calls Neo.Main.setRoute()
         * @member {Boolean} editRoute=true
         */
        editRoute: true,
        /**
         * Shortcut for domListeners={click:handler}
         * A string based value assumes that the handlerFn lives inside a ComponentController
         * @member {Function|String|null} handler_=null
         */
        handler_: null,
        /**
         * The scope (this pointer) inside the handler function.
         * Points to the button instance by default.
         * @member {Object|null} handlerScope=null
         */
        handlerScope: null,
        /**
         * The CSS class to use for an icon, e.g. 'fa fa-home'
         * @member {String|null} [iconCls_=null]
         */
        iconCls_: null,
        /**
         * The color to use for an icon, e.g. '#ff0000' [optional]
         * @member {String|null} iconColor_=null
         */
        iconColor_: null,
        /**
         * The position of the icon in case iconCls has a value.
         * Valid values are: 'top', 'right', 'bottom', 'left'
         * @member {String} iconPosition_='left'
         */
        iconPosition_: 'left',
        /**
         * The pressed state of the Button
         * @member {Boolean} pressed_=false
         */
        pressed_: false,
        /**
         * Change the browser hash value on click
         * @member {String|null} route_=null
         */
        route_: null,
        /**
         * The text displayed on the button [optional]
         * @member {String} text_=''
         */
        text_: '',
        /**
         * Transforms the button tag into an a tag [optional]
         * @member {String|null} url_=null
         */
        url_: null,
        /**
         * If url is set, applies the target attribute on the top level vdom node [optional]
         * @member {String} urlTarget_='_blank'
         */
        urlTarget_: '_blank',
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            tag: 'button',
            cn : [
                {tag: 'span', cls: ['neo-button-glyph']},
                {tag: 'span', cls: ['neo-button-text']}
            ]
        }
    }}

    /**
     * Triggered after the handler config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetHandler(value, oldValue) {
        if (value) {
            let me           = this,
                domListeners = me.domListeners || [];

            domListeners.push({
                click: value,
                scope: me.handlerScope || me
            });

            me.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the iconCls config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetIconCls(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            iconNode = me.getVdomRoot().cn[0];

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(iconNode.cls, oldValue);

        if (!value || value === '') {
            iconNode.removeDom = true;
        } else {
            iconNode.removeDom = false;
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(iconNode.cls, value);
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the iconColor config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetIconColor(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            iconNode = me.getVdomRoot().cn[0];

        if (!iconNode.style) {
            iconNode.style = {};
        }

        if (value === '') {
            value = null;
        }

        iconNode.style.color = value;
        me.vdom = vdom;
    }

    /**
     * Triggered after the iconPosition config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetIconPosition(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, 'icon-' + oldValue);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, 'icon-' + value);

        this.cls = cls;
    }

    /**
     * Triggered after the pressed config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetPressed(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value === true ? 'add' : 'remove'](cls, 'pressed');
        this.cls = cls;
    }

    /**
     * Triggered after the route config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetRoute(value, oldValue) {
        if (value) {
            let me           = this,
                domListeners = me.domListeners || [];

            domListeners.push({
                click: me.changeRoute,
                scope: me
            });

            me.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the text config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetText(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            vdomRoot = me.getVdomRoot(),
            textNode = vdomRoot.cn[1];

        if (value === '') {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(me._cls,      'no-text');
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(vdomRoot.cls, 'no-text');
            textNode.removeDom = true;
        } else {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(me._cls,      'no-text');
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(vdomRoot.cls, 'no-text');
            textNode.removeDom = false;
            textNode.innerHTML = value;
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the url config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUrl(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            vdomRoot = me.getVdomRoot();

        if (value) {
            vdomRoot.href = value;
            vdomRoot.tag  = 'a';
        } else {
            delete vdomRoot.href;
            vdomRoot.tag = 'button';
        }

        me.vdom = vdom;
    }

    /**
     * Triggered after the urlTarget config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetUrlTarget(value, oldValue) {
        let me       = this,
            vdom     = me.vdom,
            vdomRoot = me.getVdomRoot();

        if (me.url) {
            vdomRoot.target = value;
        } else {
            delete vdomRoot.target;
        }

        me.vdom = vdom;
    }

    /**
     * Converts the iconCls array into a string on beforeGet
     * @returns {String}
     * @protected
     */
    beforeGetIconCls() {
        let iconCls = this._iconCls;

        if (Array.isArray(iconCls)) {
            return iconCls.join(' ');
        }

        return iconCls;
    }

    /**
     * Triggered before the iconCls config gets changed. Converts the string into an array if needed.
     * @param {Array|String|null} value
     * @param {Array|String|null} oldValue
     * @returns {Array}
     * @protected
     */
    beforeSetIconCls(value, oldValue) {
        if (value && !Array.isArray(value)) {
            value = value.split(' ');
        }

        return value;
    }

    /**
     * Triggered before the iconPosition config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    beforeSetIconPosition(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'iconPosition');
    }

    /**
     * @protected
     */
    changeRoute() {
        const me = this;

        if (me.editRoute) {
            Neo.Main.editRoute(this.route);
        } else {
            Neo.Main.setRoute({
                value: me.route
            });
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/component/Base.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/component/Base.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../manager/Component.mjs */ "./node_modules/neo.mjs/src/manager/Component.mjs");
/* harmony import */ var _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../manager/DomEvent.mjs */ "./node_modules/neo.mjs/src/manager/DomEvent.mjs");
/* harmony import */ var _util_KeyNavigation_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/KeyNavigation.mjs */ "./node_modules/neo.mjs/src/util/KeyNavigation.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony import */ var _util_Style_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/Style.mjs */ "./node_modules/neo.mjs/src/util/Style.mjs");
/* harmony import */ var _core_Util_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/Util.mjs */ "./node_modules/neo.mjs/src/core/Util.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");
/* harmony import */ var _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/VNode.mjs */ "./node_modules/neo.mjs/src/util/VNode.mjs");













/**
 * @class Neo.component.Base
 * @extends Neo.core.Base
 */
class Base extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.component.Base'
         * @protected
         */
        className: 'Neo.component.Base',
        /**
         * @member {String} ntype='component'
         * @protected
         */
        ntype: 'component',
        /**
         * The name of the App this component belongs to
         * @member {String|null} appName_=null
         */
        appName_: null,
        /**
         * True automatically mounts a component after being rendered.
         * Use this for the top level component of your app.
         * @member {Boolean} autoMount=false
         * @tutorial 02_ClassSystem
         */
        autoMount: false,
        /**
         * True automatically renders a component after being created inside the init call.
         * Use this for the top level component of your app.
         * @member {Boolean} autoRender=false
         * @see {@link Neo.component.Base#init init}
         * @tutorial 02_ClassSystem
         */
        autoRender: false,
        /**
         * manager.Focus will change this flag on focusin & out dom events
         * @member {Boolean} containsFocus_=false
         * @protected
         */
        containsFocus_: false,
        /**
         * Assign a component controller to this component (pass an imported module or the string based class name)
         * @member {Neo.controller.Component|String} controller_=null
         */
        controller_: null,
        /**
         * Disabled components will get the neo-disabled cls applied and won't receive DOM events
         * @member {Boolean} disabled_=false
         */
        disabled_: false,
        /**
         * An array of domListener configs
         * @member {Object[]|null} domListeners_=null
         * @example
         * afterSetStayOnHover(value, oldValue) {
         *     if (value) {
         *         let me           = this,
         *             domListeners = me.domListeners || [];
         *
         *         domListeners.push(
         *             {mouseenter: me.onMouseEnter, scope: me},
         *             {mouseleave: me.onMouseLeave, scope: me}
         *         );
         *
         *        me.domListeners = domListeners;
         *    }
         *}
         */
        domListeners_: null,
        /**
         * Set this config to true to dynamically import a DropZone module & create an instance
         * @member {Boolean} droppable_=false
         */
        droppable_: false,
        /**
         * @member {Neo.draggable.DropZone|null} dropZone=null
         */
        dropZone: null,
        /**
         * @member {Object} dropZoneConfig=null
         */
        dropZoneConfig: null,
        /**
         * Internal flag which will get set to true on mount
         * @member {Boolean} hasBeenMounted=false
         * @protected
         */
        hasBeenMounted: false,
        /**
         * Internal flag for vdom changes after a component got unmounted
         * (delta updates can no longer get applied & a new render call is required before re-mounting)
         * @member {Boolean} hasUnmountedVdomChanges_=false
         * @protected
         */
        hasUnmountedVdomChanges_: false,
        /**
         * Shortcut for style.height, defaults to px
         * @member {Number|String|null} height_=null
         */
        height_: null,
        /**
         * The top level innerHTML of the component
         * @member {String|null} html_=null
         */
        html_: null,
        /**
         * The unique component id
         * @member {String|null} id_=null
         */
        id_: null,
        /**
         * Internal flag which will get set to true while an update request (worker messages) is in progress
         * @member {Boolean} isVdomUpdating=false
         * @protected
         */
        isVdomUpdating: false,
        /**
         * Using the keys config will create an instance of Neo.util.KeyNavigation.
         * @see {@link Neo.util.KeyNavigation KeyNavigation}
         * @member {Object} keys_=null
         */
        keys_: null,
        /**
         * Shortcut for style.maxHeight, defaults to px
         * @member {Number|String|null} maxHeight_=null
         */
        maxHeight_: null,
        /**
         * Shortcut for style.maxWidth, defaults to px
         * @member {Number|String|null} maxWidth_=null
         */
        maxWidth_: null,
        /**
         * Shortcut for style.minHeight, defaults to px
         * @member {Number|String|null} minHeight_=null
         */
        minHeight_: null,
        /**
         * Shortcut for style.minWidth, defaults to px
         * @member {Number|String|null} minWidth_=null
         */
        minWidth_: null,
        /**
         * True in case the component is mounted to the DOM
         * @member {Boolean} mounted_=false
         * @protected
         */
        mounted_: false,
        /**
         * Internal flag which will get set to true in case an update call arrives while another update is running
         * @member {Boolean} needsVdomUpdate=false
         * @protected
         */
        needsVdomUpdate: false,
        /**
         * The parent component id or document.body
         * @member {String} parentId='document.body'
         */
        parentId: 'document.body',
        /**
         * Array of Plugin Modules and / or config objects
         * @member {Array|null} plugins_=null
         * @protected
         */
        plugins_: null,
        /**
         * True in case the component is rendering the vnode
         * @member {Boolean} rendering_=false
         * @protected
         */
        rendering_: false,
        /**
         * Set this to true for bulk updates.
         * Ensure to set it back to false afterwards.
         * @member {Boolean} silentVdomUpdate=false
         */
        silentVdomUpdate: false,
        /**
         * Top level style attributes
         * @member {Object} style={}
         */
        style: {},
        /**
         * Add tooltip config objects
         * See tooltip/Base.mjs
         * @member {Array|Object} tooltips_=null
         */
        tooltips_: null,
        /**
         * The component vnode tree. Available after the component got rendered.
         * @member {Object} vnode_=null
         * @protected
         */
        vnode_: null,
        /**
         * Shortcut for style.width, defaults to px
         * @member {Number|String|null} width_=null
         */
        width_: null,
        /**
         * Top level style attributes. Useful in case getVdomRoot() does not point to the top level DOM node.
         * @member {Object|null} wrapperStyle_=null
         */
        wrapperStyle_: null,
        /**
         * The vdom markup for this component.
         * @member {Object} _vdom={}
         */
        _vdom: {}
    }}

    /**
     * Specify a different vdom root if needed to apply the top level style attributes on a different level.
     * Make sure to use getVnodeRoot() as well, to keep the vdom & vnode trees in sync.
     * @returns {Object} The new vdom root
     */
    getVdomRoot() {
        return this.vdom;
    }

    /**
     * Specify a different vnode root if needed to apply the top level style attributes on a different level.
     * Make sure to use getVdomRoot() as well, to keep the vdom & vnode trees in sync.
     * @returns {Object} The new vnode root
     */
    getVnodeRoot() {
        return this.vnode;
    }

    /**
     * Override this method to change the order configs are applied to this instance.
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     * @returns {Object} config
     */
    mergeConfig(...args) {
        let me     = this,
            config = super.mergeConfig(...args),

            // it should be possible to set custom configs for the vdom on instance level,
            // however there will be already added attributes (e.g. id), so a merge seems to be the best strategy.
            vdom = {...me._vdom || {}, ...config.vdom || {}};

        // avoid any interference on prototype level
        // does not clone existing Neo instances
        me._vdom        = Neo.clone(vdom, true, true);
        me.cls          = config.cls;
        me._style       = config.style;
        me.wrapperStyle = Neo.clone(config.wrapperStyle, false);

        delete config.cls;
        delete config.style;
        delete config._vdom;
        delete config.vdom;
        delete config.wrapperStyle;

        return config;
    }

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);
        _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].register(this);
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        me.fire('constructed', {id: me.id}); // testing

        if (me.keys) {
            me.keys.register(me);
        }
    }

    /**
     *
     */
    init() {
        if (this.autoRender) {
            this.render();
        }
    }

    /**
     * CSS selectors to apply to the top level node of this component
     * @member {String[]} cls=['neo-component']
     */
    get cls() {
        return this._cls ? Neo.clone(this._cls) : ['neo-component'];
    }
    set cls(value) {
        value = value ? value : [];

        let me       = this,
            vdom     = me.vdom,
            vdomRoot = me.getVdomRoot(),
            oldCls;

        if (typeof value === 'string') {
            value = value.split('');
        }

        if (me.mounted) {
            oldCls = Neo.clone(me._cls);
        }

        me._cls = value;

        if (vdomRoot) {
            vdomRoot.cls = [...value];
        }

        me._vdom = vdom; // silent update

        if (me.mounted) {
            me.updateCls(value, oldCls);
        }
    }

    /**
     * Apply component based listeners
     * @member {Object} listeners={}
     */
    get listeners() {
        return this._listeners || {};
    }
    set listeners(value) {
        this._listeners = value;
    }

    /**
     * True after the component render() method was called. Also fires the rendered event.
     * @member {Boolean} rendered=false
     * @protected
     */
    get rendered() {
        return this._rendered || false;
    }
    set rendered(value) {
        let me = this;

        me._rendered = value;

        if (value === true) {
            me.fire('rendered', me.id);
        }
    }

    /**
     * Top level style attributes
     * @member {Object} style={}
     */
    get style() {
        // we need to "clone" the object, otherwise changes will get applied directly and there are no deltas
        // this only affects non vdom related style to DOM deltas
        return Neo.clone(this._style);
    }
    set style(value) {
        let me       = this,
            oldStyle = me.style; // cloned => getter

        me._style = value;
        me.updateStyle(value, oldStyle);
    }

    /**
     * The setter will handle vdom updates automatically
     * @member {Object} vdom=this._vdom
     */
    get vdom() {
        return this._vdom;
    }
    set vdom(value) {
        let me       = this,
            app      = Neo.apps[me.appName],
            vdom     = value,
            cls      = me.cls,
            height   = me.height,
            style    = me.style,
            vdomRoot = me.getVdomRoot(),
            width    = me.width,
            listenerId;

        if (vdomRoot) {
            if (cls) {
                vdomRoot.cls = cls;
            }

            if (height) {
                vdomRoot.height = height;
            }

            if (width) {
                vdomRoot.width = width;
            }

            if (style) {
                // todo: string based styles
                vdomRoot.style = Object.assign(vdomRoot.style || {}, style);
            }
        }

        // It is important to keep the vdom tree stable to ensure that containers do not lose the references to their
        // child vdom trees. The if case should not happen, but in case it does, keeping the reference and merging
        // the content over seems to be the best strategy
        if (me._vdom !== vdom) {
            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_5__["default"].warn('vdom got replaced for: ' + me.id + '. Copying the content into the reference holder object');

            Object.keys(me._vdom).forEach(key => {
                delete me._vdom[key];
            });

            Object.assign(me._vdom, vdom);
        } else {
            me._vdom = vdom;
        }

        if (!me.silentVdomUpdate) {
            if (!me.mounted && app && app.rendering === true) {
                listenerId = app.on('render', () => {
                    app.un('render', listenerId);

                    setTimeout(() => {
                        me.updateVdom(me.vdom, me.vnode);
                    }, 50);
                });
            } else if (me.mounted) {
                me.updateVdom(vdom, me.vnode);
            }

            me.hasUnmountedVdomChanges = !me.mounted && me.hasBeenMounted;
        }
    }

    /**
     * Either a string like 'color: red; background-color: blue;'
     * or an object containing style attributes
     * @param {String|Object} value
     * @returns {Object} all styles of this.el
     */
    addStyle(value) {
        if (typeof value === 'string') {
            value = _core_Util_mjs__WEBPACK_IMPORTED_MODULE_9__["default"].createStyleObject(value);
        }

        // todo: add a check if something has changed

        return this.style = Object.assign(this.style, value);
    }

    /**
     * Triggered after the disabled config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDisabled(value, oldValue) {
        let me  = this,
            cls = me.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_6__["default"][value ? 'add' : 'remove'](cls, 'neo-disabled');
        me.cls = cls;
    }

    /**
     * Registers the domListeners inside the Neo.manager.DomEvent
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    afterSetDomListeners(value, oldValue) {
        _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].updateDomListeners(this, value, oldValue);
    }

    /**
     * Triggered after the droppable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDroppable(value, oldValue) {
        let me = this;

        if (value && !me.dropZone) {
            __webpack_require__.e(/*! import() | src/draggable/DropZone-mjs.js */ "src/draggable/DropZone-mjs.js").then(__webpack_require__.bind(null, /*! ../draggable/DropZone.mjs */ "./node_modules/neo.mjs/src/draggable/DropZone.mjs")).then(module => {
                me.dropZone = Neo.create({
                    module : module.default,
                    appName: me.appName,
                    owner  : me,
                    ...me.dropZoneConfig || {}
                });
            });
        }
    }

    /**
     * Triggered after the hasUnmountedVdomChanges config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHasUnmountedVdomChanges(value, oldValue) {
        if (value || (!value && oldValue)) {
            let parentIds = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getParentIds(this),
                i         = 0,
                len       = parentIds.length,
                parent;

            for (; i < len; i++) {
                parent = Neo.getComponent(parentIds[i]);

                if (parent) {
                    parent._hasUnmountedVdomChanges = value; // silent update
                }
            }
        }
    }

    /**
     * Triggered after the height config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetHeight(value, oldValue) {
        this.changeVdomRootKey('height', value);
    }

    /**
     * Triggered after the html config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetHtml(value, oldValue) {
        this.changeVdomRootKey('html', value);
    }

    /**
     * Triggered after the id config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetId(value, oldValue) {
        this.changeVdomRootKey('id', value);
    }

    /**
     * Triggered after the maxHeight config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetMaxHeight(value, oldValue) {
        this.changeVdomRootKey('maxHeight', value);
    }

    /**
     * Triggered after the maxWidth config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetMaxWidth(value, oldValue) {
        this.changeVdomRootKey('maxWidth', value);
    }

    /**
     * Triggered after the minHeight config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetMinHeight(value, oldValue) {
        this.changeVdomRootKey('minHeight', value);
    }

    /**
     * Triggered after the minWidth config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetMinWidth(value, oldValue) {
        this.changeVdomRootKey('minWidth', value);
    }

    /**
     * Triggered after the mounted config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetMounted(value, oldValue) {
        if (oldValue !== undefined) {
            let me = this;

            if (value) {
                me.hasBeenMounted = true;

                if (me.domListeners && me.domListeners.length > 0) {
                    // todo: the main thread reply of mount arrives after pushing the task into the queue which does not ensure the dom is mounted
                    setTimeout(() => {
                        _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].mountDomListeners(me);
                    }, 300);
                }

                me.fire('mounted', me.id);
            }
        }
    }

    /**
     * Triggered after the tooltips config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetTooltips(value, oldValue) {
        if (value) {
            let me = this;

            if (Neo.ns('Neo.tooltip.Base')) {
                me.createTooltips(value);
            } else {
                __webpack_require__.e(/*! import() | src/tooltip/Base */ "src/tooltip/Base").then(__webpack_require__.bind(null, /*! ../tooltip/Base.mjs */ "./node_modules/neo.mjs/src/tooltip/Base.mjs")).then((module) => {
                        me.createTooltips(value);
                    }
                );
            }
        }
    }

    /**
     * Triggered after the vnode config got changed
     * @param {Object} value
     * @param {Object|null} oldValue
     * @protected
     */
    afterSetVnode(value, oldValue) {
        if (oldValue !== undefined) {
            this.syncVnodeTree();
        }
    }

    /**
     * Triggered after the width config got changed
     * @param {Number|String|null} value
     * @param {Number|String|null} oldValue
     * @protected
     */
    afterSetWidth(value, oldValue) {
        this.changeVdomRootKey('width', value);
    }

    /**
     * Triggered after the wrapperStyle config got changed
     * @param {Object} value
     * @param {Object} oldValue
     * @protected
     */
    afterSetWrapperStyle(value, oldValue) {
        if (!(!value && oldValue === undefined)) {
            let me   = this,
                vdom = me.vdom;

            if (!me.vdom.id) {
                vdom.style = value;
                me.vdom = vdom;
            } else {
                me.updateStyle(value, oldValue, me.vdom.id);
            }
        }
    }

    /**
     * Triggered when accessing the wrapperStyle config
     * @param {Object} value
     * @protected
     */
    beforeGetWrapperStyle(value) {
        return {...Object.assign(this.vdom.style || {}, value)};
    }

    /**
     * Triggered when accessing the controller config
     * @param {Object} value
     * @protected
     */
    beforeGetController(value) {
        return value && Neo.get(value);
    }

    /**
     * Triggered before the controller config gets changed.
     * Creates a ComponentController instance if needed.
     * @param {Object} value
     * @param {Object} oldValue
     * @returns {String} id
     * @protected
     */
    beforeSetController(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        value = _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, null, {
            view: this
        });

        return value && value.id;
    }

    /**
     * Triggered before the domListeners config gets changed.
     * @param {Object} value
     * @param {Object} oldValue
     * @protected
     */
    beforeSetDomListeners(value, oldValue) {
        if (Neo.isObject(value)) {
            value = [value];
        }

        return value || [];
    }

    /**
     * Triggered before the keys config gets changed.
     * Creates a KeyNavigation instance if needed.
     * @param {Object} value
     * @param {Object} oldValue
     * @protected
     */
    beforeSetKeys(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        if (value) {
            value = _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, _util_KeyNavigation_mjs__WEBPACK_IMPORTED_MODULE_4__["default"], {
                keys: value
            });
        }

        return value;
    }

    /**
     * Triggered before the plugins config gets changed.
     * @param {Array} value
     * @param {Array} oldValue
     * @protected
     */
    beforeSetPlugins(value, oldValue) {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                value[index] = _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(item, null, {
                    owner: this
                });
            });
        }

        return value;
    }

    /**
     * Changes the value of a vdom object attribute or removes it in case it has no value
     * @param {String} key
     * @param {Array|Number|Object|String|null} value
     */
    changeVdomRootKey(key, value) {
        let me   = this,
            vdom = me.vdom;

        if (value) {
            me.getVdomRoot()[key] = value;
        } else {
            delete me.getVdomRoot()[key];
        }

        me.vdom = vdom;
    }

    /**
     * Creates the tooltip instances
     * @param {Array|Object} value
     * @protected
     */
    createTooltips(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }

        let me       = this,
            tooltips = [],
            tip;

        value.forEach(item => {
            // todo: check for existing tooltips

            tip = Neo.create('Neo.tooltip.Base', {
                appName    : me.appName,
                componentId: me.id,
                ...item
            });

            tooltips.push(tip);
        });

        me._tooltips = tooltips; // silent update
    }

    /**
     * Unregisters this instance from the ComponentManager
     * @param {Boolean} [updateParentVdom=false] true to remove the component from the parent vdom => real dom
     * @param {Boolean} [silent=false] true to update the vdom silently (useful for destroying multiple child items in a row)
     * todo: unregister events
     */
    destroy(updateParentVdom=false, silent=false) {
        let me = this,
            parent, parentVdom;

        if (updateParentVdom && me.parentId) {
            if (me.parentId === 'document.body') {
                Neo.currentWorker.promiseMessage('main', {
                    action: 'updateDom',
                    deltas: [{action: 'removeNode', id: me.vdom.id}]
                });
            } else {
                parent     = Neo.getComponent(me.parentId);
                parentVdom = parent.vdom;

                _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__["default"].removeVdomChild(parentVdom, me.vdom.id);
                parent[silent ? '_vdom' : 'vdom'] = parentVdom;
            }
        }

        _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].unregister(this);

        super.destroy();
    }

    /**
     * Convenience shortcut for Neo.manager.Component.down
     * @param {Object|String} config
     * @returns {Neo.core.Base} The matching instance or null
     */
    down(config) {
        return _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].down(this.id, config);
    }

    /**
     * Calls focus() on the top level DOM node of this component or on a given node via id
     * @param {String} [id]
     */
    focus(id) {
        let me = this;

        // remote method access
        Neo.main.DomAccess.focus({
            id: id || me.id
        }).then(data => {
            // console.log('focus received: ' + id || me.id);
        }).catch(err => {
            console.log('Error attempting to receive focus for component', err, me);
        });
    }

    /**
     * Returns this.controller or the closest parent controller
     * @param {String} [ntype]
     * @returns {Neo.controller.Base|null}
     */
    getController(ntype) {
        let controller = this.controller,
            i, len, parents;

        if (controller && (!ntype || ntype === controller.ntype)) {
            return controller;
        }

        parents = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getParents(this);
        i       = 0;
        len     = parents.length;

        for (; i < len; i++) {
            if (parents[i].controller && (!ntype || ntype === parents[i].controller.ntype)) {
                return parents[i].controller;
            }
        }

        return null;
    }

    /**
     *
     * @param {Object|String} opts
     * @returns {Neo.plugin.Base|null}
     */
    getPlugin(opts) {
        opts = typeof opts !== 'string' ? opts : {id: opts};

        let me = this,
            hasMatch;

        for (const plugin of me.plugins || []) {
            hasMatch = true;

            for (const key in opts) {
                if (plugin[key] !== opts[key]) {
                    hasMatch = false;
                    break;
                }
            }

            if (hasMatch) {
                return plugin;
            }
        }

        return null;
    }

    /**
     * Walks up the vdom tree and returns the closest theme found
     * @returns {String}
     */
    getTheme() {
        let me         = this,
            themeMatch = 'neo-theme-',
            app, mainView, parentNodes;

        for (const item of me.cls || []) {
            if (item.startsWith(themeMatch)) {
                return item;
            }
        }

        app      = Neo.apps[me.appName];
        mainView = app && app.mainViewInstance;

        if (mainView) {
            parentNodes = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__["default"].getParentNodes(mainView.vdom, me.id);

            for (const node of parentNodes || []) {
                for (const item of node.cls || []) {
                    if (item.startsWith(themeMatch)) {
                        return item;
                    }
                }
            }
        }

        return Neo.config.themes && Neo.config.themes[0];
    }

    /**
     * Search a vdom child node by id for a given vdom tree
     * @param {String} id
     * @param {Object} [vdom]
     * @returns {Object}
     */
    getVdomChild(id, vdom) {
        let node = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__["default"].findVdomChild(vdom || this.vdom, id);
        return node && node.vdom;
    }

    /**
     * Can get called after the component got rendered. See the autoMount config as well.
     */
    mount() {
        let me = this,
            child, childIds;

        if (!me.vnode) {
            throw new Error('Component vnode must be generated before mounting, use Component.render()');
        }

        // In case the component was already mounted, got unmounted and received vdom changes afterwards,
        // a new render() call is mandatory since delta updates could not get applied.
        // We need to clear the hasUnmountedVdomChanges state for all child components
        if (me.hasUnmountedVdomChanges) {
            // todo: the hasUnmountedVdomChanges flag changes should happen on render
            me.hasUnmountedVdomChanges = false;

            childIds = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getChildIds(me.vnode);

            childIds.forEach(id => {
                child = Neo.getComponent(id);

                if (child) {
                    child._hasUnmountedVdomChanges = false; // silent update
                }
            });
            // end todo

            me.render(true);
        } else {
            // console.log('mount', me.parentId, me.id);

            Neo.currentWorker.promiseMessage('main', {
                action     : 'mountDom',
                id         : me.id,
                html       : me.vnode.outerHTML,
                parentId   : me.parentId,
                parentIndex: me.parentIndex
            }).then(() => {
                me.mounted = true;
            });
        }
    }

    /**
     * Triggered by manager.Focus
     * @name onFocusEnter
     * @function
     * @param {Array} path dom element ids upwards
     */

    /**
     * Triggered by manager.Focus
     * @name onFocusLeave
     * @function
     * @param {Array} path dom element ids upwards
     */

    /**
     * Triggered by manager.Focus
     * @name onFocusMove
     * @function
     * @param {Object} opts
     * @param {Array}  opts.newPath dom element ids upwards
     * @param {Array}  opts.oldPath dom element ids upwards
     */

    /**
     * Gets called from the render() promise success handler
     * @param {Object} data
     * @param {Boolean} autoMount Mount the DOM after the vnode got created
     * @protected
     */
    onRender(data, autoMount) {
        let me  = this,
            app = Neo.apps[me.appName];

        me.rendering = false;

        // if app is a check to see if the Component got destroyed while rendering => before onRender got triggered
        if (app) {
            if (!app.rendered) {
                app.rendering = false;
                app.rendered  = true;
                app.fire('render');
            }

            me.vnode = data;

            let childIds  = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getChildIds(data),
                i         = 0,
                len       = childIds.length,
                child;

            for (; i < len; i++) {
                child = Neo.getComponent(childIds[i]);

                if (child) {
                    child.rendered = true;
                }
            }

            me._rendered = true; // silent update
            me.fire('rendered', me.id);

            console.log('rendered: ' + me.appName + ' ' + me.id, me);

            if (autoMount) {
                me.mounted = true;
            }
        }
    }

    /**
     * Promise based vdom update
     * @param {Object} [vdom=this.vdom]
     * @param {Neo.vdom.VNode} [vnode= this.vnode]
     */
    promiseVdomUpdate(vdom=this.vdom, vnode=this.vnode) {
        let me = this;

        // todo: updateVdom() should handle this
        // It is important to keep the vdom tree stable to ensure that containers do not lose the references to their
        // child vdom trees. The if case should not happen, but in case it does, keeping the reference and merging
        // the content over seems to be the best strategy
        if (me._vdom !== vdom) {
            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_5__["default"].warn('vdom got replaced for: ' + me.id + '. Copying the content into the reference holder object');

            Object.keys(me._vdom).forEach(key => {
                delete me._vdom[key];
            });

            Object.assign(me._vdom, vdom);
        } else {
            me._vdom = vdom;
        }

        return new Promise((resolve, reject) => {
            if (me.mounted) {
                me.updateVdom(vdom, vnode, resolve, reject);
            } else {
                resolve();
            }
        });
    }

    /**
     * Either a string like 'color' or an array containing style attributes to remove
     * @param {String|Array} value camelCase only
     * @returns {Object} all styles of this.el
     */
    removeStyle(value) {
        if (typeof value === 'string') {
            value = [value];
        }

        let style    = this.style,
            doUpdate = false;

        Object.entries(style).forEach(key => {
            if (value.indexOf(key) > -1) {
                delete style[key];
                doUpdate = true;
            }
        });

        if (doUpdate) {
            this.style = style;
        }

        return style;
    }

    /**
     * Creates the vnode tree for this component and mounts the component in case
     * - you pass true for the mount param
     * - or the autoMount config is set to true
     * @param {Boolean} [mount] Mount the DOM after the vnode got created
     */
    render(mount) {
        let me        = this,
            autoMount = mount || me.autoMount,
            app       = Neo.apps[me.appName];

        me.rendering = true;

        if (!app.rendered) {
            app.rendering = true;
        }

        if (me.vdom) {
            Neo.vdom.Helper.create({
                appName    : me.appName,
                autoMount  : autoMount,
                cls        : me.cls,
                parentId   : autoMount ? me.parentId    : undefined,
                parentIndex: autoMount ? me.parentIndex : undefined,
                style      : me.style,
                ...me.vdom
            }).then(data => {
                me.onRender(data, autoMount);
            });
        }
    }

    /**
     * Change multiple configs at once, ensuring that all afterSet methods get all new assigned values
     * @param {Object} values={}
     * @param {Boolean} [silent=false]
     */
    set(values={}, silent=false) {
        let me   = this,
            vdom = me.vdom;

        me.silentVdomUpdate = true;

        super.set(values);

        me.silentVdomUpdate = false;

        if (silent) {
            me._vdom = vdom;
        } else {
            return me.promiseVdomUpdate();
        }
    }

    /**
     * Convenience shortcut calling set() with the silent flag
     * @param {Object} values={}
     */
    setSilent(values={}) {
        return this.set(values, true);
    }

    /**
     * Placeholder method for util.VDom.syncVdomIds to allow overriding (disabling) it
     * @param {Neo.vdom.VNode} [vnode=this.vnode]
     * @param {Object} [vdom=this.vdom]
     */
    syncVdomIds(vnode=this.vnode, vdom=this.vdom) {
        _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__["default"].syncVdomIds(vnode, vdom);
    }

    /**
     * Placeholder method for util.VDom.syncVdomIds to allow overriding (disabling) it
     * @param {Neo.vdom.VNode} [vnode=this.vnode]
     */
    syncVnodeTree(vnode=this.vnode) {
        let me    = this,
            debug = false,
            childVnode, start;

        if (debug) {
            start = performance.now();
        }

        me.syncVdomIds();

        // delegate the latest node updates to all possible child components found inside the vnode tree
        _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getChildren(me).forEach(component => {
            childVnode = _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_11__["default"].findChildVnode(me.vnode, component.vdom.id);

            if (childVnode) {
                component._vnode = childVnode.vnode; // silent update

                if (!component.rendered) {
                    component._rendered = true;
                    component.fire('rendered', component.id);
                }

                component.mounted = true;
            } else {
                console.warn('syncVnodeTree: Could not replace the child vnode for', component.id);
            }
        });

        // console.log(me.vnode, me.mounted);

        // keep the vnode parent tree in sync
        _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].getParents(me).forEach((component, index) => {
            if (!me.vnode) {
                if (index === 0 && !_util_VNode_mjs__WEBPACK_IMPORTED_MODULE_11__["default"].removeChildVnode(component.vnode, me.id)) {
                    // This can fail, in case the vnode is already removed (not an issue, better safe than sorry)
                    // console.warn('syncVnodeTree: Could not remove the parent vnode for', me.id, component);
                }
            }

            // check for dynamically rendered components which get inserted into the component tree
            else if (index === 0 && me.vnode.outerHTML) {
                // console.log('dyn item', me.vnode, me.parentIndex);
                component.vnode.childNodes.splice(me.parentIndex || 0, 0, me.vnode);
            }

            else if (!_util_VNode_mjs__WEBPACK_IMPORTED_MODULE_11__["default"].replaceChildVnode(component.vnode, me.vnode.id, me.vnode)) {
                // todo: can happen for dynamically inserted container items
                // console.warn('syncVnodeTree: Could not replace the parent vnode for', me.vnode.id, component);
            }
        });

        if (debug) {
            let end = performance.now();
            console.log('syncVnodeTree', me.id, end - start);
        }

    }

    /**
     * Removes the component DOM
     */
    unmount() {
        let me = this;

        Neo.currentWorker.promiseMessage('main', {
            action: 'updateDom',
            deltas: [{
                action: 'removeNode',
                id    : me.id
            }]
        }).then(() => {
            me.mounted = false;
        }).catch(err => {
            console.log('Error attempting to unmount component', err, me);
        });
    }

    /**
     * Convenience shortcut for Neo.manager.Component.up
     * @param {Object|String} config
     * @returns {Neo.core.Base} The matching instance or null
     */
    up(config) {
        return _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].up(this.id, config);
    }

    /**
     * Delta updates for the cls config. Gets called after the cls config gets changed in case the component is mounted.
     * @param {Array} cls
     * @param {Array} oldCls
     * @protected
     */
    updateCls(cls, oldCls) {
        let me    = this,
            vnode = me.vnode,
            opts;

        if (!_util_Array_mjs__WEBPACK_IMPORTED_MODULE_6__["default"].isEqual(cls, oldCls)) {
            if (vnode) {
                vnode.className = cls; // keep the vnode in sync
                me.vnode = vnode;
            }

            opts = {
                action: 'updateDom',
                deltas: [{
                    id : me.id,
                    cls: {
                        add   : Neo.util.Array.difference(cls, oldCls),
                        remove: Neo.util.Array.difference(oldCls, cls)
                    }
                }]
            };

            if (Neo.currentWorker.isSharedWorker) {
                opts.appName = me.appName;
            }

            Neo.currentWorker.promiseMessage('main', opts).then(() => {
                //console.log(me.vnode);
            }).catch(err => {
                console.log('Error attempting to update Component cls', err, me);
            });
        }
    }

    /**
     * Creates the style deltas for newValue & oldValue and applies them directly to the DOM.
     * @param {Object|String} newValue
     * @param {Object|String} oldValue
     * @param {String} [id=this.id]
     * @protected
     */
    updateStyle(newValue, oldValue, id=this.id) {
        let me    = this,
            delta = _util_Style_mjs__WEBPACK_IMPORTED_MODULE_8__["default"].compareStyles(newValue, oldValue),
            vdom  = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_10__["default"].findVdomChild(me.vdom, id),
            vnode = me.vnode && _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_11__["default"].findChildVnode(me.vnode, id),
            opts;

        if (delta) {
            vdom.vdom.style = newValue; // keep the vdom in sync

            if (vnode) {
                vnode.vnode.style = newValue; // keep the vnode in sync

                opts = {
                    action: 'updateDom',
                    deltas: [{
                        id   : id,
                        style: delta
                    }]
                };

                if (Neo.currentWorker.isSharedWorker) {
                    opts.appName = me.appName;
                }

                Neo.currentWorker.sendMessage('main', opts);
            }
        }
    }

    /**
     * Gets called after the vdom config gets changed in case the component is already mounted (delta updates).
     * @param {Object} vdom
     * @param {Neo.vdom.VNode} vnode
     * @param {function} [resolve] used by promiseVdomUpdate()
     * @param {function} [reject] used by promiseVdomUpdate()
     * @protected
     */
    updateVdom(vdom, vnode, resolve, reject) {
        let me = this,
            opts;

        // console.log('updateVdom', me.id, Neo.clone(vdom, true), Neo.clone(vnode, true));
        // console.log('updateVdom', me.isVdomUpdating);

        if (me.isVdomUpdating) {
            me.needsVdomUpdate = true;
        } else {
            me.isVdomUpdating = true;

            opts = {
                vdom : vdom,
                vnode: vnode
            };

            if (Neo.currentWorker.isSharedWorker) {
                opts.appName = me.appName;
            }

            Neo.vdom.Helper.update(opts).then(data => {
                // console.log('Component vnode updated', data);
                me.vnode          = data.vnode;
                me.isVdomUpdating = false;

                if (resolve) {
                    resolve();
                }

                if (me.needsVdomUpdate) {
                    me.needsVdomUpdate = false;
                    me.vdom = me.vdom;
                }
            }).catch(err => {
                console.log('Error attempting to update component dom', err, me);
                me.isVdomUpdating = false;

                if (reject) {
                    reject();
                }
            });
        }
    }
}

/**
 * manager.Focus fires the event when the component id is included inside the dom id path
 * @event focusEnter
 * @param {Array} path dom element ids upwards
 */

/**
 * manager.Focus fires the event when the component id is not included inside the dom id path
 * @event focusLeave
 * @param {Array} path dom element ids upwards
 */

/**
 * manager.Focus fires the event when the component id is included inside the dom id path, but the path itself changed
 * @event focusMove
 * @param {Object} opts
 * @param {Array}  opts.newPath dom element ids upwards
 * @param {Array}  opts.oldPath dom element ids upwards
 */

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/component/Label.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/component/Label.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Label; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * Convenience class to render a label with a text
 * @class Neo.component.Label
 * @extends Neo.component.Base
 */
class Label extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.component.Label'
         * @protected
         */
        className: 'Neo.component.Label',
        /**
         * @member {String} ntype='label'
         * @protected
         */
        ntype: 'label',
        /**
         * @member {String[]} cls=['neo-label']
         */
        cls: ['neo-label'],
        /**
         * @member {String} text_=''
         */
        text_: '',
        /**
         * @member {Object} _vdom={tag: 'label'}
         */
        _vdom: {
            tag      : 'label',
            draggable: false
        }
    }}

    /**
     * Triggered after the text config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetText(value, oldValue) {
        let vdom = this.vdom;
        vdom.html = value;
        this.vdom = vdom;
    }
}

Neo.applyClassConfig(Label);



/***/ }),

/***/ "./node_modules/neo.mjs/src/container/Base.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/container/Base.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _layout_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/Base.mjs */ "./node_modules/neo.mjs/src/layout/Base.mjs");
/* harmony import */ var _layout_Card_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/Card.mjs */ "./node_modules/neo.mjs/src/layout/Card.mjs");
/* harmony import */ var _layout_Fit_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layout/Fit.mjs */ "./node_modules/neo.mjs/src/layout/Fit.mjs");
/* harmony import */ var _layout_HBox_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../layout/HBox.mjs */ "./node_modules/neo.mjs/src/layout/HBox.mjs");
/* harmony import */ var _layout_VBox_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../layout/VBox.mjs */ "./node_modules/neo.mjs/src/layout/VBox.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");









/**
 * @class Neo.container.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.container.Base'
         * @protected
         */
        className: 'Neo.container.Base',
        /**
         * @member {String} ntype='container'
         * @protected
         */
        ntype: 'container',
        /**
         * @member {String[]} cls=['neo-container']
         */
        cls: ['neo-container'],
        /**
         * @member {Object} itemDefaults_=null
         */
        itemDefaults_: null,
        /**
         * An array of config objects|instances|modules for each child component
         * @member {Object[]} items_=[]
         * @example
         * import Button      from '../button/Base.mjs';
         * import MyRedButton from 'myapp/MyRedButton.mjs';
         * import Toolbar     from '../container/Toolbar.mjs';
         *
         * let myButton = Neo.create(Button, {
         *     text: 'Button1'
         * });
         *
         * Neo.create(Toolbar, {
         *     //...
         *     items: [
         *         myButton,              // passed instance
         *         {
         *             ntype: 'button',   // by ntype
         *             text : 'Button 2'
         *         },
         *         {
         *             module: Button,    // by imported module
         *             text  : 'Button 3'
         *         },
         *         MyRedButton            // you can drop imported modules directly into the items array
         *     ]
         * });
         */
        items_: [],
        /**
         * @member {Object} layout_={ntype: 'vbox', align: 'stretch'}
         */
        layout_: {
            ntype: 'vbox',
            align: 'stretch'
        },
        /**
         * @member {Object} _vdom={cn: []}
         */
        _vdom: {
            cn: []
        }
    }}

    /**
     * Override this method to change the order configs are applied to this instance.
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     * @returns {Object} config
     */
    mergeConfig(...args) {
        let me     = this,
            config = super.mergeConfig(...args);

        // avoid any interference on prototype level
        // does not clone existing Neo instances

        if (config.itemDefaults) {
            me._itemDefaults = Neo.clone(config.itemDefaults, true, true);
            delete config.itemDefaults;
        }

        if (config.items) {
            me._items = Neo.clone(config.items, true, true);
            delete config.items;
        }

        return config;
    }

    /**
     *
     */
    onConstructed() {
        let me = this;

        // in case the Container does not have a layout config, the setter won't trigger
        me._layout = me.createLayout(me.layout);
        me._layout.applyRenderAttributes();

        super.onConstructed();

        me.parseItemConfigs(me.items);
        me.createItems();
    }

    /**
     * Inserts an item or array of items at the last index
     * @param {Object|Array} item
     * @returns {Neo.component.Base|Neo.component.Base[]}
     */
    add(item) {
        let me = this;
        return me.insert(me.items ? me.items.length : 0, item);
    }

    /**
     * Triggered after the appName config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetAppName(value, oldValue) {
        if (value && this.items) {
            this.items.forEach(item => {
                if (Neo.isObject(item)) {
                    item.appName = value;
                }
            });
        }
    }

    /**
     *
     * @param {Neo.layout.Base} value
     * @param {Neo.layout.Base} oldValue
     * @protected
     */
    afterSetLayout(value, oldValue) {
        let me = this;

        if (me.rendered) {
            oldValue.removeRenderAttributes();
            value.applyRenderAttributes();

            me.items.forEach((item, index) => {
                oldValue.removeChildAttributes(item, index);
                value.applyChildAttributes(item, index);
            });
        }
    }

    /**
     * Triggered after the mounted config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetMounted(value, oldValue) {
        super.afterSetMounted(value, oldValue);

        if (oldValue !== undefined) {
            let items = this.items,
                i     = 0,
                len   = items.length;

            for (; i < len; i++) {
                if (!items[i].vdom.removeDom) {
                    items[i].mounted = value;
                }
            }
        }
    }

    /**
     * Triggered after the rendering config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetRendering(value, oldValue) {
        if (oldValue !== undefined) {
            let items = this.items,
                i     = 0,
                len   = items.length;

            for (; i < len; i++) {
                if (!items[i].vdom.removeDom) {
                    items[i].rendering = value;
                }
            }
        }
    }

    /**
     *
     * @param {Object|String} value
     * @returns {Neo.layout.Base}
     * @protected
     */
    beforeSetLayout(value) {
        return this.createLayout(value);
    }

    /**
     *
     * @protected
     */
    createItems() {
        let me       = this,
            items    = me._items,
            defaults = me.itemDefaults,
            layout   = me.layout,
            vdom     = me.vdom,
            vdomRoot = me.getVdomRoot();

        vdomRoot.cn = [];

        items.forEach((item, index) => {
            if (item.constructor.isClass && item instanceof Neo.core.Base) {
                Object.assign(item, {
                    appName : me.appName,
                    parentId: me.id
                });
            } else if(item.isClass) {
                item = Neo.create(item, {
                    appName : me.appName,
                    parentId: me.id
                });
            } else if (typeof item === 'string') {
                item = Neo.ntype({
                    ntype  : 'component',
                    appName: me.appName,
                    vdom   : {innerHTML: item}
                });
            } else {
                if (defaults) {
                    Neo.assignDefaults(item, defaults);
                }

                if (item.module) {
                    item.className = item.module.prototype.className;
                }

                Object.assign(item, {
                    appName : me.appName,
                    parentId: me.id,
                    style   : item.style || {}
                });

                item = Neo[item.className ? 'create' : 'ntype'](item);
            }

            items[index] = item;

            layout.applyChildAttributes(item, index);

            vdomRoot.cn.push(item.vdom);
        });

        me.vdom = vdom;
    }

    /**
     *
     * @param {Object|String|Neo.layout.Base} value
     * @protected
     * @returns {Neo.layout.Base}
     */
    createLayout(value) {
        let me = this;

        if (value) {
            if (value instanceof _layout_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] && value.isLayout) {
                value.containerId = me.id;
            } else {
                value = me.parseLayoutClass(value);
                value.containerId = me.id;
                value = Neo.ntype(value);
            }
        }

        return value;
    }

    /**
     * Destroys all components inside this.items before the super() call.
     * @param {Boolean} [updateParentVdom=false] true to remove the component from the parent vdom => real dom
     * @param {Boolean} [silent=false] true to update the vdom silently (useful for destroying multiple child items in a row)
     */
    destroy(updateParentVdom=false, silent=false) {
        this.items.forEach(item => {
            item.destroy(false, true);
        });

        super.destroy(updateParentVdom, silent);
    }

    /**
     * Specify a different vdom items root if needed (useful in case this container uses a wrapper node).
     * @returns {Object} The new vdom items root
     */
    getVdomItemsRoot() {
        return this.vdom.cn;
    }

    /**
     * Finds the index of a direct child component inside this.items.
     * @param {Neo.component.Base|String} itemId Either the item reference or the item id
     * @returns {Number} -1 in case no match was found
     */
    indexOf(itemId) {
        let me  = this,
            i   = 0,
            len = me.items && me.items.length || 0;

        if (!Neo.isString(itemId)) {
            itemId = itemId.id;
        }

        for (; i < len; i++) {
            if (me.items[i].id === itemId) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Inserts an item or array of items at a specific index
     * @param {Number} index
     * @param {Object|Array} item
     * @returns {Neo.component.Base|Neo.component.Base[]}
     */
    insert(index, item) {
        let me    = this,
            items = me.items,
            vdom  = me.vdom,
            cn, i, len;

        if (Array.isArray(item)) {
            i   = 0;
            len = item.length;

            for (; i < len; i++) {
                // todo: render is async, ensure the order of items is correct

                // insert the array backwards
                item[i] = me.insert(item[len - 1], index);
            }
        } else if (typeof item === 'object') {
            if (!(item instanceof Neo.component.Base)) {
                if (item.module) {
                    item.className = item.module.prototype.className;
                }

                item = {
                    ...me.itemDefaults || {},

                    appName    : me.appName,
                    autoMount  : me.mounted,
                    parentId   : me.id,
                    parentIndex: index,

                    ...item
                };

                item = Neo[item.className ? 'create' : 'ntype'](item);
            } else {
                Object.assign(item, {
                    appName    : me.appName,
                    parentId   : me.id,
                    parentIndex: index
                });
            }

            // added the true param => for card layouts, we do not want a dynamically inserted cmp to get removed right away
            // since it will most likely get activated right away
            me.layout.applyChildAttributes(item, index, true);

            items.splice(index, 0, item);

            me.items = items;

            cn = vdom.cn || vdom.childNodes || vdom.children;

            cn.splice(index, 0, item.vdom);

            me.promiseVdomUpdate().then(() => {
                me.fire('insert', {
                    index: index,
                    item : item
                });
            });
        }

        return item;
    }

    /**
     * Moves an existing item to a new index
     * @param {Number} fromIndex
     * @param {Number} toIndex
     * @returns {Neo.component.Base}
     */
    moveTo(fromIndex, toIndex) {
        let me   = this,
            item = me.items[fromIndex];

        if (fromIndex !== toIndex) {
            me.switchItems(me.items[toIndex].id, item.id);
        }

        return item;
    }

    parseItemConfigs(items) {
        let me = this;

        items.forEach(item => {
            Object.entries(item).forEach(([key, value]) => {
                if (key === 'items') {
                    me.parseItemConfigs(value);
                } else if (typeof value === 'string' && value.startsWith('@config:')) {
                    value = value.substr(8);

                    if (!me[value]) {
                        _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_6__["default"].logError('The used @config does not exist:', value, me);
                    } else {
                        item[key] = me[value];
                    }
                }
            });
        });
    }

    /**
     *
     * @param {Object|String} config
     * @protected
     * @returns {Object} layoutConfig
     */
    parseLayoutClass(config) {
        if (Neo.isObject(config)) {
            if (config.ntype.indexOf('layout-') < 0) {
                config.ntype = 'layout-' + config.ntype;
            }
        }
        else if (config.indexOf('layout-') < 0) {
            config = {
                ntype: 'layout-' + config
            };
        } else {
            config = {
                ntype: config
            };
        }

        return config;
    }

    /**
     * Removes a container item by reference
     * @param {Neo.component.Base} component
     * @param {Boolean} [destroyItem=true]
     * @param {Boolean} [silent=false]
     */
    remove(component, destroyItem=true, silent=false) {
        let items = [...this.items],
            i     = 0,
            len   = items.length;

        for (; i < len; i++) {
            if (items[i].id === component.id) {
                this.removeAt(i, destroyItem, silent);
            }
        }
    }

    /**
     * Removes a container item at a given index
     * @param {Number} index
     * @param {Boolean} [destroyItem=true]
     * @param {Boolean} [silent=false]
     */
    removeAt(index, destroyItem=true, silent=false) {
        let me    = this,
            items = me.items,
            vdom  = me.vdom,
            cn, item;

        if (index >= items.length) {
            Neo.warn('Container.removeAt: index >= items.length. ' + me.id);
        } else {
            item = items[index];

            // console.log('remove item', item.id);

            items.splice(index, 1);

            cn = vdom.cn || vdom.childNodes || vdom.children;

            cn.splice(index, 1);

            me[silent && !destroyItem ? '_vdom' : 'vdom'] = vdom;

            if (destroyItem) {
                item.destroy(true);
            } else {
                item.mounted = false;
            }
        }
    }

    /**
     * Switches the position of 2 direct child items
     * @param {String} item1id
     * @param {String} item2id
     */
    switchItems(item1id, item2id) {
        let me         = this,
            item1Index = me.indexOf(item1id),
            item2Index = me.indexOf(item2id),
            vdom       = me.vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_7__["default"].move(me.items,              item2Index, item1Index);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_7__["default"].move(me.getVdomItemsRoot(), item2Index, item1Index);

        me.vdom = vdom;
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/container/Panel.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/container/Panel.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Panel; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _Toolbar_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar.mjs */ "./node_modules/neo.mjs/src/container/Toolbar.mjs");



/**
 * An extended Container supporting multiple docked header toolbars
 * @class Neo.container.Panel
 * @extends Neo.container.Base
 */
class Panel extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.container.Panel'
         * @protected
         */
        className: 'Neo.container.Panel',
        /**
         * @member {String} ntype='panel'
         * @protected
         */
        ntype: 'panel',
        /**
         * @member {String[]} cls=['neo-panel','neo-container']
         */
        cls: ['neo-panel', 'neo-container'],
        /**
         * @member {Object} containerConfig=null
         */
        containerConfig: null,
        /**
         * @member {Object} headerDefaults=null
         */
        headerDefaults: null,
        /**
         * @member {Array} headers=null
         */
        headers: null,
        /**
         * @member {Object} items={ntype: 'vbox', align: 'stretch'}
         */
        _layout: {
            ntype: 'vbox',
            align: 'stretch'
        },
        /**
         * @member {Boolean} verticalHeadersFirst=false
         */
        verticalHeadersFirst: false
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this,
            hf = config && config.verticalHeadersFirst === true || me.verticalHeadersFirst === true;

        if (hf) {
            me.layout = {
                ntype: 'hbox',
                align: 'stretch'
            };
        }
    }

    /**
     *
     */
    createItems() {
        let me                   = this,
            hf                   = me.verticalHeadersFirst === false,
            headers              = me.headers || [],
            bottomHeaders        = headers.filter(header => {return header.dock === (hf ?'bottom': 'right')}),
            leftHeaders          = headers.filter(header => {return header.dock === (hf ?'left'  : 'top')}),
            rightHeaders         = headers.filter(header => {return header.dock === (hf ?'right' : 'bottom')}),
            topHeaders           = headers.filter(header => {return header.dock === (hf ?'top'   : 'left')}),
            hasHorizontalHeaders = bottomHeaders.length > 0 || topHeaders  .length > 0,
            hasVerticalHeaders   = leftHeaders  .length > 0 || rightHeaders.length > 0,
            items                = me.items,
            horizontalItems      = [],
            verticalItems        = [],
            config;

        if (headers.length < 1) {
            Neo.error('Panel without headers, please use a Container instead', me.id);
        }

        topHeaders.forEach(header => {
            verticalItems.push(Panel.createHeaderConfig(header));
        });

        if (hasVerticalHeaders && (hf && hasHorizontalHeaders || !hf && hasHorizontalHeaders)) {
            leftHeaders.forEach(header => {
                horizontalItems.push(Panel.createHeaderConfig(header));
            });

            config = {
                ntype       : 'container',
                flex        : 1,
                items       : items,
                itemDefaults: me.itemDefaults,
                ...me.containerConfig || {}
            };

            horizontalItems.push({...me.headerDefaults, ...config});

            rightHeaders.forEach(header => {
                horizontalItems.push(Panel.createHeaderConfig(header));
            });

            verticalItems.push({
                ntype : 'container',
                items : horizontalItems,
                layout: {
                    ntype: (hf ? 'hbox' : 'vbox'),
                    align: 'stretch'
                }
            });
        } else {
            config = {
                ntype       : 'container',
                flex        : 1,
                items       : items,
                itemDefaults: me.itemDefaults,
                ...me.containerConfig || {}
            };

            verticalItems.push({...me.headerDefaults, ...config});
        }

        bottomHeaders.forEach(header => {
            verticalItems.push(Panel.createHeaderConfig(header));
        });

        me.items = verticalItems;

        me.itemDefaults = null;

        super.createItems();
    }

    /**
     *
     * @param {Object} header the header config
     * @returns {Object}
     */
    static createHeaderConfig(header) {
        let config = {
            ntype: 'toolbar',
            flex : '0 1 auto'
        };

        if (header.text) {
            config.items = [
                {
                    ntype: 'label',
                    cls  : ['neo-panel-header-text', 'neo-label'],
                    text : header.text
                }
            ];

            delete header.text;
        }

        // assuming all labels inside a Panel Header are meant to be titles -> look the same way
        if (Neo.isArray(header.items)) {
            header.items.forEach(item => {
                if (item.ntype === 'label') {
                    item.cls = ['neo-panel-header-text', 'neo-label'];
                }
            });
        }

        return {...config, ...header};
    }
}

Neo.applyClassConfig(Panel);



/***/ }),

/***/ "./node_modules/neo.mjs/src/container/Toolbar.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/container/Toolbar.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Toolbar; });
/* harmony import */ var _button_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../button/Base.mjs */ "./node_modules/neo.mjs/src/button/Base.mjs");
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _component_Label_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/Label.mjs */ "./node_modules/neo.mjs/src/component/Label.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");






/**
 * @class Neo.container.Toolbar
 * @extends Neo.container.Base
 */
class Toolbar extends _Base_mjs__WEBPACK_IMPORTED_MODULE_2__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for dock
         * @member {String[]} dockPositions=['top', 'right', 'bottom', 'left']
         * @static
         */
        dockPositions: ['top', 'right', 'bottom', 'left'],
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.container.Toolbar'
         * @protected
         */
        className: 'Neo.container.Toolbar',
        /**
         * @member {String} ntype='toolbar'
         * @protected
         */
        ntype: 'toolbar',
        /**
         * @member {String[]} cls=['neo-toolbar']
         */
        cls: ['neo-toolbar'],
        /**
         * @member {String} dock_='top'
         */
        dock_: 'top',
        /**
         * @member {Object} itemDefaults={ntype: 'button'}
         */
        itemDefaults: {
            ntype: 'button'
        },
        /**
         * @member {Object} _layout={ntype: 'hbox', align: 'center', pack : 'start'}
         */
        _layout: {
            ntype: 'hbox',
            align: 'center',
            pack : 'start'
        },
        /**
         * @member {Boolean} sortable_=false
         */
        sortable_: false,
        /**
         * @member {Neo.draggable.toolbar.SortZone|null} sortZone=null
         */
        sortZone: null,
        /**
         * @member {Object} sortZoneConfig=null
         */
        sortZoneConfig: null
    }}

    /**
     * Triggered after the dock config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetDock(value, oldValue) {
        let me            = this,
            cls           = me.cls,
            dockPositions = me.getStaticConfig('dockPositions');

        dockPositions.forEach(key => {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_4__["default"][key === value ? 'add' : 'remove'](cls, 'neo-dock-' + key);
        });

        me.cls    = cls;
        me.layout = me.getLayoutConfig();
    }

    /**
     * Triggered after the sortable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetSortable(value, oldValue) {
        let me = this;

        if (value && !me.sortZone) {
            Promise.all(/*! import() | src/draggable/toolbar/SortZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("vendors~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/draggable/toolbar/SortZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/toolbar/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/toolbar/SortZone.mjs")).then(module => {
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
     * Checks if the new dock position matches a value of the static dockPositions config
     * @param {String} value
     * @param {String} oldValue
     * @returns {String} value
     * @protected
     */
    beforeSetDock(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'dock', 'dockPositions');
    }

    /**
     *
     */
    createItems() {
        const items = this._items;

        if (Array.isArray(items)) {
            items.forEach((item, index) => {
                if (item === '->') {
                    items[index] = Neo.create({
                        module: _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"],
                        flex  : 1
                    });
                }
            });
        }

        return super.createItems();
    }

    /**
     * Creates a layout config depending on this.dock
     * @returns {Object} layoutConfig
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
                    pack     : 'start'
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
}

Neo.applyClassConfig(Toolbar);



/***/ }),

/***/ "./node_modules/neo.mjs/src/container/Viewport.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/container/Viewport.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Viewport; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");


/**
 * @class Neo.container.Viewport
 * @extends Neo.container.Base
 */
class Viewport extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.container.Viewport'
         * @protected
         */
        className: 'Neo.container.Viewport',
        /**
         * @member {String} ntype='viewport'
         * @protected
         */
        ntype: 'viewport',
        /**
         * true applies 'neo-body-viewport' to the document.body
         * @member {Boolean} applyBodyCls=true
         */
        applyBodyCls: true,
        /**
         * @member {String[]} cls=['neo-viewport']
         */
        cls: ['neo-viewport']
    }}

    onConstructed() {
        super.onConstructed();

        if (this.applyBodyCls) {
            Neo.main.DomAccess.applyBodyCls({
                appName: this.appName,
                cls    : ['neo-body-viewport']
            });
        }
    }
}

Neo.applyClassConfig(Viewport);



/***/ }),

/***/ "./node_modules/neo.mjs/src/data/Model.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/Model.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.data.Model
 * @extends Neo.core.Base
 */
class Model extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.Model'
         * @protected
         */
        className: 'Neo.data.Model',
        /**
         * @member {String} ntype='model'
         * @protected
         */
        ntype: 'model',
        /**
         * @member {Array} fields_=[]
         * @protected
         */
        fields_: [],
        /**
         * @member {String} keyProperty_='id'
         * @protected
         */
        keyProperty_: 'id',
        /**
         * @member {String|null} storeId=null
         * @protected
         */
        storeId: null,
        /**
         * Set this config to true in case you want to track modified fields.
         * Be aware that this will double the amount of data inside each record,
         * since each field will get an original value flag.
         * @member {Boolean} trackModifiedFields=false
         */
        trackModifiedFields: false
    }}

    /**
     *
     * @param {Array} value
     * @param {Array} oldValue
     */
    afterSetFields(value, oldValue) {
        // todo
        // console.log('afterSetFields', value, oldValue);
    }

    /**
     * Finds a field config by a given field name
     * @param {String} key
     * @returns {Object|null} The field config object or null if no match was found
     */
    getField(key) {
        let me  = this,
            i   = 0,
            len = me.fields.length;

        for (; i < len; i++) {
            if (me.fields[i].name === key) {
                return me.fields[i];
            }
        }

        return null;
    }
}

Neo.applyClassConfig(Model);



/***/ }),

/***/ "./node_modules/neo.mjs/src/data/RecordFactory.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/RecordFactory.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");




let instance;

/**
 * @class Neo.data.RecordFactory
 * @extends Neo.core.Base
 * @singleton
 */
class RecordFactory extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.RecordFactory'
         * @protected
         */
        className: 'Neo.data.RecordFactory',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * The internal record prefix for original field values.
         * Only used in case the model has trackModifiedFields set to true.
         * @member {String} ovPrefix='ov_'
         */
        ovPrefix: 'ov_',
        /**
         * @member {String} recordNamespace='Neo.data.record.'
         */
        recordNamespace: 'Neo.data.record.'
    }}

    /**
     *
     * @param {Neo.data.Model} model
     * @param {Object} config
     * @returns {Object}
     */
    createRecord(model, config) {
        let recordClass = Neo.ns(this.recordNamespace + model.className);

        if (!recordClass) {
            recordClass = this.createRecordClass(model);
        }

        return new recordClass(config);
    }

    /**
     *
     * @param {Neo.data.Model} model
     * @returns {Object}
     */
    createRecordClass(model) {
        if (model instanceof _Model_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            let className = this.recordNamespace + model.className,
                ns        = Neo.ns(className),
                key, nsArray;

            model.trackModifiedFields = true; // todo: remove, just for testing

            if (!ns) {
                nsArray = className.split('.');
                key     = nsArray.pop();
                ns      = Neo.ns(nsArray, true);
                ns[key] = class Record {
                    constructor(config) {
                        let me = this,
                            properties;

                        Object.defineProperties(me, {
                            _isModified: {
                                value   : false,
                                writable: true
                            }
                        });

                        if (Array.isArray(model.fields)) {
                            model.fields.forEach(field => {
                                let parsedValue = instance.parseRecordValue(field, config[field.name]),
                                    symbol      = Symbol(field.name);

                                properties = {
                                    [symbol]: {
                                        value   : parsedValue,
                                        writable: true
                                    },
                                    [field.name]: {
                                        configurable: true,
                                        enumerable  : true,
                                        get() {
                                            return this[symbol];
                                        },
                                        set(value) {
                                            let me       = this,
                                                oldValue = me[symbol];

                                            if (instance.hasChanged(value, oldValue)) {
                                                value = instance.parseRecordValue(field, value);

                                                me[symbol] = value;

                                                me._isModified = true;
                                                me._isModified = instance.isModified(me, model.trackModifiedFields);

                                                instance.onRecordChange({
                                                    field   : field.name,
                                                    model   : model,
                                                    oldValue: oldValue,
                                                    record  : me,
                                                    value   : value
                                                });
                                            }
                                        }
                                    }
                                };

                                // adding the original value of each field
                                if (model.trackModifiedFields) {
                                    properties[instance.ovPrefix + field.name] = {
                                        value: parsedValue
                                    }
                                }

                                Object.defineProperties(me, properties);
                            });
                        }
                    }
                };


                return ns[key];
            }

            return ns;
        }
    }

    /**
     * Checks if the value of a config has changed
     * todo: we could compare objects & arrays for equality
     * @param {*} value
     * @param {*} oldValue
     * @returns {Boolean}
     * @private
     */
    hasChanged(value, oldValue) {
        if (Array.isArray(value)) {
            return true;
        } else if (Neo.isObject(value)) {
            if (oldValue instanceof Date && value instanceof Date) {
                return oldValue.valueOf() !== value.valueOf();
            }

            return true;
        }

        return oldValue !== value;
    }

    /**
     *
     * @param {Object} record
     * @param {Boolean} trackModifiedFields
     * @returns {Boolean} true in case a change was found
     */
    isModified(record, trackModifiedFields) {
        if (trackModifiedFields) {
            let fields = Object.keys(record),
                i      = 0,
                len    = fields.length,
                field;

            for (; i < len; i++) {
                field = fields[i];

                if (record[field] !== record[this.ovPrefix + field]) {
                    return true;
                }
            }

            return false;
        }

        return record._isModified;
    }

    /**
     *
     * @param {Object} record
     * @param {String} fieldName
     * @returns {Boolean|null} null in case the model does not use trackModifiedFields, true in case a change was found
     */
    isModifiedField(record, fieldName) {
        if (!record.hasOwnProperty(fieldName)) {
            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].logError('The record does not contain the field', fieldName, record);
        }

        if (record.hasOwnProperty(this.ovPrefix + fieldName)) {
            return record[fieldName] !== record[this.ovPrefix + fieldName];
        }

        return null;
    }

    /**
     * Tests if a given object is an instance of a class created by this factory
     * @param {Object} obj
     * @returns {Boolean}
     */
    isRecord(obj) {
        return obj && obj.constructor && obj.constructor.name && obj.constructor.name === 'Record';
    }

    /**
     * Gets triggered after changing the value of a record field.
     * E.g. myRecord.foo = 'bar';
     * @param {Object} opts
     * @param {String} opts.field The name of the field which got changed
     * @param {Neo.data.Model} opts.model The model instance of the changed record
     * @param {*} opts.oldValue
     * @param {Object} opts.record
     * @param {*} opts.value
     */
    onRecordChange(opts) {
        let store = Neo.get(opts.model.storeId);

        if (store) {
            store.onRecordChange(opts);
        }
    }

    /**
     * todo: parse value for more field types
     * @param {Object} field
     * @param {*} value
     * @returns {*}
     */
    parseRecordValue(field, value) {
        const type = field.type && field.type.toLowerCase();

        if (type === 'date') {
            return new Date(value);
        }

        return value;
    }
}

Neo.applyClassConfig(RecordFactory);

instance = Neo.create(RecordFactory);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/data/Store.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/Store.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony import */ var _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RecordFactory.mjs */ "./node_modules/neo.mjs/src/data/RecordFactory.mjs");






/**
 * @class Neo.data.Store
 * @extends Neo.collection.Base
 */
class Store extends _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.Store'
         * @protected
         */
        className: 'Neo.data.Store',
        /**
         * @member {String} ntype='store'
         * @protected
         */
        ntype: 'store',
        /**
         * @member {Boolean} autoLoad=false
         */
        autoLoad: false,
        /**
         * @member {Array|null} data_=null
         */
        data_: null,
        /**
         * @member {Array|null} initialData_=null
         */
        initialData_: null,
        /**
         * @member {Boolean} isGrouped=false
         */
        isGrouped: false,
        /**
         * @member {Boolean} isLoaded=false
         */
        isLoaded: false,
        /**
         * @member {Boolean} isLoading=false
         */
        isLoading: false,
        /**
         * @member {Neo.data.Model} model_=null
         */
        model_: null,
        /**
         * True to let the backend handle the filtering.
         * Useful for buffered stores
         * @member {Boolean} remoteFilter=false
         */
        remoteFilter: false,
        /**
         * True to let the backend handle the sorting.
         * Useful for buffered stores
         * @member {Boolean} remoteSort=false
         */
        remoteSort: false,
        /**
         * Url for Ajax requests
         * @member {String|null} url=null
         */
        url: null
    }}

    constructor(config) {
        super(config);

        let me = this;

        // todo
        me.on({
            mutate: me.onCollectionMutate,
            sort  : me.onCollectionSort,
            scope : me
        });
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        if (me.data) {
            me.afterSetData(me.data);
        }

        if (me.autoLoad) {
            setTimeout(() => { // todo
                me.load();
            }, 100);
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetData(value, oldValue) {
        let me = this;

        if (me.configsApplied) {
            if (value) {
                if (oldValue) {
                    me.clear();
                } else {
                    me.initialData = [...value];
                }

                me.add(value);
            }
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetInitialData(value, oldValue) {
        // console.log('afterSetInitialData', value, oldValue);
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetModel(value, oldValue) {
        if (value) {
            value.storeId = this.id;
            _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecordClass(value);
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     * @returns {*}
     */
    beforeSetData(value, oldValue) {
        let me = this;

        if (value) {
            if (!Array.isArray(value)) {
                value = [value];
            }

            // todo: add a config to make the cloning optional
            value = Neo.clone(value, true);

            value.forEach((key, index) => {
                if (!_RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].isRecord(key)) {
                    value[index] = _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecord(me.model, key);
                }
            });

            // console.log('beforeSetData', value);
        }

        return value;
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     * @returns {*}
     */
    beforeSetInitialData(value, oldValue) {
        if (!value && oldValue) {
            return oldValue;
        }

        return value;
    }

    /**
     *
     * @param {Neo.data.Model} value
     * @param {Neo.data.Model} oldValue
     * @protected
     * @returns {Neo.data.Model}
     */
    beforeSetModel(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].beforeSetInstance(value, _Model_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }

    /**
     *
     * @param {Object} config
     */
    createRecord(config) {
        _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecord(config);
    }

    load() {
        let me = this;

        Neo.Xhr.promiseJson({
            url: me.url
        }).then(data => {
            me.data = Array.isArray(data.json) ? data.json : data.json.data;
            // we do not need to fire a load event => onCollectionMutate()
        }).catch(err => {
            console.log('Error for Neo.Xhr.request', err, me.id);
        });
    }

    /**
     *
     * @param {Object} opts
     */
    onCollectionMutate(opts) {
        let me = this;

        if (me.configsApplied) {
            // console.log('onCollectionMutate', opts);
            me.fire('load', me.items);
        }
    }

    /**
     * todo: add will fire mutate and sort right after another
     */
    onCollectionSort() {
        let me = this;

        if (me.configsApplied) {
            // console.log('onCollectionSort', me.collection.items);
            // me.fire('load', me.items);
        }
    }

    /**
     * Gets triggered after changing the value of a record field.
     * E.g. myRecord.foo = 'bar';
     * @param {Object} opts
     * @param {String} opts.field The name of the field which got changed
     * @param {Neo.data.Model} opts.model The model instance of the changed record
     * @param {*} opts.oldValue
     * @param {Object} opts.record
     * @param {*} opts.value
     */
    onRecordChange(opts) {
        this.fire('recordChange', opts);
    }

    /**
     *
     * @param {Object} opts
     * @param {String} opts.direction
     * @param {String} opts.property
     */
    sort(opts={}) {
        let me = this;

        if (me.remoteSort) {
            // todo
        } else {
            // console.log('sort', opts.property, opts.direction, me.configsApplied);

            if (me.configsApplied) {
                if (opts.direction) {
                    me.sorters = [{
                        direction: opts.direction,
                        property : opts.property
                    }];
                } else {
                    me.startUpdate();
                    me.clear();
                    me.sorters = [];
                    me.add([...me.initialData]);
                    me.endUpdate();
                    me.fire('sort');
                }
            }
        }
    }
}

Neo.applyClassConfig(Store);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Base.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Base.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * Abstract base class for form fields
 * @class Neo.form.field.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Base'
         * @protected
         */
        className: 'Neo.form.field.Base',
        /**
         * @member {String} ntype='basefield'
         * @protected
         */
        ntype: 'basefield',
        /**
         * @member {*} value_=null
         */
        value_: null
    }}

    /**
     * Triggered after the value config got changed
     * @param {*} value
     * @param {*} oldValue
     */
    afterSetValue(value, oldValue) {
        if (oldValue !== undefined) {
            this.fire('change', {
                component: this,
                oldValue : oldValue,
                value    : value
            });
        }
    }

    /**
     *
     * @returns {*} this.value
     */
    getSubmitValue() {
        return this.value;
    }

    /**
     *
     * @returns {Boolean}
     */
    isValid() {
        return true;
    }
}

/**
 * The change event fires after the value config gets changed
 * @event change
 * @param {*} value
 * @param {*} oldValue
 * @returns {Object}
 */

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Text.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Text.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/Base.mjs");
/* harmony import */ var _trigger_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trigger/Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");
/* harmony import */ var _trigger_Clear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trigger/Clear.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");
/* harmony import */ var _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/VNode.mjs */ "./node_modules/neo.mjs/src/util/VNode.mjs");







/**
 * @class Neo.form.field.Text
 * @extends Neo.form.field.Base
 */
class Text extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for labelPosition
         * @member {String[]} labelPositions=['bottom', 'inline', 'left', 'right', 'top']
         * @protected
         * @static
         */
        labelPositions: ['bottom', 'inline', 'left', 'right', 'top']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Text'
         * @protected
         */
        className: 'Neo.form.field.Text',
        /**
         * @member {String} ntype='textfield'
         * @protected
         */
        ntype: 'textfield',
        /**
         * Internal variable to store the actual width for the label centerBorderEl
         * (only needed for labelPosition: 'inline')
         * @member {Number|null} centerBorderElWidth=null
         * @protected
         */
        centerBorderElWidth: null,
        /**
         * True shows a clear trigger in case the field has a non empty value.
         * @member {Boolean} clearable_=true
         */
        clearable_: true,
        /**
         * True will reset the field to its initial value config.
         * Recommended for fields with required: true
         * @member {Boolean} clearToOriginalValue=false
         */
        clearToOriginalValue_: false,
        /**
         * @member {String[]} cls=['neo-textfield']
         */
        cls: ['neo-textfield'],
        /**
         * @member {Boolean} hideLabel_=false
         */
        hideLabel_: false,
        /**
         * @member {String} inputType_='text'
         */
        inputType_: 'text',
        /**
         * @member {String} labelPosition_='left'
         */
        labelPosition_: 'left',
        /**
         * @member {String} labelText_='LabelText'
         */
        labelText_: 'LabelText',
        /**
         * defaults to px
         * @member {Number|String} labelWidth_=150
         */
        labelWidth_: 150,
        /**
         * @member {String|null} placeholderText_=null
         */
        placeholderText_: null,
        /**
         * @member {Boolean} required_=false
         */
        required_: false,
        /**
         * @member {Object|Object[]|null} triggers_=null
         */
        triggers_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                tag  : 'label',
                cls  : ['neo-textfield-label'],
                style: {}
            }, {
                tag         : 'input',
                autocomplete: 'off',
                autocorrect : 'off',
                cls         : ['neo-textfield-input'],
                flag        : 'neo-real-input',
                spellcheck  : 'false',
                style       : {}
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
            domListeners = Neo.clone(me.domListeners, true, true),
            vdom         = me.vdom,
            inputEl      = me.getInputEl(),
            labelEl      = me.getLabelEl();

        inputEl.id = labelEl.for = me.id + '-input';

        me.vdom = vdom;

        domListeners.push({
            input: {
                fn   : me.onInputValueChange,
                scope: me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     *
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     * @returns {Object} config
     */
    mergeConfig(...args) {
        let me       = this,
            config   = super.mergeConfig(...args),
            triggers = config.triggers || me.triggers;

        me[triggers ? 'triggers' : '_triggers'] = triggers;

        delete config.triggers;
        return config;
    }

    /**
     * Triggered after the clearable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetClearable(value, oldValue) {
        let me = this,
            triggers;

        if (value) {
            triggers = me.triggers || [];
            triggers.unshift(_trigger_Clear_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
            me.triggers = triggers;
        } else {
            me.removeTrigger('clear');
        }
    }

    /**
     * Triggered after the clearToOriginalValue config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetClearToOriginalValue(value, oldValue) {
        this.fire('changeClearToOriginalValue', {
            oldValue: oldValue,
            value   : value
        });
    }

    /**
     * Triggered after the hideLabel config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHideLabel(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[0].removeDom = value;
        me._vdom = vdom; // silent update

        me.updateInputWidth();
    }

    /**
     * Triggered after the inputType config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetInputType(value, oldValue) {
        this.changeInputElKey('type', value);
    }

    /**
     * Triggered after the labelPosition config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetLabelPosition(value, oldValue) {
        let me  = this,
            cls = me.cls,
            centerBorderElCls, isEmpty, vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(cls, 'label-' + oldValue);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].add(cls, 'label-' + value);
        me[oldValue === 'inline' || value === 'inline' ? '_cls' : 'cls'] = cls; // silent update if needed

        if (oldValue === 'inline') {
            vdom = me.vdom;

            vdom.cn[0] = me.getLabelEl(); // remove the wrapper

            vdom.cn[0].width = me.labelWidth;

            me._vdom = vdom; // silent update
            me.updateInputWidth();
        } else if (value === 'inline') {
            centerBorderElCls = ['neo-center-border'];
            isEmpty           = me.isEmpty();
            vdom              = me.vdom;

            if (!isEmpty) {
                centerBorderElCls.push('neo-float-above');
            }

            delete vdom.cn[0].width;

            vdom.cn[0] = {
                cls: ['neo-label-wrapper'],
                cn : [{
                    cls: ['neo-left-border']
                }, {
                    cls: centerBorderElCls,
                    cn : [vdom.cn[0]]
                }, {
                    cls: ['neo-right-border']
                }]
            };

            me._vdom = vdom; // silent update
            me.updateInputWidth();

            if (!isEmpty) {
                setTimeout(() => {
                    me.updateCenterBorderElWidth(false);
                }, 20);
            }
        }
    }

    /**
     * Triggered after the labelText config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetLabelText(value, oldValue) {
        let me      = this,
            isEmpty = me.isEmpty(),
            vdom    = me.vdom;

        me.getLabelEl().innerHTML = value;

        if (me.hideLabel) {
            me._vdom = vdom; // silent update
        } else {
            if (me.labelPosition === 'inline') {
                if (!isEmpty) {
                    delete me.getCenterBorderEl().width;
                }

                me.promiseVdomUpdate(vdom).then(() => {
                    me.updateCenterBorderElWidth(isEmpty);
                });
            } else {
                me.vdom = vdom;
            }
        }
    }

    /**
     * Triggered after the labelWidth config got changed
     * @param {Number|String} value
     * @param {Number|String} oldValue
     * @protected
     */
    afterSetLabelWidth(value, oldValue) {
        if (this.labelPosition !== 'inline') {
            let me    = this,
                vdom  = me.vdom,
                label = vdom.cn[0];

            label.width = value;

            me._vdom = vdom; // silent update

            if (!me.hideLabel) {
                me.updateInputWidth();
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
        super.afterSetMounted(value, oldValue);

        if (value && this.labelPosition === 'inline') {
            this.updateCenterBorderElWidth();
        }
    }

    /**
     * Triggered after the placeholderText config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetPlaceholderText(value, oldValue) {
        this.changeInputElKey('placeholder', value === '' ? null : value);
    }

    /**
     * Triggered after the required config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetRequired(value, oldValue) {
        this.changeInputElKey('required', value);
    }

    /**
     * Triggered after the triggers config got changed
     * @param {Object[]} value
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetTriggers(value, oldValue) {
        let me           = this,
            vdom         = me.vdom,
            inputEl      = vdom.cn[1], // inputEl or inputWrapperEl
            preTriggers  = [],
            postTriggers = [],
            width;

        // console.log(value && [...value], oldValue && [...oldValue]);

        if (oldValue) {
            oldValue.forEach(item => {
                if (!me.getTrigger(item.type)) {
                    item.destroy();
                }
            });
        }

        if (value.length > 0) {
            value.forEach(item => {
                if (item.align === 'start') {
                    preTriggers.push(item);
                } else {
                    postTriggers.push(item);
                }
            });

            postTriggers.sort((a, b) => b.weight - a.weight); // DESC
            preTriggers .sort((a, b) => a.weight - b.weight); // ASC

            postTriggers = postTriggers.map(a => a.vdom);
            preTriggers  = preTriggers .map(a => a.vdom);

            if (inputEl.tag === 'input') {
                // wrap the input tag
                vdom.cn[1] = {
                    cls  : ['neo-input-wrapper'],
                    cn   : [...preTriggers, inputEl, ...postTriggers],
                    id   : me.id + '-input-wrapper',
                    width: inputEl.width
                };

                delete inputEl.width;
            } else {
                inputEl.cn = [...preTriggers, me.getInputEl(), ...postTriggers];
            }
        } else {
            if (inputEl.tag !== 'input') {
                // replacing the input wrapper div with the input tag
                width = inputEl.width;
                vdom.cn[1] = me.getInputEl();
                vdom.cn[1].width = width;
            }
        }

        me.promiseVdomUpdate().then(() => {
            me.updateTriggerVnodes();
        });
    }

    /**
     * Triggered after the value config got changed
     * todo: add validation logic
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetValue(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        super.afterSetValue(value, oldValue);

        me.getInputEl().value = value;

        if (!!value !== !!oldValue) { // change from empty to non empty
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][value && value.toString().length > 0 ? 'add' : 'remove'](me._cls, 'neo-has-content');
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][me.originalConfig.value !== value ? 'add' : 'remove'](me._cls, 'neo-is-dirty');

        me.vdom = vdom;
    }

    /**
     * Triggered after the width config got changed
     * @param {Number|String} value
     * @param {Number|String} oldValue
     * @protected
     */
    afterSetWidth(value, oldValue) {
        super.afterSetWidth(value, oldValue);
        this.updateInputWidth();
    }

    /**
     * Return a shallow copy of the triggers config
     * @param {Array|null} value
     * @protected
     */
    beforeGetTriggers(value) {
        if (Array.isArray(value)) {
            return [...value];
        }

        return value;
    }

    /**
     * Triggered before the labelPosition config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     * @returns {String}
     */
    beforeSetLabelPosition(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'labelPosition');
    }

    /**
     * Triggered before the triggers config gets changed
     * @param {Object|Object[]} value
     * @param {Object[]} oldValue
     * @returns {Object[]} the parsed triggers config
     * @protected
     * @returns {Object|Object[]}
     */
    beforeSetTriggers(value, oldValue) {
        if (!value) {
            value = [];
        } else if (!Array.isArray(value)) {
            value = [value];
        }

        let me = this;

        value.forEach((item, index) => {
            if (item.isClass) {
                value[index] = Neo.create(item, {
                    id   : me.getTriggerId(item.prototype.type),
                    field: me
                });
            } else if (!(item instanceof _trigger_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])) {
                if (!item.module && !item.ntype) {
                    item.ntype = 'trigger';
                }

                if (item.module) {
                    item.className = item.module.prototype.className;
                    item.id        = me.getTriggerId(item.module.prototype.type);
                }

                value[index] = Neo[item.className ? 'create' : 'ntype']({...item, field: me});
            }
        });

        return value;
    }

    /**
     * Changes the value of a inputEl vdom object attribute or removes it in case it has no value
     * @param {String} key
     * @param {Array|Number|Object|String|null} value
     */
    changeInputElKey(key, value) {
        let me   = this,
            vdom = me.vdom;

        if (value || value === 0) {
            me.getInputEl()[key] = value;
        } else {
            delete me.getInputEl()[key];
        }

        me.vdom = vdom;
    }

    /**
     * Resets the field to its original value or null depending on the clearToOriginalValue config
     */
    clear() {
        let me = this;

        me.value = me.clearToOriginalValue ? me.originalConfig.value : null;
        me.fire('clear');
    }

    /**
     *
     * @returns {Object|null}
     */
    getCenterBorderEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {cls: 'neo-center-border'});
        return el && el.vdom;
    }

    /**
     *
     * @returns {Object|null}
     */
    getInputEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {flag: 'neo-real-input'});
        return el && el.vdom;
    }

    /**
     *
     * @returns {String}
     */
    getInputElId() {
        return this.id + '-input';
    }

    /**
     * Calculates the new inputWidth based on the labelWidth & total width
     * @returns {Number|null} null in case this.width is unknown
     */
    getInputWidth() {
        let me          = this,
            ignoreLabel = me.hideLabel || me.labelPosition === 'bottom' || me.labelPosition === 'inline' || me.labelPosition === 'top',
            labelWidth  = ignoreLabel ? 0 : me.labelWidth,
            width       = me.width;

        if (labelWidth && width) {
            return parseInt(width) - parseInt(labelWidth);
        } else if (width) {
            return width;
        }

        return null;
    }

    /**
     *
     * @returns {Object|null}
     */
    getLabelEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {tag: 'label'});
        return el && el.vdom;
    }

    /**
     *
     * @param {String} type
     * @returns {Neo.form.field.trigger.Base|null}
     */
    getTrigger(type) {
        let me       = this,
            triggers = me.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].type === type) {
                return triggers[i];
            }
        }

        return null;
    }

    /**
     *
     * @param {String} id
     * @returns {Neo.form.field.trigger.Base|null}
     */
    getTriggerById(id) {
        let me       = this,
            triggers = me.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].id === id) {
                return triggers[i];
            }
        }

        return null;
    }

    /**
     *
     * @param {String} type
     * @protected
     * @returns {String} The trigger node id
     */
    getTriggerId(type) {
        return this.id + '-trigger-' + type;
    }

    /**
     * Finds a trigger by a given type config
     * @param {String} type
     * @returns {Boolean}
     */
    hasTrigger(type) {
        let triggers = this.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].type === type) {
                return true;
            }
        }

        return false;
    }

    /**
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return !(this.value && this.value.toString().length > 0);
    }

    /**
     *
     * @returns {Boolean}
     */
    isValid() {
        let me = this;

        if (me.required && (!me.value || me.value && me.value.length < 1)) {
            return false;
        }

        return super.isValid();
    }

    /**
     *
     * @param {Array} path
     * @protected
     */
    onFocusEnter(path) {
        let me  = this,
            cls = me.cls,
            vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].add(cls, 'neo-focus');
        me.cls = cls;

        if (me.labelPosition === 'inline') {
            if (me.centerBorderElWidth) {
                vdom = me.vdom;
                me.getCenterBorderEl().width = me.centerBorderElWidth;
                me.vdom = vdom;
            } else {
                me.updateCenterBorderElWidth(false);
            }
        }
    }

    /**
     *
     * @param {Array} path
     * @protected
     */
    onFocusLeave(path) {
        let me             = this,
            centerBorderEl = me.getCenterBorderEl(), // labelPosition: 'inline'
            cls            = me.cls,
            vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(cls, 'neo-focus');

        if (centerBorderEl && me.isEmpty()) {
            me._cls = cls; // silent update
            vdom = me.vdom;
            delete centerBorderEl.width;
            me.vdom = vdom;
        } else {
            me.cls = cls;
        }
    }

    /**
     * @param {Object} data
     * @protected
     */
    onInputValueChange(data) {
        let me       = this,
            value    = data.value,
            oldValue = me.value,
            vnode    = _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_5__["default"].findChildVnode(me.vnode, {nodeName: 'input'});

        if (vnode) {
            // required for validation -> revert a wrong user input
            vnode.vnode.attributes.value = value;
        }

        if (value !== oldValue) {
            me.value = value;
        }
    }

    /**
     * Removes all triggers of a given type
     * @param {String} type
     * @param {Boolean} [silent=false] true prevents a vdom update
     * @param {Array} [triggerSource] pass a shallow copy of this.triggers
     * @returns {Boolean} true in case a trigger was found & removed
     */
    removeTrigger(type, silent=false, triggerSource) {
        let me       = this,
            hasMatch = false,
            triggers = triggerSource || me.triggers || [],
            i        = 0,
            len      = triggers.length,
            trigger;

        for (; i < len; i++) {
            trigger = triggers[i];

            if (trigger.type === type) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(triggers, trigger);
                len--;
                hasMatch = true;
            }
        }

        if (hasMatch && !silent) {
            me.triggers = triggers;
        }

        return hasMatch;
    }

    /**
     * Used for labelPosition: 'inline' to adjust the top border matching to the length of the label
     * @param {Boolean} [silent=false] true to get the value, but not apply it to the DOM
     * @protected
     */
    updateCenterBorderElWidth(silent=false) {
        let me = this;

        if (me.mounted) {
            Neo.main.DomAccess.getBoundingClientRect({
                id: me.getCenterBorderEl().id
            }).then(data => {
                me.centerBorderElWidth = Math.round(data.width * .7) + 8;

                if (!silent) {
                    let vdom = me.vdom;

                    me.getCenterBorderEl().width = me.centerBorderElWidth;
                    me.vdom = vdom;
                }
            });
        }
    }

    /**
     * Calculates the new inputWidth based on the labelWidth & total width
     * @protected
     */
    updateInputWidth() {
        let me         = this,
            inputWidth = me.getInputWidth(),
            vdom       = me.vdom;

        if (inputWidth !== null && inputWidth !== me.width) {
            vdom.cn[1].width = inputWidth;
        } else {
            delete vdom.cn[1].width;
        }

        me.vdom = vdom;
    }

    /**
     * Since triggers do not get rendered, assign the relevant props
     * todo: this could be handled by component.Base
     */
    updateTriggerVnodes() {
        let me           = this,
            triggerRoot  = me.vnode && me.vnode.childNodes[1],
            childNodes   = triggerRoot && triggerRoot.childNodes || [],
            trigger;

        childNodes.forEach(vnode => {
            trigger = me.getTriggerById(vnode.id);

            if (trigger) {
                Object.assign(trigger, {
                    vnode    : vnode,
                    _rendered: true,
                    _mounted : true
                });
            }
        });
    }
}

Neo.applyClassConfig(Text);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/Base.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * Base class for form field Triggers
 * @class Neo.form.field.trigger.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for align
         * @member {String[]} alignValues=['end', 'start']
         * @protected
         * @static
         */
        alignValues: ['end', 'start']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.Base'
         * @protected
         */
        className: 'Neo.form.field.trigger.Base',
        /**
         * @member {String} ntype='trigger'
         * @protected
         */
        ntype: 'trigger',
        /**
         * @member {String} align_='end'
         */
        align_: 'end',
        /**
         * @member {String[]} cls=['neo-field-trigger']
         */
        cls: ['neo-field-trigger'],
        /**
         * @member {Neo.form.field.Base|null} field=null
         */
        field: null,
        /**
         * @member {Boolean} hidden_=false
         */
        hidden_: false,
        /**
         * @member {String|null} iconCls_=null
         */
        iconCls_: null,
        /**
         * The scope of the trigger handler
         * @member {Neo.core.Base|null} scope=null
         */
        scope: null,
        /**
         * @member {Boolean} showOnHover=false
         */
        showOnHover: false,
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='base'
         * @protected
         */
        type: 'base',
        /**
         * @member {Object} _vdom={tabIndex: -1}
         */
        _vdom: {
            tabIndex: -1
        },
        /**
         * @member {Number} weight_=10
         */
        weight_: 10
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me             = this,
            domListeners   = Neo.clone(me.domListeners, true, true),
            fieldListeners;

        domListeners.push({
            click: {
                fn   : me.onTriggerClick,
                scope: me
            }
        });

        if (me.showOnHover) {
            me.hiden = true;

            me.field.on('constructed', () => {
                fieldListeners = !me.field.domListeners ? [] : Neo.clone(me.field.domListeners, true, true);
                fieldListeners.push({
                    mouseenter: {
                        fn    : me.onMouseEnter,
                        scope : me
                    }
                }, {
                    mouseleave: {
                        fn    : me.onMouseLeave,
                        scope : me
                    }
                });
                me.field.domListeners = fieldListeners;
                
            }, me);
        }

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the align config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetAlign(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value === 'start' ? 'add' : 'remove'](cls, 'neo-align-start');
        this.cls = cls;
    }

    /**
     * Triggered after the hidden config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHidden(value, oldValue) {
        let vdom  = this.vdom,
            style = vdom.style || {};

        style.display = value ? 'none' : 'inline-block';
        this.vdom  = vdom;
    }

    /**
     * Triggered after the iconCls config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetIconCls(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, oldValue);

        if (value && value !== '') {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, value);
        }

        this.cls = cls;
    }

    /**
     * Triggered before the align config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    beforeSetAlign(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'align', 'alignValues');
    }

    /**
     *
     */
    destroy() {
        delete this.field;
        super.destroy();
    }

    /**
     *
     */
    onMouseEnter() {
        this.hidden = false;
    }

    /**
     *
     */
    onMouseLeave() {
        this.hidden = true;
    }

    /**
     * click domEvent listener
     * @param {Object} data
     * @protected
     */
    onTriggerClick(data) {
        let me    = this,
            scope = me.scope || me;

        if (me.handler) {
            scope[me.handler].call(scope);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Clear; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * Clear Trigger to remove the input value of TextFields or subclasses
 * @class Neo.form.field.trigger.Clear
 * @extends Neo.form.field.trigger.Base
 */
class Clear extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.Clear'
         * @protected
         */
        className: 'Neo.form.field.trigger.Clear',
        /**
         * @member {String} ntype='trigger-clear'
         * @protected
         */
        ntype: 'trigger-clear',
        /**
         * @member {String[]} cls=['neo-field-trigger', 'neo-trigger-clear']
         */
        cls: ['neo-field-trigger', 'neo-trigger-clear'],
        /**
         * @member {String|null} iconCls='fa fa-times'
         */
        iconCls: 'fa fa-times',
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='clear'
         * @protected
         */
        type: 'clear',
        /**
         * @member {Number} weight_=20
         */
        weight: 20
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        me.field.on({
            change                    : me.onFieldChange,
            changeClearToOriginalValue: me.onFieldChange,
            scope                     : me
        });

        me.hidden = me.getHiddenState();
    }

    /**
     * Triggered after the hidden config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHidden(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value ? 'add' : 'remove'](cls, 'neo-is-hidden');
        this.cls = cls;
    }

    /**
     *
     * @returns {Boolean} true in case the trigger should be hidden
     */
    getHiddenState() {
        let me    = this,
            field = me.field,
            value = field.value;

        if (field.clearToOriginalValue) {
            return value === field.originalConfig.value;
        } else {
            if (value === 0) {
                value = '0';
            }

            return !field.value || value.toString().length < 1;
        }
    }

    /**
     *
     * @param {Object} opts
     */
    onFieldChange(opts) {
        this.hidden = this.getHiddenState();
    }

    /**
     *
     * @param {Object} data
     */
    onTriggerClick(data) {
        this.field.clear();
    }
}

Neo.applyClassConfig(Clear);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/Base.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/Base.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * The base class for all other layouts.
 * Use it directly in case you want to create a container without a layout.
 * @class Neo.layout.Base
 * @extends Neo.core.Base
 */
class Base extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.Base'
         * @protected
         */
        className: 'Neo.layout.Base',
        /**
         * @member {String} ntype='layout-base'
         * @protected
         */
        ntype: 'layout-base',
        /**
         * The Id of the Container instance this layout is bound to
         * @member {?String} containerId=null
         * @protected
         */
        containerId: null,
        /**
         * Identifier for all classes that extend layout.Base
         * @member {Boolean} isLayout=true
         * @protected
         */
        isLayout: true
    }}

    /**
     * Placeholder Method
     * @param {Neo.component.Base} item
     * @protected
     */
    applyChildAttributes(item) {}

    /**
     * Placeholder Method
     * @protected
     */
    applyRenderAttributes() {}

    /**
     * Placeholder Method
     * @param {Neo.component.Base} item
     * @protected
     */
    removeChildAttributes(item) {}

    /**
     * Placeholder Method
     * @protected
     */
    removeRenderAttributes() {}
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/Card.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/Card.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/layout/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.layout.Card
 * @extends Neo.layout.Base
 */
class Card extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /*
         * The name of the CSS class for an active item inside the card layout
         * @member activeItemCls
         * @static
         */
        activeItemCls: 'active-item',
        /*
         * The name of the CSS class for an inactive item inside the card layout
         * @member inactiveItemCls
         * @static
         */
        inactiveItemCls: 'inactive-item',
        /*
         * The name of the CSS class for an item inside the card layout
         * @member itemCls
         * @static
         */
        itemCls: 'neo-layout-card-item'
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.Card'
         * @protected
         */
        className: 'Neo.layout.Card',
        /**
         * @member {String} ntype='layout-card'
         * @protected
         */
        ntype: 'layout-card',
        /*
         * The item index of the card, which is currently active.
         * Change this value to activate a different card.
         * @member {Number} activeIndex_=0
         */
        activeIndex_: 0,
        /*
         * Remove the DOM of inactive cards.
         * This will keep the instances & vdom trees
         * @member {Boolean} removeInactiveCards=true
         */
        removeInactiveCards: true
    }}

    /**
     * Modifies the CSS classes of the container items this layout is bound to.
     * Automatically gets triggered after changing the value of activeIndex.
     * @param {Number} value
     * @param {Number} oldValue
     * @protected
     */
    afterSetActiveIndex(value, oldValue) {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            sCfg      = me.getStaticConfig(),
            isActiveIndex, cls, items, vdom;

        if (container) {
            items = container.items;
            vdom  = container.vdom;

            if (!items[value]) {
                Neo.error('Trying to activate a non existing card', value, items);
            }

            items.forEach((item, index) => {
                cls           = item.cls;
                isActiveIndex = index === value;

                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, isActiveIndex ? sCfg.inactiveItemCls : sCfg.activeItemCls);
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(   cls, isActiveIndex ? sCfg.activeItemCls   : sCfg.inactiveItemCls);

                if (me.removeInactiveCards) {
                    item._cls = cls; // silent update
                    item.getVdomRoot().cls = cls;

                    if (isActiveIndex) {
                        item.vdom.removeDom = false;
                    } else {
                        item.mounted = false;
                        item.vdom.removeDom = true;
                    }
                } else {
                    item.cls = cls;
                }
            });

            if (me.removeInactiveCards) {
                container.vdom = vdom;
            }
        }
    }

    /**
     * Initially sets the CSS classes of the container items this layout is bound to.
     * @param {Neo.component.Base} item
     * @param {Number} index
     * @param {Boolean} [keepInDom=false]
     */
    applyChildAttributes(item, index, keepInDom=false) {
        let me            = this,
            isActiveIndex = me.activeIndex === index,
            sCfg          = me.getStaticConfig(),
            childCls      = item.cls,
            vdom          = item.vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(childCls, sCfg.itemCls);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(childCls, isActiveIndex ? sCfg.activeItemCls : sCfg.inactiveItemCls);

        if (!keepInDom && me.removeInactiveCards) {
            item._cls = childCls; // silent update
            vdom.removeDom = !isActiveIndex;
            item.vdom = vdom;
        } else {
            item.cls = childCls;
        }
    }

    /**
     * Applies CSS classes to the container this layout is bound to
     */
    applyRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Card: applyRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls || [], 'neo-layout-card');

        container.cls = cls;
    }

    /**
     * Removes all CSS rules from the container this layout is bound to.
     * Gets called when switching to a different layout.
     */
    removeRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Card: removeRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, 'neo-layout-card');

        container.cls = cls;
    }
}

Neo.applyClassConfig(Card);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/Fit.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/Fit.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Fit; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/layout/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.layout.Fit
 * @extends Neo.layout.Base
 */
class Fit extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.Fit'
         * @protected
         */
        className: 'Neo.layout.Fit',
        /**
         * @member {String} ntype='layout-fit'
         * @protected
         */
        ntype: 'layout-fit'
    }}

    /**
     * Initially sets the CSS classes of the container items this layout is bound to.
     * @param {Neo.component.Base} child
     * @param {Number} index
     */
    applyChildAttributes(child, index) {
        if (!child.ignoreLayout) {
            child.cls = _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].union(child.cls, 'neo-layout-fit-item');
        }
    }

    /**
     * Applies CSS classes to the container this layout is bound to
     */
    applyRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Fit: applyRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls || [], 'neo-layout-fit');

        container.cls = cls;
    }

    /**
     * Removes all CSS rules from the container this layout is bound to.
     * Gets called when switching to a different layout.
     */
    removeRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Fit: removeRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, 'neo-layout-fit');

        container.cls = cls;
    }
}

Neo.applyClassConfig(Fit);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/Flexbox.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/Flexbox.mjs ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Flexbox; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/layout/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * @class Neo.layout.Flexbox
 * @extends Neo.layout.Base
 */
class Flexbox extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for align
         * @member {String[]} alignValues=['center', 'end', 'start', 'stretch', null]
         * @protected
         * @static
         */
        alignValues: ['center', 'end', 'start', 'stretch', null],
        /**
         * Valid values for direction
         * @member {String[]} directionValues=['column', 'column-reverse', 'row', 'row-reverse', null]
         * @protected
         * @static
         */
        directionValues: ['column', 'column-reverse', 'row', 'row-reverse', null],
        /**
         * Valid values for pack
         * @member {String[]} packValues=['center', 'end', 'start', null]
         * @protected
         * @static
         */
        packValues: ['center', 'end', 'start', null],
        /**
         * Valid values for wrap
         * @member {String[]} wrapValues=['nowrap', 'wrap', 'wrap-reverse']
         * @protected
         * @static
         */
        wrapValues: ['nowrap', 'wrap', 'wrap-reverse'],
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.Flexbox'
         * @protected
         */
        className: 'Neo.layout.Flexbox',
        /**
         * @member {String} ntype='layout-flexbox'
         * @protected
         */
        ntype: 'layout-flexbox',
        /**
         * Valid values: 'center', 'end', 'start', 'stretch', null
         * @member {String|null} align_=null
         */
        align_: null,
        /**
         * Valid values: 'column', 'column-reverse', 'row', 'row-reverse', null
         * @member {String|null} direction_=null
         */
        direction_: null,
        /**
         * Valid values: 'center', 'end', 'start', null
         * @member {String|null} pack_=null
         */
        pack_: null,
        /**
         * CSS className prefix
         * @member {String} prefix='neo-flex-'
         */
        prefix: 'neo-flex-',
        /**
         * Valid values: nowrap, wrap, wrapreverse
         * @member {String} wrap_='nowrap'
         */
        wrap_: 'nowrap'
    }}

    /**
     * Updates the Container CSS cls after "align" gets changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetAlign(value, oldValue) {
        this.updateInputValue(value, oldValue, 'align');
    }

    /**
     * Updates the Container CSS cls after "direction" gets changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetDirection(value, oldValue) {
        this.updateInputValue(value, oldValue, 'direction');
    }

    /**
     * Updates the Container CSS cls after "pack" gets changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetPack(value, oldValue) {
        this.updateInputValue(value, oldValue, 'pack');
    }

    /**
     * Updates the Container CSS cls after "wrap" gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetWrap(value, oldValue) {
        this.updateInputValue(value, oldValue, 'wrap');
    }

    /**
     * Applies the flex value to an item of the container this layout is bound to
     * @param {Neo.component.Base} item
     */
    applyChildAttributes(item) {
        let style = item.wrapperStyle;

        style.flex = style.flex || item.flex || (this.align === 'stretch' ? 1 : '0 1 auto');
        item.wrapperStyle = style;
    }

    /**
     * Applies CSS classes to the container this layout is bound to
     */
    applyRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            prefix    = me.prefix,
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Flexbox: applyRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls || [], prefix + 'container');

        if (me.align) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, prefix + 'align-' + me.align);
        }
        if (me.direction) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, prefix + 'direction-' + me.direction);
        }
        if (me.pack) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, prefix + 'pack-' + me.pack);
        }
        if (me.wrap) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, prefix + 'wrap-' + me.wrap);
        }

        container.cls = cls;
    }

    /**
     * Checks if the new value for "align" is valid
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     * @returns {String|null} value
     */
    beforeSetAlign(value, oldValue) {
        return this.testInputValue(value, oldValue, 'alignValues', 'align');
    }

    /**
     * Checks if the new value for "direction" is valid
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     * @returns {String|null} value
     */
    beforeSetDirection(value, oldValue) {
        return this.testInputValue(value, oldValue, 'directionValues', 'direction');
    }

    /**
     * Checks if the new value for "pack" is valid
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     * @returns {String|null} value
     */
    beforeSetPack(value, oldValue) {
        return this.testInputValue(value, oldValue, 'packValues', 'pack');
    }

    /**
     * Checks if the new value for "wrap" is valid
     * @param {String} value
     * @param {String} oldValue
     * @protected
     * @returns {String} value
     */
    beforeSetWrap(value, oldValue) {
        return this.testInputValue(value, oldValue, 'wrapValues', 'wrap');
    }

    /**
     * Removes all CSS rules from an container item this layout is bound to.
     * Gets called when switching to a different layout.
     * @param {Neo.component.Base} item
     * @protected
     */
    removeChildAttributes(item) {
        let style = item.wrapperStyle || {};

        style.flex = item.flex || null;
        item.wrapperStyle = style;
    }

    /**
     * Removes all CSS rules from the container this layout is bound to.
     * Gets called when switching to a different layout.
     * @protected
     */
    removeRenderAttributes() {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            prefix    = me.prefix,
            cls       = container && container.cls;

        if (!container) {
            Neo.logError('layout.Flexbox: removeRenderAttributes -> container not yet created', me.containerId);
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + 'container');

        if (me.align) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + 'align-' + me.align);
        }
        if (me.direction) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + 'direction-' + me.direction);
        }
        if (me.pack) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + 'pack-' + me.pack);
        }
        if (me.wrap) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + 'wrap-' + me.wrap);
        }

        container.cls = cls;
    }

    /**
     * Checks if the new value for propertyName is valid
     * @param {String|null} value
     * @param {String|null} oldValue
     * @param {String} validValuesName
     * @param {String} propertyName
     * @protected
     * @returns {String|null} value
     */
    testInputValue(value, oldValue, validValuesName, propertyName) {
        const validValues = this.getStaticConfig(validValuesName);

        if (!_util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].hasItem(validValues, value)) {
            Neo.logError(this.containerId, '-> layout: supported values for "' + propertyName + '" are' , validValues);
            return oldValue;
        }

        return value;
    }

    /**
     * Updates the Container CSS cls
     * @param {String|null} value
     * @param {String|null} oldValue
     * @param {String} propertyName
     * @protected
     */
    updateInputValue(value, oldValue, propertyName) {
        let me        = this,
            container = Neo.getComponent(me.containerId),
            prefix    = me.prefix,
            cls       = container && container.cls;

        if (container && container.rendered) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, prefix + propertyName + '-' + oldValue);

            if (value !== null) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, prefix + propertyName + '-' + value);
            }

            container.cls = cls;
        }
    }
}

Neo.applyClassConfig(Flexbox);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/HBox.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/HBox.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HBox; });
/* harmony import */ var _Flexbox_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Flexbox.mjs */ "./node_modules/neo.mjs/src/layout/Flexbox.mjs");


/**
 * @class Neo.layout.HBox
 * @extends Neo.layout.Flexbox
 */
class HBox extends _Flexbox_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.HBox'
         * @protected
         */
        className: 'Neo.layout.HBox',
        /**
         * @member {String} ntype='layout-hbox'
         * @protected
         */
        ntype: 'layout-hbox',
        /**
         * @member {String} direction='row'
         * @protected
         */
        direction: 'row'
    }}

    /**
     * Applies the flex value to an item of the container this layout is bound to
     * @param {Object} item
     */
    applyChildAttributes(item) {
        // Do not apply flex if fixed width
        if (!item.width) {
            super.applyChildAttributes(item);
        }
    }
}

Neo.applyClassConfig(HBox);



/***/ }),

/***/ "./node_modules/neo.mjs/src/layout/VBox.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/layout/VBox.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VBox; });
/* harmony import */ var _Flexbox_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Flexbox.mjs */ "./node_modules/neo.mjs/src/layout/Flexbox.mjs");


/**
 * @class Neo.layout.VBox
 * @extends Neo.layout.Flexbox
 */
class VBox extends _Flexbox_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.layout.VBox'
         * @protected
         */
        className: 'Neo.layout.VBox',
        /**
         * @member {String} ntype='layout-vbox'
         * @protected
         */
        ntype: 'layout-vbox',
        /**
         * @member {String} direction='column'
         * @protected
         */
        direction: 'column'
    }}

    /**
     * Applies the flex value to an item of the container this layout is bound to
     * @param {Object} item
     */
    applyChildAttributes(item) {
        // Do not apply flex if fixed height
        if (!item.height) {
            super.applyChildAttributes(item);
        }
    }
}

Neo.applyClassConfig(VBox);



/***/ }),

/***/ "./node_modules/neo.mjs/src/selection/Model.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/selection/Model.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");




/**
 * @class Neo.selection.Model
 * @extends Neo.core.Base
 */
class Model extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.selection.Model'
         * @protected
         */
        className: 'Neo.selection.Model',
        /**
         * @member {String} ntype='selection-model'
         * @protected
         */
        ntype: 'selection-model',
        /**
         * Placeholder for extended classes to add a custom css rule to this owner component
         * @member {String|null} cls=null
         * @protected
         */
        cls: null,
        /**
         * @member {Array} items=[]
         * @protected
         */
        items: [],
        /**
         * @member {String} selectedCls='selected'
         */
        selectedCls: 'neo-selected',
        /**
         * @member {Boolean} singleSelect=true
         */
        singleSelect: true,
        /**
         * Internally saves the view id, but the getter will return the matching instance
         * @member {Object} view_=null
         * @protected
         */
        view_: null
    }}

    /**
     * Gets triggered before getting the value of the view config
     * @returns {Neo.component.Base}
     */
    beforeGetView() {
        return Neo.getComponent(this._view);
    }

    /**
     * Gets triggered before setting the value of the view config
     * @returns {String} the view id
     */
    beforeSetView(value) {
        return value && value.id;
    }

    /**
     *
     */
    addDomListener() {}

    /**
     *
     * @param {Object} item
     * @param {Boolean} [silent] true to prevent a vdom update
     * @param {Array} [itemCollection]
     * @param {String} [selectedCls]
     */
    deselect(item, silent, itemCollection, selectedCls) {
        let me   = this,
            view = me.view,
            vdom = view.vdom,
            node = view.getVdomChild(item), // todo: support for nodes (right now limited to ids)
            cls;

        if (node) {
            cls = node.cls || [];
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, selectedCls || me.selectedCls);
            node.cls = cls;
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(itemCollection || me.items, item);

        if (!silent) {
            view.vdom = vdom;
        }
    }

    /**
     *
     * @param {Boolean} [silent] true to prevent a vdom update
     */
    deselectAll(silent) {
        let me    = this,
            items = [...me.items],
            view  = me.view,
            vdom  = view.vdom;

        items.forEach(item => {
            me.deselect(item, true);
        });

        if (!silent && items.length > 0) {
            view.vdom = vdom;
        }
    }

    /**
     *
     */
    destroy() {
        this.unregister();
        super.destroy();
    }

    /**
     *
     * @returns {Array} this.items
     */
    getSelection() {
        return this.items;
    }

    /**
     *
     * @returns {Boolean} true in case there is a selection
     */
    hasSelection() {
        return this.items.length > 0;
    }

    /**
     *
     * @param {String} id
     * @returns {Boolean} true in case the item is selected
     */
    isSelected(id) {
        return this.items.indexOf(id) > -1;
    }

    /**
     *
     * @param {Neo.component.Base} component
     */
    register(component) {
        let me  = this,
            cls = component.cls || [];

        if (me.cls && !cls.includes(me.cls)) {
            cls.push(me.cls);
            component.cls = cls;
        }

        me.view = component;
        me.addDomListener();
    }

    /**
     *
     */
    removeDomListeners() {
        let me           = this,
            component    = me.view,
            domListeners = [...component.domListeners];

        component.domListeners.forEach(listener => {
            if (listener.scope === me) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(domListeners, listener);
            }
        });

        component.domListeners = domListeners;
    }

    /**
     *
     * @param {Object|Object[]|String[]} items
     * @param {Array} [itemCollection]
     * @param {String} [selectedCls]
     */
    select(items, itemCollection, selectedCls) {
        items = Array.isArray(items) ? items : [items];

        let me   = this,
            view = me.view,
            vdom = view.vdom,
            cls;

        if (me.singleSelect) {
            me.deselectAll(true);
        }

        items.forEach(node => {
            if (typeof node === 'string') {
                node = view.getVdomChild(node);
            }

            if (node) {
                cls = node.cls || [];
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, selectedCls || me.selectedCls);
                node.cls = cls;
            }
        });

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(itemCollection || me.items, items);

        view[view.hasOwnProperty('silentSelect') && view.silentSelect === true ? '_vdom' : 'vdom'] = vdom;
    }

    /**
     *
     * @param {Object} item
     */
    toggleSelection(item) {
        let me = this;

        if (me.isSelected(item)) {
            me.deselect(item);
        } else {
            me.select(item);
        }
    }

    /**
     *
     */
    unregister() {
        let me  = this,
            cls = me.view.cls || [];

        if (me.cls && cls.includes(me.cls)) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, me.cls);
            me.view.cls = cls;
        }

        me.deselectAll();

        me.removeDomListeners();
    }
}

Neo.applyClassConfig(Model);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/ClassSystem.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/ClassSystem.mjs ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.util.ClassSystem
 * @extends Neo.core.Base
 */
class ClassSystem extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.ClassSystem'
         * @protected
         */
        className: 'Neo.util.ClassSystem'
    }}

    /**
     * can get used inside beforeSet methods in case you want to create instances like stores
     * @param {Object|Neo.core.Base|null} config
     * @param {Neo.core.Base} [DefaultClass=null]
     * @param {Object} [defaultValues={}]
     * @returns {Neo.core.Base} instance
     */
    static beforeSetInstance(config, DefaultClass=null, defaultValues={}) {
        if (!config && DefaultClass) {
            config = Neo.create(DefaultClass, defaultValues);
        } else if (config && config.isClass) {
            config = Neo.create(config, defaultValues);
        } else if (Neo.isObject(config) && !(config instanceof Neo.core.Base)) {
            if (config.ntype) {
                config = Neo.ntype({
                    ...defaultValues,
                    ...config
                });
            } else {
                const newConfig = {};

                if (DefaultClass) {
                    newConfig.module = DefaultClass;
                }

                Object.assign(newConfig, {
                    ...defaultValues,
                    ...config
                });

                config = Neo.create(newConfig);
            }
        }

        return config;
    }
}

Neo.applyClassConfig(ClassSystem);

/* harmony default export */ __webpack_exports__["default"] = (ClassSystem);

/***/ }),

/***/ "./node_modules/neo.mjs/src/util/KeyNavigation.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/KeyNavigation.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_Object_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Object.mjs */ "./node_modules/neo.mjs/src/util/Object.mjs");




/**
 * @class Neo.util.KeyNavigation
 * @extends Neo.core.Base
 */
class KeyNavigation extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.KeyNavigation'
         * @protected
         */
        className: 'Neo.util.KeyNavigation',
        /**
         * @member {String} ntype='keynav'
         * @protected
         */
        ntype: 'keynav',
        /**
         * Internally stores the component id inside _component
         * @member {Neo.component.Base|null} component_=null
         */
        component_: null,
        /**
         * Set this to true in case the keydown event is supposed to bubble upwards inside the component tree
         * @member {Boolean} keyDownEventBubble=false
         */
        keyDownEventBubble: false,
        /**
         * @member {Array|null} keys_=null
         */
        keys_: null
    }}

    add(value) {
        this._keys.push(...this.parseKeys(value));
    }

    /**
     *
     * @protected
     * @returns {Neo.component.Base}
     */
    beforeGetComponent() {
        return Neo.getComponent(this._component);
    }

    /**
     *
     * @param {Neo.component.Base} value
     * @protected
     * @returns {String} the component id
     */
    beforeSetComponent(value) {
        return value && value.id;
    }

    /**
     *
     */
    destroy() {
        this.unregister();
        super.destroy();
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDown(data) {
        // Using the chrome auto-fill feature does trigger a keydown event, not containing a key. See: #64
        if (data.key) {
            let me           = this,
                upperCaseKey = data.key.toUpperCase(),
                scope;

            upperCaseKey = me.parseUpperCaseKey(upperCaseKey);

            // console.log('KeyNavigation onKeyDown', upperCaseKey, data, me.keys);

            me.keys.forEach(key => {
                scope = Neo.get(key.scope);

                if (key.key.toUpperCase() === upperCaseKey) {
                    if (scope[key.fn]) {
                        scope[key.fn].apply(scope, [data]);
                    }
                }
            });
        }
    }

    /**
     *
     * @param {Object} value
     * @returns {Object}
     */
    parseKeys(value) {
        if (!Array.isArray(value)) {
            let componentId = this._component,
                keyArray    = [];

            if (componentId) {
                Object.entries(value).forEach(([key, value]) => {
                    keyArray.push({
                        fn   : value,
                        key  : key,
                        scope: componentId // todo: support VCs later on
                    })
                });

                value = keyArray;
            }
        }

        return value;
    }

    /**
     * Replaces specific key names, e.g. " " => SPACE
     * @param {String} key
     * @protected
     * @returns {String}
     */
    parseUpperCaseKey(key) {
        switch (key) {
            case ' ':
                key = 'SPACE';
                break;
            case 'ARROWDOWN':
                key = 'DOWN';
                break;
            case 'ARROWLEFT':
                key = 'LEFT';
                break;
            case 'ARROWRIGHT':
                key = 'RIGHT';
                break;
            case 'ARROWUP':
                key = 'UP';
                break;
        }

        return key;
    }

    /**
     *
     * @param {Neo.component.Base} component
     */
    register(component) {
        let me           = this,
            domListeners = component.domListeners;

        me.component = component;
        me.keys      = me.parseKeys(me.keys);

        if (domListeners) {
            domListeners.push({
                keydown: {
                    fn    : me.onKeyDown,
                    bubble: me.keyDownEventBubble,
                    scope : me
                }
            });

            component.domListeners = domListeners;
        }
    }

    /**
     * Remove a key listener using the same config used when creating it
     * @param {Object} config
     */
    removeKey(config) {
        let me   = this,
            keys = me._keys,
            i    = 0,
            len  = keys.length,
            key;

        for (; i < len; i++) {
            key = keys[i];

            if (_util_Object_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].isEqual(key, config)) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(keys, key);
                break;
            }
        }
    }

    /**
     * Remove multiple key listeners passing an array of config items
     * @param {Array} items
     */
    removeKeys(items) {
        if (Array.isArray(items)) {
            items.forEach(item => this.removeKey(item));
        }
    }

    /**
     *
     */
    unregister() {
        // todo: remove the dom listener from the owner component
    }
}

Neo.applyClassConfig(KeyNavigation);

/* harmony default export */ __webpack_exports__["default"] = (KeyNavigation);

/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Object.mjs":
/*!**************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Object.mjs ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.util.Object
 * @extends Neo.core.Base
 */
class NeoObject extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Object'
         * @protected
         */
        className: 'Neo.util.Object'
    }}

    /**
     * Returns true if all properties of x match with the properties of y
     * Supports nested Objects, but not arrays as prop values
     * @param {Object} x
     * @param {Object} y
     * @returns {Boolean}
     */
    static isEqual(x, y) {
        return (Neo.isObject(x) && Neo.isObject(y)) ?
            (
                Object.keys(x).length === Object.keys(y).length) &&
                Object.keys(x).reduce(function(isEqual, key) {
                    return isEqual && NeoObject.isEqual(x[key], y[key]);
                }, true
            ) : (x === y);
    }
}

Neo.applyClassConfig(NeoObject);

/* harmony default export */ __webpack_exports__["default"] = (NeoObject);

/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Style.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Style.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.util.Style
 * @extends Neo.core.Base
 */
class Style extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Style'
         * @protected
         */
        className: 'Neo.util.Style'
    }}

    /**
     * Creates an delta object, containing the styles of newStyle which are not included or different than in oldStyle
     * Styles included in oldStyle but missing in newStyle will get a value of null
     * see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
     * @param {Object|String} newStyle
     * @param {Object|String} oldStyle
     * @returns {Object} style delta
     */
    static compareStyles(newStyle, oldStyle) {
        let styles = {};

        if (Neo.isString(newStyle)) {
            newStyle = Neo.core.Util.createStyleObject(newStyle);
        }

        if (Neo.isString(oldStyle)) {
            oldStyle = Neo.core.Util.createStyleObject(oldStyle);
        }

        if (!newStyle && !oldStyle) {
            return null;
        } else if (!oldStyle) {
            return Neo.clone(newStyle);
        } else if (!newStyle) {
            Object.keys(oldStyle).forEach(function(style) {
                styles[style] = null;
            });
        } else {
            Object.keys(newStyle).forEach(function(style) {
                if (!oldStyle.hasOwnProperty(style) || oldStyle[style] !== newStyle[style]) {
                    styles[style] = newStyle[style];
                }
            });

            Object.keys(oldStyle).forEach(function(style) {
                if (!newStyle.hasOwnProperty(style)) {
                    styles[style] = null;
                }
            });

            if (Object.keys(styles).length > 0) {
                return styles;
            }

            return null;
        }
    }
}

Neo.applyClassConfig(Style);

/* harmony default export */ __webpack_exports__["default"] = (Style);

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvYnV0dG9uL0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbXBvbmVudC9MYWJlbC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9CYXNlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL1BhbmVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL1Rvb2xiYXIubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb250YWluZXIvVmlld3BvcnQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kYXRhL01vZGVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9SZWNvcmRGYWN0b3J5Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9TdG9yZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvVGV4dC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvdHJpZ2dlci9CYXNlLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZm9ybS9maWVsZC90cmlnZ2VyL0NsZWFyLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbGF5b3V0L0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9sYXlvdXQvQ2FyZC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2xheW91dC9GaXQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9sYXlvdXQvRmxleGJveC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2xheW91dC9IQm94Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvbGF5b3V0L1ZCb3gubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9zZWxlY3Rpb24vTW9kZWwubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL0NsYXNzU3lzdGVtLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9LZXlOYXZpZ2F0aW9uLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdXRpbC9PYmplY3QubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy91dGlsL1N0eWxlLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEM7QUFDSjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQVM7QUFDNUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNB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Q0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVlLHdFQUFTLEU7Ozs7Ozs7Ozs7OztBQ25DeEI7QUFBQTtBQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0RBQUk7QUFDeEIsd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsZUFBZSxjQUFjO0FBQzdCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsb0VBQUssRSIsImZpbGUiOiJ2ZW5kb3JzfmNodW5rcy9hcHBzLWNvdmlkMTktYXBwLW1qc35jaHVua3MvZG9jcy1hcHAtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICBmcm9tICcuLi91dGlsL0FycmF5Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5idXR0b24uQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3IgaWNvblBvc2l0aW9uXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBpY29uUG9zaXRpb25zPVsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBpY29uUG9zaXRpb25zOiBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uYnV0dG9uLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5idXR0b24uQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdidXR0b24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tYnV0dG9uJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tYnV0dG9uJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmYWxzZSBjYWxscyBOZW8uTWFpbi5zZXRSb3V0ZSgpXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGVkaXRSb3V0ZT10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBlZGl0Um91dGU6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCBmb3IgZG9tTGlzdGVuZXJzPXtjbGljazpoYW5kbGVyfVxuICAgICAgICAgKiBBIHN0cmluZyBiYXNlZCB2YWx1ZSBhc3N1bWVzIHRoYXQgdGhlIGhhbmRsZXJGbiBsaXZlcyBpbnNpZGUgYSBDb21wb25lbnRDb250cm9sbGVyXG4gICAgICAgICAqIEBtZW1iZXIge0Z1bmN0aW9ufFN0cmluZ3xudWxsfSBoYW5kbGVyXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBoYW5kbGVyXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzY29wZSAodGhpcyBwb2ludGVyKSBpbnNpZGUgdGhlIGhhbmRsZXIgZnVuY3Rpb24uXG4gICAgICAgICAqIFBvaW50cyB0byB0aGUgYnV0dG9uIGluc3RhbmNlIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBoYW5kbGVyU2NvcGU9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaGFuZGxlclNjb3BlOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIENTUyBjbGFzcyB0byB1c2UgZm9yIGFuIGljb24sIGUuZy4gJ2ZhIGZhLWhvbWUnXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBbaWNvbkNsc189bnVsbF1cbiAgICAgICAgICovXG4gICAgICAgIGljb25DbHNfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNvbG9yIHRvIHVzZSBmb3IgYW4gaWNvbiwgZS5nLiAnI2ZmMDAwMCcgW29wdGlvbmFsXVxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gaWNvbkNvbG9yXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBpY29uQ29sb3JfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBpY29uIGluIGNhc2UgaWNvbkNscyBoYXMgYSB2YWx1ZS5cbiAgICAgICAgICogVmFsaWQgdmFsdWVzIGFyZTogJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCdcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBpY29uUG9zaXRpb25fPSdsZWZ0J1xuICAgICAgICAgKi9cbiAgICAgICAgaWNvblBvc2l0aW9uXzogJ2xlZnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHByZXNzZWQgc3RhdGUgb2YgdGhlIEJ1dHRvblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBwcmVzc2VkXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHJlc3NlZF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlIHRoZSBicm93c2VyIGhhc2ggdmFsdWUgb24gY2xpY2tcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHJvdXRlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICByb3V0ZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdGV4dCBkaXNwbGF5ZWQgb24gdGhlIGJ1dHRvbiBbb3B0aW9uYWxdXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdGV4dF89JydcbiAgICAgICAgICovXG4gICAgICAgIHRleHRfOiAnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRyYW5zZm9ybXMgdGhlIGJ1dHRvbiB0YWcgaW50byBhbiBhIHRhZyBbb3B0aW9uYWxdXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSB1cmxfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHVybF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB1cmwgaXMgc2V0LCBhcHBsaWVzIHRoZSB0YXJnZXQgYXR0cmlidXRlIG9uIHRoZSB0b3AgbGV2ZWwgdmRvbSBub2RlIFtvcHRpb25hbF1cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB1cmxUYXJnZXRfPSdfYmxhbmsnXG4gICAgICAgICAqL1xuICAgICAgICB1cmxUYXJnZXRfOiAnX2JsYW5rJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgY24gOiBbXG4gICAgICAgICAgICAgICAge3RhZzogJ3NwYW4nLCBjbHM6IFsnbmVvLWJ1dHRvbi1nbHlwaCddfSxcbiAgICAgICAgICAgICAgICB7dGFnOiAnc3BhbicsIGNsczogWyduZW8tYnV0dG9uLXRleHQnXX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGhhbmRsZXIgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SGFuZGxlcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnMgfHwgW107XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGljazogdmFsdWUsXG4gICAgICAgICAgICAgICAgc2NvcGU6IG1lLmhhbmRsZXJTY29wZSB8fCBtZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaWNvbkNscyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJY29uQ2xzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaWNvbk5vZGUgPSBtZS5nZXRWZG9tUm9vdCgpLmNuWzBdO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShpY29uTm9kZS5jbHMsIG9sZFZhbHVlKTtcblxuICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgaWNvbk5vZGUucmVtb3ZlRG9tID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGljb25Ob2RlLnJlbW92ZURvbSA9IGZhbHNlO1xuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGljb25Ob2RlLmNscywgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpY29uQ29sb3IgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEljb25Db2xvcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGljb25Ob2RlID0gbWUuZ2V0VmRvbVJvb3QoKS5jblswXTtcblxuICAgICAgICBpZiAoIWljb25Ob2RlLnN0eWxlKSB7XG4gICAgICAgICAgICBpY29uTm9kZS5zdHlsZSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWNvbk5vZGUuc3R5bGUuY29sb3IgPSB2YWx1ZTtcbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpY29uUG9zaXRpb24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SWNvblBvc2l0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgY2xzID0gdGhpcy5jbHM7XG5cbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgJ2ljb24tJyArIG9sZFZhbHVlKTtcbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ2ljb24tJyArIHZhbHVlKTtcblxuICAgICAgICB0aGlzLmNscyA9IGNscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHByZXNzZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRQcmVzc2VkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgY2xzID0gdGhpcy5jbHM7XG5cbiAgICAgICAgTmVvQXJyYXlbdmFsdWUgPT09IHRydWUgPyAnYWRkJyA6ICdyZW1vdmUnXShjbHMsICdwcmVzc2VkJyk7XG4gICAgICAgIHRoaXMuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgcm91dGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Um91dGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzIHx8IFtdO1xuXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY2xpY2s6IG1lLmNoYW5nZVJvdXRlLFxuICAgICAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdGV4dCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUZXh0KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgdmRvbVJvb3QgPSBtZS5nZXRWZG9tUm9vdCgpLFxuICAgICAgICAgICAgdGV4dE5vZGUgPSB2ZG9tUm9vdC5jblsxXTtcblxuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5hZGQobWUuX2NscywgICAgICAnbm8tdGV4dCcpO1xuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKHZkb21Sb290LmNscywgJ25vLXRleHQnKTtcbiAgICAgICAgICAgIHRleHROb2RlLnJlbW92ZURvbSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUobWUuX2NscywgICAgICAnbm8tdGV4dCcpO1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKHZkb21Sb290LmNscywgJ25vLXRleHQnKTtcbiAgICAgICAgICAgIHRleHROb2RlLnJlbW92ZURvbSA9IGZhbHNlO1xuICAgICAgICAgICAgdGV4dE5vZGUuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVybCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRVcmwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICB2ZG9tUm9vdCA9IG1lLmdldFZkb21Sb290KCk7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2ZG9tUm9vdC5ocmVmID0gdmFsdWU7XG4gICAgICAgICAgICB2ZG9tUm9vdC50YWcgID0gJ2EnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHZkb21Sb290LmhyZWY7XG4gICAgICAgICAgICB2ZG9tUm9vdC50YWcgPSAnYnV0dG9uJztcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdXJsVGFyZ2V0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFVybFRhcmdldCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIHZkb21Sb290ID0gbWUuZ2V0VmRvbVJvb3QoKTtcblxuICAgICAgICBpZiAobWUudXJsKSB7XG4gICAgICAgICAgICB2ZG9tUm9vdC50YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2ZG9tUm9vdC50YXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgaWNvbkNscyBhcnJheSBpbnRvIGEgc3RyaW5nIG9uIGJlZm9yZUdldFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZUdldEljb25DbHMoKSB7XG4gICAgICAgIGxldCBpY29uQ2xzID0gdGhpcy5faWNvbkNscztcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpY29uQ2xzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGljb25DbHMuam9pbignICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGljb25DbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgaWNvbkNscyBjb25maWcgZ2V0cyBjaGFuZ2VkLiBDb252ZXJ0cyB0aGUgc3RyaW5nIGludG8gYW4gYXJyYXkgaWYgbmVlZGVkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldEljb25DbHModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBpY29uUG9zaXRpb24gY29uZmlnIGdldHMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRJY29uUG9zaXRpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJlZm9yZVNldEVudW1WYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsICdpY29uUG9zaXRpb24nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY2hhbmdlUm91dGUoKSB7XG4gICAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuZWRpdFJvdXRlKSB7XG4gICAgICAgICAgICBOZW8uTWFpbi5lZGl0Um91dGUodGhpcy5yb3V0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBOZW8uTWFpbi5zZXRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lLnJvdXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ2xhc3NTeXN0ZW1VdGlsICBmcm9tICcuLi91dGlsL0NsYXNzU3lzdGVtLm1qcyc7XG5pbXBvcnQgQ29yZUJhc2UgICAgICAgICBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXIvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgRG9tRXZlbnRNYW5hZ2VyICBmcm9tICcuLi9tYW5hZ2VyL0RvbUV2ZW50Lm1qcyc7XG5pbXBvcnQgS2V5TmF2aWdhdGlvbiAgICBmcm9tICcuLi91dGlsL0tleU5hdmlnYXRpb24ubWpzJztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgIGZyb20gJy4uL2NvcmUvTG9nZ2VyLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICAgICAgICBmcm9tICcuLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgT2JzZXJ2YWJsZSAgICAgICBmcm9tICcuLi9jb3JlL09ic2VydmFibGUubWpzJztcbmltcG9ydCBTdHlsZSAgICAgICAgICAgIGZyb20gJy4uL3V0aWwvU3R5bGUubWpzJztcbmltcG9ydCBVdGlsICAgICAgICAgICAgIGZyb20gJy4uL2NvcmUvVXRpbC5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICAgICAgZnJvbSAnLi4vdXRpbC9WRG9tLm1qcyc7XG5pbXBvcnQgVk5vZGVVdGlsICAgICAgICBmcm9tICcuLi91dGlsL1ZOb2RlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5jb21wb25lbnQuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29yZUJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgYXV0b21hdGljYWxseSBhcHBsaWVzIHRoZSBjb3JlL09ic2VydmFibGUubWpzIG1peGluXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG9ic2VydmFibGU9dHJ1ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBvYnNlcnZhYmxlOiB0cnVlXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29tcG9uZW50LkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb21wb25lbnQuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdjb21wb25lbnQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnY29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBBcHAgdGhpcyBjb21wb25lbnQgYmVsb25ncyB0b1xuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYXBwTmFtZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgYXBwTmFtZV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgbW91bnRzIGEgY29tcG9uZW50IGFmdGVyIGJlaW5nIHJlbmRlcmVkLlxuICAgICAgICAgKiBVc2UgdGhpcyBmb3IgdGhlIHRvcCBsZXZlbCBjb21wb25lbnQgb2YgeW91ciBhcHAuXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGF1dG9Nb3VudD1mYWxzZVxuICAgICAgICAgKiBAdHV0b3JpYWwgMDJfQ2xhc3NTeXN0ZW1cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9Nb3VudDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgcmVuZGVycyBhIGNvbXBvbmVudCBhZnRlciBiZWluZyBjcmVhdGVkIGluc2lkZSB0aGUgaW5pdCBjYWxsLlxuICAgICAgICAgKiBVc2UgdGhpcyBmb3IgdGhlIHRvcCBsZXZlbCBjb21wb25lbnQgb2YgeW91ciBhcHAuXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGF1dG9SZW5kZXI9ZmFsc2VcbiAgICAgICAgICogQHNlZSB7QGxpbmsgTmVvLmNvbXBvbmVudC5CYXNlI2luaXQgaW5pdH1cbiAgICAgICAgICogQHR1dG9yaWFsIDAyX0NsYXNzU3lzdGVtXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1hbmFnZXIuRm9jdXMgd2lsbCBjaGFuZ2UgdGhpcyBmbGFnIG9uIGZvY3VzaW4gJiBvdXQgZG9tIGV2ZW50c1xuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBjb250YWluc0ZvY3VzXz1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWluc0ZvY3VzXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBc3NpZ24gYSBjb21wb25lbnQgY29udHJvbGxlciB0byB0aGlzIGNvbXBvbmVudCAocGFzcyBhbiBpbXBvcnRlZCBtb2R1bGUgb3IgdGhlIHN0cmluZyBiYXNlZCBjbGFzcyBuYW1lKVxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uY29udHJvbGxlci5Db21wb25lbnR8U3RyaW5nfSBjb250cm9sbGVyXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjb250cm9sbGVyXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVkIGNvbXBvbmVudHMgd2lsbCBnZXQgdGhlIG5lby1kaXNhYmxlZCBjbHMgYXBwbGllZCBhbmQgd29uJ3QgcmVjZWl2ZSBET00gZXZlbnRzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGRpc2FibGVkXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIGRvbUxpc3RlbmVyIGNvbmZpZ3NcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0W118bnVsbH0gZG9tTGlzdGVuZXJzXz1udWxsXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGFmdGVyU2V0U3RheU9uSG92ZXIodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAqICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICogICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICogICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gbWUuZG9tTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgKiAgICAgICAgICAgICB7bW91c2VlbnRlcjogbWUub25Nb3VzZUVudGVyLCBzY29wZTogbWV9LFxuICAgICAgICAgKiAgICAgICAgICAgICB7bW91c2VsZWF2ZTogbWUub25Nb3VzZUxlYXZlLCBzY29wZTogbWV9XG4gICAgICAgICAqICAgICAgICAgKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgIG1lLmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICAgICAgICogICAgfVxuICAgICAgICAgKn1cbiAgICAgICAgICovXG4gICAgICAgIGRvbUxpc3RlbmVyc186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyBjb25maWcgdG8gdHJ1ZSB0byBkeW5hbWljYWxseSBpbXBvcnQgYSBEcm9wWm9uZSBtb2R1bGUgJiBjcmVhdGUgYW4gaW5zdGFuY2VcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gZHJvcHBhYmxlXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZHJvcHBhYmxlXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZHJhZ2dhYmxlLkRyb3Bab25lfG51bGx9IGRyb3Bab25lPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyb3Bab25lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkcm9wWm9uZUNvbmZpZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcm9wWm9uZUNvbmZpZzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsIGZsYWcgd2hpY2ggd2lsbCBnZXQgc2V0IHRvIHRydWUgb24gbW91bnRcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaGFzQmVlbk1vdW50ZWQ9ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaGFzQmVlbk1vdW50ZWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZmxhZyBmb3IgdmRvbSBjaGFuZ2VzIGFmdGVyIGEgY29tcG9uZW50IGdvdCB1bm1vdW50ZWRcbiAgICAgICAgICogKGRlbHRhIHVwZGF0ZXMgY2FuIG5vIGxvbmdlciBnZXQgYXBwbGllZCAmIGEgbmV3IHJlbmRlciBjYWxsIGlzIHJlcXVpcmVkIGJlZm9yZSByZS1tb3VudGluZylcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaGFzVW5tb3VudGVkVmRvbUNoYW5nZXNfPWZhbHNlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGhhc1VubW91bnRlZFZkb21DaGFuZ2VzXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCBmb3Igc3R5bGUuaGVpZ2h0LCBkZWZhdWx0cyB0byBweFxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8U3RyaW5nfG51bGx9IGhlaWdodF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaGVpZ2h0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0b3AgbGV2ZWwgaW5uZXJIVE1MIG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGh0bWxfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGh0bWxfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHVuaXF1ZSBjb21wb25lbnQgaWRcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGlkXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBpZF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHdoaWNoIHdpbGwgZ2V0IHNldCB0byB0cnVlIHdoaWxlIGFuIHVwZGF0ZSByZXF1ZXN0ICh3b3JrZXIgbWVzc2FnZXMpIGlzIGluIHByb2dyZXNzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzVmRvbVVwZGF0aW5nPWZhbHNlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGlzVmRvbVVwZGF0aW5nOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzaW5nIHRoZSBrZXlzIGNvbmZpZyB3aWxsIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBOZW8udXRpbC5LZXlOYXZpZ2F0aW9uLlxuICAgICAgICAgKiBAc2VlIHtAbGluayBOZW8udXRpbC5LZXlOYXZpZ2F0aW9uIEtleU5hdmlnYXRpb259XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0ga2V5c189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAga2V5c186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCBmb3Igc3R5bGUubWF4SGVpZ2h0LCBkZWZhdWx0cyB0byBweFxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8U3RyaW5nfG51bGx9IG1heEhlaWdodF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgbWF4SGVpZ2h0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3J0Y3V0IGZvciBzdHlsZS5tYXhXaWR0aCwgZGVmYXVsdHMgdG8gcHhcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfFN0cmluZ3xudWxsfSBtYXhXaWR0aF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgbWF4V2lkdGhfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvcnRjdXQgZm9yIHN0eWxlLm1pbkhlaWdodCwgZGVmYXVsdHMgdG8gcHhcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfFN0cmluZ3xudWxsfSBtaW5IZWlnaHRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIG1pbkhlaWdodF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCBmb3Igc3R5bGUubWluV2lkdGgsIGRlZmF1bHRzIHRvIHB4XG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxTdHJpbmd8bnVsbH0gbWluV2lkdGhfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIG1pbldpZHRoXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgaW4gY2FzZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQgdG8gdGhlIERPTVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBtb3VudGVkXz1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtb3VudGVkXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHdoaWNoIHdpbGwgZ2V0IHNldCB0byB0cnVlIGluIGNhc2UgYW4gdXBkYXRlIGNhbGwgYXJyaXZlcyB3aGlsZSBhbm90aGVyIHVwZGF0ZSBpcyBydW5uaW5nXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG5lZWRzVmRvbVVwZGF0ZT1mYWxzZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBuZWVkc1Zkb21VcGRhdGU6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBhcmVudCBjb21wb25lbnQgaWQgb3IgZG9jdW1lbnQuYm9keVxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHBhcmVudElkPSdkb2N1bWVudC5ib2R5J1xuICAgICAgICAgKi9cbiAgICAgICAgcGFyZW50SWQ6ICdkb2N1bWVudC5ib2R5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFycmF5IG9mIFBsdWdpbiBNb2R1bGVzIGFuZCAvIG9yIGNvbmZpZyBvYmplY3RzXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fG51bGx9IHBsdWdpbnNfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcGx1Z2luc186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGluIGNhc2UgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJpbmcgdGhlIHZub2RlXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlbmRlcmluZ189ZmFsc2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgcmVuZGVyaW5nXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyB0byB0cnVlIGZvciBidWxrIHVwZGF0ZXMuXG4gICAgICAgICAqIEVuc3VyZSB0byBzZXQgaXQgYmFjayB0byBmYWxzZSBhZnRlcndhcmRzLlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzaWxlbnRWZG9tVXBkYXRlPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzaWxlbnRWZG9tVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvcCBsZXZlbCBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gc3R5bGU9e31cbiAgICAgICAgICovXG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCB0b29sdGlwIGNvbmZpZyBvYmplY3RzXG4gICAgICAgICAqIFNlZSB0b29sdGlwL0Jhc2UubWpzXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fE9iamVjdH0gdG9vbHRpcHNfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRvb2x0aXBzXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb21wb25lbnQgdm5vZGUgdHJlZS4gQXZhaWxhYmxlIGFmdGVyIHRoZSBjb21wb25lbnQgZ290IHJlbmRlcmVkLlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHZub2RlXz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHZub2RlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3J0Y3V0IGZvciBzdHlsZS53aWR0aCwgZGVmYXVsdHMgdG8gcHhcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfFN0cmluZ3xudWxsfSB3aWR0aF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgd2lkdGhfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVG9wIGxldmVsIHN0eWxlIGF0dHJpYnV0ZXMuIFVzZWZ1bCBpbiBjYXNlIGdldFZkb21Sb290KCkgZG9lcyBub3QgcG9pbnQgdG8gdGhlIHRvcCBsZXZlbCBET00gbm9kZS5cbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fG51bGx9IHdyYXBwZXJTdHlsZV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgd3JhcHBlclN0eWxlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2ZG9tIG1hcmt1cCBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb209e31cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7fVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgZGlmZmVyZW50IHZkb20gcm9vdCBpZiBuZWVkZWQgdG8gYXBwbHkgdGhlIHRvcCBsZXZlbCBzdHlsZSBhdHRyaWJ1dGVzIG9uIGEgZGlmZmVyZW50IGxldmVsLlxuICAgICAqIE1ha2Ugc3VyZSB0byB1c2UgZ2V0Vm5vZGVSb290KCkgYXMgd2VsbCwgdG8ga2VlcCB0aGUgdmRvbSAmIHZub2RlIHRyZWVzIGluIHN5bmMuXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIG5ldyB2ZG9tIHJvb3RcbiAgICAgKi9cbiAgICBnZXRWZG9tUm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgZGlmZmVyZW50IHZub2RlIHJvb3QgaWYgbmVlZGVkIHRvIGFwcGx5IHRoZSB0b3AgbGV2ZWwgc3R5bGUgYXR0cmlidXRlcyBvbiBhIGRpZmZlcmVudCBsZXZlbC5cbiAgICAgKiBNYWtlIHN1cmUgdG8gdXNlIGdldFZkb21Sb290KCkgYXMgd2VsbCwgdG8ga2VlcCB0aGUgdmRvbSAmIHZub2RlIHRyZWVzIGluIHN5bmMuXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIG5ldyB2bm9kZSByb290XG4gICAgICovXG4gICAgZ2V0Vm5vZGVSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52bm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBjaGFuZ2UgdGhlIG9yZGVyIGNvbmZpZ3MgYXJlIGFwcGxpZWQgdG8gdGhpcyBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcHJldmVudE9yaWdpbmFsQ29uZmlnXSBUcnVlIHByZXZlbnRzIHRoZSBpbnN0YW5jZSBmcm9tIGdldHRpbmcgYW4gb3JpZ2luYWxDb25maWcgcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBtZXJnZUNvbmZpZyguLi5hcmdzKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29uZmlnID0gc3VwZXIubWVyZ2VDb25maWcoLi4uYXJncyksXG5cbiAgICAgICAgICAgIC8vIGl0IHNob3VsZCBiZSBwb3NzaWJsZSB0byBzZXQgY3VzdG9tIGNvbmZpZ3MgZm9yIHRoZSB2ZG9tIG9uIGluc3RhbmNlIGxldmVsLFxuICAgICAgICAgICAgLy8gaG93ZXZlciB0aGVyZSB3aWxsIGJlIGFscmVhZHkgYWRkZWQgYXR0cmlidXRlcyAoZS5nLiBpZCksIHNvIGEgbWVyZ2Ugc2VlbXMgdG8gYmUgdGhlIGJlc3Qgc3RyYXRlZ3kuXG4gICAgICAgICAgICB2ZG9tID0gey4uLm1lLl92ZG9tIHx8IHt9LCAuLi5jb25maWcudmRvbSB8fCB7fX07XG5cbiAgICAgICAgLy8gYXZvaWQgYW55IGludGVyZmVyZW5jZSBvbiBwcm90b3R5cGUgbGV2ZWxcbiAgICAgICAgLy8gZG9lcyBub3QgY2xvbmUgZXhpc3RpbmcgTmVvIGluc3RhbmNlc1xuICAgICAgICBtZS5fdmRvbSAgICAgICAgPSBOZW8uY2xvbmUodmRvbSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIG1lLmNscyAgICAgICAgICA9IGNvbmZpZy5jbHM7XG4gICAgICAgIG1lLl9zdHlsZSAgICAgICA9IGNvbmZpZy5zdHlsZTtcbiAgICAgICAgbWUud3JhcHBlclN0eWxlID0gTmVvLmNsb25lKGNvbmZpZy53cmFwcGVyU3R5bGUsIGZhbHNlKTtcblxuICAgICAgICBkZWxldGUgY29uZmlnLmNscztcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5zdHlsZTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5fdmRvbTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy52ZG9tO1xuICAgICAgICBkZWxldGUgY29uZmlnLndyYXBwZXJTdHlsZTtcblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICBDb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuZmlyZSgnY29uc3RydWN0ZWQnLCB7aWQ6IG1lLmlkfSk7IC8vIHRlc3RpbmdcblxuICAgICAgICBpZiAobWUua2V5cykge1xuICAgICAgICAgICAgbWUua2V5cy5yZWdpc3RlcihtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9SZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDU1Mgc2VsZWN0b3JzIHRvIGFwcGx5IHRvIHRoZSB0b3AgbGV2ZWwgbm9kZSBvZiB0aGlzIGNvbXBvbmVudFxuICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tY29tcG9uZW50J11cbiAgICAgKi9cbiAgICBnZXQgY2xzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xzID8gTmVvLmNsb25lKHRoaXMuX2NscykgOiBbJ25lby1jb21wb25lbnQnXTtcbiAgICB9XG4gICAgc2V0IGNscyh2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUgOiBbXTtcblxuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgdmRvbVJvb3QgPSBtZS5nZXRWZG9tUm9vdCgpLFxuICAgICAgICAgICAgb2xkQ2xzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZS5tb3VudGVkKSB7XG4gICAgICAgICAgICBvbGRDbHMgPSBOZW8uY2xvbmUobWUuX2Nscyk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5fY2xzID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZkb21Sb290KSB7XG4gICAgICAgICAgICB2ZG9tUm9vdC5jbHMgPSBbLi4udmFsdWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuX3Zkb20gPSB2ZG9tOyAvLyBzaWxlbnQgdXBkYXRlXG5cbiAgICAgICAgaWYgKG1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIG1lLnVwZGF0ZUNscyh2YWx1ZSwgb2xkQ2xzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IGNvbXBvbmVudCBiYXNlZCBsaXN0ZW5lcnNcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGxpc3RlbmVycz17fVxuICAgICAqL1xuICAgIGdldCBsaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnMgfHwge307XG4gICAgfVxuICAgIHNldCBsaXN0ZW5lcnModmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJ1ZSBhZnRlciB0aGUgY29tcG9uZW50IHJlbmRlcigpIG1ldGhvZCB3YXMgY2FsbGVkLiBBbHNvIGZpcmVzIHRoZSByZW5kZXJlZCBldmVudC5cbiAgICAgKiBAbWVtYmVyIHtCb29sZWFufSByZW5kZXJlZD1mYWxzZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBnZXQgcmVuZGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlZCB8fCBmYWxzZTtcbiAgICB9XG4gICAgc2V0IHJlbmRlcmVkKHZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuX3JlbmRlcmVkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBtZS5maXJlKCdyZW5kZXJlZCcsIG1lLmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvcCBsZXZlbCBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgICogQG1lbWJlciB7T2JqZWN0fSBzdHlsZT17fVxuICAgICAqL1xuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBcImNsb25lXCIgdGhlIG9iamVjdCwgb3RoZXJ3aXNlIGNoYW5nZXMgd2lsbCBnZXQgYXBwbGllZCBkaXJlY3RseSBhbmQgdGhlcmUgYXJlIG5vIGRlbHRhc1xuICAgICAgICAvLyB0aGlzIG9ubHkgYWZmZWN0cyBub24gdmRvbSByZWxhdGVkIHN0eWxlIHRvIERPTSBkZWx0YXNcbiAgICAgICAgcmV0dXJuIE5lby5jbG9uZSh0aGlzLl9zdHlsZSk7XG4gICAgfVxuICAgIHNldCBzdHlsZSh2YWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgb2xkU3R5bGUgPSBtZS5zdHlsZTsgLy8gY2xvbmVkID0+IGdldHRlclxuXG4gICAgICAgIG1lLl9zdHlsZSA9IHZhbHVlO1xuICAgICAgICBtZS51cGRhdGVTdHlsZSh2YWx1ZSwgb2xkU3R5bGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzZXR0ZXIgd2lsbCBoYW5kbGUgdmRvbSB1cGRhdGVzIGF1dG9tYXRpY2FsbHlcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHZkb209dGhpcy5fdmRvbVxuICAgICAqL1xuICAgIGdldCB2ZG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmRvbTtcbiAgICB9XG4gICAgc2V0IHZkb20odmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGFwcCAgICAgID0gTmVvLmFwcHNbbWUuYXBwTmFtZV0sXG4gICAgICAgICAgICB2ZG9tICAgICA9IHZhbHVlLFxuICAgICAgICAgICAgY2xzICAgICAgPSBtZS5jbHMsXG4gICAgICAgICAgICBoZWlnaHQgICA9IG1lLmhlaWdodCxcbiAgICAgICAgICAgIHN0eWxlICAgID0gbWUuc3R5bGUsXG4gICAgICAgICAgICB2ZG9tUm9vdCA9IG1lLmdldFZkb21Sb290KCksXG4gICAgICAgICAgICB3aWR0aCAgICA9IG1lLndpZHRoLFxuICAgICAgICAgICAgbGlzdGVuZXJJZDtcblxuICAgICAgICBpZiAodmRvbVJvb3QpIHtcbiAgICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgICAgICB2ZG9tUm9vdC5jbHMgPSBjbHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB2ZG9tUm9vdC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICAgICAgICAgIHZkb21Sb290LndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IHN0cmluZyBiYXNlZCBzdHlsZXNcbiAgICAgICAgICAgICAgICB2ZG9tUm9vdC5zdHlsZSA9IE9iamVjdC5hc3NpZ24odmRvbVJvb3Quc3R5bGUgfHwge30sIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0IGlzIGltcG9ydGFudCB0byBrZWVwIHRoZSB2ZG9tIHRyZWUgc3RhYmxlIHRvIGVuc3VyZSB0aGF0IGNvbnRhaW5lcnMgZG8gbm90IGxvc2UgdGhlIHJlZmVyZW5jZXMgdG8gdGhlaXJcbiAgICAgICAgLy8gY2hpbGQgdmRvbSB0cmVlcy4gVGhlIGlmIGNhc2Ugc2hvdWxkIG5vdCBoYXBwZW4sIGJ1dCBpbiBjYXNlIGl0IGRvZXMsIGtlZXBpbmcgdGhlIHJlZmVyZW5jZSBhbmQgbWVyZ2luZ1xuICAgICAgICAvLyB0aGUgY29udGVudCBvdmVyIHNlZW1zIHRvIGJlIHRoZSBiZXN0IHN0cmF0ZWd5XG4gICAgICAgIGlmIChtZS5fdmRvbSAhPT0gdmRvbSkge1xuICAgICAgICAgICAgTG9nZ2VyLndhcm4oJ3Zkb20gZ290IHJlcGxhY2VkIGZvcjogJyArIG1lLmlkICsgJy4gQ29weWluZyB0aGUgY29udGVudCBpbnRvIHRoZSByZWZlcmVuY2UgaG9sZGVyIG9iamVjdCcpO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtZS5fdmRvbSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtZS5fdmRvbVtrZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obWUuX3Zkb20sIHZkb20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuX3Zkb20gPSB2ZG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtZS5zaWxlbnRWZG9tVXBkYXRlKSB7XG4gICAgICAgICAgICBpZiAoIW1lLm1vdW50ZWQgJiYgYXBwICYmIGFwcC5yZW5kZXJpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcklkID0gYXBwLm9uKCdyZW5kZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC51bigncmVuZGVyJywgbGlzdGVuZXJJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS51cGRhdGVWZG9tKG1lLnZkb20sIG1lLnZub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZS5tb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlVmRvbSh2ZG9tLCBtZS52bm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLmhhc1VubW91bnRlZFZkb21DaGFuZ2VzID0gIW1lLm1vdW50ZWQgJiYgbWUuaGFzQmVlbk1vdW50ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgYSBzdHJpbmcgbGlrZSAnY29sb3I6IHJlZDsgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTsnXG4gICAgICogb3IgYW4gb2JqZWN0IGNvbnRhaW5pbmcgc3R5bGUgYXR0cmlidXRlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhbGwgc3R5bGVzIG9mIHRoaXMuZWxcbiAgICAgKi9cbiAgICBhZGRTdHlsZSh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWUgPSBVdGlsLmNyZWF0ZVN0eWxlT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRvZG86IGFkZCBhIGNoZWNrIGlmIHNvbWV0aGluZyBoYXMgY2hhbmdlZFxuXG4gICAgICAgIHJldHVybiB0aGlzLnN0eWxlID0gT2JqZWN0LmFzc2lnbih0aGlzLnN0eWxlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBkaXNhYmxlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldERpc2FibGVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgID0gdGhpcyxcbiAgICAgICAgICAgIGNscyA9IG1lLmNscztcblxuICAgICAgICBOZW9BcnJheVt2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSddKGNscywgJ25lby1kaXNhYmxlZCcpO1xuICAgICAgICBtZS5jbHMgPSBjbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIHRoZSBkb21MaXN0ZW5lcnMgaW5zaWRlIHRoZSBOZW8ubWFuYWdlci5Eb21FdmVudFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREb21MaXN0ZW5lcnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIERvbUV2ZW50TWFuYWdlci51cGRhdGVEb21MaXN0ZW5lcnModGhpcywgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGRyb3BwYWJsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldERyb3BwYWJsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAodmFsdWUgJiYgIW1lLmRyb3Bab25lKSB7XG4gICAgICAgICAgICBpbXBvcnQoXG4gICAgICAgICAgICAgICAgLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9kcmFnZ2FibGUvRHJvcFpvbmUtbWpzLmpzJyAqL1xuICAgICAgICAgICAgICAgICcuLi9kcmFnZ2FibGUvRHJvcFpvbmUubWpzJ1xuICAgICAgICAgICAgICAgICkudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmRyb3Bab25lID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZSA6IG1vZHVsZS5kZWZhdWx0LFxuICAgICAgICAgICAgICAgICAgICBhcHBOYW1lOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICBvd25lciAgOiBtZSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubWUuZHJvcFpvbmVDb25maWcgfHwge31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBoYXNVbm1vdW50ZWRWZG9tQ2hhbmdlcyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEhhc1VubW91bnRlZFZkb21DaGFuZ2VzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgfHwgKCF2YWx1ZSAmJiBvbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZHMgPSBDb21wb25lbnRNYW5hZ2VyLmdldFBhcmVudElkcyh0aGlzKSxcbiAgICAgICAgICAgICAgICBpICAgICAgICAgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiAgICAgICA9IHBhcmVudElkcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcGFyZW50O1xuXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gTmVvLmdldENvbXBvbmVudChwYXJlbnRJZHNbaV0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuX2hhc1VubW91bnRlZFZkb21DaGFuZ2VzID0gdmFsdWU7IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGhlaWdodCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRIZWlnaHQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ2hlaWdodCcsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGh0bWwgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEh0bWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ2h0bWwnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ2lkJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWF4SGVpZ2h0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE1heEhlaWdodCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VWZG9tUm9vdEtleSgnbWF4SGVpZ2h0JywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWF4V2lkdGggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TWF4V2lkdGgodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ21heFdpZHRoJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWluSGVpZ2h0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE1pbkhlaWdodCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VWZG9tUm9vdEtleSgnbWluSGVpZ2h0JywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbWluV2lkdGggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TWluV2lkdGgodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ21pbldpZHRoJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbW91bnRlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldE1vdW50ZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBtZS5oYXNCZWVuTW91bnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobWUuZG9tTGlzdGVuZXJzICYmIG1lLmRvbUxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IHRoZSBtYWluIHRocmVhZCByZXBseSBvZiBtb3VudCBhcnJpdmVzIGFmdGVyIHB1c2hpbmcgdGhlIHRhc2sgaW50byB0aGUgcXVldWUgd2hpY2ggZG9lcyBub3QgZW5zdXJlIHRoZSBkb20gaXMgbW91bnRlZFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERvbUV2ZW50TWFuYWdlci5tb3VudERvbUxpc3RlbmVycyhtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWUuZmlyZSgnbW91bnRlZCcsIG1lLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdG9vbHRpcHMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRUb29sdGlwcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoTmVvLm5zKCdOZW8udG9vbHRpcC5CYXNlJykpIHtcbiAgICAgICAgICAgICAgICBtZS5jcmVhdGVUb29sdGlwcyh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL3Rvb2x0aXAvQmFzZScgKi9cbiAgICAgICAgICAgICAgICAgICAgJy4uL3Rvb2x0aXAvQmFzZS5tanMnKS50aGVuKChtb2R1bGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLmNyZWF0ZVRvb2x0aXBzKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHZub2RlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0Vm5vZGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNWbm9kZVRyZWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgd2lkdGggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0V2lkdGgodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlVmRvbVJvb3RLZXkoJ3dpZHRoJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgd3JhcHBlclN0eWxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFdyYXBwZXJTdHlsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKCEoIXZhbHVlICYmIG9sZFZhbHVlID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgICAgIGlmICghbWUudmRvbS5pZCkge1xuICAgICAgICAgICAgICAgIHZkb20uc3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlU3R5bGUodmFsdWUsIG9sZFZhbHVlLCBtZS52ZG9tLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIGFjY2Vzc2luZyB0aGUgd3JhcHBlclN0eWxlIGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVHZXRXcmFwcGVyU3R5bGUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsuLi5PYmplY3QuYXNzaWduKHRoaXMudmRvbS5zdHlsZSB8fCB7fSwgdmFsdWUpfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhY2Nlc3NpbmcgdGhlIGNvbnRyb2xsZXIgY29uZmlnXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZUdldENvbnRyb2xsZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIE5lby5nZXQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIGNvbnRyb2xsZXIgY29uZmlnIGdldHMgY2hhbmdlZC5cbiAgICAgKiBDcmVhdGVzIGEgQ29tcG9uZW50Q29udHJvbGxlciBpbnN0YW5jZSBpZiBuZWVkZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICogQHJldHVybnMge1N0cmluZ30gaWRcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0Q29udHJvbGxlcih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IENsYXNzU3lzdGVtVXRpbC5iZWZvcmVTZXRJbnN0YW5jZSh2YWx1ZSwgbnVsbCwge1xuICAgICAgICAgICAgdmlldzogdGhpc1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgZG9tTGlzdGVuZXJzIGNvbmZpZyBnZXRzIGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldERvbUxpc3RlbmVycyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBrZXlzIGNvbmZpZyBnZXRzIGNoYW5nZWQuXG4gICAgICogQ3JlYXRlcyBhIEtleU5hdmlnYXRpb24gaW5zdGFuY2UgaWYgbmVlZGVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRLZXlzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBDbGFzc1N5c3RlbVV0aWwuYmVmb3JlU2V0SW5zdGFuY2UodmFsdWUsIEtleU5hdmlnYXRpb24sIHtcbiAgICAgICAgICAgICAgICBrZXlzOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgcGx1Z2lucyBjb25maWcgZ2V0cyBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0UGx1Z2lucyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlW2luZGV4XSA9IENsYXNzU3lzdGVtVXRpbC5iZWZvcmVTZXRJbnN0YW5jZShpdGVtLCBudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSB2YWx1ZSBvZiBhIHZkb20gb2JqZWN0IGF0dHJpYnV0ZSBvciByZW1vdmVzIGl0IGluIGNhc2UgaXQgaGFzIG5vIHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfE9iamVjdHxTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKi9cbiAgICBjaGFuZ2VWZG9tUm9vdEtleShrZXksIHZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbWUuZ2V0VmRvbVJvb3QoKVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgbWUuZ2V0VmRvbVJvb3QoKVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgdG9vbHRpcCBpbnN0YW5jZXNcbiAgICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlVG9vbHRpcHModmFsdWUpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRvb2x0aXBzID0gW10sXG4gICAgICAgICAgICB0aXA7XG5cbiAgICAgICAgdmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIHRvZG86IGNoZWNrIGZvciBleGlzdGluZyB0b29sdGlwc1xuXG4gICAgICAgICAgICB0aXAgPSBOZW8uY3JlYXRlKCdOZW8udG9vbHRpcC5CYXNlJywge1xuICAgICAgICAgICAgICAgIGFwcE5hbWUgICAgOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudElkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAuLi5pdGVtXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdG9vbHRpcHMucHVzaCh0aXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBtZS5fdG9vbHRpcHMgPSB0b29sdGlwczsgLy8gc2lsZW50IHVwZGF0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVucmVnaXN0ZXJzIHRoaXMgaW5zdGFuY2UgZnJvbSB0aGUgQ29tcG9uZW50TWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VwZGF0ZVBhcmVudFZkb209ZmFsc2VdIHRydWUgdG8gcmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgcGFyZW50IHZkb20gPT4gcmVhbCBkb21cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdIHRydWUgdG8gdXBkYXRlIHRoZSB2ZG9tIHNpbGVudGx5ICh1c2VmdWwgZm9yIGRlc3Ryb3lpbmcgbXVsdGlwbGUgY2hpbGQgaXRlbXMgaW4gYSByb3cpXG4gICAgICogdG9kbzogdW5yZWdpc3RlciBldmVudHNcbiAgICAgKi9cbiAgICBkZXN0cm95KHVwZGF0ZVBhcmVudFZkb209ZmFsc2UsIHNpbGVudD1mYWxzZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgcGFyZW50LCBwYXJlbnRWZG9tO1xuXG4gICAgICAgIGlmICh1cGRhdGVQYXJlbnRWZG9tICYmIG1lLnBhcmVudElkKSB7XG4gICAgICAgICAgICBpZiAobWUucGFyZW50SWQgPT09ICdkb2N1bWVudC5ib2R5Jykge1xuICAgICAgICAgICAgICAgIE5lby5jdXJyZW50V29ya2VyLnByb21pc2VNZXNzYWdlKCdtYWluJywge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICd1cGRhdGVEb20nLFxuICAgICAgICAgICAgICAgICAgICBkZWx0YXM6IFt7YWN0aW9uOiAncmVtb3ZlTm9kZScsIGlkOiBtZS52ZG9tLmlkfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ICAgICA9IE5lby5nZXRDb21wb25lbnQobWUucGFyZW50SWQpO1xuICAgICAgICAgICAgICAgIHBhcmVudFZkb20gPSBwYXJlbnQudmRvbTtcblxuICAgICAgICAgICAgICAgIFZEb21VdGlsLnJlbW92ZVZkb21DaGlsZChwYXJlbnRWZG9tLCBtZS52ZG9tLmlkKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRbc2lsZW50ID8gJ192ZG9tJyA6ICd2ZG9tJ10gPSBwYXJlbnRWZG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9uZW50TWFuYWdlci51bnJlZ2lzdGVyKHRoaXMpO1xuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBzaG9ydGN1dCBmb3IgTmVvLm1hbmFnZXIuQ29tcG9uZW50LmRvd25cbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtOZW8uY29yZS5CYXNlfSBUaGUgbWF0Y2hpbmcgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGRvd24oY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYW5hZ2VyLmRvd24odGhpcy5pZCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBmb2N1cygpIG9uIHRoZSB0b3AgbGV2ZWwgRE9NIG5vZGUgb2YgdGhpcyBjb21wb25lbnQgb3Igb24gYSBnaXZlbiBub2RlIHZpYSBpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaWRdXG4gICAgICovXG4gICAgZm9jdXMoaWQpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICAvLyByZW1vdGUgbWV0aG9kIGFjY2Vzc1xuICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuZm9jdXMoe1xuICAgICAgICAgICAgaWQ6IGlkIHx8IG1lLmlkXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZm9jdXMgcmVjZWl2ZWQ6ICcgKyBpZCB8fCBtZS5pZCk7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgYXR0ZW1wdGluZyB0byByZWNlaXZlIGZvY3VzIGZvciBjb21wb25lbnQnLCBlcnIsIG1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGlzLmNvbnRyb2xsZXIgb3IgdGhlIGNsb3Nlc3QgcGFyZW50IGNvbnRyb2xsZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW250eXBlXVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29udHJvbGxlci5CYXNlfG51bGx9XG4gICAgICovXG4gICAgZ2V0Q29udHJvbGxlcihudHlwZSkge1xuICAgICAgICBsZXQgY29udHJvbGxlciA9IHRoaXMuY29udHJvbGxlcixcbiAgICAgICAgICAgIGksIGxlbiwgcGFyZW50cztcblxuICAgICAgICBpZiAoY29udHJvbGxlciAmJiAoIW50eXBlIHx8IG50eXBlID09PSBjb250cm9sbGVyLm50eXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJlbnRzID0gQ29tcG9uZW50TWFuYWdlci5nZXRQYXJlbnRzKHRoaXMpO1xuICAgICAgICBpICAgICAgID0gMDtcbiAgICAgICAgbGVuICAgICA9IHBhcmVudHMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnRzW2ldLmNvbnRyb2xsZXIgJiYgKCFudHlwZSB8fCBudHlwZSA9PT0gcGFyZW50c1tpXS5jb250cm9sbGVyLm50eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRzW2ldLmNvbnRyb2xsZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gb3B0c1xuICAgICAqIEByZXR1cm5zIHtOZW8ucGx1Z2luLkJhc2V8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRQbHVnaW4ob3B0cykge1xuICAgICAgICBvcHRzID0gdHlwZW9mIG9wdHMgIT09ICdzdHJpbmcnID8gb3B0cyA6IHtpZDogb3B0c307XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGhhc01hdGNoO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIG1lLnBsdWdpbnMgfHwgW10pIHtcbiAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb3B0cykge1xuICAgICAgICAgICAgICAgIGlmIChwbHVnaW5ba2V5XSAhPT0gb3B0c1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhc01hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdhbGtzIHVwIHRoZSB2ZG9tIHRyZWUgYW5kIHJldHVybnMgdGhlIGNsb3Nlc3QgdGhlbWUgZm91bmRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFRoZW1lKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0aGVtZU1hdGNoID0gJ25lby10aGVtZS0nLFxuICAgICAgICAgICAgYXBwLCBtYWluVmlldywgcGFyZW50Tm9kZXM7XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG1lLmNscyB8fCBbXSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhcnRzV2l0aCh0aGVtZU1hdGNoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwICAgICAgPSBOZW8uYXBwc1ttZS5hcHBOYW1lXTtcbiAgICAgICAgbWFpblZpZXcgPSBhcHAgJiYgYXBwLm1haW5WaWV3SW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKG1haW5WaWV3KSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlcyA9IFZEb21VdGlsLmdldFBhcmVudE5vZGVzKG1haW5WaWV3LnZkb20sIG1lLmlkKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHBhcmVudE5vZGVzIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG5vZGUuY2xzIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnN0YXJ0c1dpdGgodGhlbWVNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE5lby5jb25maWcudGhlbWVzICYmIE5lby5jb25maWcudGhlbWVzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBhIHZkb20gY2hpbGQgbm9kZSBieSBpZCBmb3IgYSBnaXZlbiB2ZG9tIHRyZWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Zkb21dXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRWZG9tQ2hpbGQoaWQsIHZkb20pIHtcbiAgICAgICAgbGV0IG5vZGUgPSBWRG9tVXRpbC5maW5kVmRvbUNoaWxkKHZkb20gfHwgdGhpcy52ZG9tLCBpZCk7XG4gICAgICAgIHJldHVybiBub2RlICYmIG5vZGUudmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYW4gZ2V0IGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50IGdvdCByZW5kZXJlZC4gU2VlIHRoZSBhdXRvTW91bnQgY29uZmlnIGFzIHdlbGwuXG4gICAgICovXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICBjaGlsZCwgY2hpbGRJZHM7XG5cbiAgICAgICAgaWYgKCFtZS52bm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgdm5vZGUgbXVzdCBiZSBnZW5lcmF0ZWQgYmVmb3JlIG1vdW50aW5nLCB1c2UgQ29tcG9uZW50LnJlbmRlcigpJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiBjYXNlIHRoZSBjb21wb25lbnQgd2FzIGFscmVhZHkgbW91bnRlZCwgZ290IHVubW91bnRlZCBhbmQgcmVjZWl2ZWQgdmRvbSBjaGFuZ2VzIGFmdGVyd2FyZHMsXG4gICAgICAgIC8vIGEgbmV3IHJlbmRlcigpIGNhbGwgaXMgbWFuZGF0b3J5IHNpbmNlIGRlbHRhIHVwZGF0ZXMgY291bGQgbm90IGdldCBhcHBsaWVkLlxuICAgICAgICAvLyBXZSBuZWVkIHRvIGNsZWFyIHRoZSBoYXNVbm1vdW50ZWRWZG9tQ2hhbmdlcyBzdGF0ZSBmb3IgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICAgICAgaWYgKG1lLmhhc1VubW91bnRlZFZkb21DaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiB0aGUgaGFzVW5tb3VudGVkVmRvbUNoYW5nZXMgZmxhZyBjaGFuZ2VzIHNob3VsZCBoYXBwZW4gb24gcmVuZGVyXG4gICAgICAgICAgICBtZS5oYXNVbm1vdW50ZWRWZG9tQ2hhbmdlcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjaGlsZElkcyA9IENvbXBvbmVudE1hbmFnZXIuZ2V0Q2hpbGRJZHMobWUudm5vZGUpO1xuXG4gICAgICAgICAgICBjaGlsZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZCA9IE5lby5nZXRDb21wb25lbnQoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLl9oYXNVbm1vdW50ZWRWZG9tQ2hhbmdlcyA9IGZhbHNlOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBlbmQgdG9kb1xuXG4gICAgICAgICAgICBtZS5yZW5kZXIodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbW91bnQnLCBtZS5wYXJlbnRJZCwgbWUuaWQpO1xuXG4gICAgICAgICAgICBOZW8uY3VycmVudFdvcmtlci5wcm9taXNlTWVzc2FnZSgnbWFpbicsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgIDogJ21vdW50RG9tJyxcbiAgICAgICAgICAgICAgICBpZCAgICAgICAgIDogbWUuaWQsXG4gICAgICAgICAgICAgICAgaHRtbCAgICAgICA6IG1lLnZub2RlLm91dGVySFRNTCxcbiAgICAgICAgICAgICAgICBwYXJlbnRJZCAgIDogbWUucGFyZW50SWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SW5kZXg6IG1lLnBhcmVudEluZGV4XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJ5IG1hbmFnZXIuRm9jdXNcbiAgICAgKiBAbmFtZSBvbkZvY3VzRW50ZXJcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXRoIGRvbSBlbGVtZW50IGlkcyB1cHdhcmRzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYnkgbWFuYWdlci5Gb2N1c1xuICAgICAqIEBuYW1lIG9uRm9jdXNMZWF2ZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGggZG9tIGVsZW1lbnQgaWRzIHVwd2FyZHNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBieSBtYW5hZ2VyLkZvY3VzXG4gICAgICogQG5hbWUgb25Gb2N1c01vdmVcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7QXJyYXl9ICBvcHRzLm5ld1BhdGggZG9tIGVsZW1lbnQgaWRzIHVwd2FyZHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSAgb3B0cy5vbGRQYXRoIGRvbSBlbGVtZW50IGlkcyB1cHdhcmRzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGNhbGxlZCBmcm9tIHRoZSByZW5kZXIoKSBwcm9taXNlIHN1Y2Nlc3MgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBhdXRvTW91bnQgTW91bnQgdGhlIERPTSBhZnRlciB0aGUgdm5vZGUgZ290IGNyZWF0ZWRcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25SZW5kZXIoZGF0YSwgYXV0b01vdW50KSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgYXBwID0gTmVvLmFwcHNbbWUuYXBwTmFtZV07XG5cbiAgICAgICAgbWUucmVuZGVyaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaWYgYXBwIGlzIGEgY2hlY2sgdG8gc2VlIGlmIHRoZSBDb21wb25lbnQgZ290IGRlc3Ryb3llZCB3aGlsZSByZW5kZXJpbmcgPT4gYmVmb3JlIG9uUmVuZGVyIGdvdCB0cmlnZ2VyZWRcbiAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgaWYgKCFhcHAucmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBhcHAucmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXBwLnJlbmRlcmVkICA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXBwLmZpcmUoJ3JlbmRlcicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS52bm9kZSA9IGRhdGE7XG5cbiAgICAgICAgICAgIGxldCBjaGlsZElkcyAgPSBDb21wb25lbnRNYW5hZ2VyLmdldENoaWxkSWRzKGRhdGEpLFxuICAgICAgICAgICAgICAgIGkgICAgICAgICA9IDAsXG4gICAgICAgICAgICAgICAgbGVuICAgICAgID0gY2hpbGRJZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGNoaWxkO1xuXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBOZW8uZ2V0Q29tcG9uZW50KGNoaWxkSWRzW2ldKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW5kZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5fcmVuZGVyZWQgPSB0cnVlOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICBtZS5maXJlKCdyZW5kZXJlZCcsIG1lLmlkKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbmRlcmVkOiAnICsgbWUuYXBwTmFtZSArICcgJyArIG1lLmlkLCBtZSk7XG5cbiAgICAgICAgICAgIGlmIChhdXRvTW91bnQpIHtcbiAgICAgICAgICAgICAgICBtZS5tb3VudGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb21pc2UgYmFzZWQgdmRvbSB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Zkb209dGhpcy52ZG9tXVxuICAgICAqIEBwYXJhbSB7TmVvLnZkb20uVk5vZGV9IFt2bm9kZT0gdGhpcy52bm9kZV1cbiAgICAgKi9cbiAgICBwcm9taXNlVmRvbVVwZGF0ZSh2ZG9tPXRoaXMudmRvbSwgdm5vZGU9dGhpcy52bm9kZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIC8vIHRvZG86IHVwZGF0ZVZkb20oKSBzaG91bGQgaGFuZGxlIHRoaXNcbiAgICAgICAgLy8gSXQgaXMgaW1wb3J0YW50IHRvIGtlZXAgdGhlIHZkb20gdHJlZSBzdGFibGUgdG8gZW5zdXJlIHRoYXQgY29udGFpbmVycyBkbyBub3QgbG9zZSB0aGUgcmVmZXJlbmNlcyB0byB0aGVpclxuICAgICAgICAvLyBjaGlsZCB2ZG9tIHRyZWVzLiBUaGUgaWYgY2FzZSBzaG91bGQgbm90IGhhcHBlbiwgYnV0IGluIGNhc2UgaXQgZG9lcywga2VlcGluZyB0aGUgcmVmZXJlbmNlIGFuZCBtZXJnaW5nXG4gICAgICAgIC8vIHRoZSBjb250ZW50IG92ZXIgc2VlbXMgdG8gYmUgdGhlIGJlc3Qgc3RyYXRlZ3lcbiAgICAgICAgaWYgKG1lLl92ZG9tICE9PSB2ZG9tKSB7XG4gICAgICAgICAgICBMb2dnZXIud2FybigndmRvbSBnb3QgcmVwbGFjZWQgZm9yOiAnICsgbWUuaWQgKyAnLiBDb3B5aW5nIHRoZSBjb250ZW50IGludG8gdGhlIHJlZmVyZW5jZSBob2xkZXIgb2JqZWN0Jyk7XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG1lLl92ZG9tKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lLl92ZG9tW2tleV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtZS5fdmRvbSwgdmRvbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVWZG9tKHZkb20sIHZub2RlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVpdGhlciBhIHN0cmluZyBsaWtlICdjb2xvcicgb3IgYW4gYXJyYXkgY29udGFpbmluZyBzdHlsZSBhdHRyaWJ1dGVzIHRvIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSB2YWx1ZSBjYW1lbENhc2Ugb25seVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGFsbCBzdHlsZXMgb2YgdGhpcy5lbFxuICAgICAqL1xuICAgIHJlbW92ZVN0eWxlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3R5bGUgICAgPSB0aGlzLnN0eWxlLFxuICAgICAgICAgICAgZG9VcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhzdHlsZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0eWxlW2tleV07XG4gICAgICAgICAgICAgICAgZG9VcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZG9VcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSB2bm9kZSB0cmVlIGZvciB0aGlzIGNvbXBvbmVudCBhbmQgbW91bnRzIHRoZSBjb21wb25lbnQgaW4gY2FzZVxuICAgICAqIC0geW91IHBhc3MgdHJ1ZSBmb3IgdGhlIG1vdW50IHBhcmFtXG4gICAgICogLSBvciB0aGUgYXV0b01vdW50IGNvbmZpZyBpcyBzZXQgdG8gdHJ1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21vdW50XSBNb3VudCB0aGUgRE9NIGFmdGVyIHRoZSB2bm9kZSBnb3QgY3JlYXRlZFxuICAgICAqL1xuICAgIHJlbmRlcihtb3VudCkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGF1dG9Nb3VudCA9IG1vdW50IHx8IG1lLmF1dG9Nb3VudCxcbiAgICAgICAgICAgIGFwcCAgICAgICA9IE5lby5hcHBzW21lLmFwcE5hbWVdO1xuXG4gICAgICAgIG1lLnJlbmRlcmluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFhcHAucmVuZGVyZWQpIHtcbiAgICAgICAgICAgIGFwcC5yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLnZkb20pIHtcbiAgICAgICAgICAgIE5lby52ZG9tLkhlbHBlci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGFwcE5hbWUgICAgOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIGF1dG9Nb3VudCAgOiBhdXRvTW91bnQsXG4gICAgICAgICAgICAgICAgY2xzICAgICAgICA6IG1lLmNscyxcbiAgICAgICAgICAgICAgICBwYXJlbnRJZCAgIDogYXV0b01vdW50ID8gbWUucGFyZW50SWQgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcGFyZW50SW5kZXg6IGF1dG9Nb3VudCA/IG1lLnBhcmVudEluZGV4IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0eWxlICAgICAgOiBtZS5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5tZS52ZG9tXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1lLm9uUmVuZGVyKGRhdGEsIGF1dG9Nb3VudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZSBtdWx0aXBsZSBjb25maWdzIGF0IG9uY2UsIGVuc3VyaW5nIHRoYXQgYWxsIGFmdGVyU2V0IG1ldGhvZHMgZ2V0IGFsbCBuZXcgYXNzaWduZWQgdmFsdWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcz17fVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudD1mYWxzZV1cbiAgICAgKi9cbiAgICBzZXQodmFsdWVzPXt9LCBzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgbWUuc2lsZW50VmRvbVVwZGF0ZSA9IHRydWU7XG5cbiAgICAgICAgc3VwZXIuc2V0KHZhbHVlcyk7XG5cbiAgICAgICAgbWUuc2lsZW50VmRvbVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzaWxlbnQpIHtcbiAgICAgICAgICAgIG1lLl92ZG9tID0gdmRvbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5wcm9taXNlVmRvbVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2Ugc2hvcnRjdXQgY2FsbGluZyBzZXQoKSB3aXRoIHRoZSBzaWxlbnQgZmxhZ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXM9e31cbiAgICAgKi9cbiAgICBzZXRTaWxlbnQodmFsdWVzPXt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldCh2YWx1ZXMsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIG1ldGhvZCBmb3IgdXRpbC5WRG9tLnN5bmNWZG9tSWRzIHRvIGFsbG93IG92ZXJyaWRpbmcgKGRpc2FibGluZykgaXRcbiAgICAgKiBAcGFyYW0ge05lby52ZG9tLlZOb2RlfSBbdm5vZGU9dGhpcy52bm9kZV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Zkb209dGhpcy52ZG9tXVxuICAgICAqL1xuICAgIHN5bmNWZG9tSWRzKHZub2RlPXRoaXMudm5vZGUsIHZkb209dGhpcy52ZG9tKSB7XG4gICAgICAgIFZEb21VdGlsLnN5bmNWZG9tSWRzKHZub2RlLCB2ZG9tKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBtZXRob2QgZm9yIHV0aWwuVkRvbS5zeW5jVmRvbUlkcyB0byBhbGxvdyBvdmVycmlkaW5nIChkaXNhYmxpbmcpIGl0XG4gICAgICogQHBhcmFtIHtOZW8udmRvbS5WTm9kZX0gW3Zub2RlPXRoaXMudm5vZGVdXG4gICAgICovXG4gICAgc3luY1Zub2RlVHJlZSh2bm9kZT10aGlzLnZub2RlKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBkZWJ1ZyA9IGZhbHNlLFxuICAgICAgICAgICAgY2hpbGRWbm9kZSwgc3RhcnQ7XG5cbiAgICAgICAgaWYgKGRlYnVnKSB7XG4gICAgICAgICAgICBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuc3luY1Zkb21JZHMoKTtcblxuICAgICAgICAvLyBkZWxlZ2F0ZSB0aGUgbGF0ZXN0IG5vZGUgdXBkYXRlcyB0byBhbGwgcG9zc2libGUgY2hpbGQgY29tcG9uZW50cyBmb3VuZCBpbnNpZGUgdGhlIHZub2RlIHRyZWVcbiAgICAgICAgQ29tcG9uZW50TWFuYWdlci5nZXRDaGlsZHJlbihtZSkuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuICAgICAgICAgICAgY2hpbGRWbm9kZSA9IFZOb2RlVXRpbC5maW5kQ2hpbGRWbm9kZShtZS52bm9kZSwgY29tcG9uZW50LnZkb20uaWQpO1xuXG4gICAgICAgICAgICBpZiAoY2hpbGRWbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fdm5vZGUgPSBjaGlsZFZub2RlLnZub2RlOyAvLyBzaWxlbnQgdXBkYXRlXG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5yZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuX3JlbmRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmZpcmUoJ3JlbmRlcmVkJywgY29tcG9uZW50LmlkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb21wb25lbnQubW91bnRlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybignc3luY1Zub2RlVHJlZTogQ291bGQgbm90IHJlcGxhY2UgdGhlIGNoaWxkIHZub2RlIGZvcicsIGNvbXBvbmVudC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lLnZub2RlLCBtZS5tb3VudGVkKTtcblxuICAgICAgICAvLyBrZWVwIHRoZSB2bm9kZSBwYXJlbnQgdHJlZSBpbiBzeW5jXG4gICAgICAgIENvbXBvbmVudE1hbmFnZXIuZ2V0UGFyZW50cyhtZSkuZm9yRWFjaCgoY29tcG9uZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFtZS52bm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiAhVk5vZGVVdGlsLnJlbW92ZUNoaWxkVm5vZGUoY29tcG9uZW50LnZub2RlLCBtZS5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjYW4gZmFpbCwgaW4gY2FzZSB0aGUgdm5vZGUgaXMgYWxyZWFkeSByZW1vdmVkIChub3QgYW4gaXNzdWUsIGJldHRlciBzYWZlIHRoYW4gc29ycnkpXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2Fybignc3luY1Zub2RlVHJlZTogQ291bGQgbm90IHJlbW92ZSB0aGUgcGFyZW50IHZub2RlIGZvcicsIG1lLmlkLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGR5bmFtaWNhbGx5IHJlbmRlcmVkIGNvbXBvbmVudHMgd2hpY2ggZ2V0IGluc2VydGVkIGludG8gdGhlIGNvbXBvbmVudCB0cmVlXG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCAmJiBtZS52bm9kZS5vdXRlckhUTUwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZHluIGl0ZW0nLCBtZS52bm9kZSwgbWUucGFyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC52bm9kZS5jaGlsZE5vZGVzLnNwbGljZShtZS5wYXJlbnRJbmRleCB8fCAwLCAwLCBtZS52bm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2UgaWYgKCFWTm9kZVV0aWwucmVwbGFjZUNoaWxkVm5vZGUoY29tcG9uZW50LnZub2RlLCBtZS52bm9kZS5pZCwgbWUudm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9kbzogY2FuIGhhcHBlbiBmb3IgZHluYW1pY2FsbHkgaW5zZXJ0ZWQgY29udGFpbmVyIGl0ZW1zXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdzeW5jVm5vZGVUcmVlOiBDb3VsZCBub3QgcmVwbGFjZSB0aGUgcGFyZW50IHZub2RlIGZvcicsIG1lLnZub2RlLmlkLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgICAgIGxldCBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzeW5jVm5vZGVUcmVlJywgbWUuaWQsIGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgY29tcG9uZW50IERPTVxuICAgICAqL1xuICAgIHVubW91bnQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgTmVvLmN1cnJlbnRXb3JrZXIucHJvbWlzZU1lc3NhZ2UoJ21haW4nLCB7XG4gICAgICAgICAgICBhY3Rpb246ICd1cGRhdGVEb20nLFxuICAgICAgICAgICAgZGVsdGFzOiBbe1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3JlbW92ZU5vZGUnLFxuICAgICAgICAgICAgICAgIGlkICAgIDogbWUuaWRcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWUubW91bnRlZCA9IGZhbHNlO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGF0dGVtcHRpbmcgdG8gdW5tb3VudCBjb21wb25lbnQnLCBlcnIsIG1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2Ugc2hvcnRjdXQgZm9yIE5lby5tYW5hZ2VyLkNvbXBvbmVudC51cFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gY29uZmlnXG4gICAgICogQHJldHVybnMge05lby5jb3JlLkJhc2V9IFRoZSBtYXRjaGluZyBpbnN0YW5jZSBvciBudWxsXG4gICAgICovXG4gICAgdXAoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYW5hZ2VyLnVwKHRoaXMuaWQsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsdGEgdXBkYXRlcyBmb3IgdGhlIGNscyBjb25maWcuIEdldHMgY2FsbGVkIGFmdGVyIHRoZSBjbHMgY29uZmlnIGdldHMgY2hhbmdlZCBpbiBjYXNlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBjbHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBvbGRDbHNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlQ2xzKGNscywgb2xkQ2xzKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICB2bm9kZSA9IG1lLnZub2RlLFxuICAgICAgICAgICAgb3B0cztcblxuICAgICAgICBpZiAoIU5lb0FycmF5LmlzRXF1YWwoY2xzLCBvbGRDbHMpKSB7XG4gICAgICAgICAgICBpZiAodm5vZGUpIHtcbiAgICAgICAgICAgICAgICB2bm9kZS5jbGFzc05hbWUgPSBjbHM7IC8vIGtlZXAgdGhlIHZub2RlIGluIHN5bmNcbiAgICAgICAgICAgICAgICBtZS52bm9kZSA9IHZub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3VwZGF0ZURvbScsXG4gICAgICAgICAgICAgICAgZGVsdGFzOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZCA6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZCAgIDogTmVvLnV0aWwuQXJyYXkuZGlmZmVyZW5jZShjbHMsIG9sZENscyksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IE5lby51dGlsLkFycmF5LmRpZmZlcmVuY2Uob2xkQ2xzLCBjbHMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKE5lby5jdXJyZW50V29ya2VyLmlzU2hhcmVkV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgb3B0cy5hcHBOYW1lID0gbWUuYXBwTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTmVvLmN1cnJlbnRXb3JrZXIucHJvbWlzZU1lc3NhZ2UoJ21haW4nLCBvcHRzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1lLnZub2RlKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGF0dGVtcHRpbmcgdG8gdXBkYXRlIENvbXBvbmVudCBjbHMnLCBlcnIsIG1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgc3R5bGUgZGVsdGFzIGZvciBuZXdWYWx1ZSAmIG9sZFZhbHVlIGFuZCBhcHBsaWVzIHRoZW0gZGlyZWN0bHkgdG8gdGhlIERPTS5cbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IG5ld1ZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbaWQ9dGhpcy5pZF1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlU3R5bGUobmV3VmFsdWUsIG9sZFZhbHVlLCBpZD10aGlzLmlkKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBkZWx0YSA9IFN0eWxlLmNvbXBhcmVTdHlsZXMobmV3VmFsdWUsIG9sZFZhbHVlKSxcbiAgICAgICAgICAgIHZkb20gID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZChtZS52ZG9tLCBpZCksXG4gICAgICAgICAgICB2bm9kZSA9IG1lLnZub2RlICYmIFZOb2RlVXRpbC5maW5kQ2hpbGRWbm9kZShtZS52bm9kZSwgaWQpLFxuICAgICAgICAgICAgb3B0cztcblxuICAgICAgICBpZiAoZGVsdGEpIHtcbiAgICAgICAgICAgIHZkb20udmRvbS5zdHlsZSA9IG5ld1ZhbHVlOyAvLyBrZWVwIHRoZSB2ZG9tIGluIHN5bmNcblxuICAgICAgICAgICAgaWYgKHZub2RlKSB7XG4gICAgICAgICAgICAgICAgdm5vZGUudm5vZGUuc3R5bGUgPSBuZXdWYWx1ZTsgLy8ga2VlcCB0aGUgdm5vZGUgaW4gc3luY1xuXG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAndXBkYXRlRG9tJyxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQgICA6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGRlbHRhXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChOZW8uY3VycmVudFdvcmtlci5pc1NoYXJlZFdvcmtlcikge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmFwcE5hbWUgPSBtZS5hcHBOYW1lO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIE5lby5jdXJyZW50V29ya2VyLnNlbmRNZXNzYWdlKCdtYWluJywgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGNhbGxlZCBhZnRlciB0aGUgdmRvbSBjb25maWcgZ2V0cyBjaGFuZ2VkIGluIGNhc2UgdGhlIGNvbXBvbmVudCBpcyBhbHJlYWR5IG1vdW50ZWQgKGRlbHRhIHVwZGF0ZXMpLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2ZG9tXG4gICAgICogQHBhcmFtIHtOZW8udmRvbS5WTm9kZX0gdm5vZGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbcmVzb2x2ZV0gdXNlZCBieSBwcm9taXNlVmRvbVVwZGF0ZSgpXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW3JlamVjdF0gdXNlZCBieSBwcm9taXNlVmRvbVVwZGF0ZSgpXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHVwZGF0ZVZkb20odmRvbSwgdm5vZGUsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgb3B0cztcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygndXBkYXRlVmRvbScsIG1lLmlkLCBOZW8uY2xvbmUodmRvbSwgdHJ1ZSksIE5lby5jbG9uZSh2bm9kZSwgdHJ1ZSkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndXBkYXRlVmRvbScsIG1lLmlzVmRvbVVwZGF0aW5nKTtcblxuICAgICAgICBpZiAobWUuaXNWZG9tVXBkYXRpbmcpIHtcbiAgICAgICAgICAgIG1lLm5lZWRzVmRvbVVwZGF0ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5pc1Zkb21VcGRhdGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgdmRvbSA6IHZkb20sXG4gICAgICAgICAgICAgICAgdm5vZGU6IHZub2RlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoTmVvLmN1cnJlbnRXb3JrZXIuaXNTaGFyZWRXb3JrZXIpIHtcbiAgICAgICAgICAgICAgICBvcHRzLmFwcE5hbWUgPSBtZS5hcHBOYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBOZW8udmRvbS5IZWxwZXIudXBkYXRlKG9wdHMpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NvbXBvbmVudCB2bm9kZSB1cGRhdGVkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgbWUudm5vZGUgICAgICAgICAgPSBkYXRhLnZub2RlO1xuICAgICAgICAgICAgICAgIG1lLmlzVmRvbVVwZGF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lLm5lZWRzVmRvbVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5uZWVkc1Zkb21VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbWUudmRvbSA9IG1lLnZkb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgYXR0ZW1wdGluZyB0byB1cGRhdGUgY29tcG9uZW50IGRvbScsIGVyciwgbWUpO1xuICAgICAgICAgICAgICAgIG1lLmlzVmRvbVVwZGF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIG1hbmFnZXIuRm9jdXMgZmlyZXMgdGhlIGV2ZW50IHdoZW4gdGhlIGNvbXBvbmVudCBpZCBpcyBpbmNsdWRlZCBpbnNpZGUgdGhlIGRvbSBpZCBwYXRoXG4gKiBAZXZlbnQgZm9jdXNFbnRlclxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBkb20gZWxlbWVudCBpZHMgdXB3YXJkc1xuICovXG5cbi8qKlxuICogbWFuYWdlci5Gb2N1cyBmaXJlcyB0aGUgZXZlbnQgd2hlbiB0aGUgY29tcG9uZW50IGlkIGlzIG5vdCBpbmNsdWRlZCBpbnNpZGUgdGhlIGRvbSBpZCBwYXRoXG4gKiBAZXZlbnQgZm9jdXNMZWF2ZVxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBkb20gZWxlbWVudCBpZHMgdXB3YXJkc1xuICovXG5cbi8qKlxuICogbWFuYWdlci5Gb2N1cyBmaXJlcyB0aGUgZXZlbnQgd2hlbiB0aGUgY29tcG9uZW50IGlkIGlzIGluY2x1ZGVkIGluc2lkZSB0aGUgZG9tIGlkIHBhdGgsIGJ1dCB0aGUgcGF0aCBpdHNlbGYgY2hhbmdlZFxuICogQGV2ZW50IGZvY3VzTW92ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBwYXJhbSB7QXJyYXl9ICBvcHRzLm5ld1BhdGggZG9tIGVsZW1lbnQgaWRzIHVwd2FyZHNcbiAqIEBwYXJhbSB7QXJyYXl9ICBvcHRzLm9sZFBhdGggZG9tIGVsZW1lbnQgaWRzIHVwd2FyZHNcbiAqL1xuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9CYXNlLm1qcyc7XG5cbi8qKlxuICogQ29udmVuaWVuY2UgY2xhc3MgdG8gcmVuZGVyIGEgbGFiZWwgd2l0aCBhIHRleHRcbiAqIEBjbGFzcyBOZW8uY29tcG9uZW50LkxhYmVsXG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgTGFiZWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29tcG9uZW50LkxhYmVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29tcG9uZW50LkxhYmVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xhYmVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xhYmVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tbGFiZWwnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1sYWJlbCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0ZXh0Xz0nJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGV4dF86ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbT17dGFnOiAnbGFiZWwnfVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIHRhZyAgICAgIDogJ2xhYmVsJyxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHRleHQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGV4dCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gPSB0aGlzLnZkb207XG4gICAgICAgIHZkb20uaHRtbCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZkb20gPSB2ZG9tO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTGFiZWwpO1xuXG5leHBvcnQge0xhYmVsIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgIGZyb20gJy4uL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgTGF5b3V0QmFzZSBmcm9tICcuLi9sYXlvdXQvQmFzZS5tanMnO1xuaW1wb3J0IExheW91dENhcmQgZnJvbSAnLi4vbGF5b3V0L0NhcmQubWpzJztcbmltcG9ydCBMYXlvdXRGaXQgIGZyb20gJy4uL2xheW91dC9GaXQubWpzJztcbmltcG9ydCBMYXlvdXRIYm94IGZyb20gJy4uL2xheW91dC9IQm94Lm1qcyc7XG5pbXBvcnQgTGF5b3V0VkJveCBmcm9tICcuLi9sYXlvdXQvVkJveC5tanMnO1xuaW1wb3J0IExvZ2dlciAgICAgZnJvbSAnLi4vY29yZS9Mb2dnZXIubWpzJztcbmltcG9ydCBOZW9BcnJheSAgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmNvbnRhaW5lci5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb250YWluZXIuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvbnRhaW5lci5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2NvbnRhaW5lcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdjb250YWluZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1jb250YWluZXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1jb250YWluZXInXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gaXRlbURlZmF1bHRzXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtRGVmYXVsdHNfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gYXJyYXkgb2YgY29uZmlnIG9iamVjdHN8aW5zdGFuY2VzfG1vZHVsZXMgZm9yIGVhY2ggY2hpbGQgY29tcG9uZW50XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdFtdfSBpdGVtc189W11cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogaW1wb3J0IEJ1dHRvbiAgICAgIGZyb20gJy4uL2J1dHRvbi9CYXNlLm1qcyc7XG4gICAgICAgICAqIGltcG9ydCBNeVJlZEJ1dHRvbiBmcm9tICdteWFwcC9NeVJlZEJ1dHRvbi5tanMnO1xuICAgICAgICAgKiBpbXBvcnQgVG9vbGJhciAgICAgZnJvbSAnLi4vY29udGFpbmVyL1Rvb2xiYXIubWpzJztcbiAgICAgICAgICpcbiAgICAgICAgICogbGV0IG15QnV0dG9uID0gTmVvLmNyZWF0ZShCdXR0b24sIHtcbiAgICAgICAgICogICAgIHRleHQ6ICdCdXR0b24xJ1xuICAgICAgICAgKiB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogTmVvLmNyZWF0ZShUb29sYmFyLCB7XG4gICAgICAgICAqICAgICAvLy4uLlxuICAgICAgICAgKiAgICAgaXRlbXM6IFtcbiAgICAgICAgICogICAgICAgICBteUJ1dHRvbiwgICAgICAgICAgICAgIC8vIHBhc3NlZCBpbnN0YW5jZVxuICAgICAgICAgKiAgICAgICAgIHtcbiAgICAgICAgICogICAgICAgICAgICAgbnR5cGU6ICdidXR0b24nLCAgIC8vIGJ5IG50eXBlXG4gICAgICAgICAqICAgICAgICAgICAgIHRleHQgOiAnQnV0dG9uIDInXG4gICAgICAgICAqICAgICAgICAgfSxcbiAgICAgICAgICogICAgICAgICB7XG4gICAgICAgICAqICAgICAgICAgICAgIG1vZHVsZTogQnV0dG9uLCAgICAvLyBieSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgICAgICogICAgICAgICAgICAgdGV4dCAgOiAnQnV0dG9uIDMnXG4gICAgICAgICAqICAgICAgICAgfSxcbiAgICAgICAgICogICAgICAgICBNeVJlZEJ1dHRvbiAgICAgICAgICAgIC8vIHlvdSBjYW4gZHJvcCBpbXBvcnRlZCBtb2R1bGVzIGRpcmVjdGx5IGludG8gdGhlIGl0ZW1zIGFycmF5XG4gICAgICAgICAqICAgICBdXG4gICAgICAgICAqIH0pO1xuICAgICAgICAgKi9cbiAgICAgICAgaXRlbXNfOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gbGF5b3V0Xz17bnR5cGU6ICd2Ym94JywgYWxpZ246ICdzdHJldGNoJ31cbiAgICAgICAgICovXG4gICAgICAgIGxheW91dF86IHtcbiAgICAgICAgICAgIG50eXBlOiAndmJveCcsXG4gICAgICAgICAgICBhbGlnbjogJ3N0cmV0Y2gnXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tPXtjbjogW119XG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgY246IFtdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gY2hhbmdlIHRoZSBvcmRlciBjb25maWdzIGFyZSBhcHBsaWVkIHRvIHRoaXMgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3ByZXZlbnRPcmlnaW5hbENvbmZpZ10gVHJ1ZSBwcmV2ZW50cyB0aGUgaW5zdGFuY2UgZnJvbSBnZXR0aW5nIGFuIG9yaWdpbmFsQ29uZmlnIHByb3BlcnR5XG4gICAgICogQHJldHVybnMge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgbWVyZ2VDb25maWcoLi4uYXJncykge1xuICAgICAgICBsZXQgbWUgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbmZpZyA9IHN1cGVyLm1lcmdlQ29uZmlnKC4uLmFyZ3MpO1xuXG4gICAgICAgIC8vIGF2b2lkIGFueSBpbnRlcmZlcmVuY2Ugb24gcHJvdG90eXBlIGxldmVsXG4gICAgICAgIC8vIGRvZXMgbm90IGNsb25lIGV4aXN0aW5nIE5lbyBpbnN0YW5jZXNcblxuICAgICAgICBpZiAoY29uZmlnLml0ZW1EZWZhdWx0cykge1xuICAgICAgICAgICAgbWUuX2l0ZW1EZWZhdWx0cyA9IE5lby5jbG9uZShjb25maWcuaXRlbURlZmF1bHRzLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuaXRlbURlZmF1bHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5pdGVtcykge1xuICAgICAgICAgICAgbWUuX2l0ZW1zID0gTmVvLmNsb25lKGNvbmZpZy5pdGVtcywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLml0ZW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgQ29udGFpbmVyIGRvZXMgbm90IGhhdmUgYSBsYXlvdXQgY29uZmlnLCB0aGUgc2V0dGVyIHdvbid0IHRyaWdnZXJcbiAgICAgICAgbWUuX2xheW91dCA9IG1lLmNyZWF0ZUxheW91dChtZS5sYXlvdXQpO1xuICAgICAgICBtZS5fbGF5b3V0LmFwcGx5UmVuZGVyQXR0cmlidXRlcygpO1xuXG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBtZS5wYXJzZUl0ZW1Db25maWdzKG1lLml0ZW1zKTtcbiAgICAgICAgbWUuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGFuIGl0ZW0gb3IgYXJyYXkgb2YgaXRlbXMgYXQgdGhlIGxhc3QgaW5kZXhcbiAgICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gaXRlbVxuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V8TmVvLmNvbXBvbmVudC5CYXNlW119XG4gICAgICovXG4gICAgYWRkKGl0ZW0pIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG1lLmluc2VydChtZS5pdGVtcyA/IG1lLml0ZW1zLmxlbmd0aCA6IDAsIGl0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYXBwTmFtZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QXBwTmFtZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoTmVvLmlzT2JqZWN0KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5sYXlvdXQuQmFzZX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge05lby5sYXlvdXQuQmFzZX0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMYXlvdXQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnJlbmRlcmVkKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5yZW1vdmVSZW5kZXJBdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICB2YWx1ZS5hcHBseVJlbmRlckF0dHJpYnV0ZXMoKTtcblxuICAgICAgICAgICAgbWUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZS5yZW1vdmVDaGlsZEF0dHJpYnV0ZXMoaXRlbSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHZhbHVlLmFwcGx5Q2hpbGRBdHRyaWJ1dGVzKGl0ZW0sIGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBtb3VudGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TW91bnRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJTZXRNb3VudGVkKHZhbHVlLCBvbGRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXMsXG4gICAgICAgICAgICAgICAgaSAgICAgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiAgID0gaXRlbXMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtc1tpXS52ZG9tLnJlbW92ZURvbSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5tb3VudGVkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSByZW5kZXJpbmcgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRSZW5kZXJpbmcodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLFxuICAgICAgICAgICAgICAgIGkgICAgID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gICA9IGl0ZW1zLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghaXRlbXNbaV0udmRvbS5yZW1vdmVEb20pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ucmVuZGVyaW5nID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybnMge05lby5sYXlvdXQuQmFzZX1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0TGF5b3V0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxheW91dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtcyAgICA9IG1lLl9pdGVtcyxcbiAgICAgICAgICAgIGRlZmF1bHRzID0gbWUuaXRlbURlZmF1bHRzLFxuICAgICAgICAgICAgbGF5b3V0ICAgPSBtZS5sYXlvdXQsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICB2ZG9tUm9vdCA9IG1lLmdldFZkb21Sb290KCk7XG5cbiAgICAgICAgdmRvbVJvb3QuY24gPSBbXTtcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uY29uc3RydWN0b3IuaXNDbGFzcyAmJiBpdGVtIGluc3RhbmNlb2YgTmVvLmNvcmUuQmFzZSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBOYW1lIDogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IG1lLmlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaXRlbS5pc0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IE5lby5jcmVhdGUoaXRlbSwge1xuICAgICAgICAgICAgICAgICAgICBhcHBOYW1lIDogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SWQ6IG1lLmlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBOZW8ubnR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBudHlwZSAgOiAnY29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZTogbWUuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdmRvbSAgIDoge2lubmVySFRNTDogaXRlbX1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIE5lby5hc3NpZ25EZWZhdWx0cyhpdGVtLCBkZWZhdWx0cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gaXRlbS5tb2R1bGUucHJvdG90eXBlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudElkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgICA6IGl0ZW0uc3R5bGUgfHwge31cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBOZW9baXRlbS5jbGFzc05hbWUgPyAnY3JlYXRlJyA6ICdudHlwZSddKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBpdGVtO1xuXG4gICAgICAgICAgICBsYXlvdXQuYXBwbHlDaGlsZEF0dHJpYnV0ZXMoaXRlbSwgaW5kZXgpO1xuXG4gICAgICAgICAgICB2ZG9tUm9vdC5jbi5wdXNoKGl0ZW0udmRvbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfE5lby5sYXlvdXQuQmFzZX0gdmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge05lby5sYXlvdXQuQmFzZX1cbiAgICAgKi9cbiAgICBjcmVhdGVMYXlvdXQodmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIExheW91dEJhc2UgJiYgdmFsdWUuaXNMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5jb250YWluZXJJZCA9IG1lLmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1lLnBhcnNlTGF5b3V0Q2xhc3ModmFsdWUpO1xuICAgICAgICAgICAgICAgIHZhbHVlLmNvbnRhaW5lcklkID0gbWUuaWQ7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBOZW8ubnR5cGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3lzIGFsbCBjb21wb25lbnRzIGluc2lkZSB0aGlzLml0ZW1zIGJlZm9yZSB0aGUgc3VwZXIoKSBjYWxsLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VwZGF0ZVBhcmVudFZkb209ZmFsc2VdIHRydWUgdG8gcmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgcGFyZW50IHZkb20gPT4gcmVhbCBkb21cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdIHRydWUgdG8gdXBkYXRlIHRoZSB2ZG9tIHNpbGVudGx5ICh1c2VmdWwgZm9yIGRlc3Ryb3lpbmcgbXVsdGlwbGUgY2hpbGQgaXRlbXMgaW4gYSByb3cpXG4gICAgICovXG4gICAgZGVzdHJveSh1cGRhdGVQYXJlbnRWZG9tPWZhbHNlLCBzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5kZXN0cm95KGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSh1cGRhdGVQYXJlbnRWZG9tLCBzaWxlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBkaWZmZXJlbnQgdmRvbSBpdGVtcyByb290IGlmIG5lZWRlZCAodXNlZnVsIGluIGNhc2UgdGhpcyBjb250YWluZXIgdXNlcyBhIHdyYXBwZXIgbm9kZSkuXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIG5ldyB2ZG9tIGl0ZW1zIHJvb3RcbiAgICAgKi9cbiAgICBnZXRWZG9tSXRlbXNSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZG9tLmNuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiBhIGRpcmVjdCBjaGlsZCBjb21wb25lbnQgaW5zaWRlIHRoaXMuaXRlbXMuXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V8U3RyaW5nfSBpdGVtSWQgRWl0aGVyIHRoZSBpdGVtIHJlZmVyZW5jZSBvciB0aGUgaXRlbSBpZFxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGluIGNhc2Ugbm8gbWF0Y2ggd2FzIGZvdW5kXG4gICAgICovXG4gICAgaW5kZXhPZihpdGVtSWQpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBpICAgPSAwLFxuICAgICAgICAgICAgbGVuID0gbWUuaXRlbXMgJiYgbWUuaXRlbXMubGVuZ3RoIHx8IDA7XG5cbiAgICAgICAgaWYgKCFOZW8uaXNTdHJpbmcoaXRlbUlkKSkge1xuICAgICAgICAgICAgaXRlbUlkID0gaXRlbUlkLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKG1lLml0ZW1zW2ldLmlkID09PSBpdGVtSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGFuIGl0ZW0gb3IgYXJyYXkgb2YgaXRlbXMgYXQgYSBzcGVjaWZpYyBpbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBpdGVtXG4gICAgICogQHJldHVybnMge05lby5jb21wb25lbnQuQmFzZXxOZW8uY29tcG9uZW50LkJhc2VbXX1cbiAgICAgKi9cbiAgICBpbnNlcnQoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1zID0gbWUuaXRlbXMsXG4gICAgICAgICAgICB2ZG9tICA9IG1lLnZkb20sXG4gICAgICAgICAgICBjbiwgaSwgbGVuO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICBpICAgPSAwO1xuICAgICAgICAgICAgbGVuID0gaXRlbS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyB0b2RvOiByZW5kZXIgaXMgYXN5bmMsIGVuc3VyZSB0aGUgb3JkZXIgb2YgaXRlbXMgaXMgY29ycmVjdFxuXG4gICAgICAgICAgICAgICAgLy8gaW5zZXJ0IHRoZSBhcnJheSBiYWNrd2FyZHNcbiAgICAgICAgICAgICAgICBpdGVtW2ldID0gbWUuaW5zZXJ0KGl0ZW1bbGVuIC0gMV0sIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBOZW8uY29tcG9uZW50LkJhc2UpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gaXRlbS5tb2R1bGUucHJvdG90eXBlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5tZS5pdGVtRGVmYXVsdHMgfHwge30sXG5cbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSAgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Nb3VudCAgOiBtZS5tb3VudGVkLFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRJZCAgIDogbWUuaWQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEluZGV4OiBpbmRleCxcblxuICAgICAgICAgICAgICAgICAgICAuLi5pdGVtXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGl0ZW0gPSBOZW9baXRlbS5jbGFzc05hbWUgPyAnY3JlYXRlJyA6ICdudHlwZSddKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSAgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudElkICAgOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50SW5kZXg6IGluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZGVkIHRoZSB0cnVlIHBhcmFtID0+IGZvciBjYXJkIGxheW91dHMsIHdlIGRvIG5vdCB3YW50IGEgZHluYW1pY2FsbHkgaW5zZXJ0ZWQgY21wIHRvIGdldCByZW1vdmVkIHJpZ2h0IGF3YXlcbiAgICAgICAgICAgIC8vIHNpbmNlIGl0IHdpbGwgbW9zdCBsaWtlbHkgZ2V0IGFjdGl2YXRlZCByaWdodCBhd2F5XG4gICAgICAgICAgICBtZS5sYXlvdXQuYXBwbHlDaGlsZEF0dHJpYnV0ZXMoaXRlbSwgaW5kZXgsIHRydWUpO1xuXG4gICAgICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuXG4gICAgICAgICAgICBtZS5pdGVtcyA9IGl0ZW1zO1xuXG4gICAgICAgICAgICBjbiA9IHZkb20uY24gfHwgdmRvbS5jaGlsZE5vZGVzIHx8IHZkb20uY2hpbGRyZW47XG5cbiAgICAgICAgICAgIGNuLnNwbGljZShpbmRleCwgMCwgaXRlbS52ZG9tKTtcblxuICAgICAgICAgICAgbWUucHJvbWlzZVZkb21VcGRhdGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5maXJlKCdpbnNlcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA6IGl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYW4gZXhpc3RpbmcgaXRlbSB0byBhIG5ldyBpbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleFxuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V9XG4gICAgICovXG4gICAgbW92ZVRvKGZyb21JbmRleCwgdG9JbmRleCkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtID0gbWUuaXRlbXNbZnJvbUluZGV4XTtcblxuICAgICAgICBpZiAoZnJvbUluZGV4ICE9PSB0b0luZGV4KSB7XG4gICAgICAgICAgICBtZS5zd2l0Y2hJdGVtcyhtZS5pdGVtc1t0b0luZGV4XS5pZCwgaXRlbS5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBwYXJzZUl0ZW1Db25maWdzKGl0ZW1zKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGl0ZW0pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpdGVtcycpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucGFyc2VJdGVtQ29uZmlncyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnN0YXJ0c1dpdGgoJ0Bjb25maWc6JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoOCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtZVt2YWx1ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVGhlIHVzZWQgQGNvbmZpZyBkb2VzIG5vdCBleGlzdDonLCB2YWx1ZSwgbWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtrZXldID0gbWVbdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjb25maWdcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gbGF5b3V0Q29uZmlnXG4gICAgICovXG4gICAgcGFyc2VMYXlvdXRDbGFzcyhjb25maWcpIHtcbiAgICAgICAgaWYgKE5lby5pc09iamVjdChjb25maWcpKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLm50eXBlLmluZGV4T2YoJ2xheW91dC0nKSA8IDApIHtcbiAgICAgICAgICAgICAgICBjb25maWcubnR5cGUgPSAnbGF5b3V0LScgKyBjb25maWcubnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnLmluZGV4T2YoJ2xheW91dC0nKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBudHlwZTogJ2xheW91dC0nICsgY29uZmlnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIG50eXBlOiBjb25maWdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBjb250YWluZXIgaXRlbSBieSByZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gY29tcG9uZW50XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGVzdHJveUl0ZW09dHJ1ZV1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdXG4gICAgICovXG4gICAgcmVtb3ZlKGNvbXBvbmVudCwgZGVzdHJveUl0ZW09dHJ1ZSwgc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBpdGVtcyA9IFsuLi50aGlzLml0ZW1zXSxcbiAgICAgICAgICAgIGkgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgID0gaXRlbXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpdGVtc1tpXS5pZCA9PT0gY29tcG9uZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdChpLCBkZXN0cm95SXRlbSwgc2lsZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBjb250YWluZXIgaXRlbSBhdCBhIGdpdmVuIGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZGVzdHJveUl0ZW09dHJ1ZV1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdXG4gICAgICovXG4gICAgcmVtb3ZlQXQoaW5kZXgsIGRlc3Ryb3lJdGVtPXRydWUsIHNpbGVudD1mYWxzZSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXRlbXMgPSBtZS5pdGVtcyxcbiAgICAgICAgICAgIHZkb20gID0gbWUudmRvbSxcbiAgICAgICAgICAgIGNuLCBpdGVtO1xuXG4gICAgICAgIGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIE5lby53YXJuKCdDb250YWluZXIucmVtb3ZlQXQ6IGluZGV4ID49IGl0ZW1zLmxlbmd0aC4gJyArIG1lLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmUgaXRlbScsIGl0ZW0uaWQpO1xuXG4gICAgICAgICAgICBpdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICBjbiA9IHZkb20uY24gfHwgdmRvbS5jaGlsZE5vZGVzIHx8IHZkb20uY2hpbGRyZW47XG5cbiAgICAgICAgICAgIGNuLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIG1lW3NpbGVudCAmJiAhZGVzdHJveUl0ZW0gPyAnX3Zkb20nIDogJ3Zkb20nXSA9IHZkb207XG5cbiAgICAgICAgICAgIGlmIChkZXN0cm95SXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVzdHJveSh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5tb3VudGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0aGUgcG9zaXRpb24gb2YgMiBkaXJlY3QgY2hpbGQgaXRlbXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaXRlbTFpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpdGVtMmlkXG4gICAgICovXG4gICAgc3dpdGNoSXRlbXMoaXRlbTFpZCwgaXRlbTJpZCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtMUluZGV4ID0gbWUuaW5kZXhPZihpdGVtMWlkKSxcbiAgICAgICAgICAgIGl0ZW0ySW5kZXggPSBtZS5pbmRleE9mKGl0ZW0yaWQpLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb207XG5cbiAgICAgICAgTmVvQXJyYXkubW92ZShtZS5pdGVtcywgICAgICAgICAgICAgIGl0ZW0ySW5kZXgsIGl0ZW0xSW5kZXgpO1xuICAgICAgICBOZW9BcnJheS5tb3ZlKG1lLmdldFZkb21JdGVtc1Jvb3QoKSwgaXRlbTJJbmRleCwgaXRlbTFJbmRleCk7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb250YWluZXIgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgVG9vbGJhciAgIGZyb20gJy4vVG9vbGJhci5tanMnO1xuXG4vKipcbiAqIEFuIGV4dGVuZGVkIENvbnRhaW5lciBzdXBwb3J0aW5nIG11bHRpcGxlIGRvY2tlZCBoZWFkZXIgdG9vbGJhcnNcbiAqIEBjbGFzcyBOZW8uY29udGFpbmVyLlBhbmVsXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLkJhc2VcbiAqL1xuY2xhc3MgUGFuZWwgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29udGFpbmVyLlBhbmVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29udGFpbmVyLlBhbmVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3BhbmVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3BhbmVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tcGFuZWwnLCduZW8tY29udGFpbmVyJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tcGFuZWwnLCAnbmVvLWNvbnRhaW5lciddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBjb250YWluZXJDb25maWc9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29udGFpbmVyQ29uZmlnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBoZWFkZXJEZWZhdWx0cz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBoZWFkZXJEZWZhdWx0czogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBoZWFkZXJzPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGhlYWRlcnM6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGl0ZW1zPXtudHlwZTogJ3Zib3gnLCBhbGlnbjogJ3N0cmV0Y2gnfVxuICAgICAgICAgKi9cbiAgICAgICAgX2xheW91dDoge1xuICAgICAgICAgICAgbnR5cGU6ICd2Ym94JyxcbiAgICAgICAgICAgIGFsaWduOiAnc3RyZXRjaCdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHZlcnRpY2FsSGVhZGVyc0ZpcnN0PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJ0aWNhbEhlYWRlcnNGaXJzdDogZmFsc2VcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGhmID0gY29uZmlnICYmIGNvbmZpZy52ZXJ0aWNhbEhlYWRlcnNGaXJzdCA9PT0gdHJ1ZSB8fCBtZS52ZXJ0aWNhbEhlYWRlcnNGaXJzdCA9PT0gdHJ1ZTtcblxuICAgICAgICBpZiAoaGYpIHtcbiAgICAgICAgICAgIG1lLmxheW91dCA9IHtcbiAgICAgICAgICAgICAgICBudHlwZTogJ2hib3gnLFxuICAgICAgICAgICAgICAgIGFsaWduOiAnc3RyZXRjaCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZUl0ZW1zKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaGYgICAgICAgICAgICAgICAgICAgPSBtZS52ZXJ0aWNhbEhlYWRlcnNGaXJzdCA9PT0gZmFsc2UsXG4gICAgICAgICAgICBoZWFkZXJzICAgICAgICAgICAgICA9IG1lLmhlYWRlcnMgfHwgW10sXG4gICAgICAgICAgICBib3R0b21IZWFkZXJzICAgICAgICA9IGhlYWRlcnMuZmlsdGVyKGhlYWRlciA9PiB7cmV0dXJuIGhlYWRlci5kb2NrID09PSAoaGYgPydib3R0b20nOiAncmlnaHQnKX0pLFxuICAgICAgICAgICAgbGVmdEhlYWRlcnMgICAgICAgICAgPSBoZWFkZXJzLmZpbHRlcihoZWFkZXIgPT4ge3JldHVybiBoZWFkZXIuZG9jayA9PT0gKGhmID8nbGVmdCcgIDogJ3RvcCcpfSksXG4gICAgICAgICAgICByaWdodEhlYWRlcnMgICAgICAgICA9IGhlYWRlcnMuZmlsdGVyKGhlYWRlciA9PiB7cmV0dXJuIGhlYWRlci5kb2NrID09PSAoaGYgPydyaWdodCcgOiAnYm90dG9tJyl9KSxcbiAgICAgICAgICAgIHRvcEhlYWRlcnMgICAgICAgICAgID0gaGVhZGVycy5maWx0ZXIoaGVhZGVyID0+IHtyZXR1cm4gaGVhZGVyLmRvY2sgPT09IChoZiA/J3RvcCcgICA6ICdsZWZ0Jyl9KSxcbiAgICAgICAgICAgIGhhc0hvcml6b250YWxIZWFkZXJzID0gYm90dG9tSGVhZGVycy5sZW5ndGggPiAwIHx8IHRvcEhlYWRlcnMgIC5sZW5ndGggPiAwLFxuICAgICAgICAgICAgaGFzVmVydGljYWxIZWFkZXJzICAgPSBsZWZ0SGVhZGVycyAgLmxlbmd0aCA+IDAgfHwgcmlnaHRIZWFkZXJzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICBpdGVtcyAgICAgICAgICAgICAgICA9IG1lLml0ZW1zLFxuICAgICAgICAgICAgaG9yaXpvbnRhbEl0ZW1zICAgICAgPSBbXSxcbiAgICAgICAgICAgIHZlcnRpY2FsSXRlbXMgICAgICAgID0gW10sXG4gICAgICAgICAgICBjb25maWc7XG5cbiAgICAgICAgaWYgKGhlYWRlcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgTmVvLmVycm9yKCdQYW5lbCB3aXRob3V0IGhlYWRlcnMsIHBsZWFzZSB1c2UgYSBDb250YWluZXIgaW5zdGVhZCcsIG1lLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcEhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xuICAgICAgICAgICAgdmVydGljYWxJdGVtcy5wdXNoKFBhbmVsLmNyZWF0ZUhlYWRlckNvbmZpZyhoZWFkZXIpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhhc1ZlcnRpY2FsSGVhZGVycyAmJiAoaGYgJiYgaGFzSG9yaXpvbnRhbEhlYWRlcnMgfHwgIWhmICYmIGhhc0hvcml6b250YWxIZWFkZXJzKSkge1xuICAgICAgICAgICAgbGVmdEhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGhvcml6b250YWxJdGVtcy5wdXNoKFBhbmVsLmNyZWF0ZUhlYWRlckNvbmZpZyhoZWFkZXIpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgbnR5cGUgICAgICAgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICBmbGV4ICAgICAgICA6IDEsXG4gICAgICAgICAgICAgICAgaXRlbXMgICAgICAgOiBpdGVtcyxcbiAgICAgICAgICAgICAgICBpdGVtRGVmYXVsdHM6IG1lLml0ZW1EZWZhdWx0cyxcbiAgICAgICAgICAgICAgICAuLi5tZS5jb250YWluZXJDb25maWcgfHwge31cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGhvcml6b250YWxJdGVtcy5wdXNoKHsuLi5tZS5oZWFkZXJEZWZhdWx0cywgLi4uY29uZmlnfSk7XG5cbiAgICAgICAgICAgIHJpZ2h0SGVhZGVycy5mb3JFYWNoKGhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEl0ZW1zLnB1c2goUGFuZWwuY3JlYXRlSGVhZGVyQ29uZmlnKGhlYWRlcikpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZlcnRpY2FsSXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbnR5cGUgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICBpdGVtcyA6IGhvcml6b250YWxJdGVtcyxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGU6IChoZiA/ICdoYm94JyA6ICd2Ym94JyksXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiAnc3RyZXRjaCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBudHlwZSAgICAgICA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgIGZsZXggICAgICAgIDogMSxcbiAgICAgICAgICAgICAgICBpdGVtcyAgICAgICA6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGl0ZW1EZWZhdWx0czogbWUuaXRlbURlZmF1bHRzLFxuICAgICAgICAgICAgICAgIC4uLm1lLmNvbnRhaW5lckNvbmZpZyB8fCB7fVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmVydGljYWxJdGVtcy5wdXNoKHsuLi5tZS5oZWFkZXJEZWZhdWx0cywgLi4uY29uZmlnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBib3R0b21IZWFkZXJzLmZvckVhY2goaGVhZGVyID0+IHtcbiAgICAgICAgICAgIHZlcnRpY2FsSXRlbXMucHVzaChQYW5lbC5jcmVhdGVIZWFkZXJDb25maWcoaGVhZGVyKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLml0ZW1zID0gdmVydGljYWxJdGVtcztcblxuICAgICAgICBtZS5pdGVtRGVmYXVsdHMgPSBudWxsO1xuXG4gICAgICAgIHN1cGVyLmNyZWF0ZUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyIHRoZSBoZWFkZXIgY29uZmlnXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlSGVhZGVyQ29uZmlnKGhlYWRlcikge1xuICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgbnR5cGU6ICd0b29sYmFyJyxcbiAgICAgICAgICAgIGZsZXggOiAnMCAxIGF1dG8nXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGhlYWRlci50ZXh0KSB7XG4gICAgICAgICAgICBjb25maWcuaXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBudHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzICA6IFsnbmVvLXBhbmVsLWhlYWRlci10ZXh0JywgJ25lby1sYWJlbCddLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogaGVhZGVyLnRleHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBkZWxldGUgaGVhZGVyLnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhc3N1bWluZyBhbGwgbGFiZWxzIGluc2lkZSBhIFBhbmVsIEhlYWRlciBhcmUgbWVhbnQgdG8gYmUgdGl0bGVzIC0+IGxvb2sgdGhlIHNhbWUgd2F5XG4gICAgICAgIGlmIChOZW8uaXNBcnJheShoZWFkZXIuaXRlbXMpKSB7XG4gICAgICAgICAgICBoZWFkZXIuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5udHlwZSA9PT0gJ2xhYmVsJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNscyA9IFsnbmVvLXBhbmVsLWhlYWRlci10ZXh0JywgJ25lby1sYWJlbCddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsuLi5jb25maWcsIC4uLmhlYWRlcn07XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhQYW5lbCk7XG5cbmV4cG9ydCB7UGFuZWwgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJ1dHRvbiAgICBmcm9tICcuLi9idXR0b24vQmFzZS5tanMnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBMYWJlbCAgICAgZnJvbSAnLi4vY29tcG9uZW50L0xhYmVsLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmNvbnRhaW5lci5Ub29sYmFyXG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLkJhc2VcbiAqL1xuY2xhc3MgVG9vbGJhciBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVmFsaWQgdmFsdWVzIGZvciBkb2NrXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBkb2NrUG9zaXRpb25zPVsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J11cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgZG9ja1Bvc2l0aW9uczogWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXSxcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb250YWluZXIuVG9vbGJhcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvbnRhaW5lci5Ub29sYmFyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2xiYXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbGJhcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLXRvb2xiYXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10b29sYmFyJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGRvY2tfPSd0b3AnXG4gICAgICAgICAqL1xuICAgICAgICBkb2NrXzogJ3RvcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGl0ZW1EZWZhdWx0cz17bnR5cGU6ICdidXR0b24nfVxuICAgICAgICAgKi9cbiAgICAgICAgaXRlbURlZmF1bHRzOiB7XG4gICAgICAgICAgICBudHlwZTogJ2J1dHRvbidcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX2xheW91dD17bnR5cGU6ICdoYm94JywgYWxpZ246ICdjZW50ZXInLCBwYWNrIDogJ3N0YXJ0J31cbiAgICAgICAgICovXG4gICAgICAgIF9sYXlvdXQ6IHtcbiAgICAgICAgICAgIG50eXBlOiAnaGJveCcsXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBwYWNrIDogJ3N0YXJ0J1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc29ydGFibGVfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzb3J0YWJsZV86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRyYWdnYWJsZS50b29sYmFyLlNvcnRab25lfG51bGx9IHNvcnRab25lPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNvcnRab25lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBzb3J0Wm9uZUNvbmZpZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzb3J0Wm9uZUNvbmZpZzogbnVsbFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGRvY2sgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RG9jayh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY2xzICAgICAgICAgICA9IG1lLmNscyxcbiAgICAgICAgICAgIGRvY2tQb3NpdGlvbnMgPSBtZS5nZXRTdGF0aWNDb25maWcoJ2RvY2tQb3NpdGlvbnMnKTtcblxuICAgICAgICBkb2NrUG9zaXRpb25zLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIE5lb0FycmF5W2tleSA9PT0gdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnXShjbHMsICduZW8tZG9jay0nICsga2V5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuY2xzICAgID0gY2xzO1xuICAgICAgICBtZS5sYXlvdXQgPSBtZS5nZXRMYXlvdXRDb25maWcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNvcnRhYmxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U29ydGFibGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFtZS5zb3J0Wm9uZSkge1xuICAgICAgICAgICAgaW1wb3J0KFxuICAgICAgICAgICAgICAgIC8qIHdlYnBhY2tDaHVua05hbWU6ICdzcmMvZHJhZ2dhYmxlL3Rvb2xiYXIvU29ydFpvbmUtbWpzLmpzJyAqL1xuICAgICAgICAgICAgICAgICcuLi9kcmFnZ2FibGUvdG9vbGJhci9Tb3J0Wm9uZS5tanMnXG4gICAgICAgICAgICAgICAgKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuc29ydFpvbmUgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlICAgICAgICAgICAgIDogbW9kdWxlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWUgICAgICAgICAgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5Q29udGFpbmVySWQ6IG1lLmlkLFxuICAgICAgICAgICAgICAgICAgICBvd25lciAgICAgICAgICAgICAgOiBtZSxcbiAgICAgICAgICAgICAgICAgICAgLi4ubWUuc29ydFpvbmVDb25maWcgfHwge31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBuZXcgZG9jayBwb3NpdGlvbiBtYXRjaGVzIGEgdmFsdWUgb2YgdGhlIHN0YXRpYyBkb2NrUG9zaXRpb25zIGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldERvY2sodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJlZm9yZVNldEVudW1WYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsICdkb2NrJywgJ2RvY2tQb3NpdGlvbnMnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNyZWF0ZUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX2l0ZW1zO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gJy0+Jykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpbmRleF0gPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZTogQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmxleCAgOiAxXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmNyZWF0ZUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGxheW91dCBjb25maWcgZGVwZW5kaW5nIG9uIHRoaXMuZG9ja1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGxheW91dENvbmZpZ1xuICAgICAqL1xuICAgIGdldExheW91dENvbmZpZygpIHtcbiAgICAgICAgbGV0IGxheW91dENvbmZpZztcblxuICAgICAgICBzd2l0Y2godGhpcy5kb2NrKSB7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICBsYXlvdXRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIG50eXBlOiAnaGJveCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgcGFjayA6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgbGF5b3V0Q29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBudHlwZSAgICA6ICd2Ym94JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24gICAgOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAnY29sdW1uLXJldmVyc2UnLFxuICAgICAgICAgICAgICAgICAgICBwYWNrICAgICA6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGxheW91dENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAndmJveCcsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduICAgIDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgIHBhY2sgICAgIDogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGF5b3V0Q29uZmlnO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVG9vbGJhcik7XG5cbmV4cG9ydCB7VG9vbGJhciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uY29udGFpbmVyLlZpZXdwb3J0XG4gKiBAZXh0ZW5kcyBOZW8uY29udGFpbmVyLkJhc2VcbiAqL1xuY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uY29udGFpbmVyLlZpZXdwb3J0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uY29udGFpbmVyLlZpZXdwb3J0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3ZpZXdwb3J0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3ZpZXdwb3J0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRydWUgYXBwbGllcyAnbmVvLWJvZHktdmlld3BvcnQnIHRvIHRoZSBkb2N1bWVudC5ib2R5XG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGFwcGx5Qm9keUNscz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhcHBseUJvZHlDbHM6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLXZpZXdwb3J0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tdmlld3BvcnQnXVxuICAgIH19XG5cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXBwbHlCb2R5Q2xzKSB7XG4gICAgICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3MuYXBwbHlCb2R5Q2xzKHtcbiAgICAgICAgICAgICAgICBhcHBOYW1lOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgY2xzICAgIDogWyduZW8tYm9keS12aWV3cG9ydCddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVmlld3BvcnQpO1xuXG5leHBvcnQge1ZpZXdwb3J0IGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZGF0YS5Nb2RlbFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBNb2RlbCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZGF0YS5Nb2RlbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRhdGEuTW9kZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbW9kZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGZpZWxkc189W11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZmllbGRzXzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGtleVByb3BlcnR5Xz0naWQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGtleVByb3BlcnR5XzogJ2lkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBzdG9yZUlkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmVJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIGNvbmZpZyB0byB0cnVlIGluIGNhc2UgeW91IHdhbnQgdG8gdHJhY2sgbW9kaWZpZWQgZmllbGRzLlxuICAgICAgICAgKiBCZSBhd2FyZSB0aGF0IHRoaXMgd2lsbCBkb3VibGUgdGhlIGFtb3VudCBvZiBkYXRhIGluc2lkZSBlYWNoIHJlY29yZCxcbiAgICAgICAgICogc2luY2UgZWFjaCBmaWVsZCB3aWxsIGdldCBhbiBvcmlnaW5hbCB2YWx1ZSBmbGFnLlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSB0cmFja01vZGlmaWVkRmllbGRzPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB0cmFja01vZGlmaWVkRmllbGRzOiBmYWxzZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheX0gb2xkVmFsdWVcbiAgICAgKi9cbiAgICBhZnRlclNldEZpZWxkcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gdG9kb1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWZ0ZXJTZXRGaWVsZHMnLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgZmllbGQgY29uZmlnIGJ5IGEgZ2l2ZW4gZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBmaWVsZCBjb25maWcgb2JqZWN0IG9yIG51bGwgaWYgbm8gbWF0Y2ggd2FzIGZvdW5kXG4gICAgICovXG4gICAgZ2V0RmllbGQoa2V5KSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IG1lLmZpZWxkcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKG1lLmZpZWxkc1tpXS5uYW1lID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWUuZmllbGRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNb2RlbCk7XG5cbmV4cG9ydCB7TW9kZWwgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vY29yZS9Mb2dnZXIubWpzJztcbmltcG9ydCBNb2RlbCAgZnJvbSAnLi9Nb2RlbC5tanMnO1xuXG5sZXQgaW5zdGFuY2U7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kYXRhLlJlY29yZEZhY3RvcnlcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgUmVjb3JkRmFjdG9yeSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZGF0YS5SZWNvcmRGYWN0b3J5J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZGF0YS5SZWNvcmRGYWN0b3J5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbnRlcm5hbCByZWNvcmQgcHJlZml4IGZvciBvcmlnaW5hbCBmaWVsZCB2YWx1ZXMuXG4gICAgICAgICAqIE9ubHkgdXNlZCBpbiBjYXNlIHRoZSBtb2RlbCBoYXMgdHJhY2tNb2RpZmllZEZpZWxkcyBzZXQgdG8gdHJ1ZS5cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBvdlByZWZpeD0nb3ZfJ1xuICAgICAgICAgKi9cbiAgICAgICAgb3ZQcmVmaXg6ICdvdl8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZWNvcmROYW1lc3BhY2U9J05lby5kYXRhLnJlY29yZC4nXG4gICAgICAgICAqL1xuICAgICAgICByZWNvcmROYW1lc3BhY2U6ICdOZW8uZGF0YS5yZWNvcmQuJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG1vZGVsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgY3JlYXRlUmVjb3JkKG1vZGVsLCBjb25maWcpIHtcbiAgICAgICAgbGV0IHJlY29yZENsYXNzID0gTmVvLm5zKHRoaXMucmVjb3JkTmFtZXNwYWNlICsgbW9kZWwuY2xhc3NOYW1lKTtcblxuICAgICAgICBpZiAoIXJlY29yZENsYXNzKSB7XG4gICAgICAgICAgICByZWNvcmRDbGFzcyA9IHRoaXMuY3JlYXRlUmVjb3JkQ2xhc3MobW9kZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyByZWNvcmRDbGFzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZW8uZGF0YS5Nb2RlbH0gbW9kZWxcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNyZWF0ZVJlY29yZENsYXNzKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbCBpbnN0YW5jZW9mIE1vZGVsKSB7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5yZWNvcmROYW1lc3BhY2UgKyBtb2RlbC5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgbnMgICAgICAgID0gTmVvLm5zKGNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAga2V5LCBuc0FycmF5O1xuXG4gICAgICAgICAgICBtb2RlbC50cmFja01vZGlmaWVkRmllbGRzID0gdHJ1ZTsgLy8gdG9kbzogcmVtb3ZlLCBqdXN0IGZvciB0ZXN0aW5nXG5cbiAgICAgICAgICAgIGlmICghbnMpIHtcbiAgICAgICAgICAgICAgICBuc0FycmF5ID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAga2V5ICAgICA9IG5zQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgbnMgICAgICA9IE5lby5ucyhuc0FycmF5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBuc1trZXldID0gY2xhc3MgUmVjb3JkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lzTW9kaWZpZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbC5maWVsZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkVmFsdWUgPSBpbnN0YW5jZS5wYXJzZVJlY29yZFZhbHVlKGZpZWxkLCBjb25maWdbZmllbGQubmFtZV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sICAgICAgPSBTeW1ib2woZmllbGQubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzeW1ib2xdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IHBhcnNlZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkLm5hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGUgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3N5bWJvbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gbWVbc3ltYm9sXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGluc3RhbmNlLnBhcnNlUmVjb3JkVmFsdWUoZmllbGQsIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVbc3ltYm9sXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5faXNNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5faXNNb2RpZmllZCA9IGluc3RhbmNlLmlzTW9kaWZpZWQobWUsIG1vZGVsLnRyYWNrTW9kaWZpZWRGaWVsZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5vblJlY29yZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgICA6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgICA6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGRpbmcgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIGVhY2ggZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLnRyYWNrTW9kaWZpZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5zdGFuY2Uub3ZQcmVmaXggKyBmaWVsZC5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VkVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1lLCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiBuc1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHZhbHVlIG9mIGEgY29uZmlnIGhhcyBjaGFuZ2VkXG4gICAgICogdG9kbzogd2UgY291bGQgY29tcGFyZSBvYmplY3RzICYgYXJyYXlzIGZvciBlcXVhbGl0eVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZFZhbHVlLnZhbHVlT2YoKSAhPT0gdmFsdWUudmFsdWVPZigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvbGRWYWx1ZSAhPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB0cmFja01vZGlmaWVkRmllbGRzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaW4gY2FzZSBhIGNoYW5nZSB3YXMgZm91bmRcbiAgICAgKi9cbiAgICBpc01vZGlmaWVkKHJlY29yZCwgdHJhY2tNb2RpZmllZEZpZWxkcykge1xuICAgICAgICBpZiAodHJhY2tNb2RpZmllZEZpZWxkcykge1xuICAgICAgICAgICAgbGV0IGZpZWxkcyA9IE9iamVjdC5rZXlzKHJlY29yZCksXG4gICAgICAgICAgICAgICAgaSAgICAgID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gICAgPSBmaWVsZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGZpZWxkO1xuXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZmllbGQgPSBmaWVsZHNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ZpZWxkXSAhPT0gcmVjb3JkW3RoaXMub3ZQcmVmaXggKyBmaWVsZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjb3JkLl9pc01vZGlmaWVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxudWxsfSBudWxsIGluIGNhc2UgdGhlIG1vZGVsIGRvZXMgbm90IHVzZSB0cmFja01vZGlmaWVkRmllbGRzLCB0cnVlIGluIGNhc2UgYSBjaGFuZ2Ugd2FzIGZvdW5kXG4gICAgICovXG4gICAgaXNNb2RpZmllZEZpZWxkKHJlY29yZCwgZmllbGROYW1lKSB7XG4gICAgICAgIGlmICghcmVjb3JkLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVGhlIHJlY29yZCBkb2VzIG5vdCBjb250YWluIHRoZSBmaWVsZCcsIGZpZWxkTmFtZSwgcmVjb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkodGhpcy5vdlByZWZpeCArIGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRbZmllbGROYW1lXSAhPT0gcmVjb3JkW3RoaXMub3ZQcmVmaXggKyBmaWVsZE5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdHMgaWYgYSBnaXZlbiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBjcmVhdGVkIGJ5IHRoaXMgZmFjdG9yeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1JlY29yZChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdSZWNvcmQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdHJpZ2dlcmVkIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBhIHJlY29yZCBmaWVsZC5cbiAgICAgKiBFLmcuIG15UmVjb3JkLmZvbyA9ICdiYXInO1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZmllbGQgVGhlIG5hbWUgb2YgdGhlIGZpZWxkIHdoaWNoIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOZW8uZGF0YS5Nb2RlbH0gb3B0cy5tb2RlbCBUaGUgbW9kZWwgaW5zdGFuY2Ugb2YgdGhlIGNoYW5nZWQgcmVjb3JkXG4gICAgICogQHBhcmFtIHsqfSBvcHRzLm9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMucmVjb3JkXG4gICAgICogQHBhcmFtIHsqfSBvcHRzLnZhbHVlXG4gICAgICovXG4gICAgb25SZWNvcmRDaGFuZ2Uob3B0cykge1xuICAgICAgICBsZXQgc3RvcmUgPSBOZW8uZ2V0KG9wdHMubW9kZWwuc3RvcmVJZCk7XG5cbiAgICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgICAgICBzdG9yZS5vblJlY29yZENoYW5nZShvcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IHBhcnNlIHZhbHVlIGZvciBtb3JlIGZpZWxkIHR5cGVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGZpZWxkXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHBhcnNlUmVjb3JkVmFsdWUoZmllbGQsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBmaWVsZC50eXBlICYmIGZpZWxkLnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoUmVjb3JkRmFjdG9yeSk7XG5cbmluc3RhbmNlID0gTmVvLmNyZWF0ZShSZWNvcmRGYWN0b3J5KTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlICAgICAgICAgICAgZnJvbSAnLi4vY29sbGVjdGlvbi9CYXNlLm1qcyc7XG5pbXBvcnQgQ2xhc3NTeXN0ZW1VdGlsIGZyb20gJy4uL3V0aWwvQ2xhc3NTeXN0ZW0ubWpzJztcbmltcG9ydCBNb2RlbCAgICAgICAgICAgZnJvbSAnLi9Nb2RlbC5tanMnO1xuaW1wb3J0IE9ic2VydmFibGUgICAgICBmcm9tICcuLi9jb3JlL09ic2VydmFibGUubWpzJztcbmltcG9ydCBSZWNvcmRGYWN0b3J5ICAgZnJvbSAnLi9SZWNvcmRGYWN0b3J5Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kYXRhLlN0b3JlXG4gKiBAZXh0ZW5kcyBOZW8uY29sbGVjdGlvbi5CYXNlXG4gKi9cbmNsYXNzIFN0b3JlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIGNvcmUvT2JzZXJ2YWJsZS5tanMgbWl4aW5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gb2JzZXJ2YWJsZT10cnVlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIG9ic2VydmFibGU6IHRydWVcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kYXRhLlN0b3JlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZGF0YS5TdG9yZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdzdG9yZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdzdG9yZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhdXRvTG9hZD1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b0xvYWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gZGF0YV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSBpbml0aWFsRGF0YV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbERhdGFfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNHcm91cGVkPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0dyb3VwZWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNMb2FkZWQ9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzTG9hZGluZz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kYXRhLk1vZGVsfSBtb2RlbF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgbW9kZWxfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSB0byBsZXQgdGhlIGJhY2tlbmQgaGFuZGxlIHRoZSBmaWx0ZXJpbmcuXG4gICAgICAgICAqIFVzZWZ1bCBmb3IgYnVmZmVyZWQgc3RvcmVzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlbW90ZUZpbHRlcj1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgdG8gbGV0IHRoZSBiYWNrZW5kIGhhbmRsZSB0aGUgc29ydGluZy5cbiAgICAgICAgICogVXNlZnVsIGZvciBidWZmZXJlZCBzdG9yZXNcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gcmVtb3RlU29ydD1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlU29ydDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcmwgZm9yIEFqYXggcmVxdWVzdHNcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVybD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1cmw6IG51bGxcbiAgICB9fVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICAvLyB0b2RvXG4gICAgICAgIG1lLm9uKHtcbiAgICAgICAgICAgIG11dGF0ZTogbWUub25Db2xsZWN0aW9uTXV0YXRlLFxuICAgICAgICAgICAgc29ydCAgOiBtZS5vbkNvbGxlY3Rpb25Tb3J0LFxuICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5kYXRhKSB7XG4gICAgICAgICAgICBtZS5hZnRlclNldERhdGEobWUuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuYXV0b0xvYWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB0b2RvXG4gICAgICAgICAgICAgICAgbWUubG9hZCgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RGF0YSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuY29uZmlnc0FwcGxpZWQpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmluaXRpYWxEYXRhID0gWy4uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZS5hZGQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJbml0aWFsRGF0YSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FmdGVyU2V0SW5pdGlhbERhdGEnLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TW9kZWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuc3RvcmVJZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICBSZWNvcmRGYWN0b3J5LmNyZWF0ZVJlY29yZENsYXNzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGJlZm9yZVNldERhdGEodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0b2RvOiBhZGQgYSBjb25maWcgdG8gbWFrZSB0aGUgY2xvbmluZyBvcHRpb25hbFxuICAgICAgICAgICAgdmFsdWUgPSBOZW8uY2xvbmUodmFsdWUsIHRydWUpO1xuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFSZWNvcmRGYWN0b3J5LmlzUmVjb3JkKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbaW5kZXhdID0gUmVjb3JkRmFjdG9yeS5jcmVhdGVSZWNvcmQobWUubW9kZWwsIGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdiZWZvcmVTZXREYXRhJywgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGJlZm9yZVNldEluaXRpYWxEYXRhKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoIXZhbHVlICYmIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5kYXRhLk1vZGVsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtOZW8uZGF0YS5Nb2RlbH1cbiAgICAgKi9cbiAgICBiZWZvcmVTZXRNb2RlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ2xhc3NTeXN0ZW1VdGlsLmJlZm9yZVNldEluc3RhbmNlKHZhbHVlLCBNb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY3JlYXRlUmVjb3JkKGNvbmZpZykge1xuICAgICAgICBSZWNvcmRGYWN0b3J5LmNyZWF0ZVJlY29yZChjb25maWcpO1xuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICB1cmw6IG1lLnVybFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZGF0YSA9IEFycmF5LmlzQXJyYXkoZGF0YS5qc29uKSA/IGRhdGEuanNvbiA6IGRhdGEuanNvbi5kYXRhO1xuICAgICAgICAgICAgLy8gd2UgZG8gbm90IG5lZWQgdG8gZmlyZSBhIGxvYWQgZXZlbnQgPT4gb25Db2xsZWN0aW9uTXV0YXRlKClcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBmb3IgTmVvLlhoci5yZXF1ZXN0JywgZXJyLCBtZS5pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBvbkNvbGxlY3Rpb25NdXRhdGUob3B0cykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5jb25maWdzQXBwbGllZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29uQ29sbGVjdGlvbk11dGF0ZScsIG9wdHMpO1xuICAgICAgICAgICAgbWUuZmlyZSgnbG9hZCcsIG1lLml0ZW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IGFkZCB3aWxsIGZpcmUgbXV0YXRlIGFuZCBzb3J0IHJpZ2h0IGFmdGVyIGFub3RoZXJcbiAgICAgKi9cbiAgICBvbkNvbGxlY3Rpb25Tb3J0KCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5jb25maWdzQXBwbGllZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29uQ29sbGVjdGlvblNvcnQnLCBtZS5jb2xsZWN0aW9uLml0ZW1zKTtcbiAgICAgICAgICAgIC8vIG1lLmZpcmUoJ2xvYWQnLCBtZS5pdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRyaWdnZXJlZCBhZnRlciBjaGFuZ2luZyB0aGUgdmFsdWUgb2YgYSByZWNvcmQgZmllbGQuXG4gICAgICogRS5nLiBteVJlY29yZC5mb28gPSAnYmFyJztcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmZpZWxkIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB3aGljaCBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG9wdHMubW9kZWwgVGhlIG1vZGVsIGluc3RhbmNlIG9mIHRoZSBjaGFuZ2VkIHJlY29yZFxuICAgICAqIEBwYXJhbSB7Kn0gb3B0cy5vbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLnJlY29yZFxuICAgICAqIEBwYXJhbSB7Kn0gb3B0cy52YWx1ZVxuICAgICAqL1xuICAgIG9uUmVjb3JkQ2hhbmdlKG9wdHMpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZWNvcmRDaGFuZ2UnLCBvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZGlyZWN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMucHJvcGVydHlcbiAgICAgKi9cbiAgICBzb3J0KG9wdHM9e30pIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUucmVtb3RlU29ydCkge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NvcnQnLCBvcHRzLnByb3BlcnR5LCBvcHRzLmRpcmVjdGlvbiwgbWUuY29uZmlnc0FwcGxpZWQpO1xuXG4gICAgICAgICAgICBpZiAobWUuY29uZmlnc0FwcGxpZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IG9wdHMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgOiBvcHRzLnByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnN0YXJ0VXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLnNvcnRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWUuYWRkKFsuLi5tZS5pbml0aWFsRGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICBtZS5lbmRVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbWUuZmlyZSgnc29ydCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU3RvcmUpO1xuXG5leHBvcnQge1N0b3JlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50L0Jhc2UubWpzJztcblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBmb3JtIGZpZWxkc1xuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLkJhc2VcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmZvcm0uZmllbGQuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdiYXNlZmllbGQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnYmFzZWZpZWxkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIgeyp9IHZhbHVlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZV86IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB2YWx1ZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWx1ZVxuICAgICAqL1xuICAgIGFmdGVyU2V0VmFsdWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWUgOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICA6IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9IHRoaXMudmFsdWVcbiAgICAgKi9cbiAgICBnZXRTdWJtaXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIGNoYW5nZSBldmVudCBmaXJlcyBhZnRlciB0aGUgdmFsdWUgY29uZmlnIGdldHMgY2hhbmdlZFxuICogQGV2ZW50IGNoYW5nZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHsqfSBvbGRWYWx1ZVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICAgICAgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgQmFzZVRyaWdnZXIgIGZyb20gJy4vdHJpZ2dlci9CYXNlLm1qcyc7XG5pbXBvcnQgQ2xlYXJUcmlnZ2VyIGZyb20gJy4vdHJpZ2dlci9DbGVhci5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICBmcm9tICcuLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgVkRvbVV0aWwgICAgIGZyb20gJy4uLy4uL3V0aWwvVkRvbS5tanMnO1xuaW1wb3J0IFZOb2RlVXRpbCAgICBmcm9tICcuLi8uLi91dGlsL1ZOb2RlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLlRleHRcbiAqIEBleHRlbmRzIE5lby5mb3JtLmZpZWxkLkJhc2VcbiAqL1xuY2xhc3MgVGV4dCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3IgbGFiZWxQb3NpdGlvblxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gbGFiZWxQb3NpdGlvbnM9Wydib3R0b20nLCAnaW5saW5lJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wJ11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbFBvc2l0aW9uczogWydib3R0b20nLCAnaW5saW5lJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wJ11cbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5mb3JtLmZpZWxkLlRleHQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5mb3JtLmZpZWxkLlRleHQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndGV4dGZpZWxkJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RleHRmaWVsZCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCB2YXJpYWJsZSB0byBzdG9yZSB0aGUgYWN0dWFsIHdpZHRoIGZvciB0aGUgbGFiZWwgY2VudGVyQm9yZGVyRWxcbiAgICAgICAgICogKG9ubHkgbmVlZGVkIGZvciBsYWJlbFBvc2l0aW9uOiAnaW5saW5lJylcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGNlbnRlckJvcmRlckVsV2lkdGg9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjZW50ZXJCb3JkZXJFbFdpZHRoOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBzaG93cyBhIGNsZWFyIHRyaWdnZXIgaW4gY2FzZSB0aGUgZmllbGQgaGFzIGEgbm9uIGVtcHR5IHZhbHVlLlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBjbGVhcmFibGVfPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyYWJsZV86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIHdpbGwgcmVzZXQgdGhlIGZpZWxkIHRvIGl0cyBpbml0aWFsIHZhbHVlIGNvbmZpZy5cbiAgICAgICAgICogUmVjb21tZW5kZWQgZm9yIGZpZWxkcyB3aXRoIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGNsZWFyVG9PcmlnaW5hbFZhbHVlPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhclRvT3JpZ2luYWxWYWx1ZV86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby10ZXh0ZmllbGQnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10ZXh0ZmllbGQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGhpZGVMYWJlbF89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGhpZGVMYWJlbF86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBpbnB1dFR5cGVfPSd0ZXh0J1xuICAgICAgICAgKi9cbiAgICAgICAgaW5wdXRUeXBlXzogJ3RleHQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBsYWJlbFBvc2l0aW9uXz0nbGVmdCdcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsUG9zaXRpb25fOiAnbGVmdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGxhYmVsVGV4dF89J0xhYmVsVGV4dCdcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsVGV4dF86ICdMYWJlbFRleHQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogZGVmYXVsdHMgdG8gcHhcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfFN0cmluZ30gbGFiZWxXaWR0aF89MTUwXG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbFdpZHRoXzogMTUwLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHBsYWNlaG9sZGVyVGV4dF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgcGxhY2Vob2xkZXJUZXh0XzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlcXVpcmVkXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVxdWlyZWRfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxPYmplY3RbXXxudWxsfSB0cmlnZ2Vyc189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdHJpZ2dlcnNfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIHRhZyAgOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgIGNscyAgOiBbJ25lby10ZXh0ZmllbGQtbGFiZWwnXSxcbiAgICAgICAgICAgICAgICBzdHlsZToge31cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0YWcgICAgICAgICA6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgICAgICAgICAgICAgICBhdXRvY29ycmVjdCA6ICdvZmYnLFxuICAgICAgICAgICAgICAgIGNscyAgICAgICAgIDogWyduZW8tdGV4dGZpZWxkLWlucHV0J10sXG4gICAgICAgICAgICAgICAgZmxhZyAgICAgICAgOiAnbmVvLXJlYWwtaW5wdXQnLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2sgIDogJ2ZhbHNlJyxcbiAgICAgICAgICAgICAgICBzdHlsZSAgICAgICA6IHt9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gTmVvLmNsb25lKG1lLmRvbUxpc3RlbmVycywgdHJ1ZSwgdHJ1ZSksXG4gICAgICAgICAgICB2ZG9tICAgICAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaW5wdXRFbCAgICAgID0gbWUuZ2V0SW5wdXRFbCgpLFxuICAgICAgICAgICAgbGFiZWxFbCAgICAgID0gbWUuZ2V0TGFiZWxFbCgpO1xuXG4gICAgICAgIGlucHV0RWwuaWQgPSBsYWJlbEVsLmZvciA9IG1lLmlkICsgJy1pbnB1dCc7XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBmbiAgIDogbWUub25JbnB1dFZhbHVlQ2hhbmdlLFxuICAgICAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcHJldmVudE9yaWdpbmFsQ29uZmlnXSBUcnVlIHByZXZlbnRzIHRoZSBpbnN0YW5jZSBmcm9tIGdldHRpbmcgYW4gb3JpZ2luYWxDb25maWcgcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBtZXJnZUNvbmZpZyguLi5hcmdzKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb25maWcgICA9IHN1cGVyLm1lcmdlQ29uZmlnKC4uLmFyZ3MpLFxuICAgICAgICAgICAgdHJpZ2dlcnMgPSBjb25maWcudHJpZ2dlcnMgfHwgbWUudHJpZ2dlcnM7XG5cbiAgICAgICAgbWVbdHJpZ2dlcnMgPyAndHJpZ2dlcnMnIDogJ190cmlnZ2VycyddID0gdHJpZ2dlcnM7XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy50cmlnZ2VycztcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGNsZWFyYWJsZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENsZWFyYWJsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIHRyaWdnZXJzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdHJpZ2dlcnMgPSBtZS50cmlnZ2VycyB8fCBbXTtcbiAgICAgICAgICAgIHRyaWdnZXJzLnVuc2hpZnQoQ2xlYXJUcmlnZ2VyKTtcbiAgICAgICAgICAgIG1lLnRyaWdnZXJzID0gdHJpZ2dlcnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5yZW1vdmVUcmlnZ2VyKCdjbGVhcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjbGVhclRvT3JpZ2luYWxWYWx1ZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldENsZWFyVG9PcmlnaW5hbFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLmZpcmUoJ2NoYW5nZUNsZWFyVG9PcmlnaW5hbFZhbHVlJywge1xuICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgdmFsdWUgICA6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaGlkZUxhYmVsIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SGlkZUxhYmVsKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICB2ZG9tLmNuWzBdLnJlbW92ZURvbSA9IHZhbHVlO1xuICAgICAgICBtZS5fdmRvbSA9IHZkb207IC8vIHNpbGVudCB1cGRhdGVcblxuICAgICAgICBtZS51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBpbnB1dFR5cGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SW5wdXRUeXBlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLmNoYW5nZUlucHV0RWxLZXkoJ3R5cGUnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsYWJlbFBvc2l0aW9uIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExhYmVsUG9zaXRpb24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgY2xzID0gbWUuY2xzLFxuICAgICAgICAgICAgY2VudGVyQm9yZGVyRWxDbHMsIGlzRW1wdHksIHZkb207XG5cbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgJ2xhYmVsLScgKyBvbGRWYWx1ZSk7XG4gICAgICAgIE5lb0FycmF5LmFkZChjbHMsICdsYWJlbC0nICsgdmFsdWUpO1xuICAgICAgICBtZVtvbGRWYWx1ZSA9PT0gJ2lubGluZScgfHwgdmFsdWUgPT09ICdpbmxpbmUnID8gJ19jbHMnIDogJ2NscyddID0gY2xzOyAvLyBzaWxlbnQgdXBkYXRlIGlmIG5lZWRlZFxuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzBdID0gbWUuZ2V0TGFiZWxFbCgpOyAvLyByZW1vdmUgdGhlIHdyYXBwZXJcblxuICAgICAgICAgICAgdmRvbS5jblswXS53aWR0aCA9IG1lLmxhYmVsV2lkdGg7XG5cbiAgICAgICAgICAgIG1lLl92ZG9tID0gdmRvbTsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgbWUudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgY2VudGVyQm9yZGVyRWxDbHMgPSBbJ25lby1jZW50ZXItYm9yZGVyJ107XG4gICAgICAgICAgICBpc0VtcHR5ICAgICAgICAgICA9IG1lLmlzRW1wdHkoKTtcbiAgICAgICAgICAgIHZkb20gICAgICAgICAgICAgID0gbWUudmRvbTtcblxuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgY2VudGVyQm9yZGVyRWxDbHMucHVzaCgnbmVvLWZsb2F0LWFib3ZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSB2ZG9tLmNuWzBdLndpZHRoO1xuXG4gICAgICAgICAgICB2ZG9tLmNuWzBdID0ge1xuICAgICAgICAgICAgICAgIGNsczogWyduZW8tbGFiZWwtd3JhcHBlciddLFxuICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1sZWZ0LWJvcmRlciddXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjbHM6IGNlbnRlckJvcmRlckVsQ2xzLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFt2ZG9tLmNuWzBdXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1yaWdodC1ib3JkZXInXVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIG1lLnVwZGF0ZUlucHV0V2lkdGgoKTtcblxuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnVwZGF0ZUNlbnRlckJvcmRlckVsV2lkdGgoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sIDIwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbGFiZWxUZXh0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldExhYmVsVGV4dCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXNFbXB0eSA9IG1lLmlzRW1wdHkoKSxcbiAgICAgICAgICAgIHZkb20gICAgPSBtZS52ZG9tO1xuXG4gICAgICAgIG1lLmdldExhYmVsRWwoKS5pbm5lckhUTUwgPSB2YWx1ZTtcblxuICAgICAgICBpZiAobWUuaGlkZUxhYmVsKSB7XG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtZS5sYWJlbFBvc2l0aW9uID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICAgIGlmICghaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbWUuZ2V0Q2VudGVyQm9yZGVyRWwoKS53aWR0aDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZS5wcm9taXNlVmRvbVVwZGF0ZSh2ZG9tKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWUudXBkYXRlQ2VudGVyQm9yZGVyRWxXaWR0aChpc0VtcHR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGxhYmVsV2lkdGggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMYWJlbFdpZHRoKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5sYWJlbFBvc2l0aW9uICE9PSAnaW5saW5lJykge1xuICAgICAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICB2ZG9tICA9IG1lLnZkb20sXG4gICAgICAgICAgICAgICAgbGFiZWwgPSB2ZG9tLmNuWzBdO1xuXG4gICAgICAgICAgICBsYWJlbC53aWR0aCA9IHZhbHVlO1xuXG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207IC8vIHNpbGVudCB1cGRhdGVcblxuICAgICAgICAgICAgaWYgKCFtZS5oaWRlTGFiZWwpIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIG1vdW50ZWQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRNb3VudGVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBzdXBlci5hZnRlclNldE1vdW50ZWQodmFsdWUsIG9sZFZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdGhpcy5sYWJlbFBvc2l0aW9uID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDZW50ZXJCb3JkZXJFbFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHBsYWNlaG9sZGVyVGV4dCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0UGxhY2Vob2xkZXJUZXh0KHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLmNoYW5nZUlucHV0RWxLZXkoJ3BsYWNlaG9sZGVyJywgdmFsdWUgPT09ICcnID8gbnVsbCA6IHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHJlcXVpcmVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0UmVxdWlyZWQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSW5wdXRFbEtleSgncmVxdWlyZWQnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0cmlnZ2VycyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VHJpZ2dlcnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGlucHV0RWwgICAgICA9IHZkb20uY25bMV0sIC8vIGlucHV0RWwgb3IgaW5wdXRXcmFwcGVyRWxcbiAgICAgICAgICAgIHByZVRyaWdnZXJzICA9IFtdLFxuICAgICAgICAgICAgcG9zdFRyaWdnZXJzID0gW10sXG4gICAgICAgICAgICB3aWR0aDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSAmJiBbLi4udmFsdWVdLCBvbGRWYWx1ZSAmJiBbLi4ub2xkVmFsdWVdKTtcblxuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZS5nZXRUcmlnZ2VyKGl0ZW0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5hbGlnbiA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICBwcmVUcmlnZ2Vycy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc3RUcmlnZ2Vycy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb3N0VHJpZ2dlcnMuc29ydCgoYSwgYikgPT4gYi53ZWlnaHQgLSBhLndlaWdodCk7IC8vIERFU0NcbiAgICAgICAgICAgIHByZVRyaWdnZXJzIC5zb3J0KChhLCBiKSA9PiBhLndlaWdodCAtIGIud2VpZ2h0KTsgLy8gQVNDXG5cbiAgICAgICAgICAgIHBvc3RUcmlnZ2VycyA9IHBvc3RUcmlnZ2Vycy5tYXAoYSA9PiBhLnZkb20pO1xuICAgICAgICAgICAgcHJlVHJpZ2dlcnMgID0gcHJlVHJpZ2dlcnMgLm1hcChhID0+IGEudmRvbSk7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dEVsLnRhZyA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgICAgIC8vIHdyYXAgdGhlIGlucHV0IHRhZ1xuICAgICAgICAgICAgICAgIHZkb20uY25bMV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNscyAgOiBbJ25lby1pbnB1dC13cmFwcGVyJ10sXG4gICAgICAgICAgICAgICAgICAgIGNuICAgOiBbLi4ucHJlVHJpZ2dlcnMsIGlucHV0RWwsIC4uLnBvc3RUcmlnZ2Vyc10sXG4gICAgICAgICAgICAgICAgICAgIGlkICAgOiBtZS5pZCArICctaW5wdXQtd3JhcHBlcicsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbnB1dEVsLndpZHRoXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dEVsLndpZHRoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnB1dEVsLmNuID0gWy4uLnByZVRyaWdnZXJzLCBtZS5nZXRJbnB1dEVsKCksIC4uLnBvc3RUcmlnZ2Vyc107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRFbC50YWcgIT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNpbmcgdGhlIGlucHV0IHdyYXBwZXIgZGl2IHdpdGggdGhlIGlucHV0IHRhZ1xuICAgICAgICAgICAgICAgIHdpZHRoID0gaW5wdXRFbC53aWR0aDtcbiAgICAgICAgICAgICAgICB2ZG9tLmNuWzFdID0gbWUuZ2V0SW5wdXRFbCgpO1xuICAgICAgICAgICAgICAgIHZkb20uY25bMV0ud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnByb21pc2VWZG9tVXBkYXRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBtZS51cGRhdGVUcmlnZ2VyVm5vZGVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdmFsdWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogdG9kbzogYWRkIHZhbGlkYXRpb24gbG9naWNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRWYWx1ZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgc3VwZXIuYWZ0ZXJTZXRWYWx1ZSh2YWx1ZSwgb2xkVmFsdWUpO1xuXG4gICAgICAgIG1lLmdldElucHV0RWwoKS52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghIXZhbHVlICE9PSAhIW9sZFZhbHVlKSB7IC8vIGNoYW5nZSBmcm9tIGVtcHR5IHRvIG5vbiBlbXB0eVxuICAgICAgICAgICAgTmVvQXJyYXlbdmFsdWUgJiYgdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwID8gJ2FkZCcgOiAncmVtb3ZlJ10obWUuX2NscywgJ25lby1oYXMtY29udGVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvQXJyYXlbbWUub3JpZ2luYWxDb25maWcudmFsdWUgIT09IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJ10obWUuX2NscywgJ25lby1pcy1kaXJ0eScpO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgd2lkdGggY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRXaWR0aCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJTZXRXaWR0aCh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzaGFsbG93IGNvcHkgb2YgdGhlIHRyaWdnZXJzIGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7QXJyYXl8bnVsbH0gdmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlR2V0VHJpZ2dlcnModmFsdWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gWy4uLnZhbHVlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBsYWJlbFBvc2l0aW9uIGNvbmZpZyBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBiZWZvcmVTZXRMYWJlbFBvc2l0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iZWZvcmVTZXRFbnVtVmFsdWUodmFsdWUsIG9sZFZhbHVlLCAnbGFiZWxQb3NpdGlvbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHRyaWdnZXJzIGNvbmZpZyBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxPYmplY3RbXX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBvbGRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3RbXX0gdGhlIHBhcnNlZCB0cmlnZ2VycyBjb25maWdcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge09iamVjdHxPYmplY3RbXX1cbiAgICAgKi9cbiAgICBiZWZvcmVTZXRUcmlnZ2Vycyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlzQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpbmRleF0gPSBOZW8uY3JlYXRlKGl0ZW0sIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgICA6IG1lLmdldFRyaWdnZXJJZChpdGVtLnByb3RvdHlwZS50eXBlKSxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IG1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoaXRlbSBpbnN0YW5jZW9mIEJhc2VUcmlnZ2VyKSkge1xuICAgICAgICAgICAgICAgIGlmICghaXRlbS5tb2R1bGUgJiYgIWl0ZW0ubnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5udHlwZSA9ICd0cmlnZ2VyJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5tb2R1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc05hbWUgPSBpdGVtLm1vZHVsZS5wcm90b3R5cGUuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmlkICAgICAgICA9IG1lLmdldFRyaWdnZXJJZChpdGVtLm1vZHVsZS5wcm90b3R5cGUudHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVbaW5kZXhdID0gTmVvW2l0ZW0uY2xhc3NOYW1lID8gJ2NyZWF0ZScgOiAnbnR5cGUnXSh7Li4uaXRlbSwgZmllbGQ6IG1lfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSB2YWx1ZSBvZiBhIGlucHV0RWwgdmRvbSBvYmplY3QgYXR0cmlidXRlIG9yIHJlbW92ZXMgaXQgaW4gY2FzZSBpdCBoYXMgbm8gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtBcnJheXxOdW1iZXJ8T2JqZWN0fFN0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqL1xuICAgIGNoYW5nZUlucHV0RWxLZXkoa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIG1lLmdldElucHV0RWwoKVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgbWUuZ2V0SW5wdXRFbCgpW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGZpZWxkIHRvIGl0cyBvcmlnaW5hbCB2YWx1ZSBvciBudWxsIGRlcGVuZGluZyBvbiB0aGUgY2xlYXJUb09yaWdpbmFsVmFsdWUgY29uZmlnXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUudmFsdWUgPSBtZS5jbGVhclRvT3JpZ2luYWxWYWx1ZSA/IG1lLm9yaWdpbmFsQ29uZmlnLnZhbHVlIDogbnVsbDtcbiAgICAgICAgbWUuZmlyZSgnY2xlYXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRDZW50ZXJCb3JkZXJFbCgpIHtcbiAgICAgICAgbGV0IGVsID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh0aGlzLnZkb20sIHtjbHM6ICduZW8tY2VudGVyLWJvcmRlcid9KTtcbiAgICAgICAgcmV0dXJuIGVsICYmIGVsLnZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgZ2V0SW5wdXRFbCgpIHtcbiAgICAgICAgbGV0IGVsID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh0aGlzLnZkb20sIHtmbGFnOiAnbmVvLXJlYWwtaW5wdXQnfSk7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC52ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJbnB1dEVsSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJy1pbnB1dCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbmV3IGlucHV0V2lkdGggYmFzZWQgb24gdGhlIGxhYmVsV2lkdGggJiB0b3RhbCB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ8bnVsbH0gbnVsbCBpbiBjYXNlIHRoaXMud2lkdGggaXMgdW5rbm93blxuICAgICAqL1xuICAgIGdldElucHV0V2lkdGgoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpZ25vcmVMYWJlbCA9IG1lLmhpZGVMYWJlbCB8fCBtZS5sYWJlbFBvc2l0aW9uID09PSAnYm90dG9tJyB8fCBtZS5sYWJlbFBvc2l0aW9uID09PSAnaW5saW5lJyB8fCBtZS5sYWJlbFBvc2l0aW9uID09PSAndG9wJyxcbiAgICAgICAgICAgIGxhYmVsV2lkdGggID0gaWdub3JlTGFiZWwgPyAwIDogbWUubGFiZWxXaWR0aCxcbiAgICAgICAgICAgIHdpZHRoICAgICAgID0gbWUud2lkdGg7XG5cbiAgICAgICAgaWYgKGxhYmVsV2lkdGggJiYgd2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh3aWR0aCkgLSBwYXJzZUludChsYWJlbFdpZHRoKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgZ2V0TGFiZWxFbCgpIHtcbiAgICAgICAgbGV0IGVsID0gVkRvbVV0aWwuZmluZFZkb21DaGlsZCh0aGlzLnZkb20sIHt0YWc6ICdsYWJlbCd9KTtcbiAgICAgICAgcmV0dXJuIGVsICYmIGVsLnZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkJhc2V8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRUcmlnZ2VyKHR5cGUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRyaWdnZXJzID0gbWUudHJpZ2dlcnMgfHwgW10sXG4gICAgICAgICAgICBpICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICA9IHRyaWdnZXJzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHJpZ2dlcnNbaV0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2Vyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge05lby5mb3JtLmZpZWxkLnRyaWdnZXIuQmFzZXxudWxsfVxuICAgICAqL1xuICAgIGdldFRyaWdnZXJCeUlkKGlkKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0cmlnZ2VycyA9IG1lLnRyaWdnZXJzIHx8IFtdLFxuICAgICAgICAgICAgaSAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgPSB0cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJzW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2Vyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHRyaWdnZXIgbm9kZSBpZFxuICAgICAqL1xuICAgIGdldFRyaWdnZXJJZCh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkICsgJy10cmlnZ2VyLScgKyB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgdHJpZ2dlciBieSBhIGdpdmVuIHR5cGUgY29uZmlnXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNUcmlnZ2VyKHR5cGUpIHtcbiAgICAgICAgbGV0IHRyaWdnZXJzID0gdGhpcy50cmlnZ2VycyB8fCBbXSxcbiAgICAgICAgICAgIGkgICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgID0gdHJpZ2dlcnMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0cmlnZ2Vyc1tpXS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnJlcXVpcmVkICYmICghbWUudmFsdWUgfHwgbWUudmFsdWUgJiYgbWUudmFsdWUubGVuZ3RoIDwgMSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXRoXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRm9jdXNFbnRlcihwYXRoKSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgY2xzID0gbWUuY2xzLFxuICAgICAgICAgICAgdmRvbTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbmVvLWZvY3VzJyk7XG4gICAgICAgIG1lLmNscyA9IGNscztcblxuICAgICAgICBpZiAobWUubGFiZWxQb3NpdGlvbiA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIGlmIChtZS5jZW50ZXJCb3JkZXJFbFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG4gICAgICAgICAgICAgICAgbWUuZ2V0Q2VudGVyQm9yZGVyRWwoKS53aWR0aCA9IG1lLmNlbnRlckJvcmRlckVsV2lkdGg7XG4gICAgICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLnVwZGF0ZUNlbnRlckJvcmRlckVsV2lkdGgoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXRoXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRm9jdXNMZWF2ZShwYXRoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJCb3JkZXJFbCA9IG1lLmdldENlbnRlckJvcmRlckVsKCksIC8vIGxhYmVsUG9zaXRpb246ICdpbmxpbmUnXG4gICAgICAgICAgICBjbHMgICAgICAgICAgICA9IG1lLmNscyxcbiAgICAgICAgICAgIHZkb207XG5cbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgJ25lby1mb2N1cycpO1xuXG4gICAgICAgIGlmIChjZW50ZXJCb3JkZXJFbCAmJiBtZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIG1lLl9jbHMgPSBjbHM7IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuICAgICAgICAgICAgZGVsZXRlIGNlbnRlckJvcmRlckVsLndpZHRoO1xuICAgICAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5jbHMgPSBjbHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbklucHV0VmFsdWVDaGFuZ2UoZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmFsdWUgICAgPSBkYXRhLnZhbHVlLFxuICAgICAgICAgICAgb2xkVmFsdWUgPSBtZS52YWx1ZSxcbiAgICAgICAgICAgIHZub2RlICAgID0gVk5vZGVVdGlsLmZpbmRDaGlsZFZub2RlKG1lLnZub2RlLCB7bm9kZU5hbWU6ICdpbnB1dCd9KTtcblxuICAgICAgICBpZiAodm5vZGUpIHtcbiAgICAgICAgICAgIC8vIHJlcXVpcmVkIGZvciB2YWxpZGF0aW9uIC0+IHJldmVydCBhIHdyb25nIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHZub2RlLnZub2RlLmF0dHJpYnV0ZXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG1lLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0cmlnZ2VycyBvZiBhIGdpdmVuIHR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudD1mYWxzZV0gdHJ1ZSBwcmV2ZW50cyBhIHZkb20gdXBkYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gW3RyaWdnZXJTb3VyY2VdIHBhc3MgYSBzaGFsbG93IGNvcHkgb2YgdGhpcy50cmlnZ2Vyc1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGluIGNhc2UgYSB0cmlnZ2VyIHdhcyBmb3VuZCAmIHJlbW92ZWRcbiAgICAgKi9cbiAgICByZW1vdmVUcmlnZ2VyKHR5cGUsIHNpbGVudD1mYWxzZSwgdHJpZ2dlclNvdXJjZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaGFzTWF0Y2ggPSBmYWxzZSxcbiAgICAgICAgICAgIHRyaWdnZXJzID0gdHJpZ2dlclNvdXJjZSB8fCBtZS50cmlnZ2VycyB8fCBbXSxcbiAgICAgICAgICAgIGkgICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgID0gdHJpZ2dlcnMubGVuZ3RoLFxuICAgICAgICAgICAgdHJpZ2dlcjtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0cmlnZ2VyID0gdHJpZ2dlcnNbaV07XG5cbiAgICAgICAgICAgIGlmICh0cmlnZ2VyLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUodHJpZ2dlcnMsIHRyaWdnZXIpO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNNYXRjaCAmJiAhc2lsZW50KSB7XG4gICAgICAgICAgICBtZS50cmlnZ2VycyA9IHRyaWdnZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhhc01hdGNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgZm9yIGxhYmVsUG9zaXRpb246ICdpbmxpbmUnIHRvIGFkanVzdCB0aGUgdG9wIGJvcmRlciBtYXRjaGluZyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudD1mYWxzZV0gdHJ1ZSB0byBnZXQgdGhlIHZhbHVlLCBidXQgbm90IGFwcGx5IGl0IHRvIHRoZSBET01cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlQ2VudGVyQm9yZGVyRWxXaWR0aChzaWxlbnQ9ZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUubW91bnRlZCkge1xuICAgICAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgaWQ6IG1lLmdldENlbnRlckJvcmRlckVsKCkuaWRcbiAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuY2VudGVyQm9yZGVyRWxXaWR0aCA9IE1hdGgucm91bmQoZGF0YS53aWR0aCAqIC43KSArIDg7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgICAgICAgICAgICAgbWUuZ2V0Q2VudGVyQm9yZGVyRWwoKS53aWR0aCA9IG1lLmNlbnRlckJvcmRlckVsV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbmV3IGlucHV0V2lkdGggYmFzZWQgb24gdGhlIGxhYmVsV2lkdGggJiB0b3RhbCB3aWR0aFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB1cGRhdGVJbnB1dFdpZHRoKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpbnB1dFdpZHRoID0gbWUuZ2V0SW5wdXRXaWR0aCgpLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb207XG5cbiAgICAgICAgaWYgKGlucHV0V2lkdGggIT09IG51bGwgJiYgaW5wdXRXaWR0aCAhPT0gbWUud2lkdGgpIHtcbiAgICAgICAgICAgIHZkb20uY25bMV0ud2lkdGggPSBpbnB1dFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHZkb20uY25bMV0ud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaW5jZSB0cmlnZ2VycyBkbyBub3QgZ2V0IHJlbmRlcmVkLCBhc3NpZ24gdGhlIHJlbGV2YW50IHByb3BzXG4gICAgICogdG9kbzogdGhpcyBjb3VsZCBiZSBoYW5kbGVkIGJ5IGNvbXBvbmVudC5CYXNlXG4gICAgICovXG4gICAgdXBkYXRlVHJpZ2dlclZub2RlcygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0cmlnZ2VyUm9vdCAgPSBtZS52bm9kZSAmJiBtZS52bm9kZS5jaGlsZE5vZGVzWzFdLFxuICAgICAgICAgICAgY2hpbGROb2RlcyAgID0gdHJpZ2dlclJvb3QgJiYgdHJpZ2dlclJvb3QuY2hpbGROb2RlcyB8fCBbXSxcbiAgICAgICAgICAgIHRyaWdnZXI7XG5cbiAgICAgICAgY2hpbGROb2Rlcy5mb3JFYWNoKHZub2RlID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIgPSBtZS5nZXRUcmlnZ2VyQnlJZCh2bm9kZS5pZCk7XG5cbiAgICAgICAgICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0cmlnZ2VyLCB7XG4gICAgICAgICAgICAgICAgICAgIHZub2RlICAgIDogdm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIF9yZW5kZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgX21vdW50ZWQgOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoVGV4dCk7XG5cbmV4cG9ydCB7VGV4dCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudC9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgIGZyb20gJy4uLy4uLy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBmb3JtIGZpZWxkIFRyaWdnZXJzXG4gKiBAY2xhc3MgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlXG4gKiBAZXh0ZW5kcyBOZW8uY29tcG9uZW50LkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVmFsaWQgdmFsdWVzIGZvciBhbGlnblxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gYWxpZ25WYWx1ZXM9WydlbmQnLCAnc3RhcnQnXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGFsaWduVmFsdWVzOiBbJ2VuZCcsICdzdGFydCddXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5mb3JtLmZpZWxkLnRyaWdnZXIuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSd0cmlnZ2VyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RyaWdnZXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBhbGlnbl89J2VuZCdcbiAgICAgICAgICovXG4gICAgICAgIGFsaWduXzogJ2VuZCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLWZpZWxkLXRyaWdnZXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1maWVsZC10cmlnZ2VyJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZm9ybS5maWVsZC5CYXNlfG51bGx9IGZpZWxkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGZpZWxkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaGlkZGVuXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZGVuXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gaWNvbkNsc189bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaWNvbkNsc186IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2NvcGUgb2YgdGhlIHRyaWdnZXIgaGFuZGxlclxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uY29yZS5CYXNlfG51bGx9IHNjb3BlPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjb3BlOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hvd09uSG92ZXI9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3dPbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsIGZsYWcgdXNlZCBieSBmaWVsZC5nZXRUcmlnZ2VyKClcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB0eXBlPSdiYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiAnYmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tPXt0YWJJbmRleDogLTF9XG4gICAgICAgICAqL1xuICAgICAgICBfdmRvbToge1xuICAgICAgICAgICAgdGFiSW5kZXg6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHdlaWdodF89MTBcbiAgICAgICAgICovXG4gICAgICAgIHdlaWdodF86IDEwXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgICA9IE5lby5jbG9uZShtZS5kb21MaXN0ZW5lcnMsIHRydWUsIHRydWUpLFxuICAgICAgICAgICAgZmllbGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtcbiAgICAgICAgICAgICAgICBmbiAgIDogbWUub25UcmlnZ2VyQ2xpY2ssXG4gICAgICAgICAgICAgICAgc2NvcGU6IG1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtZS5zaG93T25Ib3Zlcikge1xuICAgICAgICAgICAgbWUuaGlkZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICBtZS5maWVsZC5vbignY29uc3RydWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZmllbGRMaXN0ZW5lcnMgPSAhbWUuZmllbGQuZG9tTGlzdGVuZXJzID8gW10gOiBOZW8uY2xvbmUobWUuZmllbGQuZG9tTGlzdGVuZXJzLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBmaWVsZExpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VlbnRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4gICAgOiBtZS5vbk1vdXNlRW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA6IG1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlbGVhdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuICAgIDogbWUub25Nb3VzZUxlYXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbWUuZmllbGQuZG9tTGlzdGVuZXJzID0gZmllbGRMaXN0ZW5lcnM7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCBtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBhbGlnbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBbGlnbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IGNscyA9IHRoaXMuY2xzO1xuXG4gICAgICAgIE5lb0FycmF5W3ZhbHVlID09PSAnc3RhcnQnID8gJ2FkZCcgOiAncmVtb3ZlJ10oY2xzLCAnbmVvLWFsaWduLXN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaGlkZGVuIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SGlkZGVuKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgdmRvbSAgPSB0aGlzLnZkb20sXG4gICAgICAgICAgICBzdHlsZSA9IHZkb20uc3R5bGUgfHwge307XG5cbiAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJ2lubGluZS1ibG9jayc7XG4gICAgICAgIHRoaXMudmRvbSAgPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaWNvbkNscyBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJY29uQ2xzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgY2xzID0gdGhpcy5jbHM7XG5cbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgb2xkVmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIE5lb0FycmF5LmFkZChjbHMsIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIGFsaWduIGNvbmZpZyBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0QWxpZ24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJlZm9yZVNldEVudW1WYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsICdhbGlnbicsICdhbGlnblZhbHVlcycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZmllbGQ7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uTW91c2VFbnRlcigpIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsaWNrIGRvbUV2ZW50IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25UcmlnZ2VyQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgc2NvcGUgPSBtZS5zY29wZSB8fCBtZTtcblxuICAgICAgICBpZiAobWUuaGFuZGxlcikge1xuICAgICAgICAgICAgc2NvcGVbbWUuaGFuZGxlcl0uY2FsbChzY29wZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5IGZyb20gJy4uLy4uLy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBDbGVhciBUcmlnZ2VyIHRvIHJlbW92ZSB0aGUgaW5wdXQgdmFsdWUgb2YgVGV4dEZpZWxkcyBvciBzdWJjbGFzc2VzXG4gKiBAY2xhc3MgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5DbGVhclxuICogQGV4dGVuZHMgTmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlXG4gKi9cbmNsYXNzIENsZWFyIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5mb3JtLmZpZWxkLnRyaWdnZXIuQ2xlYXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5mb3JtLmZpZWxkLnRyaWdnZXIuQ2xlYXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndHJpZ2dlci1jbGVhcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0cmlnZ2VyLWNsZWFyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tZmllbGQtdHJpZ2dlcicsICduZW8tdHJpZ2dlci1jbGVhciddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLWZpZWxkLXRyaWdnZXInLCAnbmVvLXRyaWdnZXItY2xlYXInXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBpY29uQ2xzPSdmYSBmYS10aW1lcydcbiAgICAgICAgICovXG4gICAgICAgIGljb25DbHM6ICdmYSBmYS10aW1lcycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHVzZWQgYnkgZmllbGQuZ2V0VHJpZ2dlcigpXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdHlwZT0nY2xlYXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6ICdjbGVhcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IHdlaWdodF89MjBcbiAgICAgICAgICovXG4gICAgICAgIHdlaWdodDogMjBcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkNvbnN0cnVjdGVkKCkge1xuICAgICAgICBzdXBlci5vbkNvbnN0cnVjdGVkKCk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBtZS5maWVsZC5vbih7XG4gICAgICAgICAgICBjaGFuZ2UgICAgICAgICAgICAgICAgICAgIDogbWUub25GaWVsZENoYW5nZSxcbiAgICAgICAgICAgIGNoYW5nZUNsZWFyVG9PcmlnaW5hbFZhbHVlOiBtZS5vbkZpZWxkQ2hhbmdlLFxuICAgICAgICAgICAgc2NvcGUgICAgICAgICAgICAgICAgICAgICA6IG1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lLmhpZGRlbiA9IG1lLmdldEhpZGRlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBoaWRkZW4gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRIaWRkZW4odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBjbHMgPSB0aGlzLmNscztcblxuICAgICAgICBOZW9BcnJheVt2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSddKGNscywgJ25lby1pcy1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy5jbHMgPSBjbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpbiBjYXNlIHRoZSB0cmlnZ2VyIHNob3VsZCBiZSBoaWRkZW5cbiAgICAgKi9cbiAgICBnZXRIaWRkZW5TdGF0ZSgpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGZpZWxkID0gbWUuZmllbGQsXG4gICAgICAgICAgICB2YWx1ZSA9IGZpZWxkLnZhbHVlO1xuXG4gICAgICAgIGlmIChmaWVsZC5jbGVhclRvT3JpZ2luYWxWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSBmaWVsZC5vcmlnaW5hbENvbmZpZy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJzAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gIWZpZWxkLnZhbHVlIHx8IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBvbkZpZWxkQ2hhbmdlKG9wdHMpIHtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0aGlzLmdldEhpZGRlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uVHJpZ2dlckNsaWNrKGRhdGEpIHtcbiAgICAgICAgdGhpcy5maWVsZC5jbGVhcigpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ2xlYXIpO1xuXG5leHBvcnQge0NsZWFyIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb3JlQmFzZSBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgYWxsIG90aGVyIGxheW91dHMuXG4gKiBVc2UgaXQgZGlyZWN0bHkgaW4gY2FzZSB5b3Ugd2FudCB0byBjcmVhdGUgYSBjb250YWluZXIgd2l0aG91dCBhIGxheW91dC5cbiAqIEBjbGFzcyBOZW8ubGF5b3V0LkJhc2VcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgQmFzZSBleHRlbmRzIENvcmVCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmxheW91dC5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubGF5b3V0LkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGF5b3V0LWJhc2UnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGF5b3V0LWJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIElkIG9mIHRoZSBDb250YWluZXIgaW5zdGFuY2UgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG9cbiAgICAgICAgICogQG1lbWJlciB7P1N0cmluZ30gY29udGFpbmVySWQ9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWluZXJJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElkZW50aWZpZXIgZm9yIGFsbCBjbGFzc2VzIHRoYXQgZXh0ZW5kIGxheW91dC5CYXNlXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzTGF5b3V0PXRydWVcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaXNMYXlvdXQ6IHRydWVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgTWV0aG9kXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGl0ZW1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYXBwbHlDaGlsZEF0dHJpYnV0ZXMoaXRlbSkge31cblxuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIE1ldGhvZFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhcHBseVJlbmRlckF0dHJpYnV0ZXMoKSB7fVxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgTWV0aG9kXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGl0ZW1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVtb3ZlQ2hpbGRBdHRyaWJ1dGVzKGl0ZW0pIHt9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciBNZXRob2RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVtb3ZlUmVuZGVyQXR0cmlidXRlcygpIHt9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEJhc2UpO1xuXG5leHBvcnQge0Jhc2UgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5IGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmxheW91dC5DYXJkXG4gKiBAZXh0ZW5kcyBOZW8ubGF5b3V0LkJhc2VcbiAqL1xuY2xhc3MgQ2FyZCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLypcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIENTUyBjbGFzcyBmb3IgYW4gYWN0aXZlIGl0ZW0gaW5zaWRlIHRoZSBjYXJkIGxheW91dFxuICAgICAgICAgKiBAbWVtYmVyIGFjdGl2ZUl0ZW1DbHNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlSXRlbUNsczogJ2FjdGl2ZS1pdGVtJyxcbiAgICAgICAgLypcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIENTUyBjbGFzcyBmb3IgYW4gaW5hY3RpdmUgaXRlbSBpbnNpZGUgdGhlIGNhcmQgbGF5b3V0XG4gICAgICAgICAqIEBtZW1iZXIgaW5hY3RpdmVJdGVtQ2xzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGluYWN0aXZlSXRlbUNsczogJ2luYWN0aXZlLWl0ZW0nLFxuICAgICAgICAvKlxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgQ1NTIGNsYXNzIGZvciBhbiBpdGVtIGluc2lkZSB0aGUgY2FyZCBsYXlvdXRcbiAgICAgICAgICogQG1lbWJlciBpdGVtQ2xzXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1DbHM6ICduZW8tbGF5b3V0LWNhcmQtaXRlbSdcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5sYXlvdXQuQ2FyZCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmxheW91dC5DYXJkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xheW91dC1jYXJkJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xheW91dC1jYXJkJyxcbiAgICAgICAgLypcbiAgICAgICAgICogVGhlIGl0ZW0gaW5kZXggb2YgdGhlIGNhcmQsIHdoaWNoIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAgICAgICAqIENoYW5nZSB0aGlzIHZhbHVlIHRvIGFjdGl2YXRlIGEgZGlmZmVyZW50IGNhcmQuXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcn0gYWN0aXZlSW5kZXhfPTBcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZUluZGV4XzogMCxcbiAgICAgICAgLypcbiAgICAgICAgICogUmVtb3ZlIHRoZSBET00gb2YgaW5hY3RpdmUgY2FyZHMuXG4gICAgICAgICAqIFRoaXMgd2lsbCBrZWVwIHRoZSBpbnN0YW5jZXMgJiB2ZG9tIHRyZWVzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlbW92ZUluYWN0aXZlQ2FyZHM9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlSW5hY3RpdmVDYXJkczogdHJ1ZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyB0aGUgQ1NTIGNsYXNzZXMgb2YgdGhlIGNvbnRhaW5lciBpdGVtcyB0aGlzIGxheW91dCBpcyBib3VuZCB0by5cbiAgICAgKiBBdXRvbWF0aWNhbGx5IGdldHMgdHJpZ2dlcmVkIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBhY3RpdmVJbmRleC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRBY3RpdmVJbmRleCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXIgPSBOZW8uZ2V0Q29tcG9uZW50KG1lLmNvbnRhaW5lcklkKSxcbiAgICAgICAgICAgIHNDZmcgICAgICA9IG1lLmdldFN0YXRpY0NvbmZpZygpLFxuICAgICAgICAgICAgaXNBY3RpdmVJbmRleCwgY2xzLCBpdGVtcywgdmRvbTtcblxuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBpdGVtcyA9IGNvbnRhaW5lci5pdGVtcztcbiAgICAgICAgICAgIHZkb20gID0gY29udGFpbmVyLnZkb207XG5cbiAgICAgICAgICAgIGlmICghaXRlbXNbdmFsdWVdKSB7XG4gICAgICAgICAgICAgICAgTmVvLmVycm9yKCdUcnlpbmcgdG8gYWN0aXZhdGUgYSBub24gZXhpc3RpbmcgY2FyZCcsIHZhbHVlLCBpdGVtcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY2xzICAgICAgICAgICA9IGl0ZW0uY2xzO1xuICAgICAgICAgICAgICAgIGlzQWN0aXZlSW5kZXggPSBpbmRleCA9PT0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBpc0FjdGl2ZUluZGV4ID8gc0NmZy5pbmFjdGl2ZUl0ZW1DbHMgOiBzQ2ZnLmFjdGl2ZUl0ZW1DbHMpO1xuICAgICAgICAgICAgICAgIE5lb0FycmF5LmFkZCggICBjbHMsIGlzQWN0aXZlSW5kZXggPyBzQ2ZnLmFjdGl2ZUl0ZW1DbHMgICA6IHNDZmcuaW5hY3RpdmVJdGVtQ2xzKTtcblxuICAgICAgICAgICAgICAgIGlmIChtZS5yZW1vdmVJbmFjdGl2ZUNhcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uX2NscyA9IGNsczsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldFZkb21Sb290KCkuY2xzID0gY2xzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnZkb20ucmVtb3ZlRG9tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm1vdW50ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmRvbS5yZW1vdmVEb20gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbHMgPSBjbHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChtZS5yZW1vdmVJbmFjdGl2ZUNhcmRzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGx5IHNldHMgdGhlIENTUyBjbGFzc2VzIG9mIHRoZSBjb250YWluZXIgaXRlbXMgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG8uXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtrZWVwSW5Eb209ZmFsc2VdXG4gICAgICovXG4gICAgYXBwbHlDaGlsZEF0dHJpYnV0ZXMoaXRlbSwgaW5kZXgsIGtlZXBJbkRvbT1mYWxzZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpc0FjdGl2ZUluZGV4ID0gbWUuYWN0aXZlSW5kZXggPT09IGluZGV4LFxuICAgICAgICAgICAgc0NmZyAgICAgICAgICA9IG1lLmdldFN0YXRpY0NvbmZpZygpLFxuICAgICAgICAgICAgY2hpbGRDbHMgICAgICA9IGl0ZW0uY2xzLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgICA9IGl0ZW0udmRvbTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoY2hpbGRDbHMsIHNDZmcuaXRlbUNscyk7XG4gICAgICAgIE5lb0FycmF5LmFkZChjaGlsZENscywgaXNBY3RpdmVJbmRleCA/IHNDZmcuYWN0aXZlSXRlbUNscyA6IHNDZmcuaW5hY3RpdmVJdGVtQ2xzKTtcblxuICAgICAgICBpZiAoIWtlZXBJbkRvbSAmJiBtZS5yZW1vdmVJbmFjdGl2ZUNhcmRzKSB7XG4gICAgICAgICAgICBpdGVtLl9jbHMgPSBjaGlsZENsczsgLy8gc2lsZW50IHVwZGF0ZVxuICAgICAgICAgICAgdmRvbS5yZW1vdmVEb20gPSAhaXNBY3RpdmVJbmRleDtcbiAgICAgICAgICAgIGl0ZW0udmRvbSA9IHZkb207XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNscyA9IGNoaWxkQ2xzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBDU1MgY2xhc3NlcyB0byB0aGUgY29udGFpbmVyIHRoaXMgbGF5b3V0IGlzIGJvdW5kIHRvXG4gICAgICovXG4gICAgYXBwbHlSZW5kZXJBdHRyaWJ1dGVzKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IE5lby5nZXRDb21wb25lbnQobWUuY29udGFpbmVySWQpLFxuICAgICAgICAgICAgY2xzICAgICAgID0gY29udGFpbmVyICYmIGNvbnRhaW5lci5jbHM7XG5cbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIE5lby5sb2dFcnJvcignbGF5b3V0LkNhcmQ6IGFwcGx5UmVuZGVyQXR0cmlidXRlcyAtPiBjb250YWluZXIgbm90IHlldCBjcmVhdGVkJywgbWUuY29udGFpbmVySWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscyB8fCBbXSwgJ25lby1sYXlvdXQtY2FyZCcpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbHMgPSBjbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgQ1NTIHJ1bGVzIGZyb20gdGhlIGNvbnRhaW5lciB0aGlzIGxheW91dCBpcyBib3VuZCB0by5cbiAgICAgKiBHZXRzIGNhbGxlZCB3aGVuIHN3aXRjaGluZyB0byBhIGRpZmZlcmVudCBsYXlvdXQuXG4gICAgICovXG4gICAgcmVtb3ZlUmVuZGVyQXR0cmlidXRlcygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXIgPSBOZW8uZ2V0Q29tcG9uZW50KG1lLmNvbnRhaW5lcklkKSxcbiAgICAgICAgICAgIGNscyAgICAgICA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuY2xzO1xuXG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBOZW8ubG9nRXJyb3IoJ2xheW91dC5DYXJkOiByZW1vdmVSZW5kZXJBdHRyaWJ1dGVzIC0+IGNvbnRhaW5lciBub3QgeWV0IGNyZWF0ZWQnLCBtZS5jb250YWluZXJJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCAnbmVvLWxheW91dC1jYXJkJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmNscyA9IGNscztcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENhcmQpO1xuXG5leHBvcnQge0NhcmQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5IGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmxheW91dC5GaXRcbiAqIEBleHRlbmRzIE5lby5sYXlvdXQuQmFzZVxuICovXG5jbGFzcyBGaXQgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmxheW91dC5GaXQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5sYXlvdXQuRml0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xheW91dC1maXQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGF5b3V0LWZpdCdcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGx5IHNldHMgdGhlIENTUyBjbGFzc2VzIG9mIHRoZSBjb250YWluZXIgaXRlbXMgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG8uXG4gICAgICogQHBhcmFtIHtOZW8uY29tcG9uZW50LkJhc2V9IGNoaWxkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgYXBwbHlDaGlsZEF0dHJpYnV0ZXMoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgIGlmICghY2hpbGQuaWdub3JlTGF5b3V0KSB7XG4gICAgICAgICAgICBjaGlsZC5jbHMgPSBOZW9BcnJheS51bmlvbihjaGlsZC5jbHMsICduZW8tbGF5b3V0LWZpdC1pdGVtJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIENTUyBjbGFzc2VzIHRvIHRoZSBjb250YWluZXIgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG9cbiAgICAgKi9cbiAgICBhcHBseVJlbmRlckF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyID0gTmVvLmdldENvbXBvbmVudChtZS5jb250YWluZXJJZCksXG4gICAgICAgICAgICBjbHMgICAgICAgPSBjb250YWluZXIgJiYgY29udGFpbmVyLmNscztcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgTmVvLmxvZ0Vycm9yKCdsYXlvdXQuRml0OiBhcHBseVJlbmRlckF0dHJpYnV0ZXMgLT4gY29udGFpbmVyIG5vdCB5ZXQgY3JlYXRlZCcsIG1lLmNvbnRhaW5lcklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LmFkZChjbHMgfHwgW10sICduZW8tbGF5b3V0LWZpdCcpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbHMgPSBjbHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgQ1NTIHJ1bGVzIGZyb20gdGhlIGNvbnRhaW5lciB0aGlzIGxheW91dCBpcyBib3VuZCB0by5cbiAgICAgKiBHZXRzIGNhbGxlZCB3aGVuIHN3aXRjaGluZyB0byBhIGRpZmZlcmVudCBsYXlvdXQuXG4gICAgICovXG4gICAgcmVtb3ZlUmVuZGVyQXR0cmlidXRlcygpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXIgPSBOZW8uZ2V0Q29tcG9uZW50KG1lLmNvbnRhaW5lcklkKSxcbiAgICAgICAgICAgIGNscyAgICAgICA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuY2xzO1xuXG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBOZW8ubG9nRXJyb3IoJ2xheW91dC5GaXQ6IHJlbW92ZVJlbmRlckF0dHJpYnV0ZXMgLT4gY29udGFpbmVyIG5vdCB5ZXQgY3JlYXRlZCcsIG1lLmNvbnRhaW5lcklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICduZW8tbGF5b3V0LWZpdCcpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbHMgPSBjbHM7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGaXQpO1xuXG5leHBvcnQge0ZpdCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgZnJvbSAnLi9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgZnJvbSAnLi4vdXRpbC9BcnJheS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubGF5b3V0LkZsZXhib3hcbiAqIEBleHRlbmRzIE5lby5sYXlvdXQuQmFzZVxuICovXG5jbGFzcyBGbGV4Ym94IGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVmFsaWQgdmFsdWVzIGZvciBhbGlnblxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gYWxpZ25WYWx1ZXM9WydjZW50ZXInLCAnZW5kJywgJ3N0YXJ0JywgJ3N0cmV0Y2gnLCBudWxsXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGFsaWduVmFsdWVzOiBbJ2NlbnRlcicsICdlbmQnLCAnc3RhcnQnLCAnc3RyZXRjaCcsIG51bGxdLFxuICAgICAgICAvKipcbiAgICAgICAgICogVmFsaWQgdmFsdWVzIGZvciBkaXJlY3Rpb25cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGRpcmVjdGlvblZhbHVlcz1bJ2NvbHVtbicsICdjb2x1bW4tcmV2ZXJzZScsICdyb3cnLCAncm93LXJldmVyc2UnLCBudWxsXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIGRpcmVjdGlvblZhbHVlczogWydjb2x1bW4nLCAnY29sdW1uLXJldmVyc2UnLCAncm93JywgJ3Jvdy1yZXZlcnNlJywgbnVsbF0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZCB2YWx1ZXMgZm9yIHBhY2tcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IHBhY2tWYWx1ZXM9WydjZW50ZXInLCAnZW5kJywgJ3N0YXJ0JywgbnVsbF1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBwYWNrVmFsdWVzOiBbJ2NlbnRlcicsICdlbmQnLCAnc3RhcnQnLCBudWxsXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3Igd3JhcFxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gd3JhcFZhbHVlcz1bJ25vd3JhcCcsICd3cmFwJywgJ3dyYXAtcmV2ZXJzZSddXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgd3JhcFZhbHVlczogWydub3dyYXAnLCAnd3JhcCcsICd3cmFwLXJldmVyc2UnXSxcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5sYXlvdXQuRmxleGJveCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmxheW91dC5GbGV4Ym94JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xheW91dC1mbGV4Ym94J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xheW91dC1mbGV4Ym94JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlczogJ2NlbnRlcicsICdlbmQnLCAnc3RhcnQnLCAnc3RyZXRjaCcsIG51bGxcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGFsaWduXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbl86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZCB2YWx1ZXM6ICdjb2x1bW4nLCAnY29sdW1uLXJldmVyc2UnLCAncm93JywgJ3Jvdy1yZXZlcnNlJywgbnVsbFxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gZGlyZWN0aW9uXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkaXJlY3Rpb25fOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVmFsaWQgdmFsdWVzOiAnY2VudGVyJywgJ2VuZCcsICdzdGFydCcsIG51bGxcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHBhY2tfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHBhY2tfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQ1NTIGNsYXNzTmFtZSBwcmVmaXhcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBwcmVmaXg9J25lby1mbGV4LSdcbiAgICAgICAgICovXG4gICAgICAgIHByZWZpeDogJ25lby1mbGV4LScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZCB2YWx1ZXM6IG5vd3JhcCwgd3JhcCwgd3JhcHJldmVyc2VcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSB3cmFwXz0nbm93cmFwJ1xuICAgICAgICAgKi9cbiAgICAgICAgd3JhcF86ICdub3dyYXAnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENvbnRhaW5lciBDU1MgY2xzIGFmdGVyIFwiYWxpZ25cIiBnZXRzIGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QWxpZ24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsICdhbGlnbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENvbnRhaW5lciBDU1MgY2xzIGFmdGVyIFwiZGlyZWN0aW9uXCIgZ2V0cyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldERpcmVjdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgJ2RpcmVjdGlvbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENvbnRhaW5lciBDU1MgY2xzIGFmdGVyIFwicGFja1wiIGdldHMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRQYWNrKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUodmFsdWUsIG9sZFZhbHVlLCAncGFjaycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENvbnRhaW5lciBDU1MgY2xzIGFmdGVyIFwid3JhcFwiIGdldHMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFdyYXAodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSh2YWx1ZSwgb2xkVmFsdWUsICd3cmFwJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZmxleCB2YWx1ZSB0byBhbiBpdGVtIG9mIHRoZSBjb250YWluZXIgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gaXRlbVxuICAgICAqL1xuICAgIGFwcGx5Q2hpbGRBdHRyaWJ1dGVzKGl0ZW0pIHtcbiAgICAgICAgbGV0IHN0eWxlID0gaXRlbS53cmFwcGVyU3R5bGU7XG5cbiAgICAgICAgc3R5bGUuZmxleCA9IHN0eWxlLmZsZXggfHwgaXRlbS5mbGV4IHx8ICh0aGlzLmFsaWduID09PSAnc3RyZXRjaCcgPyAxIDogJzAgMSBhdXRvJyk7XG4gICAgICAgIGl0ZW0ud3JhcHBlclN0eWxlID0gc3R5bGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBDU1MgY2xhc3NlcyB0byB0aGUgY29udGFpbmVyIHRoaXMgbGF5b3V0IGlzIGJvdW5kIHRvXG4gICAgICovXG4gICAgYXBwbHlSZW5kZXJBdHRyaWJ1dGVzKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IE5lby5nZXRDb21wb25lbnQobWUuY29udGFpbmVySWQpLFxuICAgICAgICAgICAgcHJlZml4ICAgID0gbWUucHJlZml4LFxuICAgICAgICAgICAgY2xzICAgICAgID0gY29udGFpbmVyICYmIGNvbnRhaW5lci5jbHM7XG5cbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIE5lby5sb2dFcnJvcignbGF5b3V0LkZsZXhib3g6IGFwcGx5UmVuZGVyQXR0cmlidXRlcyAtPiBjb250YWluZXIgbm90IHlldCBjcmVhdGVkJywgbWUuY29udGFpbmVySWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscyB8fCBbXSwgcHJlZml4ICsgJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGlmIChtZS5hbGlnbikge1xuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgcHJlZml4ICsgJ2FsaWduLScgKyBtZS5hbGlnbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgcHJlZml4ICsgJ2RpcmVjdGlvbi0nICsgbWUuZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWUucGFjaykge1xuICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgcHJlZml4ICsgJ3BhY2stJyArIG1lLnBhY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZS53cmFwKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCBwcmVmaXggKyAnd3JhcC0nICsgbWUud3JhcCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgbmV3IHZhbHVlIGZvciBcImFsaWduXCIgaXMgdmFsaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKi9cbiAgICBiZWZvcmVTZXRBbGlnbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdElucHV0VmFsdWUodmFsdWUsIG9sZFZhbHVlLCAnYWxpZ25WYWx1ZXMnLCAnYWxpZ24nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIG5ldyB2YWx1ZSBmb3IgXCJkaXJlY3Rpb25cIiBpcyB2YWxpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqL1xuICAgIGJlZm9yZVNldERpcmVjdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdElucHV0VmFsdWUodmFsdWUsIG9sZFZhbHVlLCAnZGlyZWN0aW9uVmFsdWVzJywgJ2RpcmVjdGlvbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgbmV3IHZhbHVlIGZvciBcInBhY2tcIiBpcyB2YWxpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqL1xuICAgIGJlZm9yZVNldFBhY2sodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RJbnB1dFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgJ3BhY2tWYWx1ZXMnLCAncGFjaycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgbmV3IHZhbHVlIGZvciBcIndyYXBcIiBpcyB2YWxpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGJlZm9yZVNldFdyYXAodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RJbnB1dFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgJ3dyYXBWYWx1ZXMnLCAnd3JhcCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIENTUyBydWxlcyBmcm9tIGFuIGNvbnRhaW5lciBpdGVtIHRoaXMgbGF5b3V0IGlzIGJvdW5kIHRvLlxuICAgICAqIEdldHMgY2FsbGVkIHdoZW4gc3dpdGNoaW5nIHRvIGEgZGlmZmVyZW50IGxheW91dC5cbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gaXRlbVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZW1vdmVDaGlsZEF0dHJpYnV0ZXMoaXRlbSkge1xuICAgICAgICBsZXQgc3R5bGUgPSBpdGVtLndyYXBwZXJTdHlsZSB8fCB7fTtcblxuICAgICAgICBzdHlsZS5mbGV4ID0gaXRlbS5mbGV4IHx8IG51bGw7XG4gICAgICAgIGl0ZW0ud3JhcHBlclN0eWxlID0gc3R5bGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgQ1NTIHJ1bGVzIGZyb20gdGhlIGNvbnRhaW5lciB0aGlzIGxheW91dCBpcyBib3VuZCB0by5cbiAgICAgKiBHZXRzIGNhbGxlZCB3aGVuIHN3aXRjaGluZyB0byBhIGRpZmZlcmVudCBsYXlvdXQuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlbW92ZVJlbmRlckF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyID0gTmVvLmdldENvbXBvbmVudChtZS5jb250YWluZXJJZCksXG4gICAgICAgICAgICBwcmVmaXggICAgPSBtZS5wcmVmaXgsXG4gICAgICAgICAgICBjbHMgICAgICAgPSBjb250YWluZXIgJiYgY29udGFpbmVyLmNscztcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgTmVvLmxvZ0Vycm9yKCdsYXlvdXQuRmxleGJveDogcmVtb3ZlUmVuZGVyQXR0cmlidXRlcyAtPiBjb250YWluZXIgbm90IHlldCBjcmVhdGVkJywgbWUuY29udGFpbmVySWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgcHJlZml4ICsgJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGlmIChtZS5hbGlnbikge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgcHJlZml4ICsgJ2FsaWduLScgKyBtZS5hbGlnbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgcHJlZml4ICsgJ2RpcmVjdGlvbi0nICsgbWUuZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWUucGFjaykge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgcHJlZml4ICsgJ3BhY2stJyArIG1lLnBhY2spO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtZS53cmFwKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBwcmVmaXggKyAnd3JhcC0nICsgbWUud3JhcCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgbmV3IHZhbHVlIGZvciBwcm9wZXJ0eU5hbWUgaXMgdmFsaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbGlkVmFsdWVzTmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqL1xuICAgIHRlc3RJbnB1dFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgdmFsaWRWYWx1ZXNOYW1lLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgY29uc3QgdmFsaWRWYWx1ZXMgPSB0aGlzLmdldFN0YXRpY0NvbmZpZyh2YWxpZFZhbHVlc05hbWUpO1xuXG4gICAgICAgIGlmICghTmVvQXJyYXkuaGFzSXRlbSh2YWxpZFZhbHVlcywgdmFsdWUpKSB7XG4gICAgICAgICAgICBOZW8ubG9nRXJyb3IodGhpcy5jb250YWluZXJJZCwgJy0+IGxheW91dDogc3VwcG9ydGVkIHZhbHVlcyBmb3IgXCInICsgcHJvcGVydHlOYW1lICsgJ1wiIGFyZScgLCB2YWxpZFZhbHVlcyk7XG4gICAgICAgICAgICByZXR1cm4gb2xkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ29udGFpbmVyIENTUyBjbHNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IG9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB1cGRhdGVJbnB1dFZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyID0gTmVvLmdldENvbXBvbmVudChtZS5jb250YWluZXJJZCksXG4gICAgICAgICAgICBwcmVmaXggICAgPSBtZS5wcmVmaXgsXG4gICAgICAgICAgICBjbHMgICAgICAgPSBjb250YWluZXIgJiYgY29udGFpbmVyLmNscztcblxuICAgICAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5yZW5kZXJlZCkge1xuICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGNscywgcHJlZml4ICsgcHJvcGVydHlOYW1lICsgJy0nICsgb2xkVmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCBwcmVmaXggKyBwcm9wZXJ0eU5hbWUgKyAnLScgKyB2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5jbHMgPSBjbHM7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKEZsZXhib3gpO1xuXG5leHBvcnQge0ZsZXhib3ggYXMgZGVmYXVsdH07IiwiaW1wb3J0IEZsZXhib3ggZnJvbSAnLi9GbGV4Ym94Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5sYXlvdXQuSEJveFxuICogQGV4dGVuZHMgTmVvLmxheW91dC5GbGV4Ym94XG4gKi9cbmNsYXNzIEhCb3ggZXh0ZW5kcyBGbGV4Ym94IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmxheW91dC5IQm94J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubGF5b3V0LkhCb3gnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbGF5b3V0LWhib3gnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGF5b3V0LWhib3gnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkaXJlY3Rpb249J3JvdydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZGlyZWN0aW9uOiAncm93J1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBmbGV4IHZhbHVlIHRvIGFuIGl0ZW0gb2YgdGhlIGNvbnRhaW5lciB0aGlzIGxheW91dCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICovXG4gICAgYXBwbHlDaGlsZEF0dHJpYnV0ZXMoaXRlbSkge1xuICAgICAgICAvLyBEbyBub3QgYXBwbHkgZmxleCBpZiBmaXhlZCB3aWR0aFxuICAgICAgICBpZiAoIWl0ZW0ud2lkdGgpIHtcbiAgICAgICAgICAgIHN1cGVyLmFwcGx5Q2hpbGRBdHRyaWJ1dGVzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhIQm94KTtcblxuZXhwb3J0IHtIQm94IGFzIGRlZmF1bHR9OyIsImltcG9ydCBGbGV4Ym94IGZyb20gJy4vRmxleGJveC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8ubGF5b3V0LlZCb3hcbiAqIEBleHRlbmRzIE5lby5sYXlvdXQuRmxleGJveFxuICovXG5jbGFzcyBWQm94IGV4dGVuZHMgRmxleGJveCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5sYXlvdXQuVkJveCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmxheW91dC5WQm94JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xheW91dC12Ym94J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2xheW91dC12Ym94JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gZGlyZWN0aW9uPSdjb2x1bW4nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRpcmVjdGlvbjogJ2NvbHVtbidcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgZmxleCB2YWx1ZSB0byBhbiBpdGVtIG9mIHRoZSBjb250YWluZXIgdGhpcyBsYXlvdXQgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbVxuICAgICAqL1xuICAgIGFwcGx5Q2hpbGRBdHRyaWJ1dGVzKGl0ZW0pIHtcbiAgICAgICAgLy8gRG8gbm90IGFwcGx5IGZsZXggaWYgZml4ZWQgaGVpZ2h0XG4gICAgICAgIGlmICghaXRlbS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHN1cGVyLmFwcGx5Q2hpbGRBdHRyaWJ1dGVzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhWQm94KTtcblxuZXhwb3J0IHtWQm94IGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICAgIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgZnJvbSAnLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi4vY29yZS9PYnNlcnZhYmxlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5zZWxlY3Rpb24uTW9kZWxcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnNlbGVjdGlvbi5Nb2RlbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnNlbGVjdGlvbi5Nb2RlbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdzZWxlY3Rpb24tbW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnc2VsZWN0aW9uLW1vZGVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYWNlaG9sZGVyIGZvciBleHRlbmRlZCBjbGFzc2VzIHRvIGFkZCBhIGN1c3RvbSBjc3MgcnVsZSB0byB0aGlzIG93bmVyIGNvbXBvbmVudFxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gY2xzPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGl0ZW1zPVtdXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gc2VsZWN0ZWRDbHM9J3NlbGVjdGVkJ1xuICAgICAgICAgKi9cbiAgICAgICAgc2VsZWN0ZWRDbHM6ICduZW8tc2VsZWN0ZWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xlU2VsZWN0PXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsbHkgc2F2ZXMgdGhlIHZpZXcgaWQsIGJ1dCB0aGUgZ2V0dGVyIHdpbGwgcmV0dXJuIHRoZSBtYXRjaGluZyBpbnN0YW5jZVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHZpZXdfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdmlld186IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYmVmb3JlIGdldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSB2aWV3IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V9XG4gICAgICovXG4gICAgYmVmb3JlR2V0VmlldygpIHtcbiAgICAgICAgcmV0dXJuIE5lby5nZXRDb21wb25lbnQodGhpcy5fdmlldyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYmVmb3JlIHNldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSB2aWV3IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSB2aWV3IGlkXG4gICAgICovXG4gICAgYmVmb3JlU2V0Vmlldyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGREb21MaXN0ZW5lcigpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbc2lsZW50XSB0cnVlIHRvIHByZXZlbnQgYSB2ZG9tIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtQ29sbGVjdGlvbl1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdGVkQ2xzXVxuICAgICAqL1xuICAgIGRlc2VsZWN0KGl0ZW0sIHNpbGVudCwgaXRlbUNvbGxlY3Rpb24sIHNlbGVjdGVkQ2xzKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZpZXcgPSBtZS52aWV3LFxuICAgICAgICAgICAgdmRvbSA9IHZpZXcudmRvbSxcbiAgICAgICAgICAgIG5vZGUgPSB2aWV3LmdldFZkb21DaGlsZChpdGVtKSwgLy8gdG9kbzogc3VwcG9ydCBmb3Igbm9kZXMgKHJpZ2h0IG5vdyBsaW1pdGVkIHRvIGlkcylcbiAgICAgICAgICAgIGNscztcblxuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBzZWxlY3RlZENscyB8fCBtZS5zZWxlY3RlZENscyk7XG4gICAgICAgICAgICBub2RlLmNscyA9IGNscztcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShpdGVtQ29sbGVjdGlvbiB8fCBtZS5pdGVtcywgaXRlbSk7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHZpZXcudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudF0gdHJ1ZSB0byBwcmV2ZW50IGEgdmRvbSB1cGRhdGVcbiAgICAgKi9cbiAgICBkZXNlbGVjdEFsbChzaWxlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1zID0gWy4uLm1lLml0ZW1zXSxcbiAgICAgICAgICAgIHZpZXcgID0gbWUudmlldyxcbiAgICAgICAgICAgIHZkb20gID0gdmlldy52ZG9tO1xuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBtZS5kZXNlbGVjdChpdGVtLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmlldy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyKCk7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gdGhpcy5pdGVtc1xuICAgICAqL1xuICAgIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpbiBjYXNlIHRoZXJlIGlzIGEgc2VsZWN0aW9uXG4gICAgICovXG4gICAgaGFzU2VsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaW4gY2FzZSB0aGUgaXRlbSBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZihpZCkgPiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBjb21wb25lbnRcbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBjb21wb25lbnQuY2xzIHx8IFtdO1xuXG4gICAgICAgIGlmIChtZS5jbHMgJiYgIWNscy5pbmNsdWRlcyhtZS5jbHMpKSB7XG4gICAgICAgICAgICBjbHMucHVzaChtZS5jbHMpO1xuICAgICAgICAgICAgY29tcG9uZW50LmNscyA9IGNscztcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZpZXcgPSBjb21wb25lbnQ7XG4gICAgICAgIG1lLmFkZERvbUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmVEb21MaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29tcG9uZW50ICAgID0gbWUudmlldyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IFsuLi5jb21wb25lbnQuZG9tTGlzdGVuZXJzXTtcblxuICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnNjb3BlID09PSBtZSkge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShkb21MaXN0ZW5lcnMsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcG9uZW50LmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE9iamVjdFtdfFN0cmluZ1tdfSBpdGVtc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtQ29sbGVjdGlvbl1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdGVkQ2xzXVxuICAgICAqL1xuICAgIHNlbGVjdChpdGVtcywgaXRlbUNvbGxlY3Rpb24sIHNlbGVjdGVkQ2xzKSB7XG4gICAgICAgIGl0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG5cbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmlldyA9IG1lLnZpZXcsXG4gICAgICAgICAgICB2ZG9tID0gdmlldy52ZG9tLFxuICAgICAgICAgICAgY2xzO1xuXG4gICAgICAgIGlmIChtZS5zaW5nbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIG1lLmRlc2VsZWN0QWxsKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdmlldy5nZXRWZG9tQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgc2VsZWN0ZWRDbHMgfHwgbWUuc2VsZWN0ZWRDbHMpO1xuICAgICAgICAgICAgICAgIG5vZGUuY2xzID0gY2xzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoaXRlbUNvbGxlY3Rpb24gfHwgbWUuaXRlbXMsIGl0ZW1zKTtcblxuICAgICAgICB2aWV3W3ZpZXcuaGFzT3duUHJvcGVydHkoJ3NpbGVudFNlbGVjdCcpICYmIHZpZXcuc2lsZW50U2VsZWN0ID09PSB0cnVlID8gJ192ZG9tJyA6ICd2ZG9tJ10gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgKi9cbiAgICB0b2dnbGVTZWxlY3Rpb24oaXRlbSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICBtZS5kZXNlbGVjdChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgdW5yZWdpc3RlcigpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBtZS52aWV3LmNscyB8fCBbXTtcblxuICAgICAgICBpZiAobWUuY2xzICYmIGNscy5pbmNsdWRlcyhtZS5jbHMpKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBtZS5jbHMpO1xuICAgICAgICAgICAgbWUudmlldy5jbHMgPSBjbHM7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIG1lLnJlbW92ZURvbUxpc3RlbmVycygpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTW9kZWwpO1xuXG5leHBvcnQge01vZGVsIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8udXRpbC5DbGFzc1N5c3RlbVxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBDbGFzc1N5c3RlbSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udXRpbC5DbGFzc1N5c3RlbSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnV0aWwuQ2xhc3NTeXN0ZW0nXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIGNhbiBnZXQgdXNlZCBpbnNpZGUgYmVmb3JlU2V0IG1ldGhvZHMgaW4gY2FzZSB5b3Ugd2FudCB0byBjcmVhdGUgaW5zdGFuY2VzIGxpa2Ugc3RvcmVzXG4gICAgICogQHBhcmFtIHtPYmplY3R8TmVvLmNvcmUuQmFzZXxudWxsfSBjb25maWdcbiAgICAgKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IFtEZWZhdWx0Q2xhc3M9bnVsbF1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2RlZmF1bHRWYWx1ZXM9e31dXG4gICAgICogQHJldHVybnMge05lby5jb3JlLkJhc2V9IGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGJlZm9yZVNldEluc3RhbmNlKGNvbmZpZywgRGVmYXVsdENsYXNzPW51bGwsIGRlZmF1bHRWYWx1ZXM9e30pIHtcbiAgICAgICAgaWYgKCFjb25maWcgJiYgRGVmYXVsdENsYXNzKSB7XG4gICAgICAgICAgICBjb25maWcgPSBOZW8uY3JlYXRlKERlZmF1bHRDbGFzcywgZGVmYXVsdFZhbHVlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnICYmIGNvbmZpZy5pc0NsYXNzKSB7XG4gICAgICAgICAgICBjb25maWcgPSBOZW8uY3JlYXRlKGNvbmZpZywgZGVmYXVsdFZhbHVlcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoTmVvLmlzT2JqZWN0KGNvbmZpZykgJiYgIShjb25maWcgaW5zdGFuY2VvZiBOZW8uY29yZS5CYXNlKSkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5udHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IE5lby5udHlwZSh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmRlZmF1bHRWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDb25maWcgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChEZWZhdWx0Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29uZmlnLm1vZHVsZSA9IERlZmF1bHRDbGFzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5ld0NvbmZpZywge1xuICAgICAgICAgICAgICAgICAgICAuLi5kZWZhdWx0VmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAuLi5jb25maWdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbmZpZyA9IE5lby5jcmVhdGUobmV3Q29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhDbGFzc1N5c3RlbSk7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzU3lzdGVtOyIsImltcG9ydCBCYXNlICAgICAgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgIGZyb20gJy4uL3V0aWwvQXJyYXkubWpzJztcbmltcG9ydCBOZW9PYmplY3QgZnJvbSAnLi4vdXRpbC9PYmplY3QubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLnV0aWwuS2V5TmF2aWdhdGlvblxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBLZXlOYXZpZ2F0aW9uIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby51dGlsLktleU5hdmlnYXRpb24nXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby51dGlsLktleU5hdmlnYXRpb24nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0na2V5bmF2J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ2tleW5hdicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbGx5IHN0b3JlcyB0aGUgY29tcG9uZW50IGlkIGluc2lkZSBfY29tcG9uZW50XG4gICAgICAgICAqIEBtZW1iZXIge05lby5jb21wb25lbnQuQmFzZXxudWxsfSBjb21wb25lbnRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhpcyB0byB0cnVlIGluIGNhc2UgdGhlIGtleWRvd24gZXZlbnQgaXMgc3VwcG9zZWQgdG8gYnViYmxlIHVwd2FyZHMgaW5zaWRlIHRoZSBjb21wb25lbnQgdHJlZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBrZXlEb3duRXZlbnRCdWJibGU9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGtleURvd25FdmVudEJ1YmJsZTogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSBrZXlzXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBrZXlzXzogbnVsbFxuICAgIH19XG5cbiAgICBhZGQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fa2V5cy5wdXNoKC4uLnRoaXMucGFyc2VLZXlzKHZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge05lby5jb21wb25lbnQuQmFzZX1cbiAgICAgKi9cbiAgICBiZWZvcmVHZXRDb21wb25lbnQoKSB7XG4gICAgICAgIHJldHVybiBOZW8uZ2V0Q29tcG9uZW50KHRoaXMuX2NvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gdmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdGhlIGNvbXBvbmVudCBpZFxuICAgICAqL1xuICAgIGJlZm9yZVNldENvbXBvbmVudCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVucmVnaXN0ZXIoKTtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbktleURvd24oZGF0YSkge1xuICAgICAgICAvLyBVc2luZyB0aGUgY2hyb21lIGF1dG8tZmlsbCBmZWF0dXJlIGRvZXMgdHJpZ2dlciBhIGtleWRvd24gZXZlbnQsIG5vdCBjb250YWluaW5nIGEga2V5LiBTZWU6ICM2NFxuICAgICAgICBpZiAoZGF0YS5rZXkpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHVwcGVyQ2FzZUtleSA9IGRhdGEua2V5LnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgc2NvcGU7XG5cbiAgICAgICAgICAgIHVwcGVyQ2FzZUtleSA9IG1lLnBhcnNlVXBwZXJDYXNlS2V5KHVwcGVyQ2FzZUtleSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdLZXlOYXZpZ2F0aW9uIG9uS2V5RG93bicsIHVwcGVyQ2FzZUtleSwgZGF0YSwgbWUua2V5cyk7XG5cbiAgICAgICAgICAgIG1lLmtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHNjb3BlID0gTmVvLmdldChrZXkuc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleS5rZXkudG9VcHBlckNhc2UoKSA9PT0gdXBwZXJDYXNlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29wZVtrZXkuZm5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZVtrZXkuZm5dLmFwcGx5KHNjb3BlLCBbZGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgcGFyc2VLZXlzKHZhbHVlKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRJZCA9IHRoaXMuX2NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBrZXlBcnJheSAgICA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyh2YWx1ZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGtleUFycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4gICA6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ICA6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBjb21wb25lbnRJZCAvLyB0b2RvOiBzdXBwb3J0IFZDcyBsYXRlciBvblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBrZXlBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBzcGVjaWZpYyBrZXkgbmFtZXMsIGUuZy4gXCIgXCIgPT4gU1BBQ0VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgcGFyc2VVcHBlckNhc2VLZXkoa2V5KSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICBrZXkgPSAnU1BBQ0UnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQVJST1dET1dOJzpcbiAgICAgICAgICAgICAgICBrZXkgPSAnRE9XTic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBUlJPV0xFRlQnOlxuICAgICAgICAgICAgICAgIGtleSA9ICdMRUZUJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0FSUk9XUklHSFQnOlxuICAgICAgICAgICAgICAgIGtleSA9ICdSSUdIVCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBUlJPV1VQJzpcbiAgICAgICAgICAgICAgICBrZXkgPSAnVVAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBjb21wb25lbnRcbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBjb21wb25lbnQuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIG1lLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgbWUua2V5cyAgICAgID0gbWUucGFyc2VLZXlzKG1lLmtleXMpO1xuXG4gICAgICAgIGlmIChkb21MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXlkb3duOiB7XG4gICAgICAgICAgICAgICAgICAgIGZuICAgIDogbWUub25LZXlEb3duLFxuICAgICAgICAgICAgICAgICAgICBidWJibGU6IG1lLmtleURvd25FdmVudEJ1YmJsZSxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEga2V5IGxpc3RlbmVyIHVzaW5nIHRoZSBzYW1lIGNvbmZpZyB1c2VkIHdoZW4gY3JlYXRpbmcgaXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgcmVtb3ZlS2V5KGNvbmZpZykge1xuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBrZXlzID0gbWUuX2tleXMsXG4gICAgICAgICAgICBpICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgICAgIGtleTtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoTmVvT2JqZWN0LmlzRXF1YWwoa2V5LCBjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKGtleXMsIGtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgbXVsdGlwbGUga2V5IGxpc3RlbmVycyBwYXNzaW5nIGFuIGFycmF5IG9mIGNvbmZpZyBpdGVtc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gICAgICovXG4gICAgcmVtb3ZlS2V5cyhpdGVtcykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB0aGlzLnJlbW92ZUtleShpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIoKSB7XG4gICAgICAgIC8vIHRvZG86IHJlbW92ZSB0aGUgZG9tIGxpc3RlbmVyIGZyb20gdGhlIG93bmVyIGNvbXBvbmVudFxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoS2V5TmF2aWdhdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IEtleU5hdmlnYXRpb247IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby51dGlsLk9iamVjdFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBOZW9PYmplY3QgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnV0aWwuT2JqZWN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udXRpbC5PYmplY3QnXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhbGwgcHJvcGVydGllcyBvZiB4IG1hdGNoIHdpdGggdGhlIHByb3BlcnRpZXMgb2YgeVxuICAgICAqIFN1cHBvcnRzIG5lc3RlZCBPYmplY3RzLCBidXQgbm90IGFycmF5cyBhcyBwcm9wIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB4XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHlcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNFcXVhbCh4LCB5KSB7XG4gICAgICAgIHJldHVybiAoTmVvLmlzT2JqZWN0KHgpICYmIE5lby5pc09iamVjdCh5KSkgP1xuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMoeSkubGVuZ3RoKSAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHgpLnJlZHVjZShmdW5jdGlvbihpc0VxdWFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzRXF1YWwgJiYgTmVvT2JqZWN0LmlzRXF1YWwoeFtrZXldLCB5W2tleV0pO1xuICAgICAgICAgICAgICAgIH0sIHRydWVcbiAgICAgICAgICAgICkgOiAoeCA9PT0geSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhOZW9PYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBOZW9PYmplY3Q7IiwiaW1wb3J0IEJhc2UgZnJvbSAnLi4vY29yZS9CYXNlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby51dGlsLlN0eWxlXG4gKiBAZXh0ZW5kcyBOZW8uY29yZS5CYXNlXG4gKi9cbmNsYXNzIFN0eWxlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby51dGlsLlN0eWxlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udXRpbC5TdHlsZSdcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBkZWx0YSBvYmplY3QsIGNvbnRhaW5pbmcgdGhlIHN0eWxlcyBvZiBuZXdTdHlsZSB3aGljaCBhcmUgbm90IGluY2x1ZGVkIG9yIGRpZmZlcmVudCB0aGFuIGluIG9sZFN0eWxlXG4gICAgICogU3R5bGVzIGluY2x1ZGVkIGluIG9sZFN0eWxlIGJ1dCBtaXNzaW5nIGluIG5ld1N0eWxlIHdpbGwgZ2V0IGEgdmFsdWUgb2YgbnVsbFxuICAgICAqIHNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L3N0eWxlXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBuZXdTdHlsZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gb2xkU3R5bGVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdHlsZSBkZWx0YVxuICAgICAqL1xuICAgIHN0YXRpYyBjb21wYXJlU3R5bGVzKG5ld1N0eWxlLCBvbGRTdHlsZSkge1xuICAgICAgICBsZXQgc3R5bGVzID0ge307XG5cbiAgICAgICAgaWYgKE5lby5pc1N0cmluZyhuZXdTdHlsZSkpIHtcbiAgICAgICAgICAgIG5ld1N0eWxlID0gTmVvLmNvcmUuVXRpbC5jcmVhdGVTdHlsZU9iamVjdChuZXdTdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKG9sZFN0eWxlKSkge1xuICAgICAgICAgICAgb2xkU3R5bGUgPSBOZW8uY29yZS5VdGlsLmNyZWF0ZVN0eWxlT2JqZWN0KG9sZFN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmV3U3R5bGUgJiYgIW9sZFN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICghb2xkU3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBOZW8uY2xvbmUobmV3U3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCFuZXdTdHlsZSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob2xkU3R5bGUpLmZvckVhY2goZnVuY3Rpb24oc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbc3R5bGVdID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3U3R5bGUpLmZvckVhY2goZnVuY3Rpb24oc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9sZFN0eWxlLmhhc093blByb3BlcnR5KHN0eWxlKSB8fCBvbGRTdHlsZVtzdHlsZV0gIT09IG5ld1N0eWxlW3N0eWxlXSkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZXNbc3R5bGVdID0gbmV3U3R5bGVbc3R5bGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvbGRTdHlsZSkuZm9yRWFjaChmdW5jdGlvbihzdHlsZSkge1xuICAgICAgICAgICAgICAgIGlmICghbmV3U3R5bGUuaGFzT3duUHJvcGVydHkoc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlc1tzdHlsZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3R5bGVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFN0eWxlKTtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGU7Il0sInNvdXJjZVJvb3QiOiIifQ==