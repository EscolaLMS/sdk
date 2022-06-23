const { TextEncoder, TextDecoder } = require("util");

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

let localStorageMock = (function () {
  let store = new Map();
  return {
    getItem(key) {
      return store.get(key);
    },

    setItem: function (key, value) {
      store.set(key, value);
    },

    clear: function () {
      store = new Map();
    },

    removeItem: function (key) {
      store.delete(key);
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
