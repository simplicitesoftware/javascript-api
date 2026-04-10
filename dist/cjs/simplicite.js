"use strict";
/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 3.1.6
 * @license Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("./constants.js");
const doc_js_1 = require("./doc.js");
const grant_js_1 = require("./grant.js");
const businessobjectmetadata_js_1 = require("./businessobjectmetadata.js");
const businessobject_js_1 = require("./businessobject.js");
const externalobjectmetadata_js_1 = require("./externalobjectmetadata.js");
const externalobject_js_1 = require("./externalobject.js");
const session_js_1 = require("./session.js");
/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
 */
const session = (params) => {
    return new session_js_1.Session(params);
};
exports.default = {
    constants: constants_js_1.constants,
    session: session,
    Session: session_js_1.Session,
    Doc: doc_js_1.Doc,
    Grant: grant_js_1.Grant,
    BusinessObjectMetadata: businessobjectmetadata_js_1.BusinessObjectMetadata,
    BusinessObject: businessobject_js_1.BusinessObject,
    ExternalObjectMetadata: externalobjectmetadata_js_1.ExternalObjectMetadata,
    ExternalObject: externalobject_js_1.ExternalObject
};
//# sourceMappingURL=simplicite.js.map