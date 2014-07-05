/**
 * Simplicit&eacute;&reg; NodeJS lib
 */
module.exports = {
	session: function(params) {
		if (!params) params = {};
		var debug = params.debug || false;
		var baseURL = params.baseURL || 'http://localhost:8080';
		var root = params.root || '';
		var login = params.login || 'public';
		var password = params.password || '';

		function getBusinessObject(name, instance) {
			if (!instance) instance = 'node_' + name;
			return {
				metadata: { name: name, instance: instance }
			}
		}

		function getBusinessProcess(name) {
			return {
				metadata: { name: name }
			}
		}

		return {
			metadata: {
				baseURL: baseURL,
				root: root
			},
			getBusinessObject: getBusinessObject,
			getBusinessProcess: getBusinessProcess
		};
	}
};
