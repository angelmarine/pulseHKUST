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

    const getHourlyGroupDataForDate = (group, date) => {
        const hourAvg = hourData => {
            delete hourData['_id'];
            return Math.trunc(R.sum(R.values(hourData))/6);
        };

        const getLabel = hour => {
            if (hour < 10) return `0${hour}:00`;
            return `${hour}:00`;
        };

        return locationDataRepo.findByApIdsAndDay([group], date)
            .then(res => {
                const hourCountMap = res[0]['Count_timestamp'][0]['Hour_minute_count'];
                delete hourCountMap['_id'];
                const result = [];
                for(let key in hourCountMap) {
                    if (!hourCountMap.hasOwnProperty(key)) continue;
                    result.push({'time': getLabel(key), 'Count': hourAvg(hourCountMap[key])});
                }
                return result;
            })
    };

    return {getDataForDate, getHourlyGroupDataForDate, getDataForDateRange, getStreamGraphData}
};

module.exports = make;