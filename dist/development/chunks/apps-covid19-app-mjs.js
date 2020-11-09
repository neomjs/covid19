self["webpackChunk"](["chunks/apps-covid19-app-mjs"],{

/***/ "./apps/covid19/app.mjs":
/*!******************************!*\
  !*** ./apps/covid19/app.mjs ***!
  \******************************/
/*! exports provided: onStart */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStart", function() { return onStart; });
/* harmony import */ var _view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/MainContainer.mjs */ "./apps/covid19/view/MainContainer.mjs");


const onStart = () => Neo.app({
    appPath : 'apps/covid19/',
    mainView: _view_MainContainer_mjs__WEBPACK_IMPORTED_MODULE_0__["default"],
    name    : 'Covid19'
});



/***/ }),

/***/ "./apps/covid19/model/Country.mjs":
/*!****************************************!*\
  !*** ./apps/covid19/model/Country.mjs ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Country; });
/* harmony import */ var _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");


/**
 * @class Covid19.model.Country
 * @extends Neo.data.Model
 */
class Country extends _node_modules_neo_mjs_src_data_Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        className: 'Covid19.model.Country',

        fields: [{
            name: 'cases',
            type: 'int'
        }, {
            name: 'country',
            type: 'string'
        }, {
            name: 'critical',
            type: 'int'
        }, {
            name: 'deaths',
            type: 'int'
        }, {
            name: 'recovered',
            type: 'int'
        }, {
            name: 'todayCases',
            type: 'int'
        }, {
            name: 'todayDeaths',
            type: 'int'
        }]
    }}
}

Neo.applyClassConfig(Country);



/***/ }),

/***/ "./apps/covid19/store/Countries.mjs":
/*!******************************************!*\
  !*** ./apps/covid19/store/Countries.mjs ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Countries; });
/* harmony import */ var _model_Country_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Country.mjs */ "./apps/covid19/model/Country.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");



/**
 * @class Covid19.store.Countries
 * @extends Neo.data.Store
 */
class Countries extends _node_modules_neo_mjs_src_data_Store_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        className: 'Covid19.store.Countries',

        keyProperty: 'country',
        model      : _model_Country_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
    }}
}

Neo.applyClassConfig(Countries);



/***/ }),

/***/ "./apps/covid19/view/CountryGallery.mjs":
/*!**********************************************!*\
  !*** ./apps/covid19/view/CountryGallery.mjs ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CountryGallery; });
/* harmony import */ var _store_Countries_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/Countries.mjs */ "./apps/covid19/store/Countries.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_component_Gallery_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/component/Gallery.mjs */ "./node_modules/neo.mjs/src/component/Gallery.mjs");



/**
 * @class Covid19.view.CountryGallery
 * @extends Neo.component.Gallery
 */
class CountryGallery extends _node_modules_neo_mjs_src_component_Gallery_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getStaticConfig() {return {
        /**
         * A regex to replace blank chars
         * @member {RegExp} flagRegEx=/ /gi
         * @private
         * @static
         */
        flagRegEx: / /gi
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Covid19.view.CountryGallery'
         * @private
         */
        className: 'Covid19.view.CountryGallery',
        /**
         * @member {String[]} cls=['neo-country-gallery', 'neo-gallery', 'page', 'view']
         */
        cls: ['neo-country-gallery', 'neo-gallery', 'page', 'view'],
        /**
         * The image height of the gallery
         * @member {Number} imageHeight=240
         */
        imageHeight: 280,
        /**
         * The image width of the gallery
         * @member {Number} imageWidth=320
         */
        imageWidth: 340,
        /**
         * @member {Object} itemTpl_
         */
        itemTpl: {
            cls     : ['neo-gallery-item', 'image-wrap', 'view', 'neo-transition-1000'],
            tabIndex: '-1',
            cn: [{
                cls  : ['neo-item-wrapper'],
                style: {},
                cn: [{
                    tag  : 'div',
                    cls  : ['neo-country-gallery-item'],
                    style: {},

                    cn: [{
                        cls: ['neo-item-header'],
                        cn: [{
                            tag: 'img',
                            cls: ['neo-flag']
                        }, {

                        }]
                    }, {
                        tag: 'table',
                        cls: ['neo-content-table'],
                        cn : [{
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Cases'},
                                {tag: 'td', cls: ['neo-align-right']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Cases today'},
                                {tag: 'td', cls: ['neo-align-right']}
                            ]
                        }, {
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Deaths'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-deaths']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Deaths today'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-deaths']}
                            ]
                        }, {
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Recovered'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-recovered']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Critical'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-critical']}
                            ]
                        }]
                    }]
                }]
            }]
        },
        /**
         * The unique record field containing the id.
         * @member {String} keyProperty='id'
         */
        keyProperty: 'country',
        /**
         * True to select the item inside the middle of the store items on mount
         * @member {Boolean} selectOnMount=false
         */
        selectOnMount: false,
        /**
         * @member {Neo.data.Store} store=CountryStore
         */
        store: _store_Countries_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]
    }}

    /**
     * Override this method to get different item-markups
     * @param {Object} vdomItem
     * @param {Object} record
     * @param {Number} index
     * @returns {Object} vdomItem
     */
    createItem(vdomItem, record, index) {
        let me         = this,
            firstChild = vdomItem.cn[0].cn[0],
            table      = firstChild.cn[1];

        vdomItem.id = me.getItemVnodeId(record[me.keyProperty]);

        vdomItem.cn[0].style.height = me.imageHeight + 'px';

        firstChild.style.height = (me.imageHeight - 70) + 'px';
        firstChild.style.width  = me.imageWidth  + 'px';

        firstChild.cn[0].cn[0].src  = me.getCountryFlagUrl(record.country);
        firstChild.cn[0].cn[1].html = record.country;

        table.cn[0].cn[1].html = record.cases;
        table.cn[1].cn[1].html = record.deaths;
        table.cn[2].cn[1].html = record.recovered;

        table.cn[0].cn[4].html = record.todayCases;
        table.cn[1].cn[4].html = record.todayDeaths;
        table.cn[2].cn[4].html = record.critical;

        return vdomItem;
    }

    /**
     *
     * @param {String} name
     * @return {String} url
     */
    getCountryFlagUrl(name) {
        const map = {
            'bosnia'                               : 'bosnia-and-herzegovina',
            'cabo-verde'                           : 'cape-verde',
            'car'                                  : 'central-african-republic',
            'caribbean-netherlands'                : 'netherlands',
            'channel-islands'                      : 'jersey',
            'côte-d\'ivoire'                       : 'ivory-coast',
            'congo'                                : 'republic-of-the-congo',
            'congo,-the-democratic-republic-of-the': 'democratic-republic-of-congo',
            'curaçao'                              : 'curacao',
            'czechia'                              : 'czech-republic',
            'diamond-princess'                     : 'japan', // cruise ship
            'drc'                                  : 'democratic-republic-of-congo',
            'el-salvador'                          : 'salvador',
            'eswatini'                             : 'swaziland',
            'faeroe-islands'                       : 'faroe-islands',
            'falkland-islands-(malvinas)'          : 'falkland-islands',
            'french-guiana'                        : 'france', // ?
            'guadeloupe'                           : 'france', // ?
            'holy-see-(vatican-city-state)'        : 'vatican-city',
            'iran,-islamic-republic-of'            : 'iran',
            'lao-people\'s-democratic-republic'    : 'laos',
            'libyan-arab-jamahiriya'               : 'libya',
            'macedonia'                            : 'republic-of-macedonia',
            'marshall-islands'                     : 'marshall-island',
            'mayotte'                              : 'france', // ?
            'moldova,-republic-of'                 : 'moldova',
            'ms-zaandam'                           : 'netherlands', // cruise ship
            'new-caledonia'                        : 'france',
            'palestinian-territory,-occupied'      : 'palestine',
            'poland'                               : 'republic-of-poland',
            'réunion'                              : 'france',
            's.-korea'                             : 'south-korea',
            'st.-barth'                            : 'st-barts',
            'saint-lucia'                          : 'st-lucia',
            'saint-martin'                         : 'sint-maarten',
            'saint-pierre-miquelon'                : 'france',
            'saint-vincent-and-the-grenadines'     : 'st-vincent-and-the-grenadines',
            'syrian-arab-republic'                 : 'syria',
            'tanzania,-united-republic-of'         : 'tanzania',
            'timor-leste'                          : 'east-timor',
            'turks-and-caicos-islands'             : 'turks-and-caicos',
            'u.s.-virgin-islands'                  : 'virgin-islands',
            'uae'                                  : 'united-arab-emirates',
            'uk'                                   : 'united-kingdom',
            'usa'                                  : 'united-states-of-america',
            'uzbekistan'                           : 'uzbekistn',
            'venezuela,-bolivarian-republic-of'    : 'venezuela',
            'viet-nam'                             : 'vietnam',
            'wallis-and-futuna'                    : 'france'
        };

        let imageName = name.toLowerCase().replace(CountryGallery.flagRegEx, '-');

        imageName = map[imageName] || imageName;

        if (Neo.config.isGitHubPages) {
            let path = '../../../../resources/images/flaticon/country_flags/png/' + imageName + '.png';

            if (!Neo.config.isExperimental) {
                path = '../../' + path;
            }

            return path;
        }

        return 'https://raw.githubusercontent.com/neomjs/pages/master/resources/images/flaticon/country_flags/png/' + imageName + '.png';
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {String} itemId
     */
    getItemId(vnodeId) {
        return vnodeId.split('__')[1];
    }

    /**
     *
     * @param {Array} items
     */
    onStoreLoad(items) {
        super.onStoreLoad(items);

        setTimeout(() => {
            this.selectOnMount = true;
            this.afterSetMounted(true, false);
        }, Neo.config.environment === 'development' ? 200 : 500);
    }
}

Neo.applyClassConfig(CountryGallery);



/***/ }),

/***/ "./apps/covid19/view/MainContainer.mjs":
/*!*********************************************!*\
  !*** ./apps/covid19/view/MainContainer.mjs ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainContainer; });
/* harmony import */ var _CountryGallery_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountryGallery.mjs */ "./apps/covid19/view/CountryGallery.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Panel_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Panel.mjs */ "./node_modules/neo.mjs/src/container/Panel.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_form_field_Range_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/form/field/Range.mjs */ "./node_modules/neo.mjs/src/form/field/Range.mjs");
/* harmony import */ var _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/neo.mjs/src/container/Viewport.mjs */ "./node_modules/neo.mjs/src/container/Viewport.mjs");





/**
 * @class Covid19.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends _node_modules_neo_mjs_src_container_Viewport_mjs__WEBPACK_IMPORTED_MODULE_3__["default"] {
    static getConfig() {return {
        className: 'Covid19.view.MainContainer',
        ntype    : 'main-container',

        autoMount: true,
        /**
         * @member {String[]} cls=['neo-gallery-maincontainer', 'neo-viewport']
         */
        cls: ['neo-gallery-maincontainer', 'neo-viewport'],
        /**
         * @member {Neo.component.Gallery|null} gallery=null
         */
        gallery: null,
        /**
         * @member {Object|null} galleryConfig=null
         */
        galleryConfig: null,
        layout: {ntype: 'hbox', align: 'stretch'},

        items: [{
            ntype : 'container',
            flex  : 1,
            layout: 'fit',
            items : []
        }, {
            ntype : 'panel',
            cls   : ['neo-controls-panel', 'neo-panel', 'neo-container'],
            layout: {ntype: 'vbox', align: 'stretch'},
            style : {backgroundColor: '#2b2b2b'},
            width : 260,

            containerConfig: {
                style: {overflowY: 'scroll'}
            },

            itemDefaults: {
                ntype        : 'rangefield',
                flex         : '0 1 auto',
                labelWidth   : '110px',
                style        : {padding: '10px'},
                useInputEvent: true,

                listeners: {
                    change: function(data) {
                        if (this.name === 'opacity') {
                            data.value /= 100;
                        }
                        Neo.get('neo-gallery-1')[this.name] = data.value;
                    }
                }
            },

            headers: [{
                dock: 'top',
                items: [{
                    ntype: 'button',
                    text : 'X',
                    handler: function() {
                        const panel  = this.up('panel'),
                              expand = panel.width === 40;

                        panel.width = expand ? 250 : 40;
                        this.text   = expand ? 'X' : '+';
                    }
                }, {
                    ntype: 'label',
                    text : 'Gallery Controls'
                }]
            }],

            items: [{
                labelText: 'Translate X',
                maxValue : 5000,
                minValue : 0,
                name     : 'translateX',
                value    : 0,
                listeners: {
                    change: function(data) {
                        Neo.get('neo-gallery-1')[this.name] = data.value;
                    },
                    mounted: function(fieldId) {
                        let field = Neo.get(fieldId);

                        Neo.get('neo-gallery-1').on('changeTranslateX', function(value) {
                            value = Math.min(Math.max(value, this.minValue), this.maxValue);
                            this.value = value;
                        }, field);
                    }
                }
            }, {
                labelText: 'Translate Y',
                maxValue : 1500,
                minValue : -1500,
                name     : 'translateY',
                value    : 0
            }, {
                labelText: 'Translate Z',
                maxValue : 550,
                minValue : -4500,
                name     : 'translateZ',
                value    : 0,
                listeners: {
                    change: function(data) {
                        Neo.get('neo-gallery-1')[this.name] = data.value;
                    },
                    mounted: function(fieldId) {
                        let field = Neo.get(fieldId);

                        Neo.get('neo-gallery-1').on('changeTranslateZ', function(value) {
                            value = Math.min(Math.max(value, this.minValue), this.maxValue);
                            this.value = value;
                        }, field);
                    }
                }
            }, {
                labelText: 'Amount Rows',
                maxValue : 15,
                minValue : 1,
                name     : 'amountRows',
                value    : 3
            }, {
                ntype       : 'button',
                text        : 'Order by Row',
                listeners   : {},
                style       : {margin: '20px'},
                domListeners: {
                    click: function() {
                        const gallery    = Neo.get('neo-gallery-1'),
                              orderByRow = !gallery.orderByRow;

                        this.text = orderByRow === true ? 'Order By Column' : 'Order by Row';

                        gallery.orderByRow = orderByRow;
                    }
                }
            }, {
                ntype: 'label',
                text : 'Sort By:'
            }, {
                ntype : 'container',
                layout: {ntype: 'hbox', align: 'stretch'},
                style : {padding: '0'},
                items : [{
                    ntype : 'container',
                    layout: {ntype: 'vbox', align: 'stretch'},
                    items : [{
                        ntype    : 'button',
                        text     : 'Cases',
                        listeners: {},
                        style    : {margin: '10px', marginTop: '0'},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'cases',
                                    direction: 'DESC'
                                }];
                            }
                        }
                    }, {
                        ntype    : 'button',
                        text     : 'Deaths',
                        listeners: {},
                        style    : {margin: '10px', marginBottom: '10px', marginTop: 0},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'deaths',
                                    direction: 'DESC'
                                }];
                            }
                        }
                    }, {
                        ntype    : 'button',
                        text     : 'Country',
                        listeners: {},
                        style    : {margin: '10px', marginTop: 0},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'country',
                                    direction: 'ASC'
                                }];
                            }
                        }
                    }]
                }, {
                    ntype : 'container',
                    layout: {ntype: 'vbox', align: 'stretch'},
                    items : [{
                        ntype    : 'button',
                        text     : 'Cases today',
                        listeners: {},
                        style    : {margin: '10px', marginTop: '0'},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'todayCases',
                                    direction: 'DESC'
                                }];
                            }
                        }
                    }, {
                        ntype    : 'button',
                        text     : 'Deaths today',
                        listeners: {},
                        style    : {margin: '10px', marginBottom: '10px', marginTop: 0},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'todayDeaths',
                                    direction: 'DESC'
                                }];
                            }
                        }
                    }, {
                        ntype    : 'button',
                        text     : 'Critical',
                        listeners: {},
                        style    : {margin: '10px', marginTop: 0},

                        domListeners: {
                            click: function() {
                                Neo.get('neo-gallery-1').store.sorters = [{
                                    property : 'critical',
                                    direction: 'DESC'
                                }];
                            }
                        }
                    }]
                }]
            }, {
                ntype: 'label',
                text : [
                    '<b>Navigation Concept</b>',
                    '<p>You can use the Arrow Keys to walk through the items.</p>'
                ].join(''),

                style: {
                    backgroundColor: '#323232',
                    color          : '#ddd',
                    fontSize       : '13px',
                    margin         : '10px',
                    padding        : '10px',
                    whiteSpace     : 'normal'
                }
            }, {
                ntype: 'label',
                cls  : ['neo-link-color'],
                text : [
                    '<b>Attribution</b>',
                    '<p>App created with <a href="https://github.com/neomjs/neo">neo.mjs</a>.</p>',
                    '<p>Data provided by <a href="https://github.com/disease-sh/API">disease-sh/API</a>.</p>',
                    '<p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.</p>'
                ].join(''),

                style: {
                    backgroundColor: '#323232',
                    color          : '#ddd',
                    fontSize       : '13px',
                    margin         : '10px',
                    padding        : '10px',
                    whiteSpace     : 'normal'
                }
            }]
        }]
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        const me  = this,
              url = 'https://corona.lmao.ninja/v2/countries';

        me.gallery = Neo.create({
            module: _CountryGallery_mjs__WEBPACK_IMPORTED_MODULE_0__["default"],
            id    : 'neo-gallery-1',
            ...me.galleryConfig || {}
        });

        me.items[0].items.push(me.gallery);

        fetch(url)
            .then(response => response.json())
            .then(data => me.addStoreItems(data))
            .catch(err => console.log('Can’t access ' + url, err));
    }

    addStoreItems(data) {
        this.getStore().data = data;

        setTimeout(() => {
            Neo.main.DomAccess.focus({
                id: this.gallery.id
            });
        }, 200);
    }

    /**
     *
     * @returns {Neo.data.Store}
     */
    getStore() {
        return this.items[0].items[0].store;
    }
}

Neo.applyClassConfig(MainContainer);



/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHBzL2NvdmlkMTkvYXBwLm1qcyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NvdmlkMTkvbW9kZWwvQ291bnRyeS5tanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jb3ZpZDE5L3N0b3JlL0NvdW50cmllcy5tanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jb3ZpZDE5L3ZpZXcvQ291bnRyeUdhbGxlcnkubWpzIiwid2VicGFjazovLy8uL2FwcHMvY292aWQxOS92aWV3L01haW5Db250YWluZXIubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBcUQ7O0FBRXJEO0FBQ0E7QUFDQSxjQUFjLCtEQUFhO0FBQzNCO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNORDtBQUFBO0FBQUE7QUFBc0U7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdGQUFLO0FBQzNCLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFBQTtBQUFBO0FBQUE7QUFBMkM7QUFDNEI7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdGQUFLO0FBQzdCLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBLHFCQUFxQiwwREFBTztBQUM1QjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUFBO0FBQUE7QUFBQTtBQUFrRDtBQUNpQzs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsdUZBQU87QUFDcEMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7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QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEM7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImNodW5rcy9hcHBzLWNvdmlkMTktYXBwLW1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vdmlldy9NYWluQ29udGFpbmVyLm1qcyc7XG5cbmNvbnN0IG9uU3RhcnQgPSAoKSA9PiBOZW8uYXBwKHtcbiAgICBhcHBQYXRoIDogJ2FwcHMvY292aWQxOS8nLFxuICAgIG1haW5WaWV3OiBNYWluQ29udGFpbmVyLFxuICAgIG5hbWUgICAgOiAnQ292aWQxOSdcbn0pO1xuXG5leHBvcnQge29uU3RhcnQgYXMgb25TdGFydH07IiwiaW1wb3J0IE1vZGVsICBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9Nb2RlbC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb3ZpZDE5Lm1vZGVsLkNvdW50cnlcbiAqIEBleHRlbmRzIE5lby5kYXRhLk1vZGVsXG4gKi9cbmNsYXNzIENvdW50cnkgZXh0ZW5kcyBNb2RlbCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICBjbGFzc05hbWU6ICdDb3ZpZDE5Lm1vZGVsLkNvdW50cnknLFxuXG4gICAgICAgIGZpZWxkczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdjYXNlcycsXG4gICAgICAgICAgICB0eXBlOiAnaW50J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnY291bnRyeScsXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAnY3JpdGljYWwnLFxuICAgICAgICAgICAgdHlwZTogJ2ludCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogJ2RlYXRocycsXG4gICAgICAgICAgICB0eXBlOiAnaW50J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiAncmVjb3ZlcmVkJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICd0b2RheUNhc2VzJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6ICd0b2RheURlYXRocycsXG4gICAgICAgICAgICB0eXBlOiAnaW50J1xuICAgICAgICB9XVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENvdW50cnkpO1xuXG5leHBvcnQge0NvdW50cnkgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvdW50cnkgZnJvbSAnLi4vbW9kZWwvQ291bnRyeS5tanMnO1xuaW1wb3J0IFN0b3JlICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2RhdGEvU3RvcmUubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgQ292aWQxOS5zdG9yZS5Db3VudHJpZXNcbiAqIEBleHRlbmRzIE5lby5kYXRhLlN0b3JlXG4gKi9cbmNsYXNzIENvdW50cmllcyBleHRlbmRzIFN0b3JlIHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIGNsYXNzTmFtZTogJ0NvdmlkMTkuc3RvcmUuQ291bnRyaWVzJyxcblxuICAgICAgICBrZXlQcm9wZXJ0eTogJ2NvdW50cnknLFxuICAgICAgICBtb2RlbCAgICAgIDogQ291bnRyeVxuICAgIH19XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENvdW50cmllcyk7XG5cbmV4cG9ydCB7Q291bnRyaWVzIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb3VudHJ5U3RvcmUgZnJvbSAnLi4vc3RvcmUvQ291bnRyaWVzLm1qcyc7XG5pbXBvcnQgR2FsbGVyeSAgICAgIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9jb21wb25lbnQvR2FsbGVyeS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb3ZpZDE5LnZpZXcuQ291bnRyeUdhbGxlcnlcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuR2FsbGVyeVxuICovXG5jbGFzcyBDb3VudHJ5R2FsbGVyeSBleHRlbmRzIEdhbGxlcnkge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcmVnZXggdG8gcmVwbGFjZSBibGFuayBjaGFyc1xuICAgICAgICAgKiBAbWVtYmVyIHtSZWdFeHB9IGZsYWdSZWdFeD0vIC9naVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBmbGFnUmVnRXg6IC8gL2dpXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdDb3ZpZDE5LnZpZXcuQ291bnRyeUdhbGxlcnknXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdDb3ZpZDE5LnZpZXcuQ291bnRyeUdhbGxlcnknLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1jb3VudHJ5LWdhbGxlcnknLCAnbmVvLWdhbGxlcnknLCAncGFnZScsICd2aWV3J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tY291bnRyeS1nYWxsZXJ5JywgJ25lby1nYWxsZXJ5JywgJ3BhZ2UnLCAndmlldyddLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGltYWdlIGhlaWdodCBvZiB0aGUgZ2FsbGVyeVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGltYWdlSGVpZ2h0PTI0MFxuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VIZWlnaHQ6IDI4MCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbWFnZSB3aWR0aCBvZiB0aGUgZ2FsbGVyeVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ9IGltYWdlV2lkdGg9MzIwXG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZVdpZHRoOiAzNDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGl0ZW1UcGxfXG4gICAgICAgICAqL1xuICAgICAgICBpdGVtVHBsOiB7XG4gICAgICAgICAgICBjbHMgICAgIDogWyduZW8tZ2FsbGVyeS1pdGVtJywgJ2ltYWdlLXdyYXAnLCAndmlldycsICduZW8tdHJhbnNpdGlvbi0xMDAwJ10sXG4gICAgICAgICAgICB0YWJJbmRleDogJy0xJyxcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIGNscyAgOiBbJ25lby1pdGVtLXdyYXBwZXInXSxcbiAgICAgICAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgICAgICAgY246IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZyAgOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgY2xzICA6IFsnbmVvLWNvdW50cnktZ2FsbGVyeS1pdGVtJ10sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcblxuICAgICAgICAgICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsczogWyduZW8taXRlbS1oZWFkZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1mbGFnJ11cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby1jb250ZW50LXRhYmxlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndGQnLCBodG1sOiAnQ2FzZXMnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgY2xzOiBbJ25lby1hbGlnbi1yaWdodCddfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgc3R5bGU6IHt3aWR0aDogJzEwMCUnfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICd0ZCcsIGh0bWw6ICdDYXNlcyB0b2RheSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndGQnLCBjbHM6IFsnbmVvLWFsaWduLXJpZ2h0J119XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgaHRtbDogJ0RlYXRocyd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndGQnLCBjbHM6IFsnbmVvLWFsaWduLXJpZ2h0JywgJ25lby1jb250ZW50LWRlYXRocyddfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgc3R5bGU6IHt3aWR0aDogJzEwMCUnfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICd0ZCcsIGh0bWw6ICdEZWF0aHMgdG9kYXknfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgY2xzOiBbJ25lby1hbGlnbi1yaWdodCcsICduZW8tY29udGVudC1kZWF0aHMnXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNuIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndGQnLCBodG1sOiAnUmVjb3ZlcmVkJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICd0ZCcsIGNsczogWyduZW8tYWxpZ24tcmlnaHQnLCAnbmVvLWNvbnRlbnQtcmVjb3ZlcmVkJ119LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnOiAndGQnLCBzdHlsZToge3dpZHRoOiAnMTAwJSd9fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZzogJ3RkJywgaHRtbDogJ0NyaXRpY2FsJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0YWc6ICd0ZCcsIGNsczogWyduZW8tYWxpZ24tcmlnaHQnLCAnbmVvLWNvbnRlbnQtY3JpdGljYWwnXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHVuaXF1ZSByZWNvcmQgZmllbGQgY29udGFpbmluZyB0aGUgaWQuXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30ga2V5UHJvcGVydHk9J2lkJ1xuICAgICAgICAgKi9cbiAgICAgICAga2V5UHJvcGVydHk6ICdjb3VudHJ5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgdG8gc2VsZWN0IHRoZSBpdGVtIGluc2lkZSB0aGUgbWlkZGxlIG9mIHRoZSBzdG9yZSBpdGVtcyBvbiBtb3VudFxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzZWxlY3RPbk1vdW50PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzZWxlY3RPbk1vdW50OiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kYXRhLlN0b3JlfSBzdG9yZT1Db3VudHJ5U3RvcmVcbiAgICAgICAgICovXG4gICAgICAgIHN0b3JlOiBDb3VudHJ5U3RvcmVcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gZ2V0IGRpZmZlcmVudCBpdGVtLW1hcmt1cHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmRvbUl0ZW1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbUl0ZW1cbiAgICAgKi9cbiAgICBjcmVhdGVJdGVtKHZkb21JdGVtLCByZWNvcmQsIGluZGV4KSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGZpcnN0Q2hpbGQgPSB2ZG9tSXRlbS5jblswXS5jblswXSxcbiAgICAgICAgICAgIHRhYmxlICAgICAgPSBmaXJzdENoaWxkLmNuWzFdO1xuXG4gICAgICAgIHZkb21JdGVtLmlkID0gbWUuZ2V0SXRlbVZub2RlSWQocmVjb3JkW21lLmtleVByb3BlcnR5XSk7XG5cbiAgICAgICAgdmRvbUl0ZW0uY25bMF0uc3R5bGUuaGVpZ2h0ID0gbWUuaW1hZ2VIZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIGZpcnN0Q2hpbGQuc3R5bGUuaGVpZ2h0ID0gKG1lLmltYWdlSGVpZ2h0IC0gNzApICsgJ3B4JztcbiAgICAgICAgZmlyc3RDaGlsZC5zdHlsZS53aWR0aCAgPSBtZS5pbWFnZVdpZHRoICArICdweCc7XG5cbiAgICAgICAgZmlyc3RDaGlsZC5jblswXS5jblswXS5zcmMgID0gbWUuZ2V0Q291bnRyeUZsYWdVcmwocmVjb3JkLmNvdW50cnkpO1xuICAgICAgICBmaXJzdENoaWxkLmNuWzBdLmNuWzFdLmh0bWwgPSByZWNvcmQuY291bnRyeTtcblxuICAgICAgICB0YWJsZS5jblswXS5jblsxXS5odG1sID0gcmVjb3JkLmNhc2VzO1xuICAgICAgICB0YWJsZS5jblsxXS5jblsxXS5odG1sID0gcmVjb3JkLmRlYXRocztcbiAgICAgICAgdGFibGUuY25bMl0uY25bMV0uaHRtbCA9IHJlY29yZC5yZWNvdmVyZWQ7XG5cbiAgICAgICAgdGFibGUuY25bMF0uY25bNF0uaHRtbCA9IHJlY29yZC50b2RheUNhc2VzO1xuICAgICAgICB0YWJsZS5jblsxXS5jbls0XS5odG1sID0gcmVjb3JkLnRvZGF5RGVhdGhzO1xuICAgICAgICB0YWJsZS5jblsyXS5jbls0XS5odG1sID0gcmVjb3JkLmNyaXRpY2FsO1xuXG4gICAgICAgIHJldHVybiB2ZG9tSXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7U3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICBnZXRDb3VudHJ5RmxhZ1VybChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHtcbiAgICAgICAgICAgICdib3NuaWEnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2Jvc25pYS1hbmQtaGVyemVnb3ZpbmEnLFxuICAgICAgICAgICAgJ2NhYm8tdmVyZGUnICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnY2FwZS12ZXJkZScsXG4gICAgICAgICAgICAnY2FyJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdjZW50cmFsLWFmcmljYW4tcmVwdWJsaWMnLFxuICAgICAgICAgICAgJ2NhcmliYmVhbi1uZXRoZXJsYW5kcycgICAgICAgICAgICAgICAgOiAnbmV0aGVybGFuZHMnLFxuICAgICAgICAgICAgJ2NoYW5uZWwtaXNsYW5kcycgICAgICAgICAgICAgICAgICAgICAgOiAnamVyc2V5JyxcbiAgICAgICAgICAgICdjw7R0ZS1kXFwnaXZvaXJlJyAgICAgICAgICAgICAgICAgICAgICAgOiAnaXZvcnktY29hc3QnLFxuICAgICAgICAgICAgJ2NvbmdvJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAncmVwdWJsaWMtb2YtdGhlLWNvbmdvJyxcbiAgICAgICAgICAgICdjb25nbywtdGhlLWRlbW9jcmF0aWMtcmVwdWJsaWMtb2YtdGhlJzogJ2RlbW9jcmF0aWMtcmVwdWJsaWMtb2YtY29uZ28nLFxuICAgICAgICAgICAgJ2N1cmHDp2FvJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2N1cmFjYW8nLFxuICAgICAgICAgICAgJ2N6ZWNoaWEnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnY3plY2gtcmVwdWJsaWMnLFxuICAgICAgICAgICAgJ2RpYW1vbmQtcHJpbmNlc3MnICAgICAgICAgICAgICAgICAgICAgOiAnamFwYW4nLCAvLyBjcnVpc2Ugc2hpcFxuICAgICAgICAgICAgJ2RyYycgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZGVtb2NyYXRpYy1yZXB1YmxpYy1vZi1jb25nbycsXG4gICAgICAgICAgICAnZWwtc2FsdmFkb3InICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdzYWx2YWRvcicsXG4gICAgICAgICAgICAnZXN3YXRpbmknICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdzd2F6aWxhbmQnLFxuICAgICAgICAgICAgJ2ZhZXJvZS1pc2xhbmRzJyAgICAgICAgICAgICAgICAgICAgICAgOiAnZmFyb2UtaXNsYW5kcycsXG4gICAgICAgICAgICAnZmFsa2xhbmQtaXNsYW5kcy0obWFsdmluYXMpJyAgICAgICAgICA6ICdmYWxrbGFuZC1pc2xhbmRzJyxcbiAgICAgICAgICAgICdmcmVuY2gtZ3VpYW5hJyAgICAgICAgICAgICAgICAgICAgICAgIDogJ2ZyYW5jZScsIC8vID9cbiAgICAgICAgICAgICdndWFkZWxvdXBlJyAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2ZyYW5jZScsIC8vID9cbiAgICAgICAgICAgICdob2x5LXNlZS0odmF0aWNhbi1jaXR5LXN0YXRlKScgICAgICAgIDogJ3ZhdGljYW4tY2l0eScsXG4gICAgICAgICAgICAnaXJhbiwtaXNsYW1pYy1yZXB1YmxpYy1vZicgICAgICAgICAgICA6ICdpcmFuJyxcbiAgICAgICAgICAgICdsYW8tcGVvcGxlXFwncy1kZW1vY3JhdGljLXJlcHVibGljJyAgICA6ICdsYW9zJyxcbiAgICAgICAgICAgICdsaWJ5YW4tYXJhYi1qYW1haGlyaXlhJyAgICAgICAgICAgICAgIDogJ2xpYnlhJyxcbiAgICAgICAgICAgICdtYWNlZG9uaWEnICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3JlcHVibGljLW9mLW1hY2Vkb25pYScsXG4gICAgICAgICAgICAnbWFyc2hhbGwtaXNsYW5kcycgICAgICAgICAgICAgICAgICAgICA6ICdtYXJzaGFsbC1pc2xhbmQnLFxuICAgICAgICAgICAgJ21heW90dGUnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZnJhbmNlJywgLy8gP1xuICAgICAgICAgICAgJ21vbGRvdmEsLXJlcHVibGljLW9mJyAgICAgICAgICAgICAgICAgOiAnbW9sZG92YScsXG4gICAgICAgICAgICAnbXMtemFhbmRhbScgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICduZXRoZXJsYW5kcycsIC8vIGNydWlzZSBzaGlwXG4gICAgICAgICAgICAnbmV3LWNhbGVkb25pYScgICAgICAgICAgICAgICAgICAgICAgICA6ICdmcmFuY2UnLFxuICAgICAgICAgICAgJ3BhbGVzdGluaWFuLXRlcnJpdG9yeSwtb2NjdXBpZWQnICAgICAgOiAncGFsZXN0aW5lJyxcbiAgICAgICAgICAgICdwb2xhbmQnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3JlcHVibGljLW9mLXBvbGFuZCcsXG4gICAgICAgICAgICAncsOpdW5pb24nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZnJhbmNlJyxcbiAgICAgICAgICAgICdzLi1rb3JlYScgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3NvdXRoLWtvcmVhJyxcbiAgICAgICAgICAgICdzdC4tYmFydGgnICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3N0LWJhcnRzJyxcbiAgICAgICAgICAgICdzYWludC1sdWNpYScgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3N0LWx1Y2lhJyxcbiAgICAgICAgICAgICdzYWludC1tYXJ0aW4nICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3NpbnQtbWFhcnRlbicsXG4gICAgICAgICAgICAnc2FpbnQtcGllcnJlLW1pcXVlbG9uJyAgICAgICAgICAgICAgICA6ICdmcmFuY2UnLFxuICAgICAgICAgICAgJ3NhaW50LXZpbmNlbnQtYW5kLXRoZS1ncmVuYWRpbmVzJyAgICAgOiAnc3QtdmluY2VudC1hbmQtdGhlLWdyZW5hZGluZXMnLFxuICAgICAgICAgICAgJ3N5cmlhbi1hcmFiLXJlcHVibGljJyAgICAgICAgICAgICAgICAgOiAnc3lyaWEnLFxuICAgICAgICAgICAgJ3RhbnphbmlhLC11bml0ZWQtcmVwdWJsaWMtb2YnICAgICAgICAgOiAndGFuemFuaWEnLFxuICAgICAgICAgICAgJ3RpbW9yLWxlc3RlJyAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZWFzdC10aW1vcicsXG4gICAgICAgICAgICAndHVya3MtYW5kLWNhaWNvcy1pc2xhbmRzJyAgICAgICAgICAgICA6ICd0dXJrcy1hbmQtY2FpY29zJyxcbiAgICAgICAgICAgICd1LnMuLXZpcmdpbi1pc2xhbmRzJyAgICAgICAgICAgICAgICAgIDogJ3Zpcmdpbi1pc2xhbmRzJyxcbiAgICAgICAgICAgICd1YWUnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3VuaXRlZC1hcmFiLWVtaXJhdGVzJyxcbiAgICAgICAgICAgICd1aycgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3VuaXRlZC1raW5nZG9tJyxcbiAgICAgICAgICAgICd1c2EnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3VuaXRlZC1zdGF0ZXMtb2YtYW1lcmljYScsXG4gICAgICAgICAgICAndXpiZWtpc3RhbicgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd1emJla2lzdG4nLFxuICAgICAgICAgICAgJ3ZlbmV6dWVsYSwtYm9saXZhcmlhbi1yZXB1YmxpYy1vZicgICAgOiAndmVuZXp1ZWxhJyxcbiAgICAgICAgICAgICd2aWV0LW5hbScgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3ZpZXRuYW0nLFxuICAgICAgICAgICAgJ3dhbGxpcy1hbmQtZnV0dW5hJyAgICAgICAgICAgICAgICAgICAgOiAnZnJhbmNlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBpbWFnZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZShDb3VudHJ5R2FsbGVyeS5mbGFnUmVnRXgsICctJyk7XG5cbiAgICAgICAgaW1hZ2VOYW1lID0gbWFwW2ltYWdlTmFtZV0gfHwgaW1hZ2VOYW1lO1xuXG4gICAgICAgIGlmIChOZW8uY29uZmlnLmlzR2l0SHViUGFnZXMpIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy9pbWFnZXMvZmxhdGljb24vY291bnRyeV9mbGFncy9wbmcvJyArIGltYWdlTmFtZSArICcucG5nJztcblxuICAgICAgICAgICAgaWYgKCFOZW8uY29uZmlnLmlzRXhwZXJpbWVudGFsKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9ICcuLi8uLi8nICsgcGF0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9uZW9tanMvcGFnZXMvbWFzdGVyL3Jlc291cmNlcy9pbWFnZXMvZmxhdGljb24vY291bnRyeV9mbGFncy9wbmcvJyArIGltYWdlTmFtZSArICcucG5nJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2bm9kZUlkXG4gICAgICogQHJldHVybnMge1N0cmluZ30gaXRlbUlkXG4gICAgICovXG4gICAgZ2V0SXRlbUlkKHZub2RlSWQpIHtcbiAgICAgICAgcmV0dXJuIHZub2RlSWQuc3BsaXQoJ19fJylbMV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICAgICAqL1xuICAgIG9uU3RvcmVMb2FkKGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyLm9uU3RvcmVMb2FkKGl0ZW1zKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T25Nb3VudCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFmdGVyU2V0TW91bnRlZCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIH0sIE5lby5jb25maWcuZW52aXJvbm1lbnQgPT09ICdkZXZlbG9wbWVudCcgPyAyMDAgOiA1MDApO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQ291bnRyeUdhbGxlcnkpO1xuXG5leHBvcnQge0NvdW50cnlHYWxsZXJ5IGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb3VudHJ5R2FsbGVyeSAgICAgICAgICBmcm9tICcuL0NvdW50cnlHYWxsZXJ5Lm1qcyc7XG5pbXBvcnQge2RlZmF1bHQgYXMgUGFuZWx9ICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9QYW5lbC5tanMnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIFJhbmdlRmllbGR9IGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL1JhbmdlLm1qcyc7XG5pbXBvcnQgVmlld3BvcnQgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2NvbnRhaW5lci9WaWV3cG9ydC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBDb3ZpZDE5LnZpZXcuTWFpbkNvbnRhaW5lclxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5WaWV3cG9ydFxuICovXG5jbGFzcyBNYWluQ29udGFpbmVyIGV4dGVuZHMgVmlld3BvcnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnQ292aWQxOS52aWV3Lk1haW5Db250YWluZXInLFxuICAgICAgICBudHlwZSAgICA6ICdtYWluLWNvbnRhaW5lcicsXG5cbiAgICAgICAgYXV0b01vdW50OiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1nYWxsZXJ5LW1haW5jb250YWluZXInLCAnbmVvLXZpZXdwb3J0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tZ2FsbGVyeS1tYWluY29udGFpbmVyJywgJ25lby12aWV3cG9ydCddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmNvbXBvbmVudC5HYWxsZXJ5fG51bGx9IGdhbGxlcnk9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZ2FsbGVyeTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxudWxsfSBnYWxsZXJ5Q29uZmlnPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGdhbGxlcnlDb25maWc6IG51bGwsXG4gICAgICAgIGxheW91dDoge250eXBlOiAnaGJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuXG4gICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgbnR5cGUgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIGZsZXggIDogMSxcbiAgICAgICAgICAgIGxheW91dDogJ2ZpdCcsXG4gICAgICAgICAgICBpdGVtcyA6IFtdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG50eXBlIDogJ3BhbmVsJyxcbiAgICAgICAgICAgIGNscyAgIDogWyduZW8tY29udHJvbHMtcGFuZWwnLCAnbmVvLXBhbmVsJywgJ25lby1jb250YWluZXInXSxcbiAgICAgICAgICAgIGxheW91dDoge250eXBlOiAndmJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuICAgICAgICAgICAgc3R5bGUgOiB7YmFja2dyb3VuZENvbG9yOiAnIzJiMmIyYid9LFxuICAgICAgICAgICAgd2lkdGggOiAyNjAsXG5cbiAgICAgICAgICAgIGNvbnRhaW5lckNvbmZpZzoge1xuICAgICAgICAgICAgICAgIHN0eWxlOiB7b3ZlcmZsb3dZOiAnc2Nyb2xsJ31cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGl0ZW1EZWZhdWx0czoge1xuICAgICAgICAgICAgICAgIG50eXBlICAgICAgICA6ICdyYW5nZWZpZWxkJyxcbiAgICAgICAgICAgICAgICBmbGV4ICAgICAgICAgOiAnMCAxIGF1dG8nLFxuICAgICAgICAgICAgICAgIGxhYmVsV2lkdGggICA6ICcxMTBweCcsXG4gICAgICAgICAgICAgICAgc3R5bGUgICAgICAgIDoge3BhZGRpbmc6ICcxMHB4J30sXG4gICAgICAgICAgICAgICAgdXNlSW5wdXRFdmVudDogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgPT09ICdvcGFjaXR5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEudmFsdWUgLz0gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgTmVvLmdldCgnbmVvLWdhbGxlcnktMScpW3RoaXMubmFtZV0gPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGVhZGVyczogW3tcbiAgICAgICAgICAgICAgICBkb2NrOiAndG9wJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgbnR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhbmVsICA9IHRoaXMudXAoJ3BhbmVsJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmQgPSBwYW5lbC53aWR0aCA9PT0gNDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsLndpZHRoID0gZXhwYW5kID8gMjUwIDogNDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQgICA9IGV4cGFuZCA/ICdYJyA6ICcrJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHQgOiAnR2FsbGVyeSBDb250cm9scydcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV0sXG5cbiAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgIGxhYmVsVGV4dDogJ1RyYW5zbGF0ZSBYJyxcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA6IDUwMDAsXG4gICAgICAgICAgICAgICAgbWluVmFsdWUgOiAwLFxuICAgICAgICAgICAgICAgIG5hbWUgICAgIDogJ3RyYW5zbGF0ZVgnLFxuICAgICAgICAgICAgICAgIHZhbHVlICAgIDogMCxcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBOZW8uZ2V0KCduZW8tZ2FsbGVyeS0xJylbdGhpcy5uYW1lXSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vdW50ZWQ6IGZ1bmN0aW9uKGZpZWxkSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZCA9IE5lby5nZXQoZmllbGRJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5lby5nZXQoJ25lby1nYWxsZXJ5LTEnKS5vbignY2hhbmdlVHJhbnNsYXRlWCcsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgdGhpcy5taW5WYWx1ZSksIHRoaXMubWF4VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBsYWJlbFRleHQ6ICdUcmFuc2xhdGUgWScsXG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgOiAxNTAwLFxuICAgICAgICAgICAgICAgIG1pblZhbHVlIDogLTE1MDAsXG4gICAgICAgICAgICAgICAgbmFtZSAgICAgOiAndHJhbnNsYXRlWScsXG4gICAgICAgICAgICAgICAgdmFsdWUgICAgOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbGFiZWxUZXh0OiAnVHJhbnNsYXRlIFonLFxuICAgICAgICAgICAgICAgIG1heFZhbHVlIDogNTUwLFxuICAgICAgICAgICAgICAgIG1pblZhbHVlIDogLTQ1MDAsXG4gICAgICAgICAgICAgICAgbmFtZSAgICAgOiAndHJhbnNsYXRlWicsXG4gICAgICAgICAgICAgICAgdmFsdWUgICAgOiAwLFxuICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE5lby5nZXQoJ25lby1nYWxsZXJ5LTEnKVt0aGlzLm5hbWVdID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbW91bnRlZDogZnVuY3Rpb24oZmllbGRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkID0gTmVvLmdldChmaWVsZElkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTmVvLmdldCgnbmVvLWdhbGxlcnktMScpLm9uKCdjaGFuZ2VUcmFuc2xhdGVaJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCB0aGlzLm1pblZhbHVlKSwgdGhpcy5tYXhWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGxhYmVsVGV4dDogJ0Ftb3VudCBSb3dzJyxcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA6IDE1LFxuICAgICAgICAgICAgICAgIG1pblZhbHVlIDogMSxcbiAgICAgICAgICAgICAgICBuYW1lICAgICA6ICdhbW91bnRSb3dzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICA6IDNcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBudHlwZSAgICAgICA6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgIHRleHQgICAgICAgIDogJ09yZGVyIGJ5IFJvdycsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzICAgOiB7fSxcbiAgICAgICAgICAgICAgICBzdHlsZSAgICAgICA6IHttYXJnaW46ICcyMHB4J30sXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbGxlcnkgICAgPSBOZW8uZ2V0KCduZW8tZ2FsbGVyeS0xJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlckJ5Um93ID0gIWdhbGxlcnkub3JkZXJCeVJvdztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gb3JkZXJCeVJvdyA9PT0gdHJ1ZSA/ICdPcmRlciBCeSBDb2x1bW4nIDogJ09yZGVyIGJ5IFJvdyc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbGxlcnkub3JkZXJCeVJvdyA9IG9yZGVyQnlSb3c7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbnR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgdGV4dCA6ICdTb3J0IEJ5OidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBudHlwZSA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgIGxheW91dDoge250eXBlOiAnaGJveCcsIGFsaWduOiAnc3RyZXRjaCd9LFxuICAgICAgICAgICAgICAgIHN0eWxlIDoge3BhZGRpbmc6ICcwJ30sXG4gICAgICAgICAgICAgICAgaXRlbXMgOiBbe1xuICAgICAgICAgICAgICAgICAgICBudHlwZSA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtudHlwZTogJ3Zib3gnLCBhbGlnbjogJ3N0cmV0Y2gnfSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ0Nhc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHttYXJnaW46ICcxMHB4JywgbWFyZ2luVG9wOiAnMCd9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5lby5nZXQoJ25lby1nYWxsZXJ5LTEnKS5zdG9yZS5zb3J0ZXJzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IDogJ2Nhc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ0RFU0MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ0RlYXRocycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgICAgOiB7bWFyZ2luOiAnMTBweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBtYXJnaW5Ub3A6IDB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5lby5nZXQoJ25lby1nYWxsZXJ5LTEnKS5zdG9yZS5zb3J0ZXJzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IDogJ2RlYXRocycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdERVNDJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG50eXBlICAgIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICAgICA6ICdDb3VudHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHttYXJnaW46ICcxMHB4JywgbWFyZ2luVG9wOiAwfSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZW8uZ2V0KCduZW8tZ2FsbGVyeS0xJykuc3RvcmUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA6ICdjb3VudHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ0FTQydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbnR5cGUgOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7bnR5cGU6ICd2Ym94JywgYWxpZ246ICdzdHJldGNoJ30sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG50eXBlICAgIDogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICAgICA6ICdDYXNlcyB0b2RheScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgICAgOiB7bWFyZ2luOiAnMTBweCcsIG1hcmdpblRvcDogJzAnfSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZW8uZ2V0KCduZW8tZ2FsbGVyeS0xJykuc3RvcmUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA6ICd0b2RheUNhc2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ0RFU0MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ0RlYXRocyB0b2RheScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgICAgOiB7bWFyZ2luOiAnMTBweCcsIG1hcmdpbkJvdHRvbTogJzEwcHgnLCBtYXJnaW5Ub3A6IDB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5lby5nZXQoJ25lby1nYWxsZXJ5LTEnKS5zdG9yZS5zb3J0ZXJzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5IDogJ3RvZGF5RGVhdGhzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ0RFU0MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnR5cGUgICAgOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgICAgIDogJ0NyaXRpY2FsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSAgICA6IHttYXJnaW46ICcxMHB4JywgbWFyZ2luVG9wOiAwfSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOZW8uZ2V0KCduZW8tZ2FsbGVyeS0xJykuc3RvcmUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSA6ICdjcml0aWNhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdERVNDJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBudHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICB0ZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAnPGI+TmF2aWdhdGlvbiBDb25jZXB0PC9iPicsXG4gICAgICAgICAgICAgICAgICAgICc8cD5Zb3UgY2FuIHVzZSB0aGUgQXJyb3cgS2V5cyB0byB3YWxrIHRocm91Z2ggdGhlIGl0ZW1zLjwvcD4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcnKSxcblxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzMjMyMzInLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciAgICAgICAgICA6ICcjZGRkJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemUgICAgICAgOiAnMTNweCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbiAgICAgICAgIDogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nICAgICAgICA6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZSAgICAgOiAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBudHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICBjbHMgIDogWyduZW8tbGluay1jb2xvciddLFxuICAgICAgICAgICAgICAgIHRleHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICc8Yj5BdHRyaWJ1dGlvbjwvYj4nLFxuICAgICAgICAgICAgICAgICAgICAnPHA+QXBwIGNyZWF0ZWQgd2l0aCA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL25lb21qcy9uZW9cIj5uZW8ubWpzPC9hPi48L3A+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxwPkRhdGEgcHJvdmlkZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9kaXNlYXNlLXNoL0FQSVwiPmRpc2Vhc2Utc2gvQVBJPC9hPi48L3A+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxwPkljb25zIG1hZGUgYnkgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmZsYXRpY29uLmNvbS9hdXRob3JzL2ZyZWVwaWtcIiB0aXRsZT1cIkZyZWVwaWtcIj5GcmVlcGlrPC9hPiBmcm9tIDxhIGhyZWY9XCJodHRwczovL3d3dy5mbGF0aWNvbi5jb20vXCIgdGl0bGU9XCJGbGF0aWNvblwiPiB3d3cuZmxhdGljb24uY29tPC9hPi48L3A+J1xuICAgICAgICAgICAgICAgIF0uam9pbignJyksXG5cbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMzIzMjMyJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgICAgICAgICAgOiAnI2RkZCcsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplICAgICAgIDogJzEzcHgnLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4gICAgICAgICA6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZyAgICAgICAgOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2UgICAgIDogJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBjb25zdCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly9jb3JvbmEubG1hby5uaW5qYS92Mi9jb3VudHJpZXMnO1xuXG4gICAgICAgIG1lLmdhbGxlcnkgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZTogQ291bnRyeUdhbGxlcnksXG4gICAgICAgICAgICBpZCAgICA6ICduZW8tZ2FsbGVyeS0xJyxcbiAgICAgICAgICAgIC4uLm1lLmdhbGxlcnlDb25maWcgfHwge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuaXRlbXNbMF0uaXRlbXMucHVzaChtZS5nYWxsZXJ5KTtcblxuICAgICAgICBmZXRjaCh1cmwpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IG1lLmFkZFN0b3JlSXRlbXMoZGF0YSkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKCdDYW7igJl0IGFjY2VzcyAnICsgdXJsLCBlcnIpKTtcbiAgICB9XG5cbiAgICBhZGRTdG9yZUl0ZW1zKGRhdGEpIHtcbiAgICAgICAgdGhpcy5nZXRTdG9yZSgpLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgTmVvLm1haW4uRG9tQWNjZXNzLmZvY3VzKHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nYWxsZXJ5LmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOZW8uZGF0YS5TdG9yZX1cbiAgICAgKi9cbiAgICBnZXRTdG9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbMF0uaXRlbXNbMF0uc3RvcmU7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNYWluQ29udGFpbmVyKTtcblxuZXhwb3J0IHtNYWluQ29udGFpbmVyIGFzIGRlZmF1bHR9OyJdLCJzb3VyY2VSb290IjoiIn0=