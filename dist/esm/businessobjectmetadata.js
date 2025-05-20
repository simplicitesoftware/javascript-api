import { constants } from './constants';
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @class
 */
class BusinessObjectMetadata {
    /**
     * Constructor
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(name, instance) {
        this.name = name;
        this.instance = instance;
        this.rowidfield = constants.DEFAULT_ROW_ID_NAME;
        this.label = name;
        this.help = '';
        this.fields = new Array();
    }
}
export { BusinessObjectMetadata };
//# sourceMappingURL=businessobjectmetadata.js.map