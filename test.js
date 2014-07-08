var simplicite = require('./simplicite');

var demo = simplicite.session({
	url: 'http://localhost:8080',
	root: 'demows',
	login: 'designer',
	password: 'designer',
	debug: false
});
console.log(demo.metadata);

var prd = demo.getBusinessObject('DemoProduct');
prd.getMetadata(function() {
	console.log('Name: ' + prd.getName());
	console.log('Instance: ' + prd.getInstance());
	console.log('Label: ' + prd.getLabel());
	console.log('Help: ' + prd.getHelp());
	console.log('RowId.name: ' + prd.getRowIdField().name);
	console.log('Fields.length: ' + prd.getFields().length);
	console.log('Links.length: ' + prd.getLinks().length);
	prd.search(function() {
		for (var i = 0; i < prd.list.length; i++) {
			var item = prd.list[i];
			console.log(item.row_id + ' ' + item.prdSupId__supName + ' ' + item.prdReference + ' ' + item.prdName);
		}
	}, { prdName: 'Tablet%' });
});

//var plcord = demo.getBusinessProcess('DemoPlaceNewOrder');
//console.log(plcord.metadata);
