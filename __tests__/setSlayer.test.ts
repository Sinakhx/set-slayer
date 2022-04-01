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
    describe('isSubsetOf: a set is a subset if all of its elements are contained in the other set', () => {
        it('empty set is a subset of another empty set', () => {
            const actual = new SmartSet().isSubsetOf(new SmartSet());
            expect(actual).toBeTruthy();
        });

        it('empty set is a subset of non-empty set', () => {
            const actual = new SmartSet().isSubsetOf(new SmartSet([1]));
            expect(actual).toBeTruthy();
        });

        it('non-empty set is not a subset of empty set', () => {
            const actual = new SmartSet([1]).isSubsetOf(new SmartSet());
            expect(actual).toBeFalsy();
        });

        it('set is a subset of set with exact same elements', () => {
            const actual = new SmartSet([1, 2, 3]).isSubsetOf(new SmartSet([1, 2, 3]));
            expect(actual).toBeTruthy();
        });

        it('set is a subset of larger set with same elements', () => {
            const actual = new SmartSet([1, 2, 3]).isSubsetOf(new SmartSet([4, 1, 2, 3]));
            expect(actual).toBeTruthy();
        });

        it('set is not a subset of set that does not contain its elements', () => {
            const actual = new SmartSet([1, 2, 3]).isSubsetOf(new SmartSet([4, 1, 3]));
            expect(actual).toBeFalsy();
        });
    });
    describe('isDisjointOf: sets are disjoint if they share no elements', () => {
        it('the empty set is disjoint with itself', () => {
            const actual = new SmartSet().isDisjointOf(new SmartSet([]));
            expect(actual).toBeTruthy();
        });

        it('empty set is disjoint with non-empty set', () => {
            const actual = new SmartSet().isDisjointOf(new SmartSet([1]));
            expect(actual).toBeTruthy();
        });

        it('non-empty set is disjoint with empty set', () => {
            const actual = new SmartSet([1]).isDisjointOf(new SmartSet([]));
            expect(actual).toBeTruthy();
        });

        it('sets are not disjoint if they share an element', () => {
            const actual = new SmartSet([1, 2]).isDisjointOf(new SmartSet([2, 3]));
            expect(actual).toBeFalsy();
        });

        it('sets are disjoint if they share no elements', () => {
            const actual = new SmartSet([1, 2]).isDisjointOf(new SmartSet([3, 4]));
            expect(actual).toBeTruthy();
        });
    });
    describe('isEqualTo: sets with the same elements are equal', () => {
        it('empty sets are equal', () => {
            const actual = new SmartSet().isEqualTo(new SmartSet());
            expect(actual).toBeTruthy();
        });

        it('empty set is not equal to non-empty set', () => {
            const actual = new SmartSet().isEqualTo(new SmartSet([1, 2, 3]));
            expect(actual).toBeFalsy();
        });

        it('non-empty set is not equal to empty set', () => {
            const actual = new SmartSet([1, 2, 3]).isEqualTo(new SmartSet());
            expect(actual).toBeFalsy();
        });

        it('sets with the same elements are equal', () => {
            const actual = new SmartSet([1, 2]).isEqualTo(new SmartSet([2, 1]));
            expect(actual).toBeTruthy();
        });

        it('sets with different elements are not equal', () => {
            const actual = new SmartSet([1, 2, 3]).isEqualTo(new SmartSet([1, 2, 4]));
            expect(actual).toBeFalsy();
        });
    });
});
