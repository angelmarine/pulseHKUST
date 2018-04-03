const moment = require('moment');

const make = (locationDataRepo = require('../database/utils/locationDataRepo')(),
                apGroupHandler = require('./input/apGroupHandler')) => {

    const getGroupDataForDay = day => {
        const date = moment(day, 'YYYY-MM-DD');
        const apGroupList = apGroupHandler.getApGroupList();
        return locationDataRepo.findByApIdsAndDay(apGroupList, date);
    };

    return {getGroupDataForDay}
};

module.exports = make;