const dwellTimeDataModel = require('../schema/dwellTimeData');
const R = require('ramda');

const insertMany = data => {
    const createUpdateReq = (datum) => {
        return {
            updateOne: {
                filter: {MAC_id: datum['MAC_id'], Start_ts: datum['Start_ts']},
                update: {
                    $set: {AP_group: datum['AP_group'], End_ts: datum['End_ts'], Duration: datum['Duration']}
                },
                upsert: true
            }
        };
    };

    return dwellTimeDataModel.bulkWrite(R.map(createUpdateReq, data))
};

module.exports = {insertMany};