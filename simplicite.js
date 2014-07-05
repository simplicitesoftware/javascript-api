/**
 * Simplicit&eacute;&reg; NodeJS lib
 */
module.exports = {
  session: function(params) {
    if (!params) params = {};
    var debug = params.debug || false;
    var baseURL = params.baseURL || "http://localhost:8080";
    var root = params.root || "";

    function getBusinessObject(name, instance) {
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
      debug: debug,
      baseURL: baseURL,
      root: root,
      getBusinessObject: getBusinessObject,
      getBusinessProcess: getBusinessProcess
    };
  }
};
