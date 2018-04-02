/**
 * Created by felyciagunawan on 29/11/2017.
 */

const should = require('chai').should();
const sinon = require('sinon');
const R = require('ramda');
const moment = require('moment');

describe('storeInputData', function() {
    const rawDataRepo = {
      save: sinon.stub().returns(Promise.resolve())
    };

    const locationDataRepo = {
        updateMany: sinon.stub().returns(Promise.resolve())
    };

    const storeInputData = require('../../../../src/services/input/storeInputData')(rawDataRepo, locationDataRepo);

    const createInputObj = (MAC_id, AP_id, AP_group, Timestamp) => {
        return {
            MAC_id,
            AP_id,
            AP_group,
            Timestamp
        };
    };

    const testDate = moment([2017, 10, 13, 16, 20]);
    // const testDate = new Date('2017-12-13T08:20:00.000Z');
    const expectedDate = moment([2017, 10, 13, 16, 20]);
    // Prepare data
    let data = [];
    data.push(createInputObj('000af58da724', 't524ctlg701', 'ctlg7', testDate));
    data.push(createInputObj('000af5bfb060', 't524ctlg701', 'ctlg7', testDate));
    data.push(createInputObj('000af5bfb062', 't602ug9g2', 'ug9', testDate));

    storeInputData(data);

    it('should store complete records into rawDataRepo one by one', function() {
        rawDataRepo.save.callCount.should.equal(data.length);

        const callArgs = R.flatten(rawDataRepo.save.args);
        callArgs.should.deep.equal(data);
    });

    it('should store aggregated count by apId and by apGroup into locationDataRepo', function() {
        const expectedData = [
            {id: 't524ctlg701', group: 'ctlg7', count: 2},
            {id: 'ctlg7', group: 'ctlg7', count: 2},
            {id: 't602ug9g2', group: 'ug9', count: 1},
            {id: 'ug9', group: 'ug9', count: 1},
        ];

        locationDataRepo.updateMany.callCount.should.equal(1);

        const callArgs = locationDataRepo.updateMany.args;
        callArgs[0][0].should.deep.equal(expectedData);
        callArgs[0][1].isSame(expectedDate).should.equal(true);
    });


});