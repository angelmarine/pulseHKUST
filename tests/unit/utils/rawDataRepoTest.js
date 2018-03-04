const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

describe('save',function(){
    it('should return a resolved promise', function(){
        const rawDataRepo = require('../../../src/database/utils/rawDataRepo.js');
        const rawDataArray = [{
            MAC_id: '000af58da724',
            AP_id: 't602all07g',
            AP_group: 'lg7'
        }, {
            IP_address: '20.8.82.208',
            MAC_id: '111af58da724',
            AP_id: 123,
            AP_group: 'lg7'
        }];

        const expectReject = rawDataRepo.save(rawDataArray);
        return assert.isRejected(expectReject);
    });

});
