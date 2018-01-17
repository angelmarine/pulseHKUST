var mongoose = require('mongoose');

// Set schema for location data
var locationDataSchema = mongoose.Schema({
    AP_id: { type: [String], index: true },
    AP_group: String,
    Time_count_pair:[{
        Timestamp: Date,
        Count: Number}]
});

// Set location data model associated with location data schema
var locationDataModel = mongoose.model('locationData', locationDataSchema);

// Export location model
module.exports = locationDataModel;