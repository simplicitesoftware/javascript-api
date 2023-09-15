![Simplicit&eacute; Software](https://www.simplicite.io/resources/logos/logo250-grey.png)
* * *

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=simplicitesoftware_javascript-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=simplicitesoftware_javascript-api)

Prepare
=======

Look for updates:

```bash
npm run ncu
```

Install dependencies:

```bash
npm install
```

Build
=====

Check syntax and rules:

```bash
npm run lint
```

Compile and package

```bash
npm run build
```

Test
====

Node.js
-------

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

Browser
-------

```bash
npm run test:browser
```

Documentation
=============

Generate documentation:

```bash
npm run doc
```

Publish
=======

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