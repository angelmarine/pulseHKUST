const movementDataModel = require('../schema/movementData');
const R = require('ramda');

const insertMany = data => {
    const createUpdateReq = (datum) => {
        return {
            updateOne: {
                filter: {MAC_id: datum['MAC_id'], Timestamp: datum['Timestamp']},
                update: {
                    $set: {Movement: datum['Movement']}
                },
                upsert: true
            }
        };
    };

    return movementDataModel.bulkWrite(R.map(createUpdateReq, data))
};

const getHourMovement = date => {
    const startDate = date.clone().startOf('hour').toDate();
    const endDate = date.clone().endOf('hour').toDate();

    return movementDataModel.aggregate([
        {
            $match: {'Timestamp': {$gte: startDate, $lte: endDate}}
        },
        {
            $group: {_id:'$Movement', 'count':{$sum:1}}
        }
    ])
};

module.exports = {insertMany, getHourMovement};