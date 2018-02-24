/**
 * Created by felyciagunawan on 22/2/2018.
 */

const R = require('ramda');

const assignApGroup = (apId) => {
    const keywordToGroup = {
        'ctl': (id) => {return id.slice(4, -2)},
        'sou': () => {return 'sou'},
        'nor': () => {return 'nor'},
        'pg1': () => {return 'pg1'},
        'pg2': () => {return 'pg2'},
        'ug1': () => {return 'ug1'},
        'ug2': () => {return 'ug2'},
        'ug3': () => {return 'ug3'},
        'ug4': () => {return 'ug4'},
        'ug6': () => {return 'ug6'},
        'ug7': () => {return 'ug7'},
        'ug8': () => {return 'ug8'},
        'ug9': () => {return 'ug9'},
        'lib': (id) => {return id.slice(4, -2)}
    };

    const func = keywordToGroup[apId.slice(4, 7)];
    if(R.isNil(func)) return null;
    return func(apId);

};

module.exports = assignApGroup;