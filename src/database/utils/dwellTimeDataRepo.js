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
    const startDate = date.startOf('day').toDate();
    const endDate = date.endOf('day').toDate();

    return dwellTimeDataModel.aggregate([
        {
            $match: {
                'AP_group': AP_group,
                'Start_ts': {$gte: startDate, $lte: endDate}
            }
        },
        {
            $group: {_id: {$hour: '$Start_ts'}, avg: {$avg: '$Duration'}}
        },
        {
            $project: {'hour': '$_id', avg:1, _id:0}
        }
    ])
};

module.exports = {insertMany, getHourlyAvgForDay};