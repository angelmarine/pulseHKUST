var mongoose = require('mongoose');

// Set schema for user data
var userDataSchema = mongoose.Schema({
    MAC_id: String,
    Movement: [{
        Timestamp: Date,
        AP_group: String}]
});

// Set user data model associated with user data schema
var userDataModel = mongoose.model('userData', userDataSchema);

// Export user data model
module.exports = userDataModel;