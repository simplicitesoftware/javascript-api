/**
 * Simplicit&eacute;&reg; Node JS lib
 */
module.exports = {
	session: function(params) {
		const Q = require('q');
		const request = require('xhr-request');

		const constants = {
			DEFAULT_ROW_ID: '0',

			CONTEXT_NONE: 0,
			CONTEXT_SEARCH: 1,
			CONTEXT_LIST: 2,
			CONTEXT_CREATE: 3,
			CONTEXT_COPY: 4,
			CONTEXT_UPDATE: 5,
			CONTEXT_DELETE: 6,
			CONTEXT_GRAPH: 7,
			CONTEXT_CROSSTAB: 8,
			CONTEXT_PRINTTMPL: 9,
			CONTEXT_UPDATEALL: 10,
			CONTEXT_REFSELECT: 11,
			CONTEXT_DATAMAPSELECT: 12,
			CONTEXT_PREVALIDATE: 13,
			CONTEXT_POSTVALIDATE: 14,
			CONTEXT_STATETRANSITION: 15,
			CONTEXT_EXPORT: 16,
			CONTEXT_IMPORT: 17,
			CONTEXT_ASSOCIATE: 18,
			CONTEXT_PANELLIST: 19,

			TYPE_ID: 0,
			TYPE_INT: 1,
			TYPE_FLOAT: 2,
			TYPE_STRING: 3,
			TYPE_DATE: 4,
			TYPE_DATETIME: 5,
			TYPE_TIME: 6,
			TYPE_ENUM: 7,
			TYPE_BOOLEAN: 8,
			TYPE_PASSWORD: 9,
			TYPE_URL: 10,
			TYPE_HTML: 11,
			TYPE_EMAIL: 12,
			TYPE_LONG_STRING: 13,
			TYPE_ENUM_MULTI: 14,
			TYPE_REGEXP: 15,
			TYPE_DOC: 17,
			TYPE_FLOAT_EMPTY: 18,
			TYPE_EXTFILE: 19,
			TYPE_IMAGE: 20,
			TYPE_NOTEPAD: 21,
			TYPE_PHONENUM: 22,
			TYPE_COLOR: 23,
			TYPE_OBJECT: 24,
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
		if (params.url) {
			try {
				params.scheme = params.url.replace(/:.*$/, '');
				let u = params.url.replace(new RegExp('^' + params.scheme + ':\/\/'), '').split(':');
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
		const scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
		if (scheme !== 'http' && scheme !== 'https') {
			console.error('Incorrect scheme [' + params.scheme + ']');
			return;
		}
		const host = params.host || 'localhost';
		const port = params.port || 8080;
		const approot = params.root || '';
		const debug = params.debug || false;
		const timeout = params.timeout || 30;

		const infoHandler = params.infoHandler || function(msg) { console.log('INFO - ' + msg); };
		const warnHandler = params.warnHandler || function(msg) { console.log('WARN - ' + msg); };
		const errorHandler = params.errorHandler || function(msg) { console.log('ERROR - ' + msg); };
		const debugHandler = params.debugHandler || function(msg) { if (debug) console.log('DEBUG - ' + msg); };

		debugHandler('[simplicite] Base URL = ' + scheme + '://' + host + ':' + port + (approot !== '' ? '/' + approot : ''));

		let username = params.username;
		if (!username) username = params.user; // naming flexibility
		if (!username) username = params.login; // naming flexibility
		let password = params.password;
		if (!password) password = params.pwd; // naming flexibility
		let basicHeader = username && password ? 'Basic ' + new Buffer(username + ':' + password).toString('base64') : null;
		let tokenHeader = params.token ? 'Bearer ' + params.token : null;
		let cookies = null;

		function callParams(data) {
			let p = '';
			if (!data) return p;
			let n = 0;
			for (let i in data) {
				let d = data[i] || '';
				if (d.id && d.content) // Document ?
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + d.id + '|name|' + d.name + '|content|' + d.content);
				else if (d.object && d.row_id) // Object ?
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
				else if (d.sort) // Array ?
					for (let j = 0; j < d.length; j++)
						p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
				else
					p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
			}
			return p;
		}

		function call(path, data, callback, error) {
			let p = path || '/';
			p = (approot !== '' ? '/' + approot : '') + p;
			let m = data ? 'POST' : 'GET';
			let h = {};
			if (data)
				h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			if (tokenHeader)
				h['X-Simplicite-Authorization'] = tokenHeader;
			else if (basicHeader)
				h.Authorization = basicHeader;
			if (cookies)
				h.Cookie = cookies;
			request(scheme + '://' + host + ':' + port + p, {
					method: m,
					headers: h,
					timeout: timeout * 1000,
					body: data
				}, function (err, data, res) {
					if (err) {
						if (error)
							error.call(this, err);
						else
							throw err;
					} else if (callback)
						callback.call(this, data, res.statusCode);
				});
		}

		function getError(error, status) {
			return typeof error === 'string' ? { message: error, status: status } : error;
		}

		const healthpath = '/health?format=json';

		function parse(res, status) {
			try {
				if (status !== 200)
					return { type: 'error', response: getError('HTTP status: ' + status, status) };
				return JSON.parse(res);
			} catch (e) {
				return { typr: 'error', response: getError('Parsing error: ' + e.message, status) };
			}
		}

		function getHealth(callback, params) {
			let self = this;
			params = params || {};
			call(healthpath, undefined, function(res, status) {
				debugHandler('[simplicite.getHealth] HTTP status = ' + status + ', response = ' + res);
				let health = parse(res, status);
				if (health.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, health.response);
				} else if (callback)
					callback.call(self, health);
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		const apppath = '/api/json/app';
		const objpath = '/api/json/obj';
		// TODO: use for processes
		//const pcspath = '/api/json/pcs';

		function login(callback, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=session', undefined, function(res, status) {
				debugHandler('[simplicite.login] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					self.parameters.sessionId = r.response.id;
					debugHandler('[simplicite.login] Session ID = ' + self.parameters.sessionId);
					self.parameters.authToken = r.response.authtoken;
					if (self.parameters.authToken) {
						debugHandler('[simplicite.login] Auth token = ' + self.parameters.authToken);
						tokenHeader = 'Bearer ' + self.parameters.authToken;
					}
					if (callback)
						callback.call(self, self.parameters);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		function logout(callback, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=logout', undefined, function(res, status) {
				debugHandler('[simplicite.logout] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					delete self.parameters.sessionId;
					delete self.parameters.authToken;
					delete self.health;
					delete self.appinfo;
					delete self.sysinfo;
					delete self.userinfo;
					delete self.grant;
					if (callback)
						callback.call(self);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		function getGrant(callback, params) {
			let self = this;
			params = params || {};
			let p = '';
			if (params.inlinePicture)
				p += '&inline_picture=' + params.inlinePicture;
			call(apppath + '?action=getgrant' + p, undefined, function(res, status) {
				debugHandler('[simplicite.getGrant] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
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
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		/*function setPassword(callback, password, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=setpassword&password=' + password, undefined, function(res, status) {
				debugHandler('[simplicite.setPassword] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					if (callback)
						callback.call(self, self.appinfo);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}*/

		function getAppInfo(callback, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=getinfo', undefined, function(res, status) {
				debugHandler('[simplicite.getAppInfo] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					self.appinfo = r.response;
					if (callback)
						callback.call(self, self.appinfo);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		function getSysInfo(callback, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=sysinfo', undefined, function(res, status) {
				debugHandler('[simplicite.getSysInfo] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					self.sysinfo = r.response;
					if (callback)
						callback.call(self, self.sysinfo);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		function getUserInfo(callback, login, params) {
			let self = this;
			params = params || {};
			call(apppath + '?action=userinfo' + (login ? '&login=' + login: ''), undefined, function(res, status) {
				debugHandler('[simplicite.getUserInfo] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					self.userinfo = r.response;
					if (callback)
						callback.call(self, self.userinfo);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		function getNews(callback, params) {
			let self = this;
			params = params || {};
			let p = '';
			if (params.inlineImages)
				p += '&inline_images=' + params.inlineImages;
			call(apppath + '?action=news' + p, undefined, function(res, status) {
				debugHandler('[simplicite.getNews] HTTP status = ' + status + ', response = ' + res);
				let r = parse(res, status);
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response);
				} else {
					self.news = r.response;
					if (callback)
						callback.call(self, self.news);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		// TODO: add other methods (getMenu, getTexts, get/setSysParam, documentURL, contentURL, resourceURL)

		let businessObjectCache = {};

		function getBusinessObject(name, instance) {
			instance = instance || 'node_' + name;

			let cacheKey = name + ':' + instance;
			let obj = businessObjectCache[cacheKey];
			if (obj) return obj;

			let path = objpath + '?object=' + name + '&inst=' + instance;

			function _getMetaData(callback, params) {
				let self = this;
				params = params || {};
				let p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.contextParam)
					p += '&contextparam=' + params.contextParam;
				call(path + '&action=metadata' + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.metadata = r.response;
						if (callback)
							callback.call(self, self.metadata);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getFilters(callback, params) {
				let self = this;
				params = params || {};
				let p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.reset)
					p += '&reset=' + params.reset;
				call(path + '&action=filters' + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.filters);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getOpts(params) {
				let opts = '';
				if (params.context)
					opts += '&context=' + params.context;
				let id = params.inlineDocs;
				if (!id)
					id = params.inlineDocuments;
				if (id)
					opts += '&inline_documents=' + (id.join ? id.join(',') : id);
				let it = params.inlineThumbs;
				if (!it)
					it = params.inlineThumbnails;
				if (it)
					opts += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
				let io = params.inlineObjs;
				if (!io)
					io = params.inlineObjects;
				if (io)
					opts += "&inline_objects=" + (io.join ? io.join(",") : io);
				return opts;
			}

			function _search(callback, filters, params) {
				let self = this;
				if (filters)
					self.filters = filters;
				params = params || {};
				let p = _getOpts(params);
				if (params.page > 0)
					p += '&page=' + (params.page - 1);
				call(path + '&action=search' + p, callParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.count = r.response.count;
						self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
						self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
						self.list = r.response.list;
						if (callback)
							callback.call(self, self.list);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getCount(callback, filters, params) {
				let self = this;
				if (filters)
					self.filters = filters;
				params = params || {};
				call(path + '&action=count', callParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.count = r.response.count;
						self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
						self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
						self.list = [];
						if (callback)
							callback.call(self, self.count);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _get(callback, rowId, params) {
				let self = this;
				params = params || {};
				let p = _getOpts(params);
				let tv = params.treeView;
				if (tv)
					p += '&treeview=' + tv;
				if (params.fields) {
					for (let i = 0; i < params.fields.length; i++) {
						p += '&fields=' + params.fields[i].replace('.', '__');
					}
				}
				call(path + '&action=get&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = tv ? r.response.item : r.response;
						if (callback)
							callback.call(self, tv ? r.response : self.item);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getForCreate(callback, params) {
				params = params || {};
				params.context = constants.CONTEXT_CREATE;
				this._get(callback, constants.DEFAULT_ROW_ID, params);
			}

			function _getForUpdate(callback, rowId, params) {
				params = params || {};
				params.context = constants.CONTEXT_UPDATE;
				this._get(callback, rowId, params);
			}

			function _getForCopy(callback, rowId, params) {
				params = params || {};
				params.context = constants.CONTEXT_COPY;
				this._get(callback, rowId, params);
			}

			function _getForDelete(callback, rowId, params) {
				params = params || {};
				params.context = constants.CONTEXT_CREATE;
				this._get(callback, rowId, params);
			}

			function _populate(callback, rowId, params) {
				let self = this;
				params = params || {};
				let p = _getOpts(params);
				call(path + '&action=populate&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _save(callback, item, params) {
				if (item)
					this.item = item;
				if (this.item[this.metadata.rowidfield] === constants.DEFAULT_ROW_ID)
					this.create(callback, item, params);
				else
					this.update(callback, item, params);
			}

			function _create(callback, item, params) {
				let self = this;
				if (item)
					self.item = item;
				params = params || {};
				let p = _getOpts(params);
				call(path + '&action=create' + p, callParams(self.item), function(res, status) {
					debugHandler('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _update(callback, item, params) {
				let self = this;
				if (item)
					self.item = item;
				params = params || {};
				let p = _getOpts(params);
				call(path + '&action=update' + p, callParams(self.item), function(res, status) {
					debugHandler('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _del(callback, item, params) {
				let self = this;
				if (item)
					self.item = item;
				params = params || {};
				call(path + '&action=delete&' + self.metadata.rowidfield + '=' + self.item[self.metadata.rowidfield], undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.item = undefined;
						if (callback)
							callback.call(self);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _action(callback, action, params) {
				let self = this;
				params = params || {};
				call(path + '&action=' + action, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						let result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _crosstab(callback, crosstab, params) {
				let self = this;
				params = params || {};
				if (params.filters)
					self.filters = params.filters;
				call(path + '&action=crosstab&crosstab=' + crosstab, callParams(self.filters), function(res, status) {
					debugHandler('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						self.crosstabdata = r.response;
						if (callback)
							callback.call(self, self.crosstabdata);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _print(callback, prt, params) {
				let self = this;
				params = params || {};
				if (params.filters)
					self.filters = params.filters;
				let p = '';
				if (params.all)
					p += '&all=' + params.all;
				if (params.mailing)
					p += '&mailing=' + params.mailing;
				call(path + '&action=print&printtemplate=' + prt + p, undefined, function(res, status) {
					debugHandler('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						let result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _setParameter(callback, name, value, params) {
				let self = this;
				params = params || {};
				let p = { name: name };
				if (value) p.value = value;
				call(path + '&action=setparameter', callParams(p), function(res, status) {
					debugHandler('[simplicite.BusinessObject.setParameter(' + name + ')] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						let result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getParameter(callback, name, params) {
				let self = this;
				params = params || {};
				let p = { name: name };
				call(path + '&action=getparameter', callParams(p), function(res, status) {
					debugHandler('[simplicite.BusinessObject.getParameter(' + name + ')] HTTP status = ' + status + ', response = ' + res);
					let r = parse(res, status);
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response);
					} else {
						let result = r.response.result;
						if (callback)
							callback.call(self, result);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			obj = {
				metadata: { name: name, instance: instance, rowidfield: 'row_id' },
				_getMetaData: _getMetaData,
				getMetaData: function(params) {
					let d = Q.defer();
					this._getMetaData(function(metadata) { d.resolve(metadata); }, params);
					return d.promise;
				},
				getName: function() { return this.metadata.name; },
				getInstance: function() { return this.metadata.instance; },
				getLabel: function() { return this.metadata.label; },
				getHelp: function() { return this.metadata.help; },
				getFields: function() { return this.metadata.fields; },
				getField: function(name) {
					let n = 0;
					let fs = this.getFields();
					while (n < fs.length && fs[n].name !== name) n++;
					if (n < fs.length) return fs[n];
				},
				getRowIdFieldName: function() { return this.metadata.rowidfield; },
				getRowIdField: function() { return this.getField(this.getRowIdFieldName()); },
				getLinks: function() { return this.metadata.links; },
				getValueForCode: function(field, code) {
					let n = 0;
					let l = field.listOfValues;
					if (l === undefined) return code;
					while (n < l.length && l[n].code !== code) n++;
					return n === l.length ? code : l[n].value;
				},
				getListValue: function(list, code) {
					for (let i = 0; i < list.length; i++) {
						let l = list[i];
						if (l.code === code) return l.value;
					}
				},
				isRowIdField: function(field) {
					return !field.ref && field.name === this.metadata.rowidfield;
				},
				isTimestampField: function(field) {
					let n = field.name;
					return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
				},

				_getFilters: _getFilters,
				getFilters: function(params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getFilters(function(filters) { d.resolve(filters); }, params);
					return d.promise;
				},
				_search: _search,
				search: function(filters, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._search(function(list) { d.resolve(list); }, filters, params);
					return d.promise;
				},
				_getCount: _getCount,
				getCount: function(filters, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getCount(function(count) { d.resolve(count); }, filters, params);
					return d.promise;
				},

				_get: _get,
				get: function(rowId, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._get(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForCreate: _getForCreate,
				getForCreate: function(params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getForCreate(function(item) { d.resolve(item); }, params);
					return d.promise;
				},
				_getForUpdate: _getForUpdate,
				getForUpdate: function(rowId, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getForUpdate(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForCopy: _getForCopy,
				getForCopy: function(rowId, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getForCopy(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForDelete: _getForDelete,
				getForDelete: function(rowId, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getForDelete(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				getRowId: function() { if (this.item) return this.item[this.getRowIdFieldName()]; },

				_populate: _populate,
				populate: function(item, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._populate(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_save: _save,
				save: function(item, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._save(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_create: _create,
				create: function(item, params) {
					item.row_id = constants.DEFAULT_ROW_ID;
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._create(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_update: _update,
				update: function(item, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._update(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_del: _del,
				del: function(item, params) {
					let d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); };
					this._del(function() { d.resolve(); }, item, params);
					return d.promise;
				},

				_action: _action,
				action: function(act, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._action(function(res) { d.resolve(res); }, act, params);
					return d.promise;
				},
				_crosstab: _crosstab,
				crosstab: function(ctb, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._crosstab(function(res) { d.resolve(res); }, ctb, params);
					return d.promise;
				},
				_print: _print,
				print: function(pt, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._print(function(res) { d.resolve(res); }, pt, params);
					return d.promise;
				},
				_setParameter: _setParameter,
				setParameter: function(name, value, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._setParameter(function() { d.resolve(); }, name, value, params);
					return d.promise;
				},
				_getParameter: _getParameter,
				getParameter: function(name, params) {
					let d = Q.defer();
					params = params || {};
					params.error = function(e) { d.reject(e); };
					this._getParameter(function(value) { d.resolve(value); }, name, params);
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
			parameters: {
				scheme: scheme,
				host: host,
				port: port,
				root: approot,
				username: username
			},
			info: infoHandler,
			warn: warnHandler,
			error: errorHandler,
			debug: debugHandler,
			_getError: getError,
			_getHealth: getHealth,
			getHealth: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { let err = this._getError(e); err._scope = this; d.reject(err); };
				this._getHealth(function(health) { health = health || {}; health._scope = this; d.resolve(health); }, params);
				return d.promise;
			},
			_login: login,
			login: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._login(function(parameters) { d.resolve(parameters); }, params);
				return d.promise;
			},
			_logout: logout,
			logout: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._logout(function() { d.resolve(); }, params);
				return d.promise;
			},
			_getGrant: getGrant,
			getGrant: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._getGrant(function(grant) { d.resolve(grant); }, params);
				return d.promise;
			},
			_getAppInfo: getAppInfo,
			getAppInfo: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._getAppInfo(function(appinfo) { d.resolve(appinfo); }, params);
				return d.promise;
			},
			_getSysInfo: getSysInfo,
			getSysInfo: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._getSysInfo(function(sysinfo) { d.resolve(sysinfo); }, params);
				return d.promise;
			},
			_getUserInfo: getUserInfo,
			getUserInfo: function(login, params) {
				let d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); };
				this._getUserInfo(function(userinfo) { d.resolve(userinfo); }, login, params);
				return d.promise;
			},
			_getNews: getNews,
			getNews: function(params) {
				let d = Q.defer();
				params = params || {};
				params.error = function(e) { d.reject(e); };
				this._getNews(function(news) { d.resolve(news); }, params);
				return d.promise;
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess,
			getExternalObject: getExternalObject
		};
	}
};
