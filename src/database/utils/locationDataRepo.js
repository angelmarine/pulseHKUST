const mongoose = require('mongoose')
    , locationDataModel = require('../schema/locationData.js');
const logger = require('../../utils/logger');

module.exports = {
    // Parameter Types:
    // update(String,String,Date,int,int,int)
    update: function (apId, apGroup, date, hour, minute, count) {

        //predefine queries and options
        const queryNewLocation = {
            AP_id: apId,
            AP_group: apGroup
        };
        const optionsNewLocation = {
            upsert: true
        };

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
        return locationDataModel.findOneAndUpdate(queryNewLocation,{},optionsNewLocation)
            .then(function(){
                return locationDataModel.update(queryNoMatchingDate, {$addToSet: addToSet})
                    .then(() => {
                        return locationDataModel.update(queryMatchingDate, updateHourMinuteCount, {arrayFilters: [arrayFilter]})
                            .then(() => {
                                return Promise.resolve();
                            })
                            .catch((err) => {
                                logger.error(err);
                                return Promise.reject("Error in update");
                            });
                    })
                    .catch((err) => {
                        logger.error(err);
                        return Promise.reject("Error in update");
                    });
        });
        /*
        //check whether it is a new location
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
        });*/
    },

    deleteByAPId: function(apId){
        const query = {
            AP_id: apId
        };
        return locationDataModel.findOneAndRemove(query);
        /*
        return locationDataModel.findOneAndRemove(query)
            .then((foundDoc) => {
                logger.info("Deleted location data: " + foundDoc);
                return resolvedPromise();
            })
            .catch((err) => {
                logger.error(err);
                return rejectedPromise();
            });*/
    }
};

// helper functions
function isNewLocation(apId,apGroup){
    const queryLocationExists = {
        AP_id: apId,
        AP_group: apGroup,
    };
    return locationDataModel.find(queryLocationExists);
    /*
    return locationDataModel.find(queryLocationExists)
        .then((locationFound) => {
            if(!locationFound){
                return resolvedPromise();
            }
            return rejectedPromise();
        })
        .catch((err) => {
            logger.error(err);
            return rejectedPromise();
        });
    */
}
