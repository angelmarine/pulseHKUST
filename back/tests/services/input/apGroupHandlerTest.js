/**
 * Created by felyciagunawan on 22/2/2018.
 */

const should = require('chai').should();
const R = require('ramda');
const apGroupHandler = require('../../../src/services/input/apGroupHandler');
const assignApGroup = apGroupHandler.assignApGroup;

describe('apGroupHandler', function() {
    it('should return correct AP group if keyword matches', function() {
        const listOfApId = [
            't524ctlg701',
            't802ctlg103',
            't552southbus',
            't700norbri02',
            't252pg1033',
            't252pg2024',
            't142ug1023',
            't252ug2022',
            't601ug331',
            't252ug4012',
            't252ug6012',
            't252ug7032',
            't602ug80310',
            't602ug9g2',
            't142liblg121',
            't142liblg308',
            't142liblg403',
            't700libg05'
        ];
        const expected = [
            'ctlg7',
            'ctlg1',
            'sou',
            'nor',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'hall',
            'lib',
            'lib',
            'lib',
            'lib'
        ];

        const actual = R.map(assignApGroup, listOfApId);
        actual.should.deep.equal(expected);
    });

    it('should return null if keyword does not match', function() {
        const listOfNonMatchApId = [
            't142cplg501',
            't524cpze101',
            't700BG0012-2'
        ];
        const expected = [
            null,
            null,
            null
        ];
        const actual = R.map(assignApGroup, listOfNonMatchApId);
        actual.should.deep.equal(expected);
    });

});