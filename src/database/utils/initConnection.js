var mongoose = require('mongoose');

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
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
        console.log("Connection initialized successfully!");
    });

module.exports = db;