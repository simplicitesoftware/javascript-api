"use strict";
/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.26
 * @license Apache-2.0
 */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch")); // Node.js polyfill for fetch
var buffer_1 = require("buffer"); // Browser polyfill for Buffer
/**
 * Constants
 * @constant
 */
var constants = {
    /**
     * API client module version
     * @constant {string}
     */
    MODULE_VERSION: '2.2.26',
    /**
     * Default row ID field name
     * @constant {string}
     */
    DEFAULT_ROW_ID_NAME: 'row_id',
    /**
     * Default row ID value
     * @constant {string}
     */
    DEFAULT_ROW_ID: '0',
    /**
     * Default context
     * @constant {number}
     */
    CONTEXT_NONE: 0,
    /**
     * Search context
     * @constant {number}
     */
    CONTEXT_SEARCH: 1,
    /**
     * List context
     * @constant {number}
     */
    CONTEXT_LIST: 2,
    /**
     * Creation context
     * @constant {number}
     */
    CONTEXT_CREATE: 3,
    /**
     * Copy context
     * @constant {number}
     */
    CONTEXT_COPY: 4,
    /**
     * Update context
     * @constant {number}
     */
    CONTEXT_UPDATE: 5,
    /**
     * Delete context
     * @constant {number}
     */
    CONTEXT_DELETE: 6,
    /**
     * Chart context
     * @constant {number}
     */
    CONTEXT_GRAPH: 7,
    /**
     * Pivot table context
     * @constant {number}
     */
    CONTEXT_CROSSTAB: 8,
    /**
     * Publication context
     * @constant {number}
     */
    CONTEXT_PRINTTMPL: 9,
    /**
     * Bulk update context
     * @constant {number}
     */
    CONTEXT_UPDATEALL: 10,
    /**
     * Reference selection context
     * @constant {number}
     */
    CONTEXT_REFSELECT: 11,
    /**
     * Datamap selection context
     * @constant {number}
     */
    CONTEXT_DATAMAPSELECT: 12,
    /**
     * Pre validation context
     * @constant {number}
     */
    CONTEXT_PREVALIDATE: 13,
    /**
     * Post validation context
     * @constant {number}
     */
    CONTEXT_POSTVALIDATE: 14,
    /**
     * State transition context
     * @constant {number}
     */
    CONTEXT_STATETRANSITION: 15,
    /**
     * Export context
     * @constant {number}
     */
    CONTEXT_EXPORT: 16,
    /**
     * Import context
     * @constant {number}
     */
    CONTEXT_IMPORT: 17,
    /**
     * Association context
     * @constant {number}
     */
    CONTEXT_ASSOCIATE: 18,
    /**
     * Panel list context
     * @constant {number}
     */
    CONTEXT_PANELLIST: 19,
    /**
     * Action context
     * @constant {number}
     */
    CONTEXT_ACTION: 20,
    /**
     * Agenda context
     * @constant {number}
     */
    CONTEXT_AGENDA: 21,
    /**
     * Place map context
     * @constant {number}
     */
    CONTEXT_PLACEMAP: 22,
    /**
     * Foreign key (reference) type
     * @constant {number}
     */
    TYPE_ID: 0,
    /**
     * Integer type
     * @constant {number}
     */
    TYPE_INT: 1,
    /**
     * Decimal type
     * @constant {number}
     */
    TYPE_FLOAT: 2,
    /**
     * Short string type
     * @constant {number}
     */
    TYPE_STRING: 3,
    /**
     * Date type
     * @constant {number}
     */
    TYPE_DATE: 4,
    /**
     * Date and time type
     * @constant {number}
     */
    TYPE_DATETIME: 5,
    /**
     * Time type
     * @constant {number}
     */
    TYPE_TIME: 6,
    /**
     * Simple enumeration type
     * @constant {number}
     */
    TYPE_ENUM: 7,
    /**
     * Boolean type
     * @constant {number}
     */
    TYPE_BOOLEAN: 8,
    /**
     * Password type
     * @constant {number}
     */
    TYPE_PASSWORD: 9,
    /**
     * URL type
     * @constant {number}
     */
    TYPE_URL: 10,
    /**
     * HTML content type
     * @constant {number}
     */
    TYPE_HTML: 11,
    /**
     * Email type
     * @constant {number}
     */
    TYPE_EMAIL: 12,
    /**
     * Long string type
     * @constant {number}
     */
    TYPE_LONG_STRING: 13,
    /**
     * Multiple enumeration type
     * @constant {number}
     */
    TYPE_ENUM_MULTI: 14,
    /**
     * Validated string type
     * @constant {number}
     */
    TYPE_REGEXP: 15,
    /**
     * Document type
     * @constant {number}
     */
    TYPE_DOC: 17,
    /**
     * Decimal type
     * @constant {number}
     * @deprecated
     */
    TYPE_FLOAT_EMPTY: 18,
    /**
     * External file type
     * @constant {number}
     * @deprecated
     */
    TYPE_EXTFILE: 19,
    /**
     * Image type
     * @constant {number}
     */
    TYPE_IMAGE: 20,
    /**
     * Notepad type
     * @constant {number}
     */
    TYPE_NOTEPAD: 21,
    /**
     * Phone number type
     * @constant {number}
     */
    TYPE_PHONENUM: 22,
    /**
     * RGB color type
     * @constant {number}
     */
    TYPE_COLOR: 23,
    /**
     * Object type
     * @constant {number}
     */
    TYPE_OBJECT: 24,
    /**
     * Geocoordinates type
     * @constant {number}
     */
    TYPE_GEOCOORDS: 25,
    /**
     * Not visible
     * @constant {number}
     */
    VIS_NOT: 0,
    /**
     * Hiiden (same as not visible)
     * @constant {number}
     */
    VIS_HIDDEN: 0,
    /**
     * Visible on lists only
     * @constant {number}
     */
    VIS_LIST: 1,
    /**
     * Visible on forms only
     * @constant {number}
     */
    VIS_FORM: 2,
    /**
     * Visible on both lists and forms only
     * @constant {number}
     */
    VIS_BOTH: 3,
    /**
     * No search
     * @constant {number}
     */
    SEARCH_NONE: 0,
    /**
     * Simple search
     * @constant {number}
     */
    SEARCH_MONO: 1,
    /**
     * Multiple search (checkboxes)
     * @constant {number}
     */
    SEARCH_MULTI_CHECK: 2,
    /**
     * Multiple search (listbox)
     * @constant {number}
     */
    SEARCH_MULTI_LIST: 3,
    /**
     * Search by period (date/time)
     * @constant {number}
     */
    SEARCH_PERIOD: 4,
    /**
     * True
     * @constant {string}
     */
    TRUE: '1',
    /**
     * False
     * @constant {string}
     */
    FALSE: '0',
    /**
     * Fatal error level
     * @constant {number}
     */
    ERRLEVEL_FATAL: 1,
    /**
     * Error level
     * @constant {number}
     */
    ERRLEVEL_ERROR: 2,
    /**
     * Warning level
     * @constant {number}
     */
    ERRLEVEL_WARNING: 3,
    /**
     * Image resource type
     * @constant {number}
     */
    RESOURCE_TYPE_IMAGE: 'IMG',
    /**
     * Icon resource type
     * @constant {number}
     */
    RESOURCE_TYPE_ICON: 'ICO',
    /**
     * Stylesheet resource type
     * @constant {number}
     */
    RESOURCE_TYPE_STYLESHEET: 'CSS',
    /**
     * Javascript resource type
     * @constant {number}
     */
    RESOURCE_TYPE_JAVASCRIPT: 'JS'
};
/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
 */
var session = function (params) {
    return new Session(params);
};
/**
 * Simplicite application session.
 * @param {object} params Parameters
 * @param {string} params.url Base URL of the Simplicite application
 * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.host Hostname or IP address (e.g. <code>'myhost.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
 * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'uipublic'</code>)
 * @param {string} [params.username] Username (not needed for public endpoint)
 * @param {string} [params.password] Password (not needed for public endpoint)
 * @param {string} [params.authtoken] Auth token (if set, username and password are not needed; not needed for public endpoint)
 * @param {string} [params.ajaxkey] Ajax key (only usefull for usage from the generic UI)
 * @param {boolean} [params.debug=false] Debug mode?
 * @param {function} [params.debugHandler] Debug handler function
 * @param {function} [params.infoHandler] Info handler function
 * @param {function} [params.warningHandler] Warning handler function
 * @param {function} [params.errorHandler] Error handler function
 * @param {function} [params.logHandler] Log handler function
 * @class
 */
var Session = /** @class */ (function () {
    /**
     * Constructor
     * @param params {object} Parameters
     */
    function Session(params) {
        var _this = this;
        /**
         * Constants
         * @member
         */
        this.constants = constants;
        /**
         * Set username
         * @param {string} usr Username
         * @function
         */
        this.setUsername = function (usr) {
            _this.username = usr;
        };
        /**
         * Set password
         * @param {string} pwd Password
         * @function
         */
        this.setPassword = function (pwd) {
            _this.password = pwd;
        };
        /**
         * Set auth token
         * @param {string} token Auth token
         * @function
         */
        this.setAuthToken = function (token) {
            _this.authtoken = token;
        };
        /**
         * Set auth token expiry date
         * @param {Date} expiry Auth token expiry
         * @function
         */
        this.setAuthTokenExpiryDate = function (expiry) {
            _this.authtokenexpiry = expiry;
        };
        /**
         * Is the auth token expired?
         * @return {boolean} true if the auth token is expired
         * @function
         */
        this.isAuthTokenExpired = function () {
            return _this.authtokenexpiry ? new Date() > _this.authtokenexpiry : false;
        };
        /**
         * Set Ajax key
         * @param {string} key Ajax key
         * @function
         */
        this.setAjaxKey = function (key) {
            _this.ajaxkey = key;
        };
        /**
         * Get business object cache key
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         * @return {object} Business object cache key
         * @function
         */
        this.getBusinessObjectCacheKey = function (name, instance) {
            return name + ':' + (instance || 'js_' + name);
        };
        /**
         * Clears all data (credentials, objects, ...)
         * @function
         */
        this.clear = function () {
            _this.username = undefined;
            _this.password = undefined;
            _this.authtoken = undefined;
            _this.authtokenexpiry = undefined;
            _this.sessionid = undefined;
            _this.grant = undefined;
            _this.appinfo = undefined;
            _this.sysinfo = undefined;
            _this.devinfo = undefined;
            _this.businessObjectCache = new Map();
        };
        /**
         * Basic HTTP authorization header value
         * @return {string} HTTP authorization header value
         * @function
         */
        this.getBasicAuthHeader = function () {
            return _this.username && _this.password
                ? 'Basic ' + buffer_1.Buffer.from(_this.username + ':' + _this.password).toString('base64')
                : undefined;
        };
        /**
         * Get bearer token header value
         * @return {string} Bearer token header value
         * @function
         */
        this.getBearerTokenHeader = function () {
            return _this.authtoken
                ? 'Bearer ' + _this.authtoken
                : undefined;
        };
        /**
         * Get error object
         * @param {(string|object)} err Error
         * @param {string} err.message Error message
         * @param {number} [status] Optional error status (defaults to 200)
         * @param {string} [origin] Optional error origin
         * @return {object} Error object
         * @function
         */
        this.getError = function (err, status, origin) {
            if (typeof err === 'string') { // plain text error
                return { message: err, status: status || 200, origin: origin };
            }
            else if (err.response) { // wrapped error
                if (typeof err.response === 'string') {
                    return { message: err.response, status: status || 200, origin: origin };
                }
                else {
                    if (origin)
                        try {
                            err.response.origin = origin;
                        }
                        catch (e) { /* ignore */ }
                    return err.response;
                }
            }
            else { // other cases
                if (origin)
                    try {
                        err.origin = origin;
                    }
                    catch (e) { /* ignore */ }
                return err;
            }
        };
        /**
         * Send request
         * @param {string} path Path
         * @param {object} [data] Data
         * @param {function} [callback] Callback
         * @param {function} [errorHandler] Error handler
         * @function
         */
        this.sendRequest = function (path, data, callback, errorHandler) {
            var origin = 'Session.req';
            var m = data ? 'POST' : 'GET';
            var h = {};
            if (data)
                h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            var b = _this.getBearerTokenHeader();
            if (b) {
                h['X-Simplicite-Authorization'] = b;
            }
            else {
                b = _this.getBasicAuthHeader();
                if (b)
                    h.Authorization = b;
            }
            var u = _this.parameters.url + (path || '/');
            if (_this.ajaxkey)
                u += (u.indexOf('?') >= 0 ? '&' : '?') + '_ajaxkey=' + encodeURIComponent(_this.ajaxkey);
            var d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
            _this.debug("[".concat(origin, "] ").concat(m, " ").concat(u).concat(d ? ' with ' + d : ''));
            (0, node_fetch_1.default)(u, {
                method: m,
                headers: h,
                cache: 'no-cache',
                mode: 'cors',
                credentials: 'include',
                body: d
            }).then(function (res) {
                if (callback) {
                    res.text().then(function (textData) {
                        callback.call(_this, textData, res.status, res.headers);
                    });
                }
            }).catch(function (err) {
                var s = err.response && err.response.status ? err.response.status : undefined;
                var e = err.response && err.response.data ? err.response.data : err;
                if (errorHandler)
                    errorHandler.call(_this, _this.getError(e, s, origin));
                else
                    throw e;
            });
        };
        /**
         * Parse response
         * @param {object} res Response to parse
         * @param {number} [status=200] HTTP status
         * @return {object} Error object
         * @function
         */
        this.parseResponse = function (res, status) {
            try {
                if (status !== 200)
                    return { type: 'error', response: _this.getError('HTTP status: ' + status, status) };
                return typeof res === 'object' ? res : JSON.parse(res);
            }
            catch (e) {
                return { type: 'error', response: _this.getError('Parsing error: ' + e.message, status) };
            }
        };
        /**
         * Get health check (no need to be authenticated)
         * @param {object} [opts] Options
         * @param {boolean} [opts.full=false] Full health check?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the health data
         * @function
         */
        this.getHealth = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getHealth';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest("".concat(_this.parameters.healthpath, "&full=").concat(!!opts.full), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(res));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, r);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Alias to getHealth
         * @param {object} [opts] Options
         * @param {boolean} [opts.full=false] Full health check?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the health data
         * @function
         */
        this.health = this.getHealth;
        /**
         * Login
         * @param {object} [opts] Options
         * @param {string} [opts.username] Username (exclusive with authentication token)
         * @param {string} [opts.password] Password (required if username is set)
         * @param {string} [opts.authtoken] Authentication token ((exclusive with username)
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the login result
         * @function
         */
        this.login = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.login';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
                            _this.clear();
                            _this.username = opts.username || opts.login;
                            _this.password = opts.password || opts.pwd;
                        }
                        else if (opts.authtoken || opts.authToken || opts.token) {
                            _this.clear();
                            _this.authtoken = opts.authtoken || opts.authToken || opts.token;
                        }
                        _this.sendRequest(_this.parameters.loginpath, undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type || (r.error ? 'error' : 'login')));
                            if (r.type === 'error' || r.error) {
                                var err = _this.getError(r.response ? r.response : r, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.sessionid = r.response ? r.response.id : r.sessionid;
                                _this.debug("[".concat(origin, "] Session ID = ").concat(_this.sessionid));
                                _this.username = r.response ? r.response.login : r.login;
                                if (_this.username)
                                    _this.debug("[".concat(origin, "] Username = ").concat(_this.username));
                                _this.authtoken = r.response ? r.response.authtoken : r.authtoken;
                                if (_this.authtoken)
                                    _this.debug("[".concat(origin, "] Auth token = ").concat(_this.authtoken));
                                try {
                                    var exp = new Date();
                                    exp.setTime(r.response ? r.response.authtokenexpiry : r.authtokenexpiry);
                                    _this.authtokenexpiry = exp;
                                }
                                catch (e) {
                                    _this.authtokenexpiry = undefined;
                                }
                                if (_this.authtokenexpiry)
                                    _this.debug("[".concat(origin, "] Auth token expiry date = ").concat(_this.authtokenexpiry));
                                // Minimal grant from session data
                                _this.grant = new Grant({
                                    login: _this.username,
                                    userid: r.response ? r.response.userid : r.userid,
                                    firstname: r.response ? r.response.firstname : r.firstname,
                                    lastname: r.response ? r.response.lastname : r.lastname,
                                    email: r.response ? r.response.email : r.email
                                });
                                resolve.call(_this, r.response || r);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Logout
         * @param {function} callback Callback (called upon success)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the logout result
         * @function
         */
        this.logout = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.logout';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest(_this.parameters.logoutpath, undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type || (r.error ? 'error' : 'logout')));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response ? r.response : r, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.clear();
                                resolve.call(_this, r.response || r);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (err.status === 401) // Removes (expired or deleted) token if any
                                _this.authtoken = undefined;
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get grant (current user data)
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlinePicture=false] Inline user picture?
         * @param {boolean} [opts.includeTexts=false] Include texts?
         * @param {function} [opts.error] Error handler function
         * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
         * @function
         */
        this.getGrant = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getGrant';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '&web=true'; // Required to be able to include texts
                        var pic = !!opts.inlinePicture || !!opts.picture; // naming flexibility
                        if (pic)
                            p += '&inline_picture=true';
                        var txt = !!opts.includeTexts || !!opts.texts; // naming flexibility
                        if (txt)
                            p += '&texts=true';
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=getgrant").concat(p), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.grant = new Grant(r.response); // Set as Grant
                                if (pic)
                                    _this.grant.picture = new Doc(_this.grant.picture); // Set picture as Document
                                if (txt)
                                    _this.grant.texts = Object.assign(new Map(), _this.grant.texts); // Set texts as Map
                                resolve.call(_this, _this.grant);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Change password
         * @param {string} pwd Password
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the change password result
         * @function
         */
        this.changePassword = function (pwd, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.changePassword';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=setpassword&password=").concat(encodeURIComponent(pwd)), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get application info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
         * @function
         */
        this.getAppInfo = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getAppInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=getinfo"), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.appinfo = r.response;
                                resolve.call(_this, _this.appinfo);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get system info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
         * @function
         */
        this.getSysInfo = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getSysInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=sysinfo"), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.sysinfo = r.response;
                                resolve.call(_this, _this.sysinfo);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get development info
         * @param {string} [module] Module name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
         * @function
         */
        this.getDevInfo = function (module, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getDevInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (module)
                            p += '&module=' + encodeURIComponent(module);
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=devinfo").concat(p), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                if (!module)
                                    _this.devinfo = r.response;
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get news
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlineImages=false] Inline news images?
         * @param {function} [opts.error] Error handler function
         * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
         * @function
         */
        this.getNews = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getNews';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        var img = !!opts.inlineImages || !!opts.images; // naming flexibility
                        if (img)
                            p += '&inline_images=true';
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=news").concat(p), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.news = r.response;
                                for (var _i = 0, _a = _this.news; _i < _a.length; _i++) {
                                    var n = _a[_i];
                                    n.image = new Doc(n.image);
                                } // Set image as document
                                resolve.call(_this, _this.news);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Index search
         * @param {string} query Index search query
         * @param {string} [object] Object
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Add meta data for each result
         * @param {number} [opts.context] Context
         * @param {function} [opts.error] Error handler function
         * @return {promise<array>} A promise to a list of index search records
         * @function
         */
        this.indexSearch = function (query, object, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.indexSearch';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (opts.metadata === true)
                            p += '&_md=true';
                        if (opts.context)
                            p += '&context=' + encodeURIComponent(opts.context);
                        _this.sendRequest("".concat(_this.parameters.apppath, "?action=indexsearch&request=").concat(encodeURIComponent(query ? query : '')).concat(object ? '&object=' + encodeURIComponent(object) : '').concat(p), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = _this.getError(err, undefined, origin);
                            if (!(opts.error || _this.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get business object
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         * @return {BusinessObject} Business object
         * @function
         */
        this.getBusinessObject = function (name, instance) {
            var cacheKey = _this.getBusinessObjectCacheKey(name, instance);
            var obj = _this.businessObjectCache[cacheKey];
            if (!obj) {
                obj = new BusinessObject(_this, name, instance);
                _this.businessObjectCache[cacheKey] = obj;
            }
            return obj;
        };
        /**
         * Get an external object
         * @param {string} name External object name
         * @function
         */
        this.getExternalObject = function (name) {
            return new ExternalObject(_this, name);
        };
        /**
         * Get a resource URL
         * @param {string} code Resource code
         * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
         * @param {string} [object] Object name (not required for global resources)
         * @param {string} [objId] Object ID (not required for global resources)
         * @function
         */
        this.getResourceURL = function (code, type, object, objId) {
            return _this.parameters.url + _this.parameters.respath
                + '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
                + (object ? '&object=' + encodeURIComponent(object) : '')
                + (objId ? '&objid=' + encodeURIComponent(objId) : '')
                + (_this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(_this.authtoken) : '');
        };
        params = params || {};
        // Within the generic web UI if Simplicite is defined
        var inUI = typeof globalThis.Simplicite !== 'undefined';
        this.endpoint = params.endpoint || (inUI ? globalThis.Simplicite.ENDPOINT : "api" /* SessionParamEndpoint.API */);
        this.log = params.logHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // tslint:disable-next-line: no-console
            console.log(args);
        });
        this.info = params.infoHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.info("INFO - ".concat(args[0]));
            else
                // tslint:disable-next-line: no-console
                console.info('INFO', args);
        });
        this.warn = params.warningHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.info("WARN - ".concat(args[0]));
            else
                // tslint:disable-next-line: no-console
                console.warn("WARN".concat(args && args.length > 0 && args[0].message ? " - ".concat(args[0].message) : ''), args);
        });
        this.error = params.errorHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.info("ERROR - ".concat(args[0]));
            else
                // tslint:disable-next-line: no-console
                console.error("ERROR".concat(args && args.length > 0 && args[0].message ? " - ".concat(args[0].message) : ''), args);
        });
        this.debugMode = !!params.debug;
        this.debug = params.debugHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.debugMode) {
                if (args && args.length === 1 && typeof args[0] === 'string')
                    // tslint:disable-next-line: no-console
                    console.info("DEBUG - ".concat(args[0]));
                else
                    // tslint:disable-next-line: no-console
                    console.log('DEBUG', args);
            }
        });
        var purl = params.url || (inUI && globalThis.Simplicite.URL) || (globalThis.window && globalThis.window.location.origin);
        this.debug('[simplicite] URL parameter = ' + purl);
        if (purl) {
            try {
                params.scheme = purl.replace(/:.*$/, '');
                var u = purl.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
                if (u.length === 1) {
                    params.host = u[0].replace(/\/.*$/, '');
                    params.port = params.scheme === 'http' ? 80 : 443;
                    params.root = u[0].replace(new RegExp('^' + params.host + '/?'), '');
                }
                else {
                    params.host = u[0];
                    params.port = parseInt(u[1].replace(/\/.*$/, ''), 10);
                    if (isNaN(params.port))
                        throw new Error('Incorrect port');
                    params.root = u[1].replace(new RegExp('^' + params.port + '/?'), '');
                }
                if (params.root === '/')
                    params.root = '';
            }
            catch (e) {
                this.error('Unable to parse URL [' + purl + ']: ' + e.message);
                return;
            }
        }
        var scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
        if (scheme !== 'http' && scheme !== 'https') {
            this.error('Incorrect scheme [' + params.scheme + ']');
            return;
        }
        var host = params.host || 'localhost';
        var port = params.port || 8080;
        var root = params.root || '';
        if (root === '/')
            root = '';
        var url = scheme + '://' + host;
        if ((scheme === 'http' && port !== 80) || (scheme === 'https' && port !== 443))
            url += ':' + port;
        if (root !== '')
            url += root.startsWith('/') ? root : '/' + root;
        this.debug('[simplicite] Base URL = ' + url);
        var ep = this.endpoint === 'uipublic' ? '' : '/' + this.endpoint;
        this.parameters = {
            scheme: scheme,
            host: host,
            port: port,
            root: root,
            url: url,
            timeout: params.timeout || 30,
            healthpath: (ep === '/ui' ? ep : '') + '/health?format=json',
            loginpath: ep === '/api' ? '/api/login?format=json' : ep + '/json/app?action=session',
            logoutpath: ep === '/api' ? '/api/logout?format=json' : ep + '/json/app?action=logout',
            apppath: ep + '/json/app',
            objpath: ep + '/json/obj',
            extpath: ep + '/ext',
            docpath: ep + '/raw/document',
            respath: '/resource'
        };
        this.username = params.username || params.login; // naming flexibility
        this.password = params.password || params.pwd; // naming flexibility
        this.authtoken = params.authtoken || params.token; // naming flexibility
        this.ajaxkey = params.ajaxkey || (inUI && globalThis.Simplicite.AJAX_KEY);
        this.businessObjectCache = new Map();
    }
    return Session;
}());
/**
 * Document
 * @class
 */
var Doc = /** @class */ (function () {
    /**
     * Constructor
     * @param value {object} Document value
     */
    function Doc(value) {
        var _this = this;
        /**
         * Get the document ID
         * @return {string} ID
         * @function
         */
        this.getId = function () {
            return _this.id;
        };
        /**
         * Get the document MIME type
         * @return {string} MIME type
         * @function
         */
        this.getMIMEType = function () {
            return _this.mime;
        };
        /**
         * Alias to <code>getMIMEType</code>
         * @return {string} MIME type
         * @function
         */
        this.getMimeType = this.getMIMEType;
        /**
         * Set the document MIME type
         * @param {string} mime MIME type
         * @function
         */
        this.setMIMEType = function (mime) {
            _this.mime = mime;
        };
        /**
         * Alias to <code>setMIMEType</code>
         * @param {string} mime MIME type
         * @function
         */
        this.setMimeType = this.setMIMEType;
        /**
         * Get the document file name
         * @return {string} File name
         * @function
         */
        this.getFilename = function () {
            return _this.filename;
        };
        /**
         * Alias to <code>getFilename</code>
         * @return {string} File name
         * @function
         */
        this.getFileName = this.getFilename;
        /**
         * Set the document file name
         * @param {string} filename File name
         * @function
         */
        this.setFilename = function (filename) {
            _this.filename = filename;
        };
        /**
         * Alias to <code>setFilename</code>
         * @param {string} filename File name
         * @function
         */
        this.setFileName = this.setFilename;
        /**
         * Get the document content (encoded in base 64)
         * @return {string} Content
         * @function
         */
        this.getContent = function () {
            return _this.content;
        };
        /**
         * Get the document thumbnail (encoded in base 64)
         * @return {string} Thumbnail
         * @function
         */
        this.getThumbnail = function () {
            return _this.thumbnail;
        };
        /**
         * Get the document content as an array buffer
         * @return {ArrayBuffer} Content as an array buffer
         * @function
         */
        this.getContentAsArrayBuffer = function () {
            return _this.getBuffer(_this.content).buffer;
        };
        /**
         * Get the document thumbnail as an array buffer
         * @return {ArrayBuffer} Thumbnail as an array buffer
         * @function
         */
        this.getThumbnailAsArrayBuffer = function () {
            return _this.getBuffer(_this.thumbnail || '').buffer;
        };
        /**
         * Get the document content as a text
         * @return {string} Content as plain text
         * @function
         */
        this.getContentAsText = function () {
            return _this.getBuffer(_this.content).toString('utf-8');
        };
        /**
         * Set the document content
         * @param {string} content Content (encoded in base 64)
         * @function
         */
        this.setContent = function (content) {
            _this.content = content;
        };
        /**
         * Set the document content from plain text string
         * @param {string} content Content as plain text string
         * @function
         */
        this.setContentFromText = function (content) {
            _this.content = buffer_1.Buffer.from(content, 'utf-8').toString('base64');
        };
        /**
         * Get the document data URL
         * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
         * @return {string} Data URL or nothing if content is empty
         */
        this.getDataURL = function (thumbnail) {
            if (_this.content)
                return 'data:' + _this.mime + ';base64,' + (thumbnail && _this.thumbnail ? _this.thumbnail : _this.content);
        };
        /**
         * Get the document as a simple value
         * @return {object} Value
         */
        this.getValue = function () {
            return JSON.parse(JSON.stringify(_this)); // Strips all functions
        };
        Object.assign(this, value);
    }
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    Doc.prototype.getBuffer = function (data) {
        return buffer_1.Buffer.from(data, 'base64');
    };
    return Doc;
}());
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
var Grant = /** @class */ (function () {
    /**
     * Constructor
     * @param grant {object} Grant object
     */
    function Grant(grant) {
        var _this = this;
        /**
         * Get user ID
         * @return {string} User ID
         * @function
         */
        this.getUserId = function () {
            return _this.userid;
        };
        /**
         * Get username
         * @return {string} Username
         * @function
         */
        this.getUsername = function () {
            return _this.login;
        };
        /**
         * Alias to <code>getUsername</code>
         * @return {string} Login
         * @function
         */
        this.getLogin = this.getUsername; // Naming flexibility
        /**
         * Get user language
         * @return {string} User language
         * @function
         */
        this.getLang = function () {
            return _this.lang;
        };
        /**
         * Get email address
         * @return {string} Email address
         * @function
         */
        this.getEmail = function () {
            return _this.email;
        };
        /**
         * Get first name
         * @return {string} First name
         * @function
         */
        this.getFirstname = function () {
            return _this.firstname;
        };
        /**
         * Alias to <code>getFirstname</code>
         * @return {string} First name
         * @function
         */
        this.getFirstName = this.getFirstname; // Naming flexibility
        /**
         * Get last name
         * @return {string} Last name
         * @function
         */
        this.getLastname = function () {
            return _this.lastname;
        };
        /**
         * Alias to <code>getLastname</code>
         * @return {string} Last name
         * @function
         */
        this.getLastName = this.getLastname; // Naming flexibility
        /**
         * Get picture data URL
         * @return {Doc} Picture data URL
         * @function
         */
        this.getPictureURL = function () {
            if (_this.picture)
                return 'data:' + _this.picture.mime + ';base64,' + _this.picture.content;
        };
        /**
         * Has responsibility
         * @param {string} group Group name
         * @return {boolean} True if user has a responsibility on the specified group
         * @function
         */
        this.hasResponsibility = function (group) {
            return _this.responsibilities && _this.responsibilities.indexOf(group) !== -1;
        };
        /**
         * Get text value
         * @param {string} code Text code
         * @return {string} Text value
         */
        this.T = function (code) {
            return _this.texts ? _this.texts[code] || '' : '';
        };
        Object.assign(this, grant);
    }
    return Grant;
}());
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
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
        this.rowidfield = constants.DEFAULT_ROW_ID_NAME;
        this.label = name;
        this.help = '';
        this.fields = new Array();
    }
    return BusinessObjectMetadata;
}());
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @class
 */
var BusinessObject = /** @class */ (function () {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    function BusinessObject(ses, name, instance) {
        var _this = this;
        /**
         * Get meta data
         * @param {object} [opts] Options
         * @param {number} [opts.context] Context
         * @param {string} [opts.contextParam] Context parameter
         * @param {function} [opts.error] Error handler function
         * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
         * @function
         */
        this.getMetaData = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.getMetaData';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (opts.context)
                            p += '&context=' + encodeURIComponent(opts.context);
                        if (opts.contextParam)
                            p += '&contextparam=' + encodeURIComponent(opts.contextParam);
                        ses.sendRequest(_this.path + '&action=metadata' + p, undefined, function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.metadata = r.response;
                                resolve.call(_this, _this.metadata);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get meta data (alias to getMetaData)
         * @function
         */
        this.getMetadata = this.getMetaData;
        /**
         * Get name
         * @return {string} Name
         * @function
         */
        this.getName = function () {
            return _this.metadata.name;
        };
        /**
         * Get instance name
         * @return {string} Instance name
         * @function
         */
        this.getInstance = function () {
            return _this.metadata.instance;
        };
        /**
         * Get display label
         * @return {string} Display label
         * @function
         */
        this.getLabel = function () {
            return _this.metadata.label;
        };
        /**
         * Get help
         * @return {string} Help
         * @function
         */
        this.getHelp = function () {
            return _this.metadata.help;
        };
        /**
         * Get all fields definitions
         * @return {array} Array of field definitions
         * @function
         */
        this.getFields = function () {
            return _this.metadata.fields;
        };
        /**
         * Get a field definition
         * @param {string} fieldName Field name
         * @return {object} Field definition
         * @function
         */
        this.getField = function (fieldName) {
            var fs = _this.getFields();
            var n = 0;
            while (n < fs.length && fs[n].name !== fieldName)
                n++;
            if (n < fs.length)
                return fs[n];
        };
        /**
         * Get row ID field name
         * @return {string} Row ID field name
         * @function
         */
        this.getRowIdFieldName = function () {
            return _this.metadata.rowidfield;
        };
        /**
         * Get row ID field definition
         * @return {object} Row ID field definition
         * @function
         */
        this.getRowIdField = function () {
            return _this.getField(_this.getRowIdFieldName());
        };
        /**
         * Get links
         * @return {array} Array of links
         * @function
         */
        this.getLinks = function () {
            return _this.metadata.links;
        };
        /**
         * Get field type
         * @param {(string|object)} field Field name or definition
         * @return {string} Type (one of <code>constants.TYPE_*</code>)
         * @function
         */
        this.getFieldType = function (field) {
            if (typeof field === 'string')
                field = _this.getField(field);
            if (field)
                return field.type;
        };
        /**
         * Get field label
         * @param {(string|object)} field Field name or definition
         * @return {string} Field label
         * @function
         */
        this.getFieldLabel = function (field) {
            if (typeof field === 'string')
                field = _this.getField(field);
            if (field)
                return field.label;
        };
        /**
         * Get value of field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string|Doc} Value
         * @function
         */
        this.getFieldValue = function (field, item) {
            if (!item)
                item = _this.item;
            if (field && item) {
                var val = item[typeof field === 'string' ? field : field.name];
                if (val && val.mime) // Document?
                    return new Doc(val);
                else
                    return val;
            }
        };
        /**
         * Get the list value of a list of values field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string} List value
         * @function
         */
        this.getFieldListValue = function (field, item) {
            if (typeof field === 'string')
                field = _this.getField(field);
            var val = _this.getFieldValue(field, item);
            return field && field.listOfValues ? _this.getListValue(field.listOfValues, val) : val;
        };
        /**
         * Get the data URL of an inlined document/image field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
         * @function
         */
        this.getFieldDataURL = function (field, item) {
            if (typeof field !== 'string')
                field = field.fullinput || field.name;
            var val = _this.getFieldValue(field, item);
            if (val && val.mime) // Inlined
                return 'data:' + val.mime + ';base64,' + (val.content || val.thumbnail);
        };
        /**
         * Get the field's value as document/image for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string|Doc} Document/image (or nothing if the field is not of document/image type or if it is empty)
         * @function
         */
        this.getFieldDocument = function (field, item) {
            if (typeof field !== 'string')
                field = field.fullinput || field.input || field.name;
            var val = _this.getFieldValue(field, item);
            if (val && val.mime)
                return new Doc(val);
            else
                return val;
        };
        /**
         * Get the URL of a document/image field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @param {boolean} [thumbnail=false] Thumbnail?
         * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
         * @function
         */
        this.getFieldDocumentURL = function (field, item, thumbnail) {
            if (typeof field !== 'string')
                field = field.fullinput || field.input || field.name;
            var val = _this.getFieldValue(field, item);
            if (val && val.mime) // Inlined
                val = val.id;
            if (val)
                return _this.session.parameters.url + _this.session.parameters.docpath
                    + '?object=' + encodeURIComponent(_this.metadata.name)
                    + '&inst=' + encodeURIComponent(_this.metadata.instance)
                    + '&field=' + encodeURIComponent(field)
                    + '&row_id=' + encodeURIComponent(_this.getRowId(item))
                    + '&doc_id=' + encodeURIComponent(val)
                    + (thumbnail ? '&thumbnail=true' : '')
                    + (_this.session.authtoken ? '&_x_simplicite_authorization_=' + encodeURIComponent(_this.session.authtoken) : '');
        };
        /**
         * Get list value for code
         * @param {array} list List of values
         * @param {string} code Code
         * @return {string} Value
         * @function
         */
        this.getListValue = function (list, code) {
            if (list) {
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var l = list_1[_i];
                    if (l.code === code)
                        return l.value;
                }
            }
            return code;
        };
        /**
         * Set value of field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {(string|object)} value Value
         * @param {object} [item] Item (defaults to current item)
         * @function
         */
        this.setFieldValue = function (field, value, item) {
            if (!item)
                item = _this.item;
            if (field && item) {
                item[typeof field === 'string' ? field : field.name] = value instanceof Doc ? value.getValue() : value;
            }
        };
        /**
         * Is the field the row ID field?
         * @param {object} field Field definition
         * @return {boolean} True if the field is the row ID field
         * @function
         */
        this.isRowIdField = function (field) {
            return !field.ref && field.name === _this.metadata.rowidfield;
        };
        /**
         * Is the field a timestamp field?
         * @param {object} field Field definition
         * @return {boolean} True if the field is a timestamp field
         * @function
         */
        this.isTimestampField = function (field) {
            var n = field.name;
            return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
        };
        /**
         * Get current filters
         * @param {object} [opts] Options
         * @param {number} [opts.context] Context
         * @param {boolean} [opts.reset] Reset filters?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
         * @function
         */
        this.getFilters = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.getFilters';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (opts.context)
                            p += '&context=' + encodeURIComponent(opts.context);
                        if (opts.reset)
                            p += '&reset=' + !!opts.reset;
                        ses.sendRequest(_this.path + '&action=filters' + p, undefined, function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.filters = r.response;
                                resolve.call(_this, _this.filters);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Build options parameters
         * @param {object} options Options
         * @return {string} Option parameters
         * @private
         */
        this.getReqOptions = function (options) {
            var opts = '';
            if (options.context)
                opts += '&context=' + encodeURIComponent(options.context);
            var id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
            if (id)
                opts += '&inline_documents=' + encodeURIComponent(id.join ? id.join(',') : id);
            var it = options.inlineThumbs || options.inlineThumbnails; // Naming flexibility
            if (it)
                opts += '&inline_thumbnails=' + encodeURIComponent(it.join ? it.join(',') : it);
            var io = options.inlineObjs || options.inlineObjects; // Naming flexibility
            if (io)
                opts += '&inline_objects=' + encodeURIComponent(io.join ? io.join(',') : io);
            return opts;
        };
        /**
         * Convert usual wildcards to filters wildcards
         * @param {object} filter Filter
         * @return {string} Filter with wildcards converted
         * @private
         */
        this.convertFilterWildCards = function (filter) {
            return typeof filter === 'string' ? filter.replace(new RegExp('\\*', 'g'), '%').replace(new RegExp('\\?', 'g'), '_') : filter;
        };
        /**
         * Build request parameters
         * @param {object} data Data
         * @param {boolean} [filters] Filters? Used to convert wildcards if needed
         * @return {string} Request parameters
         * @private
         */
        this.getReqParams = function (data, filters) {
            var p = '';
            if (!data)
                return p;
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var i = _a[_i];
                var k = i[0];
                var d = i[1] || '';
                if (d.name && d.content) { // Document ?
                    if (d.content.startsWith('data:')) // Flexibility = extract content fron data URL
                        d.content = d.content.replace(/data:.*;base64,/, '');
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
                }
                else if (d.object && d.row_id) { // Object ?
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
                }
                else if (d.sort) { // Array ?
                    for (var _b = 0, d_1 = d; _b < d_1.length; _b++) {
                        var dd = d_1[_b];
                        p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? _this.convertFilterWildCards(dd) : dd);
                    }
                }
                else {
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? _this.convertFilterWildCards(d) : d);
                }
            }
            return p;
        };
        /**
         * Get count
         * @param {object} [filters] Filters (defaults to current filters)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the count
         * @function
         */
        this.getCount = function (filters, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.getCount';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.filters = filters || {};
                        ses.sendRequest("".concat(_this.path, "&action=count"), _this.getReqParams(_this.filters, true), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.count = r.response.count;
                                _this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                                _this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                                _this.list = [];
                                resolve.call(_this, _this.count);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Search
         * @param {object} [filters] Filters (defaults to current filters)
         * @param {object} [opts] Options
         * @param {number} [opts.page] Page number, a non paginated list is returned if not set
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {boolean} [opts.visible] Return only visible fields?
         * @param {function} [opts.error] Error handler function
         * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
         * @function
         */
        this.search = function (filters, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.search';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = _this.getReqOptions(opts);
                        if (opts.page > 0)
                            p += '&page=' + (opts.page - 1);
                        if (opts.metadata === true)
                            p += '&_md=true';
                        if (opts.visible === true)
                            p += '&_visible=true';
                        _this.filters = filters || {};
                        ses.sendRequest(_this.path + '&action=search' + p, _this.getReqParams(_this.filters, true), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                if (res.meta)
                                    _this.metadata = r.response.meta;
                                _this.count = r.response.count;
                                _this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                                _this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                                _this.list = r.response.list;
                                resolve.call(_this, _this.list);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
         * @param {string} [opts.treeview] Return the named tree view structure
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
         * @function
         */
        this.get = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.get';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = _this.getReqOptions(opts);
                        var tv = opts.treeView;
                        if (tv)
                            p += '&treeview=' + encodeURIComponent(tv);
                        if (opts.fields) {
                            for (var _i = 0, _a = opts.fields.length; _i < _a.length; _i++) {
                                var f = _a[_i];
                                p += '&fields=' + encodeURIComponent(f.replace('.', '__'));
                            }
                        }
                        if (opts.metadata)
                            p += '&_md=true';
                        if (opts.social)
                            p += '&_social=true';
                        ses.sendRequest(_this.path + '&action=get&' + _this.metadata.rowidfield + '=' + encodeURIComponent(rowId || _this.getRowId()) + p, undefined, function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                if (r.response.meta)
                                    _this.metadata = r.response.meta;
                                if (r.response.data)
                                    _this.item = tv ? r.response.data.item : r.response.data;
                                else
                                    _this.item = tv ? r.response.item : r.response;
                                resolve.call(_this, tv ? r.response : _this.item);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get for create
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCreate = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                opts = opts || {};
                delete opts.treeview; // Inhibited in this context
                delete opts.fields; // Inhibited in this context
                opts.context = constants.CONTEXT_CREATE;
                return [2 /*return*/, this.get(constants.DEFAULT_ROW_ID, opts)];
            });
        }); };
        /**
         * Get for update
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
         * @function
         */
        this.getForUpdate = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                opts = opts || {};
                delete opts.treeview; // Inhibited in this context
                delete opts.fields; // Inhibited in this context
                opts.context = constants.CONTEXT_UPDATE;
                return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
            });
        }); };
        /**
         * Get for copy
         * @param {string} [rowId] Row ID to copy (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCopy = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                opts = opts || {};
                delete opts.treeview; // Inhibited in this context
                delete opts.fields; // Inhibited in this context
                opts.context = constants.CONTEXT_COPY;
                return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
            });
        }); };
        /**
         * Get for delete
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
         * @function
         */
        this.getForDelete = function (rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                opts = opts || {};
                delete opts.treeview; // Inhibited in this context
                delete opts.fields; // Inhibited in this context
                opts.context = constants.CONTEXT_DELETE;
                return [2 /*return*/, this.get(rowId || this.getRowId(), opts)];
            });
        }); };
        /**
         * Get specified or current item's row ID value
         * @param {object} [item] Item (defaults to current item)
         * @return {string} Item's row ID value
         * @function
         */
        this.getRowId = function (item) {
            item = item || _this.item;
            if (item)
                return item[_this.getRowIdFieldName()];
        };
        /**
         * Populate
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
         * @function
         */
        this.populate = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.populate';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (item)
                            _this.item = item;
                        var p = _this.getReqOptions(opts);
                        ses.sendRequest(_this.path + '&action=populate?' + p, _this.getReqParams(_this.item), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.item = r.response.data ? r.response.data : r.response;
                                resolve.call(_this, _this.item);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get the linked list for a list of values field and its specified value(s)
         * @param {(string|object)} field Field name or definition
         * @param {(string|object)} linkedField Linked field name or definition
         * @param {string|boolean} [code] List of values code(s) (if multiple codes use ; as separator), defaults to current field value if empty, means "all" if true
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
         * @function
         */
        this.getFieldLinkedList = function (field, linkedField, code, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.getFieldLinkedList';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (typeof field !== 'string')
                            field = field.fullinput || field.name;
                        if (typeof linkedField !== 'string')
                            linkedField = linkedField.fullinput || linkedField.name;
                        var all = false;
                        if (code === true) {
                            all = true;
                            code = undefined;
                        }
                        else if (typeof code === 'undefined') {
                            code = _this.getFieldValue(field);
                        }
                        ses.sendRequest("".concat(_this.path, "&action=getlinkedlist"), _this.getReqParams({ origin: field, input: linkedField, code: code, all: all }), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.item = r.response.result ? r.response.result : r.response;
                                resolve.call(_this, _this.item);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Save (create or update depending on item row ID value)
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
         * @function
         */
        this.save = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
            var rowId;
            return __generator(this, function (_a) {
                if (item)
                    this.item = item;
                rowId = this.item[this.metadata.rowidfield];
                if (!rowId || rowId === constants.DEFAULT_ROW_ID)
                    return [2 /*return*/, this.create(item, opts)];
                else
                    return [2 /*return*/, this.update(item, opts)];
                return [2 /*return*/];
            });
        }); };
        /**
         * Create (create or update)
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
         * @function
         */
        this.create = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.create';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (item)
                            _this.item = item;
                        _this.item.row_id = constants.DEFAULT_ROW_ID;
                        var p = _this.getReqOptions(opts);
                        ses.sendRequest("".concat(_this.path, "&action=create").concat(p), _this.getReqParams(_this.item), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.item = r.response.data ? r.response.data : r.response;
                                resolve.call(_this, _this.item);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Update
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
         * @function
         */
        this.update = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.update';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (item)
                            _this.item = item;
                        var p = _this.getReqOptions(opts);
                        ses.sendRequest(_this.path + '&action=update' + p, _this.getReqParams(_this.item), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.item = r.response.data ? r.response.data : r.response;
                                resolve.call(_this, _this.item);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Delete
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise (the <code>item</code> member is emptied)
         * @function
         */
        this.del = function (item, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.del';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (item)
                            _this.item = item;
                        ses.sendRequest(_this.path + '&action=delete&' + _this.metadata.rowidfield + '=' + encodeURIComponent(_this.item[_this.metadata.rowidfield]), undefined, function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.item = undefined;
                                delete r.response.undoredo;
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Invoke a custom action
         * @param {string} action Action name
         * @param {string} [rowId] Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.parameters] Optional action parameters as key/value pairs
         * @param {function} [opts.error] Error handler function
         * @return {promise<string|object>} A promise to the action result
         * @function
         */
        this.action = function (action, rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = "BusinessObject.action(".concat(action, ")");
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        ses.sendRequest(_this.path + '&action=' + encodeURIComponent(action) + (rowId ? '&' + _this.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : ''), _this.getReqParams(opts.parameters), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                var result = r.response.result;
                                resolve.call(_this, result);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Build a pivot table
         * @param {string} ctb Pivot table name
         * @param {object} [opts] Options
         * @param {object} [opts.filters] Filters, by default current filters are used
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
         * @function
         */
        this.crosstab = function (ctb, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = "BusinessObject.crosstab(".concat(ctb, ")");
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (opts.filters)
                            _this.filters = opts.filters;
                        ses.sendRequest(_this.path + '&action=crosstab&crosstab=' + encodeURIComponent(ctb), _this.getReqParams(_this.filters, true), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Build a custom publication
         * @param {string} prt Publication name
         * @param {string} [rowId] Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<Doc>} A promise to the document of the publication
         * @function
         */
        this.print = function (prt, rowId, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = "BusinessObject.print(".concat(prt, ")");
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (opts.filters)
                            _this.filters = opts.filters;
                        var p = '';
                        if (opts.all)
                            p += '&all=' + !!opts.all;
                        if (opts.mailing)
                            p += '&mailing=' + !!opts.mailing;
                        ses.sendRequest(_this.path + '&action=print&printtemplate=' + encodeURIComponent(prt) + (rowId ? '&' + _this.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : '') + p, undefined, function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, new Doc(r.response));
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get placem map data
         * @param {string} pcm Place map name
         * @param {string} [filters] Filters
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<any>} A promise to the place map data
         * @function
         */
        this.placemap = function (pcm, filters, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = "BusinessObject.placemap(".concat(pcm, ")");
                ses = this.session;
                this.filters = filters || {};
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (opts.filters)
                            _this.filters = opts.filters;
                        ses.sendRequest(_this.path + '&action=placemap&placemap=' + encodeURIComponent(pcm), _this.getReqParams(_this.filters, true), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                resolve.call(_this, r.response);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Set an object parameter
         * @param {string} param Parameter name
         * @param {string} value Parameter value
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise
         * @function
         */
        this.setParameter = function (param, value, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.setParameter';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = { name: param };
                        if (value)
                            p.value = value;
                        ses.sendRequest(_this.path + '&action=setparameter', _this.getReqParams(p), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                var result = r.response.result;
                                resolve.call(_this, result);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get an object parameter
         * @param {string} param Parameter name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the parameter value
         * @function
         */
        this.getParameter = function (param, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'BusinessObject.getParameter';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = { name: param };
                        ses.sendRequest(_this.path + '&action=getparameter', _this.getReqParams(p), function (res, status) {
                            var r = ses.parseResponse(res, status);
                            ses.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = ses.getError(r.response, undefined, origin);
                                if (!(opts.error || ses.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                var result = r.response.result;
                                resolve.call(_this, result);
                            }
                        }, function (err) {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(_this, err))
                                reject.call(_this, err);
                        });
                    })];
            });
        }); };
        /**
         * Get an object resource URL
         * @param {string} code Resource code
         * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
         * @return {string} Object resource URL
         * @function
         */
        this.getResourceURL = function (code, type) {
            return _this.session.getResourceURL(code, type, _this.metadata.name, _this.metadata.id);
        };
        this.session = ses;
        var inst = instance || 'api_' + name;
        this.metadata = new BusinessObjectMetadata(name, inst);
        this.cacheKey = this.session.getBusinessObjectCacheKey(name, inst);
        this.path = this.session.parameters.objpath + '?object=' + encodeURIComponent(name) + '&inst=' + encodeURIComponent(inst);
        this.item = {};
        this.filters = {};
        this.list = [];
    }
    return BusinessObject;
}());
/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
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
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
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
        var _this = this;
        /**
         * Get name
         * @return {string} Name
         * @function
         */
        this.getName = function () {
            return _this.metadata.name;
        };
        /**
         * Build URL-encoded parameters
         * @param {object} params URL parameters as key/value pairs
         * @return {string} URL-encoded parameters
         * @function
         */
        this.callParams = function (params) {
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
         * @param {object} [data] Optional data (for 'POST' and 'PUT' methods only)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set
         * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
         * @return {promise<object>} Promise to the external object content
         * @function
         */
        this.call = function (params, data, opts) { return __awaiter(_this, void 0, void 0, function () {
            var origin, ses;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'ExternalObject.call';
                ses = this.session;
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (params)
                            p = '?' + _this.callParams(params);
                        var m = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
                        var h = {};
                        if (opts.contentType) {
                            h['Content-Type'] = opts.contentType;
                        }
                        else if (data) { // Try to guess type...
                            h['Content-Type'] = typeof data === 'string' ? 'application/x-www-form-urlencoded' : 'application/json';
                        }
                        var b = ses.getBearerTokenHeader();
                        if (b) {
                            h['X-Simplicite-Authorization'] = b;
                        }
                        else {
                            b = ses.getBasicAuthHeader();
                            if (b)
                                h.Authorization = b;
                        }
                        var u = ses.parameters.url + _this.path + p;
                        var d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
                        ses.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + ' with ' + (d ? ' with ' + d : ''));
                        (0, node_fetch_1.default)(u, {
                            method: m,
                            headers: h,
                            cache: 'no-cache',
                            mode: 'cors',
                            credentials: 'include',
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
                            else if (type && type.startsWith('text/')) { // Text
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
        }); };
        /**
         * Alias to <code>call</code>
         * @function
         */
        this.invoke = this.call;
        this.session = ses;
        this.metadata = new ExternalObjectMetadata(name);
        this.path = this.session.parameters.extpath + '/' + encodeURIComponent(name);
    }
    return ExternalObject;
}());
exports.default = {
    constants: constants,
    session: session,
    Session: Session,
    Doc: Doc,
    Grant: Grant,
    BusinessObject: BusinessObject,
    BusinessObjectMetadata: BusinessObjectMetadata,
    ExternalObject: ExternalObject
};
//# sourceMappingURL=simplicite.js.map