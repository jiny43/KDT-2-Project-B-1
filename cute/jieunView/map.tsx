import React, { useState, useEffect } from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { View } from 'react-native';
import SelectedPath from './SelectedPath';
import RecommendedPath from './RecommendedPath';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const App: React.FC<any> = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (res2 === RESULTS.GRANTED) {
          getLocation();
        }
      } else if (res === RESULTS.GRANTED) {
        getLocation();
      }
    };

    const getLocation = async () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          console.log(position.coords); // 위치 정보 출력

          setInitialPosition({
            latitude,
            longitude,
            latitudeDelta: 2,
            longitudeDelta: 2,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    checkLocationPermission();
  }, []);

  return (
    initialPosition && (
      <View style={{ flex: 1 }}>
        <SelectedPath path="대전 -> 대구(팔공막창)" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialPosition}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude,
            }}
            title="출발지"
            description="대전"
          />
        </MapView>
        {/* 네비게이션 사용할 RecommendedPath에 네비게이션 인자 전달 */}
        <RecommendedPath navigation={navigation} />
      </View>
    )
  );
};

export default App;
