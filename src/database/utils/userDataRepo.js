var mongoose = require('mongoose')
    , userDataModel = require('../schema/userData.js');

// update the user data document with specified MAC_id
// add 'timestamp' and 'AP_id' value to the 'Movement' field array
function update(macId, timestamp, apGroup){

    //define query(condition)
    var query = { MAC_id: macId };

    //define new movement to add to array
    var newMovement = { Timestamp: timestamp, AP_group: apGroup};

    //add new movement to the array
    userDataModel.findOneAndUpdate(query, {"$push": {Movement: newMovement}}, {safe:true, upsert:true}, function(err,model){
        console.log(err);
        console.log(model);
    });

}

function deleteByMacID(macId){
    //define query(condition)
    var query = {MAC_id: macId};
    userDataModel.findOneAndRemove(query, function (err, foundDoc) {
        console.log(err);
        console.log(foundDoc);
    });
}