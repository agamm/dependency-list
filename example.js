var getDependencies = require('./index.js');

// Show me the (latest => x) express dependencies
getDependencies({'express': 'x'}, function(err, results) {
	console.log(results);
	console.log(Object.keys(results).length)
});