/**
 * Created by felyciagunawan on 29/11/2017.
 */

const R = require('ramda');
const moment = require('moment');

const make = (rawDataRepo = require('../../database/utils/rawDataRepo'),
              locationDataRepo = require('../../database/utils/locationDataRepo')()) => {
    const storeRawData = data => {
        return Promise.all([rawDataRepo.save(data)]);
        //return Promise.all(R.map(record => rawDataRepo.save(record), data));
    };

    const storeLocationData = (data, timestamp) => {
        const getCountByLocation = list => {
            const countByLocation = {};

            const countRecord = rec => {
                // Initialize the record for AP_id if not exist
                countByLocation[rec.AP_id] = countByLocation[rec.AP_id] || {'id': rec.AP_id,'group': rec.AP_group, 'count': 0};
                countByLocation[rec.AP_id]['count'] = countByLocation[rec.AP_id]['count'] + 1;

                // Calculate the count per AP group too, with key = AP_group
                countByLocation[rec.AP_group] = countByLocation[rec.AP_group] || {'id': rec.AP_group, 'group': rec.AP_group, 'count': 0};
                countByLocation[rec.AP_group]['count'] = countByLocation[rec.AP_group]['count'] + 1;
            };

            // Iterate through list to get the total count for each location, stored in countByLocation
            R.map(countRecord, list);

            // Returns an array of {id, group, count}
            return R.values(countByLocation);
        };

        const storeCountByLocation = list => {
            return locationDataRepo.updateMany(list, timestamp);
        };

        const getCountAndStore = R.pipe(getCountByLocation, storeCountByLocation);
        return getCountAndStore(data);
    };

    const storeInputData = (data) => {
        if(R.isEmpty(data))
            return Promise.resolve();
        const timestamp = data[0].Timestamp;

        return Promise.all([storeRawData(data), storeLocationData(data, timestamp)]);
    };

    return storeInputData;
};

module.exports = make;
