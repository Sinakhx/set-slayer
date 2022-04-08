class SmartSet<T> extends Set<T> {
    /**
     * if set to true, automatically adds new elements to the globalSet on every set creation
     */
    static autoGlobals: boolean = false;

    /**
     * DO NOT TOUCH THIS PROPERTY
     */
    private static _globalSet: Set<any> | undefined;

    /**
     * @returns global set as the reference set
     */
    static get globalSet(): SmartSet<unknown> {
        const prevState = SmartSet.autoGlobals;
        const setAutoGlobals = (v: boolean) => {
            SmartSet.autoGlobals = v;
        };
        setAutoGlobals(false); // to prevent infinite recursion on new SmartSet instantiations
        const s = new SmartSet(SmartSet._globalSet ? Array.from(SmartSet._globalSet.keys()) : []);
        setAutoGlobals(prevState);
        return s;
    }

    /**
     * @returns global set as the reference set
     */
    static set globalSet(set: SmartSet<unknown>) {
        SmartSet._globalSet = new Set(set.elements);
    }

    /**
     * adds new elements to the global set
     * @param elements elements to be added to the global set
     * @returns global set as the reference set
     */
    static extendGlobalSet(elements: any[]) {
        if (!SmartSet._globalSet) {
            SmartSet._globalSet = new Set();
        }
        for (const element of elements) {
            SmartSet._globalSet.add(element);
        }
    }

    /**
     * removes all elements from the global set
     */
    static clearGlobalSet() {
        SmartSet._globalSet = undefined;
    }

    constructor(...elements: any[]) {
        super(...elements);
        if (!SmartSet.autoGlobals) {
            return;
        }
        if (!SmartSet._globalSet) {
            SmartSet._globalSet = new Set(Array.from(super.values()));
        }
        SmartSet.extendGlobalSet(elements[0]);
    }

    /**
     * creates a new set from the given arguments (flattens Sets & Arrays one level deep)
     * @param args set elements
     * @returns a new set with the given elements
     */
    static from<T extends any>(...args: Array<T | T[] | SmartSet<T> | Set<T>>): SmartSet<T> {
        const res = new SmartSet();
        for (const arg of args) {
            if (Array.isArray(arg)) {
                for (const element of arg) {
                    res.add(element);
                }
            } else if (arg instanceof SmartSet || arg instanceof Set) {
                for (const element of arg.keys()) {
                    res.add(element);
                }
            } else {
                res.add(arg);
            }
        }
        return res as SmartSet<T>;
    }

    /**
     * @returns array representation of the set
     */
    get elements(): T[] {
        return Array.from(this.keys());
    }

    /**
     * @returns the number of elements in this set (|A| or #A)
     */
    get cardinality(): number {
        return this.size;
    }

    /**
     * adds a new element to the set
     * - if the `autoGlobals` property is set to true, automatically adds the element to the global set as well
     * @param value element to be added to the set
     * @returns the set itself
     */
    override add(value: T): this {
        if (SmartSet.autoGlobals && SmartSet._globalSet) {
            SmartSet._globalSet.add(value);
        }
        super.add(value);
        return this;
    }

    /**
     * extends the set with the elements from the argument sets/arrays
     * @param from source set or array
     * @returns this set
     */
    extends(...from: Array<SmartSet<T> | Set<T> | T[]>): this {
        for (const arg of from) {
            const arr = Array.isArray(arg) ? arg : Array.from(arg.keys());
            for (const element of arr) {
                this.add(element);
            }
        }
        return this;
    }

    /**
     * @returns array representation of the set
     */
    toArray(): T[] {
        return this.elements;
    }

    /**
     * @returns true if the set is empty
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * @returns true if the set has only one element
     */
    isSingleton(): boolean {
        return this.size === 1;
    }

    /**
     * alias of `has`
     * @returns true if the set contains an element
     */
    contains = this.has;

    /**
     * alias of `clone`
     * @returns a copy of the current set
     */
    copy = this.clone;

    /**
     * alias of `delete`
     * - deletes an element from the set
     * @returns true if the element removal is successful
     */
    remove = this.delete;

    /**
     * alias of `difference`
     * @returns all elements in the set except those in the argument set
     */
    subtract = this.difference;

    /**
     * @returns a random element from the current set
     */
    random(): T {
        return this.elements[Math.floor(Math.random() * this.size)];
    }

    /**
     * stringifies the set
     * @param delimiter arbitrary seperator between set elements (default: ', ')
     * @returns string representation of the set
     */
    stringify(delimiter: string = ', '): string {
        const fn = (elem: any, del = delimiter, rawResult: number = 0) => {
            const res = elem.elements
                .map((el: any) => {
                    if (el instanceof SmartSet) {
                        return `{ ${fn(el, del, 1)} }`;
                    }
                    return JSON.stringify(el);
                })
                .sort()
                .join(delimiter);
            if (rawResult) {
                return res;
            }
            return res ? `{ ${res} }` : '{}';
        };
        return fn(this);
    }

    /**
     * Performs the specified action for each element in the set.
     * @param callbackfn — A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void {
        for (const key of this.keys()) {
            callbackfn.call(thisArg, key, key, this);
        }
    }

    /**
     * Calls a defined callback function on each element of the set, and returns a new set that contains the results.
     * @param callbackfn — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(callbackfn: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U> {
        const res = [];
        for (const key of this.keys()) {
            res.push(callbackfn.call(thisArg, key, key, this));
        }
        return new SmartSet(res);
    }

    /**
     * Returns the elements of the set that meet the condition specified in a callback function.
     * @param callbackfn — A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the set.
     * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (callbackfn.call(thisArg, key, key, this)) {
                res.push(key);
            }
        }
        return new SmartSet(res);
    }

    /**
     * Calls the specified callback function for all the elements in the set. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn — A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the set.
     * @param initialValue — If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a set value.
     */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U {
        let res = initialValue;
        for (const key of this.keys()) {
            res = callbackfn.call(this, res, key, key, this);
        }
        return res;
    }

    /**
     * checks if the given argument is a set
     * @param set value to be checked
     */
    static isSet(set: unknown): boolean {
        return set instanceof SmartSet || set instanceof Set;
    }

    /**
     * @returns a copy of the current set
     */
    clone(): SmartSet<T> {
        return new SmartSet(this.elements);
    }

    /**
     * checks if this set is a subset of the argument set (all elements in this set being present in the other set) (A ⊆ B)
     * @param set parent set to be referenced
     * @returns true if the set is a subset of the argument set
     */
    isSubsetOf(set: SmartSet<T>): boolean {
        for (const key of this.keys()) {
            if (!set.has(key)) return false;
        }
        return true;
    }

    /**
     * checks if this set is a proper subset of the argument set (all elements in this set being present in the other set but the sets should not be equal) (A ⊂ B)
     * @param set parent set to be referenced
     * @returns true if the set is a proper subset of the argument set
     */
    isProperSubsetOf(set: SmartSet<T>): boolean {
        if (this.size >= set.size) return false;
        return this.isSubsetOf(set);
    }

    /**
     * checks if this set is a superset of the argument set (all elements in the argument set being present in this set) (A ⊇ B)
     * @param set child set to be referenced
     * @returns true if the set is a superset of the argument set
     */
    isSupersetOf(set: SmartSet<T>): boolean {
        return set.isSubsetOf(this);
    }

    /**
     * checks if this set is a proper superset of the argument set (all elements in the argument set being present in this set but the sets should not be equal) (A ⊃ B)
     * @param set child set to be referenced
     * @returns true if the set is a proper superset of the argument set
     */
    isProperSupersetOf(set: SmartSet<T>): boolean {
        if (this.size <= set.size) return false;
        return this.isSupersetOf(set);
    }

    /**
     * checks if this set has no common elements with the argument set (A ∩ B = ∅)
     * @param set set to be checked against
     * @returns true if the two sets have no common elements
     */
    isDisjointOf(set: SmartSet<T>): boolean {
        for (const key of this.keys()) {
            if (set.has(key)) return false;
        }
        return true;
    }

    /**
     * checks if two sets are equal (A = B)
     * @param set to be compared against
     * @returns true if the two sets have the same size & the same elements
     */
    isEqualTo(set: SmartSet<T>): boolean {
        if (this.size !== set.size) return false;
        return this.isSubsetOf(set);
    }

    /**
     * creates a set of the union of this set and the argument sets (A ∪ B ∪ ...)
     * @param sets sets to be joined
     * @returns a new set containing all the elements of the argument sets
     */
    union(...sets: SmartSet<T>[]): SmartSet<T> {
        const arr = sets.reduce((res, set) => res.concat(set.elements), this.elements);
        return new SmartSet(arr);
    }

    /**
     * creates a set of all common elements between this set and the argument sets (A ∩ B ∩ ...)
     * @param sets sets to be intersected
     * @returns a new set containing all the common elements of the argument sets
     */
    intersection(...sets: SmartSet<T>[]): SmartSet<T> {
        let res = this.elements;
        for (const set of sets) {
            const temp = [];
            for (const key of res) {
                if (set.has(key)) temp.push(key);
            }
            res = temp;
        }
        return new SmartSet(res);
    }

    /**
     * creates a set of elements that are in this set but not in the argument set (A - B) or (A \ B)
     * @param set set to be differenced from
     * @returns a new set containing all the elements of this set that are not present in the argument set
     */
    difference(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (!set.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    /**
     * creates the symmetric difference of this set and the argument sets (A ∆ B ∆ ...)
     * @param sets sets to be differenced from
     * @returns the set of elements which are in either of the sets, but not in their intersection
     */
    symmetricDifference(...sets: SmartSet<T>[]): SmartSet<T> {
        const allSets = sets.concat(this);
        const symDiff2sets = (set1: SmartSet<T>, set2: SmartSet<T>): SmartSet<T> => {
            const res = [];
            for (const key of set1.keys()) {
                if (!set2.has(key)) res.push(key);
            }
            for (const key of set2.keys()) {
                if (!set1.has(key)) res.push(key);
            }
            return new SmartSet(res);
        };
        return allSets.reduce((res, set) => symDiff2sets(res, set), new SmartSet());
    }

    /**
     * returns the complement set of this set
     * @param globalset set to be considered as the global set
     * - if `autoGlobals` property is set to `true`, the default value is the union of all instantiated sets
     * @returns the complement of the current set based on the given global set
     */
    complement(globalset?: SmartSet<T>): SmartSet<T> {
        let set: SmartSet<T> = this;
        if (globalset) {
            return globalset.difference(this);
        }
        if (SmartSet.autoGlobals) {
            set = SmartSet.globalSet as SmartSet<T>;
        } else {
            throw new Error("autoGlobals is set to false. 'globalset' argument is required.");
        }
        return set.difference(this);
    }

    /**
     * The relative complement of A with respect to a set B is the set of elements in B that are not in A
     * @param set the set to compare with
     * @returns all elements in the argument set except those in this set
     */
    relativeComplement = this.difference;

    /**
     * creates Cartesian Product between two sets (A x B)
     * @param set the second set as the product multiplier
     * @returns a new set which contains pair results from the Cartesian Product of this set with the argument set
     */
    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]> {
        const res = [];
        for (const k1 of this.keys()) {
            for (const k2 of set.keys()) {
                res.push([k1, k2]);
            }
        }
        return new SmartSet(res) as unknown as SmartSet<[T, T]>;
    }

    /**
     * @returns a set of all possible subsets of the current set (note: this might ruin your app's performance on large sets)
     */
    powerSet(): SmartSet<SmartSet<T>> {
        const array = this.elements;
        const result: T[][] = [];
        // https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array/42774126#42774126
        const fork = (i: number, t: T[]) => {
            if (i === array.length) {
                result.push(t);
                return;
            }
            fork(i + 1, t.concat([array[i]]));
            fork(i + 1, t);
        };

        fork(0, []);
        return new SmartSet(result.map((x) => new SmartSet(x)));
    }

    /**
     * @returns an iterator which yields a subset of the current set on each next call (untill all subsets are provided)
     */
    subsets() {
        const self = this;
        // https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array/42773837#42773837
        return (function* subSets(array, offset): IterableIterator<Array<T>> {
            while (offset < array.length) {
                const first = array[offset++];
                for (const subset of subSets(array, offset)) {
                    subset.push(first);
                    yield subset;
                }
            }
            yield [];
        })(self.elements, 0);
    }

    /**
     * @returns the number of possible subsets of this set
     */
    subsetsCount(): number {
        return 2 ** this.size;
    }
}

export default SmartSet;
