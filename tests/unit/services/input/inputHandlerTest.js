/**
 * Created by felyciagunawan on 20/11/2017.
 */
const fs = require('fs');
const should = require('chai').should();
const sinon = require('sinon');
const moment = require('moment');

describe('inputHandler', function() {
    const lineParserResponse = {
        MAC_id: "000af58da724",
        IP_address: "10.89.82.199",
        AP_id: "t602all07g",
        AP_group: null
    };

    const lineParser = sinon.stub();
    const storeInputData = sinon.stub();

    // Program the response of external dependencies
    lineParser.returns(lineParserResponse);
    storeInputData.returns(Promise.resolve());

    const inputHandler = require('../../../../src/services/input/inputHandler')(lineParser, storeInputData);

    const directory = '/Users/felyciagunawan/dev/fyp/workspace/pulseHKUST/tests/unit/services/input/';
    const filename = 'filter_user_detail_20171113_1620';

    const filePath = directory + filename;
    const data = '000af58da724, 10.89.82.199, t602all07g, eduroam,\n' +
        '000af5bfb060, 10.89.168.145, t700norbri01, eduroam,';
    // Create input file with content
    fs.writeFileSync(filePath, data);

    inputHandler(directory, filename);

    it('should parse input line by line', function() {
        lineParser.calledTwice.should.equal(true);
    });

    it('should add the correct timestamp', function() {
        // Javascript date represents months as [0-11]
        const expectedTimestamp = new Date(2017, 10, 13, 16, 20);
        const argsTimestamp = (((storeInputData.args[0])[0])[0]).Timestamp.getTime();
        argsTimestamp.should.equal(expectedTimestamp.getTime());
    });

    it('should delete the input file', function() {
        const fileExists = fs.existsSync(filePath);
        fileExists.should.equal(false);
    });


    //TODO: function moved to router
    // it('should throw error on invalid filename', function() {
    //     // Require creating a temporary file with invalid filename
    //     const invalidFilename = 'filter_user_detail_2017113_1620';
    //     const invalidFilePath = directory + invalidFilename;
    //     fs.writeFileSync(invalidFilePath, "");
    //
    //     const result = () => inputHandler(directory, invalidFilename);
    //     result.should.throw("Invalid filename");
    //
    //     fs.unlink(invalidFilePath);
    // });

});