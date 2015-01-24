var getDependencies = require('./index.js');

// Show me the (latest => x) express dependencies
getDependencies({'npm': '*', 'bluebird': 'x'}, function(err, results) {
	if(err) {
		console.error(err);
	} else {
		console.log(results);
		console.log(Object.keys(results).length);
	}
});