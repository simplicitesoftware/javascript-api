/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 3.0.1
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
import { Buffer } from 'buffer'; // Browser polyfill for Buffer
/**
 * Constants
 * @constant
 */
const constants = {
    /**
     * API client module version
     * @constant {string}
     */
    MODULE_VERSION: '3.0.1',
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
    RESOURCE_TYPE_JAVASCRIPT: 'JS',
    /**
     * Default authentication header
     * @constant {string}
     */
    DEFAULT_AUTH_HEADER: 'authorization',
    /**
     * Simplicite authentication header
     * @constant {string}
     */
    SIMPLICITE_AUTH_HEADER: 'x-simplicite-authorization'
};
/**
 * Simplicite application session. Same as <code>new Session(parameter)</code>.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
 */
const session = (params) => {
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
 * @param {string} [params.username] Username (not needed for the public UI endpoint)
 * @param {string} [params.password] Password (not needed for the public UI endpoint)
 * @param {string} [params.authtoken] Authentication token (if set, username and password are not needed; not needed for the public UI endpoint)
 * @param {string} [params.authheader] Authorization HTTP header name (defaults to the standard <code>Authorization</code>, the alternative is the value of the <code>SIMPLICITE_AUTH_HEADER</code> constant, not needed for public endpoint)
 * @param {string} [params.ajaxkey] Ajax key (only usefull for usage from the generic UI)
 * @param {boolean} [params.debug=false] Debug mode?
 * @param {function} [params.debugHandler] Debug handler function
 * @param {function} [params.infoHandler] Info handler function
 * @param {function} [params.warningHandler] Warning handler function
 * @param {function} [params.errorHandler] Error handler function
 * @param {function} [params.logHandler] Log handler function
 * @class
 */
class Session {
    /**
     * Constructor
     * @param params {object} Parameters
     */
    constructor(params) {
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
        this.setUsername = (usr) => {
            this.username = usr;
        };
        /**
         * Set password
         * @param {string} pwd Password
         * @function
         */
        this.setPassword = (pwd) => {
            this.password = pwd;
        };
        /**
         * Set auth token
         * @param {string} token Auth token
         * @function
         */
        this.setAuthToken = (token) => {
            this.authtoken = token;
        };
        /**
         * Set auth token expiry date
         * @param {Date} expiry Auth token expiry
         * @function
         */
        this.setAuthTokenExpiryDate = (expiry) => {
            this.authtokenexpiry = expiry;
        };
        /**
         * Is the auth token expired?
         * @return {boolean} true if the auth token is expired
         * @function
         */
        this.isAuthTokenExpired = () => {
            return this.authtokenexpiry ? new Date() > this.authtokenexpiry : false;
        };
        /**
         * Set Ajax key
         * @param {string} key Ajax key
         * @function
         */
        this.setAjaxKey = (key) => {
            this.ajaxkey = key;
        };
        /**
         * Get business object cache key
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         * @return {object} Business object cache key
         * @function
         */
        this.getBusinessObjectCacheKey = (name, instance) => {
            return name + ':' + (instance || 'js_' + name);
        };
        /**
         * Clears all data (credentials, objects, ...)
         * @function
         */
        this.clear = () => {
            this.username = undefined;
            this.password = undefined;
            this.authtoken = undefined;
            this.authtokenexpiry = undefined;
            this.sessionid = undefined;
            this.grant = undefined;
            this.appinfo = undefined;
            this.sysinfo = undefined;
            this.devinfo = undefined;
            this.businessObjectCache = new Map();
        };
        /**
         * Basic HTTP authorization header value
         * @return {string} HTTP authorization header value
         * @function
         */
        this.getBasicAuthHeader = () => {
            return this.username && this.password
                ? 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')
                : undefined;
        };
        /**
         * Get bearer token header value
         * @return {string} Bearer token header value
         * @function
         */
        this.getBearerTokenHeader = () => {
            return this.authtoken
                ? 'Bearer ' + this.authtoken
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
        this.getError = (err, status, origin) => {
            if (typeof err === 'string') { // plain text error
                return { message: err, status: status || 200, origin };
            }
            else if (err.response) { // wrapped error
                if (typeof err.response === 'string') {
                    return { message: err.response, status: status || 200, origin };
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
         * Compress data as blob
         * @param data {string|any} Data to compress
         * @return {Promise<Blob>} Promise to the compressed data blob
         */
        this.compressData = (data) => {
            const s = typeof data === 'string'
                ? new Blob([data], { type: 'text/plian' }).stream()
                : new Blob([JSON.stringify(data)], { type: 'application/json' }).stream();
            const cs = s.pipeThrough(new CompressionStream('gzip'));
            return new Response(cs).blob();
        };
        /**
         * Uncompress blob
         * @param blob {Blob} Compressed data blob
         * @return {Promise<string>} Promise to the uncompressed string
         */
        this.uncompressData = (blob) => {
            const us = blob.stream().pipeThrough(new DecompressionStream('gzip'));
            return new Response(us).text();
        };
        /**
         * Send request
         * @param {string} path Path
         * @param {object} [data] Data
         * @param {function} [callback] Callback
         * @param {function} [errorHandler] Error handler
         * @function
         */
        this.sendRequest = (path, data, callback, errorHandler) => {
            const origin = 'Session.sendRequest';
            const m = data ? 'POST' : 'GET';
            const h = {};
            if (data)
                h['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            h.accept = 'application/json';
            let b = this.getBearerTokenHeader();
            if (b) {
                h[this.authheader] = b;
            }
            else {
                b = this.getBasicAuthHeader();
                if (b)
                    h[this.authheader] = b;
            }
            let u = this.parameters.url + (path || '/');
            if (this.ajaxkey)
                u += (u.indexOf('?') >= 0 ? '&' : '?') + '_ajaxkey=' + encodeURIComponent(this.ajaxkey);
            const d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
            this.debug(`[${origin}] ${m} ${u}${d ? ' with ' + d : ''}`);
            fetch(u, {
                method: m,
                headers: h,
                //compress: this.parameters.compress,
                signal: AbortSignal.timeout(this.parameters.timeout),
                body: d
            }).then((res) => {
                if (callback) {
                    res.text().then((textData) => {
                        callback.call(this, textData, res.status, res.headers);
                    });
                }
            }).catch((err) => {
                const s = err.response && err.response.status ? err.response.status : undefined;
                const e = err.response && err.response.data ? err.response.data : err;
                if (errorHandler)
                    errorHandler.call(this, this.getError(e, s, origin));
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
        this.parseResponse = (res, status) => {
            try {
                if (status !== 200)
                    return { type: 'error', response: this.getError('HTTP status: ' + status, status) };
                return typeof res === 'object' ? res : JSON.parse(res);
            }
            catch (e) {
                return { type: 'error', response: this.getError('Parsing error: ' + e.message, status) };
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
        this.getHealth = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getHealth';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = `&full=${!!opts.full}`;
                if (opts.businessCase)
                    p += `&_bc=${encodeURIComponent(opts.businessCase)}`;
                this.sendRequest(`${this.parameters.healthpath}${p}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${res}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
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
        this.login = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.login';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
                    this.clear();
                    this.username = opts.username || opts.login;
                    this.password = opts.password || opts.pwd;
                }
                else if (opts.authtoken || opts.authToken || opts.token) {
                    this.clear();
                    this.authtoken = opts.authtoken || opts.authToken || opts.token;
                }
                this.sendRequest(this.parameters.loginpath, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type || (r.error ? 'error' : 'login')}`);
                    if (r.type === 'error' || r.error) {
                        const err = this.getError(r.response ? r.response : r, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.sessionid = r.response ? r.response.id : r.sessionid;
                        this.debug(`[${origin}] Session ID = ${this.sessionid}`);
                        this.username = r.response ? r.response.login : r.login;
                        if (this.username)
                            this.debug(`[${origin}] Username = ${this.username}`);
                        this.authtoken = r.response ? r.response.authtoken : r.authtoken;
                        if (this.authtoken)
                            this.debug(`[${origin}] Auth token = ${this.authtoken}`);
                        try {
                            const exp = new Date();
                            exp.setTime(r.response ? r.response.authtokenexpiry : r.authtokenexpiry);
                            this.authtokenexpiry = exp;
                        }
                        catch (e) {
                            this.authtokenexpiry = undefined;
                        }
                        if (this.authtokenexpiry)
                            this.debug(`[${origin}] Auth token expiry date = ${this.authtokenexpiry.toLocaleDateString()} ${this.authtokenexpiry.toLocaleTimeString()}`);
                        // Minimal grant from session data
                        this.grant = new Grant({
                            login: this.username,
                            userid: r.response ? r.response.userid : r.userid,
                            firstname: r.response ? r.response.firstname : r.firstname,
                            lastname: r.response ? r.response.lastname : r.lastname,
                            email: r.response ? r.response.email : r.email
                        });
                        resolve.call(this, r.response || r);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Logout
         * @param {function} callback Callback (called upon success)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the logout result
         * @function
         */
        this.logout = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.logout';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                this.sendRequest(this.parameters.logoutpath, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type || (r.error ? 'error' : 'logout')}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response ? r.response : r, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.clear();
                        // Restore session parameter-level credentials if present
                        this.username = this.parameters.username;
                        this.password = this.parameters.password;
                        this.authtoken = this.parameters.authtoken;
                        resolve.call(this, r.response || r);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (err.status === 401) // Removes (expired or deleted) token if any
                        this.authtoken = undefined;
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get grant (current user data)
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlinePicture=false] Inline user picture?
         * @param {boolean} [opts.includeTexts=false] Include texts?
         * @param {boolean} [opts.includeSysparams=false] Include system parameters?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
         * @function
         */
        this.getGrant = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getGrant';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '&web=true'; // Required to be able to include texts
                const txt = !!opts.includeTexts || !!opts.texts; // naming flexibility
                p += `&texts=${encodeURIComponent(txt)}`;
                const pic = !!opts.inlinePicture || !!opts.picture; // naming flexibility
                if (pic)
                    p += '&inline_picture=true';
                const sys = !!opts.includeSysparams || !!opts.sysparams; // naming flexibility
                if (sys)
                    p += '&sysparams=true';
                this.sendRequest(`${this.getPath('getgrant', opts)}${p}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.grant = new Grant(r.response); // Set as Grant
                        if (pic)
                            this.grant.picture = new Doc(this.grant.picture); // Set picture as Document
                        if (txt)
                            this.grant.texts = Object.assign(new Map(), this.grant.texts); // Set texts as Map
                        resolve.call(this, this.grant);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Change password
         * @param {string} pwd Password
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} A promise to the change password result
         * @function
         */
        this.changePassword = (pwd, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.changePassword';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                this.sendRequest(`${this.getPath('setpassword', opts)}&password=${encodeURIComponent(pwd)}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get application info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
         * @function
         */
        this.getAppInfo = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getAppInfo';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                this.sendRequest(this.getPath('getinfo', opts), undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.appinfo = r.response;
                        resolve.call(this, this.appinfo);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get system info
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
         * @function
         */
        this.getSysInfo = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getSysInfo';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                this.sendRequest(this.getPath('sysinfo', opts), undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.sysinfo = r.response;
                        resolve.call(this, this.sysinfo);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get development info
         * @param {string} [module] Module name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
         * @function
         */
        this.getDevInfo = (module, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getDevInfo';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (module)
                    p += `&module=${encodeURIComponent(module)}`;
                this.sendRequest(`${this.getPath('devinfo', opts)}${p}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        if (!module)
                            this.devinfo = r.response;
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get news
         * @param {object} [opts] Options
         * @param {boolean} [opts.inlineImages=false] Inline news images?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
         * @function
         */
        this.getNews = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.getNews';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                const img = !!opts.inlineImages || !!opts.images; // naming flexibility
                if (img)
                    p += '&inline_images=true';
                this.sendRequest(`${this.getPath('news', opts)}${p}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.news = r.response;
                        for (const n of this.news)
                            n.image = new Doc(n.image); // Set image as document
                        resolve.call(this, this.news);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Index search
         * @param {string} query Index search query
         * @param {string} [object] Object
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Add meta data for each result
         * @param {number} [opts.context] Context
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<array>} A promise to a list of index search records
         * @function
         */
        this.indexSearch = (query, object, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'Session.indexSearch';
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = `&request=${encodeURIComponent(query ? query : '')}`;
                if (object)
                    p += `&object=${encodeURIComponent(object)}`;
                if (opts.metadata === true)
                    p += '&_md=true';
                if (opts.context)
                    p += `&context=${encodeURIComponent(opts.context)}`;
                this.sendRequest(`${this.getPath('indexsearch', opts)}${p}`, undefined, (res, status) => {
                    const r = this.parseResponse(res, status);
                    this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = this.getError(r.response, undefined, origin);
                        if (!(opts.error || this.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = this.getError(err, undefined, origin);
                    if (!(opts.error || this.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get business object
         * @param {string} name Business object name
         * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
         * @return {BusinessObject} Business object
         * @function
         */
        this.getBusinessObject = (name, instance) => {
            const cacheKey = this.getBusinessObjectCacheKey(name, instance);
            let obj = this.businessObjectCache[cacheKey];
            if (!obj) {
                obj = new BusinessObject(this, name, instance);
                this.businessObjectCache[cacheKey] = obj;
            }
            return obj;
        };
        /**
         * Get an external object
         * @param {string} name External object name
         * @function
         */
        this.getExternalObject = (name) => {
            return new ExternalObject(this, name);
        };
        /**
         * Get a resource URL
         * @param {string} code Resource code
         * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
         * @param {string} [object] Object name (not required for global resources)
         * @param {string} [objId] Object ID (not required for global resources)
         * @function
         */
        this.getResourceURL = (code, type, object, objId) => {
            return this.parameters.url + this.parameters.respath
                + '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
                + (object ? '&object=' + encodeURIComponent(object) : '')
                + (objId ? '&objid=' + encodeURIComponent(objId) : '')
                + (this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(this.authtoken) : '');
        };
        params = params || {};
        // Within the generic web UI if Simplicite is defined
        const inUI = typeof globalThis.Simplicite !== 'undefined';
        this.endpoint = params.endpoint || (inUI ? globalThis.Simplicite.ENDPOINT : "api" /* SessionParamEndpoint.API */);
        this.authheader = params.authheader || this.constants.DEFAULT_AUTH_HEADER;
        this.log = params.logHandler || ((...args) => {
            // tslint:disable-next-line: no-console
            console.log(args);
        });
        this.info = params.infoHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.info(`INFO - ${args[0]}`);
            else
                // tslint:disable-next-line: no-console
                console.info('INFO', args);
        });
        this.warn = params.warningHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.warn(`WARN - ${args[0]}`);
            else
                // tslint:disable-next-line: no-console
                console.warn(`WARN${args && args.length > 0 && args[0].message ? ` - ${args[0].message}` : ''}`, args);
        });
        this.error = params.errorHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // tslint:disable-next-line: no-console
                console.error(`ERROR - ${args[0]}`);
            else
                // tslint:disable-next-line: no-console
                console.error(`ERROR${args && args.length > 0 && args[0].message ? ` - ${args[0].message}` : ''}`, args);
        });
        this.debugMode = !!params.debug;
        this.debug = params.debugHandler || ((...args) => {
            if (this.debugMode) {
                if (args && args.length === 1 && typeof args[0] === 'string')
                    // tslint:disable-next-line: no-console
                    console.info(`DEBUG - ${args[0]}`);
                else
                    // tslint:disable-next-line: no-console
                    console.log('DEBUG', args);
            }
        });
        const purl = params.url || (inUI && globalThis.Simplicite.URL) || (globalThis.window && globalThis.window.location.origin);
        this.debug('[simplicite] URL parameter = ' + purl);
        if (purl) {
            try {
                params.scheme = purl.replace(/:.*$/, '');
                const u = purl.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
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
        const scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
        if (scheme !== 'http' && scheme !== 'https') {
            this.error('Incorrect scheme [' + params.scheme + ']');
            return;
        }
        const host = params.host || 'localhost';
        const port = params.port || 8080;
        let root = params.root || '';
        if (root === '/')
            root = '';
        let url = scheme + '://' + host;
        if ((scheme === 'http' && port !== 80) || (scheme === 'https' && port !== 443))
            url += ':' + port;
        if (root !== '')
            url += root.startsWith('/') ? root : '/' + root;
        this.debug('[simplicite] Base URL = ' + url);
        const ep = this.endpoint === 'uipublic' ? '' : '/' + this.endpoint;
        this.parameters = {
            scheme,
            host,
            port,
            root,
            url,
            username: params.username,
            password: params.password,
            authtoken: params.authtoken,
            timeout: (params.timeout || 30) * 1000, // milliseconds
            compress: params.compress || true,
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
        this.authtoken = params.authtoken || params.token; // explicit token with naming flexibility
        if (!this.authtoken && inUI) {
            // If in standard UI, get auth token from local storage or from the constant
            const ls = globalThis.window ? globalThis.window.localStorage : null;
            this.authtoken = ls ? ls.getItem('_authToken') : globalThis.Simplicite.AUTH_TOKEN;
        }
        this.ajaxkey = params.ajaxkey; // explicit Ajax key
        if (!this.ajaxkey && inUI) {
            // If in standard UI, get Ajax key from local storage or from the constant
            const ls = globalThis.window ? globalThis.window.localStorage : null;
            this.ajaxkey = ls ? ls.getItem('_ajaxKey') : globalThis.Simplicite.AJAX_KEY;
        }
        this.businessObjectCache = new Map();
    }
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    getPath(action, opts) {
        const bc = opts && opts.businessCase ? `&_bc=${encodeURIComponent(opts.businessCase)}` : '';
        return `${this.parameters.apppath}?action=${encodeURIComponent(action)}${bc}`;
    }
}
/**
 * Document
 * @class
 */
class Doc {
    /**
     * Constructor
     * @param [value] {string|object} Document name or value
     * @param [value.name] Document name
     * @param [value.mime] Document MIME type
     * @param [value.content] Document content
     */
    constructor(value) {
        /**
         * Get the document ID
         * @return {string} ID
         * @function
         */
        this.getId = () => {
            return this.id;
        };
        /**
         * Get the document MIME type
         * @return {string} MIME type
         * @function
         */
        this.getMIMEType = () => {
            return this.mime;
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
         * @return {Doc} This document for chaining
         * @function
         */
        this.setMIMEType = (mime) => {
            this.mime = mime;
            return this; // Chain
        };
        /**
         * Alias to <code>setMIMEType</code>
         * @param {string} mime MIME type
         * @function
         */
        this.setMimeType = this.setMIMEType;
        /**
         * Get the document name
         * @return {string} Name
         * @function
         */
        this.getName = () => {
            return this.name;
        };
        /**
         * Alias to <code>getName</code>
         * @return {string} Name
         * @function
         */
        this.getFileName = this.getName;
        /**
         * Alias to <code>getName</code>
         * @return {string} Name
         * @function
         */
        this.getFilename = this.getName;
        /**
         * Set the document name
         * @param {string} name Name
         * @return {Doc} This document for chaining
         * @function
         */
        this.setName = (name) => {
            this.name = name;
            return this; // Chain
        };
        /**
         * Alias to <code>setName</code>
         * @param {string} name Name
         * @function
         */
        this.setFileName = this.setName;
        /**
         * Alias to <code>setName</code>
         * @param {string} name Name
         * @function
         */
        this.setFilename = this.setName;
        /**
         * Get the document content (encoded in base 64)
         * @return {string} Content
         * @function
         */
        this.getContent = () => {
            return this.content;
        };
        /**
         * Get the document thumbnail (encoded in base 64)
         * @return {string} Thumbnail
         * @function
         */
        this.getThumbnail = () => {
            return this.thumbnail;
        };
        /**
         * Get the document content as an array buffer
         * @return {ArrayBuffer} Content as an array buffer
         * @function
         */
        this.getContentAsArrayBuffer = () => {
            return this.getBuffer(this.content).buffer;
        };
        /**
         * Get the document thumbnail as an array buffer
         * @return {ArrayBuffer} Thumbnail as an array buffer
         * @function
         */
        this.getThumbnailAsArrayBuffer = () => {
            return this.getBuffer(this.thumbnail || '').buffer;
        };
        /**
         * Get the document content as a text
         * @return {string} Content as plain text
         * @function
         */
        this.getContentAsText = () => {
            return this.getBuffer(this.content).toString('utf-8');
        };
        /**
         * Set the document content
         * @param {string} content Content (encoded in base 64)
         * @return {Doc} This document for chaining
         * @function
         */
        this.setContent = (content) => {
            this.content = this.cleanContent(content);
            return this; // Chain
        };
        /**
         * Set the document content from plain text string
         * @param {string} content Content as plain text string
         * @return {Doc} This document for chaining
         * @function
         */
        this.setContentFromText = (content) => {
            this.content = Buffer.from(content, 'utf-8').toString('base64');
            return this; // Chain
        };
        /**
         * Get the document data URL
         * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
         * @return {string} Data URL or nothing if content is empty
         * @function
         */
        this.getDataURL = (thumbnail) => {
            if (this.content)
                return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
        };
        /**
         * Load file
         * @param file File to load
         * @return {promise<Doc>} A promise to the document
         * @function
         */
        this.load = (file) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    if (file) {
                        this.name = file.name;
                        this.mime = file.type;
                        const reader = new FileReader();
                        reader.onload = () => {
                            this.content = reader.result ? this.cleanContent(reader.result) : '';
                            resolve(this);
                        };
                        reader.readAsDataURL(file); // this sets the result as a string
                    }
                    else {
                        this.content = '';
                        resolve(this);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        /**
         * Get the document as a plain value object
         * @return {object} Value object
         * @function
         */
        this.getValue = () => {
            return {
                id: this.id,
                name: this['filename'] && !this.name ? this['filename'] : this.name, // Backward compatibility
                mime: this.mime,
                content: this.content,
                thumbnail: this.thumbnail
            };
        };
        Object.assign(this, typeof value == 'string' ? { name: value } : value || {});
        // Backward compatibility
        if (this['filename'] && !this.name) {
            this.name = this['filename'];
            this['filename'] = undefined;
        }
    }
    cleanContent(content) {
        return content.startsWith('data:') ? content.replace(/data:.*;base64,/, '') : content;
    }
    /**
     * Get the document content as a buffer
     * @param {any} data Content data
     * @return {buffer} Content data as buffer
     * @private
     */
    getBuffer(data) {
        return Buffer.from(data, 'base64');
    }
}
/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
class Grant {
    /**
     * Constructor
     * @param grant {object} Grant object
     */
    constructor(grant) {
        /**
         * Get user ID
         * @return {string} User ID
         * @function
         */
        this.getUserId = () => {
            return this.userid;
        };
        /**
         * Get username
         * @return {string} Username
         * @function
         */
        this.getUsername = () => {
            return this.login;
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
        this.getLang = () => {
            return this.lang;
        };
        /**
         * Get email address
         * @return {string} Email address
         * @function
         */
        this.getEmail = () => {
            return this.email;
        };
        /**
         * Get first name
         * @return {string} First name
         * @function
         */
        this.getFirstname = () => {
            return this.firstname;
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
        this.getLastname = () => {
            return this.lastname;
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
        this.getPictureURL = () => {
            if (this.picture)
                return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
        };
        /**
         * Has responsibility
         * @param {string} group Group name
         * @return {boolean} True if user has a responsibility on the specified group
         * @function
         */
        this.hasResponsibility = (group) => {
            return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
        };
        /**
         * Get system parameter value
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @function
         */
        this.getSystemParameter = (name) => {
            return this.sysparams ? this.sysparams[name] || '' : '';
        };
        /**
         * Alias to <code>getSystemParameter</code>
         * @param {string} name System parameter name
         * @return {string} System parameter value
         * @funtion
         */
        this.getSysParam = this.getSystemParameter;
        /**
         * Get text value
         * @param {string} code Text code
         * @return {string} Text value
         */
        this.T = (code) => {
            return this.texts ? this.texts[code] || '' : '';
        };
        Object.assign(this, grant);
    }
}
/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
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
/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @class
 */
class BusinessObject {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     */
    constructor(ses, name, instance) {
        /**
         * Get meta data
         * @param {object} [opts] Options
         * @param {number} [opts.context] Context
         * @param {string} [opts.contextParam] Context parameter
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<BusinessObjectMetadata>} A promise to the object's meta data (also available as the <code>metadata</code> member)
         * @function
         */
        this.getMetaData = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getMetaData';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.contextParam)
                    p += '&contextparam=' + encodeURIComponent(opts.contextParam);
                ses.sendRequest(this.path + '&action=metadata' + p, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.metadata = r.response;
                        resolve.call(this, this.metadata);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
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
        this.getName = () => {
            return this.metadata.name;
        };
        /**
         * Get instance name
         * @return {string} Instance name
         * @function
         */
        this.getInstance = () => {
            return this.metadata.instance;
        };
        /**
         * Get display label
         * @return {string} Display label
         * @function
         */
        this.getLabel = () => {
            return this.metadata.label;
        };
        /**
         * Get help
         * @return {string} Help
         * @function
         */
        this.getHelp = () => {
            return this.metadata.help;
        };
        /**
         * Get all fields definitions
         * @return {array} Array of field definitions
         * @function
         */
        this.getFields = () => {
            return this.metadata.fields;
        };
        /**
         * Get a field definition
         * @param {string} fieldName Field name
         * @return {object} Field definition
         * @function
         */
        this.getField = (fieldName) => {
            const fs = this.getFields();
            let n = 0;
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
        this.getRowIdFieldName = () => {
            return this.metadata.rowidfield;
        };
        /**
         * Get row ID field definition
         * @return {object} Row ID field definition
         * @function
         */
        this.getRowIdField = () => {
            return this.getField(this.getRowIdFieldName());
        };
        /**
         * Get links
         * @return {array} Array of links
         * @function
         */
        this.getLinks = () => {
            return this.metadata.links;
        };
        /**
         * Get field type
         * @param {(string|object)} field Field name or definition
         * @return {string} Type (one of <code>constants.TYPE_*</code>)
         * @function
         */
        this.getFieldType = (field) => {
            if (typeof field === 'string')
                field = this.getField(field);
            if (field)
                return field.type;
        };
        /**
         * Get field label
         * @param {(string|object)} field Field name or definition
         * @return {string} Field label
         * @function
         */
        this.getFieldLabel = (field) => {
            if (typeof field === 'string')
                field = this.getField(field);
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
        this.getFieldValue = (field, item) => {
            if (!item)
                item = this.item;
            if (field && item) {
                const val = item[typeof field === 'string' ? field : field.name];
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
        this.getFieldListValue = (field, item) => {
            if (typeof field === 'string')
                field = this.getField(field);
            const val = this.getFieldValue(field, item);
            return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
        };
        /**
         * Get the list colors of a list of values field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string} List color and bgcolor
         * @function
         */
        this.getFieldListColors = (field, item) => {
            if (typeof field === 'string')
                field = this.getField(field);
            const val = this.getFieldValue(field, item);
            return field && field.listOfValues ? this.getListColors(field.listOfValues, val) : val;
        };
        /**
         * Get the data URL of an inlined document/image field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {object} [item] Item (defaults to current item)
         * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
         * @function
         */
        this.getFieldDataURL = (field, item) => {
            if (typeof field !== 'string')
                field = field.fullinput || field.name;
            const val = this.getFieldValue(field, item);
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
        this.getFieldDocument = (field, item) => {
            if (typeof field !== 'string')
                field = field.fullinput || field.input || field.name;
            const val = this.getFieldValue(field, item);
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
        this.getFieldDocumentURL = (field, item, thumbnail) => {
            if (typeof field !== 'string')
                field = field.fullinput || field.input || field.name;
            let val = this.getFieldValue(field, item);
            if (val && val.mime) // Inlined
                val = val.id;
            if (val)
                return this.session.parameters.url + this.session.parameters.docpath
                    + '?object=' + encodeURIComponent(this.metadata.name)
                    + '&inst=' + encodeURIComponent(this.metadata.instance)
                    + '&field=' + encodeURIComponent(field)
                    + '&row_id=' + encodeURIComponent(this.getRowId(item))
                    + '&doc_id=' + encodeURIComponent(val)
                    + (thumbnail ? '&thumbnail=true' : '')
                    + (this.session.authtoken ? '&_x_simplicite_authorization_=' + encodeURIComponent(this.session.authtoken) : '');
        };
        /**
         * Get list item value for code
         * @param {array} list List of values
         * @param {string} code Code
         * @return {string} Value
         * @function
         */
        this.getListValue = (list, code) => {
            if (list) {
                for (const l of list) {
                    if (l.code === code)
                        return l.value;
                }
            }
            return code;
        };
        /**
         * Get list item colors (color and background color) for code
         * @param {array} list List of values
         * @param {string} code Code
         * @return {any} Colors
         * @function
         */
        this.getListColors = (list, code) => {
            if (list) {
                for (const l of list) {
                    if (l.code === code)
                        return { color: l.color, bgcolor: l.bgcolor };
                }
            }
            return { color: 'inherit', bgcolor: 'inherit' };
        };
        /**
         * Set value of field for item (or current item)
         * @param {(string|object)} field Field name or definition
         * @param {(string|object)} value Value
         * @param {object} [item] Item (defaults to current item)
         * @function
         */
        this.setFieldValue = (field, value, item) => {
            if (!item)
                item = this.item;
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
        this.isRowIdField = (field) => {
            return !field.ref && field.name === this.metadata.rowidfield;
        };
        /**
         * Is the field a timestamp field?
         * @param {object} field Field definition
         * @return {boolean} True if the field is a timestamp field
         * @function
         */
        this.isTimestampField = (field) => {
            const n = field.name;
            return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
        };
        /**
         * Get current filters
         * @param {object} [opts] Options
         * @param {number} [opts.context] Context
         * @param {boolean} [opts.reset] Reset filters?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
         * @function
         */
        this.getFilters = (opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getFilters';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (opts.context)
                    p += '&context=' + encodeURIComponent(opts.context);
                if (opts.reset)
                    p += '&reset=' + !!opts.reset;
                ses.sendRequest(this.path + '&action=filters' + p, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.filters = r.response;
                        resolve.call(this, this.filters);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Build options parameters
         * @param {object} options Options
         * @return {string} Option parameters
         * @private
         */
        this.getReqOptions = (options) => {
            let opts = '';
            if (options.context)
                opts += `&context=${encodeURIComponent(options.context)}`;
            const id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
            if (id)
                opts += `&inline_documents=${encodeURIComponent(id.join ? id.join(',') : id)}`;
            const it = options.inlineThumbs || options.inlineThumbnails; // Naming flexibility
            if (it)
                opts += `&inline_thumbnails=${encodeURIComponent(it.join ? it.join(',') : it)}`;
            const io = options.inlineObjs || options.inlineObjects; // Naming flexibility
            if (io)
                opts += `&inline_objects=${encodeURIComponent(io.join ? io.join(',') : io)}`;
            return opts;
        };
        /**
         * Convert usual wildcards to filters wildcards
         * @param {object} filter Filter
         * @return {string} Filter with wildcards converted
         * @private
         */
        this.convertFilterWildCards = (filter) => {
            return typeof filter === 'string' ? filter.replace(new RegExp('\\*', 'g'), '%').replace(new RegExp('\\?', 'g'), '_') : filter;
        };
        /**
         * Build request parameters
         * @param {object} data Data
         * @param {boolean} [filters] Filters? Used to convert wildcards if needed
         * @return {string} Request parameters
         * @private
         */
        this.getReqParams = (data, filters) => {
            let p = '';
            if (!data)
                return p;
            for (const i of Object.entries(data)) {
                const k = i[0];
                let d = i[1] || '';
                if (d instanceof Doc)
                    d = d.getValue();
                if (d.name && d.content) { // Document?
                    if (d.content.startsWith('data:')) // Flexibility = extract content from a data URL (just in case...)
                        d.content = d.content.replace(/data:.*;base64,/, '');
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
                }
                else if (d.object && d.row_id) { // Object?
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
                }
                else if (d.sort) { // Array?
                    for (const dd of d)
                        p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? this.convertFilterWildCards(dd) : dd);
                }
                else {
                    p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(filters ? this.convertFilterWildCards(d) : d);
                }
            }
            return p;
        };
        /**
         * Get count
         * @param {object} [filters] Filters (defaults to current filters)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the count
         * @function
         */
        this.getCount = (filters, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getCount';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                this.filters = filters || {};
                ses.sendRequest(this.getPath('count', opts), this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.count = r.response.count;
                        this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        this.list = [];
                        resolve.call(this, this.count);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Search
         * @param {object} [filters] Filters (defaults to current filters)
         * @param {object} [opts] Options
         * @param {number} [opts.page] Page number, a non paginated list is returned if not set
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {boolean} [opts.visible] Return only visible fields?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<array>} Promise to a list of records (also available as the <code>list</code> member)
         * @function
         */
        this.search = (filters, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.search';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = this.getReqOptions(opts);
                if (opts.page > 0)
                    p += `&page=${opts.page - 1}`;
                if (opts.metadata === true)
                    p += '&_md=true';
                if (opts.visible === true)
                    p += '&_visible=true';
                this.filters = filters || {};
                ses.sendRequest(`${this.getPath('search', opts)}${p}`, this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        if (res.meta)
                            this.metadata = r.response.meta;
                        this.count = r.response.count;
                        this.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
                        this.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
                        this.list = r.response.list;
                        resolve.call(this, this.list);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {string[]} [opts.fields] List of field names to return, all fields are returned by default
         * @param {string} [opts.treeview] Return the named tree view structure
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the record (also available as the <code>item</code> member)
         * @function
         */
        this.get = (rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.get';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = this.getReqOptions(opts);
                const tv = opts.treeView;
                if (tv)
                    p += `&treeview=${encodeURIComponent(tv)}`;
                if (opts.fields) {
                    for (const f of opts.fields.length)
                        p += `&fields=${encodeURIComponent(f.replace('.', '__'))}`;
                }
                if (opts.metadata)
                    p += '&_md=true';
                if (opts.social)
                    p += '&_social=true';
                ses.sendRequest(`${this.getPath('get', opts)}&${this.metadata.rowidfield}=${encodeURIComponent(rowId || this.getRowId())}${p}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        if (r.response.meta)
                            this.metadata = r.response.meta;
                        if (r.response.data)
                            this.item = tv ? r.response.data.item : r.response.data;
                        else
                            this.item = tv ? r.response.item : r.response;
                        resolve.call(this, tv ? r.response : this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get for create
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCreate = (opts) => __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_CREATE;
            return this.get(constants.DEFAULT_ROW_ID, opts);
        });
        /**
         * Get for update
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
         * @function
         */
        this.getForUpdate = (rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_UPDATE;
            return this.get(rowId || this.getRowId(), opts);
        });
        /**
         * Get for copy
         * @param {string} [rowId] Row ID to copy (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
         * @function
         */
        this.getForCopy = (rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_COPY;
            return this.get(rowId || this.getRowId(), opts);
        });
        /**
         * Get for delete
         * @param {string} [rowId] Row ID (defaults to current item's row ID)
         * @param {object} [opts] Options
         * @param {boolean} [opts.metadata=false] Refresh meta data?
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
         * @function
         */
        this.getForDelete = (rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            opts = opts || {};
            delete opts.treeview; // Inhibited in this context
            delete opts.fields; // Inhibited in this context
            opts.context = constants.CONTEXT_DELETE;
            return this.get(rowId || this.getRowId(), opts);
        });
        /**
         * Get specified or current item's row ID value
         * @param {object} [item] Item (defaults to current item)
         * @return {string} Item's row ID value
         * @function
         */
        this.getRowId = (item) => {
            item = item || this.item;
            if (item)
                return item[this.getRowIdFieldName()];
        };
        /**
         * Populate
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
         * @function
         */
        this.populate = (item, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.populate';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('populate', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get the linked list for a list of values field and its specified value(s)
         * @param {(string|object)} field Field name or definition
         * @param {(string|object)} linkedField Linked field name or definition
         * @param {string|boolean} [code] List of values code(s) (if multiple codes use ; as separator), defaults to current field value if empty, means "all" if true
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
         * @function
         */
        this.getFieldLinkedList = (field, linkedField, code, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getFieldLinkedList';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (typeof field !== 'string')
                    field = field.fullinput || field.name;
                if (typeof linkedField !== 'string')
                    linkedField = linkedField.fullinput || linkedField.name;
                let all = false;
                if (code === true) {
                    all = true;
                    code = undefined;
                }
                else if (typeof code === 'undefined') {
                    code = this.getFieldValue(field);
                }
                ses.sendRequest(this.getPath('getlinkedlist', opts), this.getReqParams({ origin: field, input: linkedField, code, all }), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.result ? r.response.result : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Save (create or update depending on item row ID value)
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
         * @function
         */
        this.save = (item, opts) => __awaiter(this, void 0, void 0, function* () {
            if (item)
                this.item = item;
            const rowId = this.item[this.metadata.rowidfield];
            if (!rowId || rowId === constants.DEFAULT_ROW_ID)
                return this.create(item, opts);
            else
                return this.update(item, opts);
        });
        /**
         * Create (create or update)
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
         * @function
         */
        this.create = (item, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.create';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                this.item.row_id = constants.DEFAULT_ROW_ID;
                ses.sendRequest(`${this.getPath('create', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Update
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
         * @function
         */
        this.update = (item, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.update';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('update', opts)}${this.getReqOptions(opts)}`, this.getReqParams(this.item), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = r.response.data ? r.response.data : r.response;
                        resolve.call(this, this.item);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Delete
         * @param {object} [item] Item (defaults to current item)
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise (the <code>item</code> member is emptied)
         * @function
         */
        this.del = (item, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.del';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (item)
                    this.item = item;
                ses.sendRequest(`${this.getPath('delete', opts)}&${this.metadata.rowidfield}=${encodeURIComponent(this.item[this.metadata.rowidfield])}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        this.item = undefined;
                        delete r.response.undoredo;
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Invoke a custom action
         * @param {string} action Action name
         * @param {string} [rowId] Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.parameters] Optional action parameters as key/value pairs
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<string|object>} A promise to the action result
         * @function
         */
        this.action = (action, rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.action(${action})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = rowId ? `&${this.getRowIdFieldName()}=${encodeURIComponent(rowId)}` : '';
                ses.sendRequest(`${this.getPath(action, opts)}${p}`, this.getReqParams(opts.parameters), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Build a pivot table
         * @param {string} ctb Pivot table name
         * @param {object} [opts] Options
         * @param {boolean} [opts.cubes] Data as cubes?
         * @param {object} [opts.filters] Filters, by default current filters are used
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
         * @function
         */
        this.crosstab = (ctb, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.crosstab(${ctb})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                ses.sendRequest(`${this.getPath(opts.cubes ? 'crosstabcubes' : 'crosstab', opts)}&crosstab=${encodeURIComponent(ctb)}`, this.getReqParams(opts.filters || this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Build a custom publication
         * @param {string} prt Publication name
         * @param {string} [rowId] Row ID
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<Doc>} A promise to the document of the publication
         * @function
         */
        this.print = (prt, rowId, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.print(${prt})`;
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                let p = '';
                if (opts.all)
                    p += '&all=' + !!opts.all;
                if (opts.mailing)
                    p += '&mailing=' + !!opts.mailing;
                if (rowId)
                    p += `&${this.getRowIdFieldName()}=${encodeURIComponent(rowId)}`;
                ses.sendRequest(`${this.getPath('print', opts)}&printtemplate=${encodeURIComponent(prt)}${p}`, undefined, (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, new Doc(r.response));
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get place map data
         * @param {string} pcm Place map name
         * @param {string} [filters] Filters
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<any>} A promise to the place map data
         * @function
         */
        this.placemap = (pcm, filters, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = `BusinessObject.placemap(${pcm})`;
            const ses = this.session;
            this.filters = filters || {};
            opts = opts || {};
            return new Promise((resolve, reject) => {
                if (opts.filters)
                    this.filters = opts.filters;
                ses.sendRequest(`${this.getPath('placemap', opts)}&placemap=${encodeURIComponent(pcm)}`, this.getReqParams(this.filters, true), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug('[' + origin + '] HTTP status = ' + status + ', response type = ' + r.type);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        resolve.call(this, r.response);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Set an object parameter
         * @param {string} param Parameter name
         * @param {string} value Parameter value
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise
         * @function
         */
        this.setParameter = (param, value, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.setParameter';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = { name: param };
                if (value)
                    p.value = value;
                ses.sendRequest(this.getPath('setparameter', opts), this.getReqParams(p), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get an object parameter
         * @param {string} param Parameter name
         * @param {object} [opts] Options
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the parameter value
         * @function
         */
        this.getParameter = (param, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'BusinessObject.getParameter';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                const p = { name: param };
                ses.sendRequest(this.getPath('getparameter', opts), this.getReqParams(p), (res, status) => {
                    const r = ses.parseResponse(res, status);
                    ses.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
                    if (r.type === 'error') {
                        const err = ses.getError(r.response, undefined, origin);
                        if (!(opts.error || ses.error).call(this, err))
                            reject.call(this, err);
                    }
                    else {
                        const result = r.response.result;
                        resolve.call(this, result);
                    }
                }, (err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Get an object resource URL
         * @param {string} code Resource code
         * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
         * @return {string} Object resource URL
         * @function
         */
        this.getResourceURL = (code, type) => {
            return this.session.getResourceURL(code, type, this.metadata.name, this.metadata.id);
        };
        this.session = ses;
        const inst = instance || 'api_' + name;
        this.metadata = new BusinessObjectMetadata(name, inst);
        this.cacheKey = this.session.getBusinessObjectCacheKey(name, inst);
        this.path = this.session.parameters.objpath + '?object=' + encodeURIComponent(name) + '&inst=' + encodeURIComponent(inst);
        this.item = {};
        this.filters = {};
        this.list = [];
    }
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    getPath(action, opts) {
        const bc = opts && opts.businessCase ? `&_bc=${encodeURIComponent(opts.businessCase)}` : '';
        return `${this.path}&action=${encodeURIComponent(action)}${bc}`;
    }
}
/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
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
}
/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @class
 */
class ExternalObject {
    /**
     * Constructor
     * @param {Session} ses Session
     * @param {string} name Business object name
     */
    constructor(ses, name) {
        /**
         * Get name
         * @return {string} Name
         * @function
         */
        this.getName = () => {
            return this.metadata.name;
        };
        /**
         * Build URL-encoded parameters
         * @param {object} params URL parameters as key/value pairs
         * @return {string} URL-encoded parameters
         * @function
         */
        this.callParams = (params) => {
            let p = '';
            if (!params)
                return p;
            for (const i of Object.entries(params)) {
                const k = i[0];
                const v = i[1] || '';
                if (v.sort) { // Array ?
                    for (const vv of v)
                        p += (p !== '' ? '&' : '') + k + '=' + encodeURIComponent(vv);
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
         * @param {string} [opts.path] Absolute or relative path (e.g. absolute '/my/mapped/upath' or relative 'my/additional/path')
         * @param {object} [opts.method] Optional method 'GET', 'POST', 'PUT' or 'DELETE' (defaults to 'GET' if data is not set or 'POST' if data is set)
         * @param {function} [opts.contentType] Optional data content type (for 'POST' and 'PUT' methods only)
         * @param {function} [opts.accept] Optional accepted response type (e.g. 'application/json")
         * @param {function} [opts.error] Error handler function
         * @param {string} [opts.businessCase] Business case label
         * @return {promise<object>} Promise to the external object content
         * @function
         */
        this.call = (params, data, opts) => __awaiter(this, void 0, void 0, function* () {
            const origin = 'ExternalObject.call';
            const ses = this.session;
            opts = opts || {};
            return new Promise((resolve, reject) => {
                let p = '';
                if (params)
                    p = this.callParams(params);
                if (opts.businessCase)
                    p += `_bc=${encodeURIComponent(opts.businessCase)}`;
                const m = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
                const h = {};
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
                let b = ses.getBearerTokenHeader();
                if (b) {
                    h[ses.authheader] = b;
                }
                else {
                    b = ses.getBasicAuthHeader();
                    if (b)
                        h[ses.authheader] = b;
                }
                const u = ses.parameters.url + (opts.path && opts.path.startsWith('/') ? opts.path : this.path + (opts.path ? '/' + opts.path : '')) + (p !== '' ? '?' + p : '');
                const d = data ? (typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)) : undefined;
                ses.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + (d ? ' with ' + d : ''));
                fetch(u, {
                    method: m,
                    headers: h,
                    //compress: ses.parameters.compress,
                    signal: AbortSignal.timeout(ses.parameters.timeout),
                    body: d
                }).then((res) => {
                    const type = res.headers.get('content-type');
                    ses.debug(`[${origin}] HTTP status = ${res.status}, response content type = ${type}`);
                    if (type && type.startsWith('application/json')) { // JSON
                        res.json().then(jsonData => {
                            resolve.call(this, jsonData, res.status, res.headers);
                        }).catch((err) => {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(this, err))
                                reject.call(this, err);
                        });
                    }
                    else if (type && (type.startsWith('text/') || type.startsWith('application/yaml'))) { // Text
                        res.text().then(textData => {
                            resolve.call(this, textData, res.status, res.headers);
                        }).catch((err) => {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(this, err))
                                reject.call(this, err);
                        });
                    }
                    else { // Binary
                        res.arrayBuffer().then(binData => {
                            resolve.call(this, binData, res.status, res.headers);
                        }).catch((err) => {
                            err = ses.getError(err, undefined, origin);
                            if (!(opts.error || ses.error).call(this, err))
                                reject.call(this, err);
                        });
                    }
                }).catch((err) => {
                    err = ses.getError(err, undefined, origin);
                    if (!(opts.error || ses.error).call(this, err))
                        reject.call(this, err);
                });
            });
        });
        /**
         * Alias to <code>call</code>
         * @function
         */
        this.invoke = this.call;
        this.session = ses;
        this.metadata = new ExternalObjectMetadata(name);
        this.path = `${this.session.parameters.extpath}/${encodeURIComponent(name)}`;
    }
}
export default {
    constants,
    session,
    Session,
    Doc,
    Grant,
    BusinessObject,
    BusinessObjectMetadata,
    ExternalObject
};
//# sourceMappingURL=simplicite.js.map