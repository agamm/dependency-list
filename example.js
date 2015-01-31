var getDependencies = require('./index.js');

getDependencies({'express': 'x', 'bluebird': '2.9.2'}, function(err, results) {
	if(err) { throw err; }
	console.log(results);
});