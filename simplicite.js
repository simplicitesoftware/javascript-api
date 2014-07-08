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
		
		if (!params) params = {};
		var debug = params.debug || false;
		var scheme = params.scheme || 'http';
		if (scheme !== 'http' || scheme !== 'https') scheme = 'http';
		var host = params.host || 'localhost';
		var port = params.port || 8080;
		var root = params.root || '';

		var login = params.login;
		var password = params.password;
		var auth = login && password ? 'Basic ' + new Buffer(login + ':' + password).toString('base64') : undefined;

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

		function call(path, data, callback) {
			var p = path || '/'; 
			p = (root !== '' ? '/' + root : '') + p;
			var req = {
					host: host,
					port: port,
					method: 'POST',
					path: p,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				};
			if (cookies)
				req.headers['Cookie'] = cookies;
			if (auth)
				req.headers['Authorization'] = auth;
			debugHandler('[simplicite.call] URL = ' + p);
			var r = http.request(req, function(res) {
				cookies = res.headers['set-cookie'];
				var r = '';
				res.on('data', function (chunk) {
					r += chunk;
				});
				res.on('end', function () {
					if (callback)
						callback.call(this, r);
				});
			});
			if (data) r.write(data);
			r.end();
		}

		// TODO : other methods (getGrant, getNews, ...)
		
		function getBusinessObject(name, instance) {
			if (!instance) instance = 'node_' + name;
			var path = '/json/obj?object=' + name + '&inst=' + instance;

			function getMetadata(callback, params) {
				var self = this;
				if (!params) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.contextParam)
					p += '&contextparam=' + params.contextParam;
				call(path + '&action=metadata' + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.getMetadata] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.metadata = r.response;
						if (callback)
							callback.call(self, self.metadata);
					}
				});
			}

			function getFilters(callback, params) {
				var self = this;
				if (!params) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				if (params.reset)
					p += '&reset=' + params.reset;
				call(path + '&action=filters' + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.getFilters] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				});
			}

			function search(callback, filters, params) {
				var self = this;
				if (filters)
					self.filters = filters;
				if (!params) params = {};
				var p = '';
				if (params.page)
					p += '&page=' + params.page;
				var id = params.inlineDocs;
				if (id)
					p += "&inline_documents=" + (id.join ? id.join(",") : id);
				var it = params.inlineThumbs;
				if (it)
					p += "&inline_thumbnails=" + (it.join ? it.join(",") : it);
				call(path + '&action=search' + p, filters ? callParams(self.filters) : undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.search] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.count = r.response.count;
						self.page = r.response.page;
						self.maxpage = r.response.maxpage;
						self.list = r.response.list;
						if (callback)
							callback.call(self, self.list);
					}
				});
			}

			function get(callback, rowId, params) {
				var self = this;
				if (!params) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				var id = params.inlineDocs;
				if (id)
					p += "&inline_documents=" + (id.join ? id.join(",") : id);
				var it = params.inlineThumbs;
				if (it)
					p += "&inline_thumbnails=" + (it.join ? it.join(",") : it);
				if (params.fields) {
					for (var i = 0; i < params.fields.length; i++) {
						url += "&fields=" + params.fields[i].replace(".", "__");
					}
				}
				call(path + '&action=get&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.get] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				});
			}

			function getForCreate(callback) {
				this.get(callback, constants.DEFAULT_ROW_ID, { context: constants.CONTEXT_CREATE });
			}

			function getForUpdate(callback, rowId) {
				this.get(callback, rowId, { context: constants.CONTEXT_UPDATE });
			}

			function getForCopy(callback, rowId) {
				this.get(callback, rowId, { context: constants.CONTEXT_COPY });
			}

			function getForDelete(callback, rowId) {
				this.get(callback, rowId, { context: constants.CONTEXT_CREATE });
			}

			function populate(callback, rowId, params) {
				var self = this;
				if (!params) params = {};
				var p = '';
				if (params.context)
					p += '&context=' + params.context;
				var id = params.inlineDocs;
				if (id)
					p += "&inline_documents=" + (id.join ? id.join(",") : id);
				var it = params.inlineThumbs;
				if (it)
					p += "&inline_thumbnails=" + (it.join ? it.join(",") : it);
				call(path + '&action=populate&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.populate] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				});
			}

			function save(callback, item, params) {
				if (item)
					this.item = item;
				if (this.item[this.metadata.rowidfield] == constants.DEFAULT_ROW_ID)
					this.create(callback, item, params);
				else
					this.update(callback, item, params);
			}

			function create(callback, item, params) {
				var self = this;
				if (item)
					self.item = item;
				if (!params) params = {};
				call(path + '&action=create', self.item, function(res) {
					debugHandler('[simplicite.BusinessObject.create] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				});
			}

			function update(callback, item, params) {
				var self = this;
				if (item)
					self.item = item;
				if (!params) params = {};
				call(path + '&action=update', self.item, function(res) {
					debugHandler('[simplicite.BusinessObject.update] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = r.response;
						if (callback)
							callback.call(self, self.item);
					}
				});
			}

			function del(callback, item, params) {
				var self = this;
				if (item)
					self.item = item;
				if (!params) params = {};
				call(path + '&action=delete&' + self.metadata.rowidfield + "=" + self.item[self.metadata.rowidfield], undefined, function(res) {
					debugHandler('[simplicite.BusinessObject.del] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.item = undefined;
						if (callback)
							callback.call(self);
					}
				});
			}

			function action(callback, action, params) {
				var self = this;
				// TODO
			}

			// TODO : other methods (crosstab, setParameter, getParameter, ...)
			
			return {
				metadata: { name: name, instance: instance },
				getMetadata: getMetadata,
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
					return !field.ref && (n == "created_by" || n == "created_dt" || n == "updated_by" || n == "updated_dt");
				},
				
				getFilters: getFilters,
				search: search,

				get: get,
				select: get,
				getForCreate: getForCreate,
				selectForCreate: getForCreate,
				getForUpdate: getForUpdate,
				selectForUpdate: getForUpdate,
				getForCopy: getForCopy,
				selectForCopy: getForCopy,
				getForDelete: getForDelete,
				selectForDelete: getForDelete,
				getRowId: function() { if (this.item) return this.item[this.getRowIdFieldName()]; },
				
				save: save,
				create: create,
				update: update,
				del: del,
				action: action
			};
		}

		function getBusinessProcess(name) {
			return {
				metadata: { name: name }
			};
		}

		return {
			constants: constants,
			metadata: {
				scheme: scheme,
				host: host,
				port: port,
				root: root,
				login: login
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess
		};
	}
};
