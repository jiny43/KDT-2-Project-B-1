import React, { useState, useEffect } from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { View } from 'react-native';
import SelectedPath from './SelectedPath';
import RecommendedPath from './RecommendedPath';
import axios from 'axios';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Section {
  end_location: {
    lat: number;
    lng: number;
  };
  start_location: {
    lat: number;
    lng: number;
  };
}

const App: React.FC<any> = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kakaoApiKey = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
        const destination = '127.3234,36.3521'; // 목적지
        const origin = '126.705278,37.456111'; // 출발지

        const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`;
        const headers = {
          Authorization: `KakaoAK ${kakaoApiKey}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(url, { headers });
        const data = response.data;
        const polyline = [];
        const sections = data.routes[0].sections;
        for (const section of sections) {
          const roads = section.roads;
          for (const road of roads) {
            const vertexes = road.vertexes;
            for (let i = 0; i < vertexes.length - 1; i += 2) {
              const x = vertexes[i];
              const y = vertexes[i + 1];
              polyline.push({
                latitude: x,
                longitude: y,
              });
            }
          }
        }
        setCoordinates(polyline);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
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
              strokeWidth={5}
              strokeColor="#4A72D6"
            />
          )}
          <Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude,
            }}
            title="출발지"
            description="대전"
          />
        </MapView>
        <RecommendedPath navigation={navigation} />
      </View>
    )
  );
};

export default App;
