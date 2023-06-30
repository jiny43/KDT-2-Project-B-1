import React, {useEffect, useState} from 'react';
import MapView, {Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const App = () => {
  const [region, setRegion] = useState<Coordinate>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocation = async () => {
    const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (res === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (res2 === RESULTS.GRANTED) {
        fetchLocation();
      }
    } else if (res === RESULTS.GRANTED) {
      fetchLocation();
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      region={region}
      showsUserLocation={true}
    />
  );
};

export default App;
