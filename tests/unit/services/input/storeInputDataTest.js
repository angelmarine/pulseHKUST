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
        update: sinon.stub().returns(Promise.resolve())
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
    const expectedDate = moment([2017, 10, 13, 0, 0]);
    const expectedHour = 16;
    const expectedMinute = 20;
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
        const expected = [
            ['t524ctlg701', 'ctlg7', expectedDate, expectedHour, expectedMinute, 2],
            ['ctlg7', 'ctlg7', expectedDate, expectedHour, expectedMinute, 2],
            ['t602ug9g2', 'ug9', expectedDate, expectedHour, expectedMinute, 1],
            ['ug9', 'ug9', expectedDate, expectedHour, expectedMinute, 1]
        ];

        locationDataRepo.update.callCount.should.equal(expected.length);

        const callArgs = locationDataRepo.update.args;
        const deepAssertion = (actual, expected) => {
          actual[0].should.equal(expected[0]);
          actual[1].should.equal(expected[1]);
          actual[2].isSame(expected[2]).should.equal(true);
          actual[3].should.equal(expected[3]);
          actual[4].should.equal(expected[4]);
          actual[5].should.equal(expected[5]);
        };
        for (let i in R.range(0, expected.length)) {
            deepAssertion(callArgs[i], expected[i]);
        }
    });


});