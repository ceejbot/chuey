/*global describe:true, it:true, before:true, after:true */

var
	demand = require('must'),
	Chuey  = require('../lib/chuey')
	;

describe('Chuey', function()
{
	describe('constructor', function()
	{
		it('throws if you fail to pass `options`', function()
		{
			function shouldThrow() { return new Chuey(); }
			shouldThrow.must.throw(/options/);
		});

		it('throws if you fail to pass `options.stationIp`', function()
		{
			function shouldThrow() { return new Chuey({}); }
			shouldThrow.must.throw(/stationIp/);
		});

		it('throws if you fail to pass `options.appName`', function()
		{
			function shouldThrow() { return new Chuey({ stationIp: '10.0.0.1' }); }
			shouldThrow.must.throw(/appName/);
		});

		it('can be constructed', function()
		{
			var opts =
			{
				stationIp: '10.0.0.1',
				appName:   'test-client'
			};
			var client = new Chuey(opts);

			client.must.be.instanceof(Chuey);
			client.must.have.property('key');
			client.key.must.be.a.string();
			client.must.have.property('appname');
			client.appname.must.be.a.string();
		});
	});

	describe('makeURI', function()
	{
		var opts =
		{
			stationIp: '10.0.0.1',
			appName:   'test-client'
		};
		var client = new Chuey(opts);

		it('returns a string that starts with http://', function()
		{
			var result = client.makeURI();
			result.must.match(/^http:\/\//);
			result.must.match(/\/api\//);
		});

		it('can accept a single argument', function()
		{
			var result = client.makeURI('single');
			result.must.match(/\/single$/);
		});

		it('can accept an array of path components', function()
		{
			var result = client.makeURI(['one', 'two', 'three']);
			result.must.match(/\/one\/two\/three$/);
		});

	});

	describe('lights', function()
	{
		it('invokes callbacks when provided');
		it('returns a promise');
		it('returns a list of lights');
	});

	describe('light', function()
	{
		it('throws if you fail to pass a `light`');
		it('invokes callbacks when provided');
		it('returns a promise');
		it('responds with light details');
	});

	describe('rename', function()
	{
		var opts =
		{
			stationIp: '10.0.0.1',
			appName:   'test-client'
		};
		var client = new Chuey(opts);
		// mock client.execute

		it('throws if you fail to pass a `light`', function()
		{
			function shouldThrow() { client.rename(); }
			shouldThrow.must.throw(/light/);
		});

		it('throws if you fail to pass a `name`', function()
		{
			function shouldThrow() { client.rename(1); }
			shouldThrow.must.throw(/name/);
		});

		it('invokes callbacks when provided');

		it('returns a promise', function()
		{
			var p = client.rename(1, 'fred');
			p.must.have.property('then');
			p.then.must.be.a.function();
		});

		it('renames a light');
	});

	describe('state', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('on', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('off', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('rgb', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('register', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('unregister', function()
	{
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});



});
