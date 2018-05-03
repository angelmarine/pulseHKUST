const userLocationModel = require('../schema/userLocationData');
const R = require('ramda');

const updateMany = (data, timestamp) => {
    const createUpdateReq = (datum) => {
        return {
            updateOne: {
                filter: {MAC_id: datum['MAC_id'], AP_group: datum['AP_group']},
                update: {
                    $set: {End_ts: timestamp},
                    $setOnInsert: {Start_ts: timestamp}
                },
                upsert: true
            }
        };
    };

    return userLocationModel.bulkWrite(R.map(createUpdateReq, data))
};

const extractMovement = () => {
    return userLocationModel.aggregate([
        {$sort: {MAC_id: 1, Start_ts: 1}},
        {$group: {_id: '$MAC_id', Timestamp: {$min: '$End_ts'}, Movement: {$push: '$AP_group'}, count: {$sum: 1}}},
        {$match: {'count': {$gt: 1}}},
        {
            $project: {
                '_id': 0,
                'MAC_id': '$_id',
                'Timestamp': 1,
                'Movement': 1
            }
        }
    ])
};

const getOldData = (timestamp) => {
    return userLocationModel.find({'End_ts': {$lt: timestamp}}, {_id: 0}).exec()
};

const removeOldData = (timestamp) => {
    return userLocationModel.remove({'End_ts': {$lt: timestamp}}).exec()
};

module.exports = {updateMany, extractMovement, getOldData, removeOldData};