/**
 * Simplicit&eacute;&reg; NodeJS lib
 */
module.exports = {
  Session: function(params) {
    if (!params) params = {};
    var debug = params.debug || false;
    var baseURL = params.baseURL || "http://localhost:8080";
    var root = params.root || "";
    // TODO
    return {
      debug: debug,
      baseURL: baseURL,
      root: root
    };
  },
  
  BusinessObject:  function(session, name, instance) {
    var metadata = { name: name, instance: instance };
    // TODO
    return {
      session: session,
      metadata: metadata
    };
  },
  
  BusinessProcess: function(session, name) {
    var metadata = { name: name };
    // TODO
    return {
      session: session,
      metadata: metadata
    };
  };
};
