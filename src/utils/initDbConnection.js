const mongoose = require('mongoose');
const logger = require('./logger');

const option = {
    useMongoClient: true
};

// Set connection URL
const url = 'mongodb://127.0.0.1:27017/pulse-test';

// Connect to the database
mongoose.connect(url, option);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
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