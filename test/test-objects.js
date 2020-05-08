const assert = require('assert').strict;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	scheme: process.env.TEST_SIMPLICITE_SCHEME || 'http',
	host: process.env.TEST_SIMPLICITE_HOST || 'localhost',
	port: parseInt(process.env.TEST_SIMPLICITE_PORT) || 8080,
	root: process.env.TEST_SIMPLICITE_ROOT || '',
	username: adminUsername,
	password: adminPassword,
	debug: debug
});
if (debug) console.log(app.parameters);

let sys, usr;
let sysId = "2", sysCodeFilter = '%TIMEOUT%', sysCode = 'TEST_' + Date.now(), sysValue = 'Test';

app.login().then(res => { 
	if (debug) console.log(res);
	assert.ok(res.login == adminUsername);
	console.log('Logged in as ' + res.login);
	console.log(app.grant);
	return app.getGrant({ inlinePicture: true });
}).then(grant => {
	if (debug) console.log(grant);
	assert.ok(grant.login == adminUsername);
	assert.ok(app.grant.getLogin() == grant.login);
	console.log('Hello ' + app.grant.getFirstName() + ' ' + app.grant.getLastName() + ' (' + app.grant.getLogin() + ')');
	if (app.grant.hasResponsibility('ADMIN'))
		console.log('Beware, you are platform administrator');
	return app.getAppInfo();
}).then(appinfo => {
	if (debug) console.log(appinfo);
	assert.ok(appinfo.version);
	console.log('Application title: ' + appinfo.title);
	return app.getSysInfo();
}).then(sysinfo => {
	if (debug) console.log(sysinfo);
	assert.ok(sysinfo.cacheobject);
	console.log('Memory: ' + sysinfo.heapmaxsize);
	sys = app.getBusinessObject('SystemParam');
	return sys.getMetaData();
}).then(metadata => {
	if (debug) console.log(metadata);
	assert.ok(metadata.name = 'SystemParam');
	console.log('Name: ' + sys.getName());
	console.log('Instance: ' + sys.getInstance());
	console.log('Label: ' + sys.getLabel());
	console.log('Help: ' + sys.getHelp());
	console.log('RowId.name: ' + sys.getRowIdField().name);
	console.log('Fields.length: ' + sys.getFields().length);
	console.log('Links.length: ' + sys.getLinks().length);
	return sys.action('getVersion');
}).then(result => {
	if (debug) console.log(result);
	assert.ok(result);
	console.log('Version: ' + result);
	return sys.getCount({ sys_code: sysCodeFilter });
}).then(count => {
	if (debug) console.log(count);
	assert.ok(count >= 0);
	console.log('Count system param: ' + count);
	return sys.search({ sys_code: sysCodeFilter });
}).then(list => {
	if (debug) console.log(list);
	assert.ok(list.length);
	console.log('Found ' + list.length + '  system params');
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		console.log('- item[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	}
	return sys.get(sysId);
}).then(item => {
	if (debug) console.log(item);
	assert.ok(item.row_id == sysId);
	console.log('Got system param for rowI ID = ' + sysId);
	console.log('item: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	return sys.getForCreate();
}).then(item => {
	if (debug) console.log(item);
	assert.ok(item.row_id == app.constants.DEFAULT_ROW_ID);
	console.log('Got new system param for creation');
	item.sys_code = sysCode;
	item.sys_value = sysValue;
	return sys.create(item);
}).then(item => {
	if (debug) console.log(item);
	sysId = item.row_id;
	assert.ok(sysId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.sys_code == sysCode);
	assert.ok(item.sys_value == sysValue);
	console.log('Created new system param with row ID = ' + sysId);
	return sys.del(item);
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.row_id == sysId);
	console.log('Deleted system param with row ID = ' + sysId);
	usr = app.getBusinessObject('User');
	return usr.search({ usr_login: app.grant.getLogin() }, { inlineThumbs: [ 'usr_image_id' ] });
}).then(list => {
	if (debug) console.log(list);
	assert.ok(list[0].usr_login == app.grant.getLogin());
	assert.ok(list[0].usr_image_id.thumbnail);
	console.log('Got users list with thumbnails');
	return usr.get(app.grant.getUserId(), { treeView: 'TreeUser' });
}).then(tree => {
	if (debug) console.log(tree);
	assert.ok(tree.object == 'User');
	assert.ok(tree.item.row_id == app.grant.getUserId());
	console.log('Got user treeview');
	if (debug) console.log(tree);
	return app.logout();
}).then(res => {
	if (debug) console.log(res);
	assert.ok(res.result);
	console.log('Logged out');
}).catch(err => {
	console.error(err);
});
