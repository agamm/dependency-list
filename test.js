var expect = require('chai').expect;
var getDependencies = require('./index.js');


describe('dependency-list', function(){

  describe('#getDependencies()', function(){
  	
	it('should return an empty object when input is empty', function(done){
		getDependencies({}, function(err, results) {
			if(err) { throw err; }
			expect(results).to.be.an('object');
			expect(results).to.be.empty();
			done();
		});
	});

	it('should return an object when input is not empty', function(done){
		getDependencies({'bluebird': '2.9.4'}, function(err, results) {
			if(err) { throw err; }
			var expectedResult = { bluebird: [ '2.9.4' ] };

			expect(results).to.be.an('object');
			expect(results).to.not.be.empty();
			expect(results).to.deep.equal(expectedResult);
			done();
		});
	});

	it('should return an object with dependencies', function(done){
		this.timeout(10000);
		getDependencies({'glob': '4.3.5'}, function(err, results) {
			if(err) { throw err; }
			var expectedResult = {
				"glob":["4.3.5"],
				"inflight":["^1.0.4"],
				"inherits":["2"],
				"minimatch":["^2.0.1"],
				"once":["^1.3.0"],
				"wrappy":["1"],
				"brace-expansion":["^1.0.0"],
				"balanced-match":["^0.2.0"],
				"concat-map":["0.0.1"]
			};
			expect(results).to.be.an('object');
			expect(results).to.not.be.empty();
			expect(results).to.deep.equal(expectedResult);
			done();
		});
	});

  });
});