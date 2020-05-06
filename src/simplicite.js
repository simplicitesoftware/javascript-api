/**
 * Simplicite(R) platform Javascript API (for node.js and browser).
 * @module $(jq -r '.name' package.json)
 * @version $(jq -r '.version' package.json)
 * @license $(jq -r '.license' package.json)
 */
module.exports = {
	/**
	 * Simplicite application session
	 * @exports simplicite.session
	 */
	session: function(params) {
		var Q = require('q');
		var request = require('xhr-request');
		var buffer = require('buffer');

		var infoHandler = params.infoHandler || function(msg) { console.log('INFO - ' + msg); };
		var warnHandler = params.warnHandler || function(msg) { console.log('WARN - ' + msg); };
		var errorHandler = params.errorHandler || function(msg) { console.log('ERROR - ' + msg); };
		var debugHandler = params.debugHandler || function(msg) { if (debug) console.log('DEBUG - ' + msg); };

		/**
		 * Constants
		 */
		var constants = {
			/**
			 * Default row ID
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

			VIS_NOT: 0,
			VIS_LIST: 1,
			VIS_FORM: 2,
			VIS_BOTH: 3,

			SEARCH_NONE: 0,
			SEARCH_MONO: 1,
			SEARCH_MULTI_CHECK: 2,
			SEARCH_MULTI_LIST: 3,

			RENDERING_DEFAULT: '',
			RENDERING_SELECTBOX: 'SB',
			RENDERING_HORIZCHECKBOX: 'HCB',
			RENDERING_VERTCHECKBOX: 'VCB',
			RENDERING_HORIZRADIOBUTTON: 'HRB',
			RENDERING_VERTRADIOBUTTON: 'VRB',

			TRUE: '1',
			FALSE: '0',

			ERRLEVEL_FATAL: 1,
			ERRLEVEL_ERROR: 2,
			ERRLEVEL_WARNING: 3
		};

		params = params || {};

		/**
		 * Debug
		 * @private
		 */
		var debug = params.debug || false;

		/**
		 * Timeout
		 * @private
		 */
		var timeout = params.timeout || 30;

		if (params.url) {
			try {
				params.scheme = params.url.replace(/:.*$/, '');
				var u = params.url.replace(new RegExp('^' + params.scheme + ':\/\/'), '').split(':');
				if (u.length === 1) {
					params.host = u[0].replace(/\/.*$/, '');
					params.port = params.scheme === 'http' ? 80 : 443;
					params.root = u[0].replace(new RegExp('^' + params.host + '[\/]{0,1}'), '');
				} else {
					params.host = u[0];
					params.port = parseInt(u[1].replace(/\/.*$/, ''), 10);
					if (isNaN(params.port)) throw new Error('Incorrect port');
					params.root = u[1].replace(new RegExp('^' + params.port + '[\/]{0,1}'), '');
				}
				if (params.root === '/') params.root = '';
			} catch (e) {
				console.error('Unable to parse URL [' + params.url + ']: ' + e.message);
				return;
			}
		}

		var scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
		if (scheme !== 'http' && scheme !== 'https') {
			console.error('Incorrect scheme [' + params.scheme + ']');
			return;
		}
		var host = params.host || 'localhost';
		var port = params.port || 8080;
		var approot = params.root || '';
		debugHandler('[simplicite] Base URL = ' + scheme + '://' + host + ':' + port + (approot !== '' ? '/' + approot : ''));

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
		 * Cookies
		 * @private
		 */
		var cookies = null;

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
			var p = path || '/';
			p = (approot !== '' ? '/' + approot : '') + p;
			var m = data ? 'POST' : 'GET';
			var h = {};
			if (data)
				h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			var b = getBearerTokenHeader.call(this);
			if (b) {
				debugHandler('[simplicite.res] Using bearer token header = ' + b);
				h['X-Simplicite-Authorization'] = b;
			} else {
				b = getBasicAuthHeader.call(this);
				if (b) {
					debugHandler('[simplicite.res] Using basic auth header = ' + b);
					h.Authorization = b;
				}
			}
			if (cookies)
				h.Cookie = cookies;
			request(scheme + '://' + host + ':' + port + p, {
					method: m,
					headers: h,
					timeout: timeout * 1000,
					withCredentials: true,
					body: data
				}, function (err, dat, res) {
					if (err) {
						if (error)
							error.call(this, err);
						else
							throw err;
					} else if (callback) {
						callback.call(this, dat, res.statusCode);
					}
				});
		}

		/**
		 * Get error object
		 * @param {object} error Error
		 * @param {string} error.message Error message
		 * @param {number} status Error status
		 */
		function getError(error, status) {
			return typeof error === 'string' ? { message: error, status: status } : error;
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
				return JSON.parse(res);
			} catch (e) {
				return { type: 'error', response: getError('Parsing error: ' + e.message, status) };
			}
		}

		/**
		 * Check if used within generic UI
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
		 * @function
		 */
		function _getHealth(callback, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, healthpath, undefined, function(res, status) {
				debugHandler('[simplicite._getHealth] HTTP status = ' + status + ', response = ' + res);
				var health = parse(res, status);
				if (health.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, health.response);
				} else if (callback) {
					callback.call(self, health);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
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

		/* TODO:
		 * Business processes services path
		 * @private
		 */
		//var pcspath = '/' + (ui ? 'ui' : 'api') + '/json/pcs';

		/**
		 * Clear
		 * @private
		 */
		function clear() {
			this.username = undefined;
			this.password = undefined;
			this.authtoken = undefined;
			this.sessionid = undefined;
			this.cookies = undefined;

			this.appinfo = undefined;
			this.sysinfo = undefined;
			this.userinfo = undefined;
			this.grant = undefined;
			businessObjectCache = {};
		}

		/**
		 * Login
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
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
				debugHandler('[simplicite.login] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.sessionid = r.response.id;
					debugHandler('[simplicite.login] Session ID = ' + self.sessionid);
					self.username = r.response.login;
					if (self.username)
						debugHandler('[simplicite.login] Username = ' + self.username);
					self.authtoken = r.response.authtoken;
					if (self.authtoken)
						debugHandler('[simplicite.login] Auth token = ' + self.authtoken);
					if (callback)
						callback.call(self, r.response);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/**
		 * Logout
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		function _logout(callback, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, apppath + '?action=logout', undefined, function(res, status) {
				debugHandler('[simplicite.logout] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					clear.call(self);
					if (callback)
						callback.call(self, r.response);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/**
		 * Get user (grant)
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		function _getGrant(callback, opts) {
			var self = this;
			opts = opts || {};
			var p = '';
			if (opts.inlinePicture)
				p += '&inline_picture=' + opts.inlinePicture;
			req.call(self, apppath + '?action=getgrant' + p, undefined, function(res, status) {
				debugHandler('[simplicite.getGrant] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.grant = r.response;
					/*if (self.grant.picture) {
						self.grant.picture.url = self.documentURL('User', 'usr_image_id', self.grant.userid, self.grant.picture.id);
						self.grant.picture.thumbnailurl = self.grant.picture.url + '&thumbnail=true';
					}*/
					self.grant.getUserID = function() { return this.userid; };
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
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/*
		 * TODO: Set password
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		/*function _setPassword(callback, password, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, apppath + '?action=setpassword&password=' + password, undefined, function(res, status) {
				debugHandler('[simplicite.setPassword] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					if (callback)
						callback.call(self, self.appinfo);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}*/

		/**
		 * Get application info
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		function _getAppInfo(callback, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, apppath + '?action=getinfo', undefined, function(res, status) {
				debugHandler('[simplicite.getAppInfo] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.appinfo = r.response;
					if (callback)
						callback.call(self, self.appinfo);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/**
		 * Get system info
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		function _getSysInfo(callback, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, apppath + '?action=sysinfo', undefined, function(res, status) {
				debugHandler('[simplicite.getSysInfo] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.sysinfo = r.response;
					if (callback)
						callback.call(self, self.sysinfo);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/**
		 * Get user info
		 * @param {function} callback Callback (called upon success)
		 * @param {string} userlogin User login
		 * @param {object} opts Options
		 * @function
		 */
		function _getUserInfo(callback, userlogin, opts) {
			var self = this;
			opts = opts || {};
			req.call(self, apppath + '?action=userinfo' + (userlogin ? '&login=' + userlogin: ''), undefined, function(res, status) {
				debugHandler('[simplicite.getUserInfo] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.userinfo = r.response;
					if (callback)
						callback.call(self, self.userinfo);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		/**
		 * Get news
		 * @param {function} callback Callback (called upon success)
		 * @param {object} opts Options
		 * @function
		 */
		function _getNews(callback, opts) {
			var self = this;
			opts = opts || {};
			var p = '';
			if (opts.inlineImages)
				p += '&inline_images=' + opts.inlineImages;
			req.call(self, apppath + '?action=news' + p, undefined, function(res, status) {
				debugHandler('[simplicite.getNews] HTTP status = ' + status + ', response = ' + res);
				var r = parse(res, status);
				if (r.type === 'error') {
					(opts.error ? opts.error : errorHandler).call(self, r.response);
				} else {
					self.news = r.response;
					if (callback)
						callback.call(self, self.news);
				}
			}, function(e) {
				(opts.error ? opts.error : errorHandler).call(self, e);
			});
		}

		// TODO: add other methods (getMenu, getTexts, get/setSysParam, documentURL, contentURL, resourceURL)

		/**
		 * Business objects cache
		 * @type {object}
		 * @private
		 */
		var businessObjectCache = {};

		/**
		 * Get business object
		 * @param {string} name Business object name
		 * @param {string} instance Optional business object instance name
		 * @exports simplicite.session.businessobject
		 */
		function getBusinessObject(name, instance) {
			var session = this;

			instance = instance || 'js_' + name;

			var cacheKey = name + ':' + instance;
			var obj = businessObjectCache[cacheKey];
			if (obj) return obj;

			var path = objpath + '?object=' + name + '&inst=' + instance;

			/**
			 * Get meta data
			 * @param {function} callback Callback (called upon success)
			 * @param {object} opts Options
			 * @function
			 */
			function _getMetaData(callback, opts) {
				var self = this;
				opts = opts || {};
				var p = '';
				if (opts.context)
					p += '&context=' + opts.context;
				if (opts.contextParam)
					p += '&contextparam=' + opts.contextParam;
				req.call(session, path + '&action=metadata' + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.metadata = r.response;
						if (callback)
							callback.call(self, self.metadata);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Get current filters
			 * @param {function} callback Callback (called upon success)
			 * @param {object} opts Options
			 * @function
			 */
			function _getFilters(callback, opts) {
				var self = this;
				opts = opts || {};
				var p = '';
				if (opts.context)
					p += '&context=' + opts.context;
				if (opts.reset)
					p += '&reset=' + opts.reset;
				req.call(session, path + '&action=filters' + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.filters);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Build options parameters
			 * @param {object} options Options
			 * @function
			 * @private
			 */
			function _getOptions(options) {
				var opts = '';
				if (options.context)
					opts += '&context=' + options.context;
				var id = options.inlineDocs;
				if (!id)
					id = options.inlineDocuments;
				if (id)
					opts += '&inline_documents=' + (id.join ? id.join(',') : id);
				var it = options.inlineThumbs;
				if (!it)
					it = options.inlineThumbnails;
				if (it)
					opts += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
				var io = options.inlineObjs;
				if (!io)
					io = options.inlineObjects;
				if (io)
					opts += "&inline_objects=" + (io.join ? io.join(",") : io);
				return opts;
			}

			/**
			 * Search
			 * @param {function} callback Callback (called upon success)
			 * @param {object} filters Filters (defaults to current filters)
			 * @param {object} opts Options
			 * @function
			 */
			function _search(callback, filters, opts) {
				var self = this;
				if (filters)
					self.filters = filters;
				opts = opts || {};
				var p = _getOptions(opts);
				if (opts.page > 0)
					p += '&page=' + (opts.page - 1);
				if (opts.metadata===true) p += "&_md=true";
				if (opts.visible===true) p += "&_visible=true";
				req.call(session, path + '&action=search' + p, reqParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						if (res.meta) self.metadata = r.response.meta;
						self.count = r.response.count;
						self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
						self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
						self.list = r.response.list;
						if (callback)
							callback.call(self, self.list);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Count
			 * @param {function} callback Callback (called upon success)
			 * @param {object} filters Filters (defaults to current filters)
			 * @param {object} opts Options
			 * @function
			 */
			function _getCount(callback, filters, opts) {
				var self = this;
				if (filters)
					self.filters = filters;
				opts = opts || {};
				req.call(session, path + '&action=count', reqParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.count = r.response.count;
						self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
						self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
						self.list = [];
						if (callback)
							callback.call(self, self.count);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Get
			 * @param {function} callback Callback (called upon success)
			 * @param {string} rowId Row ID
			 * @param {object} opts Options
			 * @function
			 */
			function _get(callback, rowId, opts) {
				var self = this;
				opts = opts || {};
				var p = _getOptions(opts);
				var tv = opts.treeView;
				if (tv)
					p += '&treeview=' + tv;
				if (opts.fields) {
					for (var i = 0; i < opts.fields.length; i++) {
						p += '&fields=' + opts.fields[i].replace('.', '__');
					}
				}
				if (opts.metadata) p += "&_md=true";
				if (opts.social) p += "&_social=true";
				req.call(session, path + '&action=get&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = tv ? r.response.item : r.response;
						if (callback)
							callback.call(self, tv ? r.response : self.item);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Get for create
			 * @param {function} callback Callback (called upon success)
			 * @param {object} opts Options
			 * @function
			 */
			function _getForCreate(callback, opts) {
				opts = opts || {};
				opts.context = constants.CONTEXT_CREATE;
				this._get(callback, constants.DEFAULT_ROW_ID, opts);
			}

			/**
			 * Get for update
			 * @param {function} callback Callback (called upon success)
			 * @param {string} rowId Row ID
			 * @param {object} opts Options
			 * @function
			 */
			function _getForUpdate(callback, rowId, opts) {
				opts = opts || {};
				opts.context = constants.CONTEXT_UPDATE;
				this._get(callback, rowId, opts);
			}

			/**
			 * Get for copy
			 * @param {function} callback Callback (called upon success)
			 * @param {string} rowId Row ID to copy
			 * @param {object} opts Options
			 * @function
			 */
			function _getForCopy(callback, rowId, opts) {
				opts = opts || {};
				opts.context = constants.CONTEXT_COPY;
				this._get(callback, rowId, opts);
			}

			/**
			 * Get for delete
			 * @param {function} callback Callback (called upon success)
			 * @param {string} rowId Row ID
			 * @param {object} opts Options
			 * @function
			 */
			function _getForDelete(callback, rowId, opts) {
				opts = opts || {};
				opts.context = constants.CONTEXT_CREATE;
				this._get(callback, rowId, opts);
			}

			/**
			 * Populate
			 * @param {function} callback Callback (called upon success)
			 * @param {string} rowId Row ID
			 * @param {object} opts Options
			 * @function
			 */
			function _populate(callback, rowId, opts) {
				var self = this;
				opts = opts || {};
				var p = _getOptions(opts);
				req.call(session, path + '&action=populate&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Save
			 * @param {function} callback Callback (called upon success)
			 * @param {object} item Item (defaults to current item)
			 * @param {object} opts Options
			 * @function
			 */
			function _save(callback, item, opts) {
				if (item)
					this.item = item;
				if (this.item[this.metadata.rowidfield] === constants.DEFAULT_ROW_ID)
					this.create(callback, item, opts);
				else
					this.update(callback, item, opts);
			}

			/**
			 * Create (create or update)
			 * @param {function} callback Callback (called upon success)
			 * @param {object} item Item (defaults to current item)
			 * @param {object} opts Options
			 * @function
			 */
			function _create(callback, item, opts) {
				var self = this;
				if (item)
					self.item = item;
				opts = opts || {};
				var p = _getOptions(opts);
				req.call(session, path + '&action=create' + p, reqParams(self.item), function(res, status) {
					debugHandler('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response.data ? r.response.data : r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Update
			 * @param {function} callback Callback (called upon success)
			 * @param {object} item Item (defaults to current item)
			 * @param {object} opts Options
			 * @function
			 */
			function _update(callback, item, opts) {
				var self = this;
				if (item)
					self.item = item;
				opts = opts || {};
				var p = _getOptions(opts);
				req.call(session, path + '&action=update' + p, reqParams(self.item), function(res, status) {
					debugHandler('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response.data ? r.response.data : r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Delete
			 * @param {function} callback Callback (called upon success)
			 * @param {object} item Item (defaults to current item)
			 * @param {object} opts Options
			 * @function
			 */
			function _del(callback, item, opts) {
				var self = this;
				if (item)
					self.item = item;
				opts = opts || {};
				req.call(session, path + '&action=delete&' + self.metadata.rowidfield + '=' + self.item[self.metadata.rowidfield], undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.item = undefined;
						delete r.response.undoredo;
						if (callback)
							callback.call(self, r.response);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Invoke custom action
			 * @param {function} callback Callback (called upon success)
			 * @param {string} action Action name
			 * @param {object} opts Options
			 * @function
			 */
			function _action(callback, action, opts) {
				var self = this;
				opts = opts || {};
				req.call(session, path + '&action=' + action, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						var result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Build pivot table
			 * @param {function} callback Callback (called upon success)
			 * @param {string} crosstab Pivot table name
			 * @param {object} opts Options
			 * @function
			 */
			function _crosstab(callback, crosstab, opts) {
				var self = this;
				opts = opts || {};
				if (opts.filters)
					self.filters = opts.filters;
				req.call(session, path + '&action=crosstab&crosstab=' + crosstab, reqParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						self.crosstabdata = r.response;
						if (callback)
							callback.call(self, self.crosstabdata);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Invoke custom publication
			 * @param {function} callback Callback (called upon success)
			 * @param {string} prt Publication name
			 * @param {object} opts Options
			 * @function
			 */
			function _print(callback, prt, opts) {
				var self = this;
				opts = opts || {};
				if (opts.filters)
					self.filters = opts.filters;
				var p = '';
				if (opts.all)
					p += '&all=' + opts.all;
				if (opts.mailing)
					p += '&mailing=' + opts.mailing;
				req.call(session, path + '&action=print&printtemplate=' + prt + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						var result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Set object parameter
			 * @param {function} callback Callback (called upon success)
			 * @param {string} param Parameter name
			 * @param {string} value Parameter value
			 * @param {object} opts Options
			 * @function
			 */
			function _setParameter(callback, param, value, opts) {
				var self = this;
				opts = opts || {};
				var p = { name: param };
				if (value) p.value = value;
				req.call(session, path + '&action=setparameter', reqParams(p), function(res, status) {
					debugHandler('[simplicite.BusinessObject.setParameter(' + p.name + ')] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						var result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			/**
			 * Get object parameter
			 * @param {function} callback Callback (called upon success)
			 * @param {string} param Parameter name
			 * @param {object} opts Options
			 * @function
			 */
			function _getParameter(callback, param, opts) {
				var self = this;
				opts = opts || {};
				var p = { name: param };
				req.call(session, path + '&action=getparameter', reqParams(p), function(res, status) {
					debugHandler('[simplicite.BusinessObject.getParameter(' + p.name + ')] HTTP status = ' + status + ', response = ' + res);
					var r = parse(res, status);
					if (r.type === 'error') {
						(opts.error ? opts.error : errorHandler).call(self, r.response);
					} else {
						var result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(opts.error ? opts.error : errorHandler).call(self, e);
				});
			}

			obj = {
				metadata: { name: name, instance: instance, rowidfield: 'row_id' },
				_getMetaData: _getMetaData,
				getMetaData: function(opts) {
					var d = Q.defer();
					this._getMetaData(function(metadata) { d.resolve(metadata); }, params);
					return d.promise;
				},
				getName: function() { return this.metadata.name; },
				getInstance: function() { return this.metadata.instance; },
				getLabel: function() { return this.metadata.label; },
				getHelp: function() { return this.metadata.help; },
				getFields: function() { return this.metadata.fields; },
				getField: function(fieldname) {
					var n = 0;
					var fs = this.getFields();
					while (n < fs.length && fs[n].name !== fieldname) n++;
					if (n < fs.length) return fs[n];
				},
				getRowIdFieldName: function() { return this.metadata.rowidfield; },
				getRowIdField: function() { return this.getField(this.getRowIdFieldName()); },
				getLinks: function() { return this.metadata.links; },
				getValueForCode: function(field, code) {
					var n = 0;
					var l = field.listOfValues;
					if (l === undefined) return code;
					while (n < l.length && l[n].code !== code) n++;
					return n === l.length ? code : l[n].value;
				},
				getListValue: function(list, code) {
					for (var i = 0; i < list.length; i++) {
						var l = list[i];
						if (l.code === code) return l.value;
					}
				},
				isRowIdField: function(field) {
					return !field.ref && field.name === this.metadata.rowidfield;
				},
				isTimestampField: function(field) {
					var n = field.name;
					return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
				},

				_getFilters: _getFilters,
				getFilters: function(opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getFilters(function(filters) { d.resolve(filters); }, opts);
					return d.promise;
				},
				_search: _search,
				search: function(filters, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._search(function(list) { d.resolve(list); }, filters, opts);
					return d.promise;
				},
				_getCount: _getCount,
				getCount: function(filters, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getCount(function(count) { d.resolve(count); }, filters, opts);
					return d.promise;
				},

				_get: _get,
				get: function(rowId, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._get(function(itm) { d.resolve(itm); }, rowId, opts);
					return d.promise;
				},
				_getForCreate: _getForCreate,
				getForCreate: function(opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getForCreate(function(itm) { d.resolve(itm); }, opts);
					return d.promise;
				},
				_getForUpdate: _getForUpdate,
				getForUpdate: function(rowId, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getForUpdate(function(itm) { d.resolve(itm); }, rowId, opts);
					return d.promise;
				},
				_getForCopy: _getForCopy,
				getForCopy: function(rowId, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getForCopy(function(itm) { d.resolve(itm); }, rowId, opts);
					return d.promise;
				},
				_getForDelete: _getForDelete,
				getForDelete: function(rowId, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getForDelete(function(itm) { d.resolve(itm); }, rowId, opts);
					return d.promise;
				},
				getRowId: function() { if (this.item) return this.item[this.getRowIdFieldName()]; },

				_populate: _populate,
				populate: function(itm, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._populate(function(i) { d.resolve(i); }, itm, opts);
					return d.promise;
				},
				_save: _save,
				save: function(itm, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._save(function(i) { d.resolve(i); }, itm, opts);
					return d.promise;
				},
				_create: _create,
				create: function(itm, opts) {
					itm.row_id = constants.DEFAULT_ROW_ID;
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._create(function(i) { d.resolve(i); }, itm, opts);
					return d.promise;
				},
				_update: _update,
				update: function(itm, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._update(function(i) { d.resolve(i); }, itm, opts);
					return d.promise;
				},
				_del: _del,
				del: function(itm, opts) {
					var d = Q.defer();
					if (opts === undefined) opts = {};
					opts.error = function(e) { d.reject(e); };
					this._del(function(r) { d.resolve(r); }, itm, opts);
					return d.promise;
				},

				_action: _action,
				action: function(act, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._action(function(res) { d.resolve(res); }, act, opts);
					return d.promise;
				},
				_crosstab: _crosstab,
				crosstab: function(ctb, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._crosstab(function(res) { d.resolve(res); }, ctb, opts);
					return d.promise;
				},
				_print: _print,
				print: function(pt, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._print(function(res) { d.resolve(res); }, pt, opts);
					return d.promise;
				},
				_setParameter: _setParameter,
				setParameter: function(param, value, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._setParameter(function() { d.resolve(); }, param, value, opts);
					return d.promise;
				},
				_getParameter: _getParameter,
				getParameter: function(param, opts) {
					var d = Q.defer();
					opts = opts || {};
					opts.error = function(e) { d.reject(e); };
					this._getParameter(function(value) { d.resolve(value); }, param, opts);
					return d.promise;
				},
			};

			businessObjectCache[cacheKey] = obj;
			return obj;
		}

		function getBusinessProcess(name) {
			// TODO: implement processes services
			return {
				metadata: { name: name }
			};
		}

		function getExternalObject(name) {
			// TODO: implement external objects services
			return {
				metadata: { name: name }
			};
		}

		return {
			constants: constants,
			username: params.username || params.login, // naming flexibility
			password: params.password || params.pwd, // naming flexibility
			authtoken: params.authtoken || params.authToken || params.token, // naming flexibility
			parameters: {
				scheme: scheme,
				host: host,
				port: port,
				root: approot
			},
			setUsername: setUsername,
			setLogin: setUsername, // Naming flexibility
			setPassword: setPassword,
			setAuthToken: setAuthToken,
			setToken: setAuthToken, // Naming flexibility
			info: infoHandler,
			warn: warnHandler,
			error: errorHandler,
			debug: debugHandler,
			getError: getError,
			_getHealth: _getHealth,
			getHealth: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { var err = this.getError(e); err._scope = this; d.reject(err); };
				this._getHealth(function(health) { health = health || {}; health._scope = this; d.resolve(health); }, opts);
				return d.promise;
			},
			_login: _login,
			login: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._login(function(res) { d.resolve(res); }, opts);
				return d.promise;
			},
			_logout: _logout,
			logout: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._logout(function(res) { d.resolve(res); }, opts);
				return d.promise;
			},
			_getGrant: _getGrant,
			getGrant: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._getGrant(function(grant) { d.resolve(grant); }, opts);
				return d.promise;
			},
			_getAppInfo: _getAppInfo,
			getAppInfo: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._getAppInfo(function(appinfo) { d.resolve(appinfo); }, opts);
				return d.promise;
			},
			_getSysInfo: _getSysInfo,
			getSysInfo: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._getSysInfo(function(sysinfo) { d.resolve(sysinfo); }, opts);
				return d.promise;
			},
			_getUserInfo: _getUserInfo,
			getUserInfo: function(userlogin, opts) {
				var d = Q.defer();
				if (opts === undefined) opts = {};
				opts.error = function(e) { d.reject(e); };
				this._getUserInfo(function(userinfo) { d.resolve(userinfo); }, userlogin, opts);
				return d.promise;
			},
			_getNews: _getNews,
			getNews: function(opts) {
				var d = Q.defer();
				opts = opts || {};
				opts.error = function(e) { d.reject(e); };
				this._getNews(function(news) { d.resolve(news); }, opts);
				return d.promise;
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess,
			getExternalObject: getExternalObject
		};
	}
};
