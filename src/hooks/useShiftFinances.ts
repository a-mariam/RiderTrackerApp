import { storage, storageKeys } from "@/database/mmkvStorage";
import { useState, useEffect, useMemo, useCallback } from "react";

export type ShiftType = 'Fuel' | 'Maintenance' | 'Other'
export interface ShiftExpense {
    id: string;
    type: ShiftType ;
    amount: number;
    timestamp: string;
}

export function useShiftFinances () {
    const [orders, setOrders] = useState<number>(()=> {
    return storage.getNumber(storageKeys.SHIFT_ORDERS) ?? 0});

    const [expenses, setExpenses] = useState<ShiftExpense[]>(()=>{
        const rawExpenses = storage.getString(storageKeys.SHIFT_EXPENSES);
        return rawExpenses ? JSON?.parse(rawExpenses) : [];
    })

    useEffect(() => {
      storage.set(storageKeys.SHIFT_ORDERS, orders);
    }, [orders]);

    useEffect(() => {
      storage.set(storageKeys.SHIFT_EXPENSES, JSON.stringify(expenses));
    }, [expenses]);

   const AVG_PAYOUT_PER_ORDER = 1200; 
   const DAILY_BONUS_TARGET = 15;      
   const BONUS_PAYOUT = 4000; 
   
   const financials = useMemo(() => {
    const grossFromOrders = orders * AVG_PAYOUT_PER_ORDER;
    const bonusEarned = orders >= DAILY_BONUS_TARGET ? BONUS_PAYOUT : 0;
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const netProfit = (grossFromOrders + bonusEarned) - totalExpenses;
    const totalKmTraveled = orders * 3.5; // Estimating a baseline of 3.5km per delivery

    return { 
      grossFromOrders, 
      bonusEarned, 
      totalExpenses, 
      netProfit, 
      totalKmTraveled,
      DAILY_BONUS_TARGET 
    };
  }, [orders, expenses]);

   const incrementOrders = useCallback(() => {
    setOrders((prev) => prev + 1);
  }, []);

  const addExpense = useCallback((type: ShiftType, amount: number) => {
    const newExpense: ShiftExpense = {
      id: Math.random().toString(),
      type,
      amount,
      timestamp: String(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

    const resetShift = useCallback(() => {
    setOrders(0);
    setExpenses([]);
    storage.remove(storageKeys.SHIFT_ORDERS);
    storage.remove(storageKeys.SHIFT_EXPENSES);
  }, []);

  return {
    orders,
    expenses,
    financials,
    incrementOrders,
    addExpense,
    resetShift,
  };
}