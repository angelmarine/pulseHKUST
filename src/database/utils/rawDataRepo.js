const rawDataModel = require('../schema/rawData.js');
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


        /*const completed = [];

        rawDataArray.forEach((rawData) => {
            const rawDataDoc = new rawDataModel({
                MAC_id: rawData.MAC_id,
                AP_id: rawData.AP_id,
                AP_group: rawData.AP_group,
                Timestamp: rawData.Timestamp
            });
            rawDataDoc.save()
                .then(() => {
                    completed.push(rawData.MAC_id);
                })
                .catch((err) => {
                    logger.error(err);
                    rollback(completed);
                });
        });

        //
        return Promise.all();*/
    }
};

function rollback(completed){
    completed.forEach((doc) => {
        rawDataModel.findOneAndRemove({MAC_id});
    });
}