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
import { constants } from './constants';
import { Grant } from './grant';
import { Doc } from './doc';
import { BusinessObject } from './businessobject';
import { ExternalObject } from './externalobject';
/**
 * Simplicite application session.
 * @param {object} params Parameters
 * @param {string} params.url Base URL of the Simplicite application
 * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.host Hostname or IP address (e.g. <code>'host.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
 * @param {boolean} [params.endpoint='api'] Endpoint (<code>'api'|'ui'|'uipublic'</code>)
 * @param {string} [params.username] Username (not needed for the public UI endpoint)
 * @param {string} [params.password] Password (not needed for the public UI endpoint)
 * @param {string} [params.authtoken] Authentication token (if set, username and password are not needed; not needed for the public UI endpoint)
 * @param {string} [params.authheader] Authorization HTTP header name (defaults to the standard <code>Authorization</code>, the alternative is the value of the <code>SIMPLICITE_AUTH_HEADER</code> constant, not needed for public endpoint)
 * @param {string} [params.ajaxkey] Ajax key (only useful for usage from the generic UI)
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
         * Alias to getHealth
         * @param {object} [opts] Options
         * @param {boolean} [opts.full=false] Full health check?
         * @param {function} [opts.error] Error handler function
         * @return {promise<object>} Promise to the health data
         * @function
         */
        this.health = this.getHealth;
        params = params || {};
        // Within the generic web UI if Simplicite is defined
        const inUI = typeof globalThis.Simplicite !== 'undefined';
        this.endpoint = params.endpoint || (inUI ? globalThis.Simplicite.ENDPOINT : "api" /* SessionParamEndpoint.API */);
        this.authheader = params.authheader || this.constants.DEFAULT_AUTH_HEADER;
        this.log = params.logHandler || ((...args) => {
            // eslint-disable-next-line no-console
            console.log(args);
        });
        this.info = params.infoHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.info(`INFO - ${args[0]}`);
            else
                // eslint-disable-next-line no-console
                console.info('INFO', args);
        });
        this.warn = params.warningHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.warn(`WARN - ${args[0]}`);
            else
                // eslint-disable-next-line no-console
                console.warn(`WARN${args && args.length > 0 && args[0].message ? ` - ${args[0].message}` : ''}`, args);
        });
        this.error = params.errorHandler || ((...args) => {
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.error(`ERROR - ${args[0]}`);
            else
                // eslint-disable-next-line no-console
                console.error(`ERROR${args && args.length > 0 && args[0].message ? ` - ${args[0].message}` : ''}`, args);
        });
        this.debugMode = !!params.debug;
        this.debug = params.debugHandler || ((...args) => {
            if (this.debugMode) {
                if (args && args.length === 1 && typeof args[0] === 'string')
                    // eslint-disable-next-line no-console
                    console.info(`DEBUG - ${args[0]}`);
                else
                    // eslint-disable-next-line no-console
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
     * Get API client module version
     * @function
     */
    getModuleVersion() {
        return this.constants.MODULE_VERSION;
    }
    /**
     * Set username
     * @param {string} usr Username
     * @function
     */
    setUsername(usr) {
        this.username = usr;
    }
    /**
     * Set password
     * @param {string} pwd Password
     * @function
     */
    setPassword(pwd) {
        this.password = pwd;
    }
    /**
     * Set auth token
     * @param {string} token Auth token
     * @function
     */
    setAuthToken(token) {
        this.authtoken = token;
    }
    /**
     * Set auth token expiry date
     * @param {Date} expiry Auth token expiry
     * @function
     */
    setAuthTokenExpiryDate(expiry) {
        this.authtokenexpiry = expiry;
    }
    /**
     * Is the auth token expired?
     * @return {boolean} true if the auth token is expired
     * @function
     */
    isAuthTokenExpired() {
        return this.authtokenexpiry ? new Date() > this.authtokenexpiry : false;
    }
    /**
     * Set Ajax key
     * @param {string} key Ajax key
     * @function
     */
    setAjaxKey(key) {
        this.ajaxkey = key;
    }
    /**
     * Get business object cache key
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {object} Business object cache key
     * @function
     */
    getBusinessObjectCacheKey(name, instance) {
        return name + ':' + (instance || 'js_' + name);
    }
    /**
     * Clears all data (credentials, objects, ...)
     * @function
     */
    clear() {
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
    }
    /**
     * Basic HTTP authorization header value
     * @return {string} HTTP authorization header value
     * @function
     */
    getBasicAuthHeader() {
        return this.username && this.password
            ? 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')
            : undefined;
    }
    /**
     * Get bearer token header value
     * @return {string} Bearer token header value
     * @function
     */
    getBearerTokenHeader() {
        return this.authtoken
            ? 'Bearer ' + this.authtoken
            : undefined;
    }
    /**
     * Get error object
     * @param {(string|object)} err Error
     * @param {string} err.message Error message
     * @param {number} [status] Optional error status (defaults to 200)
     * @param {string} [origin] Optional error origin
     * @return {object} Error object
     * @function
     */
    getError(err, status, origin) {
        if (typeof err === 'string') { // plain text error
            return { message: err, status: status || 200, origin };
        }
        else if (err.response) { // wrapped error
            if (typeof err.response === 'string') {
                return { message: err.response, status: status || 200, origin };
            }
            else {
                if (origin) {
                    try {
                        err.response.origin = origin;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catch (e) {
                        /* ignore */
                    }
                }
                return err.response;
            }
        }
        else { // other cases
            if (origin) {
                try {
                    err.origin = origin;
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catch (e) {
                    /* ignore */
                }
            }
            return err;
        }
    }
    /**
     * Compress data as blob
     * @param data {string|any} Data to compress
     * @return {Promise<Blob>} Promise to the compressed data blob
     */
    compressData(data) {
        const s = typeof data === 'string'
            ? new Blob([data], { type: 'text/plain' }).stream()
            : new Blob([JSON.stringify(data)], { type: 'application/json' }).stream();
        const cs = s.pipeThrough(new CompressionStream('gzip'));
        return new Response(cs).blob();
    }
    /**
     * Uncompress blob
     * @param blob {Blob} Compressed data blob
     * @return {Promise<string>} Promise to the uncompressed string
     */
    uncompressData(blob) {
        const us = blob.stream().pipeThrough(new DecompressionStream('gzip'));
        return new Response(us).text();
    }
    /**
     * Send request
     * @param {string} path Path
     * @param {object} [data] Data
     * @param {function} [callback] Callback
     * @param {function} [errorHandler] Error handler
     * @function
     */
    sendRequest(path, data, callback, errorHandler) {
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
    }
    /**
     * Parse response
     * @param {object} res Response to parse
     * @param {number} [status=200] HTTP status
     * @return {object} Error object
     * @function
     */
    parseResponse(res, status) {
        try {
            if (status !== 200)
                return { type: 'error', response: this.getError('HTTP status: ' + status, status) };
            return typeof res === 'object' ? res : JSON.parse(res);
        }
        catch (e) {
            return { type: 'error', response: this.getError('Parsing error: ' + e.message, status) };
        }
    }
    /**
     * Get health check (no need to be authenticated)
     * @param {object} [opts] Options
     * @param {boolean} [opts.full=false] Full health check?
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the health data
     * @function
     */
    getHealth(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
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
    login(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    }
    /**
     * Logout
     * @param {function} callback Callback (called upon success)
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @return {promise<object>} Promise to the logout result
     * @function
     */
    logout(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    getGrant(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Change password
     * @param {string} pwd Password
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the change password result
     * @function
     */
    changePassword(pwd, opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Get application info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the application info (also available as the <code>appinfo</code> member)
     * @function
     */
    getAppInfo(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Get system info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the system info (also available as the <code>sysinfo</code> member)
     * @function
     */
    getSysInfo(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Get development info
     * @param {string} [module] Module name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the development info (also available as the <code>devinfo</code> member)
     * @function
     */
    getDevInfo(module, opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Get news
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlineImages=false] Inline news images?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} A promise to the list of news (also available as the <code>news</code> member)
     * @function
     */
    getNews(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
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
    indexSearch(query, object, opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    /**
     * Get business object
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {BusinessObject} Business object
     * @function
     */
    getBusinessObject(name, instance) {
        const cacheKey = this.getBusinessObjectCacheKey(name, instance);
        let obj = this.businessObjectCache[cacheKey];
        if (!obj) {
            obj = new BusinessObject(this, name, instance);
            this.businessObjectCache[cacheKey] = obj;
        }
        return obj;
    }
    /**
     * Get an external object
     * @param {string} name External object name
     * @function
     */
    getExternalObject(name) {
        return new ExternalObject(this, name);
    }
    /**
     * Get a resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @param {string} [object] Object name (not required for global resources)
     * @param {string} [objId] Object ID (not required for global resources)
     * @function
     */
    getResourceURL(code, type, object, objId) {
        return this.parameters.url + this.parameters.respath
            + '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
            + (object ? '&object=' + encodeURIComponent(object) : '')
            + (objId ? '&objid=' + encodeURIComponent(objId) : '')
            + (this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(this.authtoken) : '');
    }
}
export { Session };
//# sourceMappingURL=session.js.map