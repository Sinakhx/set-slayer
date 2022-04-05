import SmartSet from '../lib/setSlayer';

describe("A suite for the Set-Slayer's SmartSet API", () => {
    describe('native set funtionalities', () => {
        it('should support unoverridden native methods', () => {
            const set = new SmartSet([1, 2, 3]);
            const keys = [...set.keys()];
            expect(keys).toEqual([1, 2, 3]);

            const entries = [...set.entries()];
            expect(entries).toEqual([
                [1, 1],
                [2, 2],
                [3, 3],
            ]);

            expect(typeof set['hasOwnProperty']).toBe('function');

            const setFromString = new SmartSet('Free fire');
            const smartSetFromString = new SmartSet('Free fire');
            expect(Array.from(setFromString.keys()).sort()).toEqual(['F', 'r', 'e', ' ', 'f', 'i'].sort());
            expect([...setFromString.keys()]).toEqual([...smartSetFromString.keys()]);
        });

        it('should behave as the native set except for the "add" method', () => {
            const set = new Set([1, 2, 3]);
            const smartSet = new SmartSet([1, 2, 3]);
            expect(set.size).toBe(smartSet.size);
            expect(set.has(1)).toBe(smartSet.has(1));
            expect(set.delete(2)).toBe(smartSet.delete(2));
            expect(set.add(4)).not.toBe(smartSet.add(4));
        });
    });

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

    describe('clone (aka copy): returns a copy of the set', () => {
        it('should return an empty set if the set is empty', () => {
            const main = new SmartSet();
            const clone = main.clone();
            expect(clone).not.toBe(main);
            expect(clone.size).toBe(0);
            expect(clone.elements).toEqual([]);
            main.add(1);
            main.add(2);
            clone.add(3);
            expect(clone.elements).not.toEqual(main.elements);
            expect(main.elements).toEqual([1, 2]);
            expect(clone.elements).toEqual([3]);
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

        it('adding a new element when "autoGlobals" is set to true, adds it to the globalSet as well', () => {
            SmartSet.autoGlobals = true;
            const actual = new SmartSet([1, 2, 3]).add(4);
            const expected = new SmartSet([1, 2, 3, 4]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
            expect(SmartSet.globalSet.isEqualTo(expected)).toBeTruthy();
            SmartSet.autoGlobals = false;
            SmartSet.clearGlobalSet();
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

    describe('random: returns a random element from the set', () => {
        it('random element from empty set', () => {
            const actual = new SmartSet().random();
            expect(actual).toBeUndefined();
        });

        it('random element from non-empty set', () => {
            const set = new SmartSet([1, 2, 3]);
            for (let i = 0; i < 20; i++) {
                const rand = set.random();
                expect(set.contains(rand)).toBe(true);
            }
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

        it('intersection of multiple sets can be supported by a single method call', () => {
            const setA = new SmartSet([1, 2, 3]);
            const setB = new SmartSet([3, 4, 5]);
            const setC = new SmartSet([5, 6, 7]);
            const actual1 = setA.intersection(setB, setC);
            const expected1 = new SmartSet([]);
            expect(actual1.isEqualTo(expected1)).toBeTruthy();

            const setD = new SmartSet([3, 6, 7]);
            const actual2 = setA.intersection(setB, setD);
            const expected2 = new SmartSet([3]);
            expect(actual2.isEqualTo(expected2)).toBeTruthy();
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

    describe('from: creates a SmartSet based on given arguments', () => {
        it('from an empty array returns an empty set', () => {
            const actual = SmartSet.from();
            const expected = new SmartSet([]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('from an array of numbers with duplicates returns a set of the unique numbers', () => {
            const actual = SmartSet.from(1, 2, 3, 3, 2, 1);
            const expected: SmartSet<number> = new SmartSet([1, 2, 3]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('flattens Array arguments', () => {
            const actual = SmartSet.from([1, 2, 3], [4, 5, 6]);
            const expected: SmartSet<number> = new SmartSet([1, 2, 3, 4, 5, 6]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('flattens Set & SmartSet arguments', () => {
            const actual = SmartSet.from(new Set([1, 2, 3]), new SmartSet([4, 5, 6]));
            const expected: SmartSet<number> = new SmartSet([1, 2, 3, 4, 5, 6]);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });

        it('flattens Set, SmartSet, Array arguments & handles Numbers as members', () => {
            const actual = SmartSet.from(new Set([1, 2, 3]), new SmartSet([4, 5, 6]), [7, 8, 9], 10, 11);
            const expected: SmartSet<number> = new SmartSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            expect(actual.elements).toEqual(expected.elements);
            expect(actual.isEqualTo(expected)).toBeTruthy();
        });
    });

    describe('cardinality', () => {
        it('cardinality of an empty set is 0', () => {
            const actual = new SmartSet().cardinality;
            const expected = 0;
            expect(actual).toEqual(expected);
        });

        it('cardinality of a non-empty set is the number of elements', () => {
            const actual = new SmartSet([1, 2, 3]).cardinality;
            const expected = 3;
            expect(actual).toEqual(expected);
        });

        it('cardinality of a set with duplicate elements is the number of unique elements', () => {
            const actual = new SmartSet([1, 2, 3, 3, 2, 1]).cardinality;
            const expected = 3;
            expect(actual).toEqual(expected);
        });

        it('should obey carniality rules for disjoint sets: |A ∪ B| = |A| + |B|', () => {
            const setA = new SmartSet([1, 2, 3]);
            const setB = new SmartSet([4, 5, 6]);
            const actual = setA.union(setB).cardinality;
            const expected = setA.cardinality + setB.cardinality;
            expect(actual).toEqual(expected);
        });

        it('should obey carniality rules for unions and intersections: |C ∪ D| + |C ∩ D| = |C| + |D|', () => {
            const setC = new SmartSet([1, 2, 3]);
            const setD = new SmartSet([4, 5, 6]);
            const actual = setC.union(setD).cardinality + setC.intersection(setD).cardinality;
            const expected = setC.cardinality + setD.cardinality;
            expect(actual).toEqual(expected);
        });
    });

    describe('DeMorgan’s Laws', () => {
        it('A’ ∩ B’ = (A ∪ B)’', () => {
            const globalSet = new SmartSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            const setA = new SmartSet([1, 2, 3]);
            const setB = new SmartSet([4, 5, 6]);
            const actual = setA.complement(globalSet).intersection(setB.complement(globalSet));
            const expected = setA.union(setB).complement(globalSet);
            expect(actual.elements.sort()).toEqual(expected.elements.sort());
        });

        it('A’ ∪ B’ = (A ∩ B)’', () => {
            const globalSet = new SmartSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            const setA = new SmartSet([1, 2, 3]);
            const setB = new SmartSet([4, 5, 6]);
            const Ac = setA.complement(globalSet);
            const Bc = setB.complement(globalSet);
            const AB = setA.intersection(setB);
            const left = Ac.union(Bc).elements.sort();
            const right = AB.complement(globalSet).elements.sort();
            expect(left).toEqual(right);
        });
    });

    describe('powerSets & subsetsCount', () => {
        it('powerSets of an empty set is an empty set', () => {
            const actual = new SmartSet().powerSet(); // -> should be: { ∅ }
            expect(actual.cardinality).toEqual(1);

            const elements = actual.elements; // -> [ ∅ ]
            expect(elements.length).toEqual(1);

            const emptySet = elements[0]; // ->  ∅
            expect(emptySet).toBeInstanceOf(SmartSet);
            expect(emptySet.cardinality).toEqual(0);
        });

        it('powerSets of a non-empty set is the set of all subsets', () => {
            const actual = new SmartSet([1, 2, 3]).powerSet();
            const expected: SmartSet<SmartSet<number>> = new SmartSet([
                new SmartSet([]),
                new SmartSet([1]),
                new SmartSet([2]),
                new SmartSet([3]),
                new SmartSet([1, 2]),
                new SmartSet([1, 3]),
                new SmartSet([2, 3]),
                new SmartSet([1, 2, 3]),
            ]);
            const actualToStr = actual.elements
                .map((set) => set.elements.sort())
                .sort()
                .reduce((acc, curr) => {
                    acc = acc + '-' + curr.join('');
                    return acc;
                }, '');
            const expectedToStr = expected.elements
                .map((set) => set.elements.sort())
                .sort()
                .reduce((acc, curr) => {
                    acc = acc + '-' + curr.join('');
                    return acc;
                }, '');
            expect(actualToStr).toBe(expectedToStr);
        });

        it('subsetsCount of an empty set is 1', () => {
            const actual = new SmartSet().subsetsCount();
            const expected = 1;
            expect(actual).toEqual(expected);
        });

        it('subsetsCount of a non-empty set is the number of subsets', () => {
            const actual = new SmartSet([1, 2, 3]).subsetsCount();
            const expected = 8;
            expect(actual).toEqual(expected);
        });

        it('subsetsCount of a set with duplicate elements is the number of unique subsets', () => {
            const actual = new SmartSet([1, 2, 3, 3, 2, 1]).subsetsCount();
            const expected = 8;
            expect(actual).toEqual(expected);
        });

        it('powerSets count should match the subsetsCount', () => {
            const set = new SmartSet([0, 1, 2, 3, 4, 5, 6]);
            const actual = set.powerSet().cardinality;
            const expected = set.subsetsCount();
            expect(actual).toEqual(expected);
        });
    });

    describe('relativeComplement relations with symmetricDifference', () => {
        it('A ∆ B = (A | B) ∪ (B | A)', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const AdeltaB = A.symmetricDifference(B);
            const ArelativeToB = A.relativeComplement(B);
            const BrelativeToA = B.relativeComplement(A);
            const right = ArelativeToB.union(BrelativeToA);
            expect(AdeltaB.elements.sort()).toEqual(right.elements.sort());
        });

        it('A ∆ B = (A ∪ B) | (A ∩ B)', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const AdeltaB = A.symmetricDifference(B);
            const AuB = A.union(B);
            const AnB = A.intersection(B);
            const right = AuB.relativeComplement(AnB);
            expect(AdeltaB.elements.sort()).toEqual(right.elements.sort());
        });

        it('A ∆ B = B ∆ A', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const AdeltaB = A.symmetricDifference(B);
            const BdeltaA = B.symmetricDifference(A);
            expect(AdeltaB.elements.sort()).toEqual(BdeltaA.elements.sort());
        });

        it('A ∪ B = (A ∆ B) ∆ (A ∩ B)', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const AuB = A.union(B);
            const AdeltaB = A.symmetricDifference(B);
            const AnB = A.intersection(B);
            const right = AdeltaB.symmetricDifference(AnB);
            expect(AuB.elements.sort()).toEqual(right.elements.sort());
        });

        it('(A ∆ B) ∆ C = A ∆ (B ∆ C)', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const C = new SmartSet([1, 3, 5, 8]);
            const AdeltaB = A.symmetricDifference(B);
            const BdeltaC = B.symmetricDifference(C);
            const left = AdeltaB.symmetricDifference(C);
            const right = A.symmetricDifference(BdeltaC);
            expect(left.elements.sort()).toEqual(right.elements.sort());
        });

        it('(A ∆ B) ∆ (B ∆ C) = A ∆ C', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const C = new SmartSet([1, 3, 5, 8]);
            const AdeltaB = A.symmetricDifference(B);
            const BdeltaC = B.symmetricDifference(C);
            const left = AdeltaB.symmetricDifference(BdeltaC);
            const right = A.symmetricDifference(C);
            expect(left.elements.sort()).toEqual(right.elements.sort());
        });

        it('A ∩ (B ∆ C) = (A ∩ B) ∆ (A ∩ C)', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([3, 4, 5, 6]);
            const C = new SmartSet([1, 3, 5, 8]);
            const AnB = A.intersection(B);
            const AnC = A.intersection(C);
            const BdeltaC = B.symmetricDifference(C);
            const left = A.intersection(BdeltaC);
            const right = AnB.symmetricDifference(AnC);
            expect(left.elements.sort()).toEqual(right.elements.sort());
        });

        it('A ∆ ∅ = A', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const emptySet = new SmartSet();
            const AdeltaEmptySet = A.symmetricDifference(emptySet);
            expect(AdeltaEmptySet.elements.sort()).toEqual(A.elements.sort());
        });

        it('A ∆ A = ∅', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const AdeltaA = A.symmetricDifference(A);
            expect(AdeltaA.elements.sort()).toEqual([]);
        });

        it('A ∆ B = ∅  <=> A = B', () => {
            const A = new SmartSet([1, 2, 3, 4]);
            const B = new SmartSet([1, 2, 3, 4]);
            const left = A.symmetricDifference(B).isEmpty();
            const right = A.isEqualTo(B);
            expect(left).toBe(right);
        });
    });

    describe('globals', () => {
        beforeEach(() => {
            SmartSet.autoGlobals = true;
        });

        afterEach(() => {
            SmartSet.autoGlobals = false;
            SmartSet.clearGlobalSet();
        });

        it('should return an empty set if no new sets are instantiated', () => {
            expect(SmartSet.globalSet.isEmpty()).toBe(true);
        });

        it('should throw for extending globals if "autoGlobals" is inactive', () => {
            SmartSet.autoGlobals = false;
            expect(() => {
                SmartSet.extendGlobalSet([1, 2, 3, 4]);
            }).toThrow();
        });

        it('should clearGlobalSet', () => {
            const A = new SmartSet([3, 4, 5, 6]);
            expect(SmartSet.globalSet.has(5)).toBe(true);
            expect(SmartSet.globalSet.elements.sort()).toEqual(A.elements.sort());
            SmartSet.clearGlobalSet();
            expect(SmartSet.globalSet.isEmpty()).toBe(true);
        });

        it('should automatically add new set members to the global set', () => {
            const A = new SmartSet([3, 4, 5, 6]);
            expect(SmartSet.globalSet.has(5)).toBe(true);
            expect(SmartSet.globalSet.elements.sort()).toEqual(A.elements.sort());
            const B = new SmartSet([1, 2, 3, 4]);
            expect(SmartSet.globalSet.has(1)).toBe(true);
            expect(SmartSet.globalSet.elements.sort()).toEqual(A.union(B).elements.sort());
        });

        it('should stop adding set members to the global set when "autoGlobals" is explicitly set to false', () => {
            new SmartSet([1, 2, 3, 4]);
            new SmartSet([3, 4, 5, 6]);
            expect(SmartSet.globalSet.elements.sort()).toEqual([1, 2, 3, 4, 5, 6]);
            SmartSet.autoGlobals = false;
            new SmartSet([7, 8, 9, 10]);
            new SmartSet([11, 12, 13, 14]);
            expect(SmartSet.globalSet.has(8)).toBe(false);
            expect(SmartSet.globalSet.elements.sort()).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('should add to the global set when extending it', () => {
            const A = new SmartSet([3, 4, 5, 6]);
            A.extends([7, 8, 9]);
            expect(SmartSet.globalSet.has(8)).toBe(true);
            expect(SmartSet.globalSet.elements.sort()).toEqual([3, 4, 5, 6, 7, 8, 9]);
        });

        describe('should obey complement laws', () => {
            it('A ∪ A’ = U', () => {
                const A = new SmartSet([1, 2, 3, 4]);
                const U = SmartSet.globalSet;
                expect(A.union(A.complement()).isEqualTo(U)).toBe(true);
            });

            it('U’ = ∅', () => {
                const U = SmartSet.globalSet;
                expect(U.complement().isEmpty()).toBe(true);
            });
        });
    });

    describe('extends', () => {
        it('should extend a set', () => {
            const A: SmartSet<number> = new SmartSet([1, 2, 3, 4]);
            A.extends([5, 6, 7, 8]);
            expect(A.elements.sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            const B: SmartSet<number> = new SmartSet([9, 10, 11, 12]);
            const C = new Set([13, 14, 15]);
            A.extends(B, C);
            expect(A.elements.sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        });
    });
});
