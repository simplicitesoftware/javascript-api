const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = true;
const app = require('../src/simplicite-new').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: debug
});

// Test logger
app.log(app.parameters);

// Test default handlers
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
	return app.getGrant();
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.login == adminUsername);
	app.log('Grant: ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	return app.getAppInfo();
}).then(appinfo => {
	app.debug(appinfo);
	assert.ok(appinfo.version);
	console.log('Application: ' + appinfo.version + ', title ' + appinfo.title);
	return app.getSysInfo();
}).then(sysinfo => {
	app.debug(sysinfo);
	assert.ok(sysinfo.heapmaxsize);
	app.log('Memory: ' + sysinfo.heapmaxsize);
	return app.getUserInfo(adminUsername);
}).then(userinfo => {
	app.debug(userinfo);
	assert.ok(userinfo.login == adminUsername);
	app.log('User info login: ' + userinfo.login);
	return app.getNews();
}).then(news => {
	app.debug(news);
	assert.ok(news);
	app.log('Nb news: ' + news.length);
	obj = app.getBusinessObject(objName);
	return obj.getMetaData();
}).then(md => {
	app.debug(md);
	assert.ok(md.name == objName);
	app.log('Name: ' + md.name + ', instance name: ' + md.instance + ', label: ' + md.label);
	assert.ok(obj.getName() == objName);
	app.log('Name: ' + obj.getName() + ', instance name: ' + obj.getInstance() + ', label: ' + obj.getLabel());
	assert.ok(obj.getFields().length > 0);
	app.log('Number of fields: ' + obj.getFields().length + ', number of links: ' + obj.getLinks().length);
	assert.ok(obj.getRowIdField().name == app.constants.DEFAULT_ROW_ID_NAME);
	let f = obj.getField('sys_code');
	assert.ok(f.name == 'sys_code');
	app.log('Code field: ' + obj.getField('sys_code').label);
	f = obj.getField('sys_value');
	assert.ok(f.name == 'sys_value');
	app.log('Value field: ' + obj.getField('sys_value').label);
	assert.ok(obj.isRowIdField(f) == false);
	assert.ok(obj.isTimestampField(f) == false);
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	app.log('Logged out');
}).catch(err => {
	app.error(err);
});
