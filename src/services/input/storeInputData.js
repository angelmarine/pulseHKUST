/**
 * Created by felyciagunawan on 29/11/2017.
 */

const R = require('ramda');
const moment = require('moment');
const apGroupHandler = require('./apGroupHandler');

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

            /*
             Bundle locations with multiple AP groups (library and student halls) together.
             */
            const bundleGroups = () => {
                const bundleList = apGroupHandler.getBundlelist();
                const getCount = (list) => {
                  const countList = R.map(id => R.isNil(countByLocation[id]) ? 0 : countByLocation[id]['count'], list);
                  return R.sum(countList);
                };
                const bundleGroupCount = R.map(getCount, bundleList);
                const addCount = (val, key, obj) => {
                    countByLocation[key] = {'id': key, 'group': key, 'count': val};
                };
                R.mapObjIndexed(addCount, bundleGroupCount);
            };

            // Iterate through list to get the total count for each location, stored in countByLocation
            R.map(countRecord, list);
            bundleGroups();

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
