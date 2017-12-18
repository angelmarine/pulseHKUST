const should = require('chai').should();
const sinon = require('sinon');

describe('save',function(){
    const rawDataRepo = require('../../../../src/database/utils/rawDataRepo');
    const expected = {
        IP_address: '10.89.82.199',
        MAC_id: '000af58da724',
        AP_id: 't602all07g',
        AP_group: null
    };
    expect(rawDataRepo.save(expected)).to.be.an.instanceOf(Promise);
});
