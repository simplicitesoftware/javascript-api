const assert = require('assert').strict;

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'public',
	debug: debug
});
if (debug) console.log(app.parameters);

const params = { name: 'Simplicite public (URL parameter)' };
const data = { name: 'Simplicite public (posted in JSON)' };

let ext = app.getExternalObject('AppExt2');
ext.call(params).then(res => {
	if (debug) console.log('CALL: ' + JSON.stringify(res, null, 2));
	assert.ok(res);
	return ext.call(null, data); // POST call
}).then(res => {
	if (debug) console.log('CALL: ' + JSON.stringify(res, null, 2));
	assert.ok(res);
	return ext.call(params, data); // POST call w/ params
}).then(res => {
	if (debug) console.log('CALL: ' + JSON.stringify(res, null, 2));
	assert.ok(res);
}).catch(err => {
	console.error(err);
});
