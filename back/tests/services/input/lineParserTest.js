const should = require('chai').should();
const inputParser = require('../../../src/services/input/lineParser');


describe('line parser', function() {
    it('should parse the input line', function() {
        const line = "000af58da724, 10.89.82.199, t252pg2024, eduroam,";
        const expected = {
            'MAC_id': '000af58da724',
            'AP_id': 't252pg2024',
            'AP_group': 'hall'
        };
        const actual = inputParser(line);
        actual.should.deep.equal(expected);
    });

    it('should return null on missing field', function() {
        const line = "000af58da724, 10.89.82.199, eduroam,";
        const actual = inputParser(line);
        should.equal(actual, null);
    });

    it('should return null on empty line', function() {
        const line = "";
        const actual = inputParser(line);
        should.equal(actual, null);
    });

    it('should return null when AP group is assigned to null', function() {
        const line = "000af58da724, 10.89.82.199, t252all2024, eduroam,";
        const actual = inputParser(line);
        should.equal(actual, null);
    });
});