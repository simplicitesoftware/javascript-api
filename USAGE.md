![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250.png)
* * *

This is the node.js&reg; &amp; browser **JavaScript module** for the [Simplicit&eacute;&reg; platform](http://www.simplicitesoftware.com).


```javascript
const app = require('simplicite').session({ url: '<my instance base URL>' });
app.login({ username: '<my username>', password: '<my password>' }).then(function() {
	let obj = app.getBusinessObject('MyObject');
	return app.search();
}).then(function(res) {
	// Do something with search result (available both as res and as obj.list)
	// Etc.
}).catch(function(err) {
	console.error(err.message);
});
```

Check `test*.js` for other examples of basic usage.

For more advanced examples, check these repositories:

- **Server-side**:
	- [Node.js&reg; demo](https://github.com/simplicitesoftware/nodejs-demo)
- **Client-side**:
	- [Plain web demo](https://github.com/simplicitesoftware/web-demo)
	- [Vue.js&reg; demo](https://github.com/simplicitesoftware/vue-demo)
	- [React&reg; demo](https://github.com/simplicitesoftware/react-demo)
	- [Angular&reg; demo](https://github.com/simplicitesoftware/angular-demo)
- **Native**:
	- [ReactNative&reg; demo](https://github.com/simplicitesoftware/react-native-demo)
