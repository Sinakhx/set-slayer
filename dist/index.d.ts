declare class SmartSet<T> {
    private set;
    constructor(initial?: Array<T>);
    [Symbol.iterator](): IterableIterator<T>;
    [Symbol.toStringTag]: string;
    get size(): number;
    get elements(): T[];
    valueOf(): SmartSet<T>;
    toString(): string;
    keys(): IterableIterator<T>;
    values(): IterableIterator<T>;
    entries(): IterableIterator<[T, T]>;
    isEmpty(): boolean;
    contains: (element: T) => boolean;
    has(element: T): boolean;
    add(element: T): SmartSet<T>;
    remove: (element: T) => SmartSet<T>;
    delete(element: T): SmartSet<T>;
    clear(): SmartSet<T>;
    from(...args: Array<T | SmartSet<T>>): SmartSet<T>;
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
    union(set: SmartSet<T>): SmartSet<T>;
    intersection(set: SmartSet<T>): SmartSet<T>;
    subtract: (set: SmartSet<T>) => SmartSet<T>;
    difference(set: SmartSet<T>): SmartSet<T>;
    symmetricDifference(set: SmartSet<T>): SmartSet<T>;
    complement(set: SmartSet<T>): SmartSet<T>;
    cartesianProduct(set: SmartSet<T>): SmartSet<[T, T]>;
    powerSet(): SmartSet<SmartSet<T>>;
    subsets: (this: SmartSet<T>, array?: T[], offset?: number) => IterableIterator<Array<T>>;
    subsetsCount(): number;
}

export { SmartSet as default };