var mongoose = require('mongoose')
    , locationDataModel = require('../schema/locationData.js');
const logger = require('../../utils/logger');

module.exports = {

    //FUNCTION: UPDATE
    //update the location data document with specified AP_id
    //add new timeCountPair to the Time_Count_Pair field array.
    update: function (apId, timestamp, count) {

        //define query(condition)
        var query = {AP_id: apId};

        //define new movement to add to array
        var newTimeCountPair = {Timestamp: timestamp, Count: count};

        //add new movement to the array
        // return locationDataModel.findOneAndUpdate(query, {"$push": {Time_count_pair: newTimeCountPair}},{safe: true, upsert: true}).exec(function (err, model) {
        //     console.log(err);
        //     console.log(model);
        // });
        return locationDataModel.findOneAndUpdate(query, {"$push": {Time_count_pair: newTimeCountPair}},{safe: true, upsert: true}).exec();
    },

    //FUNCTION: DELETEBYAPID
    deleteByApID: function (apId) {
        //define query(condition)
        var query = {AP_id: apId};
        return locationDataModel.findOneAndRemove(query).exec(function (err, foundDoc) {
            logger.error(err);
            logger.info(foundDoc);
        });
    }
};
