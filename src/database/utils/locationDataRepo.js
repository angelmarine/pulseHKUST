var mongoose = require('mongoose')
    , locationDataModel = require('../schema/locationData.js');

//update the location data document with specified AP_id
//add new timeCountPair to the Time_Count_Pair field array.
function update(apId, timestamp, count){

    //define query(condition)
    var query = { AP_id: apId };

    //define new movement to add to array
    var newTimeCountPair = { Timestamp: timestamp, Count:count};

    //add new movement to the array
    locationDataModel.findOneAndUpdate(query, {"$push": {Time_count_pair: newTimeCountPair}}, {safe:true, upsert:true}, function(err,model){
        console.log(err);
        console.log(model);
    });
}

function deleteByApID(apId){
    //define query(condition)
    var query = {AP_id: apId};
    locationDataModel.findOneAndRemove(query, function (err, foundDoc) {
        console.log(err);
        console.log(foundDoc);
    });
}