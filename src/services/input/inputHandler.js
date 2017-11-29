/**
 * Created by felyciagunawan on 20/11/2017.
 */
const R = require('ramda');
const readline = require('readline');
const fs = require('fs');

//TODO: update parameters
const make = (lineParser = require('lineParser'),
              storeInputData = require('storeInputData')) => {

    function getUTCTimestamp(filename) {
        const filenamePattern = new RegExp(/^filter_user_detail_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})$/);
        const match = filename.match(filenamePattern);
        if (R.isNil(match)) {
            throw new Error("Invalid filename");
        }

        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];

        return new Date(year, month, day, hour, minute);
    }

    function readData(inputPath, timestamp) {
        const dataString = fs.readFileSync(inputPath, 'utf-8').split('\n');

        const getLineObj = lineString => R.assoc('Timestamp', timestamp, lineParser(lineString));
        const dataObj = R.map(getLineObj, dataString);

        const nonEmptyDataObj = R.filter(obj => !R.isNil(obj), dataObj);
        console.log(dataObj);
        return nonEmptyDataObj;
    }

    const inputHandler = (directory, filename) => {
        const inputPath = directory + filename;
        console.log(`Processing input file: ${inputPath}`);

        const fileNotExist = path => !fs.existsSync(path);
        if (fileNotExist(inputPath)) {
            throw new Error("File not found");
        }

        const timestamp = getUTCTimestamp(filename);
        const data = readData(inputPath, timestamp);

        return storeInputData(data);
    };

    return inputHandler;
};

module.exports = make;
