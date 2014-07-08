/**
 * Simplicit&eacute;&reg; NodeJS lib
 */
module.exports = {
	session: function(params) {
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

		function call(path, method, callback) {
			var p = path || '/'; 
			p = (root !== '' ? '/' + root : '') + p;
			var m = method || 'GET'; 
			var req = {
					host: host,
					port: port,
					method: m,
					path: p,
					headers: {}
				};
			if (cookies)
				req.headers['Cookie'] = cookies;
			if (auth)
				req.headers['Authorization'] = auth;
			debugHandler('[simplicite.call] URL = ' + m + ', ' + p);
			http.request(req, function(res) {
				cookies = res.headers['set-cookie'];
				var r = '';
				res.on('data', function (chunk) {
					r += chunk;
				});
				res.on('end', function () {
					if (callback)
						callback.call(this, r);
				});
			}).end();
		}

		function getBusinessObject(name, instance) {
			if (!instance) instance = 'node_' + name;
			var path = '/json/obj?object=' + name + '&inst=' + instance;

			function getMetadata(callback, params) {
				var self = this;
				if (!params) params = {};
				call(path + '&action=metadata' + (params.context ? '&context=' + params.context : '') + (params.contextParam ? '&contextparam=' + params.contextParam : ''), 'GET', function(res) {
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

			function search(callback, filters, params) {
				var self = this;
				self.filters = filters;
				if (!params) params = {};
				// TODO : use POST ?
				call(path + '&action=search' + (filters ? '&' + callParams(filters) : '') + (params.page ? '&page=' + params.page : ''), 'GET', function(res) {
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

			function get(callback, rowId) {
				var self = this;
				// TODO : handle non standard row_id
				call(path + '&action=select&' + self.metadata.rowidfield + '=' + rowId, 'GET', function(res) {
					debugHandler('[simplicite.BusinessObject.search] HTTP response = ' + res);
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
				this.get('0');
			}

			function save(callback, item) {
				var self = this;
				// TODO
			}

			function create(callback, item) {
				var self = this;
				// TODO
			}

			function update(callback, item) {
				var self = this;
				// TODO
			}

			function del(callback, item) {
				var self = this;
				// TODO
			}

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
				search: search,
				get: get,
				getForCreate: getForCreate,
				select: get,
				save: save,
				create: create,
				update: update,
				del: del
			};
		}

		function getBusinessProcess(name) {
			return {
				metadata: { name: name }
			};
		}

		return {
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
