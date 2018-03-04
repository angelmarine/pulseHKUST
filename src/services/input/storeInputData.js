/**
 * Created by felyciagunawan on 29/11/2017.
 */

const R = require('ramda');
const moment = require('moment');

const make = (rawDataRepo = require('../../database/utils/rawDataRepo'),
              locationDataRepo = require('../../database/utils/locationDataRepo')) => {
    const storeRawData = data => {
        return Promise.all(R.map(record => rawDataRepo.save(record), data))
    };

    const storeLocationData = (data, timestamp) => {
        const getCountByLocationPairs = list => {
            const countByLocation = {};

            const countRecord = rec => {
                countByLocation[rec.AP_id] = countByLocation[rec.AP_id] || {'group': rec.AP_group, 'count': 0};
                countByLocation[rec.AP_id]['count'] = countByLocation[rec.AP_id]['count'] + 1;

                countByLocation[rec.AP_group] = countByLocation[rec.AP_group] || {'group': rec.AP_group, 'count': 0};
                countByLocation[rec.AP_group]['count'] = countByLocation[rec.AP_group]['count'] + 1;
            };

            R.map(countRecord, list);
            return R.toPairs(countByLocation);
        };

        const storeCountByLocation = countByLocPairs => {
            const date = timestamp.clone().startOf('day');
            const hour = timestamp.hour();
            const minute = timestamp.minute();

            const storeRecord = pair => {
                return locationDataRepo.update(pair[0], pair[1].group, date, hour, minute, pair[1].count);
            };
            return Promise.all(R.map(storeRecord, countByLocPairs))
        };

        const getCountAndStore = R.pipe(getCountByLocationPairs, storeCountByLocation);
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
