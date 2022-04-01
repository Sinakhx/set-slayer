import SmartSet from '../lib/setSlayer';

describe("A suite for the Set-Slayer's SmartSet API", () => {
    describe('empty: returns true if the set contains no elements', () => {
        it('sets with no elements are empty', () => {
            const actual = new SmartSet().isEmpty();
            expect(actual).toBeTruthy();
        });

        it('sets with elements are not empty', () => {
            const actual = new SmartSet([1]).isEmpty();
            expect(actual).toBeFalsy();
        });
    });
});
