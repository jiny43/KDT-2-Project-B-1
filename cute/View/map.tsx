import React, {useState, useEffect} from 'react';
import MapView, {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number; // 수직 범위
  longitudeDelta: number; // 수평 범위
}

const App = () => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );

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

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          console.log(position.coords); // 위치 정보 출력

          setInitialPosition({
            latitude,
            longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
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

  return (
    initialPosition && (
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={initialPosition}
        showsUserLocation={true}
      />
    )
  );
};

export default App;
