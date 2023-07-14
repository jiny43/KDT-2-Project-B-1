// App.tsx
import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import React, {useRef} from 'react';
import {View, StyleSheet, Image, ImageRequireSource} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import ComponentUnder from '../NaviView/Component_under';
import ComponentUpper from '../NaviView/Component_upper';

// 타입을 지정, 위도 경도와 델타값의 타입을 number로 지정
interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
// point의 위도 경도의 타입을 number로 지정
interface Point {
  latitude: number;
  longitude: number;
}

const App = () => {
  // MapView라는 클래스 타입의 참조(ref)를 생성한다. ref는 사용자 가 보는 지도에 대한 참조를 보관한다.
  // 참조라는것은, 빈공간을 반든다. 즉, MapView 라는 빈공간을 만든다. 그와 상응하는 null 값이다.
  const mapRef = useRef<MapView>(null);
  // 초기 위치를 저장하는 state를 생성한다. 초기값은 null, Coordinate의 형태는 inerface의 정의한 값일것이다.
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  // Point 배열을 저장하는 state를 생성한다. 초기값은 빈 배열이다.
  const [coordinates, setCoordinates] = useState<Point[]>([]);
  // useEffect 훅은 컴포넌트가 마운트되었을때 실행된다.
  // checkLocationPermission 을 사용해서 사용자의 위치 정보에 접근할수 있는 권한이 있는지 확인한다.
  // ? 권한이 있다면 getlocation 함수를 실행, 없다면 요청을 한다.
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
    // 점차 확대되는 느낌을 주기위해 settime 메서드 사용,....
    // getLocation이라는 함수, Geolocation.watchPosition이라는 메서드를 사용했다. 실시간 위치추적을 위해..
    const getLocation = () => {
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const newRegion: Coordinate = {
            latitude,
            longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          };
          setInitialPosition(newRegion);
          // 맵 클래스의 참조(ref) 갑시 존재할때 즉, 지도 컴포넌트가 존재할때 아래의 코드를 실행한다.
          // 즉, mapview가 이미 존재하는지 확인하는 과정이다.
          // animateToregion 메서드를 사용한다 이 메서드는, 해당 지역으로 이동하는 메서드이다.
          // 이를통해서.. 점차 해당 지역으로 이동하는 듯한 느낌을 줄수있다.
          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current?.animateToRegion(
                {
                  ...newRegion,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                },
                2000,
              );
            }, 1000);

            setTimeout(() => {
              mapRef.current?.animateToRegion(
                {
                  ...newRegion,
                  latitudeDelta: 0.0001,
                  longitudeDelta: 0.0001,
                },
                2000,
              );
            }, 3000);
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        // geolocation 메서드에 전달되는 옵션으로, enablehightAccuracy가 ture이면, 가능한 가장 정확한 위치를 가져온다.
        // timeout은 위치정보를 가져오는데 실패하면, 대기 시간을 설정하는 것이다.
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    // 사용자의 위치정보 접근 권한을 확인하는 함수
    // []은, 마운트 되었을때만 실행된다,
    checkLocationPermission();
  }, []);
  // 이 useEffect 훅은 initalPosition state가 업데이트 될때마다 실행된다. initalPosition은 사용자의 초기 정보를 저장하는 state이다.
  // await 을 사용해서, 서버로부터 좌표의 위치값을 비동기적으로 가져온다.
  useEffect(() => {
    const fetchCoordinates = async () => {
      // 초기값이 null값이 아닐때 요청을 보낸다.
      if (initialPosition) {
        const response = await fetch(
          `http://10.0.2.2:3000/kakao-api/directions/${initialPosition.longitude},${initialPosition.latitude}`,
        );
        const data = await response.json();
        // 데이터값은 좌표의 값으로 확인되었다.
        console.log(data);

        const transformedCoordinates = data.map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        setCoordinates(transformedCoordinates);
      }
    };

    fetchCoordinates();
  }, [initialPosition]);

  const userLocationMarker: ImageRequireSource = require('../Img/ori_nav.png');

  return (
    <View style={styles.container}>
      <ComponentUpper />
      {initialPosition && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialPosition}
          showsUserLocation={false}
          onLayout={() => {
            if (mapRef.current) {
              const initialCamera = {
                center: initialPosition,
                pitch: 45, // 보이는 각도를 설정합니다.
                heading: 10,
                altitude: 10,
                zoom: 5,
              };
              mapRef.current.animateCamera(initialCamera, {duration: 2000});
            }
          }}>
          <Marker
            coordinate={initialPosition}
            image={userLocationMarker}
            style={styles.marker}
          />
          <Polyline
            coordinates={coordinates}
            strokeColor="#4A72D6"
            strokeWidth={4.5}
          />
        </MapView>
      )}
      <ComponentUnder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 800,
    minWidth: 200,
  },
  map: {
    flex: 1,
    minWidth: 200,
    minHeight: 200,
  },
  marker: {
    width: 30,
    height: 30,
    color: 'red',
  },
});

export default App;
