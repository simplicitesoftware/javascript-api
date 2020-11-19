const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const testUsername = process.env.TEST_SIMPLICITE_USERNAME || 'website';
const testPassword = process.env.TEST_SIMPLICITE_PASSWORD || 'simplicite';

/*function myErrorHandler(err) {
	console.log('ERROR:');
	console.log(err);
}*/

const debug = true;//process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	//errorHandler: myErrorHandler,
	debug: debug
});
app.debug(app.parameters);

//app.login({ username: 'unknown', password: 'unknown' }).catch(myErrorHandler);
//app.login({ username: 'unknown', password: 'unknown', error: myErrorHandler });
//app.login({ username: 'unknown', password: 'unknown' });
//app.login({ token: 'unknown', error: myErrorHandler });
//app.login({ token: 'unknown' }).catch(myErrorHandler);
//app.login({ token: 'unknown' });

app.setUsername(adminUsername);
app.setPassword(adminPassword);
app.login().then(res => {
	app.debug(res);
	console.log('Logged in as ' + res.login);
	assert.ok(res.login == adminUsername);
	return app.getGrant({ inlinePicture: true, includeTexts: true });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.getLogin() == adminUsername);
	console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	console.log(grant.T('SAVE'));
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	console.log('Logged out');
	return app.login({ username: testUsername, password: testPassword });
}).then(res => {
	app.debug(res);
	assert.ok(res.login == testUsername);
	console.log('Logged in as ' + res.login);
	return app.getGrant({ inlinePicture: false });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.getLogin() == testUsername);
	console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	console.log('Logged out');
	return app.login({ username: 'unknown', password: 'unknown', error: err => {
		app.debug(err);
		console.log('Status: ' + err.status + ', message: ' + err.message);
		assert.ok(err.status == 401);
	}});	
}).catch(err => {
	console.error(err);
});