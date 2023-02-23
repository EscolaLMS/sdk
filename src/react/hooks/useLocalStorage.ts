import { useEffect, useState } from 'react';

function getInitialValue<T>(
  storeKey: string,
  key: string,
  initialValue: T,
  preferInitialValue: boolean
) {
  try {
    const item = window.localStorage.getItem(storeKey);
    if (item === null) {
      return initialValue;
    }
    const store = JSON.parse(item);
    if (preferInitialValue) {
      return initialValue;
    }
    return store[key] ? store[key] : initialValue;
  } catch (error) {
    return initialValue;
  }
}

// Hook
export function useLocalStorage<T>(
  storeKey: string,
  key: string,
  initialValue: T,
  ssrHydration: boolean = false
) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getInitialValue(storeKey, key, initialValue, ssrHydration)
  );

  useEffect(() => {
    if (ssrHydration) {
      setValue(getInitialValue(storeKey, key, initialValue, false));
    }
  }, [ssrHydration]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      const item = window.localStorage.getItem(storeKey);
      const store = item ? JSON.parse(item) : {};
      store[key] = valueToStore;
      setStoredValue(value);
      window.localStorage.setItem(storeKey, JSON.stringify(store));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
