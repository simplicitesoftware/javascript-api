var simplicite = require('./simplicite');

var app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080',
	debug: true
});
var sys;

app.getHealth().then(function(health) {
	console.log(health);
}, function(reason) {
	console.error('' + reason);
});
