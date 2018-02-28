const mongoose = require('mongoose')
    , locationDataModel = require('../schema/locationData.js');
const logger = require('../../utils/logger');

module.exports = {
    // Parameter Types:
    // update(String,String,Date,int,int,int)

    update: function (apId, apGroup, date, hour, minute, count) {
        // if location is new, create location
        isNewLocation(apId,apGroup).then(() => {
            const newLocation = new locationDataModel({
                AP_id: apId,
                AP_group: apGroup,
                Count_timestamp: undefined
            });
            newLocation.save()
                .then((savedDoc) => {
                    logger.info("New location added: " + savedDoc);
                })
                .catch((err) => {
                    logger.error(err.message);
                });
        });

        //predefine queries and options
        const queryNoMatchingDate = {
            AP_id: apId,
            "Count_timestamp.Day": {'$ne': date}
        };
        const queryMatchingDate = {
            AP_id: apId,
            "Count_timestamp.Day": date
        };
        const addToSet = {
            Count_timestamp: {
                Day: date
            }
        };
        const fieldName = `Count_timestamp.$[elem].Hour_minute_count.${hour}.${minute}`;
        const updateHourMinuteCount = {
            [fieldName]: count
        };
        const arrayFilter = {
            "elem.Day": date
        };

        /*
        1. First query checks if the Count_timestamp has no element with such date
            => if there is no such element, create a new element
            => if there is such element, do nothing
        2. Second query just update the Count_timestamp element with matching ap_id
           and date with new 'Hour_minute_count' value
        */
        return locationDataModel.update(queryNoMatchingDate, {$addToSet: addToSet})
            .then((rawResponse) => {
                logger.info("Updated location data: " + rawResponse);
                return locationDataModel.update(queryMatchingDate, updateHourMinuteCount, {arrayFilters: [arrayFilter]})
                    .then((rawResponse) => {
                        logger.info("Updated location data: " + rawResponse);
                        return resolvedPromise();
                    })
                    .catch((err) => {
                        logger.error(err);
                        return rejectedPromise();
                    });
            })
            .catch((err) => {
                logger.error(err);
                return rejectedPromise();
            });
    },

    deleteByAPId: function (apId) {
        const query = {
            AP_id: apId
        };

        return locationDataModel.findOneAndRemove(query)
            .then((foundDoc) => {
                logger.info("Deleted location data: " + foundDoc);
                return resolvedPromise();
            })
            .catch((err) => {
                logger.error(err);
                return rejectedPromise();
            });
    }
};

// helper functions
function isNewLocation(apId,apGroup){
    const queryLocationExists = {
        AP_id: apId,
        AP_group: apGroup,
    };

    return locationDataModel.find(queryLocationExists)
        .then((locationFound) => {
            if(!locationFound){
                return resolvedPromise()
            }
            return rejectedPromise()
        })
        .catch((err) => {
            logger.error(err);
                return rejectedPromise()
        });
}

function resolvedPromise(){
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

function rejectedPromise(){
    return new Promise(function(resolve, reject) {
        reject();
    });
}
