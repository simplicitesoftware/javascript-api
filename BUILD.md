![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250-grey.png)
* * *

<a href="https://www.simplicite.io"><img src="https://img.shields.io/badge/author-Simplicite_Software-blue.svg?style=flat-square" alt="Author"></a>&nbsp;<img src="https://img.shields.io/badge/license-Apache--2.0-orange.svg?style=flat-square" alt="License"> [![Gitter chat](https://badges.gitter.im/org.png)](https://gitter.im/simplicite/Lobby)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=simplicitesoftware_nodejs-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=simplicitesoftware_nodejs-api)

Simplicit&eacute;&reg; node.js&reg; &amp; browser JavaScript API
================================================================

[![NPM](https://nodei.co/npm/simplicite.png?downloads=true&downloadRank=true)](https://nodei.co/npm/simplicite/) 

Introduction
------------

This is the node.js&reg; &amp; browser **JavaScript API** for the [Simplicit&eacute;&reg; platform](http://www.simplicitesoftware.com).

It can be used in **server-side** node applications, in a **client-side** web applications
(e.g. by building a bundle with [browserify](http://browserify.org) and/or by using various dedicated frameworks)
or in **native** JavaScript-based mobile frameworks.

> **Note**: as of version 2.0.0 this API will not work on old browsers like Internet Explorer.
> If you need support for such old browsers, you **must** use a 1.x.y version

Prepare
-------

Look for updates:

```bash
npm run ncu
```

Install dependencies:

```bash
npm install
```

Usage
-----

See the [documentation](https://simplicitesoftware.github.io/nodejs-api/) for details.

Build
-----

Check syntax and rules:

```bash
npm run lint
```

Compile and package

```bash
npm run build
```

Test
----

### Node.js

Set the environment variables for your Simplicité instance:

- `TEST_SIMPLICITE_SCHEME` defaults to `'http'`
- `TEST_SIMPLICITE_HOST` defaults to `'localhost'`
- `TEST_SIMPLICITE_PORT` defaults to `8080`
- `TEST_SIMPLICITE_ROOT` defaults to `''` (root webapp)
- `TEST_SIMPLICITE_URL` defaults to `http://localhost:8080`
- `TEST_SIMPLICITE_ADMIN_SERNAME` defaults to `'designer'`
- `TEST_SIMPLICITE_ADMIN_PASSWORD` defaults to `'designer'`
- `TEST_SIMPLICITE_USERNAME` defaults to `'website'`
- `TEST_SIMPLICITE_PASSWORD` defaults to `'simplicite'`

Run the unit tests, this generates the `coverage` folder:

```bash
npm run test
```

### Browser

```bash
npm run test-browser
```

Documentation
-------------

Generate documentation:

```bash
npm run doc
```

Publish
-------

Check package to be published:

```bash
npm pack
tar tvfz simplicite-x.y.z.tgz
rm simplicite-x.y.z.tgz
```

Publish to npm repository:

```bash
npm publish
```

Deprecate previous version:

```bash
npm deprecate simplicite@x.y.z-1 'Deprecated'
```