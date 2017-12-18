const should = require('chai').should();
const sinon = require('sinon');

describe('update',function(){
    const userDataRepo = require('../../../../src/database/utils/userDataRepo');
    const macId = '000af58da724';
    const timestamp = new Date(2017, 12, 17, 20, 00);
    const apGroup = 'Zone K';
    expect(userDataRepo.update(macId, timestamp, apGroup)).to.be.an.instanceOf(Promise);
});
