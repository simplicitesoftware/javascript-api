const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const debug = process.env.TEST_SIMPLICITE_DEBUG == 'true';
const app = require('../src/simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	username: adminUsername, password: adminPassword,
	debug: debug
});
if (debug) console.log(app.parameters);

let obj;
const objName = 'AppTestSrc';

app.login().then(res => {
	if (debug) console.log(res);
	console.log('Logged in as ' + res.login);
	return app.getDevInfo();
}).then(devinfo => {
	if (debug) console.log('DevInfo', devinfo);
	return app.getDevInfo('Demo');
}).then(mdldevinfo => {
	if (debug) console.log('ModuleInfo', mdldevinfo);
	obj = app.getBusinessObject('ObjectInternal');
	return obj.search({ obo_name: objName });
}).then(list => {
	if (debug) console.log('List', list);
	if (list.length != 1)
		throw 'Object ' + objName + ' not found';
	return obj.getForUpdate(list[0].row_id, { inlineDocuments: true });
}).then(item => {
	if (debug) console.log(item);
	let doc = obj.getFieldDocument('obo_script_id');
	if (debug) console.log('Document', doc);
	if (!doc) {
		throw 'No source for object ' + objName;
		/*
		doc = new app.Document();
		doc.setMIMEType('text/plain');
		doc.setFileName(objName + '.java');
		doc.setContent(''); // TODO
		*/
	}
	let src = doc.getContentAsText();
	if (debug) console.log(src);
	doc.setContentFromText(src += '\n// ' + new Date()); 
	obj.setFieldValue('obo_script_id', doc);
	return obj.update(item, { inlineDocuments: true });
}).then(item => {
	if (debug) console.log('Item', item);
	return app.logout();
}).then(() => {
	console.log('Logged out');
}).catch(err => {
	console.error(err);
});
