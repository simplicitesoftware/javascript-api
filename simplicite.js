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

		function getBusinessObject(name, inst) {
			if (!inst) inst = 'node_' + name;
			var path = '/json/obj?object=' + name + '&inst=' + inst;

			function getMetadata(callback, context) {
				var self = this;
				call(path + '&action=metadata' + (context ? '&context=' + context : ''), 'GET', function(res) {
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

			function search(callback, filters) {
				var self = this;
				call(path + '&action=search' + (filters ? '&' + callParams(filters) : ''), 'GET', function(res) {
					debugHandler('[simplicite.BusinessObject.search] HTTP response = ' + res);
					var r = eval('(' + res + ')');
					if (r.type === 'error') {
						errorHandler.call(self, r.response.message);
					} else {
						self.count = r.response.count;
						self.list = r.response.list;
						if (callback)
							callback.call(self, self.list);
					}
				});
			}

			function get(callback, rowId) {
				var self = this;
				// TODO
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
				metadata: { name: name, instance: inst },
				getMetadata: getMetadata,
				search: search,
				get: get,
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
