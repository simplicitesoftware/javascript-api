import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const testUsername = process.env.TEST_SIMPLICITE_USERNAME || 'website';
const testPassword = process.env.TEST_SIMPLICITE_PASSWORD || 'simplicite';

const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: process.env.TEST_SIMPLICITE_DEBUG === 'true'
});

app.info('Version: ' + simplicite.constants.MODULE_VERSION);
app.debug('Parameters', app.parameters);

app.setUsername(adminUsername);
app.setPassword(adminPassword);
app.login().then(user => {
	app.debug(user);
	app.info('Logged in as ' + user.login + ' with authentication token ' + user.authtoken);
	assert.ok(user.login === adminUsername);
	return app.getGrant({ inlinePicture: true, includeTexts: true });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.getLogin() === adminUsername);
	app.info('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	app.info(grant.T('SAVE'));
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	app.info('Logged out');
	return app.login({ username: testUsername, password: testPassword });
}).then(res => {
	app.debug(res);
	assert.ok(res.login = testUsername);
	app.info('Logged in as ' + res.login);
	return app.getGrant({ inlinePicture: false });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.getLogin() === testUsername);
	app.info('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	return app.logout();
}).then(logout => {
	app.debug(logout);
	assert.ok(logout.result);
	app.info('Logged out');
	app.login({ username: 'unknown', password: 'unknown' }).catch(err1 => {
		app.debug(err1);
		app.info('Status: ' + err1.status + ', message: ' + err1.message);
		assert.ok(err1.status === 401);
		app.login({ authtoken: 'unknown' }).catch(err2 => {
			app.debug(err2);
			app.info('Status: ' + err2.status + ', message: ' + err2.message);
			assert.ok(err2.status === 401);
			app.info('OK');
		});
	});
}).catch(err => {
	app.error(err);
});