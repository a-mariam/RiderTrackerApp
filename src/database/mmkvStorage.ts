import {createMMKV} from 'react-native-mmkv';

export const storage =  createMMKV({
  id: 'riderStorage',
});

export const storageKeys = {
  SHIFT_ORDERS: 'activeShiftOrders',
  SHIFT_EXPENSES: 'activeShiftExpenses',
};
