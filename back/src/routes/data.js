const express = require('express');
const moment = require('moment');
const router = express.Router();
const locationDataServices = require('../services/locationDataServices')();
const dwellTimeDataServices = require('../services/dwellTimeDataServices')();
const movementDataServices = require('../services/movementDataServices');
const apGroupHandler = require('../services/input/apGroupHandler');

// Enforce strict format of date string
const isValidDate = date => moment(date, 'YYYY-MM-DD', true).isValid();

router.get('/date/:date', function(req, res, next) {
    if(isValidDate(req.params.date)) {
        const date = moment(req.params.date, 'YYYY-MM-DD');
        locationDataServices.getDataForDate(date)
            .then(data => res.send({data}));
    } else {
        res.status(400).send({'message': 'Date must be specified in YYYY-MM-DD format.'});
    }
});

router.get('/range/from=:from&to=:to', function(req, res, next) {
    if(isValidDate(req.params.from) && isValidDate(req.params.to)) {
        const startDate = moment(req.params.from, 'YYYY-MM-DD');
        const endDate = moment(req.params.to, 'YYYY-MM-DD');
        if(startDate.isSameOrBefore(endDate)) {
            locationDataServices.getDataForDateRange(startDate, endDate)
                .then(data => res.send({data}));
        } else {
            res.status(400).send({'message': 'Start date must be same or before end date.'})
        }
    } else {
        res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
    }
});

router.get('/date/hourly/group=:group&date=:date', function(req, res, next) {
    const validGroup = apGroupHandler.getApGroupList();
    if(validGroup.indexOf(req.params.group) < 0) {
        res.status(400).send({'message': 'AP group unknown'});
    }
    if(isValidDate(req.params.date)) {
        const date = moment(req.params.date, 'YYYY-MM-DD');
        locationDataServices.getHourlyGroupDataForDate(req.params.group, date)
            .then(data => res.send({data}));
    } else {
        res.status(400).send({'message': 'Date must be specified in YYYY-MM-DD format.'});
    }
});

router.get('/stream/from=:from&to=:to', function(req, res, next) {
    if(isValidDate(req.params.from) && isValidDate(req.params.to)) {
        const startDate = moment(req.params.from, 'YYYY-MM-DD');
        const endDate = moment(req.params.to, 'YYYY-MM-DD');
        if(startDate.isSameOrBefore(endDate)) {
            locationDataServices.getStreamGraphData(startDate, endDate)
                .then(data => res.send({data}));
        } else {
            res.status(400).send({'message': 'Start date must be same or before end date.'})
        }
    } else {
        res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
    }
});

router.get('/dwell/group=:group&date=:date', function(req, res, next) {
    const validGroup = apGroupHandler.getApGroupList();
    if(validGroup.indexOf(req.params.group) < 0) {
        res.status(400).send({'message': 'AP group unknown'})
    }
    if(isValidDate(req.params.date)) {
        const date = moment(req.params.date, 'YYYY-MM-DD');
        return dwellTimeDataServices.getHourlyAvgForDay(req.params.group, date)
            .then(data => res.send({data}));
    } else {
        res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
    }
});

router.get('/matrix/date=:date', function(req, res, next) {
    if(isValidDate(req.params.date)) {
        const date = moment(req.params.date, 'YYYY-MM-DD');
        return movementDataServices.getHourlyMatrixForDay(date)
            .then(data => res.send({order: data['apGroupList'], data: data['matrices']}));
    } else {
        res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
    }
});


// router.get('/dwell/hour/group=:group&date=:date&hour=:hour', function(req, res, next) {
//     const validGroup = apGroupHandler.getApGroupList();
//     if(validGroup.indexOf(req.params.group) < 0) {
//         res.status(400).send({'message': 'AP group unknown'})
//     }
//     if(req.params.group > 24 || req.params.group < 0) {
//         res.status(400).send({'message': 'Hour is out of range'})
//     }
//     if(isValidDate(req.params.date)) {
//         const date = moment(req.params.date, 'YYYY-MM-DD');
//         return dwellTimeDataServices.getHourStats(req.params.group, date, req.params.hour)
//             .then(data => res.send({data}));
//     } else {
//         res.status(400).send({'message': 'Dates must be specified in YYYY-MM-DD format.'})
//     }
// });

module.exports = router;
