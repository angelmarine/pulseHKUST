var chai = require('chai');
var expect = chai.expect;

describe('update',function(){
    it('should return a promise',function(){
        const userDataRepo = require('../../../src/database/utils/userDataRepo');
        const macId = '000af58da724';
        const timestamp = new Date(2017, 12, 17, 20, 00);
        const apGroup = 'Zone K';
        var expectPromise = userDataRepo.update(macId, timestamp, apGroup);
        expect(expectPromise.then).to.be.a('function');
        expect(expectPromise.resolve()).to.be.a('object');
    });

});
