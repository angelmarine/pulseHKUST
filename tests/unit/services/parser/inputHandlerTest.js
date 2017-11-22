/**
 * Created by felyciagunawan on 20/11/2017.
 */
const should = require('chai').should();
const sinon = require('sinon');

describe('inputHandler', function() {
    const directory = '/Users/felyciagunawan/dev/fyp/workspace/pulseHKUST/tests/unit/services/parser/';
    const fileName = 'filter_user_detail_20171113_1620';

    const lineParser = sinon.stub();
    const rawDataRepo = sinon.stub();
    const userDataRepo = sinon.stub();
    const locationDataRepo = sinon.stub();
    const inputHandler = require('../../../../src/services/parser/inputHandler')(lineParser,
        rawDataRepo, userDataRepo, locationDataRepo);

    it('should throw error on invalid filename', function() {
        const invalidFileName = 'filter_user_detail_2017113_1620';
        const result = () => inputHandler(directory, invalidFileName);
        result.should.throw("Invalid filename");
    });

    it('should parse input line by line', function() {

    });

    it('should store raw data to db', function() {

    });

    it('should read aggregated per location data from db', function() {
    });

    it('should store aggregated per location data to db', function() {
    });

    it('should read aggregated per user data from db', function() {
    });

    it('should store aggregated per user data to db', function() {
    });
});