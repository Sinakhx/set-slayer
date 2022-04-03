declare class SmartSet<T> extends Set<T> {
    /**
     * if set to true, automatically adds new elements to the globalSet on every set creation
     */
    static autoGlobals: boolean;
    private static _globalSet;
    /**
     * @returns global set as the reference set
     */
    get globalSet(): SmartSet<T>;
    /**
     * @returns global set as the reference set
     */
    set globalSet(set: SmartSet<T>);
    constructor(...elements: any[]);
    /**
     * creates a new set from the given arguments
     * @param args set elements
     * @returns a new set with the given elements
     */
    static from<T>(...args: Array<T | SmartSet<T> | Set<T>>): SmartSet<T>;
    /**
     * @returns array representation of the set
     */
    get elements(): T[];
    /**
     * @returns array representation of the set
     */
    toArray(): T[];
    /**
     * @returns true if the set is empty
     */
    isEmpty(): boolean;
    /**
     * @returns true if the set has only one element
     */
    isSingleton(): boolean;
    /**
     * alias of `has`
     * @returns true if the set contains an element
     */
    contains: (value: T) => boolean;
    /**
     * alias of `delete`
     * - deletes an element from the set
     * @returns true if the element removal is successful
     */
    remove: (value: T) => boolean;
    /**
     * alias of `difference`
     * @returns all elements in the set except those in the argument set
     */
    subtract: (set: SmartSet<T>) => SmartSet<T>;
    /**
     * Performs the specified action for each element in the set.
     * @param callbackfn — A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void;
    /**
     * Calls a defined callback function on each element of the set, and returns a new set that contains the results.
     * @param callbackfn — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(callbackfn: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U>;
    /**
     * Returns the elements of the set that meet the condition specified in a callback function.
     * @param callbackfn — A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T>;
    /**
     * Calls the specified callback function for all the elements in the set. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn — A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the set.
     * @param initialValue — If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a set value.
     */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U;
    /**
     * checks if the given argument is a set
     * @param set value to be checked
     */
    isSet(set: unknown): boolean;
    /**
     * @returns a copy of the current set
     */
    clone(): SmartSet<T>;
    /**
     * checks if this set is a subset of the argument set (all elements in this set being present in the other set) (A ⊆ B)
     * @param set parent set to be referenced
     * @returns true if the set is a subset of the argument set
     */
    isSubsetOf(set: SmartSet<T>): boolean;
    /**
     * checks if this set is a proper subset of the argument set (all elements in this set being present in the other set but the sets should not be equal) (A ⊂ B)
     * @param set parent set to be referenced
     * @returns true if the set is a proper subset of the argument set
     */
    isProperSubsetOf(set: SmartSet<T>): boolean;
    /**
     * checks if this set is a superset of the argument set (all elements in the argument set being present in this set) (A ⊇ B)
     * @param set child set to be referenced
     * @returns true if the set is a superset of the argument set
     */
    isSupersetOf(set: SmartSet<T>): boolean;
    /**
     * checks if this set is a proper superset of the argument set (all elements in the argument set being present in this set but the sets should not be equal) (A ⊃ B)
     * @param set child set to be referenced
     * @returns true if the set is a proper superset of the argument set
     */
    isProperSupersetOf(set: SmartSet<T>): boolean;
    /**
     * checks if this set has no common elements with the argument set (A ∩ B = ∅)
     * @param set set to be checked against
     * @returns true if the two sets have no common elements
     */
    isDisjointOf(set: SmartSet<T>): boolean;
    /**
     * checks if two sets are equal (A = B)
     * @param set to be compared against
     * @returns true if the two sets have the same size & the same elements
     */
    isEqualTo(set: SmartSet<T>): boolean;
    /**
     * creates a set of the union of this set and the argument sets (A ∪ B ∪ ...)
     * @param sets sets to be joined
     * @returns a new set containing all the elements of the argument sets
     */
    union(...sets: SmartSet<T>[]): SmartSet<T>;
    /**
     * creates a set of all common elements between this set and the argument sets (A ∩ B ∩ ...)
     * @param sets sets to be intersected
     * @returns a new set containing all the common elements of the argument sets
     */
    intersection(...sets: SmartSet<T>[]): SmartSet<T>;
    /**
     * creates a set of elements that are in this set but not in the argument set (A - B) or (A \ B)
     * @param set set to be differenced from
     * @returns a new set containing all the elements of this set that are not present in the argument set
     */
    difference(set: SmartSet<T>): SmartSet<T>;
    /**
     * creates the symmetric difference of this set and the argument sets (A ∆ B ∆ ...)
     * @param sets sets to be differenced from
     * @returns the set of elements which are in either of the sets, but not in their intersection
     */
    symmetricDifference(...sets: SmartSet<T>[]): SmartSet<T>;
    /**
     * returns the complement set of this set
     * @param global set to be considered as the global set
     * - if `autoGlobals` property is set to `true`, the default value is the union of all instantiated sets
     * @returns the complement of the current set based on the given global set
     */
    complement(global?: SmartSet<T>): SmartSet<T>;
    /**
     * creates Cartesian Product between two sets (A x B)
     * @param set the second set as the product multiplier
     * @returns a new set which contains pair results from the Cartesian Product of this set with the argument set
     */
    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]>;
    /**
     * @returns a set of all possible subsets of the current set (note: this might ruin your app's performance on large sets)
     */
    powerSet(): SmartSet<SmartSet<T>>;
    /**
     * @returns an iterator which yields a subset of the current set on each next call (untill all subsets are provided)
     */
    subsets(): IterableIterator<T[]>;
    /**
     * @returns the number of possible subsets of this set
     */
    subsetsCount(): number;
}

export { SmartSet as default };
