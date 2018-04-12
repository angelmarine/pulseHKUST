const moment = require('moment');
const R = require('ramda');

const make = (dwellTimeDataRepo = require('../database/utils/dwellTimeDataRepo')) => {
    const getHourlyAvgForDay = (AP_group, date) => {
        const changeHourToLocal = obj => {
            return {
                'hour': (obj['hour']+8) % 24,
                'avg': Math.trunc(obj['avg'])
            }
        };

        return dwellTimeDataRepo.getHourlyAvgForDay(AP_group, date)
            .then(res => R.map(changeHourToLocal, res));
    };

    return {getHourlyAvgForDay}
};

module.exports = make;