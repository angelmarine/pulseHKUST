var mongoose = require('mongoose');

// Set schema for per location data
var perLocationSchema = mongoose.Schema({
    AP_id: String,
    AP_group: String,
    Time_count_pair:[new Schema({
        Timestamp: Date,
        Count: Number})]
});

// Set per location model associated with per location schema
var perLocationModel = mongoose.model('perLocation', perLocationSchema);

// Export per location model
module.exports = perLocationModel;