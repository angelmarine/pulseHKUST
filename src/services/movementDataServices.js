const moment = require('moment');
const R = require('ramda');
const movementDataRepo = require('../database/utils/movementDataRepo');
const apGroupHandler = require('./input/apGroupHandler');

const getHourlyMatrixForDay = (date) => {
    const apGroupList = apGroupHandler.getApGroupList();
    const apGroupIndexMap = {};
    const matrix = [];
    for(let i=0; i < apGroupList.length; i++) {
        apGroupIndexMap[apGroupList[i]] = i;
        matrix.push(new Array(apGroupList.length).fill(0));
    }

    const getHourMatrix = hour => {
        const currMatrix = R.clone(matrix);
        const currDate = date.clone().add(hour, 'hours');

        const fillMatrix = data => {
            const findAndSetElem = datum => {
                const origin = datum['_id'][0];
                const dest = datum['_id'][1];
                currMatrix[apGroupIndexMap[origin]][apGroupIndexMap[dest]] = datum['count'];
            };
            R.map(findAndSetElem, data)
        };

        return movementDataRepo.getHourMovement(currDate)
            .then(res => {
                fillMatrix(res);
                return {hour, matrix: currMatrix};
            });
    };

    return Promise.all(R.map(getHourMatrix, R.range(0,23)))
        .then(res => {
            return {apGroupList, matrices: res}
        });
};

module.exports = {getHourlyMatrixForDay};