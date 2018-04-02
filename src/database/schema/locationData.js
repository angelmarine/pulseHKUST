const mongoose = require('mongoose');

const minuteObj = new mongoose.Schema({
    0: {type:Number, default:0},
    10: {type:Number, default:0},
    20: {type:Number, default:0},
    30: {type:Number, default:0},
    40: {type:Number, default:0},
    50: {type:Number, default:0}
});

const hourMinuteObj = new mongoose.Schema({
    0: {type:minuteObj, default:minuteObj},
    1: {type:minuteObj, default:minuteObj},
    2: {type:minuteObj, default:minuteObj},
    3: {type:minuteObj, default:minuteObj},
    4: {type:minuteObj, default:minuteObj},
    5: {type:minuteObj, default:minuteObj},
    6: {type:minuteObj, default:minuteObj},
    7: {type:minuteObj, default:minuteObj},
    8: {type:minuteObj, default:minuteObj},
    10: {type:minuteObj, default:minuteObj},
    11: {type:minuteObj, default:minuteObj},
    12: {type:minuteObj, default:minuteObj},
    13: {type:minuteObj, default:minuteObj},
    14: {type:minuteObj, default:minuteObj},
    15: {type:minuteObj, default:minuteObj},
    16: {type:minuteObj, default:minuteObj},
    17: {type:minuteObj, default:minuteObj},
    18: {type:minuteObj, default:minuteObj},
    19: {type:minuteObj, default:minuteObj},
    20: {type:minuteObj, default:minuteObj},
    21: {type:minuteObj, default:minuteObj},
    22: {type:minuteObj, default:minuteObj},
    23: {type:minuteObj, default:minuteObj}
});

// Set schema for location data
const locationDataSchema = new mongoose.Schema({
    AP_id: { type: String, index: true },
    AP_group: String,
    Count_timestamp:[{
        //each timestamp will contain data size of a day
        Day: Date,
        Hour_minute_count: {type: hourMinuteObj, default:hourMinuteObj}
    }]
});

locationDataSchema.index({"Count_timestamp.Day":1});

// Set location data model associated with location data schema
const locationDataModel = mongoose.model('locationData', locationDataSchema);

// Export location model
module.exports = locationDataModel;