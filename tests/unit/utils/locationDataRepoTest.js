var chai = require('chai');
var expect = chai.expect;

describe('update',function(){

    const locationDataRepo = require('../../../src/database/utils/locationDataRepo');
    const apId = 't142A01024-1';
    const timestamp = new Date(2017, 12, 17, 20, 00);
    const invalidTimestamp = 'Time';
    const apGroup = 'Zone K';

    it('should return promise when valid input',function(){
        var expectPromise = locationDataRepo.update(apId, timestamp, apGroup);
        expect(expectPromise.then).to.be.a('function');
        expect(expectPromise.resolve()).to.be.a('object');
    });

    it('should return error when invalid input',function(){
        var expectPromise = locationDataRepo.update(apId, invalidTimestamp, apGroup);
        expect(expectPromise.then).to.be.a('function');
        expect(expectPromise.resolve()).to.be.a('object');
    });

});
