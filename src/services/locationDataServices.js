const moment = require('moment');

const make = (locationDataRepo = require('../database/utils/locationDataRepo')(),
                apGroupHandler = require('./input/apGroupHandler')) => {

    const getDataForDate = dateString => {
        const date = moment(dateString, 'YYYY-MM-DD');
        const apGroupList = apGroupHandler.getApGroupList();
        return locationDataRepo.findByApIdsAndDay(apGroupList, date);
    };

    const getDataForDateRange = (startDateStr, endDateStr) => {
        const startDate = moment(startDateStr, 'YYYY-MM-DD');
        const endDate = moment(endDateStr, 'YYYY-MM-DD');
        const apGroupList = apGroupHandler.getApGroupList();
        return locationDataRepo.findByApIdsAndRange(apGroupList, startDate, endDate);
    };

    return {getDataForDate, getDataForDateRange}
};

module.exports = make;