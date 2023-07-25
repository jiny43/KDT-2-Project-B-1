import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {View} from 'react-native';
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

const App: React.FC<any> = ({navigation, route}) => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const { name, location  } = route.params;
  console.log(name, location);
  // console.log(location.latitude);
  // console.log(location.longitude);
  //recommendlist 에서 넘겨받은 값 확인 완료

  

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
          const {latitude, longitude} = position.coords;

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
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, []);



  //데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const kakaoApiKey = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
        const origin = `${initialPosition.longitude},${initialPosition.latitude}`;
        const destination = `${location.longitude},${location.latitude}`;
        const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`;
        const headers = {
          Authorization: `KakaoAK ${kakaoApiKey}`,
          'Content-Type': 'application/json',
        };

        //목적지까지 가는  x,y 좌표의 배열
        const response = await axios.get(url, {headers});
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
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              });
            }
            // console.log(polyline)
            //확인 완료
          }
        }
        setCoordinates(polyline);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [initialPosition,location]);
//!initialPosition이 존재하는 경우에 API를 요청
//?그렇지않으면 초기 위치값이 null인 상태에서 origin에 할당돼서 좌표값이 전해지지 않음.

  // console.log(coordinates);
  //coordinates확인완료


  return initialPosition ? (
    <View style={{flex: 1}}>
      <SelectedPath path={name} />
      <MapView
        style={{flex: 1}}
        initialRegion={initialPosition}
        showsUserLocation={true}>
        {/* coordinates 의 위도 경도가 반대로돼있음 -> 위도,경도를 변경해주는 작업 */}
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates.map(coord => ({
              latitude: coord.longitude,
              longitude: coord.latitude,
            }))}
            strokeWidth={5}
            strokeColor="#4641D9"
          />
        )}
        {/* 출발지 마커 */}
        <Marker
            coordinate={{
              latitude: initialPosition.latitude,
              longitude: initialPosition.longitude,
            }}
            title="출발지"
            description="현재 위치"
          />
        {/* 도착지 마커 */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          title="도착지"
          description={name}
        />
      </MapView>
      <RecommendedPath navigation={navigation} location ={location} origin={initialPosition} />
      <Button name="주차장우선" />
    </View>
  ) : null;
};

export default App;
