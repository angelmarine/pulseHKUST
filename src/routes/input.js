/**
 * Created by felyciagunawan on 22/11/2017.
 */

const R = require('ramda');
const fs = require('fs');
const express = require('express');
const multer  = require('multer');

const router = express.Router();

const dest = __dirname + '/../../tmp/';
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, dest);
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const inputHandler = require('../services/input/inputHandler')();

/* POST users listing. */
router.post('/upload', function(req, res, next) {
    const upload = multer({ storage: storage }).single('data');
    upload(req, res, function(err) {
        if(err) {
            console.log(`Uploading file failed: ${err.message}`);
            res.end('File upload failed');
        }
        else {
            const filenamePattern = new RegExp(/^filter_user_detail_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})$/);
            const name = req.file.originalname;
            const match = name.match(filenamePattern);
            if (R.isNil(match)) {
                res.end('File upload failed: Invalid filename');
                const inputPath = dest + name;
                fs.unlink(inputPath, (err) => { if (err) throw err });
                return;
            }

            inputHandler(dest, name);
            res.end('File is uploaded');
        }
    });
});

module.exports = router;
