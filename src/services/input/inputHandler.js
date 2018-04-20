const R = require('ramda');
const readline = require('readline');
const fs = require('fs');
const logger = require('../../utils/logger');
const moment = require('moment');

const make = (lineParser = require('./lineParser'),
              storeInputData = require('./storeInputData')()) => {

    function getTimestamp(filename) {
        const prefix = 'filter_user_detail_';
        const dateString = filename.slice(prefix.length - 1);

        return moment(dateString, "YYYYMMDD_HHmm");
    }

    function readData(inputPath, timestamp) {
        const dataString = fs.readFileSync(inputPath, 'utf-8').split('\n');

        const getLineObj = lineString => lineParser(lineString);
        const dataObj = R.map(getLineObj, dataString);

        const nonEmptyDataObj = R.filter(obj => !R.isNil(obj), dataObj);

        return R.map(R.assoc('Timestamp', timestamp), nonEmptyDataObj) ;
    }

    const inputHandler = (directory, filename) => {
        const inputPath = directory + filename;
        logger.info(`Processing input file: ${inputPath}`);

        const timestamp = getTimestamp(filename);
        const data = readData(inputPath, timestamp);

        return storeInputData(data)
            .then(() => {
                logger.info("Processing input file completed successfully");
                fs.unlink(inputPath, (err) => {
                    if (err) throw err;
                    logger.info(`Successfully deleted ${inputPath}`);
                });
            })
            .catch(err => {
                logger.error(`Processing input file failed: ${err.message} \n ${err.stack}`);
            })
    };

    return inputHandler;
};

module.exports = make;
