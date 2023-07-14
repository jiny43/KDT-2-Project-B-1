import React, { useState, useEffect } from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { View } from 'react-native';
import SelectedPath from './SelectedPath';
import RecommendedPath from './RecommendedPath';
import Button from './Button';
import axios from 'axios';


interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const App: React.FC<any> = ({ navigation }) => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

//현재 위치 권한 설정
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

          console.log(position.coords); 
          // 위치 정보 확인 완료
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


//데이터 받아오기
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


 //목적지까지 가는  x,y 좌표의 배열
        const response = await axios.get(url, { headers });
        const data = response.data;
        const polyline = [];
        const sections = data.routes[0].sections;
        for (const section of sections) {
          const roads = section.roads;
          for (const road of roads) {
            const vertexes = road.vertexes;
            for (let i = 0; i < vertexes.length - 1; i += 2) {
              const latitude = vertexes[i];
              const longitude = vertexes[i + 1];
              polyline.push({
                latitude,
                longitude,
              });
            }
            // console.log(polyline);
            //확인 완료
          }
        }
        setCoordinates(polyline);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);
console.log(coordinates);
//coordinates확인완료

  return (
    initialPosition ? (
      <View style={{ flex: 1 }}>
        <SelectedPath path="대전 -> 대구(팔공막창)" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialPosition}
          showsUserLocation={true}
        >
          {/* coordinates 의 위도 경도가 반대로돼있음 -> 위도,경도를 변경해주는 작업 */}
          {coordinates.length > 0 && (
            <Polyline
            coordinates={coordinates.map(coord => ({
              latitude: coord.longitude,
              longitude: coord.latitude,
            }))}
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
        {/* <Button name='주차장 우선'></Button> */}
      </View>
    ) : null
  );
};

export default App;
