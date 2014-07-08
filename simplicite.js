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

		var baseURL = params.baseURL || scheme + '://' + host + ':' + port + (root !== '' ? '/' + root : '');

		var http = require(scheme);

		function call(path, method, callback) {
			var p = path || '/'; 
			p = (root !== '' ? '/' + root : '') + p;
			var m = method || 'GET'; 
			if (debug) console.log("[call]" + m + ", " + p);
			http.request({ host: host, port: port, method: m, path: p }, function(res) {
				var r = ""
				res.on("data", function (chunk) {
					r += chunk;
				});
				res.on("end", function () {
					if (callback) callback.call(this, r);
				});
			}).end();
		}

		function getBusinessObject(name, instance) {
			if (!instance) instance = 'node_' + name;
			var self = this;
			function getMetadata(callback, context) {
				var self = this;
				call("/json/obj?object=" + name + "&inst=" + instance + "&action=metadata" + (context ? "&context=" + context : ""), "GET", function(res) {
					if (debug) console.log("[obj.getMetadata] response = " + res);
					var r = eval('(' + res + ')');
					self.metadata = r.response;
					if (callback) callback.call(self, self.metadata);
				});

			}
			return {
				metadata: { name: name, instance: instance },
				getMetadata: getMetadata
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
				login: login,
				baseURL: baseURL
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess
		};
	}
};
