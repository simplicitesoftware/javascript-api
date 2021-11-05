import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: adminUsername, password: adminPassword,
	debug: process.env.TEST_SIMPLICITE_DEBUG == 'true'
});

app.debug('Parameters', app.parameters);

const params = { name: 'Simplicite (URL parameter)' };
const data = { name: 'Simplicite (posted in JSON)' };

const extName = 'AppExt2';
let ext;

app.login().then(user => {
	app.debug(user);
	assert.ok(user.login == adminUsername);
	app.info('Logged in as ' + user.login);
	ext = app.getExternalObject(extName);
	return ext.call(params); // GET call
}).then(res => {
	app.info(res);
	assert.ok(res.method == 'get');
	return ext.call(null, data); // POST call without params
}).then(res => {
	app.info(res);
	assert.ok(res.method == 'post');
	return ext.call(params, data); // POST call with params
}).then(res => {
	app.info(res);
	assert.ok(res.method == 'post');
	return app.logout();
}).then(logout => {
	app.debug(logout);
	assert.ok(logout.result);
	app.info('Logged out');
}).catch(err => {
	app.error(err);
});
