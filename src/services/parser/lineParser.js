/**
 * Created by felyciagunawan on 20/11/2017.
 */

const R = require('ramda');

const lineParser = (line) => {
    const data = R.map(item => item.trim(), line.split(','));

    return {
        MAC_id: data[0],
        IP_address: data[1],
        AP_id: data[2],
        AP_group: null
    };
};

module.exports = lineParser;