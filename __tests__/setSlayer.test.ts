import SmartSet from '../lib/setSlayer';

describe("A suite for the Set-Slayer's SmartSet API", () => {
    describe('isEmpty: returns true if the set contains no elements', () => {
        it('should be empty if there are no elements', () => {
            const actual = new SmartSet().isEmpty();
            expect(actual).toBeTruthy();
        });

        it('should not be empty if there are some elements', () => {
            const actual = new SmartSet([1]).isEmpty();
            expect(actual).toBeFalsy();
        });
    });
    describe('contains (aka has): sets can report if they contain an element', () => {
        it('should contain nothing if set is empty', () => {
            const set = new SmartSet();
            expect(set.has(1)).toBeFalsy();
            expect(set.contains(1)).toBeFalsy();
        });

        it('should recognize the existing elements in the set', () => {
            const set = new SmartSet([1, 2, 3]);
            expect(set.has(1)).toBeTruthy();
            expect(set.contains(1)).toBeTruthy();
        });

        it('should not find any non-existing elements in the set', () => {
            const set = new SmartSet([1, 2, 3]);
            expect(set.has(4)).toBeFalsy();
            expect(set.contains(4)).toBeFalsy();
        });
    });
});
