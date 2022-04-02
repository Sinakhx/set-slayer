class SmartSet<T> extends Set<T> {
    /**
     * if set to true, automatically adds new elements to the globalSet on every set creation
     */
    static autoGlobals: boolean = false;

    private static _globalSet: SmartSet<any> | Set<any> | undefined;

    /**
     * @returns global set as the reference set
     */
    get globalSet(): SmartSet<T> {
        return new SmartSet(SmartSet._globalSet ? Array.from(SmartSet._globalSet) : []);
    }

    /**
     * @returns global set as the reference set
     */
    set globalSet(set: SmartSet<T>) {
        SmartSet._globalSet = new Set(set.elements);
    }

    constructor(...elements: any[]) {
        super(...elements);
        if (!SmartSet.autoGlobals) {
            return;
        }
        if (!SmartSet._globalSet) {
            SmartSet._globalSet = new Set(this.elements);
        } else {
            for (const element of elements) {
                SmartSet._globalSet.add(element);
            }
        }
    }

    static from<T>(...args: Array<T | SmartSet<T> | Set<T>>): SmartSet<T> {
        const res = new SmartSet();
        for (const arg of args) {
            if (arg instanceof SmartSet || arg instanceof Set) {
                res.add(Array.from(arg));
            } else {
                res.add(arg);
            }
        }
        return res as SmartSet<T>;
    }

    get elements(): T[] {
        return Array.from(this.keys());
    }

    toArray(): T[] {
        return this.elements;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    isSingleton(): boolean {
        return this.size === 1;
    }

    contains = this.has;

    remove = this.delete;

    subtract = this.difference;

    forEach(callbackfn: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void {
        for (const key of this.keys()) {
            callbackfn.call(thisArg, key, key, this);
        }
    }

    map<U>(callbackfn: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U> {
        const res = [];
        for (const key of this.keys()) {
            res.push(callbackfn.call(thisArg, key, key, this));
        }
        return new SmartSet(res);
    }

    filter(callbackfn: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (callbackfn.call(thisArg, key, key, this)) {
                res.push(key);
                res.filter;
            }
        }
        return new SmartSet(res);
    }

    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U {
        let res = initialValue;
        for (const key of this.keys()) {
            res = callbackfn.call(this, res, key, key, this);
        }
        return res;
    }

    isSet(set: unknown): boolean {
        return set instanceof SmartSet || set instanceof Set;
    }

    clone(): SmartSet<T> {
        return new SmartSet(this.elements);
    }

    isSubsetOf(set: SmartSet<T>): boolean {
        for (const key of this.keys()) {
            if (!set.has(key)) return false;
        }
        return true;
    }

    isProperSubsetOf(set: SmartSet<T>): boolean {
        if (this.size >= set.size) return false;
        return this.isSubsetOf(set);
    }

    isSupersetOf(set: SmartSet<T>): boolean {
        return set.isSubsetOf(this);
    }

    isProperSupersetOf(set: SmartSet<T>): boolean {
        if (this.size <= set.size) return false;
        return this.isSupersetOf(set);
    }

    isDisjointOf(set: SmartSet<T>): boolean {
        for (const key of this.keys()) {
            if (set.has(key)) return false;
        }
        return true;
    }

    isEqualTo(set: SmartSet<T>): boolean {
        if (this.size !== set.size) return false;
        return this.isSubsetOf(set);
    }

    union(...sets: SmartSet<T>[]): SmartSet<T> {
        const arr = sets.reduce((res, set) => res.concat(set.elements), this.elements);
        return new SmartSet(arr);
    }

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

    difference(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (!set.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    // TODO: add support to more sets
    symmetricDifference(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (!set.has(key)) res.push(key);
        }
        for (const key of set.keys()) {
            if (!this.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    complement(set: SmartSet<T>): SmartSet<T> {
        return set.difference(this);
    }

    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]> {
        const res = [];
        for (const k1 of this.keys()) {
            for (const k2 of set.keys()) {
                res.push([k1, k2]);
            }
        }
        return new SmartSet(res) as unknown as SmartSet<[T, T]>;
    }

    powerSet(): SmartSet<SmartSet<T>> {
        const array = this.elements;
        const result: T[][] = [];

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

    subsets() {
        const self = this;
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

    subsetsCount(): number {
        return 2 ** this.size;
    }
}

export default SmartSet;
