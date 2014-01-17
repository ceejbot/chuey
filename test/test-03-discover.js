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

	it('terminates its search if there are no bridges', function(done)
	{
		// Not sure how to mock this yet.
		this.timeout(10000);

		discover(function(result)
		{
			done();
		});
	});
});
