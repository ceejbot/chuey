/*global describe:true, it:true, before:true, after:true */

var
	demand = require('must'),
	Chuey  = require('../lib/chuey')
	;

describe('Chuey', function()
{
	describe('constructor', function()
	{
		it('throws if you fail to pass `options`');
		it('throws if you fail to pass `options.stationIp`');
		it('throws if you fail to pass `options.appName`');

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
		it('has tests.');
		it('invokes callbacks when provided');
		it('returns a promise');
	});

	describe('light', function()
	{
		it('throws if you fail to pass a `light`');
		it('invokes callbacks when provided');
		it('returns a promise');
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

		it('invokes callbacks when provided', function()
		{

		});

		it('returns a promise', function()
		{
			// var p =
		});
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
