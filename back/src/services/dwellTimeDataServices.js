const moment = require('moment');
const R = require('ramda');

const make = (dwellTimeDataRepo = require('../database/utils/dwellTimeDataRepo')) => {
    const obtainTimeRangeLabel = obj => {
        const newObj = {count: obj['totalCount']};
        const getRangeString = (min, max, unit) => {
            if(min === max) { return `${min}${unit}`; }
            return `${min}-${max}${unit}`;
        };
        if(obj['max'] > 60) {
            const minuteToHour = mins => { return Math.round((mins/60)*10)/10 };
            newObj['label'] = getRangeString(minuteToHour(obj['min']), minuteToHour(obj['max']), 'h');
        } else {
            newObj['label'] = getRangeString(obj['min'], obj['max'], 'm');
        }
        return newObj;
    };

    const getHourlyAvgForDay = (AP_group, date) => {
        const changeHourToLocal = obj => {
            return {
                'hour': (obj['hour']+8) % 24,
                'avg': Math.trunc(obj['avg'])
            };
        };

        const getHourStats = obj => {
            const dateWithHour = date.clone().add(obj.hour, 'hours');
            return dwellTimeDataRepo.getHourStats(AP_group, dateWithHour)
                .then( res => {
                    obj.stats = R.map(obtainTimeRangeLabel, res);
                    return obj;
                })
        };

        return dwellTimeDataRepo.getHourlyAvgForDay(AP_group, date)
            .then(res => {
                const newRes = R.map(changeHourToLocal, res);
                return Promise.all(R.map(getHourStats, newRes))
            });
    };

    return {getHourlyAvgForDay}
};

module.exports = make;