var mongoose = require('mongoose');
var logger = require('./logger');

var option = {
    useMongoClient: true
};

// Set connection URL
var url = 'mongodb://127.0.0.1:27017/pulse-test';

// Connect to the database
mongoose.connect(url, option);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', err => logger.error(`DB connection error: ${err.message}`));
db.once('open', function(){
    logger.info("DB connection initialized successfully!");
});

process.on('SIGINT', function(){
    db.close(function(){
        logger.info("DB connection disconnected due to application termination");
        process.exit(0);
    });
});

module.exports = mongoose.connection;