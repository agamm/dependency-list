var stats	 = require('npm-stats')();
var map		 = require('map-async');

module.exports = getDependencies;

function getDependencies(packagesObject, done, options) {
	var results = {};

	if(!packagesObject instanceof Object ||
			packagesObject instanceof Array) {
		throw new Error('Packages are not an Object');
	}

	grab(packagesObject, function ready(err) {
		done(err, !err && results);
	});

	function grab(packages, ready) {
		map(packages, function iterator(packageVersion, packageName, next) {
			name = packageName;
			version = packageVersion;

			// Append version
			if(results.hasOwnProperty(name)
				&& results[name].length > 0){

				if(results[name].indexOf(version) === -1){
					results[name].push(version);
				} else {
					next(null);
				}
			} else {
				results[name] = [version];
			}

			stats.module(name).version(version, function(err, pkg) {
				if (err) { return next(err); }

				var dependencies = {};
				if(pkg.hasOwnProperty('dependencies') 
					&& keys(pkg.dependencies).length !== 0) {
					dependencies = pkg.dependencies;
				}

				// Fix latest version
				results[pkg.name].forEach(function(ver, i) {
					if(ver === "x" || ver === "*") {
						results[pkg.name][i] = pkg.version;
					}
				})

				next(null, dependencies);
			})
		}, function finish(err, deps) {
			if (err) {
				return ready(err);
			}
			deps = flattenObject(deps);

			return keys(deps).length
				? grab(deps, ready)
				: ready(false);
		});
	}

	function keys(obj) {
		return Object.keys(obj);
	}

	function extend(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	}

	function flattenObject(obj) {
		var n = {};
		keys(obj).forEach(function(key) {
			extend(n, obj[key]);
		});

		return n;
	}
}
