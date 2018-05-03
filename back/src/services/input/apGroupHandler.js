const R = require('ramda');

const assignApGroup = (apId) => {
    const keywordToGroup = {
        'ctl': (id) => {return id.slice(4, -2)},
        'sou': () => {return 'sou'},
        'nor': () => {return 'nor'},
        'pg1': () => {return 'hall'},
        'pg2': () => {return 'hall'},
        'ug1': () => {return 'hall'},
        'ug2': () => {return 'hall'},
        'ug3': () => {return 'hall'},
        'ug4': () => {return 'hall'},
        'ug6': () => {return 'hall'},
        'ug7': () => {return 'hall'},
        'ug8': () => {return 'hall'},
        'ug9': () => {return 'hall'},
        'lib': () => {return 'lib'}
    };

    const func = keywordToGroup[apId.slice(4, 7)];
    if(R.isNil(func)) return null;
    return func(apId);

};

const getApGroupList = () => {
    return [
        "ctlg1",
        "ctlg5",
        "ctlg7",
        "nor",
        "sou",
        "lib",
        "hall"
    ]
};

module.exports = {assignApGroup, getApGroupList};