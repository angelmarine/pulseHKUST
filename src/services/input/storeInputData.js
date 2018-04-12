const logger = require('../../utils/logger');

const R = require('ramda');
const moment = require('moment');
const apGroupHandler = require('./apGroupHandler');
const userLocationCache = require('../../database/utils/userLocationCache');
const movementDataRepo = require('../../database/utils/movementDataRepo');
const dwellTimeDataRepo = require('../../database/utils/dwellTimeDataRepo');

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

    const storeMovementData = (data, timestamp) => {
        return userLocationCache.updateMany(data, timestamp)
            .then(() => userLocationCache.extractMovement())
            .then(res => {
                if(res.length){
                    // Convert movement/adjacency list to 2-element list
                    const normAdjList = data => {
                        const getTwoTuplesData = datum => {
                            return datum['Movement'].length > 2 ?
                                R.assoc('Movement', R.takeLast(2, datum['Movement']), datum) : datum;
                        };
                        return R.map(getTwoTuplesData, data);
                    };
                    return movementDataRepo.insertMany(normAdjList(res));
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => userLocationCache.getOldData(timestamp))
            .then(res => {
                if(res.length){
                    const addDuration = obj => {
                        return R.assoc('Duration', moment(obj['End_ts']).diff(moment(obj['Start_ts']), 'minutes'), obj);
                    };
                    const dwellData = R.map(addDuration, res);
                    return dwellTimeDataRepo.insertMany(dwellData)
                        .then(() => userLocationCache.removeOldData(timestamp));

                } else {
                    return Promise.resolve();
                }
            })
    };

    const storeInputData = (data) => {
        if(R.isEmpty(data))
            return Promise.resolve();
        const timestamp = data[0].Timestamp;

        return Promise.all([storeRawData(data), storeLocationData(data, timestamp), storeMovementData(data, timestamp)]);
        // return Promise.all([storeMovementData(data, timestamp)]);
    };

    return storeInputData;
};

module.exports = make;
