var simplicite = require('./simplicite');

var demo = simplicite.session({
	url: 'http://localhost:8080',
	root: 'demo',
	login: 'designer',
	password: 'designer',
	debug: false
});
console.log(demo.metadata);

var prd = demo.getBusinessObject('DemoProduct');
prd.getMetadata(function() {
	console.log(prd.metadata.label);
});

//var plcord = demo.getBusinessProcess('DemoPlaceNewOrder');
//console.log(plcord.metadata);
