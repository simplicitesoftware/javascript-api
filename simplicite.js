/**
 * Simplicit&eacute;&reg; NodeJS lib
 */
module.exports = {
	session: function(params) {
		constants = {
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
		
		if (params === undefined) params = {};
		var debug = params.debug || false;
		var scheme = params.scheme || 'http';
		if (scheme !== 'http' || scheme !== 'https') scheme = 'http';
		var host = params.host || 'localhost';
		var port = params.port || 8080;
		var root = params.root || '';
		
		var tokenHeader = params.token !== undefined ? 'Bearer ' + params.token : undefined;
		var basicHeader = params.user !== undefined && params.password !== undefined ? 'Basic ' + new Buffer(params.user + ':' + params.password).toString('base64') : undefined;

		var infoHandler = params.infoHandler || function(msg) { console.log('INFO - ' + msg); };
		var warnHandler = params.warnHandler || function(msg) { console.log('WARN - ' + msg); };
		var errorHandler = params.errorHandler || function(msg) { console.log('ERROR - ' + msg); };
		var debugHandler = params.debugHandler || function(msg) { if (debug) console.log('DEBUG - ' + msg); };

		debugHandler('[simplicite] Base URL = ' + scheme + '://' + host + ':' + port + (root !== '' ? '/' + root : ''));

		var http = require(scheme);

		var cookies = undefined;

		function callParams(data) {
			var p = '';
			if (data === undefined)
				return p;
			var n = 0;
			for (var i in data) {
				var d = data[i];
				if (d === undefined)
					d = '';
				if (d.id !== undefined && d.content !== undefined) // Document ?
					p += (n++ != 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + d.id + '|name|' + d.name + '|content|' + d.content);
				else if (d.object !== undefined && d.row_id !== undefined) // Object ?
					p += (n++ != 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
				else if (d.sort) // Array ?
					for (var j = 0; j < d.length; j++)
						p += (n++ != 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
				else
					p += (n++ != 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
			}
			return p;
		}

		function call(path, data, callback, error) {
			var p = path || '/'; 
			p = (root !== '' ? '/' + root : '') + p;
			var m = data === undefined ? 'GET' : 'POST';
			var req = {
					host: host,
					port: port,
					method: m,
					path: p,
					headers: {}
				};
			if (data !== undefined)
				req.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
			if (tokenHeader !== undefined)
				req.headers['X-Simplicite-Authorization'] = tokenHeader;
			else if (basicHeader !== undefined)
				req.headers['Authorization'] = basicHeader;
			if (cookies)
				req.headers['Cookie'] = cookies;
			debugHandler('[simplicite.call] Request = ' + JSON.stringify(req));
			var r = http.request(req, function(res) {
				cookies = res.headers['set-cookie'] || cookies;
				var r = '';
				res.on('data', function(chunk) {
					r += chunk;
				});
				res.on('end', function() {
					if (callback)
						callback.call(this, r);
				});
			}).on('error', function(e) {
				if (error)
					error.call(this, e);
			});
			if (data) r.write(data);
			r.end();
		}

		var healthpath = '/health';
		
		function getHealth(callback, params) {
			var self = this;
			if (params === undefined) params = {};
			if (params.format === undefined) params.format = 'json';
			call(healthpath + '?format=' + params.format, undefined, function(res) {
				debugHandler('[simplicite.getHealth] HTTP response = ' + res);
				health = eval('(' + res + ')');
				if (callback)
					callback.call(self, health);
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		var apppath = '/api/json/app';
		var objpath = '/api/json/obj';
		var pcspath = '/api/json/pcs';

		function login(callback, params) {
			var self = this;
			if (params === undefined) params = {};
			call(apppath + '?action=session', undefined, function(res) {
				debugHandler('[simplicite.login] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
				} else {
					self.parameters.sessionId = r.response.id;
					debugHandler('[simplicite.login] Session ID = ' + self.parameters.sessionId);
					self.parameters.authToken = r.response.authtoken;
					if (self.parameters.authToken !== undefined) {
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
			var self = this;
			if (params === undefined) params = {};
			call(apppath + '?action=logout', undefined, function(res) {
				debugHandler('[simplicite.logout] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
				} else {
					tokenHeader = undefined;
					self.parameters.sessionId = undefined;
					self.parameters.authToken = undefined;
					self.health = undefined;
					self.appinfo = undefined;
					self.sysinfo = undefined;
					self.userinfo = undefined;
					self.grant = undefined;
					if (callback)
						callback.call(self);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}
		
		function getGrant(callback, params) {
			var self = this;
			if (params === undefined) params = {};
			p = '';
			if (params.inlinePicture)
				p += "&inline_picture=" + params.inlinePicture;
			call(apppath + '?action=getgrant' + p, undefined, function(res) {
				debugHandler('[simplicite.getGrant] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
				} else {
					self.grant = r.response;
					/*if (self.grant.picture) {
						self.grant.picture.url = self.documentURL("User", "usr_image_id", self.grant.userid, self.grant.picture.id);
						self.grant.picture.thumbnailurl = self.grant.picture.url + "&thumbnail=true";
					}*/
					self.grant.getUserID = function() { return this.userid; };
					self.grant.getLogin = function() { return this.login; };
					self.grant.getLang = function() { return this.lang; };
					self.grant.getEmail = function() { return this.email; };
					self.grant.getFirstName = function() { return this.firstname; };
					self.grant.getLastName = function() { return this.lastname; };
					self.grant.hasResponsibility = function(group) { return this.responsibilities && this.responsibilities.indexOf(group)!=-1; };
					if (callback)
						callback.call(self, self.grant);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}
		
		function getAppInfo(callback, params) {
			var self = this;
			if (params === undefined) params = {};
			call(apppath + '?action=getinfo', undefined, function(res) {
				debugHandler('[simplicite.getAppInfo] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
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
			var self = this;
			if (params === undefined) params = {};
			call(apppath + '?action=sysinfo', undefined, function(res) {
				debugHandler('[simplicite.getSysInfo] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
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
			var self = this;
			if (params === undefined) params = {};
			call(apppath + '?action=userinfo', undefined, function(res) {
				debugHandler('[simplicite.getUserInfo] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
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
			var self = this;
			if (params === undefined) params = {};
			p = '';
			if (params.inlineImages)
				p += "&inline_images=" + params.inlineImages;
			call(apppath + '?action=news' + p, undefined, function(res) {
				debugHandler('[simplicite.getNews] HTTP response = ' + res);
				var r = eval('(' + res + ')');
				if (r.type === 'error') {
					(params.error ? params.error : errorHandler).call(self, r.response.message);
				} else {
					self.news = r.response;
					if (callback)
						callback.call(self, self.news);
				}
			}, function(e) {
				(params.error ? params.error : errorHandler).call(self, e);
			});
		}

		// TODO : other methods (getMenu, getTexts, get/setSysParam, documentURL, contentURL, resourceURL)

		var businessObjectCache = {};

		function getBusinessObject(name, instance) {
			if (instance === undefined) instance = 'node_' + name;
			
			var cacheKey = name + ":" + instance;
			var obj = businessObjectCache[cacheKey];
			if (obj) return obj;
			
			var path = objpath + '?object=' + name + '&inst=' + instance;

			function _getMetadata(callback, params) {
				var self = this;
				if (params === undefined) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.contextParam)
					p += '&contextparam=' + params.contextParam;
				call(path + '&action=metadata' + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.getMetadata] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				var self = this;
				if (params === undefined) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.reset)
					p += '&reset=' + params.reset;
				call(path + '&action=filters' + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.getFilters] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.filters);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _search(callback, filters, params) {
				var self = this;
				if (filters)
					self.filters = filters;
				if (params === undefined) params = {};
				var p = '';
				if (params.page)
					p += '&page=' + params.page;
				var id = params.inlineDocs;
				if (id)
					p += '&inline_documents=' + (id.join ? id.join(',') : id);
				var it = params.inlineThumbs;
				if (it)
					p += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
				call(path + '&action=search' + p, callParams(self.filters), function(res) {
					debugHandler('[simplicite.BusinessObject.search] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						self.count = r.response.count;
						self.page = r.response.page;
						self.maxpage = r.response.maxpage;
						self.list = r.response.list;
						if (callback)
							callback.call(self, self.list);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _get(callback, rowId, params) {
				var self = this;
				if (params === undefined) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				var id = params.inlineDocs;
				if (id)
					p += '&inline_documents=' + (id.join ? id.join(',') : id);
				var it = params.inlineThumbs;
				if (it)
					p += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
				if (params.fields) {
					for (var i = 0; i < params.fields.length; i++) {
						url += '&fields=' + params.fields[i].replace('.', '__');
					}
				}
				call(path + '&action=get&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.get] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getForCreate(callback, params) {
				if (params === undefined) params = {};
				params.context = constants.CONTEXT_CREATE;
				this._get(callback, constants.DEFAULT_ROW_ID, params);
			}

			function _getForUpdate(callback, rowId, params) {
				if (params === undefined) params = {};
				params.context = constants.CONTEXT_UPDATE;
				this._get(callback, rowId, params);
			}

			function _getForCopy(callback, rowId, params) {
				if (params === undefined) params = {};
				params.context = constants.CONTEXT_COPY;
				this._get(callback, rowId, params);
			}

			function _getForDelete(callback, rowId, params) {
				if (params === undefined) params = {};
				params.context = constants.CONTEXT_CREATE;
				this._get(callback, rowId, params);
			}

			function _populate(callback, rowId, params) {
				var self = this;
				if (params === undefined) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				var id = params.inlineDocs;
				if (id)
					p += '&inline_documents=' + (id.join ? id.join(',') : id);
				var it = params.inlineThumbs;
				if (it)
					p += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
				call(path + '&action=populate&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.populate] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				if (this.item[this.metadata.rowidfield] == constants.DEFAULT_ROW_ID)
					this.create(callback, item, params);
				else
					this.update(callback, item, params);
			}

			function _create(callback, item, params) {
				var self = this;
				if (item)
					self.item = item;
				if (params === undefined) params = {};
				call(path + '&action=create', callParams(self.item), function(res) {
					debugHandler('[simplicite.BusinessObject.create] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				var self = this;
				if (item)
					self.item = item;
				if (params === undefined) params = {};
				call(path + '&action=update', callParams(self.item), function(res) {
					debugHandler('[simplicite.BusinessObject.update] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				var self = this;
				if (item)
					self.item = item;
				if (params === undefined) params = {};
				call(path + '&action=delete&' + self.metadata.rowidfield + '=' + self.item[self.metadata.rowidfield], undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.del] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				var self = this;
				if (params === undefined) params = {};
				call(path + '&action=' + action, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.action(' + action + ')] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						var res = r.response.result;
						if (callback)
							callback.call(self, res);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _crosstab(callback, crosstab, filters, params) {
				var self = this;
				if (filters)
					self.filters = filters;
				if (params === undefined) params = {};
				call(path + '&action=crosstab&crosstab=' + crosstab, callParams(self.filters), function(res) {
					debugHandler('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
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
				var self = this;
				if (params === undefined) params = {};
				var p = '';
				if (params.all)
					p += '&all=' + params.all;
				if (params.mailing)
					p += '&mailing=' + params.mailing;
				call(path + '&action=print&printtemplate=' + prt + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.print(' + prt + ')] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						var res = r.response.result;
						if (callback)
							callback.call(self, res);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _setParameter(callback, name, value, params) {
				var self = this;
				if (params === undefined) params = {};
				var p = { name: name };
				if (value) p.value = value;
				call(path + '&action=setparameter', callParams(p), function(res) {
					debugHandler('[simplicite.BusinessObject.setParameter(' + name + ')] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						var res = r.response.result;
						if (callback)
							callback.call(self, res);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			function _getParameter(callback, name, params) {
				var self = this;
				if (params === undefined) params = {};
				var p = { name: name };
				call(path + '&action=getparameter', callParams(p), function(res) {
					debugHandler('[simplicite.BusinessObject.getParameter(' + name + ')] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						(params.error ? params.error : errorHandler).call(self, r.response.message);
					} else {
						var res = r.response.result;
						if (callback)
							callback.call(self, res);
					}
				}, function(e) {
					(params.error ? params.error : errorHandler).call(self, e);
				});
			}

			obj = {
				metadata: { name: name, instance: instance, rowidfield: "row_id" },
				_getMetadata: _getMetadata,
				getMetadata: function(params) {
					var d = Q.defer();
					this._getMetadata(function(metadata) { d.resolve(metadata); }, params);
					return d.promise;
				},
				getName: function() { return this.metadata.name; },
				getInstance: function() { return this.metadata.instance; },
				getLabel: function() { return this.metadata.label; },
				getHelp: function() { return this.metadata.help; },
				getFields: function() { return this.metadata.fields; },
				getField: function(name) {
					var n = 0;
					var fs = this.getFields();
					while (n < fs.length && fs[n].name != name) n++;
					return (n == fs.length ? undefined : fs[n]);
				},
				getRowIdFieldName: function() { return this.metadata.rowidfield; },
				getRowIdField: function() { return this.getField(this.getRowIdFieldName()); },
				getLinks: function() { return this.metadata.links; },
				getValueForCode: function(field, code) {
					var n = 0;
					var l = field.listOfValues;
					if (l === undefined) return code;
					while (n < l.length && l[n].code != code) n++;
					return (n == l.length ? code : l[n].value);
				},
				getListValue: function(list, code) {
					for (var i = 0; i < list.length; i++) {
						var l = list[i];
						if (l.code == code) return l.value;
					}
					return undefined;
				},
				isRowIdField: function(field) {
					return !field.ref && field.name == this.metadata.rowidfield;
				},
				isTimestampField: function(field) {
					var n = field.name;
					return !field.ref && (n == 'created_by' || n == 'created_dt' || n == 'updated_by' || n == 'updated_dt');
				},
				
				_getFilters: _getFilters,
				getFilters: function(params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getFilters(function(filters) { d.resolve(filters); }, params);
					return d.promise;
				},
				_search: _search,
				search: function(filters, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._search(function(list) { d.resolve(list); }, filters, params);
					return d.promise;
				},

				_get: _get,
				get: function(rowId, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._get(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForCreate: _getForCreate,
				getForCreate: function(params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getForCreate(function(item) { d.resolve(item); }, params);
					return d.promise;
				},
				_getForUpdate: _getForUpdate,
				getForUpdate: function(rowId, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getForUpdate(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForCopy: _getForCopy,
				getForCopy: function(rowId, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getForCopy(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				_getForDelete: _getForDelete,
				getForDelete: function(rowId, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getForDelete(function(item) { d.resolve(item); }, rowId, params);
					return d.promise;
				},
				getRowId: function() { if (this.item) return this.item[this.getRowIdFieldName()]; },
				
				_populate: _populate,
				populate: function(item, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._populate(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_save: _save,
				save: function(item, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._save(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_create: _create,
				create: function(item, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._create(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_update: _update,
				update: function(item, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._update(function(item) { d.resolve(item); }, item, params);
					return d.promise;
				},
				_del: _del,
				del: function(item, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._del(function() { d.resolve(); }, item, params);
					return d.promise;
				},

				_action: _action,
				action: function(act, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._action(function(res) { d.resolve(res); }, act, params);
					return d.promise;
				},
				_crosstab: _crosstab,
				crosstab: function(ctb, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._crosstab(function(res) { d.resolve(res); }, ctb, params);
					return d.promise;
				},
				_print: _print,
				print: function(pt, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._print(function(res) { d.resolve(res); }, pt, params);
					return d.promise;
				},
				_setParameter: _setParameter,
				setParameter: function(name, value, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._setParameter(function() { d.resolve(); }, name, value, params);
					return d.promise;
				},
				_getParameter: _getParameter,
				getParameter: function(name, params) {
					var d = Q.defer();
					if (params === undefined) params = {};
					params.error = function(e) { d.reject(e); }
					this._getParameter(function(value) { d.resolve(value); }, name, params);
					return d.promise;
				},
			};
			
			businessObjectCache[cacheKey] = obj;
			return obj;
		}

		function getBusinessProcess(name) {
			// TODO
			return {
				metadata: { name: name }
			};
		}

		function getExternalObject(name) {
			// TODO
			return {
				metadata: { name: name }
			};
		}

		var Q = require("q");
		return {
			constants: constants,
			parameters: {
				scheme: scheme,
				host: host,
				port: port,
				root: root
			},
			_getHealth: getHealth,
			getHealth: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getHealth(function(health) { d.resolve(health); }, params);
				return d.promise;
			},
			_login: login,
			login: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._login(function(parameters) { d.resolve(parameters); }, params);
				return d.promise;
			},
			_logout: logout,
			logout: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._logout(function() { d.resolve(); }, params);
				return d.promise;
			},
			_getGrant: getGrant,
			getGrant: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getGrant(function(grant) { d.resolve(grant); }, params);
				return d.promise;
			},
			_getAppInfo: getAppInfo,
			getAppInfo: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getAppInfo(function(appinfo) { d.resolve(appinfo); }, params);
				return d.promise;
			},
			_getSysInfo: getSysInfo,
			getSysInfo: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getSysInfo(function(sysinfo) { d.resolve(sysinfo); }, params);
				return d.promise;
			},
			_getUserInfo: getUserInfo,
			getUserInfo: function(login, params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getUserInfo(function(userinfo) { d.resolve(userinfo); }, login, params);
				return d.promise;
			},
			_getNews: getNews,
			getNews: function(params) {
				var d = Q.defer();
				if (params === undefined) params = {};
				params.error = function(e) { d.reject(e); }
				this._getNews(function(news) { d.resolve(news); }, params);
				return d.promise;
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess,
			getExternalObject: getExternalObject
		};
	}
};
