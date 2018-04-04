const express = require('express');
const moment = require('moment');
const router = express.Router();
const locationDataServices = require('../services/locationDataServices')();

// Enforce strict format of date string
const isValidDate = date => moment(date, 'YYYY-MM-DD', true).isValid();

router.get('/date/:date', function(req, res, next) {
    if(isValidDate(req.params.date)) {
        locationDataServices.getDataForDate(req.params.date)
            .then(data => res.send({data}));
    } else {
        res.status(400).send({'message': 'Date must be specified in YYYY-MM-DD format.'});
    }
});

router.get('/range/from=:from&to=:to', function(req, res, next) {
    if(isValidDate(req.params.from) && isValidDate(req.params.to)) {
        locationDataServices.getDataForDateRange(req.params.from, req.params.to)
            .then(data => res.send({data}));
    } else {
        res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
    }
});


module.exports = router;
