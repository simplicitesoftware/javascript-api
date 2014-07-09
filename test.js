var simplicite = require('./simplicite');

var app = simplicite.session({
	url: 'http://localhost:8080',
	root: 'demows',
	user: 'designer',
	password: 'designer',
	encoding: 'ISO-8859-1',
	debug: false
});

function objtest() {
	var sys = app.getBusinessObject('SystemParam');
	sys.getMetadata(function() {
		console.log("Got metadata !");
		console.log('Name: ' + sys.getName());
		console.log('Instance: ' + sys.getInstance());
		console.log('Label: ' + sys.getLabel());
		console.log('Help: ' + sys.getHelp());
		console.log('RowId.name: ' + sys.getRowIdField().name);
		console.log('Fields.length: ' + sys.getFields().length);
		console.log('Links.length: ' + sys.getLinks().length);
		sys.search(function() {
			console.log("Searched !");
			for (var i = 0; i < sys.list.length; i++) {
				var item = sys.list[i];
				console.log('list[' + i + "]: " + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
			}
			sys.get(function() {
				console.log("Selected !");
				console.log('item: ' + sys.item.row_id + ' ' + sys.item.sys_code + ' ' + sys.item.sys_value);
				sys.getForCreate(function() {
					console.log("Got for creation !");
					console.log(sys.item);
					sys.create(function() {
						console.log("Created !");
						console.log(sys.item);
						sys.del(function() {
							console.log("Deleted !");
							sys.action(function(res) {
								console.log("Action result = " + res);
							}, "getVersion");
						});
					}, { sys_code: "TEST", sys_value: "Testé" });
				});
			}, 2);
		}, { sys_code: 'EASYMODE%' });
	});
}

function pcstest() {
	//var plcord = app.getBusinessProcess('???');
	//console.log(plcord.metadata);
}

function exttest() {
	//var extord = app.getExternalObject('???');
	//console.log(extord.metadata);
}

app.login(function() {
	console.log(app.parameters);
	app.getGrant(function() {
		console.log(app.grant);
		console.log('Hello ' + app.grant.getLogin() + ' (' + app.grant.getFirstName() + ' ' + app.grant.getLastName() + ')');
		if (app.grant.hasResponsibility('ADMIN'))
			console.log('You are platform administrator !');
		app.getAppInfo(function() {
			console.log(app.appinfo);
			app.getSysInfo(function() {
				console.log(app.sysinfo);
				objtest();
				//pcstest();
				//exttest();
			});
		});
	}, { inlinePicture: true });
});