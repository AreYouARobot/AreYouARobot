'use strict';

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

// kick off test tests.
describe('Testing example', function () {
  var test;

  beforeEach(function() {
    test = 123;
  });
  
  it('should have a value of test that evaluates to "123"', function () {
    (test).should.equal(123);
  });

  it('should be a function', function () {
    (typeof testFunction).should.equal('function');
  });

  it('should return a value', function () {
    (testFunction(test)).should.equal(123);
  });

});
