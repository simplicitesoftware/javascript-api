var simplicite = require("./simplicite");

var app = simplicite.session({
	host: "localhost",
	port: 8080,
	scheme: "http",
	root: "",
	debug: true
});
var sys;

app.getHealth().then(function(health) {
	console.log(health);
}, function(reason) {
	console.error('' + reason);
});
