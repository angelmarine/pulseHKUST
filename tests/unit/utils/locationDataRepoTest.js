const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;
const moment = require('moment');
const sinon = require('sinon');

describe('update',function(){
    const findOneResponse = {
        "Count_timestamp" : [
            {
                "Day" : new Date("2018-02-28T16:00:00Z")
            },
            {
                "Day" : new Date("2018-03-01T16:00:00Z")
            },
            {
                "Day" : new Date("2018-03-02T16:00:00Z")
            },
            {
                "Day" : new Date("2018-03-03T16:00:00Z")
            },
            {
                "Day" : new Date("2018-03-04T16:00:00Z")
            },
            {
                "Day" : new Date("2018-03-05T16:00:00Z")
            }
        ]
    };

    const locationDataModel = {
        findOne: sinon.stub().returns ({
            exec: sinon.stub().returns(Promise.resolve(findOneResponse))
        }),
        findOneAndUpdate: sinon.stub().returns({
            exec: sinon.stub().returns(Promise.resolve())
        }),
        update: sinon.stub().returns({
            exec: sinon.stub().returns(Promise.resolve())
        }),
        updateMany: sinon.stub().returns({
            exec: sinon.stub().returns(Promise.resolve())
        })
    };

    const locationDataRepo = require('../../../src/database/utils/locationDataRepo.js')(locationDataModel);
    const apId = 't142A01024-1';
    const day = new Date(2017, 12, 17);
    const hour = 20;
    const minute = 50;
    const count = 1000;
    const invalidHour = "Two";
    const invalidDayString = 'Day';
    const invalidDayInt = 20171217;

    it('should return resolved promise when valid input',function(){
        //test if promise is returned
        const expectResolve = locationDataRepo.update(apId, day, hour, minute, count);
        return assert.isFulfilled(expectResolve);
    });

   it('should return rejected promise when invalid day with string input',function(){
        //test if promise is returned
        const expectReject = locationDataRepo.update(apId, day, invalidHour, minute, count);
        return assert.isRejected(expectReject);
        //expect(expectPromise.then).to.be.a('function');
        //expect(expectPromise.resolve()).to.be.a('object');
    });

   it('should', function() {
       const expectedData = [
           {id: 't524ctlg701', group: 'ctlg7', count: 2},
           {id: 'ctlg7', group: 'ctlg7', count: 2},
           {id: 't602ug9g2', group: 'ug9', count: 1},
           {id: 'ug9', group: 'ug9', count: 1},
       ];
       const expectedDate = moment([2018, 2, 7, 16, 20]);
       locationDataRepo.updateMany(expectedData, expectedDate);
   });
});
