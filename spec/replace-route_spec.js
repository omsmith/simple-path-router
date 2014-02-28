/* global describe, it */

'use strict';

var router = new (require('../'))().listen(),
	request = require('supertest')(router._server);

describe('router', function () {
	it('should replace existing routes', function (done) {
		router
			.when('/abc', function (req, res) {
				res.statusCode = 200;
				res.end('/abc');
			});

		request
			.get('/abc')
			.expect(200)
			.expect('/abc')
			.end(function (err) {
				/* istanbul ignore if */
				if (err) {
					done(err);
				}

				router
					.when('/abc', function (req, res) {
						res.statusCode = 200;
						res.end('super new fun times');
					});

				request
					.get('/abc')
					.expect(200)
					.expect('super new fun times')
					.end(done);
			});
	});
});
