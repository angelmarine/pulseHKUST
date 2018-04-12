const moment = require('moment');
const R = require('ramda');

const make = (locationDataRepo = require('../database/utils/locationDataRepo')(),
                apGroupHandler = require('./input/apGroupHandler')) => {

    const getDataForDate = date => {
        const apGroupList = apGroupHandler.getApGroupList();
        return locationDataRepo.findByApIdsAndDay(apGroupList, date);
    };

    const getDataForDateRange = (startDate, endDate) => {
        const apGroupList = apGroupHandler.getApGroupList();
        return locationDataRepo.findByApIdsAndRange(apGroupList, startDate, endDate);
    };

    const getStreamGraphData = (startDate, endDate) => {
        const norm = endDate.diff(startDate, 'days') + 1;
        const newData = [];
        const mapData = (datum) => {
            const frequency = [];
            const mapDay = (obj) => {
                const date = moment(obj['Day']);
                const mapHour = (val, key, obj) => {
                    if(key === "_id") return;
                    const hour = key;
                    const mapMinute = (val2, key2, obj) => {
                        if(key2 === "_id") return;
                        const completeDate = date.clone().set('hour', hour).set('minute', key2);
                        frequency.push({x: completeDate, y: val2});
                    };
                    R.mapObjIndexed(mapMinute, val);
                };
                R.mapObjIndexed(mapHour, obj['Hour_minute_count'])
            };
            R.map(mapDay, datum['Count_timestamp']);
            if(norm < 2) {
                newData.push({theme: datum['AP_id'], frequency: frequency});
            } else {
                const filteredFreq = [];
                for (let i=0; i<frequency.length; i += norm) {
                    filteredFreq.push(frequency[i]);
                }
                newData.push({theme: datum['AP_id'], frequency: filteredFreq});
            }
        };

        return getDataForDateRange(startDate, endDate)
            .then(data => {
                R.map(mapData, data);
                return newData;
            })
    };

    return {getDataForDate, getDataForDateRange, getStreamGraphData}
};

module.exports = make;