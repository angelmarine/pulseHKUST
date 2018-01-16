/**
 * Created by felyciagunawan on 29/11/2017.
 */


// [ { MAC_id: '000af58da724',
//     IP_address: '10.89.82.199',
//     AP_id: 't602all07g',
//     AP_group: null,
//     Timestamp: 2017-12-13T08:20:00.000Z },
// { MAC_id: '000af58da724',
//     IP_address: '10.89.82.199',
//     AP_id: 't602all07g',
//     AP_group: null,
//     Timestamp: 2017-12-13T08:20:00.000Z } ]

const should = require('chai').should();
const sinon = require('sinon');
const R = require('ramda');

describe('storeInputData', function() {
    const rawDataRepo = {
      save: sinon.stub().returns(Promise.resolve())
    };

    const locationDataRepo = {
        update: sinon.stub().returns(Promise.resolve())
    };

    const userDataRepo = {
        update: sinon.stub().returns(Promise.resolve())
    };

    const storeInputData = require('../../../../src/services/input/storeInputData')(rawDataRepo, locationDataRepo, userDataRepo);

    const createInputObj = (MAC_id, IP_address, AP_id, AP_group, Timestamp) => {
        return {
            MAC_id,
            IP_address,
            AP_id,
            AP_group,
            Timestamp
        };
    };

    const testDate = new Date('2017-12-13T08:20:00.000Z');
    // Prepare data
    let data = [];
    data.push(createInputObj('000af58da724', '10.89.82.199', 't602all07g', null, testDate));
    data.push(createInputObj('000af5bfb060', '10.89.168.145', 't602all07g', null, testDate));
    data.push(createInputObj('000af5bfb062', '10.89.168.146', 'xxxxxxxx', null, testDate));

    storeInputData(data);

    it('should store complete records into rawDataRepo one by one', function() {
        rawDataRepo.save.callCount.should.equal(data.length);

        const callArgs = R.flatten(rawDataRepo.save.args);
        callArgs.should.deep.equal(data);
    });

    it('should store aggregated count per location into locationDataRepo', function() {
        const expected = [
            ['t602all07g', testDate, 2],
            ['xxxxxxxx', testDate, 1]
        ];

        locationDataRepo.update.callCount.should.equal(2);

        const callArgs = locationDataRepo.update.args;
        callArgs.should.deep.equal(expected);
    });

    it('should store user location record into userDataRepo', function() {
        //TODO:check if multiple records of a user can appear in one input datafile
        const expected = [
            ['000af58da724', testDate, 't602all07g'],
            ['000af5bfb060', testDate, 't602all07g'],
            ['000af5bfb062', testDate, 'xxxxxxxx']
        ];

        userDataRepo.update.callCount.should.equal(data.length);

        const callArgs = userDataRepo.update.args;
        callArgs.should.deep.equal(expected);
    });

});