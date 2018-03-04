const rawDataModel = require('../schema/rawData.js');
const logger = require('../../utils/logger');

module.exports = {
    save: function(rawDataArray) {
        return rawDataModel.insertMany(rawDataArray)
            .then(() =>{
                logger.info("Saved raw data: ");
                return Promise.resolve("Saved all raw data");
            })
            .catch((err) =>{
                logger.error(err);
                return Promise.reject("Error in saving raw data");
            });
   }
};