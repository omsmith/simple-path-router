/* global describe, it */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	var routes = ['/a', '/a/b', '/a/b/c'];

	routes.forEach(function (route) {
		router.when(route, function (req, res) {
			res.statusCode = 200;
			res.end(route);
		});
	});

	routes.forEach(function (route) {
		it ('should route to ' + route, function (done) {
			request
				.get(route)
				.expect(200)
				.expect(route)
				.end(done);
		});

		it ('should route to child /a of' + route, function (done) {
			request
				.get(route + '/a')
				.expect(200)
				.expect(route)
				.end(done);
		});
	});
});
