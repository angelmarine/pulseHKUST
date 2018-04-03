const express = require('express');
const router = express.Router();
const locationDataServices = require('../services/locationDataServices')();

/* GET home page. */
router.get('/day/:day', function(req, res, next) {
    locationDataServices.getGroupDataForDay(req.params.day)
        .then(data => res.send(data));
});

// router.get('/input', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });


module.exports = router;
