import simplicite from '../src/simplicite.mjs';
import assert from 'assert';

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: adminUsername, password: adminPassword,
	debug: process.env.TEST_SIMPLICITE_DEBUG == 'true'
});

app.debug('Parameters', app.parameters);

let obj;
const objName = 'AppTestSrc';

app.login().then(res => {
	app.debug(res);
	app.info('Logged in as ' + res.login);
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
	if (list.length != 1)
		throw 'Object ' + objName + ' not found';
	return obj.getForUpdate(list[0].row_id, { inlineDocuments: true });
}).then(item => {
	app.debug(item);
	let doc = obj.getFieldDocument('obo_script_id');
	app.debug('Document', doc);
	if (!doc)
		throw 'No source for object ' + objName;
	let src = doc.getContentAsText();
	app.debug(src);
	doc.setContentFromText(src += '\n// ' + new Date()); 
	obj.setFieldValue('obo_script_id', doc);
	return obj.update(item, { inlineDocuments: true });
}).then(item => {
	app.debug('Item', item);
	return app.logout();
}).then(() => {
	app.info('Logged out');
}).catch(err => {
	app.error(err);
});
