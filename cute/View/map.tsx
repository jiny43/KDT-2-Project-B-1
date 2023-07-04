import React, { useState, useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { View } from 'react-native';
import SelectedPath from './SelectedPath';

// 좌표 타입
interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// Polyline을 그리기 위한 좌표 타입
interface Point {
  latitude: number;
  longitude: number;
}

const App = () => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(null);
  const [coordinates, setCoordinates] = useState<Point[]>([]);

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
            latitudeDelta: 1,
            longitudeDelta: 1,
          });

          // 경로 정보 가져오기
          fetch('http://10.0.2.2:3000/kakao-api/duration')
          .then(response => response.json())
          .then(data => {
            const { polyline } = data;
            const parsedCoordinates = polyline.map((point: number[]) => ({
              latitude: point[1],
              longitude: point[0],
            }));
            setCoordinates(parsedCoordinates);
            console.log('경로 데이터 가져옴:', data);
          })
          .catch(error => {
            console.log('경로 데이터를 가져오는 중 오류 발생:', error);
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
          {coordinates.length > 0 && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={10}
              strokeColor="red"
            />
          )}
        </MapView>
      </View>
    )
  );
};

export default App;
