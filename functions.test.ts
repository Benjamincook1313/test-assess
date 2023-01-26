const {shuffleArray} = require('./utils');

const testArr = [1,2,3,4,5,6,7,8,9];

describe('shuffleArray should', () => {
    it("Shuffle the array", () => {
        expect(shuffleArray(testArr)).not.toBe(testArr);
    });

    it("have the same length", () => {
        expect(shuffleArray(testArr).length).toEqual(testArr.length);
    });
})