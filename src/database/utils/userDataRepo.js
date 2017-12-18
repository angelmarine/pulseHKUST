var mongoose = require('mongoose')
    , userDataModel = require('../schema/userData.js');

    module.exports = {

    // update the user data document with specified MAC_id
    // add 'timestamp' and 'AP_id' value to the 'Movement' field array
    update : function (macId, timestamp, apGroup){

        //define query(condition)
        var query = { MAC_id: macId };

        //define new movement to add to array
        var newMovement = { Timestamp: timestamp, AP_group: apGroup};

        //add new movement to the array
        return userDataModel.findOneAndUpdate(query, {"$push": {Movement: newMovement}}, {safe:true, upsert:true}).exec(function(err,model){
            console.log(err);
            console.log(model);
        });

    },

    deleteByMacID : function (macId){
        //define query(condition)
        var query = {MAC_id: macId};
        return userDataModel.findOneAndRemove(query).exec(function (err, foundDoc) {
            console.log(err);
            console.log(foundDoc);
        });
    }

};