/**
 * Created by felyciagunawan on 20/11/2017.
 */
const should = require('chai').should();
const inputParser = require('../../../../src/services/parser/lineParser');

const line = "000af58da724, 10.89.82.199, t602all07g, eduroam,";

describe('inputParser', function() {
    it('should parse the input and extract date from filename', function() {
        const expected = {
            IP_address: '10.89.82.199',
            MAC_id: '000af58da724',
            AP_id: 't602all07g',
            AP_group: null
        };

        const actual = inputParser(line);
        actual.should.deep.equal(expected);
    });

});