'use strict';

var testExample = require('./testingExample.controller.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Testing example', function () {
  var test;

  beforeEach(function() {
    test = 123;
  });
  
  it('should have a value of test that evaluates to "123"', function () {
    (test).should.equal(123);
  });

  it('should be a function', function () {
    (typeof testExample.testFunction).should.equal('function');
  });

  it('should return a value', function () {
    (testExample.testFunction(test)).should.equal(123);
  });

});
