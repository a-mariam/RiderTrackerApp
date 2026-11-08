import React from 'react';
import { render } from '@testing-library/react-native';
import { NearbyHotspotsRadarView } from '../src/components/NearbyHotspotsRadarView';
import { useNearbyHotspots } from '../src/hooks/useNearbyHotspots';

// 1. Mock the custom geolocation tracking hook
jest.mock('../src/hooks/useNearbyHotspots', () => ({
  useNearbyHotspots: jest.fn(),
}));

describe('NearbyHotspotsRadarView Component TDD Specifications', () => {
  it('should display an activity loader when fetching native hardware coordinates', () => {
    // Mock the hook to simulate active GPS tracking polling
    (useNearbyHotspots as jest.Mock).mockReturnValue({
      hotspots: [],
      locationError: null,
      loadingLocation: true,
    });

    const { getByText } = render(<NearbyHotspotsRadarView />);
    
    expect(getByText('Polling native GPS tracking nodes...')).toBeTruthy();
  });

  it('should render user-friendly error boundaries if hardware permissions are denied', () => {
    // Mock the hook to simulate an OS permission denial error
    (useNearbyHotspots as jest.Mock).mockReturnValue({
      hotspots: [],
      locationError: 'Permission to access location was denied',
      loadingLocation: false,
    });

    const { getByText } = render(<NearbyHotspotsRadarView />);
    
    expect(getByText('⚠️ Permission to access location was denied')).toBeTruthy();
  });

  it('should render a clean, high-contrast NativeWind list card layout when hotspots are received', () => {
    // Mock the hook returning high-volume partner chains closest to the rider
    (useNearbyHotspots as jest.Mock).mockReturnValue({
      hotspots: [
        { id: 'h1', name: 'The Place - Yaba Branch', chain: 'The Place', distanceKM: 1.2, currentTraffic: 'CRITICAL_VOLUME', avgPrepTimeMins: 22 }
      ],
      locationError: null,
      loadingLocation: false,
    });

    const { getByText } = render(<NearbyHotspotsRadarView />);
    
    // Assert visual text components match our structured design layouts
    expect(getByText('The Place - Yaba Branch')).toBeTruthy();
    expect(getByText('📍 1.2 km away')).toBeTruthy();
    expect(getByText('🔥 HIGH DEMAND')).toBeTruthy();
  });
});
