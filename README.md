# dependency-list 

[![Build Status](https://travis-ci.org/funerr/dependency-list.svg)](https://travis-ci.org/funerr/dependency-list)

Given a list of packages, recursively retrieve their dependencies and generate a flat list of each dependency and its corresponding version.

## Usage
`npm install --save dependency-list`

## Example

```
var getDependencies = require('dependency-list');

getDependencies({'express': 'x', 'bluebird': '2.9.2'}, function(err, results) {
    if(err) { throw err; }
    console.log(results);
});
```

This function takes an object of `packages` by name, upon completion it will supply an object formatted like so:

``` 
{ 
  bluebird: [ '2.9.2' ],
  express: [ '5.0.0-alpha.1' ],
  depd: [ '1.0.0' ],
  'content-disposition': [ '0.5.0' ],
  'cookie-signature': [ '1.0.5' ],
  accepts: [ '1.1.4' ],
  debug: [ '2.1.3' ],
  'escape-html': [ '1.0.1' ],
  etag: [ '1.5.1' ],
  finalhandler: [ '0.3.2' ],
  fresh: [ '0.2.4' ],
  'media-typer': [ '0.3.0' ],
  methods: [ '1.1.0' ],
  'on-finished': [ '2.1.1' ],
  parseurl: [ '1.3.0' ],
  'path-to-regexp': [ '0.1.3' ],
  'proxy-addr': [ '1.0.7' ],
  qs: [ '2.3.2' ],
  'range-parser': [ '1.0.2' ],
  send: [ '0.10.1' ],
  'serve-static': [ '1.7.2' ],
  vary: [ '1.0.0' ],
  'type-is': [ '1.5.7' ],
  cookie: [ '0.1.2' ],
  'merge-descriptors': [ '0.0.2' ],
  'utils-merge': [ '1.0.0' ],
  'mime-types': [ '2.0.10' ],
  crc: [ '3.2.1' ],
  ms: [ '0.6.2', '0.7.0' ],
  negotiator: [ '0.4.9' ],
  forwarded: [ '0.1.0' ],
  'ee-first': [ '1.1.0' ],
  'ipaddr.js': [ '0.1.9' ],
  destroy: [ '1.0.3' ],
  mime: [ '1.2.11' ],
  'mime-db': [ '1.8.0' ] 
}
```

## Todo
* Accept array as input (?)
* Add options (exclude, include devDependencies)

## License

WTFPL. See [LICENSE.md](https://github.com/funerr/dependency-list/blob/master/LICENSE.md) for details.


## Origin
This package is based of the awesome: `npm-flat-graph` package, go check it out:  
https://www.npmjs.com/package/npm-flat-graph
