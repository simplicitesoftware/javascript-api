var app = require('./simplicite').session({
	url: process.env.TEST_SIMPLICITE_URL || 'http://localhost:8080/simplicite',
	debug: true
});

app.getHealth().then(function(health) {
	delete health._scope; // Clean scope from response
	console.log(health);
}).fail(function(reason) {
	console.error('' + reason);
});
