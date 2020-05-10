![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250.png)
* * *

This is the node.js&reg; &amp; browser **JavaScript module** for the [Simplicit&eacute;&reg; platform](http://www.simplicitesoftware.com).

It uses promises, basic usage is something like:

```javascript
const app = require('simplicite').session({ url: '<my instance base URL>' });

app.login({ username: '<my username>', password: '<my password>' }).then(res => {
	console.log('Hello ' + res.login + '!');
	let obj = app.getBusinessObject('MyObject');
	return app.search();
}).then(list => {
	// Do something with the search results list
	// Etc.
}).catch(err => {
	console.error(err.message);
});
```

Check the [GitHub repository](https://github.com/simplicitesoftware/nodejs-api) `test/test*.js`
files for other examples of basic usage.

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
