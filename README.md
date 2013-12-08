chuey
=====

a client library for the Philips Hue API

My goal is to write a promise-and-callback up-to-date client that is API-compatible with [hue.js](https://github.com/thatguydan/hue.js). One exception: I return promises from async methods, not `this` for chaining. 

## TODO

Unit tests + integration tests.

Get rid of the dependency on `async`.

Make a PR to [hue-cli](https://github.com/bahamas10/hue-cli) switching over to this module.

## Credits

This library started life as [hue.js](https://github.com/thatguydan/hue.js) by [Daniel Friedman](https://github.com/thatguydan).

## LICENSE

MIT.
