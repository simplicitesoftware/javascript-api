"use strict";
/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 3.1.4
 * @license Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var doc_1 = require("./doc");
var grant_1 = require("./grant");
var businessobjectmetadata_1 = require("./businessobjectmetadata");
var businessobject_1 = require("./businessobject");
var externalobjectmetadata_1 = require("./externalobjectmetadata");
var externalobject_1 = require("./externalobject");
var session_1 = require("./session");
/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
 */
var session = function (params) {
    return new session_1.Session(params);
};
exports.default = {
    constants: constants_1.constants,
    session: session,
    Session: session_1.Session,
    Doc: doc_1.Doc,
    Grant: grant_1.Grant,
    BusinessObjectMetadata: businessobjectmetadata_1.BusinessObjectMetadata,
    BusinessObject: businessobject_1.BusinessObject,
    ExternalObjectMetadata: externalobjectmetadata_1.ExternalObjectMetadata,
    ExternalObject: externalobject_1.ExternalObject
};
//# sourceMappingURL=simplicite.js.map