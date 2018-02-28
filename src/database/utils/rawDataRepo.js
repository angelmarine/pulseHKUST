const mongoose = require('mongoose')
    , rawDataModel = require('../schema/rawData.js');
const logger = require('../../utils/logger');

module.exports = {
    save: function(jsonObj) {
        //create raw data document
        const newRawDataDoc = new rawDataModel({
            MAC_id: jsonObj.MAC_id,
            AP_id: jsonObj.AP_id,
            AP_group: jsonObj.AP_group,
            Timestamp: jsonObj.Timestamp
        });
        return newRawDataDoc.save()
            .then((savedDoc) =>{
                logger.info("Saved raw data: " + savedDoc);
                return new Promise(function(resolve, reject) {
                    resolve();
                });
            })
            .catch((err) =>{
                logger.error(err);
                return new Promise(function(resolve, reject) {
                    reject();
                });
            });
   }
};