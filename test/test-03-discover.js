/*global describe:true, it:true, before:true, after:true */

var
	demand   = require('must')
	discover = require('../lib/discover')
	;

describe('discovery', function()
{
	it('exports a function', function()
	{
		discover.must.be.a.function();
	});


	it('successfully discovers existing bridges');
	it('terminates its search if there are no bridges');
});
