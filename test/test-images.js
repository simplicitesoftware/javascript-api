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

let usr;
let rowId;
const login = 'test_' + Date.now();
const png = 'data:image/png;base64,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';
const jpg = 'data:image/jpeg;base64,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';

app.login().then(user => {
	app.debug(user);
	assert.ok(user.login === adminUsername);
	app.info('Logged in as ' + user.login);
	usr = app.getBusinessObject('User');
	return usr.getForCreate();
}).then(item => {
	app.debug('Get for create', item);
	assert.ok(item.row_id === simplicite.constants.DEFAULT_ROW_ID);
	item.usr_login = login;
	item.usr_image_id = new simplicite.Doc(`${login}.png`).setContent(png);
	return usr.create(item);
}).then(item => {
	app.debug('Create', item);
	rowId = item.row_id;
	assert.ok(rowId !== simplicite.constants.DEFAULT_ROW_ID);
	assert.ok(item.usr_login === login);
	assert.ok(item.usr_image_id && item.usr_image_id !== simplicite.constants.DEFAULT_ROW_ID);
	app.info(`Created with document ID = ${item.usr_image_id}`);
	app.info(`Document URL (current item) = ${usr.getFieldDocumentURL('usr_image_id')}`);
	app.info(`Document URL (created item) = ${usr.getFieldDocumentURL('usr_image_id', item)}`);
	app.info(`Document thubnail URL = ${usr.getFieldDocumentURL('usr_image_id', item, true)}`);
	return usr.get(rowId, { inlineDocuments: true, inlineThumbnails: true });
}).then(item => {
	app.debug('Get', item);
	assert.ok(item.row_id === rowId);
	const doc = usr.getFieldValue('usr_image_id'); // get a simplicite.Doc
	assert.ok(doc.getMIMEType() === 'image/png');
	assert.ok(doc.getName() === `${login}.png`);
	item.usr_image_id = new simplicite.Doc(`${login}.jpg`).setContent(jpg);
	return usr.update(item);
}).then(item => {
	app.debug('Update', item);
	assert.ok(item.row_id === rowId);
	assert.ok(item.usr_image_id && item.usr_image_id !== simplicite.constants.DEFAULT_ROW_ID);
	app.info(`Created with document ID = ${item.usr_image_id}`);
	app.info(`Document URL (current item) = ${usr.getFieldDocumentURL('usr_image_id')}`);
	app.info(`Document URL (created item) = ${usr.getFieldDocumentURL('usr_image_id', item)}`);
	app.info(`Document thubnail URL = ${usr.getFieldDocumentURL('usr_image_id', item, true)}`);
	return usr.del(item);
}).then(res => {
	app.debug('Delete', res);
	assert.ok(res.row_id === rowId);
	app.info('Deleted');
	return app.logout();
}).then(logout => {
	app.debug(logout);
	assert.ok(logout);
	app.info('Logged out');
	app.info('OK');
}).catch(err => {
	app.error(err);
});
