declare class SmartSet<T> extends Set<T> {
    get elements(): T[];
    isEmpty(): boolean;
    isSingleton(): boolean;
    contains: (value: T) => boolean;
    remove: (value: T) => boolean;
    subtract: (set: SmartSet<T>) => SmartSet<T>;
    toArray(): T[];
    static from<T>(...args: Array<T | SmartSet<T> | Set<T>>): SmartSet<T>;
    forEach(callback: (value: T, key: T, set: SmartSet<T>) => void, thisArg?: any): void;
    map<U>(callback: (value: T, key: T, set: SmartSet<T>) => U, thisArg?: any): SmartSet<U>;
    filter(callback: (value: T, key: T, set: SmartSet<T>) => boolean, thisArg?: any): SmartSet<T>;
    reduce<U>(callback: (previousValue: U, currentValue: T, currentKey: T, set: SmartSet<T>) => U, initialValue: U): U;
    isSet(set: unknown): boolean;
    clone(): SmartSet<T>;
    isSubsetOf(set: SmartSet<T>): boolean;
    isSupersetOf(set: SmartSet<T>): boolean;
    isDisjointOf(set: SmartSet<T>): boolean;
    isEqualTo(set: SmartSet<T>): boolean;
    union(...set: SmartSet<T>[]): SmartSet<T>;
    intersection(set: SmartSet<T>): SmartSet<T>;
    difference(set: SmartSet<T>): SmartSet<T>;
    symmetricDifference(set: SmartSet<T>): SmartSet<T>;
    complement(set: SmartSet<T>): SmartSet<T>;
    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]>;
    powerSet(): SmartSet<SmartSet<T>>;
    subsets(): IterableIterator<T[]>;
    subsetsCount(): number;
}

export { SmartSet as default };
