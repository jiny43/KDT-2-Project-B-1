import React, {useState, useEffect} from 'react';
import MapView, {Polyline, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Point {
  latitude: number;
  longitude: number;
}

//App 함수 컴포넌트를 선언하고, useState 훅을 사용해 앱의 초기 위치 정보를 관리할 initialPosition 상태와 Polyline을 그릴 때 필요한 좌표 정보들을 관리할 coordinates 상태를 선언합니다.
const App = () => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  const [coordinates, setCoordinates] = useState<Point[]>([]);
  // useEffect 훅 안에서 위치 정보 사용 권한을 체크하고 필요한 경우 권한을 요청하는 checkLocationPermission 함수를 선언합니다.
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
    // 사용자의 현재 위치를 가져오는 getLocation 함수를 선언합니다. 이 함수는 Geolocation 객체의 getCurrentPosition 메서드를 이용해 현재 위치를 가져옵니다. 위치 정보를 성공적으로 가져올 경우 setInitialPosition을 호출해 initialPosition 상태를 업데이트합니다.
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          console.log(position.coords);

          setInitialPosition({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
    // 서버에서 경로에 대한 좌표 데이터를 가져오는 fetchCoordinates 함수를 선언하고 호출합니다. 이 함수는 fetch 함수를 이용해 서버에서 데이터를 가져온 후, 이를 Point 형태로 변환하여 coordinates 상태를 업데이트합니다.
    const fetchCoordinates = async () => {
      const response = await fetch('http://10.0.2.2:3000/kakao-api/directions');
      const data = await response.json();

      const transformedCoordinates = data.map((coord: [number, number]) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));

      setCoordinates(transformedCoordinates);
      console.log(transformedCoordinates);
    };

    checkLocationPermission();
    fetchCoordinates();
  }, []);

  // 마지막으로 initialPosition이 있을 경우 MapView 컴포넌트를 렌더링합니다. 이 컴포넌트는 지도를 보여주고, Polyline 컴포넌트를 이용해 coordinates에 따른 경로를 그립니다. MapView의 initialRegion prop으로 initialPosition을 전달하여 앱이 처음 실행될 때 지도가 사용자의 현재 위치를 중심으로 보여지게 합니다.
  return (
    initialPosition && (
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={initialPosition}
        showsUserLocation={true}>
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>
    )
  );
};

export default App;
