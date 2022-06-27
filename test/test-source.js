import simplicite from '../dist/esm/simplicite.js';
import assert from 'assert';

const adminUsername = process && process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process && process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const app = simplicite.session({
	url: process && process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: adminUsername, password: adminPassword,
	debug: process && process.env.TEST_SIMPLICITE_DEBUG === 'true'
});

app.info('Version: ' + simplicite.constants.MODULE_VERSION);
app.debug('Parameters', app.parameters);

let obj;
const objName = 'AppTestSrc';

app.login().then(user => {
	app.debug('User', user);
	app.info('Logged in as ' + user.login);
	return app.getDevInfo();
}).then(devinfo => {
	app.debug('DevInfo', devinfo);
	assert.ok(devinfo.jvm.version);
	app.info('JVM', devinfo.jvm.version);
	return app.getDevInfo('Demo');
}).then(mdlinfo => {
	app.debug('ModuleInfo', mdlinfo);
	app.info('Module', mdlinfo.name, mdlinfo.version);
	obj = app.getBusinessObject('ObjectInternal');
	return obj.search({ obo_name: objName });
}).then(list => {
	app.debug('List', list);
	if (list.length !== 1)
		throw new Error('Object ' + objName + ' not found');
	return obj.getForUpdate(list[0].row_id, { inlineDocuments: true });
}).then(item => {
	app.debug(item);
	const doc = obj.getFieldDocument('obo_script_id');
	app.debug('Document', doc);
	if (!doc)
		throw new Error('No source for object ' + objName);
	let src = doc.getContentAsText();
	app.debug(src);
	doc.setContentFromText(src += '\n// ' + new Date());
	obj.setFieldValue('obo_script_id', doc);
	return obj.update(item, { inlineDocuments: true });
}).then(item => {
	app.debug('Item', item);
	return app.logout();
}).then(logout => {
	app.debug('Logout', logout);
	app.info('Logged out');
	app.info('OK');
}).catch(err => {
	app.error(err);
});
