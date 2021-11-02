/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 1.1.28
 * @license Apache-2.0
 */
var Q = require('q');
var axios = require('axios');
var buffer = require('buffer');

/**
 * Constants
 * @constant
*/
var constants = {
	/**
	 * Default row ID field name
	 * @var {string}
	 */
	DEFAULT_ROW_ID_NAME: 'row_id',

	/**
	 * Default row ID value
	 * @var {string}
	 */
	DEFAULT_ROW_ID: '0',

	/**
	 * Default context
	 * @var {number}
	 */
	CONTEXT_NONE: 0,
	/**
	 * Search context
	 * @var {number}
	 */
	CONTEXT_SEARCH: 1,
	/**
	 * List context
	 * @var {number}
	 */
	CONTEXT_LIST: 2,
	/**
	 * Creation context
	 * @var {number}
	 */
	CONTEXT_CREATE: 3,
	/**
	 * Copy context
	 * @var {number}
	 */
	CONTEXT_COPY: 4,
	/**
	 * Update context
	 * @var {number}
	 */
	CONTEXT_UPDATE: 5,
	/**
	 * Delete context
	 * @var {number}
	 */
	CONTEXT_DELETE: 6,
	/**
	 * Chart context
	 * @var {number}
	 */
	CONTEXT_GRAPH: 7,
	/**
	 * Pivot table context
	 * @var {number}
	 */
	CONTEXT_CROSSTAB: 8,
	/**
	 * Publication context
	 * @var {number}
	 */
	CONTEXT_PRINTTMPL: 9,
	/**
	 * Bulk update context
	 * @var {number}
	 */
	CONTEXT_UPDATEALL: 10,
	/**
	 * Reference selection context
	 * @var {number}
	 */
	CONTEXT_REFSELECT: 11,
	/**
	 * Datamap selection context
	 * @var {number}
	 */
	CONTEXT_DATAMAPSELECT: 12,
	/**
	 * Pre validation context
	 * @var {number}
	 */
	CONTEXT_PREVALIDATE: 13,
	/**
	 * Post validation context
	 * @var {number}
	 */
	CONTEXT_POSTVALIDATE: 14,
	/**
	 * State transition context
	 * @var {number}
	 */
	CONTEXT_STATETRANSITION: 15,
	/**
	 * Export context
	 * @var {number}
	 */
	CONTEXT_EXPORT: 16,
	/**
	 * Import context
	 * @var {number}
	 */
	CONTEXT_IMPORT: 17,
	/**
	 * Association context
	 * @var {number}
	 */
	CONTEXT_ASSOCIATE: 18,
	/**
	 * Panle list context
	 * @var {number}
	 */
	CONTEXT_PANELLIST: 19,

	/**
	 * Foreign key (reference) type
	 * @var {number}
	 */
	TYPE_ID: 0,
	/**
	 * Integer type
	 * @var {number}
	 */
	TYPE_INT: 1,
	/**
	 * Decimal type
	 * @var {number}
	 */
	TYPE_FLOAT: 2,
	/**
	 * Short string type
	 * @var {number}
	 */
	TYPE_STRING: 3,
	/**
	 * Date type
	 * @var {number}
	 */
	TYPE_DATE: 4,
	/**
	 * Date and time type
	 * @var {number}
	 */
	TYPE_DATETIME: 5,
	/**
	 * Time type
	 * @var {number}
	 */
	TYPE_TIME: 6,
	/**
	 * Simple enumeration type
	 * @var {number}
	 */
	TYPE_ENUM: 7,
	/**
	 * Boolean type
	 * @var {number}
	 */
	TYPE_BOOLEAN: 8,
	/**
	 * Password type
	 * @var {number}
	 */
	TYPE_PASSWORD: 9,
	/**
	 * URL type
	 * @var {number}
	 */
	TYPE_URL: 10,
	/**
	 * HTML content type
	 * @var {number}
	 */
	TYPE_HTML: 11,
	/**
	 * Email type
	 * @var {number}
	 */
	TYPE_EMAIL: 12,
	/**
	 * Long string type
	 * @var {number}
	 */
	TYPE_LONG_STRING: 13,
	/**
	 * Multiple enumeration type
	 * @var {number}
	 */
	TYPE_ENUM_MULTI: 14,
	/**
	 * Validated string type
	 * @var {number}
	 */
	TYPE_REGEXP: 15,
	/**
	 * Document type
	 * @var {number}
	 */
	TYPE_DOC: 17,
	/**
	 * Decimal type
	 * @var {number}
	 * @deprecated
	 */
	TYPE_FLOAT_EMPTY: 18,
	/**
	 * External file type
	 * @var {number}
	 * @deprecated
	 */
	TYPE_EXTFILE: 19,
	/**
	 * Image type
	 * @var {number}
	 */
	TYPE_IMAGE: 20,
	/**
	 * Notepad type
	 * @var {number}
	 */
	TYPE_NOTEPAD: 21,
	/**
	 * Phone number type
	 * @var {number}
	 */
	TYPE_PHONENUM: 22,
	/**
	 * RGB color type
	 * @var {number}
	 */
	TYPE_COLOR: 23,
	/**
	 * Object type
	 * @var {number}
	 */
	TYPE_OBJECT: 24,
	/**
	 * Geocoordinates type
	 * @var {number}
	 */
	TYPE_GEOCOORDS: 25,

	/**
	 * Not visible
	 * @var {number}
	 */
	VIS_NOT: 0,
	/**
	 * Hiiden (same as not visible)
	 * @var {number}
	 */
	VIS_HIDDEN: 0,
	/**
	 * Visible on lists only
	 * @var {number}
	 */
	VIS_LIST: 1,
	/**
	 * Visible on forms only
	 * @var {number}
	 */
	VIS_FORM: 2,
	/**
	 * Visible on both lists and forms only
	 * @var {number}
	 */
	VIS_BOTH: 3,

	/**
	 * No search
	 * @var {number}
	 */
	SEARCH_NONE: 0,
	/**
	 * Simple search
	 * @var {number}
	 */
	SEARCH_MONO: 1,
	/**
	 * Multiple search (checkboxes)
	 * @var {number}
	 */
	SEARCH_MULTI_CHECK: 2,
	/**
	 * Multiple search (listbox)
	 * @var {number}
	 */
	SEARCH_MULTI_LIST: 3,
	/**
	 * Search by period (date/time)
	 * @var {number}
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
	 * @var {number}
	 */
	ERRLEVEL_FATAL: 1,
	/**
	 * Error level
	 * @var {number}
	 */
	ERRLEVEL_ERROR: 2,
	/**
	 * Warning level
	 * @var {number}
	 */
	ERRLEVEL_WARNING: 3,

	/**
	 * Image resource type
	 * @var {number}
	 */
	RESOURCE_TYPE_IMAGE: 'IMG',
	/**
	 * Icon resource type
	 * @var {number}
	 */
	RESOURCE_TYPE_ICON: 'ICO',
	/**
	 * Stylesheet resource type
	 * @var {number}
	 */
	RESOURCE_TYPE_STYLESHEET: 'CSS',
	/**
	 * Javascript resource type
	 * @var {number}
	 */
	RESOURCE_TYPE_JAVASCRIPT: 'JS'
};

/**
 * Simplicite application session.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
*/
function session(params) {
	return new Session(params);
}

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
function Session(params) {
	params = params || {};

	/**
	 * Constants
	 * @constant
	 */
	this.constants = constants;

	/**
	 * Is used within generic UI?
	 * @constant
	 */
	this.endpoint = params.endpoint || 'api';

	/**
	 * Log handler
	 * @param {any} arg Argument
	 * @function
	 */
	this.log = params.logHandler || function(arg) {
		console.log(arg);
	};

	/**
	 * Info handler
	 * @param {any} arg Argument
	 * @function
	 */
	this.info = params.infoHandle || function(arg) {
		console.info(arg);
	};

	/**
	 * Warning handler
	 * @param {any} arg Argument
	 * @function
	 */
	this.warn = params.warningHandler || function(arg) {
		console.warn(arg);
	};
	
	/**
	 * Error handler
	 * @param {any} arg Argument
	 * @function
	 */
	this.error = params.errorHandler || function(arg) {
		console.error(arg);
	};

	var _debug = !!params.debug;

	/**
	 * Debug handler
	 * @param {any} arg Argument
	 * @function
	 */
	this.debug = params.debugHandler || function(arg) {
		if (_debug)
			console.log(arg);
	};

	/**
	 * Timeout (seconds)
	 * @default 30
	 * @member {number}
	 */
	this.timeout = params.timeout || 30;

	if (params.url) {
		try {
			params.scheme = params.url.replace(/:.*$/, '');
			var u = params.url.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
			if (u.length === 1) {
				params.host = u[0].replace(/\/.*$/, '');
				params.port = params.scheme === 'http' ? 80 : 443;
				params.root = u[0].replace(new RegExp('^' + params.host + '/?'), '');
			} else {
				params.host = u[0];
				params.port = parseInt(u[1].replace(/\/.*$/, ''), 10);
				if (isNaN(params.port))
					throw new Error('Incorrect port');
				params.root = u[1].replace(new RegExp('^' + params.port + '/?'), '');
			}
			if (params.root === '/')
				params.root = '';
		} catch (e) {
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

	/**
	 * Parameters
	 * @constant {object}
	 */
	this.parameters = {
		scheme: scheme,
		host: host,
		port: port,
		root: root,
		url: url,
		healthpath: (ep == '/ui' ? ep : '') + '/health?format=json',
		apppath: ep + '/json/app',
		objpath: ep + '/json/obj',
		extpath: ep + '/ext',
		docpath: ep + '/raw/document',
		respath: '/resource'
	};

	/**
	 * Username
	 * @member {string}
	 */
	this.username = params.username || params.login; // naming flexibility

	/**
	 * Set username
	 * @param {string} usr Username
	 * @function
	 */
	this.setUsername = function(usr) {
		this.username = usr;
	};

	/**
	 * Password
	 * @member {string}
	 */
	this.password = params.password || params.pwd; // naming flexibility

	/**
	 * Set password
	 * @param {string} pwd Password
	 * @function
	 */
	this.setPassword = function(pwd) {
		this.password = pwd;
	};

	/**
	 * Auth token
	 * @member {string}
	 */
	this.authtoken = params.authtoken || params.authToken || params.token; // naming flexibility

	/**
	 * Set auth token
	 * @param {string} tkn Auth token
	 * @function
	 */
	this.setAuthToken = function(tkn) {
		this.authtoken = tkn;
	};

	/**
	 * Business objects cache
	 * @type {object}
	 * @private
	 */
	var businessObjectCache = {};

	/**
	 * Get business object cache key
	 * @param {string} name Business object name
	 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
	 * @return {object} Business object cache key
	 * @private
	 */
	this.getBusinessObjectCacheKey = function(name, instance) {
		return name + ':' + (instance || 'js_' + name);
	};

	/**
	 * Clears all data (credentials, objects, ...)
	 * @function
	 */
	this.clear = function() {
		this.username = undefined;
		this.password = undefined;
		this.authtoken = undefined;
		this.sessionid = undefined;

		this.grant = undefined;

		this.appinfo = undefined;
		this.sysinfo = undefined;
		this.devinfo = undefined;
		this.userinfo = undefined;

		businessObjectCache = {};
	};

	/**
	 * Basic HTTP authorization header
	 * @private
	 */
	this.getBasicAuthHeader = function() {
		return this.username && this.password
			? 'Basic ' + buffer.Buffer.from(this.username + ':' + this.password).toString('base64')
			: undefined;
	};

	/**
	 * Get bearer token header
	 * @private
	 */
	this.getBearerTokenHeader = function() {
		return this.authtoken
			? 'Bearer ' + this.authtoken
			: undefined;
	};

	/**
	 * Request
	 * @param {string} path Path
	 * @param {object} [data] Data
	 * @param {function} [callback] Callback
	 * @param {function} [errorHandler] Error handler
	 * @private
	 */
	this.req = function(path, data, callback, errorHandler) {
		var self = this;
		var m = data ? 'post' : 'get';
		var h = {};
		if (data)
			h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		var b = self.getBearerTokenHeader();
		if (b) {
			self.debug('[simplicite.req] Using bearer token header = ' + b);
			h['X-Simplicite-Authorization'] = b;
		} else {
			b = self.getBasicAuthHeader();
			if (b) {
				self.debug('[simplicite.req] Using basic auth header = ' + b);
				h.Authorization = b;
			}
		}
		axios.request({
			baseURL: self.parameters.url,
			url: path || '/',
			method: m,
			headers: h,
			timeout: self.timeout * 1000,
			withCredentials: true,
			data: data
		}).then(function (res) {
			if (callback)
				callback.call(self, res.data, res.status, res.headers);
		}).catch(function(err) {
			var s = err.response && err.response.status ? err.response.status : undefined;
			var e = err.response && err.response.data ? err.response.data : err;
			if (errorHandler)
				errorHandler.call(self, self.getError.call(self, e, s));
			else
				throw e;
		});
	};

	/**
	 * Get error object
	 * @param {(string|object)} err Error
	 * @param {string} err.message Error message
	 * @param {number} [status] Error status
	 * @private
	 */
	this.getError = function(err, status) {
		if (typeof err === 'string') // plain text error
			return { message: err, status: status || 200 };
		else if (err.response) // wrapped error
			return typeof err.response === 'string' ? { message: err.response, status: status || 200 } : err.response;
		else
			return err;
	};

	/**
	 * Parse result
	 * @param {object} res Response to parse
	 * @param {number} [status=200] HTTP status
	 * @private
	 */
	this.parse = function(res, status) {
		try {
			if (status !== 200)
				return { type: 'error', response: this.getError('HTTP status: ' + status, status) };
			return typeof res === 'object' ? res : JSON.parse(res);
		} catch (e) {
			return { type: 'error', response: this.getError('Parsing error: ' + e.message, status) };
		}
	};

	/**
	 * Get health check (no need to be authenticated)
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getHealth(callback, opts) {
		var self = this;
		opts = opts || {};
		self.req.call(self, self.parameters.healthpath + '&full=' + !!opts.full, undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite._getHealth] HTTP status = ' + status + ', response type = ' + res);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				if (callback)
					callback.call(self, r);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get health check (no need to be authenticated)
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.full=false] Full health check?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the health data
	 * @function
	 */
	this.getHealth = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { var err = this.getError(e); d.reject(err); };
		_getHealth.call(this, function(health) { d.resolve(health); }, opts);
		return d.promise;
	};

	/**
	 * Login
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _login(callback, opts) {
		var self = this;
		opts = opts || {};
		if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
			self.clear();
			self.username = opts.username || opts.login;
			self.password = opts.password || opts.pwd;	
		} else if (opts.authtoken || opts.authToken || opts.token) {
			self.clear();
			self.authtoken = opts.authtoken || opts.authToken || opts.token;	
		}
		self.req.call(self, self.parameters.apppath + '?action=session', undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.login] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.sessionid = r.response.id;
				self.debug('[simplicite.login] Session ID = ' + self.sessionid);
				self.username = r.response.login;
				if (self.username)
					self.debug('[simplicite.login] Username = ' + self.username);
				self.authtoken = r.response.authtoken;
				if (self.authtoken)
					self.debug('[simplicite.login] Auth token = ' + self.authtoken);
				// Minimal grant from session data
				self.grant = Object.assign(new Grant(), {
					login: r.response.login,
					userid: r.response.userid,
					firstname: r.response.firstanme,
					lastname: r.response.lastname,
					email: r.response.email
				});
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
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
	this.login = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_login.call(this, function(res) { d.resolve(res); }, opts);
		return d.promise;
	};

	/**
	 * Logout
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _logout(callback, opts) {
		var self = this;
		opts = opts || {};
		self.req.call(self, self.parameters.apppath + '?action=logout', undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.logout] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.clear();
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			if (e.status === 401) // Removes (expired or deleted) token if any
				self.authtoken = undefined;
			(opts.error ? opts.error : self.error).call(self, e);
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
	this.logout = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_logout.call(this, function(res) { d.resolve(res); }, opts);
		return d.promise;
	};

	/**
	 * Grant
	 * @member {Grant}
	 */
	this.grant = undefined;

	/**
	 * Get user (grant)
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getGrant(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '&web=true'; // Required to be able to include texts 
		if (opts.inlinePicture || opts.picture) // naming flexibility
			p += '&inline_picture=' + (!!opts.inlinePicture || !!opts.picture);
		if (opts.includeTexts || opts.texts)
			p += '&texts=' + (!!opts.includeTexts || !!opts.texts);
		self.req.call(self, self.parameters.apppath + '?action=getgrant' + p, undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.getGrant] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.grant = Object.assign(new Grant(), r.response);
				if (callback)
					callback.call(self, self.grant);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get grant (current user data)
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.inlinePicture=false] Inline user picture?
	 * @param {boolean} [opts.includeTexts=false] Include texts?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
	 * @function
	 */
	this.getGrant = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getGrant.call(this, function(grt) { d.resolve(grt); }, opts);
		return d.promise;
	};

	/**
	 * Change password
	 * @param {string} pwd Password
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _changePassword(callback, pwd, opts) {
		var self = this;
		opts = opts || {};
		self.req.call(self, self.parameters.apppath + '?action=setpassword&password=' + encodeURIComponent(pwd), undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.changePassword] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Change password
	 * @param {string} pwd Password
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the change password result
	 * @function
	 */
	this.changePassword = function(pwd, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_changePassword.call(this, function(res) { d.resolve(res); }, pwd, opts);
		return d.promise;
	};

	/**
	 * Get application info
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getAppInfo(callback, opts) {
		var self = this;
		opts = opts || {};
		self.req.call(self, self.parameters.apppath + '?action=getinfo', undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.getAppInfo] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.appinfo = r.response;
				if (callback)
					callback.call(self, self.appinfo);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get application info
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
	 * @function
	 */
	this.getAppInfo = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getAppInfo.call(this, function(inf) { d.resolve(inf); }, opts);
		return d.promise;
	};

	/**
	 * Get system info
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getSysInfo(callback, opts) {
		var self = this;
		opts = opts || {};
		self.req.call(self, self.parameters.apppath + '?action=sysinfo', undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.getSysInfo] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.sysinfo = r.response;
				if (callback)
					callback.call(self, self.sysinfo);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get system info
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
	 * @function
	 */
	this.getSysInfo = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getSysInfo.call(this, function(inf) { d.resolve(inf); }, opts);
		return d.promise;
	};

	/**
	 * Get development info
	 * @param {function} callback Callback (called upon success)
	 * @param {string} [module] Module name
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getDevInfo(callback, module, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (module)
			p += '&module=' + encodeURIComponent(module);
		self.req.call(self, self.parameters.apppath + '?action=devinfo' + p, undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.getDevInfo] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.devinfo = r.response;
				if (callback)
					callback.call(self, self.devinfo);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get development info
	 * @param {string} [module] Module name
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
	 * @function
	 */
	this.getDevInfo = function(module, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getDevInfo.call(this, function(inf) { d.resolve(inf); }, module, opts);
		return d.promise;
	};

	/**
	 * Get news
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getNews(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.inlineImages)
			p += '&inline_images=' + !!opts.inlineImages;
		self.req.call(self, self.parameters.apppath + '?action=news' + p, undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.getNews] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				self.news = r.response;
				if (callback)
					callback.call(self, self.news);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Get news
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.inlineImages=false] Inline news images?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
	 * @function
	 */
	this.getNews = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getNews.call(this, function(nws) { d.resolve(nws); }, opts);
		return d.promise;
	};

	/**
	 * Index search
	 * @param {function} callback Callback (called upon success)
	 * @param {string} request Index search request
	 * @param {string} [object] Object
	 * @private
	 */
	function _indexSearch(callback, request, object, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.metadata===true) p += '&_md=true';
		if (opts.context) p += '&context=' + encodeURIComponent(opts.context);
		self.req.call(self, self.parameters.apppath + '?action=indexsearch&request=' + encodeURIComponent(request ? request : '') + (object ? '&object=' + encodeURIComponent(object) : '') + p, undefined, function(res, status) {
			var r = self.parse(res, status);
			self.debug('[simplicite.indexSearch] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.error).call(self, r.response);
			} else {
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			(opts.error ? opts.error : self.error).call(self, e);
		});
	}

	/**
	 * Index search
	 * @param {string} request Index search request
	 * @param {string} [object] Object
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.metadata=false] Add meta data for each result
	 * @param {number} [opts.context] Context
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<array>} A promise to a list of index search records
	 * @function
	 */
	this.indexSearch = function(request, object, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_indexSearch.call(this, function(srs) { d.resolve(srs); }, request, object, opts);
		return d.promise;
	};

	/**
	 * Get business object
	 * @param {string} name Business object name
	 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
	 * @return {BusinessObject} Business object
	 * @function
	 */
	this.getBusinessObject = function(name, instance) {
		var cacheKey = this.getBusinessObjectCacheKey(name, instance);
		var obj = businessObjectCache[cacheKey];
		if (!obj) {
			obj = new BusinessObject(this, name, instance);
			businessObjectCache[cacheKey] = obj;
		}
		return obj;
	};

	/**
	 * Get an external object
	 * @param {string} name External object name
	 * @function
	 */
	this.getExternalObject = function(name) {
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
	this.getResourceURL = function(code, type, object, objId) {
		return this.parameters.url + this.parameters.respath
			+ '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
			+ (object ? '&object=' + encodeURIComponent(object) : '')
			+ (objId ? '&objid=' + encodeURIComponent(objId): '')
			+ (this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(this.authtoken) : '');
	};
}

/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
function Grant() {
	/**
	 * Get user ID
	 * @return {string} User ID
	 * @function
	 */
	this.getUserId = function () {
		return this.userid;
	};

	/**
	 * Get username
	 * @return {string} Username
	 * @function
	 */
	this.getUsername = function() {
		return this.login;
	};

	/**
	 * Alias to <code>getUsername</code>
	 * @return {string} Login
	 * @function
	 */
	this.getLogin = this.getUsername; // Naming flexibility

	/**
	 * Get language
	 * @return {string} Language
	 * @function
	 */
	this.getLang = function() {
		return this.lang;
	};
	
	/**
	 * Get email address
	 * @return {string} Email address
	 * @function
	 */
	this.getEmail = function() {
		return this.email;
	};
	
	/**
	 * Get first name
	 * @return {string} First name
	 * @function
	 */
	this.getFirstname = function() {
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
	this.getLastname = function() {
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
	 * @return {string} Picture data URL
	 * @function
	 */
	this.getPictureURL = function() {
		if (this.picture)
			return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
	};

	/**
	 * Has responsibility
	 * @param {string} group Group name
	 * @return {boolean} True if user has a responsibility on the specified group
	 * @function
	 */
	this.hasResponsibility = function(group) {
		return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
	};

	/**
	 * Get text
	 * @param {string} code Text code
	 */
	this.T = function(code) {
		return this.texts ? this.texts[code] || '' : '';
	};
}

/**
 * Document
 * @class
 */
function Document() {
	/**
	 * Get the document's ID
	 * @return ID
	 * @function
	 */
	this.getId = function() {
		return this.id;
	};

	/**
	 * Get the document's MIME type
	 * @return {string} MIME type
	 * @function
	 */
	this.getMIMEType = function() {
		return this.mime;
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
	this.setMIMEType = function(mime) {
		this.mime = mime;
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
	this.getFilename = function() {
		return this.filename;
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
	this.setFilename = function(filename) {
		this.filename = filename;
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
	this.getContent = function() {
		return this.content;
	};

	/**
	 * Get the document's thumbnail (encoded in base 64)
	 * @return {string} Thumbnail
	 * @function
	 */
	this.getThumbnail = function() {
		return this.thumbnail;
	};

	/**
	 * Get the document's content as a buffer
	 * @private
	 */
	function getBuffer(data) {
		return buffer.Buffer.from(data, 'base64');
	}

	/**
	 * Get the document's content as an array buffer
	 * @return {ArrayBuffer} Content as an array buffer
	 * @function
	 */
	this.getContentAsArrayBuffer = function() {
		return getBuffer(this.content).buffer;
	};

	/**
	 * Get the document's thumbnail as an array buffer
	 * @return {ArrayBuffer} Thumbnail as an array buffer
	 * @function
	 */
	this.getThumbnailAsArrayBuffer = function() {
		return getBuffer(this.thumbnail || '').buffer;
	};

	/**
	 * Get the document's content as a text
	 * @param {string} [encoding] Encoding, defaults to UTF-8
	 * @return {string} Content as plain text
	 * @function
	 */
	this.getContentAsText = function(encoding) {
		return getBuffer(this.content).toString(encoding || 'utf-8');
	};

	/**
	 * Set the document's content
	 * @param {string} content Content (encoded in base 64)
	 * @function
	 */
	this.setContent = function(content) {
		this.content = content;
	};

	/**
	 * Set the document's content from plain text string
	 * @param {string} content Content as plain text string
	 * @param {string} [encoding] Encoding, defaults to UTF-8
	 * @function
	 */
	this.setContentFromText = function(content, encoding) {
		this.content = buffer.Buffer.from(content, encoding || 'utf-8').toString('base64');
	};

	/**
	 * Get the document's data URL
	 * @param {boolean} [thumbnail] Thumbnail? If thumbnail does not exists the content is used.
	 * @return {string} Data URL or nothing if content is empty
	 */
	this.getDataURL = function(thumbnail) {
		if (this.content)
			return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
	};

	/**
	 * Get the document as a simple value
	 * @return Value
	 */
	this.getValue = function() {
		return JSON.parse(JSON.stringify(this)); // Strips all functions
	};
}

/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
function BusinessObjectMetadata(name, instance) {
	/**
	 * Name
	 * @constant {string}
	 */
	this.name = name;

	/**
	 * Instance name
	 * @constant {string}
	 */
	this.instance = instance;

	/**
	 * Row ID field name
	 * @member {string}
	 */
	this.rowidfield = constants.DEFAULT_ROW_ID_NAME;

	/**
	 * Display label
	 * @member {string}
	 */
	this.label = name;

	/**
	 * Help
	 * @member {string}
	 */
	this.help = '';

	/**
	 * Fields definitions
	 * @member {array}
	 */
	this.fields = [];
}

/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
 * @class
 */
function BusinessObject(ses, name, instance) {
	instance = instance || 'js_' + name;

	/**
	 * Session
	 * @private
	 */
	this.session = ses;

	/**
	 * Object metadata
	 * @member {BusinessObjectMetadata}
	 */
	this.metadata = new BusinessObjectMetadata(name, instance);

	/**
	 * Cache key
	 * @constant {string}
	 */
	this.cacheKey = this.session.getBusinessObjectCacheKey(name, instance);

	/**
	 * Path
	 * @constant {string}
	 */
	this.path = this.session.parameters.objpath + '?object=' + encodeURIComponent(name) + '&inst=' + encodeURIComponent(instance);

	/**
	 * Current item
	 * @member {object}
	 */
	this.item = {};

	/**
	 * Current filters
	 * @member {object}
	 */
	this.filters = {};

	/**
	 * Current list
	 * @member {object[]}
	 */
	this.list = [];

	/**
	 * Get meta data
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getMetaData(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.context) p += '&context=' + encodeURIComponent(opts.context);
		if (opts.contextParam) p += '&contextparam=' + encodeURIComponent(opts.contextParam);
		self.session.req.call(self.session, self.path + '&action=metadata' + p, undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.metadata = r.response;
				if (callback)
					callback.call(self, self.metadata);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Get meta data
	 * @param {object} [opts] Options
	 * @param {number} [opts.context] Context
	 * @param {string} [opts.contextParam] Context parameter
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
	 * @function
	 */
	this.getMetaData = function(opts) {
		var d = Q.defer();
		_getMetaData.call(this, function(metadata) { d.resolve(metadata); }, opts);
		return d.promise;
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
	this.getName = function() {
		return this.metadata.name;
	};

	/**
	 * Get instance name
	 * @return {string} Instance name
	 * @function
	 */
	this.getInstance = function() {
		return this.metadata.instance;
	};

	/**
	 * Get display label
	 * @return {string} Display label
	 * @function
	 */
	this.getLabel = function() {
		return this.metadata.label;
	};

	/**
	 * Get help
	 * @return {string} Help
	 * @function
	 */
	this.getHelp = function() {
		return this.metadata.help;
	};

	/**
	 * Get all fields definitions
	 * @return {array} Array of field definitions
	 * @function
	 */
	this.getFields = function() {
		return this.metadata.fields;
	};

	/**
	 * Get a field definition
	 * @param {string} fieldName Field name
	 * @return {object} Field definition
	 * @function
	 */
	this.getField = function(fieldName) {
		var n = 0;
		var fs = this.getFields();
		while (n < fs.length && fs[n].name !== fieldName) n++;
		if (n < fs.length)
			return fs[n];
	};

	/**
	 * Get row ID field name
	 * @return {string} Row ID field name
	 * @function
	 */
	this.getRowIdFieldName = function() {
		return this.metadata.rowidfield;
	};

	/**
	 * Get row ID field definition
	 * @return {object} Row ID field definition
	 * @function
	 */
	this.getRowIdField = function() {
		return this.getField(this.getRowIdFieldName());
	};

	/**
	 * Get links
	 * @return {array} Array of links
	 * @function
	 */
	this.getLinks = function() {
		return this.metadata.links;
	};

	/**
	 * Get field type
	 * @param {(string|object)} field Field name or definition
	 * @return {string} Type (one of <code>constants.TYPE_*</code>)
	 * @function
	 */
	this.getFieldType = function(field) {
		if (typeof field === 'string')
			field = this.getField(field);
		if (field)
			return field.type;
	};

	/**
	 * Get field label
	 * @param {(string|object)} field Field name or definition
	 * @return {string} Value
	 * @function
	 */
	this.getFieldLabel = function(field) {
		if (typeof field === 'string')
			field = this.getField(field);
		if (field)
			return field.label;
	};

	/**
	 * Get value of field for item (or current item)
	 * @param {(string|object)} field Field name or definition
	 * @param {object} [item] Item (defaults to current item)
	 * @return {string} Value
	 * @function
	 */
	this.getFieldValue = function(field, item) {
		if (!item)
			item = this.item;
		if (field && item) {
			return item[typeof field === 'string' ? field : field.name];
		}
	};

	/**
	 * Get the list value of a list of values field for item (or current item)
	 * @param {(string|object)} field Field name or definition
	 * @param {string} code Code
	 * @return {string} Value
	 * @function
	 */
	this.getFieldListValue = function(field, item) {
		if (typeof field === 'string')
			field = this.getField(field);
		var val = this.getFieldValue(field, item);
		return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
	};

	/**
	 * Get the data URL of an inlined document/image field for item (or current item)
	 * @param {(string|object)} field Field name or definition
	 * @param {object} [item] Item (defaults to current item)
	 * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
	 * @function
	 */
	this.getFieldDataURL = function(field, item) {
		if (typeof field !== 'string')
			field = field.fullinput || field.name;
		var val = this.getFieldValue(field, item);
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
	this.getFieldDocument = function(field, item) {
		if (typeof field !== 'string')
			field = field.fullinput || field.input || field.name;
		var val = this.getFieldValue(field, item);
		if (val && val.mime)
			return Object.assign(new Document(), val);
	};

	/**
	 * Get the URL of a document/image field for item (or current item)
	 * @param {(string|object)} field Field name or definition
	 * @param {object} [item] Item (defaults to current item)
	 * @param {boolean} [thumbnail=false] Thumbnail?
	 * @return {string} Document/image field URL (or nothing if the field is not of document/image type or if it is empty)
	 * @function
	 */
	this.getFieldDocumentURL = function(field, item, thumbnail) {
		if (typeof field !== 'string')
			field = field.fullinput || field.input || field.name;
		var val = this.getFieldValue(field, item);
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
	 * Get list value for code
	 * @param {list} list List of values
	 * @param {string} code Code
	 * @return {string} Value
	 * @function
	 */
	this.getListValue = function(list, code) {
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
	this.setFieldValue = function(field, value, item) {
		if (!item)
			item = this.item;
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
	this.isRowIdField = function(field) {
		return !field.ref && field.name === this.metadata.rowidfield;
	};

	/**
	 * Is the field a timestamp field?
	 * @param {object} field Field definition
	 * @return {boolean} True if the field is a timestamp field
	 * @function
	 */
	this.isTimestampField = function(field) {
		var n = field.name;
		return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
	};

	/**
	 * Get current filters
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getFilters(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.context)
			p += '&context=' + encodeURIComponent(opts.context);
		if (opts.reset)
			p += '&reset=' + !!opts.reset;
		self.session.req.call(self.session, self.path + '&action=filters' + p, undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.item = r.response;
				if (callback)
					callback.call(self, self.filters);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Get current filters
	 * @param {object} [opts] Options
	 * @param {number} [opts.context] Context
	 * @param {boolean} [opts.reset] Reset filters?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the object's filters (also available as the <code>filters</code> member)
	 * @function
	 */
	this.getFilters =function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getFilters.call(this, function(filters) { d.resolve(filters); }, opts);
		return d.promise;
	};

	/**
	 * Build options parameters
	 * @param {object} options Options
	 * @private
	 */
	function _getOptions(options) {
		var opts = '';
		if (options.context)
			opts += '&context=' + encodeURIComponent(options.context);
		var id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
		if (id)
			opts += '&inline_documents=' + encodeURIComponent(id.join ? id.join(',') : id);
		var it = options.inlineThumbs || options.inlineThumbnails;  // Naming flexibility
		if (it)
			opts += '&inline_thumbnails=' + encodeURIComponent(it.join ? it.join(',') : it);
		var io = options.inlineObjs || options.inlineObjects;  // Naming flexibility
		if (io)
			opts += '&inline_objects=' + encodeURIComponent(io.join ? io.join(',') : io);
		return opts;
	}

	/**
	 * Build request parameters
	 * @param {object} data Data
	 * @private
	 */
	function _getReqParams(data) {
		var p = '';
		if (!data) return p;
		var n = 0;
		for (var i in data) {
			var d = data[i] || '';
			if (d.name && d.content) { // Document ?
				if (d.content.startsWith('data:')) // Flexibility = extract content fron data URL
					d.content = d.content.replace(/data:.*;base64,/, '');
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
			} else if (d.object && d.row_id) { // Object ?
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
			} else if (d.sort) { // Array ?
				for (var j = 0; j < d.length; j++)
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
			} else {
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
			}
		}
		return p;
	}

	/**
	 * Count
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [filters] Filters, defaults to current filters if not set
	 * @param {object} [opts] Options
	 * @private
	 */
	function _count(callback, filters, opts) {
		var self = this;
		opts = opts || {};
		self.filters = filters || {};
		self.session.req.call(self.session, self.path + '&action=count', _getReqParams(self.filters), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.count = r.response.count;
				self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
				self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
				self.list = [];
				if (callback)
					callback.call(self, self.count);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Count
	 * @param {object} [filters] Filters, defaults to current filters if not set
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the count
	 * @function
	 */
	this.count = function(filters, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_count.call(this, function(count) { d.resolve(count); }, filters, opts);
		return d.promise;
	};

	/**
	 * Count, **deprecated**: use <code>count</code> instead
	 * @deprecated
	 * @function
	 */
	this.getCount = this.count;

	/**
	 * Search
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [filters] Filters, defaults to current filters if not set
	 * @param {object} [opts] Options
	 * @private
	 */
	function _search(callback, filters, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		if (opts.page > 0)
			p += '&page=' + (opts.page - 1);
		if (opts.metadata===true) p += '&_md=true';
		if (opts.visible===true) p += '&_visible=true';
		self.filters = filters || {};
		self.session.req.call(self.session, self.path + '&action=search' + p, _getReqParams(self.filters), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				if (res.meta)
					self.metadata = r.response.meta;
				self.count = r.response.count;
				self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
				self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
				self.list = r.response.list;
				if (callback)
					callback.call(self, self.list);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

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
	this.search = function(filters, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_search.call(this, function(list) { d.resolve(list); }, filters, opts);
		return d.promise;
	};

	/**
	 * Get
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _get(callback, rowId, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		var  tv = opts.treeView;
		if (tv)
			p += '&treeview=' + encodeURIComponent(tv);
		if (opts.fields) {
			for (var i = 0; i < opts.fields.length; i++) {
				p += '&fields=' + encodeURIComponent(opts.fields[i].replace('.', '__'));
			}
		}
		if (opts.metadata) p += '&_md=true';
		if (opts.social) p += '&_social=true';
		self.session.req.call(self.session, self.path + '&action=get&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				if (res.meta)
					self.metadata = r.response.meta;
				if (res.data)
					self.item = tv ? r.response.data.item : r.response.data;
				else
					self.item = tv ? r.response.item : r.response;
				if (callback)
					callback.call(self, tv ? r.response : self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

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
	this.get = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_get.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for create
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getForCreate(callback, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_CREATE;
		_get.call(this, callback, this.session.constants.DEFAULT_ROW_ID, opts);
	}

	/**
	 * Get for create
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.metadata=false] Refresh meta data?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
	 * @function
	 */
	this.getForCreate = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getForCreate.call(this, function(itm) { d.resolve(itm); }, opts);
		return d.promise;
	};

	/**
	 * Get for update
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getForUpdate(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_UPDATE;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for update
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.metadata=false] Refresh meta data?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the record to update (also available as the <code>item</code> member)
	 * @function
	 */
	this.getForUpdate = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getForUpdate.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for copy
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID to copy
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getForCopy(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_COPY;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for copy
	 * @param {string} rowId Row ID to copy
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.metadata=false] Refresh meta data?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the record to create (also available as the <code>item</code> member)
	 * @function
	 */
	this.getForCopy = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getForCopy.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for delete
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getForDelete(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_CREATE;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for delete
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.metadata=false] Refresh meta data?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the record to delete (also available as the <code>item</code> member)
	 * @function
	 */
	this.getForDelete = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getForDelete.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get specified or current item's row ID value
	 * @param {object} [item] Item, defaults to current item
	 * @return {string} Item's row ID value
	 * @function
	 */
	this.getRowId = function(item) {
		item = item || this.item;
		if (item)
			return item[this.getRowIdFieldName()];
	};

	/**
	 * Populate
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _populate(callback, rowId, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		self.session.req.call(self.session, self.path + '&action=populate&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.item = r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Populate
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
	 * @function
	 */
	this.populate = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_populate.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Save
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _save(callback, item, opts) {
		if (item)
			this.item = item;
		var rowId = this.item[this.metadata.rowidfield];
		if (!rowId || rowId === constants.DEFAULT_ROW_ID)
			_create.call(this, callback, item, opts);
		else
			_update.call(this, callback, item, opts);
	}
	
	/**
	 * Save
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the saved record (also available as the <code>item</code> member)
	 * @function
	 */
	this.save = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_save.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Create (create or update)
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _create(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		var p = _getOptions(opts);
		self.session.req.call(self.session, self.path + '&action=create' + p, _getReqParams(self.item), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.item = r.response.data ? r.response.data : r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Create (create or update)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
	 * @function
	 */
	this.create = function(itm, opts) {
		itm.row_id = this.session.constants.DEFAULT_ROW_ID;
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_create.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Update
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _update(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		var p = _getOptions(opts);
		self.session.req.call(self.session, self.path + '&action=update' + p, _getReqParams(self.item), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.item = r.response.data ? r.response.data : r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Update
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the updated record (also available as the <code>item</code> member)
	 * @function
	 */
	this.update = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_update.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Delete
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @private
	 */
	function _del(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		self.session.req.call(self.session, self.path + '&action=delete&' + self.metadata.rowidfield + '=' + encodeURIComponent(self.item[self.metadata.rowidfield]), undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.item = undefined;
				delete r.response.undoredo;
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Delete
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise} Promise (the <code>item</code> member is emptied)
	 * @function
	 */
	this.del = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_del.call(this, function(r) { d.resolve(r); }, itm, opts);
		return d.promise;
	};

	/**
	 * Invoke a custom action
	 * @param {function} callback Callback (called upon success)
	 * @param {string} action Action name
	 * @param {string} [rowId] Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _action(callback, action, rowId, opts) {
		var self = this;
		opts = opts || {};
		self.session.req.call(self.session, self.path + '&action=' + encodeURIComponent(action) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : ''), _getReqParams(opts.parameters), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

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
	this.action = function(action, rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_action.call(this, function(res) { d.resolve(res); }, action, rowId, opts);
		return d.promise;
	};

	/**
	 * Build a pivot table
	 * @param {function} callback Callback (called upon success)
	 * @param {string} crosstab Pivot table name
	 * @param {object} [opts] Options
	 * @private
	 */
	function _crosstab(callback, crosstab, opts) {
		var self = this;
		opts = opts || {};
		if (opts.filters)
			self.filters = opts.filters;
		self.session.req.call(self.session, self.path + '&action=crosstab&crosstab=' + encodeURIComponent(crosstab), _getReqParams(self.filters), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				self.crosstabdata = r.response;
				if (callback)
					callback.call(self, self.crosstabdata);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Build a pivot table
	 * @param {string} crosstab Pivot table name
	 * @param {object} [opts] Options
	 * @param {object} [opts.filters] Filters, by default current filters are used
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the pivot table data (also avialable as the <code>crosstabdata</code> member)
	 * @function
	 */
	this.crosstab = function(ctb, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_crosstab.call(this, function(res) { d.resolve(res); }, ctb, opts);
		return d.promise;
	};

	/**
	 * Build a custom publication
	 * @param {function} callback Callback (called upon success)
	 * @param {string} prt Publication name
	 * @param {string} [rowId] Row ID
	 * @param {object} [opts] Options
	 * @private
	 */
	function _print(callback, prt, rowId, opts) {
		var self = this;
		opts = opts || {};
		if (opts.filters)
			self.filters = opts.filters;
		var p = '';
		if (opts.all)
			p += '&all=' + !!opts.all;
		if (opts.mailing)
			p += '&mailing=' + !!opts.mailing;
		self.session.req.call(self.session, self.path + '&action=print&printtemplate=' + encodeURIComponent(prt) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : '') + p, undefined, function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				if (callback)
					callback.call(self, Object.assign(new Document(), r.response));
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Build a custom publication
	 * @param {string} prt Publication name
	 * @param {string} [rowId] Row ID
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<Document>} A promise to the document of the publication
	 * @function
	 */
	this.print = function(pt, rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_print.call(this, function(res) { d.resolve(res); }, pt, rowId, opts);
		return d.promise;
	};

	/**
	 * Set an object parameter
	 * @param {function} callback Callback (called upon success)
	 * @param {string} param Parameter name
	 * @param {string} value Parameter value
	 * @param {object} [opts] Options
	 * @private
	 */
	function _setParameter(callback, param, value, opts) {
		var self = this;
		opts = opts || {};
		var p = { name: param };
		if (value) p.value = value;
		self.session.req.call(self.session, self.path + '&action=setparameter', _getReqParams(p), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.setParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Set an object parameter
	 * @param {string} param Parameter name
	 * @param {string} value Parameter value
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise
	 * @function
	 */
	this.setParameter = function(param, value, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_setParameter.call(this, function() { d.resolve(); }, param, value, opts);
		return d.promise;
	};

	/**
	 * Get an object parameter
	 * @param {function} callback Callback (called upon success)
	 * @param {string} param Parameter name
	 * @param {object} [opts] Options
	 * @private
	 */
	function _getParameter(callback, param, opts) {
		var self = this;
		opts = opts || {};
		var p = { name: param };
		self.session.req.call(self.session, self.path + '&action=getparameter', _getReqParams(p), function(res, status) {
			var r = self.session.parse(res, status);
			this.debug('[simplicite.BusinessObject.getParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : self.session.error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : self.session.error).call(self, e);
		});
	}

	/**
	 * Get an object parameter
	 * @param {string} param Parameter name
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the parameter value
	 * @function
	 */
	this.getParameter = function(param, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_getParameter.call(this, function(value) { d.resolve(value); }, param, opts);
		return d.promise;
	};

	/**
	 * Get an object resource URL
	 * @param {string} code Resource code
	 * @param {string} [type=IMG] Resource type (IMG=image (default), ICO=Icon, CSS=stylesheet, JS=Javascript, HTML=HTML)
	 * @function
	 */
	this.getResourceURL = function(code, type) {
		return this.session.getResourceURL(code, type, this.metadata.name, this.metadata.id);
	};
}

/**
 * External object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>ExternalObject</code> instances</span>.
 * @param {string} name Business object name
 * @class
 */
function ExternalObjectMetadata (name) {
	/**
	 * Name
	 * @constant {string}
	 */
	this.name = name;
}

/**
 * External object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getExternalObject</code></span>.
 * @param {object} ses Session
 * @param {string} name Business object name
 * @class
 */
function ExternalObject(ses, name) {
	/**
	 * Session
	 * @private
	 */
	this.session = ses;

	/**
	 * Metadata
	 * @constant
	 */
	this.metadata = new ExternalObjectMetadata(name);

	/**
	 * Path
	 * @constant {string}
	 */
	this.path = this.session.parameters.extpath + '/' + encodeURIComponent(name);

	/**
	 * Get name
	 * @return {string} Name
	 * @function
	 */
	this.getName = function() {
		return this.metadata.name;
	};

	/**
	 * Build URL-encoded parameters
	 * @param {object} params URL parameters as key/value pairs
	 * @function
	 */
	this.callParams = function(params) {
		var p = '';
		if (!params) return p;
		var n = 0;
		for (var i in params) {
			var v = params[i] || '';
			if (v.sort) { // Array ?
				for (var j = 0; j < v.length; j++)
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(v[j]);
			} else {
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(v);
			}
		}
		return p;
	};

	/**
	 * Call an external object
	 * @param {function} callback Callback (called upon success)
	 * @param {object} [params] Optional URL parameters
	 * @param {object} [data] Optional data
	 * @param {object} [opts] Options
	 * @function
	 */
	function _call(callback, params, data, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (params)
			p = '?' + self.callParams(params);
		var m = opts.method ? opts.method : (data ? 'post' : 'get');
		var h = {};
		if (opts.contentType)
			h['Content-Type'] = opts.contentType;
		var b = self.session.getBearerTokenHeader();
		if (b) {
			self.session.debug('[simplicite.ExternalObject.call] Using bearer token header = ' + b);
			h['X-Simplicite-Authorization'] = b;
		} else {
			b = self.session.getBasicAuthHeader();
			if (b) {
				self.session.debug('[simplicite.ExternalObject.call] Using basic auth header = ' + b);
				h.Authorization = b;
			}
		}
		axios.request({
			baseURL: self.session.parameters.url,
			url: self.path + p,
			method: m,
			headers: h,
			timeout: self.session.timeout * 1000,
			withCredentials: true,
			data: data
		}).then(function (res) {
			if (callback)
				callback.call(self, res.data, res.status, res.headers);
		}).catch(function(err) {
			if (opts.error)
				opts.error.call(self, err);
			else
				throw err;
		});
	}

	/**
	 * Call an external object
	 * @param {object} [params] Optional URL parameters
	 * @param {object} [data] Optional data (for 'post' and 'put' methods only)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @param {object} [opts.method] Optional method 'get', 'post', 'put' or 'delete' (defaults to 'get' if data is not set or 'post" if data is set
	 * @param {function} [opts.contentType] Optional data content type (for 'post' and 'put' methods only)
	 * @return {promise<object>} Promise to the external object content
	 * @function
	 */
	this.call = function(params, data, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = opts.error || function(e) { d.reject(e); };
		_call.call(this, function(value) { d.resolve(value); }, params, data, opts);
		return d.promise;
	};
}

module.exports = {
	session: session,
	Session: Session,
	Grant: Grant,
	BusinessObject: BusinessObject,
	BusinessObjectMetadata: BusinessObjectMetadata,
	ExternalObject: ExternalObject
};
