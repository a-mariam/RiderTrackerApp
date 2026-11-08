import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { useShiftFinances } from '@/hooks/useShiftFinances';
// import { NearbyHotspotsRadarView } from '../components/NearbyHotspotsRadarView';

export default function ActiveShiftScreen() {
  const { 
    orders, 
    expenses, 
    financials, 
    incrementOrders, 
    addExpense, 
    resetShift 
  } = useShiftFinances();

  // Clean, utility-first list item renderer for logged operational items
  const renderExpenseItem = ({ item }: any) => (
    <View className="flex-row justify-between items-center bg-[#121212] p-4 rounded-lg mb-2 border border-[#1A1A1A]">
      <View>
        <Text className="text-white text-sm font-semibold">{item.type}</Text>
        <Text className="text-[#737373] text-xs mt-0.5">{item.timestamp}</Text>
      </View>
      <Text className="text-[#DC2626] text-sm font-bold">- ₦{item.amount.toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View className="flex-row justify-between items-center p-4 border-b border-[#1A1A1A]">
        <Text className="text-white text-base font-bold">Rider Companion Engine</Text>
        <TouchableOpacity onPress={resetShift} activeOpacity={0.7}>
          <Text className="text-[#737373] text-sm font-semibold">Reset Shift</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-[#0A2417] m-4 p-5 rounded-xl border border-[#00A859]">
        <Text className="text-[#00A859] text-xs font-bold tracking-wider">ESTIMATED NET TAKE-HOME</Text>
        <Text className={`text-3xl font-extrabold my-1.5 ${financials.netProfit < 0 ? 'text-[#DC2626]' : 'text-white'}`}>
          {financials.netProfit < 0 ? '-' : ''}₦{Math.abs(financials.netProfit).toLocaleString()}
        </Text>
        
        <View className="flex-row justify-between mt-2 pt-2 border-t border-[#143D27]">
          <Text className="text-[#A3A3A3] text-xs font-medium">Gross: ₦{financials.grossFromOrders.toLocaleString()}</Text>
          <Text className="text-[#A3A3A3] text-xs font-medium">Bonus: ₦{financials.bonusEarned.toLocaleString()}</Text>
          <Text className="text-[#A3A3A3] text-xs font-medium">Spent: ₦{financials.totalExpenses.toLocaleString()}</Text>
        </View>
        <View className="mt-2.5 pt-1.5 border-t border-dashed border-[#143D27]">
          <Text className="text-[#00A859] text-xs font-semibold">⚡ Est. Distance Traveled: {financials.totalKmTraveled.toFixed(1)} KM</Text>
        </View>
      </View>

      <View className="px-4 mb-4">
        <TouchableOpacity 
          className="bg-[#00A859] h-14 rounded-lg items-center justify-center" 
          onPress={incrementOrders}
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-bold">+1 Completed Delivery</Text>
          <Text className="text-white text-xs font-medium mt-0.5">Progress: {orders} / {financials.DAILY_BONUS_TARGET} Orders</Text>
        </TouchableOpacity>

        <View className="flex-row mt-2.5">
          <TouchableOpacity 
            className="flex-1 bg-[#121212] h-12 rounded-lg items-center justify-center border border-[#331212] mr-2" 
            onPress={() => addExpense('Fuel', 2000)}
            activeOpacity={0.8}
          >
            <Text className="text-white text-sm font-bold">+ ₦2k Fuel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-[#121212] h-12 rounded-lg items-center justify-center border border-[#331212]" 
            onPress={() => addExpense('Maintenance', 500)}
            activeOpacity={0.8}
          >
            <Text className="text-white text-sm font-bold">+ ₦500 Mechanic</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-[#1A0F00]  p-4 mx-4 mb-4 rounded-lg border border-[#FF5500]">
        <Text className="text-[#FF5500] text-xs font-bold tracking-wider">🛠️ CHOWDECK QA SIMULATION PANEL</Text>
        <Text className="text-[#A3A3A3] text-xs my-1.5">Simulate real-time incoming delivery dispatch pings from server infrastructure:</Text>
        <TouchableOpacity 
          className="bg-[#FF5500] h-10 rounded-md items-center justify-center" 
          onPress={incrementOrders} 
          activeOpacity={0.8}
        >
          <Text className="text-white text-sm font-bold">Simulate Remote Order Complete Event</Text>
        </TouchableOpacity>
      </View>

      {/* Live Geo-Aware Radar Component Block (Integrated via TDD Flow) */}
      {/* <View className="flex-1">
        <NearbyHotspotsRadarView />
      </View> */}

      {/* Operational List View Activity Trail */}
      <Text className="text-white text-sm font-bold mx-4 mt-4 mb-2">Shift Activity Audit Trail</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        initialNumToRender={5}
        windowSize={3}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <Text className="text-[#404040] text-center mt-4 text-sm">No local expenses logged yet this shift.</Text>
        }
      />
    </SafeAreaView>
  );
}
