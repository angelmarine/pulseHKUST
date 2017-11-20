/**
 * Created by felyciagunawan on 20/11/2017.
 */
const should = require('chai').should();
const example = require('../../src/services/example');

describe('example', function() {
    it('should return string "Hello world"', function() {
        example.should.equal("Hello world");
    });
});