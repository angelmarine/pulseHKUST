/**
 * Created by felyciagunawan on 22/11/2017.
 */

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest:'/tmp/' });

const dest = __dirname + '/../../tmp/';
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, dest);
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});

const inputHandler = require('../services/input/inputHandler')();

/* POST users listing. */
router.post('/upload', function(req, res, next) {
    const upload = multer({ storage: storage }).single('data');
    upload(req, res, function(err) {
        inputHandler(dest, req.file.originalname);
        res.end('File is uploaded')
    });
});

module.exports = router;
