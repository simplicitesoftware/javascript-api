const assert = require('assert').strict;

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: false
});
if (debug) console.log(app.parameters);

const testUsername = process.env.TEST_SIMPLICITE_USERNAME || 'website';
const testPassword = process.env.TEST_SIMPLICITE_PASSWORD || 'simplicite';

app.setUsername('designer');
app.setPassword(process.env.TEST_SIMPLICITE_DESIGNER_PASSWORD || 'designer');

app.login().then(res => {
	if (debug) console.log(res);
	console.log('Logged in as ' + res.login);
	assert.ok(res.login == 'designer');
	return app.getGrant({ inlinePicture: false });
}).then(grant => {
	if (debug) console.log(grant);
	assert.ok(grant.getLogin() == 'designer');
	console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	return app.logout();
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.result);
	console.log('Logged out');
	return app.login({ username: testUsername, password: testPassword });
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.login == testUsername);
	console.log('Logged in as ' + res.login);
	return app.getGrant({ inlinePicture: false });
}).then(grant => {
	if (debug) console.log(grant);
	assert.ok(grant.getLogin() == testUsername);
	console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	return app.logout();
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.result);
	console.log('Logged out');
}).catch(err => {
	console.error(err);
});
