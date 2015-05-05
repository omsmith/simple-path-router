'use strict';

var url = require('fast-url-parser');

module.exports = Router;

function defaultHandler (req, res) {
	res.statusCode = 404;
	res.end();
}

function Router () {
	this._routes = [];
	this._handlers = {};
	this._default = defaultHandler;
}

Router.prototype.when = function (route, handler) {
	var handlers = this._handlers,
		routes = this._routes;

	if (route[0] !== '/') {
		route = '/' + route;
	}

	route = route
		.replace(/^(.*)\/$/, '$1')
		.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');

	if (!handlers[route]) {
		var regex = new RegExp('^' + route + '(\\/.*)*$'),
			routeMeta = {
				route: route,
				test: regex.test.bind(regex),
				parts: route.split('/').length
			};

		routes.push(routeMeta);

		if (routes.length > 1) {
			routes.sort(function (a, b) {
				return b.parts - a.parts;
			});
		}
	}

	handlers[route] = handler;

	return this;
};

Router.prototype.default = function (handler) {
	if ('function' !== typeof handler) {
		throw new Error('"handler" must be a function');
	}

	this._default = handler;
};

Router.prototype.dispatch = function (req) {
	var reqPath = url.parse(req.url).pathname,
		matchedRoute;

	this._routes.some(function (route) {
		if (route.test(reqPath)) {
			matchedRoute = route.route;
			return true;
		}

		return false;
	});

	var handler = this._handlers[matchedRoute] || this._default;
	handler.apply(this, arguments);
};
