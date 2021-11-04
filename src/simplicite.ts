/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 2.2.3
 * @license Apache-2.0
 */

import fetch from 'node-fetch'; // Node.js polyfill for fetch
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
 * Session parameters endpoints
 */
const enum SessionParamEndpoint {
	/**
	 * API endpoint
	 */
	API = 'api',
	/**
	 * UI endpoint
	 */
	UI = 'ui',
	/**
	 * Public UI endpoint
	 */
	PUBLIC = 'public'
}

/**
 * Session parameters
 * @type
 */
type SessionParams = {
	/**
	 * URL
	 * @constant {string}
	 */
	url?: string,

	/**
	 * Scheme
	 * @constant {string}
	 */
	scheme?: string,

	/**
	 * Hostname or IP address
	 * @constant {string}
	 */
	host?: string,

	/**
	 * Port
	 * @constant {number}
	 */
	port?: number,

	/**
	 * Root
	 * @constant {string}
	 */
	root?: string,

	/**
	 * Endpoint
	 * @constant {SessionParamEndpoint}
	 */
	endpoint?: SessionParamEndpoint,

	/**
	 * Username
	 * @constant {string}
	 */
	username?: string,

	/**
	 * Alias to username
	 * @constant {string}
	 */
	login?: string,

	/**
	 * Password
	 * @constant {string}
	 */
	password?: string,

	/**
	 * Alias to password
	 * @constant {string}
	 */
	pwd?: string,

	/**
	 * Authentication token
	 * @constant {string}
	 */
	authtoken?: string,

	/**
	 * Alias to authentication token
	 * @constant {string}
	 */
	token?: string,

	/**
	 * Timeout (s)
	 * @constant {number}
	 */
	timeout?: number,

	/**
	 * Debug?
	 * @constant {boolean}
	 */
	debug?: boolean,

	/**
	 * Log handler
	 * @constant {function}
	 */
	logHandler?: (...args: any[]) => any,

	/**
	 * Debug handler
	 * @constant {function}
	 */
	debugHandler?: (...args: any[]) => any,

	/**
	 * Info handler
	 * @constant {function}
	 */
	infoHandler?: (...args: any[]) => any,

	/**
	 * Warning handler
	 * @constant {function}
	 */
	warningHandler?: (...args: any[]) => any,

	/**
	 * Error handler
	 * @constant {function}
	 */
	errorHandler?: (...args: any[]) => any
};

/**
 * Simplicite application session.
 * @param {object} params Parameters (see session class for details)
 * @return {Session} session
*/
function session(params: any): any {
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
class Session {
	/**
	 * Constants
	 * @member
	 */
	 constants = constants;

	/**
	 * Endpoint
	 * @member {string}
	 */
	endpoint: SessionParamEndpoint;

	 /**
	 * Constructor
	 * @param params {object} Parameters
	 */
	constructor(params: SessionParams) {
		if (!params)
			throw 'No session parammeters';
		
		this.endpoint = params.endpoint || SessionParamEndpoint.API;
		
		this.log = params.logHandler || ((...args: any): void => { console.log(args); });
		this.info = params.infoHandler || ((...args: any): void => { console.info('INFO', args); });
		this.warn = params.warningHandler || ((...args: any): void => { console.warn('WARN', args); });
		this.error = params.errorHandler || ((...args: any): void => { console.error('ERROR', args); });
		this.debugMode = !!params.debug;
		this.debug = params.debugHandler || ((...args: any): void => { if (this.debugMode) console.log('DEBUG', args); });

		if (params.url) {
			try {
				params.scheme = params.url.replace(/:.*$/, '');
				const u = params.url.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
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
			} catch (e: any) {
				this.error('Unable to parse URL [' + params.url + ']: ' + e.message);
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
		if ((scheme === 'http' && port != 80) || (scheme === 'https' && port != 443))
			url += ':' + port;
		if (root !== '')
			url += root.startsWith('/') ? root : '/' + root;
		this.debug('[simplicite] Base URL = ' + url);
	
		const ep = this.endpoint == 'public' ? '' : '/' + this.endpoint;
	
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

		this.businessObjectCache = new Map<string, any>();
		// TODO : this.businessObjectCache = new Map<string, BusinessObject>();
	}

	/**
	 * Log handler
	 * @param {...any} args Arguments
	 * @function
	 */
	log: Function;

	/**
	 * Info handler
	 * @param {...any} args Arguments
	 * @function
	 */
	info: Function

	/**
	 * Warning handler
	 * @param {...any} args Arguments
	 * @function
	 */
	warn: Function;
	
	/**
	 * Error handler
	 * @param {...any} args Arguments
	 * @function
	 */
	error: Function;

	/**
	 * Debug mode enabled?
	 * @member {boolean}
	 */
	debugMode: boolean;

	/**
	 * Debug handler
	 * @param {...any} args Arguments
	 * @function
	 */
	debug: Function;

	/**
	 * Parameters
	 * @member {object}
	 */
	parameters: any;

	/**
	 * Username
	 * @member {string}
	 */
	username: string;

	/**
	 * Set username
	 * @param {string} usr Username
	 * @function
	 */
	setUsername = (usr: string): void => {
		this.username = usr;
	};

	/**
	 * Password
	 * @member {string}
	 */
	password: string;

	/**
	 * Set password
	 * @param {string} pwd Password
	 * @function
	 */
	setPassword = (pwd: string): void => {
		this.password = pwd;
	};

	/**
	 * Auth token
	 * @member {string}
	 */
	 authtoken: string;

	/**
	 * Session ID
	 * @member {string}
	 */
	 sessionid: string;

	 /**
	 * Set auth token
	 * @param {string} token Auth token
	 * @function
	 */
	setAuthToken = (token: string): void => {
		this.authtoken = token;
	};

	/**
	 * Business objects cache
	 * @member {object}
	 * @private
	 */
	businessObjectCache: Map<string, any>;
	 
	/**
	 * Get business object cache key
	 * @param {string} name Business object name
	 * @param {string} [instance] Business object instance name, defaults to <code>js_&lt;object name&gt;</code>
	 * @return {object} Business object cache key
	 * @private
	 */
	getBusinessObjectCacheKey = (name: string, instance: string): any => {
		return name + ':' + (instance || 'js_' + name);
	};

	/**
	 * Clears all data (credentials, objects, ...)
	 * @function
	 */
	clear = () => {
		this.username = undefined;
		this.password = undefined;
		this.authtoken = undefined;
		this.sessionid = undefined;

		this.grant = undefined;

		this.appinfo = undefined;
		this.sysinfo = undefined;
		this.devinfo = undefined;

		this.businessObjectCache = new Map<string, any>();
		// TODO: this.businessObjectCache = new Map<string, BusinessObject>();
	};

	/**
	 * Basic HTTP authorization header value
	 * @return {string} HTTP authorization header value
	 * @private
	 */
	getBasicAuthHeader = (): string => {
		return this.username && this.password
			? 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')
			: undefined;
	};

	/**
	 * Get bearer token header value
	 * @return {string} Bearer token header value
	 * @private
	 */
	getBearerTokenHeader = (): string => {
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
	 * @private
	 */
	getError = (err: string|any, status?: number, origin?: string): any => {
		if (typeof err === 'string') { // plain text error
			return { message: err, status: status || 200, origin: origin };
		} else if (err.response) { // wrapped error
			if (typeof err.response === 'string') {
				return { message: err.response, status: status || 200, origin: origin };
			} else {
				if (origin)
					try { err.response.origin = origin; } catch(e) { /* ignore */ }
				return err.response;
			}
		} else { // other cases
			if (origin)
				try { err.origin = origin; } catch(e) { /* ignore */ }
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
	req = (path: string, data: any, callback: (testData: string, status: number, headers: any) => void, errorHandler: (err: any) => void): void => {
		const origin = 'Session.req';
		const m: string = data ? 'POST' : 'GET';
		const h: any = {};
		if (data)
			h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		let b = this.getBearerTokenHeader();
		if (b) {
			h['X-Simplicite-Authorization'] = b;
		} else {
			b = this.getBasicAuthHeader();
			if (b)
				h['Authorization'] = b;
		}
		const u: string = this.parameters.url + path || '/';
		const d: any = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
		this.debug(`[${origin}] ${m} ${u}${d ? ' with ' + d : ''}`);
		fetch(u, {
			method: m,
			headers: h,
			timeout: this.parameters.timeout * 1000, // useless because there is no timeout in fetch API
			mode: 'cors',
			credentials: 'include',
			body: d
		}).then((res: any) => {
			if (callback) {
				res.text().then((textData: string) => {
					callback.call(this, textData, res.status, res.headers);
				});
			}
		}).catch((err: any) => {
			const s = err.response && err.response.status ? err.response.status : undefined;
			const e = err.response && err.response.data ? err.response.data : err;
			if (errorHandler)
				errorHandler.call(this, this.getError(e, s, origin));
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
	parse = (res: any, status: number): any => {
		try {
			if (status !== 200)
				return { type: 'error', response: this.getError('HTTP status: ' + status, status) };
			return typeof res === 'object' ? res : JSON.parse(res);
		} catch (e: any) {
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
	getHealth = (opts: any): Promise<any> => {
		const origin = 'Session.getHealth';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			this.req(`${this.parameters.healthpath}&full=${!!opts.full}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${res}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					resolve && resolve.call(this, r);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
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
	login = (opts): Promise<any> => {
		const origin = 'Session.login';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if ((opts.username || opts.login) && (opts.password || opts.pwd)) {
				this.clear();
				this.username = opts.username || opts.login;
				this.password = opts.password || opts.pwd;	
			} else if (opts.authtoken || opts.authToken || opts.token) {
				this.clear();
				this.authtoken = opts.authtoken || opts.authToken || opts.token;	
			}
			this.req(`${this.parameters.apppath}?action=session`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.sessionid = r.response.id;
					this.debug(`[${origin}] Session ID = ${this.sessionid}`);
					this.username = r.response.login;
					if (this.username)
						this.debug(`[${origin}] Username = ${this.username}`);
					this.authtoken = r.response.authtoken;
					if (this.authtoken)
						this.debug(`[${origin}] Auth token = ${this.authtoken}`);
					// Minimal grant from session data
					this.grant = Object.assign(new Grant(), {
						login: r.response.login,
						userid: r.response.userid,
						firstname: r.response.firstanme,
						lastname: r.response.lastname,
						email: r.response.email
					});
					resolve && resolve.call(this, r.response);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
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
	logout = (opts: any): Promise<any> => {
		const origin = 'Session.logout';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			this.req(`${this.parameters.apppath}?action=logout`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.clear();
					resolve && resolve.call(this, r.response);
				}
			}, (err: any) => {
				if (err.status === 401) // Removes (expired or deleted) token if any
					this.authtoken = undefined;
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
			});
		});
	};

	/**
	 * Grant
	 * @member {Grant}
	 */
	grant: Grant;

	/**
	 * Get grant (current user data)
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.inlinePicture=false] Inline user picture?
	 * @param {boolean} [opts.includeTexts=false] Include texts?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<Grant>} A promise to the grant (also available as the <code>grant</code> member)
	 * @function
	 */
	getGrant = (opts: any): Promise<any> => {
		const origin = 'Session.getGrant';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '&web=true'; // Required to be able to include texts
			const pic = !!opts.inlinePicture || !!opts.picture; // naming flexibility
			if (pic)
				p += '&inline_picture=true';
			const txt = !!opts.includeTexts || !!opts.texts; // naming flexibility
			if (txt)
				p += '&texts=true';
			this.req(`${this.parameters.apppath}?action=getgrant${p}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.grant = Object.assign(new Grant(), r.response); // Set as Grant
					if (pic)
						this.grant.picture = Object.assign(new Document(), this.grant.picture); // Set picture as Document
					if (txt)
						this.grant.texts = Object.assign(new Map<string, string>(), this.grant.texts); // Set texts as Map
					resolve && resolve.call(this, this.grant);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
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
	changePassword = (pwd: string, opts: any): Promise<any> => {
		const origin = 'Session.changePassword';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			this.req(`${this.parameters.apppath}?action=setpassword&password=${encodeURIComponent(pwd)}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error')
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				else
					resolve && resolve.call(this, r.response);
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
			});
		});
	};

	/**
	 * Application info
	 * @member {object}
	 */
	appinfo: any;

	/**
	 * Get application info
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the application info (also avialable as the <code>appinfo</code> member)
	 * @function
	 */
	getAppInfo = (opts: any): Promise<any> => {
		const origin = 'Session.getAppInfo';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			this.req(`${this.parameters.apppath}?action=getinfo`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.appinfo = r.response;
					resolve && resolve.call(this, this.appinfo);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
			});
		});
	};

	/**
	 * System info
	 * @member {object}
	 */
	sysinfo: any;

	 /**
	 * Get system info
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the system info (also avialable as the <code>sysinfo</code> member)
	 * @function
	 */
	getSysInfo = (opts: any): Promise<any> => {
		const origin = 'Session.getSysInfo';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			this.req(`${this.parameters.apppath}?action=sysinfo`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.sysinfo = r.response;
					resolve && resolve.call(this, this.sysinfo);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
			});	
		});
	};

	/**
	 * Development info
	 * @member {object}
	 */
	devinfo: any;

	 /**
	 * Get development info
	 * @param {string} [module] Module name
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} A promise to the develoment info (also avialable as the <code>devinfo</code> member)
	 * @function
	 */
	getDevInfo = (module: string, opts: any): Promise<any> => {
		const origin = 'Session.getDevInfo';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (module)
				p += '&module=' + encodeURIComponent(module);
			this.req(`${this.parameters.apppath}?action=devinfo${p}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					if (!module)
						this.devinfo = r.response;
					resolve && resolve.call(this, r.response);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
			});	
		});
	};

	/**
	 * News
	 * @member {array}
	 */
	news: Array<any>;

	 /**
	 * Get news
	 * @param {object} [opts] Options
	 * @param {boolean} [opts.inlineImages=false] Inline news images?
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<array>} A promise to the list of news (also avialable as the <code>news</code> member)
	 * @function
	 */
	getNews = (opts: any): Promise<Array<any>> => {
		const origin = 'Session.getHealth';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			const img = !!opts.inlineImages || !!opts.images; // naming flexibility
			if (img)
				p += '&inline_images=true';
			this.req(`${this.parameters.apppath}?action=news${p}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error') {
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				} else {
					this.news = r.response;
					for (const n of this.news)
						n.image = Object.assign(new Document(), n.image); // Set image as document
					resolve && resolve.call(this, this.news);
				}
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
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
	indexSearch = (query: string, object: string, opts: any): Promise<Array<any>> => {
		const origin = 'Session.indexSearch';
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (opts.metadata===true)
				p += '&_md=true';
			if (opts.context)
				p += '&context=' + encodeURIComponent(opts.context);
			this.req(`${this.parameters.apppath}?action=indexsearch&request=${encodeURIComponent(query ? query : '')}${object ? '&object=' + encodeURIComponent(object) : ''}${p}`, undefined, (res: any, status: number) => {
				const r: any = this.parse(res, status);
				this.debug(`[${origin}] HTTP status = ${status}, response type = ${r.type}`);
				if (r.type === 'error')
					(opts.error || this.error || reject).call(this, this.getError(r.response, undefined, origin));
				else
					resolve && resolve.call(this, r.response);
			}, (err: any) => {
				(opts.error || this.error || reject).call(this, this.getError(err, undefined, origin));
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
	getBusinessObject = (name: string, instance: string): any => {
		const cacheKey: string = this.getBusinessObjectCacheKey(name, instance);
		let obj: any = this.businessObjectCache[cacheKey];
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
	getExternalObject = (name: string): any => {
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
	getResourceURL = (code: string, type: string, object: any, objId: string) => {
		return this.parameters.url + this.parameters.respath
			+ '?code=' + encodeURIComponent(code) + '&type=' + encodeURIComponent(type || 'IMG')
			+ (object ? '&object=' + encodeURIComponent(object) : '')
			+ (objId ? '&objid=' + encodeURIComponent(objId): '')
			+ (this.authtoken ? '_x_simplicite_authorization_=' + encodeURIComponent(this.authtoken) : '');
	};
}

/**
 * Document
 * @class
 */
class Document {
	/**
	 * Document's ID
	 * @member {string}
	 */
	id?: string;

	/**
	 * Document's MIME type
	 * @member {string}
	 */
	mime?: string;

	/**
	 * Document's file name
	 * @member {string}
	 */
	filename?: string;

	/**
	 * Document's content as base 64
	 * @member {string}
	 */
	content?: string;

	/**
	 * Document's thumbnail as base 64
	 * @member {string}
	 */
	thumbnail?: string;

	/**
	 * Get the document's ID
	 * @return {string} ID
	 * @function
	 */
	getId = (): string => {
		return this.id;
	};

	/**
	 * Get the document's MIME type
	 * @return {string} MIME type
	 * @function
	 */
	getMIMEType = (): string => {
		return this.mime;
	};

	/**
	 * Alias to <code>getMIMEType</code>
	 * @return {string} MIME type
	 * @function
	 */
	getMimeType = this.getMIMEType;

	/**
	 * Set the document's MIME type
	 * @param {string} mime MIME type
	 * @function
	 */
	setMIMEType = (mime: string): void => {
		this.mime = mime;
	};

	/**
	 * Alias to <code>setMIMEType</code>
	 * @param {string} mime MIME type
	 * @function
	 */
	setMimeType = this.setMIMEType;

	/**
	 * Get the document's file name
	 * @return {string} File name
	 * @function
	 */
	getFilename = (): string => {
		return this.filename;
	};

	/**
	 * Alias to <code>getFilename</code>
	 * @return {string} File name
	 * @function
	 */
	getFileName = this.getFilename;

	/**
	 * Set the document's file name
	 * @param {string} filename File name
	 * @function
	 */
	setFilename = (filename: string): void => {
		this.filename = filename;
	};

	/**
	 * Alias to <code>setFilename</code>
	 * @param {string} filename File name
	 * @function
	 */
	setFileName = this.setFilename;

	/**
	 * Get the document's content (encoded in base 64)
	 * @return {string} Content
	 * @function
	 */
	getContent = (): string => {
		return this.content;
	};

	/**
	 * Get the document's thumbnail (encoded in base 64)
	 * @return {string} Thumbnail
	 * @function
	 */
	getThumbnail = (): string => {
		return this.thumbnail;
	};

	/**
	 * Get the document's content as a buffer
	 * @param {any} data Content data
	 * @return {buffer} Content data as buffer
	 * @private
	 */
	getBuffer(data: any): Buffer {
		return Buffer.from(data, 'base64');
	}

	/**
	 * Get the document's content as an array buffer
	 * @return {ArrayBuffer} Content as an array buffer
	 * @function
	 */
	getContentAsArrayBuffer = (): ArrayBuffer => {
		return this.getBuffer(this.content).buffer;
	};

	/**
	 * Get the document's thumbnail as an array buffer
	 * @return {ArrayBuffer} Thumbnail as an array buffer
	 * @function
	 */
	getThumbnailAsArrayBuffer = (): ArrayBuffer => {
		return this.getBuffer(this.thumbnail || '').buffer;
	};

	/**
	 * Get the document's content as a text
	 * @return {string} Content as plain text
	 * @function
	 */
	getContentAsText = (): string => {
		return this.getBuffer(this.content).toString('utf-8');
	};

	/**
	 * Set the document's content
	 * @param {string} content Content (encoded in base 64)
	 * @function
	 */
	setContent = (content: string): void => {
		this.content = content;
	};

	/**
	 * Set the document's content from plain text string
	 * @param {string} content Content as plain text string
	 * @function
	 */
	setContentFromText = (content: string): void => {
		this.content = Buffer.from(content, 'utf-8').toString('base64');
	};

	/**
	 * Get the document's data URL
	 * @param {boolean} [thumbnail=false] Thumbnail? If thumbnail does not exists the content is used.
	 * @return {string} Data URL or nothing if content is empty
	 */
	getDataURL = (thumbnail: boolean): string => {
		if (this.content)
			return 'data:' + this.mime + ';base64,' + (thumbnail && this.thumbnail ? this.thumbnail : this.content);
	};

	/**
	 * Get the document as a simple value
	 * @return {object} Value
	 */
	getValue = (): any => {
		return JSON.parse(JSON.stringify(this)); // Strips all functions
	};
}

/**
 * Grant (user).
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>data</code> variable got using <code>getGrant</code></span>.
 * @class
 */
class Grant {
	/**
	 * User ID
	 * @member {string} 
	 */
	userid: string;

	/**
	 * User name
	 * @member {string} 
	 */
	login: string;

	/**
	 * User language
	 * @member {string} 
	 */
	lang: string;

	/**
	 * User email address
	 * @member {string} 
	 */
	email: string;

	/**
	 * User first name
	 * @member {string} 
	 */
	firstname: string;

	/**
	 * User last name
	 * @member {string} 
	 */
	lastname: string;

	/**
	 * User picture
	 * @member {Document} 
	 */
	picture: Document;

	/**
	 * User picture
	 * @member {array} 
	 */
	responsibilities: Array<string>;

	/**
	 * User picture
	 * @member {object} 
	 */
	texts: Map<string, string>;

	/**
	 * Get user ID
	 * @return {string} User ID
	 * @function
	 */
	getUserId = (): string => {
		return this.userid;
	};

	/**
	 * Get username
	 * @return {string} Username
	 * @function
	 */
	getUsername = (): string => {
		return this.login;
	};

	/**
	 * Alias to <code>getUsername</code>
	 * @return {string} Login
	 * @function
	 */
	getLogin = this.getUsername; // Naming flexibility

	/**
	 * Get user language
	 * @return {string} User language
	 * @function
	 */
	getLang = (): string => {
		return this.lang;
	};
	
	/**
	 * Get email address
	 * @return {string} Email address
	 * @function
	 */
	getEmail = (): string => {
		return this.email;
	};
	
	/**
	 * Get first name
	 * @return {string} First name
	 * @function
	 */
	getFirstname = (): string => {
		return this.firstname;
	};
	
	/**
	 * Alias to <code>getFirstname</code>
	 * @return {string} First name
	 * @function
	 */
	getFirstName = this.getFirstname; // Naming flexibility
	
	/**
	 * Get last name
	 * @return {string} Last name
	 * @function
	 */
	getLastname = (): string => {
		return this.lastname;
	};
	
	/**
	 * Alias to <code>getLastname</code>
	 * @return {string} Last name
	 * @function
	 */
	getLastName = this.getLastname; // Naming flexibility
	
	/**
	 * Get picture data URL
	 * @return {Document} Picture data URL
	 * @function
	 */
	getPictureURL = (): string => {
		if (this.picture)
			return 'data:' + this.picture.mime + ';base64,' + this.picture.content;
	};

	/**
	 * Has responsibility
	 * @param {string} group Group name
	 * @return {boolean} True if user has a responsibility on the specified group
	 * @function
	 */
	hasResponsibility = (group: string): boolean => {
		return this.responsibilities && this.responsibilities.indexOf(group) !== -1;
	};

	/**
	 * Get text value
	 * @param {string} code Text code
	 * @return {string} Text value
	 */
	T = (code: string): string => {
		return this.texts ? this.texts[code] || '' : '';
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
function BusinessObjectMetadata(name: string, instance: string) {
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
function BusinessObject(ses: any, name: string, instance: string) {
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
	 * @param {object} [opts] Options
	 * @param {number} [opts.context] Context
	 * @param {string} [opts.contextParam] Context parameter
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<BusinessObjectMetadata>} A promise to the object'ts meta data (also available as the <code>metadata</code> member)
	 * @function
	 */
	this.getMetaData = (opts: any): any => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (opts.context)
				p += '&context=' + encodeURIComponent(opts.context);
			if (opts.contextParam)
				p += '&contextparam=' + encodeURIComponent(opts.contextParam);
			self.session.req.call(self.session, self.path + '&action=metadata' + p, undefined, (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.metadata = r.response;
					resolve && resolve.call(self, self.metadata);
				}
			}, (err: any) => {
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
	this.getName = (): string => {
		return this.metadata.name;
	};

	/**
	 * Get instance name
	 * @return {string} Instance name
	 * @function
	 */
	this.getInstance = (): string => {
		return this.metadata.instance;
	};

	/**
	 * Get display label
	 * @return {string} Display label
	 * @function
	 */
	this.getLabel = (): string => {
		return this.metadata.label;
	};

	/**
	 * Get help
	 * @return {string} Help
	 * @function
	 */
	this.getHelp = (): string => {
		return this.metadata.help;
	};

	/**
	 * Get all fields definitions
	 * @return {array} Array of field definitions
	 * @function
	 */
	this.getFields = (): Array<any> => {
		return this.metadata.fields;
	};

	/**
	 * Get a field definition
	 * @param {string} fieldName Field name
	 * @return {object} Field definition
	 * @function
	 */
	this.getField = (fieldName: string): any => {
		const fs: Array<any> = this.getFields();
		let n = 0;
		while (n < fs.length && fs[n].name !== fieldName) n++;
		if (n < fs.length)
			return fs[n];
	};

	/**
	 * Get row ID field name
	 * @return {string} Row ID field name
	 * @function
	 */
	this.getRowIdFieldName = (): string => {
		return this.metadata.rowidfield;
	};

	/**
	 * Get row ID field definition
	 * @return {object} Row ID field definition
	 * @function
	 */
	this.getRowIdField = (): any => {
		return this.getField(this.getRowIdFieldName());
	};

	/**
	 * Get links
	 * @return {array} Array of links
	 * @function
	 */
	this.getLinks = (): Array<any> => {
		return this.metadata.links;
	};

	/**
	 * Get field type
	 * @param {(string|object)} field Field name or definition
	 * @return {string} Type (one of <code>constants.TYPE_*</code>)
	 * @function
	 */
	this.getFieldType = (field: string|any): string => {
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
	this.getFieldLabel = (field: string|any): string => {
		if (typeof field === 'string')
			field = this.getField(field);
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
	this.getFieldValue = (field: string|any, item: any): string|any => {
		if (!item)
			item = this.item;
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
	this.getFieldListValue = (field: string|any, item: any) => {
		if (typeof field === 'string')
			field = this.getField(field);
		const val: string = this.getFieldValue(field, item);
		return field && field.listOfValues ? this.getListValue(field.listOfValues, val) : val;
	};

	/**
	 * Get the data URL of an inlined document/image field for item (or current item)
	 * @param {(string|object)} field Field name or definition
	 * @param {object} [item] Item (defaults to current item)
	 * @return {string} Document/image field data URL (or nothing if the field is not of document/image type or if it is not inlined or if it is empty)
	 * @function
	 */
	this.getFieldDataURL = (field: string|any, item: any): string => {
		if (typeof field !== 'string')
			field = field.fullinput || field.name;
		const val: string|any = this.getFieldValue(field, item);
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
	this.getFieldDocument = (field: string|any, item: any): any => {
		if (typeof field !== 'string')
			field = field.fullinput || field.input || field.name;
		const val: string|any = this.getFieldValue(field, item);
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
	this.getFieldDocumentURL = (field: string|any, item: any, thumbnail: boolean): string => {
		if (typeof field !== 'string')
			field = field.fullinput || field.input || field.name;
		let val: string|any = this.getFieldValue(field, item);
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
	 * @param {array} list List of values
	 * @param {string} code Code
	 * @return {string} Value
	 * @function
	 */
	this.getListValue = (list: Array<any>, code: string): string => {
		if (list) {
			for (let i = 0; i < list.length; i++) {
				const l: any = list[i];
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
	this.setFieldValue = (field: string|any, value: string|any, item: any): void => {
		if (!item)
			item = this.item;
		if (field && item) {
			item[typeof field === 'string' ? field : field.name] = value instanceof Document ? (value as Document).getValue() : value;
		}
	};

	/**
	 * Is the field the row ID field?
	 * @param {object} field Field definition
	 * @return {boolean} True if the field is the row ID field
	 * @function
	 */
	this.isRowIdField = (field: any): boolean => {
		return !field.ref && field.name === this.metadata.rowidfield;
	};

	/**
	 * Is the field a timestamp field?
	 * @param {object} field Field definition
	 * @return {boolean} True if the field is a timestamp field
	 * @function
	 */
	this.isTimestampField = (field: any): boolean => {
		const n = field.name;
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
	this.getFilters =(opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (opts.context)
				p += '&context=' + encodeURIComponent(opts.context);
			if (opts.reset)
				p += '&reset=' + !!opts.reset;
			self.session.req.call(self.session, self.path + '&action=filters' + p, undefined, (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.filters = r.response;
					resolve && resolve.call(self, self.filters);
				}
			}, (err: any) => {
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
	function getReqOptions(options: any): string {
		let opts = '';
		if (options.context)
			opts += '&context=' + encodeURIComponent(options.context);
		const id = options.inlineDocs || options.inlineDocuments || options.inlineImages; // Naming flexibility
		if (id)
			opts += '&inline_documents=' + encodeURIComponent(id.join ? id.join(',') : id);
		const it = options.inlineThumbs || options.inlineThumbnails;  // Naming flexibility
		if (it)
			opts += '&inline_thumbnails=' + encodeURIComponent(it.join ? it.join(',') : it);
		const io = options.inlineObjs || options.inlineObjects;  // Naming flexibility
		if (io)
			opts += '&inline_objects=' + encodeURIComponent(io.join ? io.join(',') : io);
		return opts;
	}

	/**
	 * Build request parameters
	 * @param {object} data Data
	 * @return {string} Request parameters
	 * @private
	 */
	function getReqParams(data: any): string {
		let p = '';
		if (!data) return p;
		let n = 0;
		for (const i in data) {
			const d = data[i] || '';
			if (d.name && d.content) { // Document ?
				if (d.content.startsWith('data:')) // Flexibility = extract content fron data URL
					d.content = d.content.replace(/data:.*;base64,/, '');
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
			} else if (d.object && d.row_id) { // Object ?
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
			} else if (d.sort) { // Array ?
				for (let j = 0; j < d.length; j++)
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
			} else {
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
			}
		}
		return p;
	}

	/**
	 * Count
	 * @param {object} [filters] Filters, defaults to current filters if not set
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the count
	 * @function
	 */
	this.count = (filters: any, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			self.filters = filters || {};
			self.session.req.call(self.session, self.path + '&action=count', getReqParams(self.filters), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.count = r.response.count;
					self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
					self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
					self.list = [];
					resolve && resolve.call(self, self.count);
				}
			}, (err: any) => {
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
	this.search = (filters: any, opts: any): Promise<Array<any>> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p: string = getReqOptions(opts);
			if (opts.page > 0)
				p += '&page=' + (opts.page - 1);
			if (opts.metadata===true)
				p += '&_md=true';
			if (opts.visible===true)
				p += '&_visible=true';
			self.filters = filters || {};
			self.session.req.call(self.session, self.path + '&action=search' + p, getReqParams(self.filters), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					if (res.meta)
						self.metadata = r.response.meta;
					self.count = r.response.count;
					self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
					self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
					self.list = r.response.list;
					resolve && resolve.call(self, self.list);
				}
			}, (err: any) => {
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
	this.get = (rowId: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p: string = getReqOptions(opts);
			const  tv: string = opts.treeView;
			if (tv)
				p += '&treeview=' + encodeURIComponent(tv);
			if (opts.fields) {
				for (let i = 0; i < opts.fields.length; i++) {
					p += '&fields=' + encodeURIComponent(opts.fields[i].replace('.', '__'));
				}
			}
			if (opts.metadata)
				p += '&_md=true';
			if (opts.social)
				p += '&_social=true';
			self.session.req.call(self.session, self.path + '&action=get&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					if (r.response.meta)
						self.metadata = r.response.meta;
					if (r.response.data)
						self.item = tv ? r.response.data.item : r.response.data;
					else
						self.item = tv ? r.response.item : r.response;
					resolve && resolve.call(self, tv ? r.response : self.item);
				}
			}, (err: any) => {
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
	this.getForCreate = (opts: any): Promise<any> => {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_CREATE;
		return this.get(this.session.constants.DEFAULT_ROW_ID, opts);
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
	this.getForUpdate = (rowId: string, opts: any): Promise<any> => {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_UPDATE;
		return this.get(rowId, opts);
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
	this.getForCopy = (rowId: string, opts: any): Promise<any> => {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_COPY;
		return this.get(rowId, opts);
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
	this.getForDelete = (rowId: string, opts: any): Promise<any> => {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_DELETE;
		return this.get(rowId, opts);
	};

	/**
	 * Get specified or current item's row ID value
	 * @param {object} [item] Item, defaults to current item
	 * @return {string} Item's row ID value
	 * @function
	 */
	this.getRowId = (item: any): string => {
		item = item || this.item;
		if (item)
			return item[this.getRowIdFieldName()];
	};

	/**
	 * Populate
	 * @param {string} rowId Row ID
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the populated record (also available as the <code>item</code> member)
	 * @function
	 */
	this.populate = (rowId: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			const p: string = getReqOptions(opts);
			self.session.req.call(self.session, self.path + '&action=populate&' + self.metadata.rowidfield + '=' + encodeURIComponent(rowId) + p, undefined, (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.item = r.response.data ? r.response.data : r.response;
					resolve && resolve.call(self, self.item);
				}
			}, (err: any) => {
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
	this.save = (item: any, opts: any): Promise<any> => {
		if (item)
			this.item = item;
		const rowId: string = this.item[this.metadata.rowidfield];
		if (!rowId || rowId === constants.DEFAULT_ROW_ID)
			return this.create(item, opts);
		else
			return this.update(item, opts);
	};

	/**
	 * Create (create or update)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} [opts] Options
	 * @param {function} [opts.error] Error handler function
	 * @return {promise<object>} Promise to the created record (also available as the <code>item</code> member)
	 * @function
	 */
	this.create = (item: any, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if (item)
				self.item = item;
			self.item.row_id = self.session.constants.DEFAULT_ROW_ID;
			const p: string = getReqOptions(opts);
			self.session.req.call(self.session, self.path + '&action=create' + p, getReqParams(self.item), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.item = r.response.data ? r.response.data : r.response;
					resolve && resolve.call(self, self.item);
				}
			}, (err: any) => {
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
	this.update = (item: any, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if (item)
				self.item = item;
			const p: string = getReqOptions(opts);
			self.session.req.call(self.session, self.path + '&action=update' + p, getReqParams(self.item), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.item = r.response.data ? r.response.data : r.response;
					resolve && resolve.call(self, self.item);
				}
			}, (err: any) => {
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
	this.del = (item: any, opts: any): Promise<any> => {
		const self = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if (item)
				self.item = item;
			self.session.req.call(self.session, self.path + '&action=delete&' + self.metadata.rowidfield + '=' + encodeURIComponent(self.item[self.metadata.rowidfield]), undefined, (res: any, status: number) => {
				const r = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.item = undefined;
					delete r.response.undoredo;
					resolve && resolve.call(self, r.response);
				}
			}, (err: any) => {
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
	this.action = (action: string, rowId: string, opts: any): Promise<string|any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			self.session.req.call(self.session, self.path + '&action=' + encodeURIComponent(action) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : ''), getReqParams(opts.parameters), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					const result = r.response.result;
					resolve && resolve.call(self, result);
				}
			}, (err: any) => {
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
	this.crosstab = (crosstab: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if (opts.filters)
				self.filters = opts.filters;
			self.session.req.call(self.session, self.path + '&action=crosstab&crosstab=' + encodeURIComponent(crosstab), getReqParams(self.filters), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					self.crosstabdata = r.response;
					resolve && resolve.call(self, self.crosstabdata);
				}
			}, (err: any) => {
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
	this.print = (prt: string, rowId: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			if (opts.filters)
				self.filters = opts.filters;
			let p = '';
			if (opts.all)
				p += '&all=' + !!opts.all;
			if (opts.mailing)
				p += '&mailing=' + !!opts.mailing;
			self.session.req.call(self.session, self.path + '&action=print&printtemplate=' + encodeURIComponent(prt) + (rowId ? '&' + self.getRowIdFieldName() + '=' + encodeURIComponent(rowId) : '') + p, undefined, (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					resolve && resolve.call(self, Object.assign(new Document(), r.response));
				}
			}, (err: any) => {
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
	this.setParameter = (param: string, value: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			const p: any = { name: param };
			if (value) p.value = value;
			self.session.req.call(self.session, self.path + '&action=setparameter', getReqParams(p), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.setParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					const result = r.response.result;
					resolve && resolve.call(self, result);
				}
			}, (err: any) => {
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
	this.getParameter = (param: string, opts: any): Promise<any> => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			const p: any = { name: param };
			self.session.req.call(self.session, self.path + '&action=getparameter', getReqParams(p), (res: any, status: number) => {
				const r: any = self.session.parse(res, status);
				self.session.debug('[simplicite.BusinessObject.getParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
				if (r.type === 'error') {
					(opts.error || self.session.error || reject).call(self, r.response);
				} else {
					const result = r.response.result;
					resolve && resolve.call(self, result);
				}
			}, (err: any) => {
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
	this.getResourceURL = (code: string, type: string): string => {
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
function ExternalObjectMetadata(name: string) {
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
function ExternalObject(ses: any, name: string) {
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
	this.getName = (): string => {
		return this.metadata.name;
	};

	/**
	 * Build URL-encoded parameters
	 * @param {object} params URL parameters as key/value pairs
	 * @return {string} URL-encoded parameters
	 * @function
	 */
	this.callParams = (params: any): string => {
		let p = '';
		if (!params) return p;
		let n = 0;
		for (const i in params) {
			const v: any = params[i] || '';
			if (v.sort) { // Array ?
				for (let j = 0; j < v.length; j++)
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(v[j]);
			} else {
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
	this.call = (params: any, data: any, opts: any) => {
		const self: any = this;
		opts = opts || {};
		return new Promise((resolve, reject) => {
			let p = '';
			if (params)
				p = '?' + self.callParams(params);
			const m: string = opts.method ? opts.method.toUpperCase() : (data ? 'POST' : 'GET');
			const h: any = {};
			if (opts.contentType) {
				h['Content-Type'] = opts.contentType;
			} else if (data) { // Try to guess type...
				h['Content-Type'] = typeof data === 'string' ? 'application/x-www-form-urlencoded' : 'application/json';
			}
			let b: string = self.session.getBearerTokenHeader();
			if (b) {
				h['X-Simplicite-Authorization'] = b;
			} else {
				b = self.session.getBasicAuthHeader();
				if (b)
					h.Authorization = b;
			}
			const u: string = self.session.parameters.url + self.path + p;
			const d: string = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : undefined;
			self.session.debug('[simplicite.ExternalObject.call] ' + m + ' ' + u + ' with ' + (d ? ' with ' + d : ''));
			fetch(u, {
				method: m,
				headers: h,
				timeout: self.session.timeout * 1000, // useless because there is no timeout in fetch API
				mode: 'cors',
				credentials: 'include',
				body: d
			}).then((res: any) => {
				const type: string = res.headers.get('content-type');
				self.session.debug('[simplicite.ExternalObject.call(' + p + ')] HTTP status = ' + res.status + ', response content type = ' + type);
				if (type && type.startsWith('application/json')) { // JSON
					res.json().then(jsonData => {
						resolve && resolve.call(self, jsonData, res.status, res.headers);
					}).catch((err: any) => {
						(opts.error || self.error || reject).call(self, self.getError(err));
					});
				} else if (type && type.startsWith('text/')) { // Text
					res.text().then(textData => {
						resolve && resolve.call(self, textData, res.status, res.headers);
					}).catch((err: any) => {
						(opts.error || self.error || reject).call(self, self.getError(err));
					});
				} else { // Binary
					res.arrayBuffer().then(binData => {
						resolve && resolve.call(self, binData, res.status, res.headers);
					}).catch((err: any) => {
						(opts.error || self.error || reject).call(self, self.getError(err));
					});
				}
			}).catch((err: any) => {
				(opts.error || self.error || reject).call(self, self.getError(err));
			});
		});
	};
}

export default {
	constants,
	session,
	Session,
	Document,
	Grant,
	BusinessObject,
	BusinessObjectMetadata,
	ExternalObject
};
