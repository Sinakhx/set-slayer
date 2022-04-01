class SmartSet<T> extends Set<T> {
    get elements(): T[] {
        return Array.from(this.keys());
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

    toArray(): T[] {
        return this.elements;
    }

    from(...args: Array<T | SmartSet<T>>): SmartSet<T> {
        const res = new SmartSet();
        for (const arg of args) {
            if (arg instanceof SmartSet) {
                for (const key of arg.keys()) {
                    res.add(key);
                }
            } else {
                res.add(arg);
            }
        }
        return res as SmartSet<T>;
    }

    forEach(callback: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void {
        for (const key of this.keys()) {
            callback.call(thisArg, key, key, this);
        }
    }

    map<U>(callback: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U> {
        const res = [];
        for (const key of this.keys()) {
            res.push(callback.call(thisArg, key, key, this));
        }
        return new SmartSet(res);
    }

    filter(callback: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (callback.call(thisArg, key, key, this)) {
                res.push(key);
            }
        }
        return new SmartSet(res);
    }

    reduce<U>(callback: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U {
        let res = initialValue;
        for (const key of this.keys()) {
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
        for (const key of this.keys()) {
            if (!set.has(key)) return false;
        }
        return true;
    }

    isSupersetOf(set: SmartSet<T>): boolean {
        return set.isSubsetOf(this);
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

    union(set: SmartSet<T>): SmartSet<T> {
        return new SmartSet(Array.from(this.elements.concat(set.elements)));
    }

    intersection(set: SmartSet<T>): SmartSet<T> {
        const res = [];
        for (const key of this.keys()) {
            if (set.has(key)) res.push(key);
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
