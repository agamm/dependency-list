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

	it('should throw an error when package are not an object literal', function(){
		expect(function () {
		  getDependencies(['bluebird']);
		}).to.throw('Packages are not an Object');
	});

	it('should return an error when package does not exist', function(done){
		getDependencies({"nowaythisexists__":"*"}, function(err, results) {
			expect(err).to.not.be.empty();//(new Error('document not found'));
			expect(err.message).to.equal('document not found');
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

	it('should return an object with combined dependencies', function(done){
		this.timeout(5000);
		getDependencies({'bluebird': '2.9.4', 'wrappy': '1.0.1'}, function(err, results) {
			if(err) { throw err; }
			var expectedResult = { bluebird: [ '2.9.4' ], wrappy: ['1.0.1'] };

			expect(results).to.be.an('object');
			expect(results).to.not.be.empty();
			expect(results).to.deep.equal(expectedResult);
			done();
		});
	});

	it('should return an object with its dependencies', function(done){
		this.timeout(10000);
		getDependencies({'glob': '4.3.5'}, function(err, results) {
			if(err) { throw err; }
			var expectedResult = {
				"glob":["4.3.5"],
				"inflight":["1.0.4"],
				"inherits":["2.0.1"],
				"minimatch":["2.0.4"],
				"once":["1.3.1"],
				"wrappy":["1.0.1"],
				"brace-expansion":["1.1.0"],
				"balanced-match":["0.2.0"],
				"concat-map":["0.0.1"]
			};
			expect(results).to.be.an('object');
			expect(results).to.not.be.empty();
			expect(results).to.deep.equal(expectedResult);
			done();
		});
	});

	it('should append versios when more than one is returned', function(done){
		this.timeout(10000);
		getDependencies({'ms': '0.1.0','humanize-ms': '1.0.1'}, function(err, results) {

			if(err) { throw err; }
			var expectedResult = {
				"humanize-ms": [
					"1.0.1"
				],
				"ms":[
					"0.1.0",
					"0.6.2"
				]
			};
			expect(results).to.be.an('object');
			expect(results).to.not.be.empty();
			expect(results).to.deep.equal(expectedResult);
			done();
		});
	});
  });
});