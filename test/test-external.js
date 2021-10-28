const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: adminUsername, password: adminPassword,
	debug: debug
});
if (debug) console.log(app.parameters);

const params = { name: 'Simplicite (URL parameter)' };
const data = { name: 'Simplicite (posted in JSON)' };

const extName = 'AppExt2';
let ext;

app.login().then(res => {
	if (debug) console.log(res);
	assert.ok(res.login == adminUsername);
	console.log('Logged in as ' + res.login);
	ext = app.getExternalObject(extName);
	return ext.call(params); // GET call
}).then(res => {
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
	return app.logout();
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.result);
	console.log('Logged out');
}).catch(err => {
	console.error(err);
});
