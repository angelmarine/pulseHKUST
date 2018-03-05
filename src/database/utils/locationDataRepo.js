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
        return locationDataModel.findOneAndUpdate(queryNewLocation, {}, optionsNewLocation)
            .then(() => {
                return locationDataModel.update(queryNoMatchingDate, {$addToSet: addToSet})
                    .then(() => {
                        return locationDataModel.update(queryMatchingDate, updateHourMinuteCount, {arrayFilters: [arrayFilter]})
                            .catch((err) => { //catch error when updating hour minute count
                                logger.error(err);
                            })
                    })
                    .catch((err) => { //catch error when adding new date
                        logger.error(err);
                    });
            })
            .catch((error) => { // catch error when adding new location
                logger.error(err);
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

    deleteByAPId: function (apId) {
        const query = {
            AP_id: apId
        };
        return locationDataModel.findOneAndRemove(query)
            .catch((err) => {
                console.log(err);
            });
    }
};

/*// helper functions
function isNewLocation(apId,apGroup){
    const queryLocationExists = {
        AP_id: apId,
        AP_group: apGroup,
    };
    return locationDataModel.find(queryLocationExists).exec();
    /!*
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
    *!/
}*/
