var simplicite = require('./simplicite');

var app = simplicite.session({
	url: process.env.TEST_SIMPLICITE_URL || 'https://dev40.dev.simplicite.io',
	debug: true
});

app.getHealth().then(function(health) {
	delete health._scope; // Clean scope from response
	console.log(health);
}).fail(function(reason) {
	console.error('' + reason);
});
