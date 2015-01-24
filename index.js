var stats	 = require('npm-stats')();
var map		 = require('map-async');
var flatten = require('flatten');

module.exports = getDependencies;

function getDependencies(packagesObject, done) {
	var results = {};

	if(typeof packagesObject !== 'Object') {
		done(new Error('Packages are not an Object'));
		return;
	}

	packagesObject = objectStructureArray(packagesObject);

	grab(packagesObject, function(err) {
		done(err, !err && results);
	});

	function keys(obj) {
		return Object.keys(obj);
	}

	function objectStructureArray(obj) {
		if(keys(obj).length === 1) {
			return obj;
		}

		var newObj = [];
		 keys(obj).forEach(function(key) {
			var o = {};
			o[key] = obj[key];
			newObj.push(o);
		});
		 
		return newObj;
	}

	function inArraySubstring(heystack, needle) {
		return heystack.filter(function(hey) {
			if(hey.indexOf(needle) > -1) {
				return true;
			}
			return false;
		}).length > 0;
	}

	function grab(packages, ready) {
		console.log(packages);
		map(packages, function(packageVersion, packageName, next) {
			console.log(packageName, packageVersion);
			name = packageName;
			version = packageVersion;
			//console.log("MODULE:", name, version);

			// Append a version if one does not exist
			if(results.hasOwnProperty(name)){
				if(results[name].indexOf(version) === -1){
					results[name].push(version);
				} else {
					next();
				}
			} else {
				results[name] = [version];
			}

			stats.module(name).version(version, function(err, pkg) {
				if (err) return next(err)

				// Extract the dependencies of the package
				var dependencies = [];
				if(pkg.hasOwnProperty('dependencies') 
					&& keys(pkg.dependencies).length !== 0) {
					dependencies = pkg.dependencies;

					// Fix structure
					//console.log(pkg.name,": ",dependencies)
					dependencies = objectStructureArray(dependencies);
				}
				
				// Fix latest version
				results[pkg.name].forEach(function(ver, i) {
					if(ver === "x" || ver === '*') {
						results[pkg.name][i] = pkg.version;
					}
				});

				next(null, dependencies);
			})
		}, function lastly(err, deps) {

			if (err) {
				return ready(err);
			}

			deps = flatten(deps);
			deps = deps.filter(Boolean);

			return deps.length
				? grab(deps, ready)
				: ready();
		})
	}
}
