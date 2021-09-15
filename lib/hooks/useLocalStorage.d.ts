export declare function useLocalStorage<T>(storeKey: string, key: string, initialValue: T): readonly [T, (value: T | ((val: T) => T)) => void];
