import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

let app = simplicite.session({
	url: process && process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	endpoint: 'uipublic',
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});

app.info('Version: ' + simplicite.constants.MODULE_VERSION);
app.debug('Parameters (public)', app.parameters);

const params = { name: 'Simplicite (URL parameter)' };
const data = { name: 'Simplicite (posted in JSON)' };
const extName = 'AppExt2';
let ext = app.getExternalObject(extName);

ext.call(params).then(res1 => { // GET call
	app.info(res1);
	assert.ok(res1.method === 'get');
	return ext.call(null, data); // POST call without params
}).then(res1 => {
	app.info(res1);
	assert.ok(res1.method === 'post');
	return ext.call(params, data); // POST call with params
}).then(res1 => {
	app.info(res1);
	assert.ok(res1.method === 'post');
	app.info('OK (public)');

	const adminUsername = process && process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
	const adminPassword = process && process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

	app = simplicite.session({
		url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
		username: adminUsername, password: adminPassword,
		debug: process.env.TEST_SIMPLICITE_DEBUG === 'true'
	});

	app.debug('Parameters', app.parameters);

	app.login().then(user => {
		app.debug(user);
		assert.ok(user.login === adminUsername);
		app.info('Logged in as ' + user.login);
		ext = app.getExternalObject(extName);
		return ext.call(params); // GET call
	}).then(res2 => {
		app.debug(res2);
		assert.ok(res2.method === 'get');
		return ext.call(null, data); // POST call without params
	}).then(res2 => {
		app.debug(res2);
		assert.ok(res2.method === 'post');
		return ext.call(params, data); // POST call with params
	}).then(res2 => {
		app.debug(res2);
		assert.ok(res2.method === 'post');
		return app.logout();
	}).then(logout => {
		app.debug(logout);
		assert.ok(logout.login);
		app.info('Logged out');
		app.info('OK');
	}).catch(err => {
		app.error(err);
	});
}).catch(err => {
	app.error(err);
});