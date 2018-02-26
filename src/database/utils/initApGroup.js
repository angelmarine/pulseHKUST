const mongoose = require('mongoose');
const locationDataModel = require('../schema/locationData.js');
const logger = require('../../utils/logger');

module.exports = {
    //for testing purpose
    initialize: function(){
        const apIdArray = ['t142A01024-1', 't142A01026-1', 't142A01030Aa', 't142A01031-1',
            't142A01034-1', 't142A01041-1', 't142A01047-1', 't142A01047A1', 't142A01049-1'];
        const promiseArray = [];
        apIdArray.forEach(function (apId) {
            promiseArray.push(createAndSaveLocation(apId, 'Zone K'));
        });
        return Promise.all(promiseArray);
    },

    initializeFromFile: function(file){
        //TODO: create the csv file with AP_id and AP_group pairs, read the AP_id and AP_group pairs from the file,
    }
};

function createAndSaveLocation(apID,apGroup){
    const newLocation = new locationDataModel({
        AP_id: apID,
        AP_group: apGroup,
        Count_timestamp: undefined
    });

    return newLocation.save()
        .then((savedDoc) => {
            logger.info("New location added: " + savedDoc);
        })
        .catch((err) => {
            logger.error(err.message);
        });
}