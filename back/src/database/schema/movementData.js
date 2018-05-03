const mongoose = require('mongoose');

const movementDataSchema = new mongoose.Schema({
    MAC_id: String,
    Timestamp: Date,
    Movement: [String]
});

movementDataSchema.index({ MAC_id: 1, Timestamp: 1});

const movementDataModel = mongoose.model('movementData', movementDataSchema);

module.exports = movementDataModel;