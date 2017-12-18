var mongoose = require('mongoose')
    , rawDataModel = require('../schema/rawData.js');

module.exports = {

    // FUNCTION: SAVE
    save: function(jsonObj) {
        //create raw data document
        var newRawDataDoc = new rawDataModel({
            IP_address: jsonObj.IP_address,
            MAC_id: jsonObj.MAC_id,
            AP_id: jsonObj.AP_id,
            AP_group: jsonObj.AP_group,
            Timestamp: jsonObj.Timestamp
        });
        //save raw data document
        return newRawDataDoc.save(function (err, product, numAffected) {
            if (err) return console.error();
            else return console.log(product);
        });
   }

};