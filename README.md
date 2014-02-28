# simple-path-router

[![Build Status](https://travis-ci.org/omsmith/simple-path-router.png?branch=master)](https://travis-ci.org/omsmith/simple-path-router) [![Coverage Status](https://coveralls.io/repos/omsmith/simple-path-router/badge.png)](https://coveralls.io/r/omsmith/simple-path-router)

A simple path-only router

## Example
```
'use strict';

var PathRouter = require('simple-path-router');

var router = new PathRouter()
	.when('/', serveWeb)
	.when('/api', serveApi);

require('http')
	.createServer(router.dispatch)
	.listen(10000);

function serveWeb (req, res) {
	console.log('web!');
	res.statusCode = 200;
	res.end();
}

function serveApi (req, res) {
	console.log('api!');
	res.statusCode = 200;
	res.end();
}
```
