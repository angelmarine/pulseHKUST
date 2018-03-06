const rawDataModel = require('../schema/rawData.js'),
    R = require('ramda');
const logger = require('../../utils/logger');

module.exports = {
    save: function (rawData) {
        const rawDataDoc = new rawDataModel({
            MAC_id: rawData.MAC_id,
            AP_id: rawData.AP_id,
            AP_group: rawData.AP_group,
            Timestamp: rawData.Timestamp
        });
        return rawDataDoc.save();
        /*
        rawDataArray.forEach((rawData) => {
           bulkUpdateArray.push(transformToUpdateOne(rawData));
        });
        const transformToUpdateOne = (data) => {
            return {
                updateOne: {
                    filter: {
                        MAC_id: data.MAC_id,
                        Timestamp: data.Timestamp
                    },
                    update: {
                        AP_id: data.AP_id,
                        AP_group: data.AP_group
                    },
                    upsert: true
                }
            }
        };

        const bulkUpdateArray = R.map(transformToUpdateOne, rawDataArray);

        return rawDataModel.bulkWrite(bulkUpdateArray);
        */
    }
};