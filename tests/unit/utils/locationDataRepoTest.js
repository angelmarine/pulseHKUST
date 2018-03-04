const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

describe('update',function(){

    const locationDataRepo = require('../../../src/database/utils/locationDataRepo.js');
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
});
