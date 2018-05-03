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

    const inputHandler = require('../../../src/services/input/inputHandler')(lineParser, storeInputData);

    const directory = '/Users/felyciagunawan/dev/fyp/workspace/pulseHKUST/back/tests/services/input/';
    const filename = 'filter_user_detail_20171113_1620';

    const filePath = directory + filename;
    const createFile = () => {
        const data = '000af58da724, 10.89.82.199, t602all07g, eduroam,\n' +
            '000af5bfb060, 10.89.168.145, t700norbri01, eduroam,';
        // Create input file with content
        fs.writeFileSync(filePath, data);

    };

    createFile();
    inputHandler(directory, filename);

    it('should parse input line by line', function() {
        lineParser.calledTwice.should.equal(true);
    });

    it('should add the correct timestamp', function() {
        // Javascript date represents months as [0-11]
        const expectedTimestamp = moment([2017, 10, 13, 16, 20]);
        const argsTimestamp = (((storeInputData.args[0])[0])[0]).Timestamp;
        expectedTimestamp.isSame(argsTimestamp).should.equal(true);
    });

    it('should delete the input file', function() {
        const fileExists = fs.existsSync(filePath);
        fileExists.should.equal(false);
    });

    it('should retain input file on processing failure', function() {
        createFile();
        storeInputData.returns(Promise.reject(new Error("test")));
        inputHandler(directory, filename);
        const fileExists = fs.existsSync(filePath);
        fileExists.should.equal(true);

        // Clean up
        fs.unlink(filePath);
    })


});