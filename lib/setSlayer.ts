class SmartSet<T> {
    private set: Set<T>;

    constructor(initial: Array<T> = []) {
        this.set = new Set(initial);
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.set.keys();
    }

    [Symbol.toStringTag]: string = this.constructor.name;

    get size(): number {
        return this.set.size;
    }

    get elements(): T[] {
        return Array.from(this.set.keys());
    }

    valueOf(): SmartSet<T> {
        return this;
    }

    toString(): string {
        return `[object ${this.constructor.name}]`;
    }

    keys(): IterableIterator<T> {
        return this.set.keys();
    }

    values(): IterableIterator<T> {
        return this.set.values();
    }

    entries(): IterableIterator<[T, T]> {
        return this.set.entries();
    }

    isEmpty(): boolean {
        return this.set.size === 0;
    }

    contains = this.has;

    has(element: T): boolean {
        return this.set.has(element);
    }

    add(element: T): SmartSet<T> {
        this.set.add(element);
        return this;
    }

    remove = this.delete;

    delete(element: T): SmartSet<T> {
        this.set.delete(element);
        return this;
    }

    clear(): SmartSet<T> {
        this.set.clear();
        return this;
    }

    from(...args: Array<T | SmartSet<T>>): SmartSet<T> {
        const res = new SmartSet();
        for (const arg of args) {
            if (arg instanceof SmartSet) {
                for (const key of arg.set.keys()) {
                    res.add(key);
                }
            } else {
                res.add(arg);
            }
        }
        return res as SmartSet<T>;
    }

    forEach(callback: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void {
        for (const key of this.set.keys()) {
            callback.call(thisArg, key, key, this);
        }
    }

    map<U>(callback: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U> {
        const res = [];
        for (const key of this.set.keys()) {
            res.push(callback.call(thisArg, key, key, this));
        }
        return new SmartSet(res);
    }

    filter(callback: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T> {
        const res = [];
        for (const key of this.set.keys()) {
            if (callback.call(thisArg, key, key, this)) {
                res.push(key);
            }
        }
        return new SmartSet(res);
    }

    reduce<U>(callback: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U {
        let res = initialValue;
        for (const key of this.set.keys()) {
            res = callback.call(this, res, key, key, this);
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
        for (const key of this.set.keys()) {
            if (!set.has(key)) return false;
        }
        return true;
    }

    isSupersetOf(set: SmartSet<T>): boolean {
        return set.isSubsetOf(this);
    }

    isDisjointOf(set: SmartSet<T>): boolean {
        for (const key of this.set.keys()) {
            if (set.has(key)) return false;
        }
        return true;
    }

    isEqualTo(set: SmartSet<T>): boolean {
        if (this.set.size !== set.size) return false;
        return this.isSubsetOf(set);
    }

    union(set: SmartSet<T>): SmartSet<T> {
        return new SmartSet(Array.from(this.elements.concat(set.elements)));
    }

    intersection(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.set.keys()) {
            if (set.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    subtract = this.difference;

    difference(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.set.keys()) {
            if (!set.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    symmetricDifference(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.set.keys()) {
            if (!set.has(key)) res.push(key);
        }
        for (const key of set.set.keys()) {
            if (!this.has(key)) res.push(key);
        }
        return new SmartSet(res);
    }

    complement(set: SmartSet<T>): SmartSet<T> {
        return set.difference(this);
    }

    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]> {
        const res = [];
        for (const k1 of this.set.keys()) {
            for (const k2 of set.keys()) {
                res.push([k1, k2]);
            }
        }
        return new SmartSet(res) as unknown as SmartSet<[T, T]>;
    }

    powerSet(): SmartSet<SmartSet<T>> {
        const array = this.elements;
        const fork = (i: number, t: T[]) => {
            if (i === array.length) {
                result.push(t);
                return;
            }
            fork(i + 1, t.concat([array[i]]));
            fork(i + 1, t);
        };

        const result: T[][] = [];
        fork(0, []);
        return new SmartSet(result.map((x) => new SmartSet(x)));
    }

    subsets = function* subsets(this: SmartSet<T>, array = this.elements, offset = 0): IterableIterator<Array<T>> {
        while (offset < array.length) {
            let first = array[offset++];
            for (let subset of subsets.call(this, array, offset)) {
                subset.push(first);
                yield subset;
            }
        }
        yield [];
    };

    subsetsCount(): number {
        return 2 ** this.set.size;
    }
}

export default SmartSet;
