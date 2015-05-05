'use strict';

var http = require('http'),
	Router = require('./router');

module.exports = PathRouter;

function PathRouter () {
	this._router = new Router();

	this.dispatch = PathRouter.prototype.dispatch.bind(this);
}

PathRouter.prototype.when = function () {
	this._router.when.apply(this._router, arguments);
	return this;
};

PathRouter.prototype.default = function () {
	this._router.default.apply(this._router, arguments);
	return this;
};

PathRouter.prototype.dispatch = function () {
	this._router.dispatch.apply(this._router, arguments);
};

PathRouter.prototype.listen = function () {
	this._server = this._server || http.createServer(this.dispatch);
	this._server.listen.apply(this._server, arguments);
	return this;
};
