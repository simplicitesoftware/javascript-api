(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExternalObjectMetadata = void 0;
    /**
     * External object meta data.
     * <br/><span style="color: red;">You <strong>should never</strong> instantiate this class directly
     * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
     * @class
     */
    var ExternalObjectMetadata = /** @class */ (function () {
        /**
         * Constructor
         * @param {string} name External object name
         */
        function ExternalObjectMetadata(name) {
            this.name = name;
        }
        return ExternalObjectMetadata;
    }());
    exports.ExternalObjectMetadata = ExternalObjectMetadata;
});
//# sourceMappingURL=externalobjectmetadata.js.map