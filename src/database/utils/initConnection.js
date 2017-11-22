var mongoose = require('mongoose');

// Set connection URL
var url = 'mongodb://127.0.0.1:27017/pulse-test';

// Connect to the database
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
        console.log("Connection initialized successfully!");
    });