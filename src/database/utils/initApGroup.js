var mongoose = require('mongoose')
    , locationDataModel = require('../schema/locationData.js');

//for testing purpose
function initializeManual(){

    var apIdArray = ['t142A01024-1','t142A01026-1','t142A01030Aa','t142A01031-1','t142A01034-1','t142A01041-1','t142A01047-1','t142A01047A1','t142A01049-1'];

    apIdArray.forEach(function(apId){
         createAndSaveLocation(apId, 'Zone K');
    });


}

//read the AP_id and AP_group pairs from the file
//create the documents the with corresponding AP_id and AP_group pairs in advance
function initializeFromFile(file){

}


function createAndSaveLocation(apID,apGroup){

    var newLocation = new locationDataModel({
        AP_id: apID,
        AP_group: apGroup,
        Time_count_pair:[]
    });

    newLocation.save(function(err){
        if(err) return console.error();
    });
}