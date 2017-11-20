/**
 * Created by felyciagunawan on 20/11/2017.
 */
const assert = require('assert');
const example = require('../../src/services/example')();

describe('example', function() {
    it('should return string "Hello world"', function() {
        example.should.equal("Hello world");
    });
});