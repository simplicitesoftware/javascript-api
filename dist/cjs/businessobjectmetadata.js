"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessObjectMetadata = void 0;
var constants_1 = require("./constants");
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @class
 */
var BusinessObjectMetadata = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    function BusinessObjectMetadata(name, instance) {
        this.name = name;
        this.instance = instance;
        this.rowidfield = constants_1.constants.DEFAULT_ROW_ID_NAME;
        this.label = name;
        this.help = '';
        this.fields = new Array();
    }
    return BusinessObjectMetadata;
}());
exports.BusinessObjectMetadata = BusinessObjectMetadata;
//# sourceMappingURL=businessobjectmetadata.js.map