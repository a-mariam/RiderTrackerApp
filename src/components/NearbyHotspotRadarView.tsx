import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNearbyHotspots } from '../hooks/useNearbyHotspots';
import { HotspotItem } from '@/components/HotspotItem';

export function NearbyHotspotsRadarView() {
  const { hotspots, locationError, loadingLocation } = useNearbyHotspots();

  if (loadingLocation) {
    return (
      <View className="p-8 items-center justify-center">
        <ActivityIndicator size="small" color="#00A859" />
        <Text className="text-[#A3A3A3] text-sm mt-2">Polling native GPS tracking nodes...</Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View className="p-8 items-center justify-center">
        <Text className="text-[#DC2626] text-sm font-semibold text-center">⚠️ {locationError}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 mt-2">
      <Text className="text-white text-sm font-bold mb-3">Chowdeck Hotspot Radar (Nearest Chains)</Text>
      
      <FlatList
        data={hotspots}
        renderItem={({ item }) => <HotspotItem item={item} />}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        windowSize={3}
        removeClippedSubviews={true} // Performance optimization: unmounts items off screen to save memory
        ListEmptyComponent={
          <Text className="text-[#525252] text-center text-sm mt-4">No popular partners found within 10km.</Text>
        }
      />
    </View>
  );
}
