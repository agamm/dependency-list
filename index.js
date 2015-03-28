var stats	 = require('npm-stats')();
var map		 = require('map-async');

module.exports = getDependencies;

function getDependencies(packagesObject, done) {
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

			stats.module(packageName).version(packageVersion, function(err, pkg) {
				if (err) { return next(err); }

				if(results.hasOwnProperty(pkg.name)
					&& results[pkg.name].length > 0){

					if(results[pkg.name].indexOf(pkg.version) === -1){
						results[pkg.name].push(pkg.version);
					}
				} else {
					results[pkg.name] = [pkg.version];
				}

				var dependencies = {};
				if(pkg.hasOwnProperty('dependencies') 
					&& keys(pkg.dependencies).length !== 0) {
					dependencies = pkg.dependencies;
				}

				next(null, dependencies);
			});
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
