"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessObjectMetadata = void 0;
const constants_js_1 = require("./constants.js");
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
        this.rowidfield = constants_js_1.constants.DEFAULT_ROW_ID_NAME;
        this.label = name;
        this.help = '';
        this.fields = new Array();
    }
    /**
     * ID
     * @member {string}
     */
    id;
    /**
     * Name
     * @member {string}
     */
    name;
    /**
     * Instance name
     * @member {string}
     */
    instance;
    /**
     * Row ID field name
     * @member {string}
     */
    rowidfield;
    /**
     * Display label
     * @member {string}
     */
    label;
    /**
     * Help
     * @member {string}
     */
    help;
    /**
     * Fields definitions
     * @member {array}
     */
    fields;
    /**
     * Links definitions
     * @member {array}
     */
    links;
}
exports.BusinessObjectMetadata = BusinessObjectMetadata;
//# sourceMappingURL=businessobjectmetadata.js.map