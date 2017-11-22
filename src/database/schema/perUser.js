var mongoose = require('mongoose');

// Set schema for per user data
var perUserSchema = mongoose.Schema({
    MAC_id: String,
    Movement: [new Schema({
        Timestamp: Date,
        AP_group: String})]
});

// Set per user model associated with per location schema
var perUserModel = mongoose.model('perUser', perUserSchema);

// Export per location model
module.exports = perUserModel;