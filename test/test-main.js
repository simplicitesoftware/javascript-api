const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = false;
const app = require('../src/simplicite').session({
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

const usrName = 'User';
let usr;

app.getHealth().then(health => {
	app.debug(health);
	assert.ok(health.platform.status == 'OK');
	app.log('Status = ' + health.platform.status);
	return app.login({ username: adminUsername, password: adminPassword });
}).then(res => {
	app.debug(res);
	assert.ok(res.login == adminUsername);
	app.log('Logged in as ' + res.login);
	return app.getGrant({ inlinePicture: true });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.login == adminUsername);
	app.log('Grant: ' + app.grant.getFirstName() + ' ' + app.grant.getLastName() + ' (' + app.grant.getLogin() + ', ID ' + app.grant.getUserId() + ')');
	app.log('Picture URL: ' + app.grant.getPictureURL().substr(0, 80) + '...');
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
	return app.indexSearch(sysCodeName, 'Field');
}).then(results => {
	app.debug(results);
	assert.ok(results.length > 0);
	app.log('Found ' + results.length + ' results');
	for (let i = 0; i < results.length; i++) {
		let result = results[i];
		app.log('- Result[' + i + ']: ' + result.object + '(' + result.row_id + ') = ' + result.key);
	}
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
	sys.create({ sys_code: '', sys_value: '' }, { error: function(err) {
		app.log('Invalid create error caught: ' + JSON.stringify(err));
	}});
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
	item.sys_value = '';
	sys.update(item, { error: function(err) {
		app.log('Invalid update error caught: ' + JSON.stringify(err));
	}});
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
	usr = app.getBusinessObject(usrName);
	return usr.getMetaData();
}).then(md => {
	app.debug(md);
	assert.ok(md.name == usrName);
	return usr.search({ usr_login: app.grant.getLogin() }, { inlineDocuments: [ 'usr_image_id' ] });
}).then(list => {
	app.debug(list);
	assert.ok(list.length == 1);
	assert.ok(list[0].usr_login == app.grant.getLogin());
	assert.ok(list[0].usr_image_id.mime && list[0].usr_image_id.content);
	app.log('Got users list for current user (with picture): ' + usr.getFieldValue('usr_login', list[0]));
	let m = usr.getField('row_module_id__mdl_name');
	app.log(usr.getFieldLabel(m) + ": " + usr.getFieldValue(m, list[0]))
	var s = usr.getFieldListValue('usr_active', list[0]);
	app.log('Status: ' + s + ' (code: ' + list[0].usr_active + ')');
	assert.ok(s != list[0].usr_active);
	var u = usr.getFieldDataURL('usr_image_id', list[0]);
	app.log('Picture URL: ' + u.substr(0, 80) + '...');
	assert.ok(u == app.grant.getPictureURL());
	return usr.get(app.grant.getUserId(), { treeView: 'TreeUser' });
}).then(tree => {
	app.debug(tree);
	assert.ok(tree.object == 'User');
	assert.ok(tree.item.row_id == app.grant.getUserId());
	app.log('Got user treeview');
	return app.logout();
}).then(res => {
	app.debug(res);
	assert.ok(res.result);
	app.log('Logged out');
}).catch(err => {
	app.log('Unexepcted error caught: ' + JSON.stringify(err));
});
