const dwellTimeDataModel = require('../schema/dwellTimeData');
const R = require('ramda');

const insertMany = data => {
    const createUpdateReq = (datum) => {
        return {
            insertOne: {
                document: {
                    MAC_id: datum['MAC_id'],
                    AP_group: datum['AP_group'],
                    Start_ts: datum['Start_ts'],
                    End_ts: datum['End_ts'],
                    Duration: datum['Duration']
                }
            }
        };
    };
    return dwellTimeDataModel.bulkWrite(R.map(createUpdateReq, data))
};

const getHourlyAvgForDay = (AP_group, date) => {
    const startDate = date.clone().startOf('day').toDate();
    const endDate = date.clone().endOf('day').toDate();

    return dwellTimeDataModel.aggregate([
        {
            $match: {
                'AP_group': AP_group,
                'Start_ts': {$gte: startDate, $lte: endDate}
            }
        },
        {
            $group: {_id: {$hour: '$Start_ts'}, avg: {$avg: '$Duration'}, stdev: {$stdDevPop: '$Duration'}}
        },
        {
            $project: {'hour': '$_id', avg:1, _id:0}
        }
    ])
};

const getHourStats = (AP_group, date) => {
    const startDate = date.clone().startOf('hour').toDate();
    const endDate = date.clone().endOf('hour').toDate();

    return dwellTimeDataModel.aggregate([
        {
            $match: {
                'AP_group': AP_group,
                'Start_ts': {$gte: startDate, $lte: endDate}
            }
        },
        {
            $group: {_id: '$Duration', count: {$sum: 1}}
        },
        {
            $bucketAuto: {
                groupBy: "$_id",
                buckets: 5,
                output: {totalCount: {$sum: '$count'}}
            }
        },
        {
            $project: {min: '$_id.min', max: '$_id.max', totalCount: 1, _id:0}
        }
    ])
};

module.exports = {insertMany, getHourlyAvgForDay, getHourStats};