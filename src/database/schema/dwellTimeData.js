const mongoose = require('mongoose');

const dwellTimeDataSchema = new mongoose.Schema({
    MAC_id: String,
    AP_group: String,
    Start_ts: Date,
    End_ts: Date,
    Dwell_time: Number
});

dwellTimeDataSchema.index({ AP_group: 1, Start_ts: 1});

const dwellTimeDataModel = mongoose.model('dwellTimeData', dwellTimeDataSchema);

module.exports = dwellTimeDataModel;