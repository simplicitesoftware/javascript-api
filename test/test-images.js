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

let obj, rowId;
const code = 'TEST_' + Date.now();
const img = 'data:image/png;base64,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';

app.login().then(user => {
	app.debug(user);
	assert.ok(user.login == adminUsername);
	app.info('Logged in as ' + user.login);
	obj = app.getBusinessObject('AppObject1');
	return obj.getForCreate();
}).then(item => {
	app.debug('Get for create', item);
	assert.ok(item.row_id == app.constants.DEFAULT_ROW_ID);
	item.appObj1Code = code;
	item.appObj1Picture = { name: 'test.png', content: img };
	return obj.create(item);
}).then(item => {
	app.debug('Create', item);
	rowId = item.row_id;
	assert.ok(rowId != app.constants.DEFAULT_ROW_ID);
	assert.ok(item.appObj1Code == code);
	assert.ok(item.appObj1Picture && item.appObj1Picture != app.constants.DEFAULT_ROW_ID);
	app.info('Created with document ID = ' + item.appObj1Picture);
	app.info('Document URL (current item) = ' + obj.getFieldDocumentURL('appObj1Picture'));
	app.info('Document URL (created item) = ' + obj.getFieldDocumentURL('appObj1Picture', item));
	app.info('Document thubnail URL = ' + obj.getFieldDocumentURL('appObj1Picture', item, true));
	return obj.get(rowId, { inlineDocuments: true, inlineThumbnails: true });
}).then(item => {
	app.debug('Get', item);
	assert.ok(item.row_id == rowId);
	return obj.del(item);
}).then(res => {
	app.debug('Delete', res);
	assert.ok(res.row_id == rowId);
	app.info('Deleted');
	return app.logout();
}).then(logout => {
	app.debug(logout);
	assert.ok(logout.result);
	app.info('Logged out');
}).catch(err => {
	app.error(err);
});
