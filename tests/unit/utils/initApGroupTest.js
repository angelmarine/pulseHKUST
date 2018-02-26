const chai = require('chai');
const expect = chai.expect;

describe('initApGroups',function(){
    it('should create and save AP groups',function(){
        const initApGroup = require('../../../src/database/utils/initApGroup.js');
        const expectPromise = initApGroup.initialize();
        expect(expectPromise.then).to.be.a('function');
    });
});
