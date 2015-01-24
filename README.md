# dependency-list [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Given a list of packages, recursively retrieve their dependencies and generate a flat list of each package's version's

## Usage ##
`npm install dependency-list`

### `getDependencies(packages, callback)`

```
var getDependencies = require('dependency-list');

// Show me the (latest => x) express dependencies
getDependencies({'express': 'x'}, function(err, results) {
    console.log(results);
    console.log(Object.keys(results).length)
});
```

This function takes an array of `packages` by name, calling `callback(err, results)`
when complete, supplying you with an index formatted like so:

``` 
{
    "express": ["5.0.0-alpha.1"],
    "accepts": ["~1.1.2"],
    "content-disposition": ["0.5.0"],
    "cookie-signature": ["1.0.5"],
    "debug": ["~2.1.0"],
    "depd": ["~1.0.0"],
    "escape-html": ["1.0.1"],
    "etag": ["~1.5.0"],
    "finalhandler": ["0.3.2"],
    "fresh": ["0.2.4"],
    "media-typer": ["0.3.0"],
    "methods": ["1.1.0"],
    "on-finished": ["~2.1.1"],
    "parseurl": ["~1.3.0"],
    "path-to-regexp": ["0.1.3"],
    "proxy-addr": ["~1.0.3"],
    "qs": ["2.3.2"],
    "range-parser": ["~1.0.2"],
    "send": ["0.10.1"],
    "serve-static": ["~1.7.1"],
    "type-is": ["~1.5.2"],
    "vary": ["~1.0.0"],
    "cookie": ["0.1.2"],
    "merge-descriptors": ["0.0.2"],
    "utils-merge": ["1.0.0"],
    "mime-types": ["~2.0.4", "~2.0.7"],
    "negotiator": ["0.4.9"],
    "ms": ["0.6.2"],
    "crc": ["3.2.1"],
    "ee-first": ["1.1.0"],
    "forwarded": ["~0.1.0"],
    "ipaddr.js": ["0.1.6"],
    "destroy": ["1.0.3"],
    "mime": ["1.2.11"],
    "mime-db": ["~1.5.0"]
}
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/npm-flat-graph/blob/master/LICENSE.md) for details.


## Origin ##
This package is based from the awesome: `npm-flat-graph` package, go check it out:  
https://www.npmjs.com/package/npm-flat-graph
