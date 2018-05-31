const simplicite = require('./simplicite');

const debug = true;

const app = simplicite.session({
	scheme: process.env.TEST_SIMPLICITE_SCHEME || 'http',
	host: process.env.TEST_SIMPLICITE_HOST || 'localhost',
	port: parseInt(process.env.TEST_SIMPLICITE_PORT) || 8080,
	root: process.env.TEST_SIMPLICITE_ROOT || '',
	user: process.env.TEST_SIMPLICITE_USERNAME || 'designer',
	password: process.env.TEST_SIMPLICITE_PASSWORD || 'designer',
	debug: debug
});

let sys, usr;

// Using promise-style functions
app.login().then(function(parameters) {
	if (debug) console.log(app.parameters);
	console.log('Logged in as ' + parameters.user);
	return app.getGrant({ inlinePicture: true }); // Chaining next promise
}, function(reason) {
	console.error('ERROR: Login failed (reason: ' + reason + ')');
	app.loginError = reason;
}).then(function(grant) {
	if (app.loginError) return;
	if (debug) console.log(grant);
	console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
	if (app.grant.hasResponsibility('ADMIN')) console.log('Beware, you are platform administrator !');
	return app.getAppInfo(); // Chaining next promise
}).then(function(appinfo) {
	if (app.loginError) return;
	if (debug) console.log(appinfo);
	console.log('Application title: ' + appinfo.title);
	return app.getSysInfo(); // Chaining next promise
}).then(function(sysinfo) {
	if (app.loginError) return;
	if (debug) console.log(sysinfo);
	console.log('Memory: ' + sysinfo.heapmaxsize);
	sys = app.getBusinessObject('SystemParam');
	return sys.getMetaData(); // Chaining next promise
}).then(function(metadata) {
	if (app.loginError) return;
	if (debug) console.log(metadata);
	console.log('Name: ' + sys.getName());
	console.log('Instance: ' + sys.getInstance());
	console.log('Label: ' + sys.getLabel());
	console.log('Help: ' + sys.getHelp());
	console.log('RowId.name: ' + sys.getRowIdField().name);
	console.log('Fields.length: ' + sys.getFields().length);
	console.log('Links.length: ' + sys.getLinks().length);
	return sys.getCount({ sys_code: 'EASYMODE%' }); // Chaining next promise
}).then(function(count) {
	if (app.loginError) return;
	if (debug) console.log(count);
	console.log('Count: ' + count);
	return sys.search({ sys_code: 'EASYMODE%' }); // Chaining next promise
}).then(function(list) {
	if (app.loginError) return;
	if (debug) console.log(list);
	console.log('Found ' + list.length + ' items');
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		console.log('  item[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	}
	return sys.get(2); // Chaining next promise
}).then(function(item) {
	if (app.loginError) return;
	if (debug) console.log(item);
	console.log('Got item for rowId 2 !');
	console.log('item: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
	return sys.getForCreate(); // Chaining next promise
}).then(function(item) {
	if (app.loginError) return;
	if (debug) console.log(item);
	console.log('Got new item for creation !');
	item.sys_code = 'TEST';
	item.sys_value = 'Test';
	return sys.create(item); // Chaining next promise
}).then(function(item) {
	if (app.loginError) return;
	if (debug) console.log(item);
	console.log('Created new item !');
	return sys.del(item); // Chaining next promise
}).then(function() {
	if (app.loginError) return;
	console.log('Deleted item !');
	usr = app.getBusinessObject('User');
	return usr.get(1, { treeView: 'TreeUser' }); // Chaining next promise
}).then(function(tree) {
	if (app.loginError) return;
	console.log('Got treeview !');
	if (debug) console.log(tree);
	return app.logout(); // Chaining next promise
}).then(function() {
	if (app.loginError) return;
	console.log('Logged out');
});

// Using callback-style functions
/*
app._login(function() {
	console.log(app.parameters);
	app._getGrant(function() {
		console.log(app.grant);
		console.log('Hello ' + app.grant.getLogin() + ' (' + app.grant.getFirstName() + ' ' + app.grant.getLastName() + ')');
		if (app.grant.hasResponsibility('ADMIN'))
			console.log('You are platform administrator !');
		app._getAppInfo(function() {
			console.log(app.appinfo);
			app._getSysInfo(function() {
				console.log(app.sysinfo);
				sys = app.getBusinessObject('SystemParam');
				sys._getMetaData(function() {
					console.log('Got metadata !');
					console.log('Name: ' + sys.getName());
					console.log('Instance: ' + sys.getInstance());
					console.log('Label: ' + sys.getLabel());
					console.log('Help: ' + sys.getHelp());
					console.log('RowId.name: ' + sys.getRowIdField().name);
					console.log('Fields.length: ' + sys.getFields().length);
					console.log('Links.length: ' + sys.getLinks().length);
					sys._search(function() {
						console.log('Searched !');
						for (let i = 0; i < sys.list.length; i++) {
							let item = sys.list[i];
							console.log('list[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
						}
						sys._get(function() {
							console.log('Selected !');
							console.log('item: ' + sys.item.row_id + ' ' + sys.item.sys_code + ' ' + sys.item.sys_value);
							sys._getForCreate(function() {
								console.log('Got for creation !');
								console.log(sys.item);
								sys._create(function() {
									console.log('Created !');
									console.log(sys.item);
									sys._del(function() {
										console.log('Deleted !');
										sys.action(function(res) {
											console.log('Action result = ' + res);
											usr = app.getBusinessObject('User');
											usr.get(function(tree) {
												console.log('Got treeview !');
												console.log(tree);
												app._logout(function() {
													conole.log('Logged out');
												});
											}, 1, { treeView: 'TreeUser' });
										}, 'getVersion');
									});
								}, { sys_code: 'TEST', sys_value: 'Testé' });
							});
						}, 2);
					}, { sys_code: 'EASYMODE%' });
				});
			});
		});
	}, { inlinePicture: true });
});
*/
