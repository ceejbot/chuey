var
	async   = require('async'),
	dgram   = require('dgram'),
	Request = require('request')
	;

var packet =
[
	'M-SEARCH * HTTP/1.1',
	'HOST:239.255.255.250:1900',
	'MAN:"ssdp:discover"',
	'ST:ssdp:all',
	'MX:1',
	''
].join('\r\n');

var huePattern = /Philips hue bridge/g;

var discover = module.exports = function discover(callback)
{
	var client = dgram.createSocket('udp4');
	var message = new Buffer(packet);

	if (client.bind.length)
	{
		client.bind();
		next();
	}
	else
		client.bind(next);

	function next()
	{
		createServer(client.address().port, callback);
		client.send(message, 0, message.length, 1900, '239.255.255.250', function()
		{
			client.close();
		});
	}
};

function createServer(port, callback)
{
	var server = dgram.createSocket('udp4');
	var candidates = [];

	server.on('message', function(msg, rinfo)
	{
		if (candidates.indexOf(rinfo.address) === -1)
			candidates.push(rinfo.address);
	});
	server.bind(port);

	setTimeout(function()
	{
		server.close();
		async.filter(candidates, checkServer, callback);
	}, 2000);
}

function checkServer(server, callback)
{
	// console.log('checking ' + server);
	Request(
	{
		uri: 'http://' + server + '/description.xml',
		timeout: 1000,
	}, function(err, response, body)
	{
		if (err || !body)
			return callback(false);
		callback(huePattern.test(body));
	});
}
