import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {View} from 'react-native';
import SelectedPath from './SelectedPath';
import RecommendedPath from './RecommendedPath';
import Button from './Button';
import axios from 'axios';

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

// 네비게이션 사용을 위해 매개변수에 네비게이션을 넣어주세요.
// App.tsx 에 작성하신 페이지부터 네비게이션 기능 사용을 할 최종 목적지까지 navigation을 전달해줘야 사용 가능합니다.
const App: React.FC<any> = ({navigation}) => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  const [coordinates, setCoordinates] = useState<Point[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
          const {latitude, longitude} = position.coords;

          console.log(position.coords); // 위치 정보 출력

          setInitialPosition({
            latitude,
            longitude,
            latitudeDelta: 2,
            longitudeDelta: 2,
          });

          // 경로 정보 가져오기
          fetch('http://10.0.2.2:3000/kakao-api/directions/:origin')
            .then(response => response.json())
            .then(data => {
              const {polyline} = data;
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
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < coordinates.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 5); // 0.1초마다 폴리라인 좌표를 추가

    return () => clearInterval(interval);
  }, [coordinates]);

  return (
    initialPosition && (
      <View style={{flex: 1}}>
        <SelectedPath path="대전 -> 대구(팔공막창)" />
        <MapView
          style={{flex: 1}}
          initialRegion={initialPosition}
          showsUserLocation={true}>
          {coordinates.length > 0 && (
            <>
              <Polyline
                coordinates={coordinates.slice(0, currentIndex + 1)}
                strokeWidth={5}
                strokeColor="#4A72D6"
              />
              <Marker
                coordinate={coordinates[0]} // 출발지 좌표
                title="출발지"
                description="대전"
              />
              <Marker
                coordinate={coordinates[coordinates.length - 1]} //도착지 좌표
                title="도착지"
                description="대구(팔공막창)"
              />
            </>
          )}
        </MapView>
        {/* 네비게이션 사용할 RecommendedPath에 네비게이션 인자 전달 */}
        <RecommendedPath navigation={navigation} />
        <Button name="주차장 우선"></Button>
      </View>
    )
  );
};

export default App;
