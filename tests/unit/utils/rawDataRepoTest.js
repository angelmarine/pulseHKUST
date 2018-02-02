var chai = require('chai');
var expect = chai.expect;

describe('save',function(){
    it('should return a promise',function(){
        const rawDataRepo = require('../../../src/database/utils/rawDataRepo');
        const expected = {
            IP_address: '10.89.82.199',
            MAC_id: '000af58da724',
            AP_id: 't602all07g',
            AP_group: null
        };
        var expectPromise = rawDataRepo.save(expected);
        expect(expectPromise.then).to.be.a('function');
        expect(expectPromise.resolve()).to.be.a('object');
    });

});
