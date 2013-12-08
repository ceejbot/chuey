/*global describe:true, it:true, before:true, after:true */

var
	demand = require('must'),
	rgb2hsv = require('../lib/rgb').rgb2hsv
	;

describe('rgb converter', function()
{
	it('exports a function', function()
	{
		rgb2hsv.must.be.a.function();
	});

	it('requires numeric arguments', function()
	{
		function shouldThrow() { return rgb2hsv(1, 'green', 2); }
		shouldThrow.must.throw(/number/);
	});

	it('returns an object with hue, saturation, value fields', function()
	{
		var result = rgb2hsv(0, 0, 0);
		result.must.be.an.object();
		result.must.have.property('hue');
		result.hue.must.be.a.number();
		result.must.have.property('saturation');
		result.saturation.must.be.a.number();
		result.must.have.property('value');
		result.value.must.be.a.number();
	});

	it('converts black', function()
	{
		var result = rgb2hsv(0, 0, 0);
		result.hue.must.equal(0);
		result.saturation.must.equal(0);
		result.value.must.equal(0);
	});

	it('converts white', function()
	{
		var result = rgb2hsv(255, 255, 255);
		result.hue.must.equal(0);
		result.saturation.must.equal(0);
		result.value.must.equal(100);
	});

	it('converts gray', function()
	{
		var result = rgb2hsv(127, 127, 127);
		result.hue.must.equal(0);
		result.saturation.must.equal(0);
		result.value.must.equal(50);
	});

	it('converts red', function()
	{
		var result = rgb2hsv(255, 0, 0);
		result.hue.must.equal(0);
		result.saturation.must.equal(100);
		result.value.must.equal(100);
	});

	it('converts dark red', function()
	{
		var result = rgb2hsv(128, 0, 0);
		result.hue.must.equal(0);
		result.saturation.must.equal(100);
		result.value.must.equal(50);
	});

	it('converts green', function()
	{
		var result = rgb2hsv(0, 255, 0);
		result.hue.must.equal(120);
		result.saturation.must.equal(100);
		result.value.must.equal(100);
	});

	it('converts blue', function()
	{
		var result = rgb2hsv(0, 0, 255);
		result.hue.must.equal(240);
		result.saturation.must.equal(100);
		result.value.must.equal(100);
	});

	it('converts a random green', function()
	{
		var result = rgb2hsv(144, 169, 89);
		result.hue.must.equal(79);
		result.saturation.must.equal(47);
		result.value.must.equal(66);
	});
});
