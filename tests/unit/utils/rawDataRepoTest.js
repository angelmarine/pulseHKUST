const chai = require('chai');
const expect = chai.expect;

describe('save',function(){
    it('should return a promise',function(){
        const rawDataRepo = require('../../../src/database/utils/rawDataRepo.js');
        const expected = {
            IP_address: '10.89.82.199',
            MAC_id: '000af58da724',
            AP_id: 't602all07g',
            AP_group: null
        };
        const expectPromise = rawDataRepo.save(expected);
        expect(expectPromise.then).to.be.a('function');
        expect(expectPromise.resolve()).to.be.a('object');
    });

});
