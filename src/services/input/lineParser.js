/**
 * Created by felyciagunawan on 20/11/2017.
 */

const R = require('ramda');
const logger = require('../../utils/logger');

const lineParser = (line, timestamp) => {
    const linePattern = new RegExp(/(\S+), *(\S+), *(\S+), *(\S+),/);
    const match = line.match(linePattern);

    const handleInvalidLine = () => {
        logger.warn(`Invalid input line: "${line}"`);
        return null;
    };

    const transform = group => {
        return {
            MAC_id: group[1],
            IP_address: group[2],
            AP_id: group[3],
            AP_group: null,
            timestamp
        }
    };

    return R.isNil(match) ? handleInvalidLine() : transform(match);
};

module.exports = lineParser;