import React from 'react';
import { Text, View } from 'react-native';

interface HotspotItemProps {
  item: {
    name: string;
    distanceKM: number;
    currentTraffic: 'CRITICAL_VOLUME' | 'MODERATE' | 'SLOW';
    avgPrepTimeMins: number;
  };
}

export const HotspotItem = React.memo(({ item }: HotspotItemProps) => {
  const isHighVolume = item.currentTraffic === 'CRITICAL_VOLUME';

  return (
    <View className="bg-[#121212] p-4 rounded-xl flex-row justify-between items-center mb-2.5 border border-[#1A1A1A]">
      <View className="flex-1 mr-3">
        <Text className="text-white text-sm font-bold">{item.name}</Text>
        <Text className="text-[#A3A3A3] text-xs mt-1">📍 {item.distanceKM.toFixed(1)} km away</Text>
      </View>
      
      {/* High-Contrast Demand Status Badge */}
      <View className={`py-1.5 px-2.5 rounded-md items-center min-w-[100px] ${isHighVolume ? 'bg-[#FF550020] border border-[#FF5500]' : 'bg-[#00A85920] border border-[#00A859]'}`}>
        <Text className={`text-[10px] font-extrabold tracking-wider ${isHighVolume ? 'text-[#FF5500]' : 'text-[#00A859]'}`}>
          {isHighVolume ? '🔥 HIGH DEMAND' : '🟢 FAST PICKUP'}
        </Text>
        <Text className="text-white text-xs font-semibold mt-0.5">{item.avgPrepTimeMins}m wait</Text>
      </View>
    </View>
  );
});
