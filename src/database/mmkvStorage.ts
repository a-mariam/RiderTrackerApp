import type { MMKV } from 'react-native-mmkv';

type StorageAdapter = Pick<MMKV, 'getNumber' | 'getString' | 'set' | 'remove'>;

function createFallbackStorage(): StorageAdapter {
  const memoryStore = new Map<string, string | number | boolean>();
  return {
    getNumber: (key: string) => {
      const val = memoryStore.get(key);
      return typeof val === 'number' ? val : undefined;
    },
    getString: (key: string) => {
      const val = memoryStore.get(key);
      return typeof val === 'string' ? val : undefined;
    },
    set: (key: string, value: boolean | string | number | ArrayBuffer) => {
      if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
        memoryStore.set(key, value);
      }
    },
    remove: (key: string) => {
      return memoryStore.delete(key);
    },
  };
}

function initStorage(): StorageAdapter {
  try {
    // Use dynamic require inside try/catch because react-native-mmkv v4 imports
    // react-native-nitro-modules, which calls TurboModuleRegistry.getEnforcing('NitroModules')
    // at module evaluation time and throws immediately in Expo Go.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createMMKV } = require('react-native-mmkv') as typeof import('react-native-mmkv');
    return createMMKV({
      id: 'riderStorage',
    });
  } catch {
    console.warn(
      '[mmkvStorage] Native MMKV unavailable (running in Expo Go or Web). Falling back to in-memory storage.'
    );
    return createFallbackStorage();
  }
}

export const storage: StorageAdapter = initStorage();

export const storageKeys = {
  SHIFT_ORDERS: 'activeShiftOrders',
  SHIFT_EXPENSES: 'activeShiftExpenses',
};
