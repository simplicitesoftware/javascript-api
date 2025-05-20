"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var buffer_1 = require("buffer"); // Browser polyfill for Buffer
var constants_1 = require("./constants");
var grant_1 = require("./grant");
var doc_1 = require("./doc");
var businessobject_1 = require("./businessobject");
var externalobject_1 = require("./externalobject");
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
        this.constants = constants_1.constants;
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
        var inUI = typeof globalThis.Simplicite !== 'undefined';
        this.endpoint = params.endpoint || (inUI ? globalThis.Simplicite.ENDPOINT : "api" /* SessionParamEndpoint.API */);
        this.authheader = params.authheader || this.constants.DEFAULT_AUTH_HEADER;
        this.log = params.logHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // eslint-disable-next-line no-console
            console.log(args);
        });
        this.info = params.infoHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.info("INFO - ".concat(args[0]));
            else
                // eslint-disable-next-line no-console
                console.info('INFO', args);
        });
        this.warn = params.warningHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.warn("WARN - ".concat(args[0]));
            else
                // eslint-disable-next-line no-console
                console.warn("WARN".concat(args && args.length > 0 && args[0].message ? " - ".concat(args[0].message) : ''), args);
        });
        this.error = params.errorHandler || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args && args.length === 1 && typeof args[0] === 'string')
                // eslint-disable-next-line no-console
                console.error("ERROR - ".concat(args[0]));
            else
                // eslint-disable-next-line no-console
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
                    // eslint-disable-next-line no-console
                    console.info("DEBUG - ".concat(args[0]));
                else
                    // eslint-disable-next-line no-console
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
            var ls = globalThis.window ? globalThis.window.localStorage : null;
            this.authtoken = ls ? ls.getItem('_authToken') : globalThis.Simplicite.AUTH_TOKEN;
        }
        this.ajaxkey = params.ajaxkey; // explicit Ajax key
        if (!this.ajaxkey && inUI) {
            // If in standard UI, get Ajax key from local storage or from the constant
            var ls = globalThis.window ? globalThis.window.localStorage : null;
            this.ajaxkey = ls ? ls.getItem('_ajaxKey') : globalThis.Simplicite.AJAX_KEY;
        }
        this.businessObjectCache = new Map();
    }
    /**
     * Get API client module version
     * @function
     */
    Session.prototype.getModuleVersion = function () {
        return this.constants.MODULE_VERSION;
    };
    /**
     * Set username
     * @param {string} usr Username
     * @function
     */
    Session.prototype.setUsername = function (usr) {
        this.username = usr;
    };
    /**
     * Set password
     * @param {string} pwd Password
     * @function
     */
    Session.prototype.setPassword = function (pwd) {
        this.password = pwd;
    };
    /**
     * Set auth token
     * @param {string} token Auth token
     * @function
     */
    Session.prototype.setAuthToken = function (token) {
        this.authtoken = token;
    };
    /**
     * Set auth token expiry date
     * @param {Date} expiry Auth token expiry
     * @function
     */
    Session.prototype.setAuthTokenExpiryDate = function (expiry) {
        this.authtokenexpiry = expiry;
    };
    /**
     * Is the auth token expired?
     * @return {boolean} true if the auth token is expired
     * @function
     */
    Session.prototype.isAuthTokenExpired = function () {
        return this.authtokenexpiry ? new Date() > this.authtokenexpiry : false;
    };
    /**
     * Set Ajax key
     * @param {string} key Ajax key
     * @function
     */
    Session.prototype.setAjaxKey = function (key) {
        this.ajaxkey = key;
    };
    /**
     * Get business object cache key
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {object} Business object cache key
     * @function
     */
    Session.prototype.getBusinessObjectCacheKey = function (name, instance) {
        return name + ':' + (instance || 'js_' + name);
    };
    /**
     * Clears all data (credentials, objects, ...)
     * @function
     */
    Session.prototype.clear = function () {
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
    Session.prototype.getBasicAuthHeader = function () {
        return this.username && this.password
            ? 'Basic ' + buffer_1.Buffer.from(this.username + ':' + this.password).toString('base64')
            : undefined;
    };
    /**
     * Get bearer token header value
     * @return {string} Bearer token header value
     * @function
     */
    Session.prototype.getBearerTokenHeader = function () {
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
    Session.prototype.getError = function (err, status, origin) {
        if (typeof err === 'string') { // plain text error
            return { message: err, status: status || 200, origin: origin };
        }
        else if (err.response) { // wrapped error
            if (typeof err.response === 'string') {
                return { message: err.response, status: status || 200, origin: origin };
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
    };
    /**
     * Compress data as blob
     * @param data {string|any} Data to compress
     * @return {Promise<Blob>} Promise to the compressed data blob
     */
    Session.prototype.compressData = function (data) {
        var s = typeof data === 'string'
            ? new Blob([data], { type: 'text/plain' }).stream()
            : new Blob([JSON.stringify(data)], { type: 'application/json' }).stream();
        var cs = s.pipeThrough(new CompressionStream('gzip'));
        return new Response(cs).blob();
    };
    /**
     * Uncompress blob
     * @param blob {Blob} Compressed data blob
     * @return {Promise<string>} Promise to the uncompressed string
     */
    Session.prototype.uncompressData = function (blob) {
        var us = blob.stream().pipeThrough(new DecompressionStream('gzip'));
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
    Session.prototype.sendRequest = function (path, data, callback, errorHandler) {
        var _this = this;
        var origin = 'Session.sendRequest';
        var m = data ? 'POST' : 'GET';
        var h = {};
        if (data)
            h['content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        h.accept = 'application/json';
        var b = this.getBearerTokenHeader();
        if (b) {
            h[this.authheader] = b;
        }
        else {
            b = this.getBasicAuthHeader();
            if (b)
                h[this.authheader] = b;
        }
        var u = this.parameters.url + (path || '/');
        if (this.ajaxkey)
            u += (u.indexOf('?') >= 0 ? '&' : '?') + '_ajaxkey=' + encodeURIComponent(this.ajaxkey);
        var d = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
        this.debug("[".concat(origin, "] ").concat(m, " ").concat(u).concat(d ? ' with ' + d : ''));
        fetch(u, {
            method: m,
            headers: h,
            //compress: this.parameters.compress,
            signal: AbortSignal.timeout(this.parameters.timeout),
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
    Session.prototype.parseResponse = function (res, status) {
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
    Session.prototype.getHealth = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getHealth';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = "&full=".concat(!!opts.full);
                        if (opts.businessCase)
                            p += "&_bc=".concat(encodeURIComponent(opts.businessCase));
                        _this.sendRequest("".concat(_this.parameters.healthpath).concat(p), undefined, function (res, status) {
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
    Session.prototype.login = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
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
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                }
                                catch (e) {
                                    _this.authtokenexpiry = undefined;
                                }
                                if (_this.authtokenexpiry)
                                    _this.debug("[".concat(origin, "] Auth token expiry date = ").concat(_this.authtokenexpiry.toLocaleDateString(), " ").concat(_this.authtokenexpiry.toLocaleTimeString()));
                                // Minimal grant from session data
                                _this.grant = new grant_1.Grant({
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
    Session.prototype.logout = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
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
                                // Restore session parameter-level credentials if present
                                _this.username = _this.parameters.username;
                                _this.password = _this.parameters.password;
                                _this.authtoken = _this.parameters.authtoken;
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
        });
    };
    /**
     * Get path
     * @param {string} action Action
     * @param {object} [opts] Options
     * @param {string} [opts.businessCase] Business case label
     */
    Session.prototype.getPath = function (action, opts) {
        var bc = opts && opts.businessCase ? "&_bc=".concat(encodeURIComponent(opts.businessCase)) : '';
        return "".concat(this.parameters.apppath, "?action=").concat(encodeURIComponent(action)).concat(bc);
    };
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
    Session.prototype.getGrant = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getGrant';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '&web=true'; // Required to be able to include texts
                        var txt = !!opts.includeTexts || !!opts.texts; // naming flexibility
                        p += "&texts=".concat(encodeURIComponent(txt));
                        var pic = !!opts.inlinePicture || !!opts.picture; // naming flexibility
                        if (pic)
                            p += '&inline_picture=true';
                        var sys = !!opts.includeSysparams || !!opts.sysparams; // naming flexibility
                        if (sys)
                            p += '&sysparams=true';
                        _this.sendRequest("".concat(_this.getPath('getgrant', opts)).concat(p), undefined, function (res, status) {
                            var r = _this.parseResponse(res, status);
                            _this.debug("[".concat(origin, "] HTTP status = ").concat(status, ", response type = ").concat(r.type));
                            if (r.type === 'error') {
                                var err = _this.getError(r.response, undefined, origin);
                                if (!(opts.error || _this.error).call(_this, err))
                                    reject.call(_this, err);
                            }
                            else {
                                _this.grant = new grant_1.Grant(r.response); // Set as Grant
                                if (pic)
                                    _this.grant.picture = new doc_1.Doc(_this.grant.picture); // Set picture as Document
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
        });
    };
    /**
     * Change password
     * @param {string} pwd Password
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the change password result
     * @function
     */
    Session.prototype.changePassword = function (pwd, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.changePassword';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest("".concat(_this.getPath('setpassword', opts), "&password=").concat(encodeURIComponent(pwd)), undefined, function (res, status) {
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
        });
    };
    /**
     * Get application info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the application info (also available as the <code>appinfo</code> member)
     * @function
     */
    Session.prototype.getAppInfo = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getAppInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest(_this.getPath('getinfo', opts), undefined, function (res, status) {
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
        });
    };
    /**
     * Get system info
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the system info (also available as the <code>sysinfo</code> member)
     * @function
     */
    Session.prototype.getSysInfo = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getSysInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.sendRequest(_this.getPath('sysinfo', opts), undefined, function (res, status) {
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
        });
    };
    /**
     * Get development info
     * @param {string} [module] Module name
     * @param {object} [opts] Options
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<object>} A promise to the development info (also available as the <code>devinfo</code> member)
     * @function
     */
    Session.prototype.getDevInfo = function (module, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.getDevInfo';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = '';
                        if (module)
                            p += "&module=".concat(encodeURIComponent(module));
                        _this.sendRequest("".concat(_this.getPath('devinfo', opts)).concat(p), undefined, function (res, status) {
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
        });
    };
    /**
     * Get news
     * @param {object} [opts] Options
     * @param {boolean} [opts.inlineImages=false] Inline news images?
     * @param {function} [opts.error] Error handler function
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} A promise to the list of news (also available as the <code>news</code> member)
     * @function
     */
    Session.prototype.getNews = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
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
                        _this.sendRequest("".concat(_this.getPath('news', opts)).concat(p), undefined, function (res, status) {
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
                                    n.image = new doc_1.Doc(n.image);
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
     * @param {string} [opts.businessCase] Business case label
     * @return {promise<array>} A promise to a list of index search records
     * @function
     */
    Session.prototype.indexSearch = function (query, object, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var origin;
            var _this = this;
            return __generator(this, function (_a) {
                origin = 'Session.indexSearch';
                opts = opts || {};
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var p = "&request=".concat(encodeURIComponent(query ? query : ''));
                        if (object)
                            p += "&object=".concat(encodeURIComponent(object));
                        if (opts.metadata === true)
                            p += '&_md=true';
                        if (opts.context)
                            p += "&context=".concat(encodeURIComponent(opts.context));
                        _this.sendRequest("".concat(_this.getPath('indexsearch', opts)).concat(p), undefined, function (res, status) {
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
        });
    };
    /**
     * Get business object
     * @param {string} name Business object name
     * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
     * @return {BusinessObject} Business object
     * @function
     */
    Session.prototype.getBusinessObject = function (name, instance) {
        var cacheKey = this.getBusinessObjectCacheKey(name, instance);
        var obj = this.businessObjectCache[cacheKey];
        if (!obj) {
            obj = new businessobject_1.BusinessObject(this, name, instance);
            this.businessObjectCache[cacheKey] = obj;
        }
        return obj;
    };
    /**
     * Get an external object
     * @param {string} name External object name
     * @function
     */
    Session.prototype.getExternalObject = function (name) {
        return new externalobject_1.ExternalObject(this, name);
    };
    /**
     * Get a resource URL
     * @param {string} code Resource code
     * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
     * @param {string} [object] Object name (not required for global resources)
     * @param {string} [objId] Object ID (not required for global resources)
     * @function
     */
    Session.prototype.getResourceURL = function (code, type, object, objId) {
        return this.parameters.url + this.parameters.respath
            + '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
            + (object ? '&object=' + encodeURIComponent(object) : '')
            + (objId ? '&objid=' + encodeURIComponent(objId) : '')
            + (this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(this.authtoken) : '');
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map