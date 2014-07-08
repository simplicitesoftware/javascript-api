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
		var login = params.login || 'public';
		var password = params.password || '';

		if (debug)
			console.log("[simplicite] Base URL = " + scheme + '://' + host + ':' + port + (root !== '' ? '/' + root : ''));

		var http = require(scheme);

		function call(path, method, callback) {
			var p = path || '/'; 
			p = (root !== '' ? '/' + root : '') + p;
			var m = method || 'GET'; 
			if (debug)
				console.log("[simplicite.call] URL = " + m + ", " + p);
			http.request({ host: host, port: port, method: m, path: p }, function(res) {
				var r = ""
				res.on("data", function (chunk) {
					r += chunk;
				});
				res.on("end", function () {
					if (callback)
						callback.call(this, r);
				});
			}).end();
		}

		function getBusinessObject(name, inst) {
			if (!inst) inst = 'node_' + name;
			var path = "/json/obj?object=" + name + "&inst=" + inst;

			function getMetadata(callback, context) {
				var self = this;
				call(path + "&action=metadata" + (context ? "&context=" + context : ""), "GET", function(res) {
					if (debug)
						console.log("[simplicite.BusinessObject.getMetadata] HTTP response = " + res);
					var r = eval('(' + res + ')');
					self.metadata = r.response;
					if (callback)
						callback.call(self, self.metadata);
				});
			}

			function search(callback, filters) {
				var self = this;
				// TODO
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
			}
		}

		function getBusinessProcess(name) {
			return {
				metadata: { name: name }
			}
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
