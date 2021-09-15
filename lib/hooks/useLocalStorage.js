"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
// Hook
function useLocalStorage(storeKey, key, initialValue) {
    var _a = (0, react_1.useState)(function () {
        try {
            var item = window.localStorage.getItem(storeKey);
            if (item === null) {
                return initialValue;
            }
            var store = JSON.parse(item);
            return store[key] ? store[key] : initialValue;
        }
        catch (error) {
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    var setValue = function (value) {
        try {
            var valueToStore = value instanceof Function ? value(storedValue) : value;
            var item = window.localStorage.getItem(storeKey);
            var store = item ? JSON.parse(item) : {};
            store[key] = valueToStore;
            setStoredValue(valueToStore);
            window.localStorage.setItem(storeKey, JSON.stringify(store));
        }
        catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
exports.useLocalStorage = useLocalStorage;
