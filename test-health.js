var simplicite = require('./simplicite');

var app = simplicite.session({
	scheme: process.env.SIMPLICITE_SCHEME || 'http',
	host: process.env.SIMPLICITE_HOST || 'localhost',
	port: process.env.SIMPLICITE_PORT || 8080,
	root: process.env.SIMPLICITE_ROOT || '',
	debug: true
});
var sys;

app.getHealth().then(function(health) {
	console.log(health);
}, function(reason) {
	console.error('' + reason);
});
