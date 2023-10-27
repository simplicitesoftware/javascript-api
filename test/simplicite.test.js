import simplicite from '../dist/esm/simplicite.js';
import { jest } from '@jest/globals';

const scheme = process.env.TEST_SIMPLICITE_SCHEME || 'http';
const host = process.env.TEST_SIMPLICITE_HOST || 'localhost';
const port = parseInt(process.env.TEST_SIMPLICITE_PORT, 10) || 8080;
const root = process.env.TEST_SIMPLICITE_ROOT || '';
const url = scheme + '://' + host + ':' + port + root;

const adminUsername = process.env.TEST_SIMPLICITE_ADMIN_USERNAME || 'designer';
const adminPassword = process.env.TEST_SIMPLICITE_ADMIN_PASSWORD || 'designer';

const testUsername = process.env.TEST_SIMPLICITE_USERNAME || 'website';
const testPassword = process.env.TEST_SIMPLICITE_PASSWORD || 'simplicite';

const app = simplicite.session({ url: url });
// or const app = simplicite.session({ scheme: scheme, host: host, port: port, root: root });

jest.setTimeout(30000);

test('Params', () => {
	app.info('Params test', app.parameters);
	expect(app.parameters.scheme).toBe(scheme);
	expect(app.parameters.host).toBe(host);
	expect(app.parameters.port).toBe(port);
	expect(app.parameters.root).toBe('');
	app.info('OK');
});

test('Health', () => {
	app.info('Health test');
	return app.getHealth().then(health => {
		expect(health.platform.status).toBe('OK');
		app.info('OK');
	}).catch(err => {
		app.error(err);
		expect(err).toBeNull(); // Force test failure
	});
});

test('Logins', () => {
	app.info('Logins test');
	app.setUsername(adminUsername);
	app.setPassword(adminPassword);
	return app.login().then(user => {
		expect(user.login).toBe(adminUsername);
		return app.getGrant({ inlinePicture: false });
	}).then(grant => {
		expect(grant.getLogin()).toBe(adminUsername);
		return app.logout();
	}).then(logout => {
		expect(logout).not.toBeUndefined();
		expect(app.username).toBeUndefined();
		expect(app.password).toBeUndefined();
		expect(app.authtoken).toBeUndefined();
		return app.login({ username: testUsername, password: testPassword });
	}).then(user => {
		expect(user.login).toBe(testUsername);
		return app.getGrant({ inlinePicture: false });
	}).then(grant => {
		expect(grant.getLogin()).toBe(testUsername);
		return app.logout();
	}).then(logout => {
		expect(logout).not.toBeUndefined();
		expect(app.username).toBeUndefined();
		expect(app.password).toBeUndefined();
		expect(app.authtoken).toBeUndefined();
		app.info('OK');
	}).catch(err => {
		app.error(err);
		expect(err).toBeNull(); // Force test failure
	});
});

test('Objects', () => {
	app.info('Objects test');
	let sys;
	let usr;
	let sysId, mdlId;
	const sysCodeFilter = '%TIMEOUT%';
	const sysCode = 'TEST_' + Date.now();
	const sysValue = 'Test';
	return app.login({ username: adminUsername, password: adminPassword }).then(user => {
		expect(user.login).toBe(adminUsername);
		return app.getGrant({ inlinePicture: true });
	}).then(grant => {
		expect(grant.login).toBe(adminUsername);
		expect(app.grant.getLogin()).toBe(adminUsername);
		expect(app.grant.hasResponsibility('ADMIN')).toBe(true);
		return app.getAppInfo();
	}).then(appinfo => {
		expect(appinfo.version).not.toBeUndefined();
		return app.getSysInfo();
	}).then(sysinfo => {
		expect(sysinfo.cacheobject).not.toBeUndefined();
		return app.getDevInfo();
	}).then(devinfo => {
		expect(devinfo.version).not.toBeUndefined();
		sys = app.getBusinessObject('SystemParam');
		return sys.getMetaData();
	}).then(metadata => {
		expect(metadata.name).toBe('SystemParam');
		expect(sys.getName()).toBe('SystemParam');
		return sys.action('getVersion');
	}).then(result => {
		expect(result).not.toBeUndefined();
		return sys.getCount({ sys_code: sysCodeFilter });
	}).then(count => {
		expect(count >= 0).toBe(true);
		return sys.search({ sys_code: sysCodeFilter });
	}).then(list => {
		expect(list.length).not.toBe(0);
		for (let i = 0; i < list.length; i++) {
			sys.item = list[i]; // set list item as current item
			expect(sys.item.row_id).not.toBe(simplicite.constants.DEFAULT_ROW_ID);
			expect(!!sys.item.sys_code).not.toBe(false);
			expect(!!sys.item.sys_value).not.toBe(false);
		}
		return sys.getFilters();
	}).then(filters => {
		// TODO: see why this is not OK
		//expect(filters.sys_code).toBe(sysCodeFilter);
		expect(!!filters).not.toBe(false);
		sysId = sys.item.row_id;
		mdlId = sys.item.row_module_id;
		sys.item = {};
		return sys.get(sysId);
	}).then(item => {
		expect(item.row_id).toBe(sysId);
		return sys.getForCreate();
	}).then(item => {
		expect(item.row_id).toBe(simplicite.constants.DEFAULT_ROW_ID);
		item.sys_code = sysCode;
		item.sys_value = sysValue;
		item.row_module_id = mdlId;
		return sys.create(item);
	}).then(item => {
		sysId = item.row_id;
		expect(sysId).not.toBe(simplicite.constants.DEFAULT_ROW_ID);
		expect(item.sys_code).toBe(sysCode);
		expect(item.sys_value).toBe(sysValue);
		return sys.getForUpdate(item.row_id);
	}).then(item => {
		expect(item.row_id).toBe(sysId);
		item.sys_value += ' updated';
		return sys.update(item);
	}).then(item => {
		expect(item.sys_value).toBe(sysValue + ' updated');
		item.sys_value += ' again';
		return sys.save(item);
	}).then(item => {
		expect(item.sys_value).toBe(sysValue + ' updated again');
		return sys.getForDelete(item.row_id);
	}).then(item => {
		expect(item.row_id).toBe(sysId);
		return sys.del(item);
	}).then(res => {
		expect(res.row_id).toBe(sysId);
		usr = app.getBusinessObject('User');
		return usr.search({ usr_login: app.grant.getLogin() }, { inlineThumbs: [ 'usr_image_id' ] });
	}).then(list => {
		expect(list[0].usr_login).toBe(app.grant.getLogin());
		expect(list[0].usr_image_id.thumbnail).not.toBeUndefined();
		return usr.print('User-VCARD', list[0].row_id);
	}).then(doc => {
		expect(doc.getContent()).not.toBeUndefined();
		return usr.get(app.grant.getUserId(), { treeView: 'TreeUser' });
	}).then(tree => {
		expect(tree.object).toBe('User');
		expect(tree.item.row_id).toBe(app.grant.getUserId()+'');
		return app.logout();
	}).then(logout => {
		expect(logout).not.toBeUndefined();
		app.info('OK');
	}).catch(err => {
		app.error(err);
		expect(err).toBeNull(); // Force test failure
	});
});

test('Image', () => {
	app.info('Image test');
	const login = `test_${new Date().getTime()}`;
	const img = `data:image/png;base64,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`;
	let usr;
	let rowId;
	return app.login({ username: adminUsername, password: adminPassword }).then(user => {
		expect(user.login).toBe(adminUsername);
		usr = app.getBusinessObject('User');
		return usr.getForCreate();
	}).then(item => {
		expect(item.row_id).toBe(simplicite.constants.DEFAULT_ROW_ID);
		item.usr_login = login;
		item.usr_image_id = new simplicite.Doc(`${login}.png`).setContent(img);
		return usr.create(item);
	}).then(item => {
		rowId = item.row_id;
		expect(rowId).not.toBe(simplicite.constants.DEFAULT_ROW_ID);
		expect(item.usr_image_id && item.usr_image_id !== simplicite.constants.DEFAULT_ROW_ID).toBe(true);
		return usr.get(rowId, { inlineDocuments: true, inlineThumbnails: true });
	}).then(item => {
		expect(item.row_id).toBe(rowId);
		const doc = usr.getFieldValue('usr_image_id'); // get a simplicite.Doc
		expect(doc.getMIMEType()).toBe('image/png');
		expect(doc.getName()).toBe(`${login}.png`);
		return usr.del(item);
	}).then(res => {
		expect(res.row_id).toBe(rowId);
		return app.logout();
	}).then(logout => {
		expect(logout).not.toBeUndefined();
		app.info('OK');
	}).catch(err => {
		app.error(err);
		expect(err).toBeNull(); // Force test failure
	});
});