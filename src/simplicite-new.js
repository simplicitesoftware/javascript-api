/**
 * **Simplicite(R) platform** Javascript API (for node.js and browser).
 * @module simplicite
 * @version 1.1.1
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
	 * @const {string}
	 */
	DEFAULT_ROW_ID_NAME: 'row_id',

	/**
	 * Default row ID value
	 * @const {string}
	 */
	DEFAULT_ROW_ID: '0',

	/**
	 * Default context
	 * @const {number}
	 */
	CONTEXT_NONE: 0,
	/**
	 * Search context
	 * @const {number}
	 */
	CONTEXT_SEARCH: 1,
	/**
	 * List context
	 * @const {number}
	 */
	CONTEXT_LIST: 2,
	/**
	 * Creation context
	 * @const {number}
	 */
	CONTEXT_CREATE: 3,
	/**
	 * Copy context
	 * @const {number}
	 */
	CONTEXT_COPY: 4,
	/**
	 * Update context
	 * @const {number}
	 */
	CONTEXT_UPDATE: 5,
	/**
	 * Delete context
	 * @const {number}
	 */
	CONTEXT_DELETE: 6,
	/**
	 * Chart context
	 * @const {number}
	 */
	CONTEXT_GRAPH: 7,
	/**
	 * Pivot table context
	 * @const {number}
	 */
	CONTEXT_CROSSTAB: 8,
	/**
	 * Publication context
	 * @const {number}
	 */
	CONTEXT_PRINTTMPL: 9,
	/**
	 * Bulk update context
	 * @const {number}
	 */
	CONTEXT_UPDATEALL: 10,
	/**
	 * Reference selection context
	 * @const {number}
	 */
	CONTEXT_REFSELECT: 11,
	/**
	 * Datamap selection context
	 * @const {number}
	 */
	CONTEXT_DATAMAPSELECT: 12,
	/**
	 * Pre validation context
	 * @const {number}
	 */
	CONTEXT_PREVALIDATE: 13,
	/**
	 * Post validation context
	 * @const {number}
	 */
	CONTEXT_POSTVALIDATE: 14,
	/**
	 * State transition context
	 * @const {number}
	 */
	CONTEXT_STATETRANSITION: 15,
	/**
	 * Export context
	 * @const {number}
	 */
	CONTEXT_EXPORT: 16,
	/**
	 * Import context
	 * @const {number}
	 */
	CONTEXT_IMPORT: 17,
	/**
	 * Association context
	 * @const {number}
	 */
	CONTEXT_ASSOCIATE: 18,
	/**
	 * Panle list context
	 * @const {number}
	 */
	CONTEXT_PANELLIST: 19,

	/**
	 * Foreign key (reference) type
	 * @const {number}
	 */
	TYPE_ID: 0,
	/**
	 * Integer type
	 * @const {number}
	 */
	TYPE_INT: 1,
	/**
	 * Decimal type
	 * @const {number}
	 */
	TYPE_FLOAT: 2,
	/**
	 * Short string type
	 * @const {number}
	 */
	TYPE_STRING: 3,
	/**
	 * Date type
	 * @const {number}
	 */
	TYPE_DATE: 4,
	/**
	 * Date and time type
	 * @const {number}
	 */
	TYPE_DATETIME: 5,
	/**
	 * Time type
	 * @const {number}
	 */
	TYPE_TIME: 6,
	/**
	 * Simple enumeration type
	 * @const {number}
	 */
	TYPE_ENUM: 7,
	/**
	 * Boolean type
	 * @const {number}
	 */
	TYPE_BOOLEAN: 8,
	/**
	 * Password type
	 * @const {number}
	 */
	TYPE_PASSWORD: 9,
	/**
	 * URL type
	 * @const {number}
	 */
	TYPE_URL: 10,
	/**
	 * HTML content type
	 * @const {number}
	 */
	TYPE_HTML: 11,
	/**
	 * Email type
	 * @const {number}
	 */
	TYPE_EMAIL: 12,
	/**
	 * Long string type
	 * @const {number}
	 */
	TYPE_LONG_STRING: 13,
	/**
	 * Multiple enumeration type
	 * @const {number}
	 */
	TYPE_ENUM_MULTI: 14,
	/**
	 * Validated string type
	 * @const {number}
	 */
	TYPE_REGEXP: 15,
	/**
	 * Document type
	 * @const {number}
	 */
	TYPE_DOC: 17,
	/**
	 * Decimal type
	 * @const {number}
	 * @deprecated
	 */
	TYPE_FLOAT_EMPTY: 18,
	/**
	 * External file type
	 * @const {number}
	 * @deprecated
	 */
	TYPE_EXTFILE: 19,
	/**
	 * Image type
	 * @const {number}
	 */
	TYPE_IMAGE: 20,
	/**
	 * Notepad type
	 * @const {number}
	 */
	TYPE_NOTEPAD: 21,
	/**
	 * Phone number type
	 * @const {number}
	 */
	TYPE_PHONENUM: 22,
	/**
	 * RGB color type
	 * @const {number}
	 */
	TYPE_COLOR: 23,
	/**
	 * Object type
	 * @const {number}
	 */
	TYPE_OBJECT: 24,
	/**
	 * Geocoordinates type
	 * @const {number}
	 */
	TYPE_GEOCOORDS: 25,

	/**
	 * Not visible
	 * @const {number}
	 */
	VIS_NOT: 0,
	/**
	 * Hiiden (same as not visible)
	 * @const {number}
	 */
	VIS_HIDDEN: 0,
	/**
	 * Visible on lists only
	 * @const {number}
	 */
	VIS_LIST: 1,
	/**
	 * Visible on forms only
	 * @const {number}
	 */
	VIS_FORM: 2,
	/**
	 * Visible on both lists and forms only
	 * @const {number}
	 */
	VIS_BOTH: 3,

	/**
	 * No search
	 * @const {number}
	 */
	SEARCH_NONE: 0,
	/**
	 * Simple search
	 * @const {number}
	 */
	SEARCH_MONO: 1,
	/**
	 * Multiple search (checkboxes)
	 * @const {number}
	 */
	SEARCH_MULTI_CHECK: 2,
	/**
	 * Multiple search (listbox)
	 * @const {number}
	 */
	SEARCH_MULTI_LIST: 3,
	/**
	 * Search by period (date/time)
	 * @const {number}
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
	 * @const {number}
	 */
	ERRLEVEL_FATAL: 1,
	/**
	 * Error level
	 * @const {number}
	 */
	ERRLEVEL_ERROR: 2,
	/**
	 * Warning level
	 * @const {number}
	 */
	ERRLEVEL_WARNING: 3
};

/**
 * Timeout (seconds, defaults to 30)
 * @var
 */
var timeout = 30;

/**
 * Username
 * @var
 */
var username;

/**
 * Password
 * @var
 */
var password;

/**
 * Auth token
 * @var
 */
var authtoken;
 
/**
 * Parameters
 * @constant
 */
var parameters;

/**
 * Debug enabled? (defaults to false)
 * @private
 */
var _debug = false;

/**
 * Log handler
 * @param {any} arg Argument
 * @function
 */
var log = function(arg) {
	console.log(arg);
};

/**
 * Info handler
 * @param {any} arg Argument
 * @function
 */
var info = function(arg) {
	console.info(arg);
};

/**
 * Warning handler
 * @param {any} arg Argument
 * @function
 */
var warn = function(arg) {
	console.warn(arg);
};

/**
 * Error handler
 * @param {any} arg Argument
 * @function
 */
var error = function(arg) {
	console.error(arg);
};

/**
 * Debug handler
 * @param {any} arg Argument
 * @function
 */
var debug = function(arg) {
	if (_debug)
		console.log(arg);
};

/**
 * Simplicite application session
 * @param {Object} Parameters
 * @function
 */
function session(params) {
	params = params || {};

	_debug = !!params.debug;

	if (params.log) info = params.log;
	if (params.info) info = params.info;
	if (params.warn) warn = params.warn;
	if (params.error) error = params.error;
	if (params.debug) debug = params.debug;

	username = params.username || params.login; // naming flexibility
	password = params.password || params.pwd; // naming flexibility
	authtoken = params.authtoken || params.authToken || params.token; // naming flexibility

	timeout = params.timeout;

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
			error('Unable to parse URL [' + params.url + ']: ' + e.message);
			return;
		}
	}
	
	var scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
	if (scheme !== 'http' && scheme !== 'https') {
		error('Incorrect scheme [' + params.scheme + ']');
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

	this.parameters = {
		scheme: scheme,
		host: host,
		port: port,
		root: root,
		url: url
	};

	return this;
}

/**
 * Set username
 * @param {string} usr Username
 * @function
 */
function setUsername(usr) {
	this.username = usr;
}

/**
 * Set password
 * @param {string} pwd Password
 * @function
 */
function setPassword(pwd) {
	this.password = pwd;
}

/**
 * Basic HTTP authorization header
 * @private
 */
function getBasicAuthHeader() {
	return this.username && this.password
		? 'Basic ' + (buffer.Buffer.from ? buffer.Buffer.from(this.username + ':' + this.password) : new buffer.Buffer(this.username + ':' + this.password)).toString('base64')
		: null;
}

/**
 * Set auth token
 * @param {string} t Auth token
 * @function
 */
function setAuthToken(t) {
	this.authtoken = t;
}

/**
 * Get bearer token header
 * @private
 */
function getBearerTokenHeader() {
	return this.authtoken
		? 'Bearer ' + this.authtoken
		: null;
}

/**
 * Request parameters
 * @param {object} data Data
 * @private
 */
function reqParams(data) {
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
 * Request
 * @param {string} path Path
 * @param {object} data Data
 * @param {function} callback Callback
 * @param {function} error Error handler
 * @private
 */
function req(path, data, callback, error) {
	var self = this;
	var m = data ? 'post' : 'get';
	var h = {};
	if (data)
		h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
	var b = getBearerTokenHeader.call(this);
	if (b) {
		self.debug('[simplicite.req] Using bearer token header = ' + b);
		h['X-Simplicite-Authorization'] = b;
	} else {
		b = getBasicAuthHeader.call(this);
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
		timeout: timeout * 1000,
		withCredentials: true,
		data: data
	}).then(function (res) {
		if (callback)
			callback.call(self, res.data, res.status);
	}).catch(function(err) {
		if (error)
			error.call(self, err);
		else
			throw err;
	});
}

/**
 * Get error object
 * @param {object} err Error
 * @param {string} err.message Error message
 * @param {number} status Error status
 * @function
 */
function getError(err, status) {
	return typeof err === 'string' ? { message: err, status: status } : err;
}

/**
 * Parse result
 * @param {object} res Response to parse
 * @param {number} status HTTP status
 * @private
 */
function parse(res, status) {
	try {
		if (status !== 200)
			return { type: 'error', response: getError('HTTP status: ' + status, status) };
		return typeof res === 'object' ? res : JSON.parse(res);
	} catch (e) {
		return { type: 'error', response: getError('Parsing error: ' + e.message, status) };
	}
}

/**
 * Is used within generic UI?
 * @constant
 */
var ui = typeof window !== 'undefined' && typeof window.$ui !== 'undefined';

/**
 * Health check service path
 * @private
 */
var healthpath = (ui ? '/ui/' : '') + '/health?format=json';

/**
 * Get health check (no need to be authenticated)
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getHealth(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, healthpath, undefined, function(res, status) {
		self.debug('[simplicite._getHealth] HTTP status = ' + status + ', response = ' + res);
		var health = parse(res, status);
		if (health.type === 'error') {
			(opts.error ? opts.error : error).call(self, health.response);
		} else if (callback) {
			callback.call(self, health);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get health check (no need to be authenticated)
 * @param {object} opts Options
 * @function
 */
function getHealth(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { var err = getError(e); d.reject(err); };
	_getHealth.call(this, function(health) { health = health || {}; d.resolve(health); }, opts);
	return d.promise;
}

/**
 * Application services path
 * @private
 */
var apppath = '/' + (ui ? 'ui' : 'api') + '/json/app';

/**
 * Business object services path
 * @private
 */
var objpath = '/' + (ui ? 'ui' : 'api') + '/json/obj';

/**
 * Business processes services path
 * @private
 */
var pcspath = '/' + (ui ? 'ui' : 'api') + '/json/pcs';

/**
 * External object services path
 * @private
 */
var extpath = '/' + (ui ? 'ui' : 'api') + '/ext';

/**
 * Clears all data (credentials, objects, ...)
 * @function
 */
function clear() {
	this.username = undefined;
	this.password = undefined;
	this.authtoken = undefined;
	this.sessionid = undefined;

	this.grant = undefined;

	this.appinfo = undefined;
	this.sysinfo = undefined;
	this.userinfo = undefined;

	businessObjectCache = {};
}

/**
 * Login
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _login(callback, opts) {
	var self = this;
	opts = opts || {};
	if (opts.username || opts.login) {
		clear();
		self.username = opts.username || opts.login;
		if (opts.password || opts.pwd)
			self.password = opts.password || opts.pwd;	
	}
	req.call(self, apppath + '?action=session', undefined, function(res, status) {
		self.debug('[simplicite.login] HTTP status = ' + status + ', response = ' + res);
		var r = parse(res, status);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
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
			self.grant = {
				login: r.response.login,
				userid: r.response.userid,
				firstname: r.response.firstanme,
				lastname: r.response.lastname,
				email: r.response.email
			};
			if (callback)
				callback.call(self, r.response);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Login
 * @param {object} opts Options
 * @function
 */
function login(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_login.call(this, function(res) { d.resolve(res); }, opts);
	return d.promise;
}

/**
 * Logout
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _logout(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=logout', undefined, function(res, status) {
		self.debug('[simplicite.logout] HTTP status = ' + status + ', response = ' + res);
		var r = parse(res, status);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			clear.call(self);
			if (callback)
				callback.call(self, r.response);
		}
	}, function(e) {
		if (e.status === 401) // Removes (expired or deleted) token if any
			self.authtoken = undefined;
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Logout
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @function
 */
function logout(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_logout.call(this, function(res) { d.resolve(res); }, opts);
	return d.promise;
}

/**
 * Grant
 * @var
 */
var grant = {};

/**
 * Get user (grant)
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getGrant(callback, opts) {
	var self = this;
	opts = opts || {};
	var p = '';
	if (opts.inlinePicture)
		p += '&inline_picture=' + opts.inlinePicture;
	req.call(self, apppath + '?action=getgrant' + p, undefined, function(res, status) {
		self.debug('[simplicite.getGrant] HTTP status = ' + status + ', response = ' + res);
		var r = parse(res, status);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.grant = r.response;
			/*if (self.grant.picture) {
				self.grant.picture.url = self.documentURL('User', 'usr_image_id', self.grant.userid, self.grant.picture.id);
				self.grant.picture.thumbnailurl = self.grant.picture.url + '&thumbnail=true';
			}*/
			self.grant.getUserId = function() { return this.userid; };
			self.grant.getLogin = function() { return this.login; };
			self.grant.getLang = function() { return this.lang; };
			self.grant.getEmail = function() { return this.email; };
			self.grant.getFirstName = function() { return this.firstname; };
			self.grant.getLastName = function() { return this.lastname; };
			self.grant.hasResponsibility = function(group) { return this.responsibilities && this.responsibilities.indexOf(group) !== -1; };
			if (callback)
				callback.call(self, self.grant);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get user (grant)
 * @param {object} opts Options
 * @function
 */
function getGrant(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_getGrant.call(this, function(grant) { d.resolve(grant); }, opts);
	return d.promise;
}

/**
 * Business objects cache
 * @type {object}
 * @private
 */
var businessObjectCache = {};

/**
 * Get business object cache key
 * @param {string} name Business object name
 * @param {string} instance Optional business object instance name
 * @return Business object cache key
 * @function
 */
function getBusinessObjectCacheKey(name, instance) {
	return name + ':' + (instance || 'js_' + name);
}

/**
 * Business object meta data.
 * <br/><span style="color: red;">You **should never** instanciate this class directly
 * but rather use it from the `metadata` variable of your `BusinessObject` instances</span>.
 * @param {string} name Business object name
 * @param {string} instance Optional business object instance name
 * @class
 */
class BusinessObjectMetadata {
	constructor(name, instance) {
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
		 * @var {string}
		 */
		this.rowidfield = constants.DEFAULT_ROW_ID_NAME;

		/**
		 * Display label
		 * @var {string}
		 */
		this.label = name;

		/**
		 * Help
		 * @var {string}
		 */
		this.help = '';

		/**
		 * Fields definitions
		 * @var {Array}
		 */
		this.fields = [];
	}
}

/**
 * Business object.
 * <br/><span style="color: red;">Note that you <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} session Session
 * @param {string} name Business object name
 * @param {string} instance Optional business object instance name
 * @class
 */
function BusinessObject(session, name, instance) {
	instance = instance || 'js_' + name;

	/**
	 * Session
	 * @private
	 */
	this.session = session;

	/**
	 * Object metadata
	 * @var {BusinessObjectMetadata}
	 */
	this.metadata = new BusinessObjectMetadata(name, instance);

	/**
	 * cache key
	 * @constant {string}
	 */
	this.cacheKey = getBusinessObjectCacheKey(name, instance);

	/**
	 * Path
	 * @constant {string}
	 */
	this.path = objpath + '?object=' + name + '&inst=' + instance;

	/**
	 * Current item
	 * @var {Object}
	 */
	this.item = {};

	/**
	 * Current filters
	 * @var {Object}
	 */
	this.filters = {};

	/**
	 * Current list
	 * @var {Object[]}
	 */
	this.list = [];

	/**
	 * Get meta data
	 * @param {function} callback Callback (called upon success)
	 * @param {object} opts Options
	 * @private
	 */
	function _getMetaData(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.context)
			p += '&context=' + opts.context;
		if (opts.contextParam)
			p += '&contextparam=' + opts.contextParam;
		req.call(self.session, self.path + '&action=metadata' + p, undefined, function(res, status) {
			this.debug('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response = ' + res);
			var r = parse(res, status);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.metadata = r.response;
				if (callback)
					callback.call(self, self.metadata);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Get meta data
	 * @param {object} opts Options
	 * @function
	 */
	this.getMetaData = function(opts) {
		var d = Q.defer();
		_getMetaData.call(this, function(metadata) { d.resolve(metadata); }, opts);
		return d.promise;
	};

	/**
	 * Get name
	 * @return {string} Name
	 * @function
	 */
	this.getName = function() {
		return metadata.name;
	};

	/**
	 * Get instance name
	 * @return {string} Instance name
	 * @function
	 */
	this.getInstance = function() {
		return metadata.instance;
	};

	/**
	 * Get display label
	 * @return {string} Display label
	 * @function
	 */
	this.getLabel = function() {
		return metadata.label;
	};

	/**
	 * Get help
	 * @return {string} Help
	 * @function
	 */
	this.getHelp = function() {
		return metadata.help;
	};

	/**
	 * Get all fields definitions
	 * @return {Array} Fields definitions
	 * @function
	 */
	this.getFields = function() {
		return metadata.fields;
	};
}

/**
 * Get business object
 * @param {string} name Business object name
 * @param {string} instance Optional business object instance name
 * @return {BusinessObject} Business object
 * @function
 */
function getBusinessObject(name, instance) {
	var cacheKey = getBusinessObjectCacheKey(name, instance);

	var obj = businessObjectCache[cacheKey];
	if (!obj) {
		obj = new BusinessObject(this, name, instance);
		businessObjectCache[cacheKey] = obj;
	}

	return obj;
}

/**
 * Get a business process
 * @param {string} name Business process name
 * @function
 */
function getBusinessProcess(name) {
	return {
		metadata: { name: name }
	};
}

/**
 * Get an external object
 * @param {string} External object name
 * @function
 */
function getExternalObject(name) {
	return {
		metadata: { name: name }
	};
}

module.exports = {
	constants: constants,
	log: log,
	info: info,
	warn: warn,
	error: error,
	debug: debug,
	parameters: parameters,
	username: username,
	password: password,
	authtoken: authtoken,
	timeout: timeout,
	session: session,
	setUsername: setUsername,
	setLogin: setUsername, // Naming flexibility
	setPassword: setPassword,
	setAuthToken: setAuthToken,
	setToken: setAuthToken, // Naming flexibility
	clear: clear,
	getError: getError,
	getHealth: getHealth,
	login: login,
	logout: logout,
	getBusinessObject: getBusinessObject,
	getBusinessProcess: getBusinessProcess,
	getExternalObject: getExternalObject,
	BusinessObject: BusinessObject,
	BusinessObjectMetadata: BusinessObjectMetadata
};
