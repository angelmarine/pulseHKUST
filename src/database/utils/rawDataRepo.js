var mongoose = require('mongoose')
    , rawDataModel = require('../schema/rawData.js');

// create and save raw data document
function save(jsonObj){

    //create raw data document
    var newRawDataDoc = new rawDataModel({
        IP_address : jsonObj.IP_address,
        MAC_id: jsonObj.MAC_id,
        AP_id: jsonObj.AP_id,
        AP_group: jsonObj.AP_group,
        Timestamp: jsonObj.Timestamp
    });
    
    //save raw data document
    newRawDataDoc.save(function(err){
        if(err) return console.error();
    });

    return true;
}