const mongoose = require('mongoose');

// Set schema for raw data
const rawDataSchema = new mongoose.Schema({
    MAC_id: String,
    AP_id: String,
    AP_group: String,
    Timestamp: Date
});

rawDataSchema.index({ MAC_id: 1, Timestamp: 1});

// Set raw data model associated with raw data schema
const rawDataModel = mongoose.model('rawData', rawDataSchema);

//Export the raw data model
module.exports = rawDataModel;