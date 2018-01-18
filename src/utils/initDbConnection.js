var mongoose = require('mongoose');
var logger = require('./logger');

var option = {
    server: {
        poolSize: 10,
        connectTimeoutMS: 30000
    }
};

// Set connection URL
var url = 'mongodb://127.0.0.1:27017/pulse-test';

// Connect to the database
mongoose.connect(url, option);
var db = mongoose.connection;
db.on('error', err => logger.error(`Connection error: ${err.message}`));
db.once('open', function(){
        logger.info("Connection initialized successfully!");
    });

module.exports = db;