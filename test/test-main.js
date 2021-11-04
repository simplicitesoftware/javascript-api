import simplicite from '../build/esm/simplicite.js';
import assert from 'assert';

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: debug
});

if (debug) app.log(app.parameters);

// Test default handlers
app.info('INFO message');
app.info({ type: 'INFO', message: 'Info message' });
app.warn('WARN message');
app.error('ERROR message');
app.debug('DEBUG message');

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
}).then(user => {
	app.debug(user);
	assert.ok(user.login == adminUsername);
	app.log('Logged in as ' + user.login);
	return app.getGrant({ inlinePicture: true });
}).then(grant => {
	app.debug(grant);
	assert.ok(grant.login == adminUsername);
	app.log('Grant: ' + app.grant.getFirstName() + ' ' + app.grant.getLastName() + ' (' + app.grant.getLogin() + ', ID ' + app.grant.getUserId() + ')');
	app.log('Picture URL: ' + app.grant.getPictureURL().substr(0, 80) + '...');
	app.log('Resource URL: ' + app.getResourceURL('TEST'));
	app.log('Resource URL: ' + app.getResourceURL('TEST', app.constants.RESOURCE_TYPE_ICON));
	app.log('Resource URL: ' + app.getResourceURL('TEST', app.constants.RESOURCE_TYPE_JAVASCRIPT, sysName, 1));
	return app.getAppInfo();
}).then(appinfo => {
	app.debug(appinfo);
	assert.ok(appinfo.version);
	app.log('Application: ' + appinfo.version + ', title ' + appinfo.title);
	return app.getSysInfo();
}).then(sysinfo => {
	app.debug(sysinfo);
	assert.ok(sysinfo.heapmaxsize);
	app.info('Memory: ' + sysinfo.heapmaxsize);
	return app.getDevInfo();
}).then(devinfo => {
	app.debug(devinfo);
	assert.ok(devinfo.jvm);
	assert.ok(devinfo.jvm.version);
	app.info('JVM: ' + devinfo.jvm.version);
	return app.getDevInfo('System');
}).then(mdlinfo => {
	app.debug(mdlinfo);
	assert.ok(mdlinfo.version);
	app.info('System module version: ' + mdlinfo.version);
	return app.indexSearch(sysCodeName, 'Field');
}).then(results => {
	app.debug(results);
	assert.ok(results.length > 0);
	app.info('Found ' + results.length + ' results');
	for (let i = 0; i < results.length; i++) {
		let result = results[i];
		app.info('- Result[' + i + ']: ' + result.object + '(' + result.row_id + ') = ' + result.key);
	}
	return app.getNews();
}).then(news => {
	app.debug(news);
	assert.ok(news);
	app.info('Nb news: ' + news.length);
	sys = app.getBusinessObject(sysName);
	return sys.getMetaData();
}).then(md => {
	app.debug(md);
	assert.ok(md.name == sysName);
	app.info('Name: ' + md.name + ', instance name: ' + md.instance + ', label: ' + md.label);
	assert.ok(sys.getName() == sysName);
	app.info('Name: ' + sys.getName() + ', instance name: ' + sys.getInstance() + ', label: ' + sys.getLabel());
	assert.ok(sys.getFields().length > 0);
	app.info('Number of fields: ' + sys.getFields().length + ', number of links: ' + sys.getLinks().length);
	assert.ok(sys.getRowIdField().name == app.constants.DEFAULT_ROW_ID_NAME);
	let f = sys.getField(sysCodeName);
	assert.ok(f.name == sysCodeName);
	assert.ok(f.type == sys.getFieldType(sysCodeName));
	assert.ok(f.type == sys.getFieldType(f));
	app.info('Code field: ' + sys.getField(sysCodeName).label);
	f = sys.getField(sysValueName);
	assert.ok(f.name == sysValueName);
	app.info('Value field: ' + sys.getField(sysValueName).label);
	assert.ok(sys.isRowIdField(f) == false);
	assert.ok(sys.isTimestampField(f) == false);
	app.info('Resource URL: ' + sys.getResourceURL('TEST'));
	app.info('Resource URL: ' + sys.getResourceURL('TEST', app.constants.RESOURCE_TYPE_ICON));
	return sys.getCount(sysFilters);
}).then(count => {
	app.debug(count);
	assert.ok(count >= 0);
	app.info('Count: ' + count);
	return sys.search(sysFilters);
}).then(list => {
	app.debug(list);
	assert.ok(list.length);
	app.info('Found ' + list.length + ' items');
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		app.info('- item[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	}
	app.info('Current filter: ' + sys.filters);
	return sys.getFilters();
}).then(filters => {
	app.debug(filters);
	// TODO: see why this i not OK...
	//assert.ok(filters[sysCodeName] == sysCodeFilter);
	app.info('Filter: ' + filters[sysCodeName]);
	return sys.get(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	app.info('Got item: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	sys.create({ sys_code: '', sys_value: '' }, { error: function(err) {
		app.info('Invalid create error caught: ' + JSON.stringify(err));
	}});
	return sys.getForCreate();
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == app.constants.DEFAULT_ROW_ID);
	app.info('Got new item for creation');
	item.sys_code = sysCode;
	item.sys_value = sysValue;
	return sys.create(item);
}).then(item => {
	app.debug(item);
	sysId = item.row_id;
	assert.ok(sysId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue);
	app.info('Created new item with row ID: ' + sysId);
	return sys.action('getVersion', null, { parameters: { test1: 'TEST1', test2: 'TEST2' } });
}).then(res => {
	app.debug(res);
	return sys.getForUpdate(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue);
	app.info('Got item for update with row ID: ' + item.row_id);
	item.sys_value = '';
	sys.update(item, { error: function(err) {
		app.info('Invalid update error caught: ' + JSON.stringify(err));
	}});
	item.sys_value = sysValue + ' updated';
	return sys.update(item);
}).then(item => {
	app.debug(item);
	assert.ok(sysId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue + ' updated');
	app.info('Updated item with row ID: ' + item.row_id);
	return sys.getForDelete(sysId);
}).then(item => {
	app.debug(item);
	assert.ok(item.row_id == sysId);
	assert.ok(item.sys_code == sysCode);
	app.info('Got item for deletion with row ID: ' + item.row_id);
	return sys.del(item);
}).then(res => {
	app.debug(res);
	assert.ok(res.row_id == sysId);
	app.info('Deleted item with row ID: ' + sysId);
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
	app.info('Got users list for current user (with picture): ' + usr.getFieldValue('usr_login', list[0]));
	let m = usr.getField('row_module_id__mdl_name');
	app.info(usr.getFieldLabel(m) + ': ' + usr.getFieldValue(m, list[0]));
	var s = usr.getFieldListValue('usr_active', list[0]);
	app.info('Status: ' + s + ' (code: ' + list[0].usr_active + ')');
	assert.ok(s != list[0].usr_active);
	var u = usr.getFieldDataURL('usr_image_id', list[0]);
	app.info('Picture URL: ' + u.substr(0, 80) + '...');
	assert.ok(u == app.grant.getPictureURL());
	return usr.print('User-VCARD', list[0].row_id);
}).then(doc => {
	app.info('Publication:\n' + doc.getFilename() + ' ' + doc.getMIMEType() + ' ' + doc.getContent());
	app.info('Data URL:\n' + doc.getDataURL());
	app.info('Data decoded:\n' + doc.getContentAsText());
	assert.ok(!!doc.getContent());
	return usr.get(app.grant.getUserId(), { treeView: 'TreeUser' });
}).then(tree => {
	app.debug(tree);
	assert.ok(tree.object == 'User');
	assert.ok(tree.item.row_id == app.grant.getUserId());
	app.info('Got user treeview');
	return app.logout();
}).then(logout => {
	app.debug(logout);
	assert.ok(logout.result);
	app.info('Logged out');
}).catch(err => {
	app.error(err);
});
