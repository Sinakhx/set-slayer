import SmartSet from '../lib/setSlayer';

describe("A suite for the Set-Slayer's SmartSet API", () => {
    describe('size: the number of elements in a set can be obtained with a single getter', () => {
        it('size of empty set', () => {
            const actual = new SmartSet().size;
            const expected = 0;
            expect(actual).toBe(expected);
        });

        it('size of non-empty set', () => {
            const actual = new SmartSet([1, 2, 3]).size;
            const expected = 3;
            expect(actual).toBe(expected);
        });
    });
    describe('elements & toArray: the set elements can be returned as an array', () => {
        it('elements of empty set', () => {
            const set = new SmartSet();
            const expected: any[] = [];
            expect(set.elements).toEqual(expected);
            expect(set.toArray()).toEqual(expected);
        });

        it('elements of non-empty set', () => {
            const set = new SmartSet([1, 2, 3]);
            const expected = [1, 2, 3];
            expect(set.elements).toEqual(expected);
            expect(set.toArray()).toEqual(expected);
        });

        it('elements of set with duplicate elements', () => {
            const set = new SmartSet([1, 2, 2, 3, 3]);
            const expected = [1, 2, 3];
            expect(set.elements).toEqual(expected);
            expect(set.toArray()).toEqual(expected);
        });
    });
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
    describe('isSingleton: returns true if the set contains only one element', () => {
        it('should return false if there are no elements', () => {
            const actual = new SmartSet().isSingleton();
            expect(actual).toBe(false);
        });

        it('should return true if there is only one element', () => {
            const actual = new SmartSet([1]).isSingleton();
            expect(actual).toBe(true);
        });

        it('should return flase if there are more than one elements', () => {
            const actual = new SmartSet([1, 2, 3]).isSingleton();
            expect(actual).toBe(false);
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
    describe('add: unique elements can be added to a set', () => {
        it('add to empty set', () => {
            const actual = new SmartSet().add(3);
            const expected = new SmartSet([3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('add to non-empty set', () => {
            const actual = new SmartSet([1, 2, 4]).add(3);
            const expected = new SmartSet([1, 2, 3, 4]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('adding an existing element does not change the set', () => {
            const actual = new SmartSet([1, 2, 3]).add(3);
            const expected = new SmartSet([1, 2, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });
    describe('delete (aka remove): elements can be removed from a set', () => {
        it('remove from empty set', () => {
            const actual = new SmartSet();
            actual.remove(12);
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('remove from non-empty set', () => {
            const actual = new SmartSet([1, 2, 4]);
            actual.remove(2);
            let expected = new SmartSet([1, 4]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
            actual.delete(4);
            expected = new SmartSet([1]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('removing a non-existing element does not change the set', () => {
            const actual = new SmartSet([1, 2, 3]);
            actual.remove(4);
            const expected = new SmartSet([1, 2, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });
    describe('clear: all elements can be removed from a set with a single method', () => {
        it('clear an empty set', () => {
            const actual = new SmartSet();
            actual.clear();
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('clear a non-empty set', () => {
            const actual = new SmartSet([1, 2, 4]);
            actual.clear();
            let expected = new SmartSet([]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });
    describe('difference (aka subtract) of a set is a set of all elements that are only in the first set', () => {
        it('difference of two empty sets is an empty set', () => {
            const actual = new SmartSet().difference(new SmartSet());
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();

            const subtracted = new SmartSet().subtract(new SmartSet());
            expect(subtracted.isEqualTo(expected)).toBeTruthy();
        });

        it('difference of empty set and non-empty set is an empty set', () => {
            const actual = new SmartSet().difference(new SmartSet([3, 2, 5]));
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();

            const subtracted = new SmartSet().subtract(new SmartSet([3, 2, 5]));
            expect(subtracted.isEqualTo(expected)).toBeTruthy();
        });

        it('difference of a non-empty set and an empty set is the non-empty set', () => {
            const actual = new SmartSet([1, 2, 3, 4]).difference(new SmartSet());
            const expected = new SmartSet([1, 2, 3, 4]);
            expect(actual.isEqualTo(expected)).toBeTruthy();

            const subtracted = new SmartSet([1, 2, 3, 4]).subtract(new SmartSet());
            expect(subtracted.isEqualTo(expected)).toBeTruthy();
        });

        it('difference of two non-empty sets is a set of elements that are only in the first set', () => {
            const actual = new SmartSet([3, 2, 1]).difference(new SmartSet([2, 4]));
            const expected = new SmartSet([1, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();

            const subtracted = new SmartSet([3, 2, 1]).subtract(new SmartSet([2, 4]));
            expect(subtracted.isEqualTo(expected)).toBeTruthy();
        });
    });
    describe('intersection: returns a set of all shared elements', () => {
        it('intersection of two empty sets is an empty set', () => {
            const actual = new SmartSet().intersection(new SmartSet());
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('intersection of an empty set and non-empty set is an empty set', () => {
            const actual = new SmartSet().intersection(new SmartSet([3, 2, 5]));
            const expected = new SmartSet([]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('intersection of a non-empty set and an empty set is an empty set', () => {
            const actual = new SmartSet([1, 2, 3, 4]).intersection(new SmartSet([]));
            const expected = new SmartSet([]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('intersection of two sets with no shared elements is an empty set', () => {
            const actual = new SmartSet([1, 2, 3]).intersection(new SmartSet([4, 5, 6]));
            const expected = new SmartSet([]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('intersection of two sets with shared elements is a set of the shared elements', () => {
            const actual = new SmartSet([1, 2, 3, 4]).intersection(new SmartSet([3, 2, 5]));
            const expected = new SmartSet([2, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });
    describe('union: returns a set of all elements in either set', () => {
        it('union of empty sets is an empty set', () => {
            const actual = new SmartSet().union(new SmartSet());
            const expected = new SmartSet();
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('union of an empty set and non-empty set is the non-empty set', () => {
            const actual = new SmartSet().union(new SmartSet([2]));
            const expected = new SmartSet([2]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('union of a non-empty set and empty set is the non-empty set', () => {
            const actual = new SmartSet([1, 3]).union(new SmartSet());
            const expected = new SmartSet([1, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('union of non-empty sets contains all unique elements', () => {
            const actual = new SmartSet([1, 3]).union(new SmartSet([2, 3]));
            const expected = new SmartSet([1, 2, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('union of two sets with no shared elements is a set of all elements', () => {
            const actual = new SmartSet([1, 3]).union(new SmartSet([2, 4]));
            const expected = new SmartSet([1, 2, 3, 4]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('union of multiple sets can be supported by a single method call', () => {
            const setA = new SmartSet([1, 2, 3]);
            const setB = new SmartSet([3, 4, 5]);
            const setC = new SmartSet([5, 6, 7]);
            const actual = setA.union(setB, setC);
            const expected = new SmartSet([1, 2, 3, 4, 5, 6, 7]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });
    // describe('from: creates a SmartSet based on given arguments', () => {
    //     it('from an empty array returns an empty set', () => {
    //         const actual = SmartSet.from();
    //         const expected = new SmartSet([]);
    //         expect(actual.isEqualTo(expected)).toBeTruthy();
    //     });

    //     it('from an array of numbers with duplicates returns a set of the unique numbers', () => {
    //         const actual = SmartSet.from(1, 2, 3, 3, 2, 1);
    //         const expected = new SmartSet([1, 2, 3]);
    //         expect(actual.isEqualTo(expected)).toBeTruthy();
    //     });
    // });
});
