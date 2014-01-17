var
	_       = require('lodash'),
	assert  = require('assert'),
	crypto  = require('crypto'),
	events  = require('events'),
	nodeify = require('./nodeify'),
	P       = require('p-promise'),
	path    = require('path'),
	Request = require('request'),
	util    = require('util'),
	rgb2hsv = require('./rgb').rgb2hsv
	;

var TIMEOUT = 30000;

var Chuey = module.exports = function Chuey(opts)
{
	assert(opts && (typeof opts === 'object'), 'you must pass an options object to the contructor');
	assert(opts.stationIp, 'you must pass a `stationIp` option');
	assert(opts.appName, 'you must pass an `appName` option');

	events.EventEmitter.call(this);

	this.base    = opts.stationIp;
	this.appname = opts.appName;
	this.key     = crypto.createHash('md5').update(opts.appName).digest('hex');
};
util.inherits(Chuey, events.EventEmitter);

Chuey.prototype.base          = '';
Chuey.prototype.appname       = '';
Chuey.prototype.key           = '';
Chuey.prototype.authenticated = false;

Chuey.prototype.makeURI = function(suffix)
{
	if (!suffix) suffix = '';

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

	return this.execute(opts, callback);
};

Chuey.prototype.light = function(light, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var opts =
	{
		url:     this.makeURI(['lights', light]),
		json:    true,
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.rename = function(light, name, callback)
{
	assert(light, 'you must pass a numeric index for `light`');
	assert(name && _.isString(name), 'you must pass a string for `name`');

	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light]),
		json:    { name: name },
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.state = function(light, state, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    state,
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.on = function(light, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    { on: true },
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.off = function(light, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var opts =
	{
		method:  'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:    { on: false },
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.rgb = function(light, r, g, b, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var hsv = rgb2hsv(r, g, b);
	var opts =
	{
		method: 'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:
		{
			hue:        182 * hsv.hue,
			saturation: Math.ceil(254 * hsv.saturation),
			value:      Math.ceil(254 * hsv.value)
		},
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.hsv = function(light, h, s, v, callback)
{
	assert(light, 'you must pass a numeric index for `light`');

	var opts =
	{
		method: 'PUT',
		url:     this.makeURI(['lights', light, 'state']),
		json:
		{
			hue:        182 * h,
			saturation: Math.ceil(254 * s),
			value:      Math.ceil(254 * v)
		},
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.register = function(opts, callback)
{
	if (typeof opts === 'function')
	{
		callback = opts;
		opts = {};
	}
	else if (!opts)
		opts = {};

	assert(typeof opts === 'object', 'you must pass an options object to register()');

	var interval    = opts.interval || 3000;
	var maxattempts = opts.attempts || 3;
	var devicetype  = opts.devicetype || this.appname;
	var username    = opts.username || this.key;

	var params =
	{
		method: 'POST',
		url: this.makeURI(),
		json:
		{
			devicetype: devicetype,
			username:   username
		}
	};

	var deferred = P.defer();
	var attempts = 0;

	function attemptRegistration()
	{
		Request(params, function(err, response, body)
		{
			attempts++;
			if (err || (Array.isArray(r) && r[0].error))
			{
				var error = err || r[0].error;

				if (attempts >= maxattempts)
					return deferred.reject(error);

				setTimeout(attemptRegistration, interval);
				return;
			}

			deferred.resolve(body);
		});
	}

	attemptRegistration();
	return nodeify(deferred.promise, callback);
};

Chuey.prototype.unregister = function(key, callback)
{
	if (typeof key === 'object')
	{
		callback = key;
		key = this.key;
	}
	key = key || this.key;

	var opts =
	{
		method: 'DELETE',
		url:     this.makeURI(['config', 'whitelist', key]),
		timeout: TIMEOUT
	};

	return this.execute(opts, callback);
};

Chuey.prototype.execute = function(parameters, callback)
{
	var deferred = P.defer();

	Request(parameters, function(err, response, body)
	{
		if (err)
			return deferred.reject(err);

		if (Array.isArray(body) && body[0].error)
			return deferred.reject(body[0].error);

		deferred.resolve(body);
	});

	return nodeify(deferred.promise, callback);
};
