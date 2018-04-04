const mongoose = require('mongoose');
const logger = require('../../utils/logger');
const R = require('ramda');


const make = (locationDataModel = require('../schema/locationData.js')) => {

    // Parameter Types:
    // update(String,String,Date,int,int,int)
    const update = function(apId, apGroup, date, hour, minute, count) {

        //predefine queries and options
        const queryNewLocation = {
            AP_id: apId,
            AP_group: apGroup
        };
        const optionsNewLocation = {
            upsert: true
        };

        const queryNoMatchingDate = {
            AP_id: apId,
            "Count_timestamp.Day": {$ne: date}
        };
        const queryMatchingDate = {
            AP_id: apId,
            "Count_timestamp.Day": date
        };
        const addToSet = {
            Count_timestamp: {
                Day: date
            }
        };
        const fieldName = `Count_timestamp.$[elem].Hour_minute_count.${hour}.${minute}`;
        const updateHourMinuteCount = {
            [`Count_timestamp.$[elem].Hour_minute_count.${hour}.${minute}`]: count
        };
        const arrayFilter = {
            "elem.Day": date
        };

        /*
         1. First query checks if the Count_timestamp has no element with such date
         => if there is no such element, create a new element
         => if there is such element, do nothing
         2. Second query just update the Count_timestamp element with matching ap_id
         and date with new 'Hour_minute_count' value
         */
        return locationDataModel.findOneAndUpdate(queryNewLocation,{}, optionsNewLocation)
            .then(() => {
                return locationDataModel.update(queryNoMatchingDate, {$addToSet: addToSet})
                    .then(() => {
                        return locationDataModel.update(queryMatchingDate, updateHourMinuteCount, {arrayFilters: [arrayFilter]})
                    });
            });
    };

    /*
         Accepts an array of objects {'id', 'group', 'count'}.
         Do three steps sequentially:
         1. Initialize the AP_id document if not exist
         2. Add the Count_Timestamp sub-document for the day of timestamp if not exist
         3. Insert the counts
     */
    const updateMany = function (data, timestamp) {
        const date = timestamp.clone().startOf('day').toDate();
        const hour = timestamp.hour();
        const minute = timestamp.minute();

        /*
            Insert a special record for keeping track of the days that has been stored in database.
            Optimize the checking for step 2.
         */
        const extraData = R.append({'id': 'baseDoc', 'group': 'baseDoc', 'count': 1}, data);

        const getBaseDateField = () => locationDataModel
            .findOne({AP_id: 'baseDoc'})
            .select({_id:0, "Count_timestamp.Day":1})
            .exec();

        const ensureLocationExist = (dateList) => {
            const createUpdateReq = (datum) => {
                return {updateOne: {
                    filter: {AP_id: datum['id'], AP_group: datum['group']},
                    update: {
                        $set: {AP_id: datum['id'], AP_group: datum['group']},
                        $setOnInsert: {"Count_timestamp": []}
                    },
                    upsert: true
                }};
            };

            /*
                For every new(upserted) documents, make sure they have same day entries as the other documents.
                This ensures that the day subdocument is initialized for new documents that were previously missing.
                Only a few documents would be missing, thus we run this only on the upserted instead of all documents.
                Sample 'upsertedDoc' format: { index: 94, _id: 5ac1f4f071a0234b333213ac }
             */
            const copyExistingDates = (upsertedDoc) => {
                return locationDataModel.update(
                    {_id: upsertedDoc["_id"]},
                    {$push: {Count_timestamp: {$each: dateList}}}
                ).exec()
            };

            return locationDataModel.bulkWrite(R.map(createUpdateReq, extraData))
                .then(res => {
                    if(!R.isEmpty(dateList) && (res.upsertedCount > 0)) {
                        return Promise.all(R.map(copyExistingDates, res.getUpsertedIds()))
                    }
                    return Promise.resolve()
                });
        };

        const ensureDateExists = (dateList) => {
            const timeEquals = (obj) => obj.Day.getTime() === date.getTime();
            const dayNotExists = R.isEmpty(dateList) ? true : R.isNil(R.find(timeEquals)(dateList));
            if (dayNotExists) {
                // Add the date field to all existing documents
                return locationDataModel.updateMany({}, {$addToSet: {Count_timestamp: {Day: date}}}).exec()
            }
            return Promise.resolve();
        };

        const addRecord = (datum) => {
            return locationDataModel.update(
                    {AP_id: datum['id'], "Count_timestamp.Day": date},
                    {[`Count_timestamp.$[elem].Hour_minute_count.${hour}.${minute}`]: datum['count']},
                    {arrayFilters: [{"elem.Day": date}]}).exec();
        };

        return getBaseDateField()
            .then(res => {
                const dateList = R.isNil(res) ? [] : res["Count_timestamp"];
                return ensureLocationExist(dateList)
                    .then(() => ensureDateExists(dateList))
            })
            .then(() => {
                return Promise.all(R.map(addRecord, extraData))
            });
    };

    const deleteByAPId =  function (apId) {
        const query = {
            AP_id: apId
        };
        return locationDataModel.findOneAndRemove(query).exec();
    };

    /*
        Returns the one-day record for given apIds.
     */
    const findByApIdsAndDay = (apIds, date) => {
        const jsDate = date.startOf('day').toDate();
        return locationDataModel.aggregate([
            {$match: {'AP_id': {$in: apIds}}},
            {$project: {
                '_id': 0,
                'AP_id': 1,
                'Count_timestamp': {$filter: {
                    input: '$Count_timestamp',
                    as: 'item',
                    cond: {$eq: ['$$item.Day',jsDate]}}}
            }}
        ])
    };

    const findByApIdsAndRange = (apIds, startDate, endDate) => {
        const jsStartDate = startDate.startOf('day').toDate();
        const jsEndDate = endDate.startOf('day').toDate();
        return locationDataModel.aggregate([
            {$match: {'AP_id': {$in: apIds}}},
            {$project: {
                '_id': 0,
                'AP_id': 1,
                'Count_timestamp': {$filter: {
                    input: '$Count_timestamp',
                    as: 'item',
                    cond: {
                        $and: [
                            {$gte: ['$$item.Day', jsStartDate]},
                            {$lte: ['$$item.Day', jsEndDate]}
                        ]
                    }
                }}
            }}
        ])

    };

    return {update, updateMany, deleteByAPId, findByApIdsAndDay, findByApIdsAndRange}
};

module.exports = make;
