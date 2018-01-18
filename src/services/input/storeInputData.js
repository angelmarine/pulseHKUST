/**
 * Created by felyciagunawan on 29/11/2017.
 */

const R = require('ramda');

const make = (rawDataRepo = require('../../database/utils/rawDataRepo'),
              locationDataRepo = require('../../database/utils/locationDataRepo'),
              userDataRepo = require('../../database/utils/userDataRepo')) => {
    const storeRawData = data => {
        return Promise.all(R.map(record => rawDataRepo.save(record), data))
    };

    const storeLocationData = (data, timestamp) => {
        const getLocation = record => {
            return record.AP_id;
        };

        const countByLocation = R.map(R.length, R.groupBy(getLocation, data));
        // groupBy returns an object, thus need to convert to list for promise all
        // Format of list: [[apId1, count1], [apId2, count2],...]
        const countByLocationList = R.toPairs(countByLocation);

        const getArgsAndStore = sublist => {
            return locationDataRepo.update(sublist[0], timestamp, sublist[1]);
        };

        return Promise.all(R.map(getArgsAndStore, countByLocationList))
    };

    const storeUserData = (data, timestamp) => {
        const getArgsAndStore = record => userDataRepo.update(record.MAC_id, timestamp, record.AP_id);
        return Promise.all(R.map(getArgsAndStore, data))
    };

    const storeInputData = (data) => {
        if(R.isEmpty(data))
            return Promise.resolve();
        const timestamp = data[0].Timestamp;

        return Promise.all([storeRawData(data), storeLocationData(data, timestamp), storeUserData(data, timestamp)])
    };

    return storeInputData;
};

module.exports = make;
