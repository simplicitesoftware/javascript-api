var simplicite = require('./simplicite');

var demo = simplicite.session({
	url: 'http://localhost:8080',
	root: 'demows',
	login: 'designer',
	password: 'designer',
	debug: false
});
console.log(demo.metadata);

var sys = demo.getBusinessObject('SystemParam');
sys.getMetadata(function() {
	console.log('Name: ' + sys.getName());
	console.log('Instance: ' + sys.getInstance());
	console.log('Label: ' + sys.getLabel());
	console.log('Help: ' + sys.getHelp());
	console.log('RowId.name: ' + sys.getRowIdField().name);
	console.log('Fields.length: ' + sys.getFields().length);
	console.log('Links.length: ' + sys.getLinks().length);
	sys.search(function() {
		for (var i = 0; i < sys.list.length; i++) {
			var item = sys.list[i];
			console.log('list[' + i + "]: " + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
		}
		sys.get(function() {
			console.log('item: ' + sys.item.row_id + ' ' + sys.item.sys_code + ' ' + sys.item.sys_value);
		}, 1);
	}, { sys_code: 'EASYMODE%' });
});

//var plcord = demo.getBusinessProcess('DemoPlaceNewOrder');
//console.log(plcord.metadata);
