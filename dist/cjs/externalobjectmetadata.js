"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalObjectMetadata = void 0;
/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
 * @class
 */
class ExternalObjectMetadata {
    /**
     * Constructor
     * @param {string} name External object name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * Name
     * @member {string}
     */
    name;
}
exports.ExternalObjectMetadata = ExternalObjectMetadata;
//# sourceMappingURL=externalobjectmetadata.js.map