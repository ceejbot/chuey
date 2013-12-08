var
	_       = require('lodash'),
	assert  = require('assert'),
	crypto  = require('crypto'),
	events  = require('events'),
	P       = require('p-promise'),
	path    = require('path'),
	Request = require('request'),
	util    = require('util')
	;

var TIMEOUT = 30000;

var Chuey = module.exports = function Chuey(opts)
{
	assert(opts && (typeof opts === 'object'), 'you must pass an options object to the contructor');
	assert(opts.stationIp, 'you must pass a `stationIp` option');
	assert(opts.appName, 'you must pass an `appName` option');

	events.EventEmitter.call(this);

	this.base = opts.stationIp;
	this.appname = opts.appName;
	this.key = Crypto.createHash('md5').update(config.appName).digest('hex');
};
util.inherits(Chuey, events.EventEmitter);

Chuey.prototype.base          = '';
Chuey.prototype.appname       = '';
Chuey.prototype.key           = '';
Chuey.prototype.authenticated = false;

Chuey.prototype.makeURI = function(suffix)
{
	if (!this.apiBase)
		this.apiBase = 'http://' + [this.base, 'api', this.key].join('/');
	if (Array.isArray(suffix))
	{
		suffix.unshift(this.apiBase);
		return suffix.join('/');
	}
	return this.apiBase + '/' + suffix;
};

Chuey.prototype.lights = function(callback)
{
	var opts =
	{
		url:     this.makeURI('lights'),
		json:    true,
		timeout: TIMEOUT
	};

	return execute(opts, callback);
};

Chuey.prototype.light = function(light, callback)
{
	var opts =
	{
		url:     this.makeURI(['lights', light]),
		json:    true,
		timeout: TIMEOUT
	};

	return execute(opts, callback);
};

Chuey.prototype.state = function(light, state, callback)
{
	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    state,
		timeout: TIMEOUT
	};

	return execute(opts, callback);
};

Chuey.prototype.on = function(light, callback)
{
	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    { on: true },
		timeout: TIMEOUT
	};

	return execute(opts, callback);
};

Chuey.prototype.off = function(light, callback)
{
	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    { on: false },
		timeout: TIMEOUT
	};

	return execute(opts, callback);
};

function execute(parameters, callback)
{
	var deferred = P.defer();

	Request(parameters, function(err, response, body)
	{
		if (err)
			return deferred.reject(err);

		if (Array.isArray(r) && r[0].error)
			return deferred.reject(r[0].error);

		deferred.resolve(body);
	});

	return nodeify(deferred.promise, callback);
}


function nodeify(promise, callback)
{
	if (typeof callback !== 'function')
		return promise;

	promise
	.then(function(value)
	{
		callback(null, value);
	}, callback)
	.done();
}
