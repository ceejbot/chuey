// Convenience for making async funcs return promises or fire callbacks
// as the caller expected. Return this at the bottom of an async func.

var nodeify = module.exports = function nodeify(promise, callback)
{
	if (typeof callback !== 'function')
		return promise;

	promise
	.then(function(value)
	{
		callback(null, value);
	}, callback)
	.done();
};
