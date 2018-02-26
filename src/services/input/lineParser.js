/**
 * Created by felyciagunawan on 20/11/2017.
 */

const R = require('ramda');
const logger = require('../../utils/logger');
const assignApGroup = require('./apGroupHandler');

const lineParser = (line, timestamp) => {
    const linePattern = new RegExp(/(\S+), *(\S+), *(\S+), *(\S+),/);
    const match = line.match(linePattern);

    const handleInvalidLine = () => {
        logger.debug(`Invalid input line: "${line}"`);
        return null;
    };

    const transform = group => {
        const AP_id = group[3];
        const AP_group = assignApGroup(AP_id);

        if(AP_group === null) return null;
        return {
            MAC_id: group[1],
            AP_id,
            AP_group,
            timestamp
        }
    };

    return R.isNil(match) ? handleInvalidLine() : transform(match);
};

module.exports = lineParser;