var mongoose = require('mongoose');

// Set schema for raw data
var rawDataSchema = mongoose.Schema({
    IP_address: String,
    MAC_id: String,
    AP_id: String,
    AP_group: String,
    Timestamp: Date
});

// Set raw data model associated with raw data schema
var rawDataModel = mongoose.model('rawData', rawDataSchema);


//Export the raw data model
module.exports = rawDataModel;