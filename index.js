var Chuey = require('./lib/chuey');

exports.createClient = function(opts)
{
	return new Chuey(opts);
};

exports.Chuey = Chuey;
exports.discover = require('./lib/discover');
