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

module.exports = {insertMany};