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

const getApGroupList = () => {
    return [
        "ctlg1",
        "ctlg5",
        "ctlg7",
        "lib1",
        "libg",
        "liblg1",
        "liblg3",
        "liblg4",
        "nor",
        "pg1",
        "pg2",
        "sou",
        "ug1",
        "ug2",
        "ug3",
        "ug4",
        "ug6",
        "ug7",
        "ug8",
        "ug9",
        "lib",
        "hall"
    ]
};

const getCompactList = () => {
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

const getBundlelist = () => {
    return {
        "lib" : ["lib1", "libg", "liblg1", "liblg3", "liblg4"],
        "hall" : ["pg1", "pg2", "ug1", "ug2", "ug3", "ug4", "ug6", "ug7", "ug8", "ug9"]
    }
};

module.exports = {assignApGroup, getApGroupList, getCompactList, getBundlelist};