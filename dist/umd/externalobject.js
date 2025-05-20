var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./externalobjectmetadata"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExternalObject = void 0;
    var externalobjectmetadata_1 = require("./externalobjectmetadata");
    /**
     * External object.
     * <br/><span style="color: red;">ou <strong>should never</strong> instantiate this class directly
     * but rather call <code>getExternalObject</code></span>.
     * @class
     */
    var ExternalObject = /** @class */ (function () {
        /**
         * Constructor
         * @param {Session} ses Session
         * @param {string} name Business object name
         */
        function ExternalObject(ses, name) {
            /**
             * Alias to <code>call</code>
             * @function
             */
            this.invoke = this.call;
            this.session = ses;
            this.metadata = new externalobjectmetadata_1.ExternalObjectMetadata(name);
            this.path = "".concat(this.session.parameters.extpath, "/").concat(encodeURIComponent(name));
        }
        /**
         * Get name
         * @return {string} Name
         * @function
         */
        ExternalObject.prototype.getName = function () {
            return this.metadata.name;
        };
        /**
         * Build URL-encoded parameters
         * @param {object} params URL parameters as key/value pairs
         * @return {string} URL-encoded parameters
         * @function
         */
        ExternalObject.prototype.callParams = function (params) {
            var p = '';
            if (!params)
                return p;
            for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
                var i = _a[_i];
                var k = i[0];
                var v = i[1] || '';
                if (v.sort) { // Array ?
                    for (var _b = 0, v_1 = v; _b < v_1.length; _b++) {
                        var vv = v_1[_b];
                        p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(vv);
                    }
                }
                else {
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(v);
                }
            }
            return p;
        };
        /**
         * Call an external object
         * @param {object} [params] Optional URL parameters
         * @param {object|string|FormData} [data] Optional body data (for 'POST' and 'PUT' methods only)
         * @param {object} [opts] Options
         * @param {string} [opts.path] Absolute or relative path (e.g. absolute '/my/mapped/path' or relative 'my/additional/path')
         * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set)
         * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
         * @param {function} [opts.accept] Optional accepted response type (e.g. 'application/json")
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the external object content
         * @function
         */
        ExternalObject.prototype.call = function (params, data, opts) {
            return __awaiter(this, void 0, void 0, function () {
                var origin, ses;
                var _this = this;
                return __generator(this, function (_a) {
                    origin = 'ExternalObject.call';
                    ses = this.session;
                    opts = opts || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var p = '';
                            if (params)
                                p = _this.callParams(params);
                            if (opts.businessCase)
                                p += "_bc=".concat(encodeURIComponent(opts.businessCase));
                            var m = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
                            var h = {};
                            if (opts.contentType) {
                                h['content-type'] = opts.contentType;
                            }
                            else if (data && !(data instanceof FormData)) { // Try to guess type...
                                h['content-type'] = typeof data === 'string' ? 'application/x-www-form-urlencoded' : 'application/json';
                            } // FormData = multipart/form-data with boundary string => handled by fetch
                            //if (ses.parameters.compress)
                            //	h['content-encoding'] = 'gzip';
                            if (opts.accept)
                                h.accept = opts.accept === 'json' ? 'application/json' : opts.accept;
                            var b = ses.getBearerTokenHeader();
                            if (b) {
                                h[ses.authheader] = b;
                            }
                            else {
                                b = ses.getBasicAuthHeader();
                                if (b)
                                    h[ses.authheader] = b;
                            }
                            var u = ses.parameters.url + (opts.path && opts.path.startsWith('/') ? opts.path : _this.path + (opts.path ? '/' + opts.path : '')) + (p !== '' ? '?' + p : '');
                            var d = data ? (typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)) : undefined;
                            ses.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + (d ? ' with ' + d : ''));
                            fetch(u, {
                                method: m,
                                headers: h,
                                //compress: ses.parameters.compress,
                                signal: AbortSignal.timeout(ses.parameters.timeout),
                                body: d
                            }).then(function (res) {
                                var type = res.headers.get('content-type');
                                ses.debug("[".concat(origin, "] HTTP status = ").concat(res.status, ", response content type = ").concat(type));
                                if (type && type.startsWith('application/json')) { // JSON
                                    res.json().then(function (jsonData) {
                                        resolve.call(_this, jsonData, res.status, res.headers);
                                    }).catch(function (err) {
                                        err = ses.getError(err, undefined, origin);
                                        if (!(opts.error || ses.error).call(_this, err))
                                            reject.call(_this, err);
                                    });
                                }
                                else if (type && (type.startsWith('text/') || type.startsWith('application/yaml'))) { // Text
                                    res.text().then(function (textData) {
                                        resolve.call(_this, textData, res.status, res.headers);
                                    }).catch(function (err) {
                                        err = ses.getError(err, undefined, origin);
                                        if (!(opts.error || ses.error).call(_this, err))
                                            reject.call(_this, err);
                                    });
                                }
                                else { // Binary
                                    res.arrayBuffer().then(function (binData) {
                                        resolve.call(_this, binData, res.status, res.headers);
                                    }).catch(function (err) {
                                        err = ses.getError(err, undefined, origin);
                                        if (!(opts.error || ses.error).call(_this, err))
                                            reject.call(_this, err);
                                    });
                                }
                            }).catch(function (err) {
                                err = ses.getError(err, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            });
                        })];
                });
            });
        };
        return ExternalObject;
    }());
    exports.ExternalObject = ExternalObject;
});
//# sourceMappingURL=externalobject.js.map