"use strict";
/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.3
 * @license Apache-2.0
 */
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
    MODULE_VERSION: '2.2.3',
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
     * Panle list context
     * @constant {number}
     */
    CONTEXT_PANELLIST: 19,
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
 * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'public'</code>)
 * @param {string} [params.username] Username (not needed for public endpoint)
 * @param {string} [params.password] Password (not needed for public endpoint)
 * @param {string} [params.authtoken] Auth token (if set, username and password are not needed; not needed for public endpoint)
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
        // TODO: businessObjectCache: Map<string, BusinessObject>;
        /**
         * Get business object cache key
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         * @return {object} Business object cache key
         * @private
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
            _this.sessionid = undefined;
            _this.grant = undefined;
            _this.appinfo = undefined;
            _this.sysinfo = undefined;
            _this.devinfo = undefined;
            _this.businessObjectCache = new Map();
            // TODO: this.businessObjectCache = new Map<string, BusinessObject>();
        };
        /**
         * Basic HTTP authorization header value
         * @return {string} HTTP authorization header value
         * @private
         */
        this.getBasicAuthHeader = function () {
            return _this.username && _this.password
                ? 'Basic ' + buffer_1.Buffer.from(_this.username + ':' + _this.password).toString('base64')
                : undefined;
        };
        /**
         * Get bearer token header value
         * @return {string} Bearer token header value
         * @private
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
         * @private
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
         * Request
         * @param {string} path Path
         * @param {object} [data] Data
         * @param {function} [callback] Callback
         * @param {function} [errorHandler] Error handler
         * @private
         */
        this.req = function (path, data, callback, errorHandler) {
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
                    h['Authorization'] = b;
            }
            var u = _this.parameters.url + path || '/';
            var d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
            _this.debug("[" + origin + "] " + m + " " + u + (d ? ' with ' + d : ''));
            (0, node_fetch_1.default)(u, {
                method: m,
                headers: h,
                timeout: _this.parameters.timeout * 1000,
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
         * Parse result
         * @param {object} res Response to parse
         * @param {number} [status=200] HTTP status
         * @return {object} Error object
         * @private
         */
        this.parse = function (res, status) {
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
        this.getHealth = function (opts) {
            var origin = 'Session.getHealth';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                _this.req(_this.parameters.healthpath + "&full=" + !!opts.full, undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + res);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        resolve && resolve.call(_this, r);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
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
        this.login = function (opts) {
            var origin = 'Session.login';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
                    _this.clear();
                    _this.username = opts.username || opts.login;
                    _this.password = opts.password || opts.pwd;
                }
                else if (opts.authtoken || opts.authToken || opts.token) {
                    _this.clear();
                    _this.authtoken = opts.authtoken || opts.authToken || opts.token;
                }
                _this.req(_this.parameters.apppath + "?action=session", undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.sessionid = r.response.id;
                        _this.debug("[" + origin + "] Session ID = " + _this.sessionid);
                        _this.username = r.response.login;
                        if (_this.username)
                            _this.debug("[" + origin + "] Username = " + _this.username);
                        _this.authtoken = r.response.authtoken;
                        if (_this.authtoken)
                            _this.debug("[" + origin + "] Auth token = " + _this.authtoken);
                        // Minimal grant from session data
                        _this.grant = Object.assign(new Grant(), {
                            login: r.response.login,
                            userid: r.response.userid,
                            firstname: r.response.firstanme,
                            lastname: r.response.lastname,
                            email: r.response.email
                        });
                        resolve && resolve.call(_this, r.response);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Logout
         * @param {function} callback Callback (called upon success)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the logout result
         * @function
         */
        this.logout = function (opts) {
            var origin = 'Session.logout';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                _this.req(_this.parameters.apppath + "?action=logout", undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.clear();
                        resolve && resolve.call(_this, r.response);
                    }
                }, function (err) {
                    if (err.status === 401) // Removes (expired or deleted) token if any
                        _this.authtoken = undefined;
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Get grant (current user data)
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlinePicture=false] Inline user picture?
         * @param {boolean} [opts.includeTexts=false] Include texts?
         * @param {function} [opts.error] Error handler function
         * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
         * @function
         */
        this.getGrant = function (opts) {
            var origin = 'Session.getGrant';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '&web=true'; // Required to be able to include texts
                var pic = !!opts.inlinePicture || !!opts.picture; // naming flexibility
                if (pic)
                    p += '&inline_picture=true';
                var txt = !!opts.includeTexts || !!opts.texts; // naming flexibility
                if (txt)
                    p += '&texts=true';
                _this.req(_this.parameters.apppath + "?action=getgrant" + p, undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.grant = Object.assign(new Grant(), r.response); // Set as Grant
                        if (pic)
                            _this.grant.picture = Object.assign(new Document(), _this.grant.picture); // Set picture as Document
                        if (txt)
                            _this.grant.texts = Object.assign(new Map(), _this.grant.texts); // Set texts as Map
                        resolve && resolve.call(_this, _this.grant);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Change password
         * @param {string} pwd Password
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the change password result
         * @function
         */
        this.changePassword = function (pwd, opts) {
            var origin = 'Session.changePassword';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                _this.req(_this.parameters.apppath + "?action=setpassword&password=" + encodeURIComponent(pwd), undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error')
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    else
                        resolve && resolve.call(_this, r.response);
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Get application info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
         * @function
         */
        this.getAppInfo = function (opts) {
            var origin = 'Session.getAppInfo';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                _this.req(_this.parameters.apppath + "?action=getinfo", undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.appinfo = r.response;
                        resolve && resolve.call(_this, _this.appinfo);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Get system info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
         * @function
         */
        this.getSysInfo = function (opts) {
            var origin = 'Session.getSysInfo';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                _this.req(_this.parameters.apppath + "?action=sysinfo", undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.sysinfo = r.response;
                        resolve && resolve.call(_this, _this.sysinfo);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Get development info
         * @param {string} [module] Module name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
         * @function
         */
        this.getDevInfo = function (module, opts) {
            var origin = 'Session.getDevInfo';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                if (module)
                    p += '&module=' + encodeURIComponent(module);
                _this.req(_this.parameters.apppath + "?action=devinfo" + p, undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        if (!module)
                            _this.devinfo = r.response;
                        resolve && resolve.call(_this, r.response);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
        /**
         * Get news
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlineImages=false] Inline news images?
         * @param {function} [opts.error] Error handler function
         * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
         * @function
         */
        this.getNews = function (opts) {
            var origin = 'Session.getHealth';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                var img = !!opts.inlineImages || !!opts.images; // naming flexibility
                if (img)
                    p += '&inline_images=true';
                _this.req(_this.parameters.apppath + "?action=news" + p, undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error') {
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    }
                    else {
                        _this.news = r.response;
                        for (var _i = 0, _a = _this.news; _i < _a.length; _i++) {
                            var n = _a[_i];
                            n.image = Object.assign(new Document(), n.image);
                        } // Set image as document
                        resolve && resolve.call(_this, _this.news);
                    }
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
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
        this.indexSearch = function (query, object, opts) {
            var origin = 'Session.indexSearch';
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                if (opts.metadata === true)
                    p += '&_md=true';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                _this.req(_this.parameters.apppath + "?action=indexsearch&request=" + encodeURIComponent(query ? query : '') + (object ? '&object=' + encodeURIComponent(object) : '') + p, undefined, function (res, status) {
                    var r = _this.parse(res, status);
                    _this.debug("[" + origin + "] HTTP status = " + status + ", response type = " + r.type);
                    if (r.type === 'error')
                        (opts.error || _this.error || reject).call(_this, _this.getError(r.response, undefined, origin));
                    else
                        resolve && resolve.call(_this, r.response);
                }, function (err) {
                    (opts.error || _this.error || reject).call(_this, _this.getError(err, undefined, origin));
                });
            });
        };
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
        if (!params)
            throw 'No session parammeters';
        this.endpoint = params.endpoint || "api" /* API */;
        this.log = params.logHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(args);
        });
        this.info = params.infoHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.info('INFO', args);
        });
        this.warn = params.warningHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn('WARN', args);
        });
        this.error = params.errorHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error('ERROR', args);
        });
        this.debugMode = !!params.debug;
        this.debug = params.debugHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.debugMode)
                console.log('DEBUG', args);
        });
        if (params.url) {
            try {
                params.scheme = params.url.replace(/:.*$/, '');
                var u = params.url.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
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
                this.error('Unable to parse URL [' + params.url + ']: ' + e.message);
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
        if ((scheme === 'http' && port != 80) || (scheme === 'https' && port != 443))
            url += ':' + port;
        if (root !== '')
            url += root.startsWith('/') ? root : '/' + root;
        this.debug('[simplicite] Base URL = ' + url);
        var ep = this.endpoint == 'public' ? '' : '/' + this.endpoint;
        this.parameters = {
            scheme: scheme,
            host: host,
            port: port,
            root: root,
            url: url,
            timeout: params.timeout || 30,
            healthpath: (ep == '/ui' ? ep : '') + '/health?format=json',
            apppath: ep + '/json/app',
            objpath: ep + '/json/obj',
            extpath: ep + '/ext',
            docpath: ep + '/raw/document',
            respath: '/resource'
        };
        this.username = params.username || params.login; // naming flexibility
        this.password = params.password || params.pwd; // naming flexibility
        this.authtoken = params.authtoken || params.token; // naming flexibility
        this.businessObjectCache = new Map();
        // TODO : this.businessObjectCache = new Map<string, BusinessObject>();
    }
    return Session;
}());
/**
 * Document
 * @class
 */
var Document = /** @class */ (function () {
    function Document() {
        var _this = this;
        /**
         * Get the document's ID
         * @return {string} ID
         * @function
         */
        this.getId = function () {
            return _this.id;
        };
        /**
         * Get the document's MIME type
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
         * Set the document's MIME type
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
         * Get the document's file name
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
         * Set the document's file name
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
         * Get the document's content (encoded in base 64)
         * @return {string} Content
         * @function
         */
        this.getContent = function () {
            return _this.content;
        };
        /**
         * Get the document's thumbnail (encoded in base 64)
         * @return {string} Thumbnail
         * @function
         */
        this.getThumbnail = function () {
            return _this.thumbnail;
        };
        /**
         * Get the document's content as an array buffer
         * @return {ArrayBuffer} Content as an array buffer
         * @function
         */
        this.getContentAsArrayBuffer = function () {
            return _this.getBuffer(_this.content).buffer;
        };
        /**
         * Get the document's thumbnail as an array buffer
         * @return {ArrayBuffer} Thumbnail as an array buffer
         * @function
         */
        this.getThumbnailAsArrayBuffer = function () {
            return _this.getBuffer(_this.thumbnail || '').buffer;
        };
        /**
         * Get the document's content as a text
         * @return {string} Content as plain text
         * @function
         */
        this.getContentAsText = function () {
            return _this.getBuffer(_this.content).toString('utf-8');
        };
        /**
         * Set the document's content
         * @param {string} content Content (encoded in base 64)
         * @function
         */
        this.setContent = function (content) {
            _this.content = content;
        };
        /**
         * Set the document's content from plain text string
         * @param {string} content Content as plain text string
         * @function
         */
        this.setContentFromText = function (content) {
            _this.content = buffer_1.Buffer.from(content, 'utf-8').toString('base64');
        };
        /**
         * Get the document's data URL
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
    }
    /**
     * Get the document's content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    Document.prototype.getBuffer = function (data) {
        return buffer_1.Buffer.from(data, 'base64');
    };
    return Document;
}());
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
var Grant = /** @class */ (function () {
    function Grant() {
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
         * @return {Document} Picture data URL
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
    }
    return Grant;
}());
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
var BusinessObjectMetadata = /** @class */ (function () {
    function BusinessObjectMetadata(name, instance) {
        this.name = name;
        this.instance = instance;
        this.rowidfield = constants.DEFAULT_ROW_ID_NAME;
        this.label = name;
        this.help = '';
        this.fields = new Array();
        // TODO : this.fields = new Array<Field>();
    }
    return BusinessObjectMetadata;
}());
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} session Session
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
var BusinessObject = /** @class */ (function () {
    function BusinessObject(session, name, instance) {
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
        this.getMetaData = function (opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.contextParam)
                    p += '&contextparam=' + encodeURIComponent(opts.contextParam);
                self.session.req.call(self.session, self.path + '&action=metadata' + p, undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.metadata = r.response;
                        resolve && resolve.call(self, self.metadata);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Get meta data (alias to getMetaData)
         * @param {object} [opts] Options
         * @param {number} [opts.context] Context
         * @param {string} [opts.contextParam] Context parameter
         * @param {function} [opts.error] Error handler function
         * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
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
         * @return {strin|Document} Value
         * @function
         */
        this.getFieldValue = function (field, item) {
            if (!item)
                item = _this.item;
            if (field && item) {
                return item[typeof field === 'string' ? field : field.name];
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
         * @return {Document} Document/image (or nothing if the field is not of document/image type or if it is empty)
         * @function
         */
        this.getFieldDocument = function (field, item) {
            if (typeof field !== 'string')
                field = field.fullinput || field.input || field.name;
            var val = _this.getFieldValue(field, item);
            if (val && val.mime)
                return Object.assign(new Document(), val);
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
                for (var i = 0; i < list.length; i++) {
                    var l = list[i];
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
                item[typeof field === 'string' ? field : field.name] = value instanceof Document ? value.getValue() : value;
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
        this.getFilters = function (opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.reset)
                    p += '&reset=' + !!opts.reset;
                self.session.req.call(self.session, self.path + '&action=filters' + p, undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.filters = r.response;
                        resolve && resolve.call(self, self.filters);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
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
         * Build request parameters
         * @param {object} data Data
         * @return {string} Request parameters
         * @private
         */
        this.getReqParams = function (data) {
            var p = '';
            if (!data)
                return p;
            var n = 0;
            for (var i in data) {
                var d = data[i] || '';
                if (d.name && d.content) { // Document ?
                    if (d.content.startsWith('data:')) // Flexibility = extract content fron data URL
                        d.content = d.content.replace(/data:.*;base64,/, '');
                    p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
                }
                else if (d.object && d.row_id) { // Object ?
                    p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
                }
                else if (d.sort) { // Array ?
                    for (var j = 0; j < d.length; j++)
                        p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
                }
                else {
                    p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
                }
            }
            return p;
        };
        /**
         * Count
         * @param {object} [filters] Filters, defaults to current filters if not set
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the count
         * @function
         */
        this.count = function (filters, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                self.filters = filters || {};
                self.session.req.call(self.session, self.path + '&action=count', _this.getReqParams(self.filters), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.count = r.response.count;
                        self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        self.list = [];
                        resolve && resolve.call(self, self.count);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Count, **deprecated**: use <code>count</code> instead
         * @deprecated
         * @function
         */
        this.getCount = this.count;
        /**
         * Search
         * @param {object} [filters] Filters, defaults to current filters if not set
         * @param {object} [opts] Options
         * @param {number} [opts.page] Page number, a non paginated list is returned if not set
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {boolean} [opts.visible] Return only visible fields?
         * @param {function} [opts.error] Error handler function
         * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
         * @function
         */
        this.search = function (filters, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = _this.getReqOptions(opts);
                if (opts.page > 0)
                    p += '&page=' + (opts.page - 1);
                if (opts.metadata === true)
                    p += '&_md=true';
                if (opts.visible === true)
                    p += '&_visible=true';
                self.filters = filters || {};
                self.session.req.call(self.session, self.path + '&action=search' + p, _this.getReqParams(self.filters), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        if (res.meta)
                            self.metadata = r.response.meta;
                        self.count = r.response.count;
                        self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        self.list = r.response.list;
                        resolve && resolve.call(self, self.list);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Get
         * @param {string} rowId Row ID
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
         * @param {string} [opts.treeview] Return the named tree view structure
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
         * @function
         */
        this.get = function (rowId, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = _this.getReqOptions(opts);
                var tv = opts.treeView;
                if (tv)
                    p += '&treeview=' + encodeURIComponent(tv);
                if (opts.fields) {
                    for (var i = 0; i < opts.fields.length; i++) {
                        p += '&fields=' + encodeURIComponent(opts.fields[i].replace('.', '__'));
                    }
                }
                if (opts.metadata)
                    p += '&_md=true';
                if (opts.social)
                    p += '&_social=true';
                self.session.req.call(self.session, self.path + '&action=get&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        if (r.response.meta)
                            self.metadata = r.response.meta;
                        if (r.response.data)
                            self.item = tv ? r.response.data.item : r.response.data;
                        else
                            self.item = tv ? r.response.item : r.response;
                        resolve && resolve.call(self, tv ? r.response : self.item);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Get for create
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCreate = function (opts) {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_CREATE;
            return _this.get(_this.session.constants.DEFAULT_ROW_ID, opts);
        };
        /**
         * Get for update
         * @param {string} rowId Row ID
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
         * @function
         */
        this.getForUpdate = function (rowId, opts) {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_UPDATE;
            return _this.get(rowId, opts);
        };
        /**
         * Get for copy
         * @param {string} rowId Row ID to copy
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCopy = function (rowId, opts) {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_COPY;
            return _this.get(rowId, opts);
        };
        /**
         * Get for delete
         * @param {string} rowId Row ID
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
         * @function
         */
        this.getForDelete = function (rowId, opts) {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_DELETE;
            return _this.get(rowId, opts);
        };
        /**
         * Get specified or current item's row ID value
         * @param {object} [item] Item, defaults to current item
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
         * @param {string} rowId Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
         * @function
         */
        this.populate = function (rowId, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = _this.getReqOptions(opts);
                self.session.req.call(self.session, self.path + '&action=populate&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.item = r.response.data ? r.response.data : r.response;
                        resolve && resolve.call(self, self.item);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Save (create or update depending on item row ID value)
         * @param {object} item Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
         * @function
         */
        this.save = function (item, opts) {
            if (item)
                _this.item = item;
            var rowId = _this.item[_this.metadata.rowidfield];
            if (!rowId || rowId === constants.DEFAULT_ROW_ID)
                return _this.create(item, opts);
            else
                return _this.update(item, opts);
        };
        /**
         * Create (create or update)
         * @param {object} item Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
         * @function
         */
        this.create = function (item, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if (item)
                    self.item = item;
                self.item.row_id = self.session.constants.DEFAULT_ROW_ID;
                var p = _this.getReqOptions(opts);
                self.session.req.call(self.session, self.path + '&action=create' + p, _this.getReqParams(self.item), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.item = r.response.data ? r.response.data : r.response;
                        resolve && resolve.call(self, self.item);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Update
         * @param {object} item Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
         * @function
         */
        this.update = function (item, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if (item)
                    self.item = item;
                var p = _this.getReqOptions(opts);
                self.session.req.call(self.session, self.path + '&action=update' + p, _this.getReqParams(self.item), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.item = r.response.data ? r.response.data : r.response;
                        resolve && resolve.call(self, self.item);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Delete
         * @param {object} item Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise (the <code>item</code> member is emptied)
         * @function
         */
        this.del = function (item, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if (item)
                    self.item = item;
                self.session.req.call(self.session, self.path + '&action=delete&' + self.metadata.rowidfield + '=' + encodeURIComponent(self.item[self.metadata.rowidfield]), undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.item = undefined;
                        delete r.response.undoredo;
                        resolve && resolve.call(self, r.response);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
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
        this.action = function (action, rowId, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                self.session.req.call(self.session, self.path + '&action=' + encodeURIComponent(action) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : ''), _this.getReqParams(opts.parameters), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        var result = r.response.result;
                        resolve && resolve.call(self, result);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Build a pivot table
         * @param {string} crosstab Pivot table name
         * @param {object} [opts] Options
         * @param {object} [opts.filters] Filters, by default current filters are used
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
         * @function
         */
        this.crosstab = function (crosstab, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if (opts.filters)
                    self.filters = opts.filters;
                self.session.req.call(self.session, self.path + '&action=crosstab&crosstab=' + encodeURIComponent(crosstab), _this.getReqParams(self.filters), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        self.crosstabdata = r.response;
                        resolve && resolve.call(self, self.crosstabdata);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Build a custom publication
         * @param {string} prt Publication name
         * @param {string} [rowId] Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<Document>} A promise to the document of the publication
         * @function
         */
        this.print = function (prt, rowId, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                if (opts.filters)
                    self.filters = opts.filters;
                var p = '';
                if (opts.all)
                    p += '&all=' + !!opts.all;
                if (opts.mailing)
                    p += '&mailing=' + !!opts.mailing;
                self.session.req.call(self.session, self.path + '&action=print&printtemplate=' + encodeURIComponent(prt) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : '') + p, undefined, function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        resolve && resolve.call(self, Object.assign(new Document(), r.response));
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Set an object parameter
         * @param {string} param Parameter name
         * @param {string} value Parameter value
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise
         * @function
         */
        this.setParameter = function (param, value, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = { name: param };
                if (value)
                    p.value = value;
                self.session.req.call(self.session, self.path + '&action=setparameter', _this.getReqParams(p), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.setParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        var result = r.response.result;
                        resolve && resolve.call(self, result);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
        /**
         * Get an object parameter
         * @param {string} param Parameter name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the parameter value
         * @function
         */
        this.getParameter = function (param, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = { name: param };
                self.session.req.call(self.session, self.path + '&action=getparameter', _this.getReqParams(p), function (res, status) {
                    var r = self.session.parse(res, status);
                    self.session.debug('[simplicite.BusinessObject.getParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        (opts.error || self.session.error || reject).call(self, r.response);
                    }
                    else {
                        var result = r.response.result;
                        resolve && resolve.call(self, result);
                    }
                }, function (err) {
                    (opts.error || self.session.error || reject).call(self, self.session.getError(err));
                });
            });
        };
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
        this.session = session;
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
 * @param {string} name Business object name
 * @class
 */
var ExternalObjectMetadata = /** @class */ (function () {
    function ExternalObjectMetadata(name) {
        this.name = name;
    }
    return ExternalObjectMetadata;
}());
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @param {object} session Session
 * @param {string} name Business object name
 * @class
 */
var ExternalObject = /** @class */ (function () {
    function ExternalObject(session, name) {
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
            var n = 0;
            for (var i in params) {
                var v = params[i] || '';
                if (v.sort) { // Array ?
                    for (var j = 0; j < v.length; j++)
                        p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(v[j]);
                }
                else {
                    p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(v);
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
        this.call = function (params, data, opts) {
            var self = _this;
            opts = opts || {};
            return new Promise(function (resolve, reject) {
                var p = '';
                if (params)
                    p = '?' + self.callParams(params);
                var m = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
                var h = {};
                if (opts.contentType) {
                    h['Content-Type'] = opts.contentType;
                }
                else if (data) { // Try to guess type...
                    h['Content-Type'] = typeof data === 'string' ? 'application/x-www-form-urlencoded' : 'application/json';
                }
                var b = self.session.getBearerTokenHeader();
                if (b) {
                    h['X-Simplicite-Authorization'] = b;
                }
                else {
                    b = self.session.getBasicAuthHeader();
                    if (b)
                        h.Authorization = b;
                }
                var u = self.session.parameters.url + self.path + p;
                var d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
                self.session.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + ' with ' + (d ? ' with ' + d : ''));
                (0, node_fetch_1.default)(u, {
                    method: m,
                    headers: h,
                    timeout: self.session.timeout * 1000,
                    mode: 'cors',
                    credentials: 'include',
                    body: d
                }).then(function (res) {
                    var type = res.headers.get('content-type');
                    self.session.debug('[simplicite.ExternalObject.call(' + p + ')] HTTP status = ' + res.status + ', response content type = ' + type);
                    if (type && type.startsWith('application/json')) { // JSON
                        res.json().then(function (jsonData) {
                            resolve && resolve.call(self, jsonData, res.status, res.headers);
                        }).catch(function (err) {
                            (opts.error || self.error || reject).call(self, self.getError(err));
                        });
                    }
                    else if (type && type.startsWith('text/')) { // Text
                        res.text().then(function (textData) {
                            resolve && resolve.call(self, textData, res.status, res.headers);
                        }).catch(function (err) {
                            (opts.error || self.error || reject).call(self, self.getError(err));
                        });
                    }
                    else { // Binary
                        res.arrayBuffer().then(function (binData) {
                            resolve && resolve.call(self, binData, res.status, res.headers);
                        }).catch(function (err) {
                            (opts.error || self.error || reject).call(self, self.getError(err));
                        });
                    }
                }).catch(function (err) {
                    (opts.error || self.error || reject).call(self, self.getError(err));
                });
            });
        };
        /**
         * Alias to <code>call</code>
         * @function
         */
        this.invoke = this.call;
        this.session = session;
        this.metadata = new ExternalObjectMetadata(name);
        this.path = this.session.parameters.extpath + '/' + encodeURIComponent(name);
    }
    return ExternalObject;
}());
exports.default = {
    constants: constants,
    session: session,
    Session: Session,
    Document: Document,
    Grant: Grant,
    BusinessObject: BusinessObject,
    BusinessObjectMetadata: BusinessObjectMetadata,
    ExternalObject: ExternalObject
};
