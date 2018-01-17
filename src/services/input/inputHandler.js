/**
 * Created by felyciagunawan on 20/11/2017.
 */
const R = require('ramda');
const readline = require('readline');
const fs = require('fs');

const make = (lineParser = require('./lineParser'),
              storeInputData = require('./storeInputData')()) => {

    function getUTCTimestamp(filename) {
        const filenamePattern = new RegExp(/^filter_user_detail_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})$/);
        const match = filename.match(filenamePattern);

        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];

        return new Date(year, month, day, hour, minute);
    }

    function readData(inputPath, timestamp) {
        const dataString = fs.readFileSync(inputPath, 'utf-8').split('\n');
        const nonEmptyDataString = R.filter(obj => (obj), dataString);

        const getLineObj = lineString => R.assoc('Timestamp', timestamp, lineParser(lineString));
        const dataObj = R.map(getLineObj, nonEmptyDataString);

        return dataObj;
    }

    const inputHandler = (directory, filename) => {
        const inputPath = directory + filename;
        console.log(`Processing input file: ${inputPath}`);

        const timestamp = getUTCTimestamp(filename);
        const data = readData(inputPath, timestamp);

        return storeInputData(data)
            .then(() => {
                console.log("Processing input file completed successfully");
                fs.unlink(inputPath, (err) => {
                    if (err) throw err;
                    console.log(`Successfully deleted ${inputPath}`);
                });
            })
            .catch(err => {
                console.log(`Processing input file failed: ${err.message}`);
                //TODO: send email notification on failure
            })
    };

    return inputHandler;
};

module.exports = make;
