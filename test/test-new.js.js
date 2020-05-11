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

const sysName = 'SystemParam',
	sysCodeName = 'sys_code', sysCode = 'TEST_' + Date.now(),
	sysValueName = 'sys_value', sysValue = 'Test',
	sysCodeFilter = '%TIMEOUT%', sysFilters = { sys_code: sysCodeFilter };
let sys, sysId = '2';

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
	sys = app.getBusinessObject(sysName);
	return sys.getMetaData();
}).then(md => {
	app.debug(md);
	assert.ok(md.name == sysName);
	app.log('Name: ' + md.name + ', instance name: ' + md.instance + ', label: ' + md.label);
	assert.ok(sys.getName() == sysName);
	app.log('Name: ' + sys.getName() + ', instance name: ' + sys.getInstance() + ', label: ' + sys.getLabel());
	assert.ok(sys.getFields().length > 0);
	app.log('Number of fields: ' + sys.getFields().length + ', number of links: ' + sys.getLinks().length);
	assert.ok(sys.getRowIdField().name == app.constants.DEFAULT_ROW_ID_NAME);
	let f = sys.getField(sysCodeName);
	assert.ok(f.name == sysCodeName);
	app.log('Code field: ' + sys.getField(sysCodeName).label);
	f = sys.getField(sysValueName);
	assert.ok(f.name == sysValueName);
	app.log('Value field: ' + sys.getField(sysValueName).label);
	assert.ok(sys.isRowIdField(f) == false);
	assert.ok(sys.isTimestampField(f) == false);
	return sys.count(sysFilters);
}).then(count => {
	app.debug(count);
	assert.ok(count >= 0);
	app.log('Count: ' + count);
	return sys.search(sysFilters);
}).then(list => {
	app.debug(list);
	assert.ok(list.length);
	app.log('Found ' + list.length + ' items');
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		app.log('- item[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	}
	return sys.getFilters();
}).then(filters => {
	app.debug(filters);
	assert.ok(filters[sysCodeName] == sysCodeFilter);
	app.log('Filter: ' + filters[sysCodeName]);
	return sys.get(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	app.log('Got item: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	return sys.getForCreate();
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == app.constants.DEFAULT_ROW_ID);
	app.log('Got new item for creation');
	item.sys_code = sysCode;
	item.sys_value = sysValue;
	return sys.create(item);
}).then(item => {
	app.debug(item);
	sysId = item.row_id;
	assert.ok(sysId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue);
	app.log('Created new item with row ID: ' + sysId);
	return sys.getForUpdate(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue);
	app.log('Got item for update with row ID: ' + item.row_id);
	item.sys_value = sysValue + ' updated';
	return sys.update(item);
}).then(item => {
	app.debug(item);
	assert.ok(sysId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue + ' updated');
	app.log('Updated item with row ID: ' + item.row_id);
	return sys.getForDelete(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	assert.ok(item.sys_code == sysCode);
	app.log('Got item for deletion with row ID: ' + item.row_id);
	return sys.del(item);
}).then(res => {
	app.debug(res);
	assert.ok(res.row_id == sysId);
	app.log('Deleted item with row ID: ' + sysId);
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	app.log('Logged out');
}).catch(err => {
	app.error(err);
});
