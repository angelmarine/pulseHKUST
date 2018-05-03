const mongoose = require('mongoose');

const userLocationDataSchema = new mongoose.Schema({
    MAC_id: String,
    AP_group: String,
    Start_ts: Date,
    End_ts: Date
});

userLocationDataSchema.index({MAC_id: 1, AP_group: 1});

const userLocationModel = mongoose.model('userLocation', userLocationDataSchema);

module.exports = userLocationModel;