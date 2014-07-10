var simplicite = require("./simplicite");

var app = simplicite.session({
	host: "localhost",
	port: 8080,
	scheme: "http",
	root: "demows",
	user: "designer",
	password: "designer",
	debug: true
});
var sys;

// Using promise-style functions
app.login().then(function(parameters) {
	console.log(app.parameters);
	return app.getGrant({ inlinePicture: true }); // Chaining next promise
}).then(function(grant) {
	console.log(grant);
	console.log("Hello " + grant.getLogin() + " (" + grant.getFirstName() + " " + grant.getLastName() + ")");
	if (app.grant.hasResponsibility("ADMIN")) console.log("Beware, you are platform administrator !");
	return app.getAppInfo(); // Chaining next promise
}).then(function(appinfo) {
	console.log(appinfo);
	return app.getSysInfo(); // Chaining next promise
}).then(function(sysinfo) {
	console.log(sysinfo);
	sys = app.getBusinessObject("SystemParam");
	return sys.getMetadata(); // Chaining next promise
}).then(function(metadata) {
	console.log(metadata);
	console.log("Name: " + sys.getName());
	console.log("Instance: " + sys.getInstance());
	console.log("Label: " + sys.getLabel());
	console.log("Help: " + sys.getHelp());
	console.log("RowId.name: " + sys.getRowIdField().name);
	console.log("Fields.length: " + sys.getFields().length);
	console.log("Links.length: " + sys.getLinks().length);
	return sys.search({ sys_code: "EASYMODE%" });
}).then(function(list) {
	console.log("Found " + list.length + " items");
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		console.log("\titem[" + i + "]: " + item.row_id + " " + item.sys_code + " " + item.sys_value);
	}
	return sys.get(2); // Chaining next promise
}).then(function(item) {
	console.log("Got item for rowId 2 !");
	console.log("item: " + item.row_id + " " + item.sys_code + " " + item.sys_value);
	return sys.getForCreate(); // Chaining next promise
}).then(function(item) {
	console.log("Got new item for creation !");
	console.log(item);
	item.sys_code = "TEST";
	item.sys_value = "Test";
	return sys.create(item); // Chaining next promise
}).then(function(item) {
	console.log("Created new item !");
	console.log(item);
	return sys.del(item); // Chaining next promise
}).then(function() {
	console.log("Deleted item !");
});

// Using callback-style functions
/*
app._login(function() {
	console.log(app.parameters);
	app._getGrant(function() {
		console.log(app.grant);
		console.log("Hello " + app.grant.getLogin() + " (" + app.grant.getFirstName() + " " + app.grant.getLastName() + ")");
		if (app.grant.hasResponsibility("ADMIN"))
			console.log("You are platform administrator !");
		app._getAppInfo(function() {
			console.log(app.appinfo);
			app._getSysInfo(function() {
				console.log(app.sysinfo);
				sys = app.getBusinessObject("SystemParam");
				sys._getMetadata(function() {
					console.log("Got metadata !");
					console.log("Name: " + sys.getName());
					console.log("Instance: " + sys.getInstance());
					console.log("Label: " + sys.getLabel());
					console.log("Help: " + sys.getHelp());
					console.log("RowId.name: " + sys.getRowIdField().name);
					console.log("Fields.length: " + sys.getFields().length);
					console.log("Links.length: " + sys.getLinks().length);
					sys._search(function() {
						console.log("Searched !");
						for (var i = 0; i < sys.list.length; i++) {
							var item = sys.list[i];
							console.log("list[" + i + "]: " + item.row_id + " " + item.sys_code + " " + item.sys_value);
						}
						sys._get(function() {
							console.log("Selected !");
							console.log("item: " + sys.item.row_id + " " + sys.item.sys_code + " " + sys.item.sys_value);
							sys._getForCreate(function() {
								console.log("Got for creation !");
								console.log(sys.item);
								sys._create(function() {
									console.log("Created !");
									console.log(sys.item);
									sys._del(function() {
										console.log("Deleted !");
										sys.action(function(res) {
											console.log("Action result = " + res);
										}, "getVersion");
									});
								}, { sys_code: "TEST", sys_value: "Testé" });
							});
						}, 2);
					}, { sys_code: "EASYMODE%" });
				});
			});
		});
	}, { inlinePicture: true });
});
*/

