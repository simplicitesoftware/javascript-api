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

app.login().then(res => {
	if (debug) console.log(res);
	console.log('Logged in as ' + res.login);
	return app.getDevInfo();
}).then(devinfo => {
	if (debug) console.log(devinfo);
	return app.getDevInfo('Demo');
}).then(mdldevinfo => {
	if (debug) console.log(mdldevinfo);
	obj = app.getBusinessObject('ObjectInternal');
	return obj.search({ obo_name: 'AppTestSrc' });
}).then(list => {
	if (debug) console.log(list);
	return obj.getForUpdate(list[0].row_id, { inlineDocuments: true });
}).then(item => {
	if (debug) console.log(item);
	let doc = obj.getFieldDocument('obo_script_id');
	if (debug) console.log(doc);
	let src = doc.getContentAsText();
	if (debug) console.log(src);
	doc.setContentFromText(src += '\n// ' + new Date()); 
	obj.setFieldValue('obo_script_id', doc);
	return obj.update(item, { inlineDocuments: true });
}).then(item => {
	if (debug) console.log(item);
	return app.logout();
}).then(() => {
	console.log('Logged out');
}).catch(err => {
	console.error(err);
});
