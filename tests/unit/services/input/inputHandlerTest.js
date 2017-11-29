/**
 * Created by felyciagunawan on 20/11/2017.
 */
const fs = require('fs');
const should = require('chai').should();
const sinon = require('sinon');

describe('inputHandler', function() {
    const lineParserResponse = {
        MAC_id: "000af58da724",
        IP_address: "10.89.82.199",
        AP_id: "t602all07g",
        AP_group: null
    };

    const lineParser = sinon.stub();
    const storeInputData = sinon.stub();

    const inputHandler = require('../../../../src/services/input/inputHandler')(lineParser, storeInputData);

    const directory = '/Users/felyciagunawan/dev/fyp/workspace/pulseHKUST/tests/unit/services/input/';
    const filename = 'filter_user_detail_20171113_1620';

    it('should throw error if file not found', function() {
        const missingFilename = 'filter_user_detail_20171213_1620';

        const result = () => inputHandler(directory, missingFilename);
        result.should.throw("File not found");
    });

    it('should throw error on invalid filename', function() {
        // Require creating a temporary file with invalid filename
        const invalidFilename = 'filter_user_detail_2017113_1620';
        const invalidFilePath = directory + invalidFilename;
        fs.writeFileSync(invalidFilePath, "");

        const result = () => inputHandler(directory, invalidFilename);
        result.should.throw("Invalid filename");

        fs.unlink(invalidFilePath);
    });

    it('should parse input line by line and add the correct timestamp', function() {
        const expectedTimestamp = new Date(2017, 11, 13, 16, 20);

        // Program the response of external dependencies
        lineParser.returns(lineParserResponse);
        storeInputData.returns(Promise.resolve());

        inputHandler(directory, filename);
        lineParser.calledTwice.should.equal(true);

        const argsTimestamp = (((storeInputData.args[0])[0])[0]).Timestamp.getTime();
        argsTimestamp.should.equal(expectedTimestamp.getTime());
    });

});