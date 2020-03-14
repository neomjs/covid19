import Country from '../model/Country.mjs';
import Store   from '../../../node_modules/neo.mjs/src/data/Store.mjs';

/**
 * @class Covid19.store.Countries
 * @extends Neo.data.Store
 */
class Countries extends Store {
    static getConfig() {return {
        className: 'Covid19.store.Countries',

        keyProperty: 'country',
        model      : Country
    }}
}

Neo.applyClassConfig(Countries);

export {Countries as default};