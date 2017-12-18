const should = require('chai').should();
const sinon = require('sinon');

describe('update',function(){
    const locationDataRepo = require('../../../../src/database/utils/locationDataRepo');
    const apId = 't142A01024-1';
    const timestamp = new Date(2017, 12, 17, 20, 00);
    const apGroup = 'Zone K';
    expect(locationDataRepo.update(apId, timestamp, apGroup)).to.be.an.instanceOf(Promise);
});
