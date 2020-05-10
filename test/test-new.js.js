const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = true;
const app = require('../src/simplicite-new').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: debug
});
app.log(app.parameters);

app.info("INFO message");
app.info({ type: "INFO", message: "Info message" });
app.warn("WARN message");
app.error("ERROR message");
app.debug("DEBUG message");

let objName = 'SystemParam';
let obj;

app.getHealth().then(health => {
	app.debug(health);
	assert.ok(health.platform.status == 'OK');
	app.log('Status = ' + health.platform.status);
	return app.login({ username: adminUsername, password: adminPassword });
}).then(res => {
	app.debug(res);
	assert.ok(res.login == adminUsername);
	app.log('Logged in as ' + res.login);
	obj = app.getBusinessObject(objName);
	return obj.getMetaData();
}).then(md => {
	app.debug(md);
	assert.ok(md.name == objName);
	app.log('Name: ' + md.name + ', instance name: ' + md.instance + ', label: ' + md.label);
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	app.log('Logged out');
}).catch(err => {
	app.error(err);
});
