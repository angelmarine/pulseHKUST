/**
 * Created by felyciagunawan on 20/11/2017.
 */
const R = require('ramda');
const readline = require('readline');
const fs = require('fs');

//TODO: update parameters
const make = (lineParser = require('lineParser'),
              rawDataRepo,
              userDataRepo,
              locationDataRepo) => {

    function getUTCTimestamp(fileName) {
        const pattern = new RegExp(/filter_user_detail_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})/);

        const match = fileName.match(pattern);
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

    function readData(directory, fileName, timestamp) {
        const inputPath = directory + fileName;
        const rl = readline.createInterface({
            input: fs.createReadStream(inputPath),
            crlfDelay: Infinity
        });

        let data = [];
        rl.on('line', (lineString) => {
            data.append(R.assoc('Timestamp', timestamp, lineParser(lineString)));
        });

        return data;
    }

    function processRawData(data) {
        //TODO: update with real implementation
        return Promise.all(R.map(item => rawDataRepo.save(item), data));
    }

    function processLocationData(timestamp) {
        //TODO: update with real implementation
        const dataPerLocation = rawDataRepo.groupByLocationForTimestamp(timestamp);
        // {location, count}
        return Promise.all(R.map(item => locationDataRepo.updateForTimestamp(timestamp, dataPerLocation)));
    }

    function processUserData(timestamp) {
        //TODO: update with real implementation
        const dataPerLocation = rawDataRepo.groupByUserForTimestamp(timestamp);
        // {location, count}
        return Promise.all(R.map(item => locationDataRepo.updateForTimestamp(timestamp, dataPerLocation)));
    }

    const inputHandler = (directory, fileName) => {
        const timestamp = getUTCTimestamp(fileName);
        const data = readData(directory, fileName, timestamp);

        return processRawData(data)
            .then(() => processLocationData(timestamp))
            .then(() => processUserData(timestamp));
    };

    return inputHandler;
};

module.exports = make;
